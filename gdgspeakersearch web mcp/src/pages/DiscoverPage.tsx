/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import InterestPicker from '../components/InterestPicker'
import SessionCard from '../components/SessionCard'
import SpeakerCard from '../components/SpeakerCard'
import { SPEAKERS, getSpeakerById } from '../data/event'
import { recommendSessions, getTopSpeakers } from '../data/recommendations'
import { useAgentUi } from '../context/AgentUiContext'
import { setCurrentInterests } from '../webmcp'

export default function DiscoverPage() {
  const { interests, setInterests, schedulePathIds } = useAgentUi()

  const schedule = useMemo(() => recommendSessions(interests), [interests])
  const topSpeakerIds = useMemo(() => getTopSpeakers(interests, 6), [interests])

  const speakers = SPEAKERS.filter((s) => s.id !== 'gdg-nairobi')

  useEffect(() => {
    setCurrentInterests(interests)
  }, [interests])

  const hasResults = schedule.recommendations.length > 0

  return (
    <div className="page">
      <header className="page-header">
        <h1>Discover Speakers &amp; Plan Your Day</h1>
        <p>
          See who&apos;s speaking at Google I/O Extended Nairobi and build a personalized, conflict-free schedule.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Who&apos;s speaking</h2>
          <p>Developers, GDEs, and community leaders from across Nairobi and beyond.</p>
          <Link to="/speakers" className="link-more">View full speaker profiles →</Link>
        </div>
        <div className="speaker-grid">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Build your schedule</h2>
          <p>Select interests to get tailored recommendations and a conflict-free path through the day.</p>
        </div>

        <InterestPicker selected={interests} onChange={setInterests} />

        {schedulePathIds.length > 0 && (
          <div className="agent-schedule-banner" role="status">
            <strong>Your path today</strong>
            <span>{schedulePathIds.length} sessions in your conflict-free schedule</span>
          </div>
        )}

        {!hasResults && interests.length > 0 && (
          <p className="empty-state">No exact matches — try adding more interests.</p>
        )}

        {hasResults && (
          <>
            <div className="section">
              <div className="section-header">
                <h2>Your suggested path</h2>
                <p>One talk per time slot — no room conflicts. Highlighted when the agent builds your schedule.</p>
              </div>
              <div className="session-list">
                {schedule.suggestedPath.map((rec, i) => (
                  <SessionCard
                    key={rec.session.id}
                    recommendation={rec}
                    rank={i + 1}
                    showPath
                    highlighted={schedulePathIds.includes(rec.session.id)}
                  />
                ))}
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <h2>Top matching sessions</h2>
                <p>Ranked by how well they match your interests.</p>
              </div>
              <div className="session-list">
                {schedule.recommendations.slice(0, 6).map((rec) => (
                  <SessionCard
                    key={rec.session.id}
                    recommendation={rec}
                    highlighted={schedulePathIds.includes(rec.session.id)}
                  />
                ))}
              </div>
              <p style={{ marginTop: 12 }}>
                <Link to="/recommend" className="link-more">See full recommendations and all matching speakers →</Link>
              </p>
            </div>

            {topSpeakerIds.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <h2>Speakers you should hear</h2>
                  <p>Based on your selected interests.</p>
                </div>
                <div className="speaker-grid speaker-grid-compact">
                  {topSpeakerIds.map((id) => {
                    const speaker = getSpeakerById(id)
                    if (!speaker) return null
                    return <SpeakerCard key={id} speaker={speaker} highlight />
                  })}
                </div>
              </div>
            )}
          </>
        )}

        <div className="cta-section" style={{ marginTop: 24 }}>
          <h2>Want the full timetable?</h2>
          <p>Switch to the Agenda to see every talk across all rooms, with your picks highlighted.</p>
          <Link to="/agenda" className="btn btn-secondary">Browse full agenda</Link>
        </div>
      </section>
    </div>
  )
}
