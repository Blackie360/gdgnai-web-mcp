import { Link } from 'react-router-dom'
import EventHero from '../components/EventHero'
import SpeakerCard from '../components/SpeakerCard'
import { SPEAKERS } from '../data/event'

const FEATURED_IDS = [
  'felix-jumason',
  'shadrack-inusah',
  'wayne-gakuo',
  'auwal-ms',
  'gabriel-agbobli',
  'wycliffe-maina',
]

export default function HomePage() {
  const featured = SPEAKERS.filter((s) => FEATURED_IDS.includes(s.id))

  return (
    <div className="page">
      <EventHero />
      <section className="section">
        <div className="section-header">
          <h2>Find your talks</h2>
          <p>Tell us what you build — we&apos;ll suggest sessions and speakers worth your time.</p>
          <Link to="/discover" className="btn btn-primary">Show speakers &amp; plan my day</Link>
          <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--text-muted)' }}>
            or <Link to="/recommend" style={{ color: 'var(--g-blue)' }}>refine my schedule</Link>
          </span>
        </div>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>Featured speakers</h2>
          <Link to="/discover" className="link-more">See all speakers + plan your day →</Link>
        </div>
        <div className="speaker-grid">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} highlight />
          ))}
        </div>
      </section>
      <section className="section cta-section">
        <h2>Three rooms. One incredible day.</h2>
        <p>Parallel tracks run from 10:00 AM — use My Schedule to avoid missing the talks that matter to you.</p>
        <Link to="/agenda" className="btn btn-secondary">Browse full agenda</Link>
      </section>
    </div>
  )
}
