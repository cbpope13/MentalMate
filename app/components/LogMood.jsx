'use client';
import { useState } from 'react';

const LogMood = ({ fetchMoodHistory }) => {
  const [mood, setMood] = useState(null);
  const [notes, setNotes] = useState('');

  const logMood = async () => {
    const response = await fetch('/api/mood', {
      method: 'POST',
      body: JSON.stringify({
        mood: {
          feeling: mood.index + 1,
          mood: mood.feeling
        },
        note: notes,
        date: new Date().toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setMood(null);
      setNotes('');
      fetchMoodHistory();
    } else {
      alert('Failed to log mood');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-4xl px-6 py-8 w-full rounded-xl">
      <div className="flex flex-col space-y-4">
        <p className="text-xl font-semibold">How are you feeling?</p>
        <div className="flex items-center justify-between">
          {['😢', '😕', '😐', '🙂', '😊'].map((feeling, index) => (
            <button
              onClick={() => {
                setMood({ feeling, index });
              }}
              key={feeling}
              className={`${
                mood?.feeling === feeling
                  ? 'border-sky-300 text-white'
                  : 'border-white hover:border-sky-200'
              } p-1 border-2 aspect-square text-4xl pb-2 flex items-center justify-center rounded-full`}
            >
              {feeling}
            </button>
          ))}
        </div>
        <p className="font-semibold text-sm">{`What's on your mind?`}</p>
        <textarea
          id=""
          className="w-full border rounded-md py-2 px-3"
          placeholder="Share your thoughts..."
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
        <button
          disabled={!mood}
          onClick={logMood}
          className="bg-sky-300 hover:bg-sky-400 text-white w-full p-3 rounded-lg disabled:bg-sky-200"
        >
          Log mood
        </button>
      </div>
    </div>
  );
};

export default LogMood;
