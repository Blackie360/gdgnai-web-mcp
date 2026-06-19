/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type Interest,
  SPEAKERS,
  SESSIONS,
  getSessionById,
  getSpeakerById,
} from './data/event'
import { recommendSessions } from './data/recommendations'

let currentInterests: Interest[] = []
let currentRecommendations = recommendSessions([])

export const VALID_PAGES = ['home', 'speakers', 'agenda', 'recommend', 'discover'] as const
export type AppPage = typeof VALID_PAGES[number]

const PAGE_LABELS: Record<AppPage, string> = {
  home: 'Home',
  speakers: 'Speakers',
  agenda: 'Agenda',
  recommend: 'My Schedule',
  discover: 'Discover',
}

export function setCurrentInterests(interests: Interest[]): void {
  currentInterests = interests
  currentRecommendations = recommendSessions(interests)
}

export function getCurrentRecommendations() {
  return currentRecommendations
}

interface AgentActionDetail {
  requestId?: string
  page?: AppPage
  interests?: Interest[]
  schedulePathIds?: string[]
  highlightedSessionIds?: string[]
  scrollToSessionId?: string
  toastMessage?: string
  toastTone?: 'success' | 'info'
}

function syncAgentUi(detail: Omit<AgentActionDetail, 'requestId'>) {
  window.dispatchEvent(new CustomEvent('agent-ui-sync', { detail }))
}

function dispatchAndWait(
  eventName: string,
  detail: AgentActionDetail = {},
  successMessage: string = 'Action completed successfully',
  timeoutMs: number = 8000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    const completionEventName = `tool-completion-${requestId}`

    const timeoutId = setTimeout(() => {
      window.removeEventListener(completionEventName, handleCompletion)
      reject(new Error(`Timed out waiting for UI to update (event: ${eventName})`))
    }, timeoutMs)

    const handleCompletion = () => {
      clearTimeout(timeoutId)
      window.removeEventListener(completionEventName, handleCompletion)
      resolve(successMessage)
    }

    window.addEventListener(completionEventName, handleCompletion)

    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { ...detail, requestId },
      }),
    )
  })
}

function mapSessionSummary(sessionId: string) {
  const session = getSessionById(sessionId)
  if (!session) return null
  const speaker = session.speakerId ? getSpeakerById(session.speakerId) : undefined
  return {
    sessionId: session.id,
    title: session.title,
    room: session.room,
    startTime: session.startTime,
    endTime: session.endTime,
    speaker: speaker?.name ?? null,
  }
}

function formatScheduleResult(interests: Interest[]) {
  const result = recommendSessions(interests)
  setCurrentInterests(interests)

  const schedulePathIds = result.suggestedPath.map((r) => r.session.id)

  return {
    interests,
    matchingSessionCount: result.recommendations.length,
    schedulePathCount: schedulePathIds.length,
    topSessions: result.recommendations.slice(0, 8).map((r) => ({
      sessionId: r.session.id,
      title: r.session.title,
      room: r.session.room,
      startTime: r.session.startTime,
      speaker: r.speakerName,
      score: r.score,
      matchReasons: r.matchReasons,
    })),
    suggestedSchedule: result.suggestedPath.map((r) => ({
      sessionId: r.session.id,
      title: r.session.title,
      room: r.session.room,
      startTime: r.session.startTime,
      endTime: r.session.endTime,
      speaker: r.speakerName,
    })),
    speakersToMeet: result.recommendations
      .slice(0, 5)
      .map((r) => r.speakerName)
      .filter((name, i, arr) => arr.indexOf(name) === i),
    schedulePathIds,
  }
}

export function listSpeakers() {
  return {
    speakers: SPEAKERS.map((speaker) => ({
      id: speaker.id,
      name: speaker.name,
      title: speaker.title,
      bio: speaker.bio,
      sessionCount: SESSIONS.filter((s) => s.speakerId === speaker.id && s.room).length,
    })),
    count: SPEAKERS.length,
  }
}

