/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Interest } from '../data/event'

export interface AgentToast {
  message: string
  tone: 'success' | 'info'
}

interface AgentUiContextValue {
  interests: Interest[]
  schedulePathIds: string[]
  highlightedSessionIds: string[]
  toast: AgentToast | null
  setInterests: (interests: Interest[]) => void
  applyAgentAction: (action: AgentAction) => void
  dismissToast: () => void
}

export interface AgentAction {
  page?: 'home' | 'speakers' | 'agenda' | 'recommend' | 'discover'
  interests?: Interest[]
  schedulePathIds?: string[]
  highlightedSessionIds?: string[]
  scrollToSessionId?: string
  toastMessage?: string
  toastTone?: 'success' | 'info'
}

const AgentUiContext = createContext<AgentUiContextValue | null>(null)

export function AgentUiProvider({ children }: { children: ReactNode }) {
  const [interests, setInterestsState] = useState<Interest[]>(['ai', 'web'])
  const [schedulePathIds, setSchedulePathIds] = useState<string[]>([])
  const [highlightedSessionIds, setHighlightedSessionIds] = useState<string[]>([])
  const [toast, setToast] = useState<AgentToast | null>(null)

  const dismissToast = useCallback(() => setToast(null), [])

  const applyAgentAction = useCallback((action: AgentAction) => {
    if (action.interests) {
      setInterestsState(action.interests)
    }
    if (action.schedulePathIds) {
      setSchedulePathIds(action.schedulePathIds)
    }
    if (action.highlightedSessionIds) {
      setHighlightedSessionIds(action.highlightedSessionIds)
    }
    if (action.toastMessage) {
      setToast({
        message: action.toastMessage,
        tone: action.toastTone ?? 'success',
      })
    }
  }, [])

  const setInterests = useCallback((next: Interest[]) => {
    setInterestsState(next)
  }, [])

  const value = useMemo(
    () => ({
      interests,
      schedulePathIds,
      highlightedSessionIds,
      toast,
      setInterests,
      applyAgentAction,
      dismissToast,
    }),
    [
      interests,
      schedulePathIds,
      highlightedSessionIds,
      toast,
      setInterests,
      applyAgentAction,
      dismissToast,
    ],
  )

  return (
    <AgentUiContext.Provider value={value}>{children}</AgentUiContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAgentUi(): AgentUiContextValue {
  const ctx = useContext(AgentUiContext)
  if (!ctx) {
    throw new Error('useAgentUi must be used within AgentUiProvider')
  }
  return ctx
}
