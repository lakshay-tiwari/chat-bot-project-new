import React, { useState, useEffect } from 'react';
import { getHealthTips } from '../api/healthTipsApi';
import { FaLightbulb } from 'react-icons/fa';

const HealthTips = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTips = async () => {
      try {
        const fetchedTips = await getHealthTips();
        setTips(fetchedTips);
      } catch (error) {
        console.error('Error loading health tips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTips();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-green-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold flex items-center">
          <FaLightbulb className="mr-2" />
          Daily Health Tips
        </h2>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-green-600 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthTips;