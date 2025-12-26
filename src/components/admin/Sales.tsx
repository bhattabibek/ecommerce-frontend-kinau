import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { monthlySales } from "@/redux/thunk/oreder.thunk";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

export default function MonthlyOrdersSalesChart() {
    const dispatch = useDispatch<AppDispatch>()
  const [year, setYear] = useState(2025);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([1]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    const result = await dispatch(monthlySales({year, months: selectedMonths}))
    if(monthlySales.fulfilled.match(result)){
        setData(result.payload)
    }
    // const res = await fetch(
    //   `/api/admin/stats/monthly?year=${year}&months=${selectedMonths.join(",")}`
    // );
    // const json = await res.json();
    // setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, [year, selectedMonths]);

  const chartData = {
    labels: data.map(
      (d) => MONTHS.find((m) => m.value === d.month)?.label
    ),
    datasets: [
      {
        label: "Orders",
        data: data.map((d) => d.totalOrders),
      },
      {
        label: "Sales",
        data: data.map((d) => d.totalSales),
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Orders & Sales
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Months */}
        <div className="flex flex-wrap gap-2">
          {MONTHS.map((month) => (
            <button
              key={month.value}
              onClick={() =>
                setSelectedMonths((prev) =>
                  prev.includes(month.value)
                    ? prev.filter((m) => m !== month.value)
                    : [...prev, month.value]
                )
              }
              className={`px-3 py-1 rounded border text-sm ${
                selectedMonths.includes(month.value)
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <p className="text-center py-10">Loading chart...</p>
      ) : (
        <Bar data={chartData} />
      )}
    </div>
  );
}
