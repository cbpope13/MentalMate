'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const MoodHistory = ({ moodHistory }) => {
  const [showHistory, setShowHistory] = useState(true);
  return (
    <div className="bg-white shadow-md rounded-4xl px-6 py-8 w-full rounded-xl">
      <div className="flex flex-col space-y-6">
        <p className="text-xl font-semibold">Mood History</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={moodHistory}>
            <Line
              type="monotone"
              dataKey="i"
              className="text-blue-500"
              dot={false}
              strokeWidth={2}
            />
            <YAxis domain={[1, 5]} />
            <XAxis dataKey="date" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-col space-y-4">
          <div className="w-full flex justify-end">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-blue-500 text-sm"
            >
              {showHistory ? 'Hide' : 'Show'} history
            </button>
          </div>
          {showHistory &&
            moodHistory?.map((mood, ind) => (
              <div
                key={ind}
                className="flex items-center justify-between px-4 py-2 border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between space-x-4 w-full">
                  <div>
                    <p className="text-neutral-600 text-sm">{mood.date}</p>
                    <p className="">{mood.notes}</p>
                  </div>
                  <div className="text-2xl rounded-full flex items-center justify-center">
                    {mood.feeling}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
