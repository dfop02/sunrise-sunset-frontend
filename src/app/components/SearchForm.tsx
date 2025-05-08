'use client'
import { useState } from 'react'
import Chart from './Chart'

type DataItem = { label: string; value: number };

export default function SearchForm(){
  const [loading, setLoading] = useState('')
  const [result, setResult] = useState<DataItem[] | null>(null)
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState<string | null>(null)

	const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams({city: location, start_date: startDate, end_date: endDate})
    try {
      const response = await fetch(`http://localhost:3000/v1/sun_events?${params.toString()}`)
      const data = await response.json();

      if (data && data.error) {
        setError(data.error || 'unknown error')
      } else {
        setResult(data);
        setError(null);
      }
    } catch(e: any) {
      console.log(JSON.stringify(e));
      setError(e.message || 'unknown error')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          type="text"
          placeholder="Location name"
          value={location}
          onChange={(e) => setLocation(e.target.value)} />

        <input
          className="border p-2"
          type="date"
          placeholder="Location name"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} />

        <input
          className="border p-2"
          type="date"
          placeholder="Location name"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <>
          <Chart data={result} />
        </>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}
    </div>
  )
}
