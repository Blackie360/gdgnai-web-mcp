/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export type Interest =
  | 'ai'
  | 'gemini'
  | 'android'
  | 'web'
  | 'angular'
  | 'firebase'
  | 'cloud'
  | 'security'
  | 'data-ml'
  | 'devops'

export const INTEREST_LABELS: Record<Interest, string> = {
  ai: 'AI & Agents',
  gemini: 'Gemini',
  android: 'Android',
  web: 'Web Development',
  angular: 'Angular',
  firebase: 'Firebase',
  cloud: 'Google Cloud',
  security: 'Security',
  'data-ml': 'Data & ML',
  devops: 'DevOps & Cloud Native',
}

export interface Speaker {
  id: string
  name: string
  title: string
  bio?: string
}

export interface Session {
  id: string
  title: string
  startTime: string
  endTime: string
  room: string | null
  speakerId: string | null
  description: string
  interests: Interest[]
  isKeynote?: boolean
  isBreak?: boolean
}

export const EVENT = {
  name: 'Google I/O Extended Nairobi 2026',
  organizer: 'GDG Nairobi',
  date: 'Saturday, June 20, 2026',
  time: '8:00 AM – 5:00 PM (GMT+3)',
  venue: 'Simba Corporation Aspire Center Westlands',
  address: 'Waiyaki Way, Nairobi, Nairobi 00100',
  description:
    'Google I/O 2026 wrapped on 20 May in Mountain View, and GDG Nairobi is bringing the local edition to you. A full-day, hands-on response to the biggest developer conference of the year — unpacking Gemini 3.5, Antigravity 2.0, Android 17, WebMCP, and Firebase AI Studio together.',
  themes: ['AI', 'Gemini', 'Build with AI', 'Google Cloud', 'Google I/O Extended'],
}

export const SPEAKERS: Speaker[] = [
  {
    id: 'john-kimani',
    name: 'John Kimani',
    title: 'Developer Ecosystem Regional Lead, Sub-Saharan Africa',
    bio: 'Opening the day with the developer keynote on Google\'s latest platform updates.',
  },
  {
    id: 'shadrack-inusah',
    name: 'Shadrack Inusah',
    title: 'GDE for Cloud AI',
    bio: 'Expert in orchestrating parallel AI agents with Antigravity 2.0.',
  },
  {
    id: 'auwal-ms',
    name: 'Auwal MS',
    title: 'Lead, Developer Relations & Integrations, Moniepoint | GDE for Firebase',
    bio: 'Builds cost-efficient web apps with Firebase AI Logic and Chrome hybrid inference.',
  },
  {
    id: 'jacquiline-gitau',
    name: 'Jacquiline Gitau',
    title: 'Community Manager, DotNexxt | Android Developer',
    bio: 'Focuses on agentic workflows for Android development teams.',
  },
  {
    id: 'john-megwe',
    name: 'John M. Megwe',
    title: 'Data Scientist',
    bio: 'Applies geospatial reasoning over Earth Engine for planetary-scale questions.',
  },
  {
    id: 'felix-jumason',
    name: 'Felix Jumason',
    title: 'Software Engineer, Liquid Intelligent Technologies',
    bio: 'Makes websites agent-ready with WebMCP — structured tools for AI on the web.',
  },
  {
    id: 'hassan-bahati',
    name: 'Hassan Bahati',
    title: 'Software Engineer',
    bio: 'Explores hybrid inference patterns with Firebase AI Logic.',
  },
  {
    id: 'gabriel-agbobli',
    name: 'Gabriel Agbobli',
    title: 'Research Scholar, Strathmore University | GDE for Google Cloud',
    bio: 'Builds analytics agents with the Managed Agents API.',
  },
  {
    id: 'samuel-macharia',
    name: 'Samuel Macharia',
    title: 'Cloud DevOps Engineer | GDE for Google Cloud',
    bio: 'Secures autonomous AI agents running on Google Kubernetes Engine.',
  },
  {
    id: 'wayne-gakuo',
    name: 'Wayne Gakuo',
    title: 'Co-Founder & Technical Solutions Architect, Unstacked Labs | GDE for Angular',
    bio: 'Co-organizer of GDG Nairobi and Angular GDE covering v22 updates.',
  },
  {
    id: 'wycliffe-maina',
    name: 'Wycliffe Maina',
    title: 'Gen AI & Automations Engineer | GDE for Angular',
    bio: 'Designs safety valves and verification layers for autonomous AI agents.',
  },
  {
    id: 'rhodah-mulera',
    name: 'Rhodah Mulera',
    title: 'Software Developer',
    bio: 'Creates AI applications on Google Cloud from build through scale.',
  },
  {
    id: 'joseph-masaka',
    name: 'Joseph Masaka',
    title: 'Full-Stack Software Developer',
    bio: 'Transforms traditional forms into agent-driven experiences with Gemini and Angular.',
  },
  {
    id: 'rama-ochieng',
    name: 'Rama Ochieng',
    title: 'Solutions Engineer (Frontend, DevOps, AI)',
    bio: 'Bridges knowledge gaps in modern web development with guided workflows.',
  },
  {
    id: 'alex-nyambura',
    name: 'Alex Nyambura',
    title: 'Cloud DevOps Engineer',
    bio: 'Deploys cloud-native apps on GCP using the Antigravity CLI.',
  },
  {
    id: 'gdg-nairobi',
    name: 'GDG Nairobi',
    title: 'Community Organizers',
    bio: 'The team behind Google Developer Groups Nairobi.',
  },
]

