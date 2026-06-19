import {
  agenda,
  eventInfo,
  recommendations,
  speakers,
  type AgendaItem,
} from './data/event'

type ToolContent = {
  content: Array<{
    type: 'text'
    text: string
  }>
  structuredContent: unknown
}

type RegisterTool = (
  tool: {
    name: string
    description: string
    inputSchema?: Record<string, unknown>
    execute: (input?: Record<string, unknown>) => ToolContent | Promise<ToolContent>
  },
  options?: { signal?: AbortSignal },
) => Promise<void>

declare global {
  interface Navigator {
    modelContext?: {
      registerTool?: RegisterTool
    }
  }
}

const textProperty = (description: string) => ({
  type: 'string',
  description,
})

const booleanProperty = (description: string) => ({
  type: 'boolean',
  description,
})

function toolResponse(text: string, structuredContent: unknown): ToolContent {
  return {
    content: [{ type: 'text', text }],
    structuredContent,
  }
}

function getString(input: Record<string, unknown> | undefined, key: string) {
  const value = input?.[key]
  return typeof value === 'string' ? value.trim() : ''
}

function getBoolean(input: Record<string, unknown> | undefined, key: string) {
  return input?.[key] === true
}

function speakerNames(item: AgendaItem) {
  return item.speakerIds
    .map((speakerId) => speakers.find((speaker) => speaker.id === speakerId)?.name)
    .filter(Boolean)
}

function publicAgendaItem(item: AgendaItem) {
  return {
    id: item.id,
    time: item.time,
    title: item.title,
    room: item.room,
    type: item.type,
    speakers: speakerNames(item),
    themes: item.themes,
    description: item.description,
  }
}

function searchAgenda(input?: Record<string, unknown>) {
  const query = getString(input, 'query').toLowerCase()
  const speaker = getString(input, 'speaker').toLowerCase()
  const room = getString(input, 'room').toLowerCase()
  const theme = getString(input, 'theme').toLowerCase()
  const time = getString(input, 'time').toLowerCase()

  return agenda.filter((item) => {
    const names = speakerNames(item).join(' ').toLowerCase()
    const themes = item.themes.join(' ').toLowerCase()
    const searchable = [
      item.title,
      item.description,
      item.room,
      item.time,
      item.type,
      names,
      themes,
    ]
      .join(' ')
      .toLowerCase()

    return (
      (!query || searchable.includes(query)) &&
      (!speaker || names.includes(speaker)) &&
      (!room || item.room.toLowerCase() === room) &&
      (!theme || themes.includes(theme)) &&
      (!time || item.time.toLowerCase() === time)
    )
  })
}

function groupAgenda(items: AgendaItem[], groupBy: string) {
  return items.reduce<Record<string, ReturnType<typeof publicAgendaItem>[]>>(
    (groups, item) => {
      const key =
        groupBy === 'room' ? item.room : groupBy === 'type' ? item.type : item.time
      groups[key] = groups[key] ?? []
      groups[key].push(publicAgendaItem(item))
      return groups
    },
    {},
  )
}

