export type Theme =
  | 'AI'
  | 'AI - Gemini'
  | 'Build with AI'
  | 'Google Cloud'
  | 'Google I/O Extended'
  | 'WebMCP'
  | 'Firebase'
  | 'Android'
  | 'Angular'
  | 'Community'

export type EventInfo = {
  title: string
  chapter: string
  date: string
  startTime: string
  endTime: string
  timezone: string
  venue: {
    name: string
    address: string
    city: string
    postalCode: string
  }
  rsvpCount: number
  rsvpUrl: string
  summary: string
  audience: string[]
  themes: Theme[]
  sources: Array<{
    label: string
    url: string
  }>
}

export type AgendaItem = {
  id: string
  time: string
  title: string
  room: string
  type: 'check-in' | 'keynote' | 'session' | 'break' | 'community'
  speakerIds: string[]
  themes: Theme[]
  toolQuery: string
  description: string
}

export type Speaker = {
  id: string
  name: string
  role: string
  organization?: string
  focus: string[]
}

export type Organizer = {
  id: string
  name: string
  role: string
  organization?: string
  note?: string
}

export type Recommendation = {
  id: string
  title: string
  audience: string
  sessionIds: string[]
}

export type AgentTool = {
  name: string
  description: string
  example: string
}

export const eventInfo: EventInfo = {
  title: 'Google I/O Extended Nairobi 2026',
  chapter: 'GDG Nairobi',
  date: 'Saturday, June 20, 2026',
  startTime: '8:00 AM',
  endTime: '5:00 PM',
  timezone: 'GMT+3',
  venue: {
    name: 'Simba Corporation Aspire Center Westlands',
    address: 'Waiyaki Way',
    city: 'Nairobi',
    postalCode: '00100',
  },
  rsvpCount: 1000,
  rsvpUrl:
    'https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-nairobi-2026/',
  summary:
    'A full-day, hands-on local edition of Google I/O 2026 focused on the shift from AI that assists to AI that acts.',
  audience: [
    'Android developers',
    'Web developers',
    'Flutter engineers',
    'AI/ML practitioners',
    'Firebase developers',
    'Cloud architects',
    'Students',
  ],
  themes: [
    'AI',
    'AI - Gemini',
    'Build with AI',
    'Google Cloud',
    'Google I/O Extended',
  ],
  sources: [
    {
      label: 'GDG event page',
      url: 'https://gdg.community.dev/events/details/google-gdg-nairobi-presents-google-io-extended-nairobi-2026/',
    },
    {
      label: 'Tech-ish event article',
      url: 'https://tech-ish.com/2026/05/29/google-i-o-extended-2026-returns-to-nairobi-on-june-20/',
    },
    {
      label: 'GDG Nairobi LinkedIn',
      url: 'https://ke.linkedin.com/company/gdgnairobi',
    },
  ],
}

export const speakers: Speaker[] = [
  {
    id: 'gdg-nairobi',
    name: 'GDG Nairobi',
    role: 'Community host',
    focus: ['Community', 'Google I/O Extended'],
  },
  {
    id: 'john-kimani',
    name: 'John Kimani',
    role: 'Developer Ecosystem Regional Lead',
    organization: 'Sub-Saharan Africa',
    focus: ['Google I/O Extended', 'Developer ecosystem'],
  },
  {
    id: 'shadrack-inusah',
    name: 'Shadrack Inusah',
    role: 'GDE for Cloud AI',
    focus: ['AI', 'Google Cloud', 'Antigravity'],
  },
  {
    id: 'auwal-ms',
    name: 'Auwal MS',
    role: 'Lead, Developer Relations & Integrations',
    organization: 'Moniepoint | GDE for Firebase',
    focus: ['Firebase', 'AI', 'Chrome Hybrid Inference'],
  },
  {
    id: 'jacquiline-gitau',
    name: 'Jacquiline Gitau',
    role: 'Community Manager',
    organization: 'DotNexxt | Android Developer',
    focus: ['Android', 'Agentic workflows'],
  },
  {
    id: 'john-megwe',
    name: 'John M. Megwe',
    role: 'Data Scientist',
    focus: ['AI', 'Earth Engine', 'Geospatial reasoning'],
  },
  {
    id: 'felix-jumason',
    name: 'Felix Jumason',
    role: 'Software Engineer',
    organization: 'Liquid Intelligent Technologies',
    focus: ['WebMCP', 'Web', 'Agent-ready websites'],
  },
  {
    id: 'hassan-bahati',
    name: 'Hassan Bahati',
    role: 'Software Engineer',
    focus: ['Firebase', 'Hybrid inference', 'AI'],
  },
  {
    id: 'gabriel-agbobli',
    name: 'Gabriel Agbobli',
    role: 'Research Scholar',
    organization:
      'Intra-Africa Academic Mobility Scheme (BRAINS), Strathmore University | GDE for Google Cloud',
    focus: ['Google Cloud', 'Managed Agents API', 'Analytics'],
  },
  {
    id: 'samuel-macharia',
    name: 'Samuel Macharia',
    role: 'Cloud DevOps Engineer',
    organization: 'GDE for Google Cloud',
    focus: ['Google Cloud', 'GKE', 'AI security'],
  },
  {
    id: 'wayne-gakuo',
    name: 'Wayne Gakuo',
    role: 'Co-Founder & Technical Solutions Architect',
    organization: 'Unstacked Labs | GDE for Angular',
    focus: ['Angular', 'Web'],
  },
  {
    id: 'wycliffe-maina',
    name: 'Wycliffe Maina',
    role: 'Gen AI & Automations Engineer',
    organization: 'GDE for Angular',
    focus: ['AI safety', 'Angular', 'Automation'],
  },
  {
    id: 'rhodah-mulera',
    name: 'Rhodah Mulera',
    role: 'Software Developer',
    focus: ['Google Cloud', 'AI applications'],
  },
  {
    id: 'joseph-masaka',
    name: 'Joseph Masaka',
    role: 'Full-Stack Software Developer',
    focus: ['Gemini', 'Angular', 'Agents'],
  },
  {
    id: 'rama-ochieng',
    name: 'Rama Ochieng',
    role: 'Solutions Engineer',
    organization: 'Frontend, DevOps, AI',
    focus: ['Web development', 'AI', 'Developer workflow'],
  },
  {
    id: 'alex-nyambura',
    name: 'Alex Nyambura',
    role: 'Cloud DevOps Engineer',
    focus: ['Google Cloud', 'Antigravity CLI', 'Cloud-native apps'],
  },
]

