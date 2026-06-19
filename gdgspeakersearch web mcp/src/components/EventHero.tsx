/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import ioExtendedLogo from '../assets/io-extended-nairobi-logo.png'
import { EVENT } from '../data/event'

export default function EventHero() {
  return (
    <section className="event-hero">
      <div className="event-hero-content">
        <img
          src={ioExtendedLogo}
          alt="Google I/O Extended Nairobi"
          className="event-hero-logo"
        />
        <p className="event-badge">GDG Nairobi · {EVENT.date}</p>
        <h1>{EVENT.name}</h1>
        <p className="event-hero-desc">{EVENT.description}</p>
        <div className="event-meta">
          <div className="event-meta-item">
            <strong>When</strong>
            <span>{EVENT.time}</span>
          </div>
          <div className="event-meta-item">
            <strong>Where</strong>
            <span>{EVENT.venue}</span>
            <span className="event-meta-sub">{EVENT.address}</span>
          </div>
        </div>
        <div className="event-themes">
          {EVENT.themes.map((theme) => (
            <span key={theme} className="theme-chip">{theme}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