export const listSpeakersTool = {
  execute: () => listSpeakers(),
  name: 'listSpeakers',
  description: 'Returns all speakers at Google I/O Extended Nairobi 2026. For the best UI view of speakers + planning, navigateTo("discover").',
  inputSchema: { type: 'object', properties: {} },
  outputSchema: {
    type: 'object',
    properties: {
      speakers: { type: 'array' },
      count: { type: 'number' },
    },
    required: ['speakers', 'count'],
  },
  annotations: { readOnlyHint: true },
}

export function listSessions() {
  return {
    sessions: SESSIONS.map((session) => {
      const speaker = session.speakerId ? getSpeakerById(session.speakerId) : undefined
      return {
        id: session.id,
        title: session.title,
        startTime: session.startTime,
        endTime: session.endTime,
        room: session.room,
        speaker: speaker?.name ?? null,
        interests: session.interests,
        isKeynote: session.isKeynote ?? false,
        isBreak: session.isBreak ?? false,
      }
    }),
    count: SESSIONS.length,
  }
}

export const listSessionsTool = {
  execute: () => listSessions(),
  name: 'listSessions',
  description:
    'Returns the full event agenda with sessions, times, rooms, and speakers. Navigates to the Agenda page so the user can see the timetable on screen.',
  inputSchema: { type: 'object', properties: {} },
  outputSchema: {
    type: 'object',
    properties: {
      sessions: { type: 'array' },
      count: { type: 'number' },
    },
    required: ['sessions', 'count'],
  },
  annotations: { readOnlyHint: true },
}

const VALID_INTERESTS: Interest[] = [
  'ai', 'gemini', 'android', 'web', 'angular', 'firebase', 'cloud', 'security', 'data-ml', 'devops',
]

function parseInterests(raw: string[] | undefined): Interest[] {
  return (raw ?? []).filter((i): i is Interest => VALID_INTERESTS.includes(i as Interest))
}

export function suggestSessions(input: Record<string, unknown> = {}) {
  const params = input as { interests?: string[] }
  const interests = parseInterests(params.interests ?? currentInterests)
  const formatted = formatScheduleResult(interests)

  syncAgentUi({
    interests,
    schedulePathIds: formatted.schedulePathIds,
    highlightedSessionIds: formatted.schedulePathIds,
    toastMessage: `${formatted.matchingSessionCount} sessions match your interests — highlighted on screen.`,
    toastTone: 'info',
  })

  return formatted
}

export const suggestSessionsTool = {
  execute: (input: Record<string, unknown>) => suggestSessions(input),
  name: 'suggestSessions',
  description:
    'Suggest sessions and speakers based on interests. Updates on-screen highlights for matching talks.',
  inputSchema: {
    type: 'object',
    properties: {
      interests: {
        type: 'array',
        items: { type: 'string', enum: VALID_INTERESTS },
      },
    },
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: true },
}

export async function setInterests(p: unknown) {
  const params = p as { interests?: string[] }
  const interests = parseInterests(params.interests)

  if (interests.length === 0) {
    return {
      success: false,
      error: 'Provide at least one valid interest (ai, gemini, android, web, angular, firebase, cloud, security, data-ml, devops).',
    }
  }

  const formatted = formatScheduleResult(interests)

  await dispatchAndWait(
    'agent-action',
    {
      page: 'recommend',
      interests,
      schedulePathIds: formatted.schedulePathIds,
      highlightedSessionIds: formatted.schedulePathIds,
      toastMessage: `My Schedule updated — ${formatted.matchingSessionCount} matching sessions.`,
      toastTone: 'success',
    },
    'Interests applied on My Schedule.',
  )

  return {
    success: true,
    page: 'recommend',
    ...formatted,
    message: `Updated My Schedule with ${formatted.matchingSessionCount} matching sessions.`,
  }
}

export const setInterestsTool = {
  execute: setInterests,
  name: 'setInterests',
  description:
    'Navigate to My Schedule and set interests. Updates the visible schedule on screen.',
  inputSchema: {
    type: 'object',
    properties: {
      interests: {
        type: 'array',
        items: { type: 'string', enum: VALID_INTERESTS },
      },
    },
    required: ['interests'],
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: false },
}

