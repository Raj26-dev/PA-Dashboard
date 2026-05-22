"use client"

import React, { useEffect, useState } from "react";
import Card from "../../ui/Card";
import LineChart from "../../ui/LineChart";
import Table from "../../ui/Table";
import Button from "../../ui/Button";

type Metric = { id: string; title: string; value: string | number };

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/overview");
      if (!res.ok) return;
      const json = await res.json();
      setMetrics(json.metrics || []);
      setSeries(json.series || []);
      setRows(json.rows || []);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Today</Button>
          <Button>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <Card key={m.id}>
            <div className="text-sm text-zinc-500">{m.title}</div>
            <div className="mt-2 text-2xl font-bold">{m.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-500">Active users</div>
            <div className="text-xs text-zinc-400">Last 30 days</div>
          </div>
          <LineChart data={series} width={800} height={200} />
        </Card>

        <Card>
          <div className="text-sm text-zinc-500">Recent events</div>
          <div className="mt-3">
            <Table
              columns={[{ key: "time", title: "Time" }, { key: "event", title: "Event" }]}
              data={rows}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

