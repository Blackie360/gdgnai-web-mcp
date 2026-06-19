/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type Interest,
  type Session,
  INTEREST_LABELS,
  getSpeakerById,
  getTechnicalSessions,
} from './event'

export interface SessionRecommendation {
  session: Session
  score: number
  matchReasons: string[]
  speakerName: string
}

export interface PersonalizedSchedule {
  recommendations: SessionRecommendation[]
  suggestedPath: SessionRecommendation[]
  interests: Interest[]
}

function scoreSession(session: Session, interests: Interest[]): SessionRecommendation {
  const matchReasons: string[] = []
  let score = 0

  for (const interest of interests) {
    if (session.interests.includes(interest)) {
      score += 1
      matchReasons.push(INTEREST_LABELS[interest])
    }
  }

  if (session.isKeynote) {
    score += 2
    matchReasons.push('Keynote — recommended for everyone')
  }

  const speaker = session.speakerId ? getSpeakerById(session.speakerId) : undefined

  return {
    session,
    score,
    matchReasons,
    speakerName: speaker?.name ?? 'GDG Nairobi',
  }
}

export function recommendSessions(interests: Interest[]): PersonalizedSchedule {
  const technical = getTechnicalSessions()
  const scored = technical
    .map((session) => scoreSession(session, interests))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  const suggestedPath = buildConflictFreePath(scored)

  return {
    recommendations: scored,
    suggestedPath,
    interests,
  }
}

function buildConflictFreePath(
  ranked: SessionRecommendation[],
): SessionRecommendation[] {
  const bySlot = new Map<string, SessionRecommendation[]>()

  for (const rec of ranked) {
    const slot = rec.session.startTime
    const existing = bySlot.get(slot) ?? []
    existing.push(rec)
    bySlot.set(slot, existing)
  }

  const path: SessionRecommendation[] = []
  const slots = [...bySlot.keys()].sort()

  for (const slot of slots) {
    const candidates = bySlot.get(slot) ?? []
  const best = candidates[0]
    if (best) {
      path.push(best)
    }
  }

  return path
}

export function getTopSpeakers(interests: Interest[], limit = 6): string[] {
  const schedule = recommendSessions(interests)
  const speakerScores = new Map<string, number>()

  for (const rec of schedule.recommendations) {
    const id = rec.session.speakerId
    if (!id) continue
    speakerScores.set(id, (speakerScores.get(id) ?? 0) + rec.score)
  }

  return [...speakerScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id)
}
