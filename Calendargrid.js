import React from 'react'
import MoodSelector from './MoodSelector'
import './Calendargrid.css';

const CalendarGrid = ({ moods, setMoods, weekDates }) => {
  const handleMoodChange = (date, mood) => {
    const newMoods = { ...moods }
    if (mood) {
      newMoods[date] = { mood, score: mood === 'Happy' ? 2 : mood === 'Neutral' ? 1 : -1 }
    } else {
      delete newMoods[date]
    }
    setMoods(newMoods)
  }
  return (
    <div className="calendar-grid">
      {weekDates.map(date => (
        <div key={date} className="calendar-cell">
          <div className="calendar-day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <MoodSelector
            date={date}
            currentMood={moods[date]?.mood}
            onChange={(mood) => handleMoodChange(date, mood)}
          />
        </div>
      ))}   
    </div>
  )
}

export default CalendarGrid