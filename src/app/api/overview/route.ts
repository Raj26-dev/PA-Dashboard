import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const metrics = [
    { id: "m1", title: "Users", value: 1284 },
    { id: "m2", title: "Sessions", value: 3128 },
    { id: "m3", title: "Bounce", value: "32%" },
    { id: "m4", title: "Revenue", value: "$12.4k" },
  ];

  const series = Array.from({ length: 30 }).map(() => Math.round(200 + Math.random() * 1200));

  const rows = Array.from({ length: 6 }).map((_, i) => ({ time: `${9 + i}:00`, event: `Event ${i + 1}` }));

  return new Response(JSON.stringify({ metrics, series, rows }), {
    headers: { "Content-Type": "application/json" },
  });
}
