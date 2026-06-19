/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SessionRecommendation } from '../data/recommendations'

interface SessionCardProps {
  recommendation: SessionRecommendation
  rank?: number
  showPath?: boolean
  highlighted?: boolean
}

export default function SessionCard({ recommendation, rank, showPath, highlighted }: SessionCardProps) {
  const { session, matchReasons, speakerName } = recommendation

  return (
    <article className={`session-card${highlighted ? ' session-card-highlighted' : ''}`}>
      {rank !== undefined && <span className="session-rank">#{rank}</span>}
      <div className="session-card-header">
        <div>
          <p className="session-time-block">
            {session.startTime} – {session.endTime}
            {session.room && <span className="session-room-badge">{session.room}</span>}
          </p>
          <h3>{session.title}</h3>
          <p className="session-speaker">{speakerName}</p>
        </div>
        {!showPath && (
          <span className="session-score">{recommendation.score} match{recommendation.score !== 1 ? 'es' : ''}</span>
        )}
      </div>
      <p className="session-desc">{session.description}</p>
      {matchReasons.length > 0 && (
        <div className="match-reasons">
          {matchReasons.map((reason) => (
            <span key={reason} className="match-chip">{reason}</span>
          ))}
        </div>
      )}
    </article>
  )
}
