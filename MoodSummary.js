import React from 'react'
import { getMoodStats } from '../Utils/MoodUtils'
import './MoodSummary.css';

const MoodSummary = ({ moods, weekDates }) => {
  const { moodCount, mostCommon, goodDays, badDays } = getMoodStats(moods, weekDates)

    // Calculate total count of moods recorded (sum of all moods)
  const totalCount = Object.values(moodCount).reduce((sum, count) => sum + count, 0);

  return (
    <div className="summary-box">
      <h2 className="summary-title">Weekly Mood Summary</h2>
      <p>Most common mood: <strong>{mostCommon || 'None'}</strong></p>
      <p>Good days: {goodDays} | Bad days: {badDays}</p>

      <div className="mood-bar">
        {Object.entries(moodCount).map(([mood, count]) => (
          <div
            key={mood}
            className={`mood-bar ${mood === 'Happy' ? 'bg-green-400' : mood === 'Sad' ? 'bg-red-400' : 'bg-yellow-400'}`}
            style={{ width: `${(count / totalCount) * 100}%` }}
            title={`${mood}: ${count}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MoodSummary;