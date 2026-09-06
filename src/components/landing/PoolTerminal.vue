<script setup lang="ts">
import { ref, onMounted } from 'vue'

const displayText = ref('')
const fullText = 'Audit the /auth service for security issues'
const showCursor = ref(true)

onMounted(() => {
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText[index]
      index++
    } else {
      clearInterval(typeInterval)
    }
  }, 45)

  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})

const shortcuts = [
  { key: 'shift+tab', label: 'Cycle mode' },
  { key: 'ctrl+m', label: 'Select model' },
  { key: 'ctrl+t', label: 'Toggle tool grouping' },
  { key: 'ctrl+g', label: 'Open prompt in editor' },
  { key: '?', label: 'Show all keyboard shortcuts' },
  { key: '/', label: 'Show available slash commands' },
]
</script>

<template>
  <section class="pool-section">
    <div class="container">
      <div class="pool-window">
        <div class="pool-titlebar">
          <span class="pool-title">atlas — website</span>
        </div>
        <div class="pool-body">
          <div class="pool-version">
            <span class="brand">atlas</span> v1.0.6
          </div>

          <div class="shortcuts">
            <div class="shortcut-row" v-for="s in shortcuts" :key="s.key">
              <span class="shortcut-key">{{ s.key }}</span>
              <span class="shortcut-label">{{ s.label }}</span>
            </div>
          </div>

          <div class="status-line">
            <span class="status-dot">•</span> Connected to agent server: ATLAS v1.0.6
          </div>

          <div class="prompt-line">
            <span class="prompt-arrow">›</span>
            <span class="prompt-text">{{ displayText }}<span class="cursor" :class="{ hidden: !showCursor }">▋</span></span>
          </div>
        </div>
        <div class="pool-footer">
          <span class="mode-badge">Always ask</span>
          <span class="model-badge">atlas/frontier-2.1</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pool-section {
  padding: 64px 0 96px;
  background: var(--bg);
}

.pool-window {
  max-width: 640px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  animation: hero-intro 0.7s ease-out;
}

.pool-titlebar {
  background: #f5f5f5;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.pool-title {
  font-size: 12px;
  color: #888888;
  font-family: var(--font-mono);
}

.pool-body {
  padding: 20px 20px 16px;
  font-family: var(--font-mono);
  font-size: 13px;
}

.pool-version {
  color: #333333;
  margin-bottom: 16px;
}

.brand {
  color: var(--accent);
  font-weight: 600;
}

.shortcuts {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.shortcut-row {
  display: flex;
  gap: 16px;
  font-size: 12px;
}

.shortcut-key {
  color: var(--accent);
  min-width: 110px;
  flex-shrink: 0;
}

.shortcut-label {
  color: #888888;
}

.status-line {
  font-size: 12px;
  color: #888888;
  margin-bottom: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.status-dot {
  color: #22c55e;
}

.prompt-line {
  display: flex;
  gap: 8px;
  color: #000000;
}

.prompt-arrow {
  color: var(--accent);
}

.cursor {
  color: var(--accent);
}

.cursor.hidden {
  opacity: 0;
}

.pool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #f9f9f9;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 11px;
  color: #888888;
}

.model-badge {
  color: var(--accent);
}
</style>
