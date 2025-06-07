import React, { useEffect, useState } from 'react'
import CalendarGrid from './components/Calendargrid'
import MoodSummary from './components/MoodSummary'
import MoodQuote from './components/MoodQuotes'
import MoodSelector from './components/MoodSelector'
import './App.css';
import home from './assets/home.jpg'

// eslint-disable-next-line no-unused-vars
import { getMoodStats, getCurrentWeekDates, getDominantMood } from './Utils/MoodUtils'

const App = () => {
  const [moods, setMoods] = useState(() => JSON.parse(localStorage.getItem('moods')) || {})

  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods))
  }, [moods])

  const weekDates = getCurrentWeekDates()
  const dominantMood = getDominantMood(moods, weekDates)

  const bgColor = {
    Happy: 'bg-green-100',
    Neutral: 'bg-yellow-100',
    Sad: 'bg-red-100',
  }[dominantMood] || 'bg-white'

   const bgStyle = {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(6, 51, 100, 0.85), rgba(240, 23, 23, 0.85)), url(${home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-color 0.5s ease',
  }

  return (
     <div className={`app-wrapper ${bgColor}`} style={bgStyle}>
     <div className="overlay">
        <div className="container fade-in">
       <h1 className="header bounce">MoodBoard: Daily Mood Tracker</h1>
        <MoodQuote />
        <CalendarGrid moods={moods} setMoods={setMoods} weekDates={weekDates} />
        <MoodSummary moods={moods} weekDates={weekDates} />
        <MoodSelector  />
      </div>
    </div>
    </div>
  )
}

export default App