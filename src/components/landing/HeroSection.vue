<script setup lang="ts">
import { ref, onMounted } from 'vue'

const dashboardRef = ref<HTMLElement | null>(null)
const animationStarted = ref(false)

const copied = ref(false)
const curlCommand = 'curl -fsSL https://atlas.ai/cli | sh'

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(curlCommand)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Agent session mockup animation
const launchPhase = ref('icon') // icon -> clicking -> opening -> ready
const showPointer = ref(false)
const pointerClicked = ref(false)

// Root shell prompt, typed before the agent session starts
const shellStarted = ref(false)
const rootPromptText = ref('')
const fullRootCommand = 'atlas'
const rootCursorVisible = ref(true)

const promptText = ref('')
const fullPrompt = 'Audit the /api/users endpoint for security issues'
const step = ref(0) // 0=typing, 1=thinking, 2=read, 3=bash, 4=working
const workingSeconds = ref(0)
const showCursor = ref(true)

onMounted(() => {
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)

  setInterval(() => {
    if (step.value === 4) workingSeconds.value++
  }, 1000)

  const checkInView = () => {
    if (animationStarted.value || !dashboardRef.value) return
    const rect = dashboardRef.value.getBoundingClientRect()
    const viewportH = window.innerHeight || document.documentElement.clientHeight
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(rect.bottom, viewportH)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    const ratio = rect.height > 0 ? visibleHeight / rect.height : 0
    if (ratio >= 0.35) {
      animationStarted.value = true
      window.removeEventListener('scroll', checkInView)
      runLaunchSequence()
    }
  }

  window.addEventListener('scroll', checkInView, { passive: true })
  checkInView()
})

function runLaunchSequence() {
  // Pointer slides in, clicks the icon, then the terminal opens
  setTimeout(() => (showPointer.value = true), 500)
  setTimeout(() => (pointerClicked.value = true), 1500)
  setTimeout(() => {
    launchPhase.value = 'opening'
  }, 1750)
  setTimeout(() => {
    launchPhase.value = 'ready'
    startRootShell()
  }, 2300)
}

function startRootShell() {
  setTimeout(() => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < fullRootCommand.length) {
        rootPromptText.value += fullRootCommand[i]
        i++
      } else {
        clearInterval(typeInterval)
        rootCursorVisible.value = false
        setTimeout(() => {
          shellStarted.value = true
          startAgentSequence()
        }, 600)
      }
    }, 90)
  }, 400)
}