export function registerWebMcpTools(options?: {
  onSearch?: (input: { query?: string; theme?: string; room?: string }) => void
}) {
  const registerTool = navigator.modelContext?.registerTool

  if (!registerTool) {
    console.info('WebMCP unavailable: navigator.modelContext.registerTool is missing.')
    return undefined
  }

  const controller = new AbortController()
  const signal = controller.signal

  void Promise.all([
    registerTool(
      {
        name: 'event_lookup',
        description:
          'Look up public details for Google I/O Extended Nairobi 2026, including venue, time, RSVP URL, themes, and source links. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            includeSources: booleanProperty('Include public source links.'),
          },
          additionalProperties: false,
        },
        execute(input) {
          const includeSources = getBoolean(input, 'includeSources')
          return toolResponse('Found the public event details.', {
            event: eventInfo,
            sources: includeSources ? eventInfo.sources : undefined,
            readOnly: true,
          })
        },
      },
      { signal },
    ),
    registerTool(
      {
        name: 'sessions_search',
        description:
          'Search public agenda items by text, speaker, room, theme, or time. Optionally updates the visible agenda filters. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            query: textProperty('Text to search in titles and descriptions.'),
            speaker: textProperty('Speaker name to match.'),
            room: textProperty('Room name, such as Room 2.'),
            theme: textProperty('Theme, such as WebMCP or Google Cloud.'),
            time: textProperty('Agenda time, such as 10:50 AM.'),
            updatePage: booleanProperty('Update the visible agenda filters.'),
          },
          additionalProperties: false,
        },
        execute(input) {
          const matches = searchAgenda(input).map(publicAgendaItem)
          if (getBoolean(input, 'updatePage')) {
            options?.onSearch?.({
              query: getString(input, 'query') || getString(input, 'speaker'),
              theme: getString(input, 'theme'),
              room: getString(input, 'room'),
            })
          }
          return toolResponse(`Found ${matches.length} matching agenda items.`, {
            matches,
            readOnly: true,
          })
        },
      },
      { signal },
    ),
    registerTool(
      {
        name: 'speakers_profile',
        description:
          'Return public speaker profile details and agenda appearances by speaker id or name. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            id: textProperty('Speaker id, such as felix-jumason.'),
            name: textProperty('Speaker name, such as Felix Jumason.'),
          },
          additionalProperties: false,
        },
        execute(input) {
          const id = getString(input, 'id').toLowerCase()
          const name = getString(input, 'name').toLowerCase()
          const speaker = speakers.find(
            (person) =>
              (id && person.id === id) ||
              (name && person.name.toLowerCase().includes(name)),
          )

          if (!speaker) {
            return toolResponse('No matching public speaker profile found.', {
              speaker: null,
              sessions: [],
              readOnly: true,
            })
          }

          const sessions = agenda
            .filter((item) => item.speakerIds.includes(speaker.id))
            .map(publicAgendaItem)

          return toolResponse(`Found profile for ${speaker.name}.`, {
            speaker,
            sessions,
            readOnly: true,
          })
        },
      },
      { signal },
    ),
    registerTool(
      {
        name: 'agenda_explore',
        description:
          'Explore the public agenda grouped by time, room, or session type. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            groupBy: {
              type: 'string',
              enum: ['time', 'room', 'type'],
              description: 'How to group agenda items.',
            },
            type: textProperty('Optional session type filter.'),
            time: textProperty('Optional exact time filter.'),
          },
          additionalProperties: false,
        },
        execute(input) {
          const groupBy = getString(input, 'groupBy') || 'time'
          const type = getString(input, 'type').toLowerCase()
          const time = getString(input, 'time').toLowerCase()
          const items = agenda.filter(
            (item) =>
              (!type || item.type === type) && (!time || item.time.toLowerCase() === time),
          )

          return toolResponse(`Grouped ${items.length} agenda items by ${groupBy}.`, {
            groups: groupAgenda(items, groupBy),
            readOnly: true,
          })
        },
      },
      { signal },
    ),
    registerTool(
      {
        name: 'recommendations_list',
        description:
          'Return curated attendee paths for AI, WebMCP, Firebase, Cloud, Android, Angular, or first-time attendees. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            audience: textProperty('Audience or goal, such as first-time or web.'),
            theme: textProperty('Theme, such as WebMCP, Firebase, or Android.'),
          },
          additionalProperties: false,
        },
        execute(input) {
          const audience = getString(input, 'audience').toLowerCase()
          const theme = getString(input, 'theme').toLowerCase()
          const matches = recommendations.filter((recommendation) => {
            const sessions = recommendation.sessionIds
              .map((sessionId) => agenda.find((item) => item.id === sessionId))
              .filter(Boolean) as AgendaItem[]
            const text = [
              recommendation.id,
              recommendation.title,
              recommendation.audience,
              sessions.map((session) => session.themes.join(' ')).join(' '),
            ]
              .join(' ')
              .toLowerCase()

            return (!audience || text.includes(audience)) && (!theme || text.includes(theme))
          })

          return toolResponse(`Found ${matches.length} recommendation paths.`, {
            recommendations: matches.map((recommendation) => ({
              ...recommendation,
              sessions: recommendation.sessionIds
                .map((sessionId) => agenda.find((item) => item.id === sessionId))
                .filter(Boolean)
                .map((item) => publicAgendaItem(item as AgendaItem)),
            })),
            readOnly: true,
          })
        },
      },
      { signal },
    ),
    registerTool(
      {
        name: 'event_brief',
        description:
          'Generate a concise public event brief for attendees, speakers, organizers, or closing context. Read-only.',
        inputSchema: {
          type: 'object',
          properties: {
            format: {
              type: 'string',
              enum: ['attendee', 'speaker', 'organizer', 'closing'],
              description: 'Brief format to return.',
            },
          },
          additionalProperties: false,
        },
        execute(input) {
          const format = getString(input, 'format') || 'attendee'
          const webmcpSession = agenda.find((item) => item.id === 'webmcp-websites')
          const brief = `${eventInfo.title} is a ${eventInfo.date} ${eventInfo.chapter} event at ${eventInfo.venue.name}, ${eventInfo.venue.address}, ${eventInfo.venue.city}. It runs ${eventInfo.startTime} - ${eventInfo.endTime} (${eventInfo.timezone}) and focuses on AI that acts, including Gemini, Antigravity, Android, WebMCP, Firebase, and Google Cloud. ${
            webmcpSession
              ? `The WebMCP session is "${webmcpSession.title}" at ${webmcpSession.time} in ${webmcpSession.room}.`
              : ''
          }`

          return toolResponse(`Generated ${format} event brief.`, {
            format,
            brief,
            citations: eventInfo.sources,
            readOnly: true,
          })
        },
      },
      { signal },
    ),
  ]).catch((error: unknown) => {
    console.error('WebMCP tool registration failed.', error)
  })

  return () => controller.abort()
}
