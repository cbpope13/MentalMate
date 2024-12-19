'use client';

import { useState, useEffect } from 'react';
import { RiRobot2Line } from 'react-icons/ri';
import LogMood from '../components/LogMood';
import MoodHistory from '../components/MoodHistory';
import Navbar from '../components/Navbar';
import AiInsights from '../components/AiInsights';
import { useAuth } from '@clerk/nextjs';

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [thread, setThread] = useState(null);

  //check localStorage for messages
  useEffect(() => {
    if (localStorage.getItem('messages')) {
      setMessages(JSON.parse(localStorage.getItem('messages')));
    }
    if (localStorage.getItem('thread')) {
      setThread(JSON.parse(localStorage.getItem('thread')));
    }
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    const response = await fetch('/api/mood');
    const data = await response.json();
    setMoodHistory(
      data.map((mood) => ({
        date: new Date(mood.date).toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        i: mood.mood.feeling,
        feeling: mood.mood.mood,
        notes: mood.note
      }))
    );
  };

  const fetchAiInsights = async () => {
    //POST request to /api/ai
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(moodHistory)
    });
    const data = await response.json();
    setAiInsights(JSON.parse(data.content));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (moodHistory.length > 0) {
      fetchAiInsights();
    }
  }, [moodHistory]);

  const sendMessage = async () => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: { id: 2 },
        message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      {
        id: messages.length + 2,
        user: { id: 1 },
        message: 'Typing...',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    ]);

    let newMessage = { id: messages.length + 1, message, thread_id: thread };

    setMessage('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    });
    const data = await response.json();

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        user: { id: 2 },
        message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      {
        id: messages.length + 2,
        user: { id: 1 },
        message: data.content[0].text.value,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    ]);

    setThread(data.thread_id);
    localStorage.setItem('thread', JSON.stringify(data.thread_id));
    localStorage.setItem('messages', JSON.stringify(messages));
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full">
        {/*Left side*/}
        <div className="flex flex-col space-y-8 items-center w-full p-4 md:w-1/2 md:p-10 md:pr-5">
          <LogMood fetchMoodHistory={fetchMoodHistory} />
          <AiInsights insights={aiInsights} />
        </div>
        {/*Right side*/}
        <div className="flex flex-col p-4 md:w-1/2 md:p-10 md:pl-5">
          <MoodHistory moodHistory={moodHistory} />
        </div>
      </div>
      <button
        onClick={() => {
          setChatOpen(true);
        }}
        className={`${
          chatOpen ? 'hidden' : 'block'
        } fixed right-4 bottom-4 bg-sky-300 hover:bg-sky-400 p-4 text-white rounded-full`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>
      </button>
      <div
        className={`fixed right-4 bottom-4 h-[75%] bg-white shadow-md rounded-xl flex flex-col ${
          chatOpen ? 'md:w-1/3' : 'hidden'
        }`}
      >
        <div className="flex border-b p-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-sky-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
            </div>
            <p className="font-semibold text-xl">AI Therapist</p>
          </div>
          <button
            onClick={() => {
              setChatOpen(false);
            }}
            className="text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-full h-full overflow-y-scroll p-4 flex flex-col space-y-4">
          {messages.map((msg) =>
            msg.user.id === 1 ? (
              <div
                key={msg.id}
                className="flex items-start justify-start space-x-3"
              >
                <div className="bg-sky-100 text-sky-400 p-[6px] rounded-full">
                  <RiRobot2Line className="size-5" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="bg-sky-100 px-4 py-2 rounded-lg">
                    {msg.message}
                  </div>
                  <p className="text-neutral-600 text-xs">{msg.time}</p>
                </div>
              </div>
            ) : (
              <div
                key={msg.id}
                className="flex items-start justify-end space-x-3"
              >
                <div className="flex flex-col items-end space-y-1">
                  <div className="bg-sky-300 text-white px-4 py-2 rounded-lg">
                    {msg.message}
                  </div>
                  <p className="text-xs text-neutral-600">{msg.time}</p>
                </div>
                <div className="bg-neutral-200 p-[6px] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </div>
            )
          )}
        </div>
        <div className="border-t p-4 w-full">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border outline-sky-300 px-3 py-2 w-full rounded-lg"
              placeholder="Type you're message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              onClick={sendMessage}
              className="bg-sky-300 rounded-lg p-2 text-white flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
