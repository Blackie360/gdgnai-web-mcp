import { SESSIONS, getSpeakerById } from '../data/event'
import { useAgentUi } from '../context/AgentUiContext'

export default function AgendaTimeline() {
  const { highlightedSessionIds, schedulePathIds } = useAgentUi()

  return (
    <div className="agenda-timeline">
      {highlightedSessionIds.length > 0 && (
        <div className="agenda-highlight-legend">
          <span className="legend-dot schedule-pick" />
          Your schedule picks are highlighted below
        </div>
      )}
      {SESSIONS.map((session) => {
        const speaker = session.speakerId ? getSpeakerById(session.speakerId) : undefined
        const isParallel = SESSIONS.filter(
          (s) => s.startTime === session.startTime && s.id !== session.id && s.room,
        ).length > 0
        const isHighlighted = highlightedSessionIds.includes(session.id)
        const isSchedulePick = schedulePathIds.includes(session.id)

        return (
          <div
            key={session.id}
            id={`session-${session.id}`}
            className={`agenda-item${session.isBreak ? ' agenda-break' : ''}${session.isKeynote ? ' agenda-keynote' : ''}${isHighlighted ? ' agenda-item-highlighted' : ''}${isSchedulePick ? ' agenda-item-schedule-pick' : ''}`}
          >
            <div className="agenda-time">
              <span>{session.startTime}</span>
              <span className="agenda-end">{session.endTime}</span>
            </div>
            <div className="agenda-content">
              {isSchedulePick && (
                <span className="agenda-pick-badge">Your pick</span>
              )}
              <h3>{session.title}</h3>
              {speaker && <p className="agenda-speaker">{speaker.name}</p>}
              {session.room && <span className="agenda-room">{session.room}</span>}
              {isParallel && session.room && (
                <span className="agenda-parallel-hint">Parallel track — pick one room</span>
              )}
              {!session.isBreak && (
                <p className="agenda-desc">{session.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
