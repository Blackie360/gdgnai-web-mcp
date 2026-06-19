/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react'
import { useAgentUi } from '../context/AgentUiContext'

export default function AgentToast() {
  const { toast, dismissToast } = useAgentUi()

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => dismissToast(), 6000)
    return () => window.clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

  return (
    <div className={`agent-toast agent-toast-${toast.tone}`} role="status">
      <span className="agent-toast-icon" aria-hidden="true">
        {toast.tone === 'success' ? '✓' : 'ℹ'}
      </span>
      <p>{toast.message}</p>
      <button type="button" className="agent-toast-close" onClick={dismissToast} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
