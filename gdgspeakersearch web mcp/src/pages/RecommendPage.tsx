import { useEffect, useMemo } from 'react'
import InterestPicker from '../components/InterestPicker'
import SessionCard from '../components/SessionCard'
import SpeakerCard from '../components/SpeakerCard'
import { getSpeakerById } from '../data/event'
import { recommendSessions, getTopSpeakers } from '../data/recommendations'
import { useAgentUi } from '../context/AgentUiContext'
import { setCurrentInterests } from '../webmcp'

export default function RecommendPage() {
  const { interests, setInterests, schedulePathIds } = useAgentUi()

  const schedule = useMemo(() => recommendSessions(interests), [interests])
  const topSpeakerIds = useMemo(() => getTopSpeakers(interests, 4), [interests])

  useEffect(() => {
    setCurrentInterests(interests)
  }, [interests])

  const hasResults = schedule.recommendations.length > 0

  return (
    <div className="page">
      <header className="page-header">
        <h1>My Schedule</h1>
        <p>
          Pick your interests and we&apos;ll suggest sessions to attend and speakers to listen to —
          with a conflict-free path through parallel tracks.
        </p>
      </header>

      {schedulePathIds.length > 0 && (
        <div className="agent-schedule-banner" role="status">
          <strong>Your path today</strong>
          <span>{schedulePathIds.length} sessions in your conflict-free schedule</span>
        </div>
      )}

      <InterestPicker selected={interests} onChange={setInterests} />

      {!hasResults && interests.length > 0 && (
        <p className="empty-state">No exact matches — try adding more interests.</p>
      )}

      {hasResults && (
        <>
          <section className="section">
            <div className="section-header">
              <h2>Your suggested path</h2>
              <p>One talk per time slot — no room conflicts.</p>
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
          </section>

          <section className="section">
            <div className="section-header">
              <h2>All matching sessions</h2>
              <p>Ranked by how well they match your interests.</p>
            </div>
            <div className="session-list">
              {schedule.recommendations.map((rec) => (
                <SessionCard
                  key={rec.session.id}
                  recommendation={rec}
                  highlighted={schedulePathIds.includes(rec.session.id)}
                />
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h2>Speakers to listen to</h2>
              <p>Based on your top-matching sessions.</p>
            </div>
            <div className="speaker-grid speaker-grid-compact">
              {topSpeakerIds.map((id) => {
                const speaker = getSpeakerById(id)
                if (!speaker) return null
                return <SpeakerCard key={id} speaker={speaker} highlight />
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