export const agenda: AgendaItem[] = [
  {
    id: 'registration',
    time: '8:00 AM',
    title: 'Registration & Check-in',
    room: 'Atrium',
    type: 'check-in',
    speakerIds: [],
    themes: ['Community'],
    toolQuery: 'agenda_explore({ time: "8:00 AM" })',
    description: 'Arrival, badge pickup, and orientation for the day.',
  },
  {
    id: 'opening-keynote',
    time: '8:55 AM',
    title: 'Welcome & Opening Keynote',
    room: 'Main Hall',
    type: 'keynote',
    speakerIds: ['gdg-nairobi'],
    themes: ['Google I/O Extended', 'Community'],
    toolQuery: 'sessions_search({ type: "keynote" })',
    description: 'GDG Nairobi opens the local edition and frames the day.',
  },
  {
    id: 'developer-keynote',
    time: '9:15 AM',
    title: 'Developer Keynote',
    room: 'Main Hall',
    type: 'keynote',
    speakerIds: ['john-kimani'],
    themes: ['Google I/O Extended', 'AI'],
    toolQuery: 'speakers_profile({ id: "john-kimani" })',
    description: 'A regional developer ecosystem view of the I/O announcements.',
  },
  {
    id: 'parallel-agents',
    time: '10:00 AM',
    title: 'Orchestrating Parallel Agents with Antigravity 2.0',
    room: 'Room 1',
    type: 'session',
    speakerIds: ['shadrack-inusah'],
    themes: ['AI', 'Google Cloud'],
    toolQuery: 'sessions_search({ query: "Antigravity" })',
    description: 'Patterns for coordinating multiple agent workflows.',
  },
  {
    id: 'firebase-chrome-hybrid',
    time: '10:00 AM',
    title:
      'Smarter, Cheaper, Faster: Building Cost-Efficient Web Apps with Firebase AI Logic & Chrome Hybrid Inference',
    room: 'Room 2',
    type: 'session',
    speakerIds: ['auwal-ms'],
    themes: ['Firebase', 'AI'],
    toolQuery: 'sessions_search({ theme: "Firebase" })',
    description: 'Cost-aware web app architecture using Firebase AI Logic and local inference.',
  },
  {
    id: 'android-agentic-workflows',
    time: '10:00 AM',
    title: 'Agentic Workflows for Android Teams',
    room: 'Room 3',
    type: 'session',
    speakerIds: ['jacquiline-gitau'],
    themes: ['Android', 'AI'],
    toolQuery: 'sessions_search({ theme: "Android" })',
    description: 'How mobile teams can apply agentic practices in Android delivery.',
  },
  {
    id: 'earth-engine-reasoning',
    time: '10:50 AM',
    title: 'Ask the Planet: Geospatial Reasoning over Earth Engine',
    room: 'Room 1',
    type: 'session',
    speakerIds: ['john-megwe'],
    themes: ['AI', 'Google Cloud'],
    toolQuery: 'sessions_search({ query: "Earth Engine" })',
    description: 'Using AI reasoning over geospatial data and Earth Engine.',
  },
  {
    id: 'webmcp-websites',
    time: '10:50 AM',
    title: 'Agent-Ready Websites with WebMCP',
    room: 'Room 2',
    type: 'session',
    speakerIds: ['felix-jumason'],
    themes: ['WebMCP', 'Build with AI'],
    toolQuery: 'sessions_search({ query: "WebMCP" })',
    description: 'How websites can expose structured context and read-only tools for agents.',
  },
  {
    id: 'hybrid-inference',
    time: '10:50 AM',
    title: 'Hybrid Inference with Firebase AI Logic',
    room: 'Room 3',
    type: 'session',
    speakerIds: ['hassan-bahati'],
    themes: ['Firebase', 'AI'],
    toolQuery: 'sessions_search({ query: "Hybrid Inference" })',
    description: 'Balancing hosted and local inference for AI features.',
  },
  {
    id: 'world-cup-agent',
    time: '11:40 AM',
    title: 'World Cup Analytics Agent with Managed Agents API',
    room: 'Room 1',
    type: 'session',
    speakerIds: ['gabriel-agbobli'],
    themes: ['Google Cloud', 'AI'],
    toolQuery: 'sessions_search({ query: "Managed Agents API" })',
    description: 'A sports analytics agent built with managed cloud agent tooling.',
  },
  {
    id: 'secure-agents-gke',
    time: '11:40 AM',
    title: 'Securing Autonomous AI Agents on GKE',
    room: 'Room 2',
    type: 'session',
    speakerIds: ['samuel-macharia'],
    themes: ['Google Cloud', 'AI'],
    toolQuery: 'sessions_search({ query: "GKE" })',
    description: 'Security controls for autonomous agent workloads on Kubernetes.',
  },
  {
    id: 'angular-v22',
    time: '11:40 AM',
    title: "What's New in Angular v22",
    room: 'Room 3',
    type: 'session',
    speakerIds: ['wayne-gakuo'],
    themes: ['Angular'],
    toolQuery: 'sessions_search({ theme: "Angular" })',
    description: 'A practical look at the latest Angular platform updates.',
  },
  {
    id: 'lunch',
    time: '12:30 PM',
    title: 'Lunch + Group Photo',
    room: 'Main Hall',
    type: 'break',
    speakerIds: [],
    themes: ['Community'],
    toolQuery: 'agenda_explore({ type: "break" })',
    description: 'Lunch, community photos, and informal networking.',
  },
  {
    id: 'ai-safety-valve',
    time: '1:20 PM',
    title: 'Trust, But Verify: a Safety Valve for AI Agents',
    room: 'Room 1',
    type: 'session',
    speakerIds: ['wycliffe-maina'],
    themes: ['AI', 'Angular'],
    toolQuery: 'sessions_search({ query: "Safety Valve" })',
    description: 'Guardrails and verification patterns for agentic systems.',
  },
  {
    id: 'cloud-ai-apps',
    time: '1:20 PM',
    title: 'Build, Deploy, Scale: Creating AI Applications with Google Cloud',
    room: 'Room 2',
    type: 'session',
    speakerIds: ['rhodah-mulera'],
    themes: ['Google Cloud', 'AI'],
    toolQuery: 'sessions_search({ theme: "Google Cloud" })',
    description: 'End-to-end AI application delivery on Google Cloud.',
  },
  {
    id: 'forms-to-agents',
    time: '1:20 PM',
    title: 'From Forms to Agents with Gemini & Angular',
    room: 'Room 3',
    type: 'session',
    speakerIds: ['joseph-masaka'],
    themes: ['AI - Gemini', 'Angular'],
    toolQuery: 'sessions_search({ query: "Gemini Angular" })',
    description: 'Turning traditional app flows into agent-capable experiences.',
  },
  {
    id: 'guided-web-dev',
    time: '2:10 PM',
    title:
      'Stay Guided, Reduce the Slop: Bridging the knowledge gap in modern Web Development',
    room: 'Room 1',
    type: 'session',
    speakerIds: ['rama-ochieng'],
    themes: ['Build with AI', 'WebMCP'],
    toolQuery: 'sessions_search({ query: "modern Web Development" })',
    description: 'A disciplined approach to AI-assisted web development.',
  },
  {
    id: 'cloud-native-antigravity',
    time: '2:10 PM',
    title: 'Cloud-Native Apps on GCP with Antigravity CLI',
    room: 'Room 2',
    type: 'session',
    speakerIds: ['alex-nyambura'],
    themes: ['Google Cloud', 'AI'],
    toolQuery: 'sessions_search({ query: "Antigravity CLI" })',
    description: 'Building and operating cloud-native apps with Antigravity CLI.',
  },
  {
    id: 'community-segment',
    time: '3:00 PM',
    title: 'Community Segment: Feedback, Announcements',
    room: 'Main Hall',
    type: 'community',
    speakerIds: ['gdg-nairobi'],
    themes: ['Community'],
    toolQuery: 'agenda_explore({ type: "community" })',
    description: 'Community updates, feedback, and announcements.',
  },
  {
    id: 'closing',
    time: '3:35 PM',
    title: 'Closing Remarks, Networking & wind-down',
    room: 'Main Hall',
    type: 'community',
    speakerIds: ['gdg-nairobi'],
    themes: ['Community'],
    toolQuery: 'event_brief({ format: "closing" })',
    description: 'Final remarks and networking before the event closes.',
  },
]

