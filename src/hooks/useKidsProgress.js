import { useEffect, useMemo, useState } from 'react'
import { kidsActivities } from '../data/kidsCourse.js'

const KEY = 'aerolab-kids-v3-progress'
const INITIAL = { completed: [], stars: 0, xp: 0, lastActivityId: null, attempts: {}, startedAt: new Date().toISOString() }

function load() {
  try { return { ...INITIAL, ...JSON.parse(localStorage.getItem(KEY) || '{}') } }
  catch { return INITIAL }
}

export function useKidsProgress() {
  const [kidsProgress, setKidsProgress] = useState(load)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(kidsProgress)), [kidsProgress])

  const completeKidsActivity = (activity) => {
    setKidsProgress((current) => {
      const attempts = { ...current.attempts, [activity.id]: (current.attempts?.[activity.id] ?? 0) + 1 }
      if (current.completed.includes(activity.id)) return { ...current, attempts, lastActivityId: activity.id }
      return {
        ...current,
        completed: [...current.completed, activity.id],
        stars: current.stars + (activity.stars ?? 1),
        xp: current.xp + (activity.xp ?? 20),
        attempts,
        lastActivityId: activity.id,
      }
    })
  }

  const recordKidsAttempt = (activityId) => setKidsProgress((current) => ({
    ...current,
    attempts: { ...current.attempts, [activityId]: (current.attempts?.[activityId] ?? 0) + 1 },
    lastActivityId: activityId,
  }))

  const resetKidsProgress = () => setKidsProgress(INITIAL)
  const percent = useMemo(() => Math.round((kidsProgress.completed.length / kidsActivities.length) * 100), [kidsProgress.completed.length])
  return { kidsProgress, completeKidsActivity, recordKidsAttempt, resetKidsProgress, percent }
}
