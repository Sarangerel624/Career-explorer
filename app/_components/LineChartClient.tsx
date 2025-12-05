"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
type RadarItem = {
  category: string;
  value: number;
};

const CATEGORY_ORDER = ["Realistic", "Investigative", "Artistic", "Social", "Conventional", "Enterprising"];


type Props = {
  data: RadarItem[];
};

export default function LineChartClient({ data }: Props) {
  return (
    <LineChart
      width={480}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
      <XAxis dataKey="category" stroke="white" />
      <YAxis stroke="white" />
      <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", border: "none" }} />
      <Line type="monotone" dataKey="value" stroke="#0000FF" strokeWidth={2} />
    </LineChart>
  );
}
