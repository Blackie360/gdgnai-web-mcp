/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import SpeakerCard from '../components/SpeakerCard'
import { SPEAKERS } from '../data/event'

export default function SpeakersPage() {
  const speakers = SPEAKERS.filter((s) => s.id !== 'gdg-nairobi')

  return (
    <div className="page">
      <header className="page-header">
        <h1>Speakers</h1>
        <p>
          Meet the developers, GDEs, and community leaders sharing what they learned from Google I/O 2026.
        </p>
      </header>
      <div className="speaker-grid">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </div>
  )
}
