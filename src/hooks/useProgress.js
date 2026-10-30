import { useEffect, useMemo, useState } from 'react'
import { getActivity, lessons, specialActivities } from '../data/course.js'
import { clearProgress, initialProgress, loadProgress, saveProgress, touchToday } from '../services/progressService.js'

export function useProgress() {
  const [progress, setProgress] = useState(() => touchToday(loadProgress()))

  useEffect(() => saveProgress(progress), [progress])

  const completeActivity = (activityId) => {
    const activity = getActivity(activityId)
    if (!activity) return
    const isSpecial = specialActivities.some((item) => item.id === activityId)

    setProgress((current) => {
      const key = isSpecial ? 'completedSpecials' : 'completedLessons'
      if (current[key].includes(activityId)) return touchToday({ ...current, lastActivityId: activityId })
      return touchToday({
        ...current,
        [key]: [...current[key], activityId],
        xp: current.xp + (activity.xp ?? 0),
        stars: current.stars + (activity.stars ?? 1),
        lastActivityId: activityId,
      })
    })
  }

  const touchActivity = (activityId) => {
    setProgress((current) => touchToday({ ...current, lastActivityId: activityId }))
  }

  const recordHint = (activityId, hintNumber) => {
    setProgress((current) => ({
      ...touchToday(current),
      hintsUsed: {
        ...current.hintsUsed,
        [activityId]: Math.max(current.hintsUsed?.[activityId] ?? 0, hintNumber),
      },
    }))
  }

  const recordAttempt = (activityId, { code, output, ok }) => {
    setProgress((current) => {
      const prev = current.attempts?.[activityId] ?? { total: 0, success: 0, failed: 0 }
      const history = current.attemptHistory?.[activityId] ?? []
      const snapshot = {
        at: new Date().toISOString(),
        ok: Boolean(ok),
        code,
        output: String(output ?? '').slice(0, 900),
      }
      return {
        ...touchToday(current),
        attempts: {
          ...current.attempts,
          [activityId]: {
            total: prev.total + 1,
            success: prev.success + (ok ? 1 : 0),
            failed: prev.failed + (ok ? 0 : 1),
          },
        },
        attemptHistory: {
          ...current.attemptHistory,
          [activityId]: [...history, snapshot].slice(-10),
        },
      }
    })
  }

  const savePlacement = (placement) => {
    setProgress((current) => touchToday({ ...current, placement }))
  }

  const completeReview = (milestone, score) => {
    setProgress((current) => {
      if ((current.reviewCompletions ?? []).includes(milestone)) return current
      return touchToday({
        ...current,
        reviewCompletions: [...(current.reviewCompletions ?? []), milestone],
        xp: current.xp + 40,
        stars: current.stars + (score >= 4 ? 1 : 0),
      })
    })
  }

  const resetProgress = () => {
    clearProgress()
    setProgress(touchToday({ ...initialProgress, startedAt: new Date().toISOString() }))
  }

  const totalPercent = useMemo(() => Math.round((progress.completedLessons.length / lessons.length) * 100), [progress.completedLessons])
  const evalPercent = useMemo(() => Math.round(((progress.completedLessons.length + progress.completedSpecials.length) / (lessons.length + specialActivities.length)) * 100), [progress.completedLessons, progress.completedSpecials])

  return { progress, completeActivity, touchActivity, recordHint, recordAttempt, savePlacement, completeReview, resetProgress, totalPercent, evalPercent }
}
