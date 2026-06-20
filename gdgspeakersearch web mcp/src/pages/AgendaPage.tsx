import AgendaTimeline from '../components/AgendaTimeline'

export default function AgendaPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Agenda</h1>
        <p>
          Saturday, June 20, 2026 · 8:00 AM – 5:00 PM · Simba Corporation Aspire Center, Westlands
        </p>
      </header>
      <AgendaTimeline />
    </div>
  )
}
