import { Link, useLocation } from 'react-router-dom'
import ioExtendedLogo from '../assets/io-extended-nairobi-logo.png'

export default function EventHeader() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/discover', label: 'Discover' },
    { to: '/speakers', label: 'Speakers' },
    { to: '/agenda', label: 'Agenda' },
    { to: '/recommend', label: 'My Schedule' },
  ]

  return (
    <header className="event-header">
      <div className="event-header-inner">
        <Link to="/" className="event-logo">
          <img
            src={ioExtendedLogo}
            alt="Google I/O Extended Nairobi"
            className="event-logo-img"
          />
        </Link>
        <nav className="event-nav">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
