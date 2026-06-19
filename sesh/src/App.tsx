import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  agentTools,
  agenda,
  eventInfo,
  organizers,
  recommendations,
  speakers,
  type AgendaItem,
  type Speaker,
  type Theme,
} from './data/event'
import { registerWebMcpTools } from './webmcp'

const allThemes = Array.from(
  new Set(agenda.flatMap((item) => item.themes)),
) as Theme[]

const allRooms = Array.from(new Set(agenda.map((item) => item.room)))

const speakerById = new Map(speakers.map((speaker) => [speaker.id, speaker]))

function speakerNames(item: AgendaItem) {
  return item.speakerIds
    .map((speakerId) => speakerById.get(speakerId)?.name)
    .filter(Boolean)
    .join(', ')
}

function sessionMatches(
  item: AgendaItem,
  query: string,
  activeTheme: string,
  activeRoom: string,
) {
  const haystack = [
    item.title,
    item.description,
    item.room,
    item.time,
    item.type,
    speakerNames(item),
    item.themes.join(' '),
  ]
    .join(' ')
    .toLowerCase()

  const matchesQuery = query.trim()
    ? haystack.includes(query.trim().toLowerCase())
    : true
  const matchesTheme = activeTheme === 'all' || item.themes.includes(activeTheme as Theme)
  const matchesRoom = activeRoom === 'all' || item.room === activeRoom

  return matchesQuery && matchesTheme && matchesRoom
}