export const organizers: Organizer[] = [
  { id: 'brayan-kai-mwanyumba', name: 'Brayan Kai Mwanyumba', role: 'GDG Co-Lead & Crew' },
  { id: 'tabitha-kavyu', name: 'Tabitha Kavyu', role: 'Community Coordinator' },
  {
    id: 'brian-ouma',
    name: 'Brian Ouma',
    role: 'Software Engineer',
    note: 'GDG Organizer & Logistics',
  },
  {
    id: 'wayne-gakuo-organizer',
    name: 'Wayne Gakuo',
    role: 'GDG Co-organizer & Crew',
    organization: 'Unstacked Labs',
  },
  {
    id: 'rachael-kimberly-msabeni',
    name: 'Rachael Kimberly Msabeni',
    role: 'WTM Ambassador',
    note: 'Software Developer, UX Designer',
  },
  {
    id: 'sabina-benerdette',
    name: 'Sabina Benerdette',
    role: 'QA Engineer',
    organization: 'PULA',
  },
  {
    id: 'ngesa-marvin',
    name: 'Ngesa Marvin',
    role: 'Strategic Partnerships, Content & ML',
    organization: 'Safaricom PLC',
  },
  {
    id: 'mambo-bryan',
    name: 'Mambo Bryan',
    role: 'Strategy and Partnerships',
    organization: 'BiziLabs',
  },
  {
    id: 'maina-wycliffe',
    name: 'Maina Wycliffe',
    role: 'Typescript Aficionado and Google Developer Expert',
    organization: 'Unstacked Labs',
  },
]

