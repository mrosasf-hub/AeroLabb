const STORAGE_KEY = 'aeropy-progress-v2'
const LEGACY_KEY = 'aeropy-progress-v1'

export const initialProgress = {
  completedLessons: [],
  completedSpecials: [],
  xp: 0,
  stars: 0,
  lastActivityId: null,
  startedAt: new Date().toISOString(),
  activeDays: [],
  hintsUsed: {},
  attempts: {},
  attemptHistory: {},
  reviewCompletions: [],
  placement: null,
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function normalize(data = {}) {
  return {
    ...initialProgress,
    ...data,
    completedLessons: data.completedLessons ?? [],
    completedSpecials: data.completedSpecials ?? [],
    activeDays: data.activeDays ?? [],
    hintsUsed: data.hintsUsed ?? {},
    attempts: data.attempts ?? {},
    attemptHistory: data.attemptHistory ?? {},
    reviewCompletions: data.reviewCompletions ?? [],
    placement: data.placement ?? null,
  }
}

export function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return normalize(JSON.parse(saved))

    const legacy = localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const old = JSON.parse(legacy)
      return normalize({
        completedLessons: old.completedLessons ?? [],
        xp: old.xp ?? 0,
        stars: old.stars ?? 0,
        lastActivityId: old.lastLessonId ?? null,
      })
    }
  } catch {
    return normalize()
  }
  return normalize()
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function touchToday(progress) {
  const day = todayKey()
  if ((progress.activeDays ?? []).includes(day)) return progress
  return { ...progress, activeDays: [...(progress.activeDays ?? []), day].slice(-45) }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
