import type { Speaker } from '../data/event'
import { getSessionsForSpeaker } from '../data/event'

interface SpeakerCardProps {
  speaker: Speaker
  highlight?: boolean
}

export default function SpeakerCard({ speaker, highlight }: SpeakerCardProps) {
  const sessions = getSessionsForSpeaker(speaker.id).filter((s) => s.room)

  return (
    <article className={`speaker-card${highlight ? ' speaker-card-highlight' : ''}`}>
      <div className="speaker-avatar" aria-hidden="true">
        {speaker.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </div>
      <div className="speaker-body">
        <h3>{speaker.name}</h3>
        <p className="speaker-title">{speaker.title}</p>
        {speaker.bio && <p className="speaker-bio">{speaker.bio}</p>}
        {sessions.length > 0 && (
          <ul className="speaker-sessions">
            {sessions.map((s) => (
              <li key={s.id}>
                <span className="session-time">{s.startTime}</span>
                {s.title}
                {s.room && <span className="session-room">{s.room}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
