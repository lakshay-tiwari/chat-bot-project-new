import React from 'react';
import { RecoilRoot } from 'recoil';
import ChatBox from './components/ChatBox';
import HealthTips from './components/HealthTips';

function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Health Assistant
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ChatBox />
            </div>
            <div className="md:col-span-1">
              <HealthTips />
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;