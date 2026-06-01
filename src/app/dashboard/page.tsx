"use client"

import React, { useEffect, useState } from "react";
import Card from "../../ui/Card";
import LineAreaChartCard from "../../ui/LineAreaChartCard";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import KPISection from "./KPISection";
import Filters from "@/components/Filters";
import DonutChartCard from "@/ui/DonutChartCard";
import FailureDonutCard from "@/ui/FailureDonutCard";
import TopErrorCodesTable from "@/ui/TopErrorCodesTable";
import TopMerchantsByVolume from "@/ui/TopMerchantsByVolume";
import TransactionsComboChart from "@/ui/TransactionsComboChart";

type Metric = { id: string; title: string; value: string | number };
type Row = { time: string; event: string };

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/overview");
      if (!res.ok) return;
      const json = await res.json();
      setMetrics(json.metrics || []);
      setSeries(json.series || []);
      setRows((json.rows as Row[]) || []);
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
        <Filters/>
          <KPISection />
          {/* <KPISection /> */}
          

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineAreaChartCard title="Transaction Trends" subtitle="Daily transactions" />

          {/* <div className="text-sm text-zinc-500">Recent events</div>
          <div className="mt-3">
            <Table
              columns={[{ key: "time", title: "Time" }, { key: "event", title: "Event" }]}
              data={rows}
            />
          </div> */}
          <DonutChartCard />
          <FailureDonutCard />
          <TopErrorCodesTable />
          <TopMerchantsByVolume/>
          <TransactionsComboChart/>
      </div>

      {/* <div className="mt-4">
        <TopErrorCodesTable />
      </div> */}
    </div>
  );
}

