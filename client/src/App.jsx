import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-site py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={viteLogo} className="h-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={reactLogo} className="h-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-4xl font-bold text-primary mb-8">
          Vite + React
        </h1>
        
        <div className="max-w-xl mx-auto p-8 bg-card rounded-xl shadow-md">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors mb-4"
          >
            count is {count}
          </button>
          <p className="text-secondary">
            Edit <code className="bg-dark-700 px-2 py-1 rounded text-primary">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="mt-8 text-muted">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
