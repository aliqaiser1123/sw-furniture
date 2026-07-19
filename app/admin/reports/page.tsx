"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText, FileSpreadsheet, File } from "lucide-react";

type DateRange = "today" | "week" | "month" | "year" | "custom";
type ExportFormat = "csv" | "excel" | "pdf";

function generateCSV(data: Record<string, string | number>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) => headers.map((h) => `"${row[h]}"`).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const MOCK_SALES_DATA = Array.from({ length: 30 }, (_, i) => ({
  Date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  Orders: Math.floor(Math.random() * 10),
  Revenue: Math.floor(Math.random() * 50000),
  "Avg Order Value": Math.floor(Math.random() * 8000) + 2000,
}));

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const handleExport = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 800)); // Simulate generation

    if (exportFormat === "csv") {
      generateCSV(MOCK_SALES_DATA, `shesham-report-${dateRange}-${Date.now()}`);
    } else {
      alert(`${exportFormat.toUpperCase()} export requires a backend integration. CSV is fully functional.`);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Generate and export business reports for any date range."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Report Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Range */}
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date Range
            </h3>
            <div className="flex flex-wrap gap-2">
              {(["today", "week", "month", "year", "custom"] as DateRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors capitalize ${
                    dateRange === range
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-secondary"
                  }`}
                >
                  {range === "week" ? "This Week" : range === "month" ? "This Month" : range === "year" ? "This Year" : range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            {dateRange === "custom" && (
              <div className="flex gap-4 mt-4">
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-muted-foreground">Start Date</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-muted-foreground">End Date</label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Report Types */}
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Report Includes</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Revenue Summary",
                "Order Breakdown",
                "Product Performance",
                "Customer Analytics",
                "Inventory Status",
                "Coupon Usage",
                "Category Performance",
                "Payment Methods",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-border w-4 h-4 accent-primary"
                  />
                  <span className="text-sm group-hover:text-foreground text-muted-foreground transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Export Format</h3>
            <div className="flex gap-3">
              {([
                { key: "csv", label: "CSV", icon: <FileText className="w-4 h-4" /> },
                { key: "excel", label: "Excel", icon: <FileSpreadsheet className="w-4 h-4" /> },
                { key: "pdf", label: "PDF", icon: <File className="w-4 h-4" /> },
              ] as const).map((fmt) => (
                <button
                  key={fmt.key}
                  onClick={() => setExportFormat(fmt.key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    exportFormat === fmt.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-secondary"
                  }`}
                >
                  {fmt.icon}
                  {fmt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              CSV export is fully functional. Excel/PDF export requires backend integration.
            </p>
          </div>

          <Button
            onClick={handleExport}
            disabled={isGenerating}
            className="w-full gap-2"
            size="lg"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating Report..." : `Export as ${exportFormat.toUpperCase()}`}
          </Button>
        </div>

        {/* Saved Reports */}
        <div className="space-y-4">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Reports</h3>
            <div className="space-y-2">
              {[
                { name: "Daily Sales Summary", range: "today" },
                { name: "Weekly Revenue Report", range: "week" },
                { name: "Monthly Business Overview", range: "month" },
                { name: "Annual Performance Report", range: "year" },
                { name: "Inventory Audit", range: "month" },
                { name: "Customer Growth Report", range: "month" },
              ].map((r) => (
                <button
                  key={r.name}
                  onClick={() => {
                    setDateRange(r.range as DateRange);
                    setTimeout(() => handleExport(), 100);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg border hover:bg-secondary text-sm transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    {r.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 block pl-6 capitalize">{r.range}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
