<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scale = ref(1)
const opacity = ref(0)

onMounted(() => {
  // Zoom in animation
  let frame = 0
  const interval = setInterval(() => {
    frame++
    scale.value = 1 + (frame / 100) * 0.15
    opacity.value = Math.min(1, frame / 50)
    if (frame > 80) clearInterval(interval)
  }, 16)
})
</script>

<template>
  <section class="video-section">
    <div class="container">
      <div class="video-wrapper" :style="{ transform: `scale(${scale})`, opacity }">
        <div class="mock-video">
          <div class="video-glow"></div>
          <div class="video-content">
            <div class="video-bars">
              <div class="bar" style="animation-delay: 0s"></div>
              <div class="bar" style="animation-delay: 0.1s"></div>
              <div class="bar" style="animation-delay: 0.2s"></div>
              <div class="bar" style="animation-delay: 0.3s"></div>
              <div class="bar" style="animation-delay: 0.4s"></div>
            </div>
            <p class="video-text">Dashboard Preview</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  padding: 96px 0;
}

.video-wrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform-origin: center;
}

.mock-video {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.video-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(194, 46, 46, 0.1), transparent 70%);
  animation: pulse-glow 3s ease-in-out infinite;
}

.video-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.video-bars {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.bar {
  width: 6px;
  background: linear-gradient(to top, var(--accent), var(--accent-light));
  border-radius: 3px;
  animation: bars-up 0.8s ease-in-out infinite;
}

.bar:nth-child(1) { height: 30px; }
.bar:nth-child(2) { height: 50px; }
.bar:nth-child(3) { height: 40px; }
.bar:nth-child(4) { height: 60px; }
.bar:nth-child(5) { height: 35px; }

.video-text {
  color: #666666;
  font-size: 14px;
  margin: 0;
  letter-spacing: 0.05em;
}

@keyframes bars-up {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>
