/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react'
import { useNavigate, Routes, Route, useSearchParams } from 'react-router-dom'
import type { AgentAction } from './context/AgentUiContext'
import { registerEventTools, unregisterEventTools, type AppPage } from './webmcp'
import { useAgentUi } from './context/AgentUiContext'
import AgentToast from './components/AgentToast'
import HomePage from './pages/HomePage'
import SpeakersPage from './pages/SpeakersPage'
import AgendaPage from './pages/AgendaPage'
import RecommendPage from './pages/RecommendPage'
import DiscoverPage from './pages/DiscoverPage'

const PAGE_PATHS: Record<AppPage, string> = {
  home: '/',
  speakers: '/speakers',
  agenda: '/agenda',
  recommend: '/recommend',
  discover: '/discover',
}

function scrollToSession(sessionId: string) {
  window.setTimeout(() => {
    const el = document.getElementById(`session-${sessionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('agenda-item-flash')
      window.setTimeout(() => el.classList.remove('agenda-item-flash'), 2000)
    }
  }, 100)
}

export default function WebMcpRoutes() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { applyAgentAction } = useAgentUi()

  useEffect(() => {
    registerEventTools()

    const handleAgentAction = (e: Event) => {
      const detail = (e as CustomEvent<{
        requestId: string
        page?: AppPage
        interests?: string[]
        schedulePathIds?: string[]
        highlightedSessionIds?: string[]
        scrollToSessionId?: string
        toastMessage?: string
        toastTone?: 'success' | 'info'
      }>).detail

      applyAgentAction({
        page: detail.page,
        interests: detail.interests as import('./data/event').Interest[] | undefined,
        schedulePathIds: detail.schedulePathIds,
        highlightedSessionIds: detail.highlightedSessionIds,
        toastMessage: detail.toastMessage,
        toastTone: detail.toastTone,
      })

      if (detail.page) {
        navigate(PAGE_PATHS[detail.page])
      }

      if (detail.scrollToSessionId && detail.page === 'agenda') {
        setSearchParams({ session: detail.scrollToSessionId })
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (detail.scrollToSessionId) {
            scrollToSession(detail.scrollToSessionId)
          }
          window.dispatchEvent(new CustomEvent(`tool-completion-${detail.requestId}`))
        })
      })
    }

    const handleAgentUiSync = (e: Event) => {
      const detail = (e as CustomEvent<AgentAction>).detail
      applyAgentAction(detail)
    }

    window.addEventListener('agent-action', handleAgentAction)
    window.addEventListener('agent-ui-sync', handleAgentUiSync)

    return () => {
      window.removeEventListener('agent-action', handleAgentAction)
      window.removeEventListener('agent-ui-sync', handleAgentUiSync)
      unregisterEventTools()
    }
  }, [navigate, applyAgentAction, setSearchParams])

  useEffect(() => {
    const sessionId = searchParams.get('session')
    if (sessionId) {
      scrollToSession(sessionId)
    }
  }, [searchParams])

  return (
    <>
      <AgentToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
    </>
  )
}
