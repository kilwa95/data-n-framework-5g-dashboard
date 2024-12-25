import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="transition-transform hover:scale-105"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="transition-transform hover:scale-105"
        >
          <img
            src={reactLogo}
            className="h-24 w-24 motion-safe:animate-[spin_20s_linear_infinite]"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8">Vite + React</h1>

      <div className="max-w-md text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="mb-4 px-6 py-3 bg-primary text-white rounded-lg 
                   hover:bg-primary-hover transition-colors
                   focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          count is {count}
        </button>

        <p className="mb-8">
          Edit{' '}
          <code className="font-mono bg-gray-700/20 rounded px-2 py-1">
            src/App.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <p className="text-docs mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
