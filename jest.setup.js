import '@testing-library/jest-dom'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver

// Mock ResponsiveContainer from Recharts (Remove warning about width(0) and height(0))
jest.mock('recharts', () => {
  const original = jest.requireActual('recharts')
  return {
    ...original,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  }
})