function startAgentSequence() {
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < fullPrompt.length) {
      promptText.value += fullPrompt[i]
      i++
    } else {
      clearInterval(typeInterval)
      setTimeout(() => (step.value = 1), 400)
      setTimeout(() => (step.value = 2), 1400)
      setTimeout(() => (step.value = 3), 2400)
      setTimeout(() => (step.value = 4), 3600)
    }
  }, 40)
}
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <div class="eyebrow-underline">THE AUTONOMY STACK</div>

      <h1 class="headline">THE INDUSTRIAL REVOLUTION<br />FOR SOFTWARE DEVELOPMENT</h1>

      <div class="cta-row">
        <a href="#" class="btn btn-download">Download</a>
        <a href="#" class="btn btn-outline">Contact Sales →</a>
      </div>

      <div class="terminal">
        <span class="terminal-prompt">&gt;</span>
        <code>{{ curlCommand }}</code>
        <button class="copy-btn" @click="copyToClipboard" :class="{ copied }">
          <span v-if="!copied" class="copy-icon">📋</span>
          <span v-else class="copy-icon">✓</span>
        </button>
      </div>

      <div class="dashboard-preview" ref="dashboardRef">
        <div v-if="launchPhase === 'icon' || launchPhase === 'clicking'" key="icon" class="icon-stage">
            <div class="app-icon terminal-icon" :class="{ pressed: pointerClicked }">
              <svg viewBox="0 0 100 100" class="terminal-icon-svg">
                <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#termGrad)"/>
                <rect x="4" y="4" width="92" height="92" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                <path d="M20 34 L34 46 L20 58" stroke="#4ade80" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <line x1="40" y1="58" x2="62" y2="58" stroke="#4ade80" stroke-width="6" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="termGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4a4a4a"/>
                    <stop offset="100%" stop-color="#1a1a1a"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="app-label">Terminal</span>

            <svg v-if="showPointer" class="pointer" :class="{ clicked: pointerClicked }" viewBox="0 0 24 24" fill="none">
              <path d="M4 2L4 18L8.5 14.5L11 21L14 19.5L11.5 13L17 13L4 2Z" fill="#1a1a1a" stroke="#ffffff" stroke-width="1"/>
            </svg>
          </div>

          <div v-else-if="launchPhase === 'opening'" key="opening" class="launch-box">
            <span class="launch-spinner"></span>
            <span class="launch-text">Opening terminal…</span>
          </div>

          <div v-else key="ready" class="agent-window">
          <div class="agent-titlebar">
            <div class="dots">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
            </div>
            <span class="agent-title">atlas — website</span>
            <span class="agent-menu">⋮</span>
          </div>

          <div class="agent-body">
            <div class="root-prompt-row">
              <span class="root-prompt-label">root@atlas ~ %</span>
              <span class="root-prompt-typed">{{ rootPromptText }}<span v-if="!shellStarted" class="cursor" :class="{ hidden: !rootCursorVisible }">▋</span></span>
            </div>

            <template v-if="shellStarted">
            <div class="status-row">
              <span class="status-dot">•</span> Connected to agent server: ATLAS v1.0.6
            </div>

            <div class="prompt-row">
              <span class="arrow">›</span>
              <span class="prompt-typed">{{ promptText }}<span v-if="step === 0" class="cursor" :class="{ hidden: !showCursor }">▋</span></span>
            </div>

            <transition name="fade-step">
              <div v-if="step >= 1" class="step-block">
                <div class="step-head"><span class="step-dot"></span> Thinking</div>
                <div class="step-detail">└ I'll check for auth gaps, unvalidated inputs, and over-exposed data in the users endpoint.</div>
              </div>
            </transition>

            <transition name="fade-step">
              <div v-if="step >= 2" class="step-block">
                <div class="step-head"><span class="step-dot"></span> <span class="tool-name">Read</span> (src/routes/api/users/+server.ts)</div>
                <div class="code-block">
                  <div>└ 1  export async function GET({ url }) {</div>
                  <div>&nbsp;&nbsp;2    const users = await db.user.findMany();</div>
                  <div>&nbsp;&nbsp;3    return json(users);</div>
                  <div>&nbsp;&nbsp;4  }</div>
                </div>
              </div>
            </transition>

            <transition name="fade-step">
              <div v-if="step >= 3" class="step-block">
                <div class="step-head"><span class="step-dot"></span> <span class="tool-name">Bash</span> (grep -rn "requireAuth" src/routes/api)</div>
                <div class="code-block">
                  <div>└ src/routes/api/posts/+server.ts:3:    requireAuth(event);</div>
                  <div>&nbsp;&nbsp;src/routes/api/comments/+server.ts:4:  requireAuth(event);</div>
                  <div>&nbsp;&nbsp;src/routes/api/billing/+server.ts:2:   requireAuth(event);</div>
                </div>
              </div>
            </transition>

            <transition name="fade-step">
              <div v-if="step >= 4" class="working-row">
                ⋮ Working… ({{ workingSeconds }}s • Press esc to interrupt)
              </div>
            </transition>

            <div class="prompt-row bottom-prompt">
              <span class="arrow">›</span>
              <span class="cursor" :class="{ hidden: !showCursor }">▋</span>
            </div>
            </template>
          </div>

          <div class="agent-footer">
            <span>Always ask</span>
            <span class="footer-path">~/Apps/atlas</span>
            <span class="footer-badge">security/users-endpoint <span class="pr-badge">(PR #297)</span></span>
            <span class="footer-model">atlas/frontier-2.1</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 56px 0 96px;
  margin-top: 72px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  max-width: 100%;
  padding: 0 24px;
}

.headline {
  font-size: 3.25rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  max-width: 100%;
  color: var(--fg) !important;
  font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  animation: hero-intro 0.6s ease-out;
  opacity: 1 !important;
  word-spacing: 0.1em;
}

.subhead {
  display: none;
}

.eyebrow-underline {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  animation: fade-in-delayed 0.6s ease-out;
}

.eyebrow-underline::before {
  content: '';
  width: 40px;
  height: 2px;
  background: var(--accent);
  flex-shrink: 0;
}

.cta-row {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  justify-content: center;
}

:global(.btn-download) {
  background: linear-gradient(135deg, var(--accent-light), var(--accent)) !important;
  color: #ffffff !important;
  border: none !important;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, background 0.25s ease !important;
}

:global(.btn-download:hover) {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark)) !important;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 24px rgba(194, 46, 46, 0.25);
}

