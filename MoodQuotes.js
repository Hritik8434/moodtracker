import React, { useEffect, useState } from 'react'
import './MoodQuotes.css';

const MoodQuote = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('quote'))
    const now = new Date()

    if (stored && new Date(stored.date).toDateString() === now.toDateString()) {
      setQuote(stored.quote)
    } else {
      fetch('https://api.quotable.io/random')
        .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()})
        .then(data => {
          setQuote(data.content)
          localStorage.setItem('quote', JSON.stringify({ quote: data.content, date: now }))
        })
        .catch(err => {
        console.error("Failed to fetch quote:", err)
        setQuote("“Stay positive, keep going!”") // fallback
      })
    }
  }, [])

  return (
    <div className="mood-quote">
      "{quote}"
    </div>
  )
}

export default MoodQuote