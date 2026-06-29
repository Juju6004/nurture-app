// Gestational-age math.
//
// Standard obstetric dating: a pregnancy is 280 days (40 weeks) from the last
// menstrual period (LMP). The estimated due date (EDD) = LMP + 280 days, so
// LMP = EDD - 280 days, and current gestational age = (today - LMP).
//
// The app lets a user enter EITHER their due date or their current week; both
// resolve to the same internal value: completed gestational weeks + days.

const MS_PER_DAY = 1000 * 60 * 60 * 24
const GESTATION_DAYS = 280

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// Given an EDD (Date or ISO string), return gestational age today.
export function gestationFromDueDate(dueDate, today = new Date()) {
  const edd = startOfDay(dueDate)
  const lmp = new Date(edd.getTime() - GESTATION_DAYS * MS_PER_DAY)
  const days = Math.floor((startOfDay(today) - lmp) / MS_PER_DAY)
  return normalizeGestation(days)
}

// Given a current week (and optional days), return gestational age + the
// implied due date, so either entry path produces a consistent state.
export function gestationFromWeek(weeks, days = 0, today = new Date()) {
  const totalDays = weeks * 7 + days
  const lmp = new Date(startOfDay(today).getTime() - totalDays * MS_PER_DAY)
  const edd = new Date(lmp.getTime() + GESTATION_DAYS * MS_PER_DAY)
  return { ...normalizeGestation(totalDays), dueDate: edd }
}

function normalizeGestation(totalDays) {
  const clamped = Math.max(0, totalDays)
  const weeks = Math.floor(clamped / 7)
  const days = clamped % 7
  return {
    totalDays: clamped,
    weeks,
    days,
    trimester: trimesterForWeek(weeks),
    label: `${weeks}w${days}d`,
  }
}

// ACOG trimester convention: 1st = weeks 0–13, 2nd = 14–27, 3rd = 28+.
export function trimesterForWeek(weeks) {
  if (weeks < 14) return 1
  if (weeks < 28) return 2
  return 3
}

export function trimesterLabel(t) {
  return { 1: 'First trimester', 2: 'Second trimester', 3: 'Third trimester' }[t] || '—'
}

// Weeks remaining until the 40-week mark (can go negative if past dates).
export function weeksToGo(weeks) {
  return Math.max(0, 40 - weeks)
}