export const SESSIONS: Session[] = [
  {
    id: 'registration',
    title: 'Registration & Check-in',
    startTime: '08:00',
    endTime: '08:55',
    room: null,
    speakerId: 'gdg-nairobi',
    description: 'Arrive early, grab your badge, and meet fellow developers.',
    interests: [],
    isBreak: true,
  },
  {
    id: 'welcome-keynote',
    title: 'Welcome & Opening Keynote',
    startTime: '08:55',
    endTime: '09:15',
    room: null,
    speakerId: 'gdg-nairobi',
    description: 'Official welcome and opening remarks from GDG Nairobi.',
    interests: ['ai'],
    isKeynote: true,
  },
  {
    id: 'developer-keynote',
    title: 'Developer Keynote',
    startTime: '09:15',
    endTime: '10:00',
    room: null,
    speakerId: 'john-kimani',
    description: 'Highlights from Google I/O 2026 — Gemini 3.5, Antigravity 2.0, Android 17, WebMCP, and Firebase AI Studio.',
    interests: ['ai', 'gemini', 'android', 'web', 'firebase', 'cloud'],
    isKeynote: true,
  },
  {
    id: 'antigravity-agents',
    title: 'Orchestrating Parallel Agents with Antigravity 2.0',
    startTime: '10:00',
    endTime: '10:50',
    room: 'Room 1',
    speakerId: 'shadrack-inusah',
    description: 'Learn how to coordinate multiple AI agents in parallel using Antigravity 2.0.',
    interests: ['ai', 'cloud', 'devops'],
  },
  {
    id: 'firebase-hybrid',
    title: 'Smarter, Cheaper, Faster: Building Cost-Efficient Web Apps with Firebase AI Logic & Chrome Hybrid Inference',
    startTime: '10:00',
    endTime: '10:50',
    room: 'Room 2',
    speakerId: 'auwal-ms',
    description: 'Reduce inference costs with Firebase AI Logic and on-device hybrid inference in Chrome.',
    interests: ['ai', 'firebase', 'web', 'gemini'],
  },
  {
    id: 'android-agents',
    title: 'Agentic Workflows for Android Teams',
    startTime: '10:00',
    endTime: '10:50',
    room: 'Room 3',
    speakerId: 'jacquiline-gitau',
    description: 'Practical patterns for integrating AI agents into Android development workflows.',
    interests: ['ai', 'android', 'gemini'],
  },
  {
    id: 'earth-engine',
    title: 'Ask the Planet: Geospatial Reasoning over Earth Engine',
    startTime: '10:50',
    endTime: '11:40',
    room: 'Room 1',
    speakerId: 'john-megwe',
    description: 'Combine geospatial data with AI reasoning using Google Earth Engine.',
    interests: ['ai', 'data-ml', 'cloud'],
  },
  {
    id: 'webmcp',
    title: 'Agent-Ready Websites with WebMCP',
    startTime: '10:50',
    endTime: '11:40',
    room: 'Room 2',
    speakerId: 'felix-jumason',
    description: 'Expose structured tools on your website so AI agents can interact with your app — not just scrape it.',
    interests: ['ai', 'web', 'gemini'],
  },
  {
    id: 'hybrid-inference',
    title: 'Hybrid Inference with Firebase AI Logic',
    startTime: '10:50',
    endTime: '11:40',
    room: 'Room 3',
    speakerId: 'hassan-bahati',
    description: 'Deep dive into hybrid inference strategies with Firebase AI Logic.',
    interests: ['ai', 'firebase', 'gemini'],
  },
  {
    id: 'world-cup-agent',
    title: 'World Cup Analytics Agent with Managed Agents API',
    startTime: '11:40',
    endTime: '12:30',
    room: 'Room 1',
    speakerId: 'gabriel-agbobli',
    description: 'Build a sports analytics agent using Google Cloud Managed Agents API.',
    interests: ['ai', 'cloud', 'data-ml'],
  },
  {
    id: 'gke-security',
    title: 'Securing Autonomous AI Agents on GKE',
    startTime: '11:40',
    endTime: '12:30',
    room: 'Room 2',
    speakerId: 'samuel-macharia',
    description: 'Security patterns for running autonomous AI agents on Google Kubernetes Engine.',
    interests: ['ai', 'cloud', 'security', 'devops'],
  },
  {
    id: 'angular-v22',
    title: "What's New in Angular v22",
    startTime: '11:40',
    endTime: '12:30',
    room: 'Room 3',
    speakerId: 'wayne-gakuo',
    description: 'Latest Angular v22 features and what they mean for your apps.',
    interests: ['angular', 'web'],
  },
  {
    id: 'lunch',
    title: 'Lunch + Group Photo',
    startTime: '12:30',
    endTime: '13:20',
    room: null,
    speakerId: null,
    description: 'Network over lunch and capture the community group photo.',
    interests: [],
    isBreak: true,
  },
  {
    id: 'trust-verify',
    title: 'Trust, But Verify: a Safety Valve for AI Agents',
    startTime: '13:20',
    endTime: '14:10',
    room: 'Room 1',
    speakerId: 'wycliffe-maina',
    description: 'Add verification layers so AI agents stay safe and predictable in production.',
    interests: ['ai', 'angular', 'security', 'gemini'],
  },
  {
    id: 'build-deploy-scale',
    title: 'Build, Deploy, Scale: Creating AI Applications with Google Cloud',
    startTime: '13:20',
    endTime: '14:10',
    room: 'Room 2',
    speakerId: 'rhodah-mulera',
    description: 'End-to-end guide to shipping AI apps on Google Cloud.',
    interests: ['ai', 'cloud', 'devops'],
  },
  {
    id: 'forms-to-agents',
    title: 'From Forms to Agents with Gemini & Angular',
    startTime: '13:20',
    endTime: '14:10',
    room: 'Room 3',
    speakerId: 'joseph-masaka',
    description: 'Evolve form-based UIs into agent-driven experiences with Gemini and Angular.',
    interests: ['ai', 'angular', 'web', 'gemini'],
  },
  {
    id: 'stay-guided',
    title: 'Stay Guided, Reduce the Slop: Bridging the knowledge gap in modern Web Development',
    startTime: '14:10',
    endTime: '15:00',
    room: 'Room 1',
    speakerId: 'rama-ochieng',
    description: 'Use guided workflows and AI to cut through noise in modern frontend development.',
    interests: ['web', 'ai', 'devops'],
  },
  {
    id: 'antigravity-cli',
    title: 'Cloud-Native Apps on GCP with Antigravity CLI',
    startTime: '14:10',
    endTime: '15:00',
    room: 'Room 2',
    speakerId: 'alex-nyambura',
    description: 'Ship cloud-native applications on GCP using the Antigravity CLI.',
    interests: ['cloud', 'devops', 'ai'],
  },
  {
    id: 'community',
    title: 'Community Segment: Feedback, Announcements',
    startTime: '15:00',
    endTime: '15:35',
    room: null,
    speakerId: 'gdg-nairobi',
    description: 'Share feedback, hear community announcements, and celebrate the day.',
    interests: [],
    isBreak: true,
  },
  {
    id: 'closing',
    title: 'Closing Remarks, Networking & Wind-down',
    startTime: '15:35',
    endTime: '17:00',
    room: null,
    speakerId: 'gdg-nairobi',
    description: 'Wrap up the day with networking and goodbyes.',
    interests: [],
    isBreak: true,
  },
]

export function getSpeakerById(id: string): Speaker | undefined {
  return SPEAKERS.find((s) => s.id === id)
}

export function getSessionById(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id)
}

export function getSessionsForSpeaker(speakerId: string): Session[] {
  return SESSIONS.filter((s) => s.speakerId === speakerId)
}

export function getTechnicalSessions(): Session[] {
  return SESSIONS.filter((s) => !s.isBreak && s.room !== null)
}
