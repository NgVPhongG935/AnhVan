import { useEffect, useState } from 'react'

const initial = { learnedWords: [], difficultWords: [], listeningDone: 0, grammarDone: 0, speakingDone: 0, writingDone: 0, xp: 0, streak: 1, lastStudyDate: null }

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try { return { ...initial, ...JSON.parse(localStorage.getItem('toeic-progress')) } } catch { return initial }
  })
  useEffect(() => { localStorage.setItem('toeic-progress', JSON.stringify(progress)) }, [progress])
  const record = (updates, xp = 10) => setProgress(prev => {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const streak = prev.lastStudyDate === today ? prev.streak : prev.lastStudyDate === yesterday ? prev.streak + 1 : 1
    return { ...prev, ...updates(prev), xp: prev.xp + xp, streak, lastStudyDate: today }
  })
  return [progress, record]
}

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('toeic-theme') === 'dark')
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('toeic-theme', dark ? 'dark' : 'light') }, [dark])
  return [dark, setDark]
}