.terminal {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--code-bg);
  color: var(--code-fg);
  border-radius: var(--radius-md);
  padding: 12px 20px;
  font-family: var(--font-mono);
  font-size: 14px;
  animation: terminal-in 0.7s ease-out 0.2s both;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.terminal-prompt {
  color: var(--dark-muted);
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  margin-left: 12px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 1;
}

.copy-btn.copied {
  opacity: 1;
}

.dashboard-preview {
  margin-top: 96px;
  width: calc(100vw - 80px);
  max-width: calc(100vw - 80px);
  margin-left: calc(-50vw + 50% + 40px);
  margin-right: calc(-50vw + 50% + 40px);
  min-height: 560px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background-color: var(--preview-bg);
  background-image: repeating-linear-gradient(0deg, var(--preview-grid) 0px, var(--preview-grid) 1px, transparent 1px, transparent 3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: hero-intro 0.7s ease-out 0.2s both;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.agent-window {
  width: 100%;
  max-width: 1160px;
  background-color: var(--term-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  text-align: left;
  animation: launch-pop-in 0.4s ease-out both;
  transition: background-color 0.3s ease;
}

.agent-titlebar {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid var(--term-border);
  position: relative;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.agent-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--term-fg);
}

.agent-menu {
  margin-left: auto;
  color: var(--term-muted);
}

.agent-body {
  padding: 24px 24px 12px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.7;
  min-height: 380px;
}

.root-prompt-row {
  display: flex;
  gap: 8px;
  color: var(--term-fg);
  margin-bottom: 20px;
}

.root-prompt-label {
  color: var(--accent);
  font-weight: 600;
  flex-shrink: 0;
}

.root-prompt-typed {
  color: var(--term-fg);
  font-weight: 600;
}

.status-row {
  color: var(--term-muted);
  font-size: 13px;
  margin-bottom: 20px;
}

.status-dot {
  color: var(--accent-light);
}

.prompt-row {
  display: flex;
  gap: 10px;
  font-weight: 600;
  color: var(--term-fg);
  margin-bottom: 20px;
}

.arrow {
  color: var(--term-muted);
}

.cursor {
  color: var(--accent);
  font-weight: 400;
}

.cursor.hidden {
  opacity: 0;
}

.step-block {
  margin-bottom: 18px;
}

.step-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--term-fg);
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.tool-name {
  color: var(--accent);
}

.step-detail,
.code-block {
  color: var(--term-muted);
  font-size: 13px;
  margin-top: 6px;
  padding-left: 16px;
  white-space: pre;
}

.working-row {
  color: var(--term-muted);
  font-size: 13px;
  margin: 12px 0;
  padding-top: 12px;
  border-top: 1px solid var(--term-border);
}

.bottom-prompt {
  margin-top: 20px;
  margin-bottom: 0;
}

.agent-footer {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  border-top: 1px solid var(--term-border);
  background: var(--term-bg-alt);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--term-muted);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-path {
  color: var(--term-muted);
}

.footer-badge {
  margin-left: auto;
}

.pr-badge {
  color: var(--accent-light);
}

.footer-model {
  color: var(--term-muted);
}

.fade-step-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-step-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.icon-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: launch-pop-in 0.4s ease-out both;
}

@keyframes launch-pop-in {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: scale(1); }
}

.app-icon {
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  transition: transform 0.12s ease, box-shadow 0.3s ease;
  animation: icon-float 2.6s ease-in-out infinite;
}

.app-icon.pressed {
  transform: scale(0.9);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
  animation: none;
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.terminal-icon-svg {
  width: 100%;
  height: 100%;
}

.app-label {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.pointer {
  position: absolute;
  width: 26px;
  height: 26px;
  top: 120%;
  left: 120%;
  animation: pointer-move 1s ease-out forwards;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.pointer.clicked {
  animation: pointer-move 1s ease-out forwards, pointer-click 0.25s ease 1s;
}

@keyframes pointer-move {
  from {
    top: 120%;
    left: 120%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  to {
    top: 38%;
    left: 54%;
    opacity: 1;
  }
}

@keyframes pointer-click {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}

.launch-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: var(--font-mono);
  font-size: 16px;
  padding: 16px 28px;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: launch-pop-in 0.3s ease-out both;
}

.launch-prompt {
  color: var(--accent-light);
  font-weight: 600;
}

.launch-text {
  min-width: 60px;
}

.launch-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--accent-light);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.launch-fade-enter-active,
.launch-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.launch-fade-enter-from {
  opacity: 0;
  transform: scale(0.96);
}

.launch-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
