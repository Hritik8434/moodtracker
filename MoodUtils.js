export const getCurrentWeekDates = () => {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(d.getDate() + i)
    return d.toISOString().split('T')[0]
  })
}

//export data for week
export const getMoodStats = (moods, dates) => {
  const moodCount = { Happy: 0, Neutral: 0, Sad: 0 }
  let goodDays = 0, badDays = 0

  dates.forEach(date => {
    const mood = moods[date]?.mood
    if (mood) {
      moodCount[mood]++
      if (mood === 'Happy') goodDays++
      if (mood === 'Sad') badDays++
    }
  })

  const mostCommon = Object.entries(moodCount).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
  return { moodCount, mostCommon, goodDays, badDays }
}

export const getDominantMood = (moods, dates) => {
  let totalScore = 0
  dates.forEach(date => {
    const score = moods[date]?.score || 0
    totalScore += score
  })
  return totalScore > 0 ? 'Happy' : totalScore < 0 ? 'Sad' : 'Neutral'
}