export const recommendations: Recommendation[] = [
  {
    id: 'ai-gemini',
    title: 'AI and Gemini path',
    audience: 'For builders exploring agentic product patterns.',
    sessionIds: ['developer-keynote', 'forms-to-agents', 'ai-safety-valve'],
  },
  {
    id: 'webmcp',
    title: 'Agent-ready web path',
    audience: 'For web developers turning content into structured agent context.',
    sessionIds: ['webmcp-websites', 'guided-web-dev', 'forms-to-agents'],
  },
  {
    id: 'firebase-cloud',
    title: 'Firebase and Cloud path',
    audience: 'For teams shipping AI apps on managed infrastructure.',
    sessionIds: [
      'firebase-chrome-hybrid',
      'hybrid-inference',
      'cloud-ai-apps',
      'secure-agents-gke',
    ],
  },
  {
    id: 'android',
    title: 'Android teams path',
    audience: 'For mobile engineers adapting team workflows to agents.',
    sessionIds: ['android-agentic-workflows', 'developer-keynote', 'ai-safety-valve'],
  },
  {
    id: 'angular-web',
    title: 'Angular and modern web path',
    audience: 'For frontend engineers tracking Angular and AI-assisted delivery.',
    sessionIds: ['angular-v22', 'forms-to-agents', 'guided-web-dev'],
  },
  {
    id: 'first-time',
    title: 'First-time attendee path',
    audience: 'For students and new community members who want the broadest view.',
    sessionIds: ['opening-keynote', 'developer-keynote', 'community-segment'],
  },
]

export const agentTools: AgentTool[] = [
  {
    name: 'event_lookup',
    description: 'Returns event basics, source links, themes, venue, and RSVP URL.',
    example: 'event_lookup({ includeSources: true })',
  },
  {
    name: 'sessions_search',
    description: 'Finds agenda sessions by text, speaker, room, theme, or time.',
    example: 'sessions_search({ theme: "WebMCP" })',
  },
  {
    name: 'speakers_profile',
    description: 'Returns public speaker details and linked agenda appearances.',
    example: 'speakers_profile({ id: "felix-jumason" })',
  },
  {
    name: 'agenda_explore',
    description: 'Groups the day by time, room, or session type.',
    example: 'agenda_explore({ groupBy: "time" })',
  },
  {
    name: 'recommendations_list',
    description: 'Returns curated paths for different attendee goals.',
    example: 'recommendations_list({ audience: "first-time" })',
  },
  {
    name: 'event_brief',
    description: 'Generates a concise event brief from the public event dataset.',
    example: 'event_brief({ format: "attendee" })',
  },
]
