'use client'
import { useState } from 'react'
import Chart from './Chart'
import { ApiResponseItem } from '../types/SearchFormTypes'

export default function SearchForm(){
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponseItem[] | null>(null)
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  const defaultInputStyle = "border border-gray-300 rounded px-3 py-2 w-44";

	const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({city: location, start_date: startDate, end_date: endDate})
      const response = await fetch(`http://localhost:3000/v1/sun_events?${params.toString()}`)
      const data = await response.json();

      if (data?.error) {
        setError(data.error || 'unknown error')
        setResult(null)
      } else {
        setResult(data);
      }
    } catch(error: any) {
      console.log(JSON.stringify(error));
      setError(error?.message || 'unknown error')
      setResult(null)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3 items-center justify-center mb-6">
        <input
          aria-label="Location"
          className={defaultInputStyle}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)} />

        <input
          aria-label="Start date"
          className={defaultInputStyle}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} />

        <input
          aria-label="End date"
          className={defaultInputStyle}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}
      {result && <Chart data={result} />}
    </div>
  )
}
