<script setup lang="ts">
import { ref, onMounted } from 'vue'

const displayText = ref('')
const fullText = '$ npm install company --save-dev'
const isTyping = ref(true)

onMounted(() => {
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText[index]
      index++
    } else {
      isTyping.value = false
      clearInterval(typeInterval)
      // Start cursor blink animation
      setTimeout(() => {
        isTyping.value = true
      }, 1000)
    }
  }, 50)
})
</script>

<template>
  <section class="terminal-section">
    <div class="container">
      <div class="terminal-box">
        <div class="terminal-header">
          <div class="dots">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
          </div>
          <span class="terminal-title">terminal</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="prompt">›</span>
            <span class="command">{{ displayText }}<span v-if="isTyping" class="cursor">▋</span></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.terminal-section {
  padding: 80px 0;
  background: var(--dark-bg);
  color: var(--dark-fg);
}

.terminal-box {
  max-width: 600px;
  margin: 0 auto;
  background: #1e1e1e;
  border: 1px solid var(--dark-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  animation: hero-intro 0.8s ease-out 0.3s both;
}

.terminal-header {
  background: #2d2d2d;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--dark-border);
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

.terminal-title {
  font-size: 12px;
  color: var(--dark-muted);
  flex: 1;
  text-align: center;
}

.terminal-body {
  padding: 20px 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
}

.terminal-line {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
}

.prompt {
  color: var(--accent-light);
  flex-shrink: 0;
}

.command {
  color: var(--dark-fg);
  white-space: pre-wrap;
}

.cursor {
  animation: blink 1s infinite;
  color: var(--accent-light);
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.terminal-output {
  margin-top: 12px;
  border-top: 1px solid var(--dark-border);
  padding-top: 12px;
  color: var(--dark-muted);
  font-size: 12px;
}

.terminal-output p {
  margin: 6px 0;
  animation: fade-in-delayed 0.6s ease-out 0.8s both;
}

.terminal-output p.ready {
  color: #10b981;
  margin-top: 12px;
}
</style>
