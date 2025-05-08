'use client'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

import { ApiResponseItem } from '../types/SearchFormTypes'

// Convert Datetime to 24h format for chart
function parseTimeToFloat(timeStr: string | null) {
  if (timeStr === null) return;
  // extract "HH:mm" from "2025-05-07 06:34:38 UTC"
  const timePart = timeStr.split(' ')[1]?.slice(0, 5)
  if (!timePart) return 0
  const [h, m] = timePart.split(':').map(Number)
  return (h + m / 60).toFixed(2)
}

export default function ChartAndTable({ data }: { data: ApiResponseItem[] }) {
  const parsedChartData = data.map(item => ({
    label: item.date,
    sunrise: parseTimeToFloat(item.sunrise),
    sunset: parseTimeToFloat(item.sunset),
    golden_hour: parseTimeToFloat(item.golden_hour),
  }))

  return (
    <div className="space-y-8 text-white">
      {/* CHART */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={parsedChartData}>
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="sunrise" stroke="#FFA500" name="Sunrise" />
            <Line type="monotone" dataKey="sunset" stroke="#FF6347" name="Sunset" />
            <Line type="monotone" dataKey="golden_hour" stroke="#FFD700" name="Golden Hour" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white border border-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Sunrise</th>
              <th className="border px-4 py-2">Sunset</th>
              <th className="border px-4 py-2">Golden Hour</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.sunrise}</td>
                <td className="border px-4 py-2">{item.sunset}</td>
                <td className="border px-4 py-2">{item.golden_hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