export async function navigateTo(p: unknown) {
  const params = p as { page?: string; sessionId?: string }
  const page = params.page

  if (!page || !VALID_PAGES.includes(page as AppPage)) {
    return { success: false, error: `page must be one of: ${VALID_PAGES.join(', ')}.` }
  }

  const label = PAGE_LABELS[page as AppPage]

  await dispatchAndWait(
    'agent-action',
    {
      page: page as AppPage,
      scrollToSessionId: params.sessionId,
      toastMessage: `Opened ${label}${params.sessionId ? ` — scrolling to session` : ''}.`,
      toastTone: 'info',
    },
    `Navigated to ${label}.`,
  )

  return {
    success: true,
    page,
    sessionId: params.sessionId ?? null,
    message: `Navigated to ${label}.`,
  }
}

export const navigateToTool = {
  execute: navigateTo,
  name: 'navigateTo',
  description:
    'Navigate to a section of the event site. Use "discover" for the combined speakers + schedule planner page that answers "show me who is speaking and help plan my day".',
  inputSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'string',
        enum: [...VALID_PAGES],
        description: 'home, speakers, agenda, recommend, discover',
      },
      sessionId: {
        type: 'string',
        description: 'Optional session id to scroll to on the agenda page',
      },
    },
    required: ['page'],
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: false },
}

export async function buildMySchedule(p: unknown) {
  const params = p as { interests?: string[]; thenShowAgenda?: boolean }
  const interests = parseInterests(params.interests)

  if (interests.length === 0) {
    return {
      success: false,
      error: 'Provide at least one valid interest.',
    }
  }

  const formatted = formatScheduleResult(interests)
  const targetPage: AppPage = params.thenShowAgenda ? 'agenda' : 'recommend'

  await dispatchAndWait(
    'agent-action',
    {
      page: targetPage,
      interests,
      schedulePathIds: formatted.schedulePathIds,
      highlightedSessionIds: formatted.schedulePathIds,
      scrollToSessionId: params.thenShowAgenda ? formatted.schedulePathIds[0] : undefined,
      toastMessage: params.thenShowAgenda
        ? `Schedule built — ${formatted.schedulePathCount} talks highlighted on the Agenda.`
        : `Your schedule is ready — ${formatted.schedulePathCount} talks on My Schedule.`,
      toastTone: 'success',
    },
    'Schedule built.',
  )

  return {
    success: true,
    page: targetPage,
    ...formatted,
    message: `Built schedule with ${formatted.schedulePathCount} sessions in your conflict-free path.`,
  }
}

export const buildMyScheduleTool = {
  execute: buildMySchedule,
  name: 'buildMySchedule',
  description:
    'Build a personalized schedule, update the on-screen UI, and navigate to My Schedule (or Agenda if thenShowAgenda is true). Use for "plan my day" requests. For showing speakers + planning, consider navigating to "discover" first.',
  inputSchema: {
    type: 'object',
    properties: {
      interests: {
        type: 'array',
        items: { type: 'string', enum: VALID_INTERESTS },
      },
      thenShowAgenda: {
        type: 'boolean',
        description: 'If true, show the full agenda with your schedule highlighted instead of My Schedule.',
      },
    },
    required: ['interests'],
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: false },
}

export async function showFullAgenda(p: unknown) {
  const params = p as { highlightSchedule?: boolean }
  const highlightIds = params.highlightSchedule
    ? getCurrentRecommendations().suggestedPath.map((r) => r.session.id)
    : []

  await dispatchAndWait(
    'agent-action',
    {
      page: 'agenda',
      highlightedSessionIds: highlightIds,
      scrollToSessionId: highlightIds[0],
      toastMessage: highlightIds.length > 0
        ? `Full agenda — your ${highlightIds.length} schedule picks are highlighted.`
        : 'Showing the full event agenda.',
      toastTone: 'info',
    },
    'Agenda opened.',
  )

  const sessions = listSessions()

  return {
    success: true,
    page: 'agenda',
    highlightedCount: highlightIds.length,
    sessions: sessions.sessions,
    count: sessions.count,
    message: 'Full agenda is now visible on screen.',
  }
}

