/**
 * Blackie Labs — WebMCP explainer (concept only).
 * Covers imperative + declarative APIs; hands-on demos live on linked sites.
 */

(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  // Illustrative tool schema shown in the "With WebMCP" panel (not a live form on this page).
  const EXAMPLE_TOOL = {
    name: 'draft_content',
    description: 'Creates a local content draft from topic, format, and tone — example tool shape agents receive.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Subject of the draft.' },
        format: { type: 'string', description: 'Length: short or medium.' },
        tone: { type: 'string', description: 'Voice: professional or casual.' },
      },
      required: ['topic', 'format', 'tone'],
    },
  }

  function draftPreview(data) {
    const { topic, format, tone } = data
    const length = format === 'short' ? 'One paragraph.' : 'Two paragraphs with a clear hook.'
    return `${tone === 'professional' ? 'Update' : 'Hey — quick note'} on ${topic.replace(/-/g, ' ')}. ${length}`
  }

  function createDraftWidget(root, idPrefix) {
    const form = document.createElement('form')
    form.className = 'w-form'
    form.id = `${idPrefix}-form`
    form.setAttribute('novalidate', '')

    form.innerHTML = `
      <label class="w-full">Topic
        <select name="topic" aria-label="Topic">
          <option value="product-launch" selected>product launch</option>
          <option value="feature-release">feature release</option>
          <option value="community-update">community update</option>
        </select>
      </label>
      <label>Format
        <select name="format" aria-label="Format">
          <option value="short" selected>short</option>
          <option value="medium">medium</option>
        </select>
      </label>
      <label>Tone
        <select name="tone" aria-label="Tone">
          <option value="professional" selected>professional</option>
          <option value="casual">casual</option>
        </select>
      </label>
      <button type="submit" class="w-confirm w-full">Generate draft</button>
    `

    const preview = document.createElement('div')
    preview.className = 'w-success'
    preview.id = `${idPrefix}-preview`

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(form).entries())
      preview.textContent = draftPreview(data)
      preview.classList.add('is-visible')
    })

    root.innerHTML = ''
    root.classList.add('widget')
    root.appendChild(form)
    root.appendChild(preview)

    return {
      reset() {
        form.reset()
        preview.classList.remove('is-visible')
        preview.textContent = ''
      },
      fillAndSubmit(data) {
        Object.entries(data).forEach(([k, v]) => {
          const field = form.elements.namedItem(k)
          if (field) field.value = v
        })
        preview.textContent = draftPreview(Object.fromEntries(new FormData(form).entries()))
        preview.classList.add('is-visible')
      },
    }
  }

  let widgetWithout
  let widgetWith

  const toolsListEl = document.getElementById('tools-list')
  const toolsCountEl = document.getElementById('tools-count')
  const toolCallEl = document.getElementById('tool-call')
  const toolCallCodeEl = document.getElementById('tool-call-code')
  const statusEl = document.getElementById('insert-status')
  const annotationsEl = document.getElementById('annotations')
  const stageWithout = document.querySelector('.bl-panel--scrape .bl-stage')
  const scanCursor = document.getElementById('scan-cursor')
  const logListEl = document.querySelector('#log-without .log-list')

  const HAS_WEBMCP = !!(document.modelContext && typeof document.modelContext.getTools === 'function')

  function renderToolsPanel() {
    if (!toolsListEl || !toolsCountEl) return
    const props = Object.keys(EXAMPLE_TOOL.inputSchema.properties)
    const reqs = new Set(EXAMPLE_TOOL.inputSchema.required)
    toolsCountEl.textContent = '1'
    toolsListEl.innerHTML = `
      <li class="tool-item" data-tool="${EXAMPLE_TOOL.name}">
        <div class="tool-name">${EXAMPLE_TOOL.name}(${props.join(', ')}) <span class="tool-ro">read-only</span></div>
        <div class="tool-desc">${EXAMPLE_TOOL.description}</div>
        <div class="tool-args">${props.map((p) => `<span class="tool-arg${reqs.has(p) ? ' is-required' : ''}">${p}</span>`).join('')}</div>
      </li>
    `
  }

  function flashTool(name, args) {
    const el = toolsListEl?.querySelector(`[data-tool="${name}"]`)
    if (el) {
      el.classList.remove('is-called')
      void el.offsetWidth
      el.classList.add('is-called')
    }
    if (toolCallEl && toolCallCodeEl) {
      toolCallEl.hidden = false
      toolCallCodeEl.textContent = JSON.stringify({ tool: name, arguments: args }, null, 2)
    }
  }

  const ANNOTATION_DEFS = [
    { selector: 'select[name="topic"]', label: 'aria-label="Topic"?', side: 'above' },
    { selector: 'select[name="format"]', label: 'Format or tone?', side: 'above' },
    { selector: 'select[name="tone"]', label: 'Which dropdown is voice?', side: 'below' },
    { selector: '.w-confirm', label: '"Generate" — submit?', side: 'above' },
  ]

  const annoCache = []

  function layoutAnnotations() {
    if (!stageWithout || !annotationsEl) return
    const stageRect = stageWithout.getBoundingClientRect()
    ANNOTATION_DEFS.forEach((def, i) => {
      let box = annoCache[i]
      if (!box) {
        box = document.createElement('div')
        box.className = 'anno'
        const label = document.createElement('div')
        label.className = `anno-label t-${def.side}`
        label.textContent = def.label
        box.appendChild(label)
        annotationsEl.appendChild(box)
        annoCache[i] = box
      }
      const target = stageWithout.querySelector(def.selector)
      if (!target) {
        box.classList.add('is-hidden')
        return
      }
      box.classList.remove('is-hidden')
      const r = target.getBoundingClientRect()
      box.style.setProperty('--x', `${r.left - stageRect.left - 4}px`)
      box.style.setProperty('--y', `${r.top - stageRect.top - 4}px`)
      box.style.width = `${r.width + 8}px`
      box.style.height = `${r.height + 8}px`
    })
  }

  function moveCursorTo(el) {
    if (!el || !scanCursor || !stageWithout) return
    const stageRect = stageWithout.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    scanCursor.style.width = `${r.width + 12}px`
    scanCursor.style.height = `${r.height + 12}px`
    scanCursor.style.transform = `translate(${r.left - stageRect.left - 6}px, ${r.top - stageRect.top - 6}px)`
  }

  function clearLog() {
    if (logListEl) logListEl.innerHTML = ''
  }

  function log(msg, kind) {
    if (!logListEl) return
    const li = document.createElement('li')
    if (kind) li.classList.add(`is-${kind}`)
    li.textContent = msg
    logListEl.appendChild(li)
    logListEl.closest('.bl-log')?.scrollTo(0, 9999)
  }

  async function runWithoutSim(args) {
    if (!widgetWithout) return
    clearLog()
    widgetWithout.reset()
    scanCursor?.classList.add('is-on')

    log('Loading page DOM (1,842 nodes)…')
    await sleep(500)

    for (const name of ['topic', 'format', 'tone']) {
      const el = stageWithout.querySelector(`select[name="${name}"]`)
      moveCursorTo(el)
      await sleep(360)
      log(`Reading <select name="${name}"> — inferring from nearby text…`)
    }

    moveCursorTo(stageWithout.querySelector('.w-confirm'))
    await sleep(320)
    log('Clicking "Generate draft" — hope it is the right button', 'ok')
    widgetWithout.fillAndSubmit(args)
    await sleep(400)
    log('Draft produced after ~7 DOM interactions', 'ok')
    scanCursor?.classList.remove('is-on')
  }

  async function runWithSim(args) {
    if (!widgetWith) return false
    await sleep(200)
    flashTool('draft_content', args)
    widgetWith.fillAndSubmit(args)
    return true
  }

  async function runSimulation() {
    const runBtn = document.getElementById('run-sim')
    runBtn?.classList.add('is-running')
    const labelEl = runBtn?.querySelector('.run-label')
    const orig = labelEl?.textContent
    if (labelEl) labelEl.textContent = 'Running…'

    const args = { topic: 'product-launch', format: 'short', tone: 'professional' }
    await Promise.all([runWithoutSim(args), runWithSim(args)])

    if (labelEl) labelEl.textContent = orig
    runBtn?.classList.remove('is-running')
  }

  function init() {
    const withoutRoot = document.getElementById('widget-without')
    const withRoot = document.getElementById('widget-with')
    if (withoutRoot && withRoot) {
      widgetWithout = createDraftWidget(withoutRoot, 'cmp-without')
      widgetWith = createDraftWidget(withRoot, 'cmp-with')
    }

    if (statusEl) {
      if (HAS_WEBMCP) {
        statusEl.classList.add('is-live')
        statusEl.innerHTML =
          '<span class="bl-status-dot"></span> <code>document.modelContext</code> is available — this page is an explainer. Open the <a href="#live-demos">live demos</a> for real registered tools.'
      } else {
        statusEl.innerHTML =
          '<span class="bl-status-dot"></span> Simulated agent flow. Enable <code>chrome://flags/#enable-webmcp-testing</code> and inspect tools on the linked demos.'
      }
    }

    renderToolsPanel()
    layoutAnnotations()
    window.addEventListener('resize', () => setTimeout(layoutAnnotations, 80))

    document.getElementById('run-sim')?.addEventListener('click', runSimulation)
    document.getElementById('reset-sim')?.addEventListener('click', () => {
      widgetWithout?.reset()
      widgetWith?.reset()
      clearLog()
      scanCursor?.classList.remove('is-on')
      if (toolCallEl) toolCallEl.hidden = true
      toolsListEl?.querySelectorAll('.is-called').forEach((el) => el.classList.remove('is-called'))
      layoutAnnotations()
    })

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in-view')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12 },
      )
      document.querySelectorAll('.bl-panel, .bl-demo-card, .bl-timeline-item, .bl-api-card').forEach((el) => io.observe(el))
    }

    const nav = document.getElementById('blNav')
    if (nav) {
      const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
