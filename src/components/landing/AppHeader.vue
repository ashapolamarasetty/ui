<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const links = ['Product', 'News', 'Docs']
const scrolled = ref(false)
const isDark = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

const applyTheme = (dark: boolean) => {
  isDark.value = dark
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch (e) {
    // ignore
  }
}

const toggleTheme = () => {
  applyTheme(!isDark.value)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const current = document.documentElement.getAttribute('data-theme')
  isDark.value = current === 'dark'
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="header-inner">
      <a href="#" class="logo">
        <span class="logo-mark">A</span>
        <span class="logo-text">ATLAS</span>
      </a>

      <nav class="nav">
        <a v-for="link in links" :key="link" href="#" class="nav-link">{{ link }}</a>
      </nav>

      <div class="actions">
        <button type="button" class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="!isDark" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
          <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <RouterLink to="/home" class="btn btn-outline-header btn-sm">Log In</RouterLink>
        <a href="#" class="btn btn-dark btn-sm">Contact Support</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  height: 72px;
  transition: background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  border-bottom: 1px solid transparent;
  animation: header-drop 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.header.scrolled {
  background-color: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid var(--border);
}

@keyframes header-drop {
  0% {
    opacity: 0;
    transform: translateY(-16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--accent-light), var(--accent));
  color: white;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.logo:hover .logo-mark {
  transform: rotate(-8deg) scale(1.08);
  box-shadow: 0 6px 16px rgba(194, 46, 46, 0.35);
}

.logo-text {
  color: var(--fg);
  letter-spacing: 0.08em;
  font-weight: 600;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: auto;
}

.nav-link {
  font-size: 12px;
  color: var(--fg);
  font-weight: 400;
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}

.nav-link {
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  transform: rotate(20deg) scale(1.08);
  border-color: var(--accent);
  color: var(--accent);
}

.theme-icon {
  width: 17px;
  height: 17px;
}

</style>