export const showFullAgendaTool = {
  execute: showFullAgenda,
  name: 'showFullAgenda',
  description:
    'Navigate to the full event agenda on screen. Set highlightSchedule true to highlight the user\'s built schedule path.',
  inputSchema: {
    type: 'object',
    properties: {
      highlightSchedule: {
        type: 'boolean',
        description: 'Highlight sessions from the current personalized schedule',
      },
    },
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: false },
}

export async function listSessionsAndShow() {
  const data = listSessions()

  await dispatchAndWait(
    'agent-action',
    {
      page: 'agenda',
      toastMessage: `Full agenda — ${data.count} sessions today.`,
      toastTone: 'info',
    },
    'Agenda opened.',
  )

  return {
    success: true,
    page: 'agenda',
    ...data,
    message: 'Agenda is visible on screen.',
  }
}

export const listSessionsAndShowTool = {
  execute: () => listSessionsAndShow(),
  name: 'listSessions',
  description:
    'Show the full event agenda on screen and return all sessions. Prefer this over reading JSON alone.',
  inputSchema: { type: 'object', properties: {} },
  outputSchema: {
    type: 'object',
    properties: {
      sessions: { type: 'array' },
      count: { type: 'number' },
      success: { type: 'boolean' },
      page: { type: 'string' },
    },
    required: ['sessions', 'count', 'success'],
  },
  annotations: { readOnlyHint: false },
}

export function getSessionDetails(p: unknown) {
  const params = p as { sessionId: string }
  const session = getSessionById(params.sessionId)
  if (!session) {
    return { success: false, error: `Session not found: ${params.sessionId}` }
  }

  const speaker = session.speakerId ? getSpeakerById(session.speakerId) : undefined

  syncAgentUi({
    highlightedSessionIds: [session.id],
    toastMessage: `Highlighted: ${session.title}`,
    toastTone: 'info',
  })

  return {
    success: true,
    id: session.id,
    title: session.title,
    description: session.description,
    startTime: session.startTime,
    endTime: session.endTime,
    room: session.room,
    interests: session.interests,
    speaker: speaker
      ? { id: speaker.id, name: speaker.name, title: speaker.title, bio: speaker.bio }
      : null,
    summary: mapSessionSummary(session.id),
  }
}

export const getSessionDetailsTool = {
  execute: getSessionDetails,
  name: 'getSessionDetails',
  description: 'Get session details and highlight that talk on screen.',
  inputSchema: {
    type: 'object',
    properties: {
      sessionId: { type: 'string', description: 'Session ID e.g. webmcp, angular-v22' },
    },
    required: ['sessionId'],
  },
  outputSchema: { type: 'object' },
  annotations: { readOnlyHint: true },
}

type RegisteredTools = { controller: AbortController | null }

const toolsState: RegisteredTools = { controller: null }

export function registerEventTools() {
  const modelContext = document.modelContext || navigator.modelContext

  if (!modelContext || toolsState.controller) return

  toolsState.controller = new AbortController()
  const options = { signal: toolsState.controller.signal }

  modelContext.registerTool(listSpeakersTool, options)
  modelContext.registerTool(listSessionsAndShowTool, options)
  modelContext.registerTool(suggestSessionsTool, options)
  modelContext.registerTool(navigateToTool, options)
  modelContext.registerTool(buildMyScheduleTool, options)
  modelContext.registerTool(showFullAgendaTool, options)
  modelContext.registerTool(setInterestsTool, options)
  modelContext.registerTool(getSessionDetailsTool, options)
}

export function unregisterEventTools() {
  if (toolsState.controller) {
    toolsState.controller.abort()
    toolsState.controller = null
  }
}
