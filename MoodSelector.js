import React from 'react'
import './MoodSelectors.css';

const moods = ['Happy', 'Neutral', 'Sad']

const MoodSelector = ({ date, currentMood, onChange = () => {} }) => (
  <div className="space-y-2">
    {moods.map(mood => (
      <button
        key={mood}
        onClick={() => onChange(mood)}
        className={`mood-button ${currentMood === mood ? 'active' : ''}`}
      >
        {mood}
      </button>
    ))}
    {currentMood && (
      <button
        onClick={() => onChange(null)}
        className="text-xs text-red-500 mt-1"
      >
        Clear
      </button>
    )}
  </div>
)

export default MoodSelector;