function speakerInitials(speaker: Speaker) {
  return speaker.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function App() {
  const [query, setQuery] = useState('')
  const [activeTheme, setActiveTheme] = useState('all')
  const [activeRoom, setActiveRoom] = useState('all')

  useEffect(
    () =>
      registerWebMcpTools({
        onSearch(input) {
          if (input.query !== undefined) {
            setQuery(input.query)
          }
          if (input.theme) {
            setActiveTheme(input.theme as Theme)
          }
          if (input.room) {
            setActiveRoom(input.room)
          }
        },
      }),
    [],
  )

  const filteredAgenda = useMemo(
    () =>
      agenda.filter((item) => sessionMatches(item, query, activeTheme, activeRoom)),
    [activeRoom, activeTheme, query],
  )

  return (
    <main>
      <section className="hero-panel" aria-labelledby="event-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{eventInfo.chapter} presents</p>
            <h1 id="event-title">{eventInfo.title}</h1>
            <p className="hero-summary">{eventInfo.summary}</p>
            <div className="hero-actions" aria-label="Primary event actions">
              <a className="primary-action" href={eventInfo.rsvpUrl} target="_blank">
                RSVP on GDG
              </a>
              <a className="secondary-action" href="/.well-known/webmcp.json">
                View manifest
              </a>
            </div>
          </div>

          <aside className="status-board" aria-label="Event facts">
            <div className="io-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <dl className="event-facts">
              <div>
                <dt>When</dt>
                <dd>
                  {eventInfo.date}
                  <span>
                    {eventInfo.startTime} - {eventInfo.endTime} ({eventInfo.timezone})
                  </span>
                </dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>
                  {eventInfo.venue.name}
                  <span>
                    {eventInfo.venue.address}, {eventInfo.venue.city},{' '}
                    {eventInfo.venue.postalCode}
                  </span>
                </dd>
              </div>
              <div>
                <dt>RSVPs</dt>
                <dd>{eventInfo.rsvpCount.toLocaleString()} confirmed</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="theme-strip" aria-label="Key themes">
        {eventInfo.themes.map((theme) => (
          <span key={theme}>{theme}</span>
        ))}
      </section>

      <section className="dashboard-grid" aria-label="Event dashboard">
        <article className="panel agenda-panel" aria-labelledby="agenda-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Agenda explorer</p>
              <h2 id="agenda-heading">Sessions, rooms, and agent-readable queries</h2>
            </div>
            <p>{filteredAgenda.length} matching items</p>
          </div>

          <div className="filters" role="search" aria-label="Search sessions">
            <label>
              <span>Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try WebMCP, Firebase, Room 2..."
              />
            </label>
            <label>
              <span>Theme</span>
              <select
                value={activeTheme}
                onChange={(event) => setActiveTheme(event.target.value)}
              >
                <option value="all">All themes</option>
                {allThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Room</span>
              <select
                value={activeRoom}
                onChange={(event) => setActiveRoom(event.target.value)}
              >
                <option value="all">All rooms</option>
                {allRooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="agenda-list">
            {filteredAgenda.map((item) => (
              <article className="agenda-card" key={item.id}>
                <div className="agenda-time">
                  <time>{item.time}</time>
                  <span>{item.room}</span>
                </div>
                <div className="agenda-content">
                  <div className="agenda-title-row">
                    <h3>{item.title}</h3>
                    <span className={`type-badge ${item.type}`}>{item.type}</span>
                  </div>
                  <p>{item.description}</p>
                  {item.speakerIds.length > 0 && (
                    <p className="speaker-line">{speakerNames(item)}</p>
                  )}
                  <div className="meta-row">
                    {item.themes.map((theme) => (
                      <span className="topic" key={theme}>
                        {theme}
                      </span>
                    ))}
                  </div>
                    <code className="agent-chip">{item.toolQuery}</code>
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside className="panel agent-panel" aria-labelledby="agent-heading">
          <p className="eyebrow">Agent-ready surface</p>
          <h2 id="agent-heading">Static WebMCP-style tools</h2>
          <p>
            Agents can inspect public JSON, use deterministic read-only tool
            descriptions, and cite source links without sending attendee data anywhere.
          </p>
          <div className="tool-links">
            <a href="/webmcp/event.json">event.json</a>
            <a href="/webmcp/tools.json">tools.json</a>
          </div>
          <div className="tool-list">
            {agentTools.map((tool) => (
              <article key={tool.name}>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <code>{tool.example}</code>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="content-grid" aria-label="Event content">
        <article className="panel" aria-labelledby="recommendations-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated paths</p>
              <h2 id="recommendations-heading">Recommendations by attendee goal</h2>
            </div>
          </div>
          <div className="recommendation-grid">
            {recommendations.map((recommendation) => (
              <article className="recommendation-card" key={recommendation.id}>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.audience}</p>
                <ol>
                  {recommendation.sessionIds.map((sessionId) => {
                    const session = agenda.find((item) => item.id === sessionId)
                    return session ? <li key={sessionId}>{session.title}</li> : null
                  })}
                </ol>
              </article>
            ))}
          </div>
        </article>

        <article className="panel venue-panel" aria-labelledby="venue-heading">
          <p className="eyebrow">Venue</p>
          <h2 id="venue-heading">{eventInfo.venue.name}</h2>
          <p>
            {eventInfo.venue.address}, {eventInfo.venue.city},{' '}
            {eventInfo.venue.postalCode}
          </p>
          <div className="venue-map" aria-hidden="true">
            <span>Waiyaki Way</span>
            <strong>Aspire Center</strong>
            <small>Westlands</small>
          </div>
          <ul className="audience-list">
            {eventInfo.audience.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel people-section" aria-labelledby="people-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Directory</p>
            <h2 id="people-heading">Speakers and organizers</h2>
          </div>
          <p>Public profiles from the event listing</p>
        </div>

        <div className="speaker-grid">
          {speakers
            .filter((speaker) => speaker.id !== 'gdg-nairobi')
            .map((speaker) => (
              <article className="speaker-card" key={speaker.id}>
                <div className="avatar" aria-hidden="true">
                  {speakerInitials(speaker)}
                </div>
                <div>
                  <h3>{speaker.name}</h3>
                  <p>{speaker.role}</p>
                  {speaker.organization && <p>{speaker.organization}</p>}
                  <div className="meta-row">
                    {speaker.focus.slice(0, 3).map((focus) => (
                      <span className="topic" key={focus}>
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
        </div>

        <div className="organizer-strip" aria-label="Organizers">
          {organizers.map((organizer) => (
            <article key={organizer.id}>
              <h3>{organizer.name}</h3>
              <p>{organizer.role}</p>
              {organizer.organization && <span>{organizer.organization}</span>}
              {organizer.note && <span>{organizer.note}</span>}
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>
          Read-only demo. No accounts, no forms, no attendee tracking. Sources:{' '}
          {eventInfo.sources.map((source, index) => (
            <span key={source.url}>
              <a href={source.url} target="_blank">
                {source.label}
              </a>
              {index < eventInfo.sources.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </footer>
    </main>
  )
}

export default App
