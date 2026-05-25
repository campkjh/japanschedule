import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
};

function send(res, status, body) {
  res.status(status).setHeader("content-type", jsonHeaders["content-type"]);
  res.end(JSON.stringify(body));
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return neon(process.env.DATABASE_URL);
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS visit_japan_qrs (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

async function readBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export default async function handler(req, res) {
  const sql = getSql();

  if (!sql) {
    send(res, 503, {
      error: "DATABASE_URL is not configured.",
    });
    return;
  }

  await ensureTable(sql);

  if (req.method === "GET") {
    const rows = await sql`
      SELECT id, label, payload, created_at
      FROM visit_japan_qrs
      ORDER BY created_at DESC
    `;

    send(res, 200, {
      items: rows.map((row) => ({
        id: row.id,
        label: row.label,
        payload: row.payload,
        createdAt: row.created_at,
      })),
    });
    return;
  }

  if (req.method === "POST") {
    const body = await readBody(req);
    const id = String(body.id || randomUUID());
    const label = String(body.label || "Visit Japan QR").trim();
    const payload = String(body.payload || "").trim();

    if (!payload) {
      send(res, 400, { error: "QR payload is required." });
      return;
    }

    const rows = await sql`
      INSERT INTO visit_japan_qrs (id, label, payload)
      VALUES (${id}, ${label || "Visit Japan QR"}, ${payload})
      ON CONFLICT (id)
      DO UPDATE SET
        label = EXCLUDED.label,
        payload = EXCLUDED.payload,
        updated_at = NOW()
      RETURNING id, label, payload, created_at
    `;

    const row = rows[0];
    send(res, 200, {
      item: {
        id: row.id,
        label: row.label,
        payload: row.payload,
        createdAt: row.created_at,
      },
    });
    return;
  }

  if (req.method === "DELETE") {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const id = url.searchParams.get("id");

    if (!id) {
      send(res, 400, { error: "id is required." });
      return;
    }

    await sql`DELETE FROM visit_japan_qrs WHERE id = ${id}`;
    send(res, 200, { ok: true });
    return;
  }

  res.setHeader("allow", "GET, POST, DELETE");
  send(res, 405, { error: "Method not allowed." });
}
