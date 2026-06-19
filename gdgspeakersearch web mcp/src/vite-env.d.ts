/// <reference types="vite/client" />

interface ModelContext {
  registerTool: (
    tool: unknown,
    options?: { signal?: AbortSignal },
  ) => void
}

interface Navigator {
  modelContext?: ModelContext
}

interface Document {
  modelContext?: ModelContext
}
