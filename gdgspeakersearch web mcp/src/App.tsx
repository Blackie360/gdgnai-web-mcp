import { HashRouter as Router } from 'react-router-dom'
import { AgentUiProvider } from './context/AgentUiContext'
import EventHeader from './components/EventHeader'
import WebMcpRoutes from './WebMcpRoutes'
import './EventApp.css'

export default function App() {
  return (
    <Router>
      <AgentUiProvider>
        <div className="event-app">
          <EventHeader />
          <main>
            <WebMcpRoutes />
          </main>
          <footer className="event-footer">
            <p>Organized by GDG Nairobi · Google I/O Extended Nairobi 2026</p>
            <p className="event-footer-sub">
              Android, web, Flutter, AI/ML, Firebase, cloud — all experience levels welcome.
            </p>
          </footer>
        </div>
      </AgentUiProvider>
    </Router>
  )
}
