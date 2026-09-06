<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const route = useRoute()
const { lightMode } = useTheme()

const collapsed = ref(false)
const profileOpen = ref(false)

const navItems = [
  { label: 'Home', icon: 'home', to: '/home' },
  { label: 'Projects', icon: 'projects', to: '/home/projects' },
  { label: 'Tasks', icon: 'tasks', to: '#' },
  { label: 'Agents', icon: 'agents', to: '#' },
  { label: 'Knowledge', icon: 'knowledge', to: '#' },
  { label: 'Skills', icon: 'skills', to: '#' },
  { label: 'Integrations', icon: 'integrations', to: '#' },
  { label: 'Security', icon: 'security', to: '#' },
  { label: 'Insights', icon: 'insights', to: '#' },
]

const navIconPaths: Record<string, string> = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  projects: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  tasks: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  agents: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><line x1="12" y1="15" x2="12" y2="17"/>',
  knowledge: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  skills: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  integrations: '<rect x="6" y="8" width="12" height="10" rx="2"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/><line x1="12" y1="13" x2="12" y2="15"/>',
  security: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  insights: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
}

const isActive = (to: string) => {
  if (to === '/home') return route.path === '/home'
  return route.path === to
}
</script>

<template>
  <div class="dash" :class="{ light: lightMode }">
    <aside class="sidebar" :class="{ collapsed }">
      <div class="sidebar-top">
        <div class="brand" v-if="!collapsed">ATLAS</div>
        <button class="collapse-btn" @click="collapsed = !collapsed" :class="{ collapsed }" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <span class="collapse-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <path d="M9 3v18"/>
              <path d="M14 9l-3 3 3 3"/>
            </svg>
          </span>
        </button>
      </div>

      <nav class="side-nav">
        <template v-for="item in navItems" :key="item.label">
          <RouterLink v-if="item.to !== '#'" :to="item.to" class="side-link" :class="{ active: isActive(item.to) }" :title="collapsed ? item.label : ''">
            <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="navIconPaths[item.icon]"></svg>
            <span v-if="!collapsed" class="side-label">{{ item.label }}</span>
          </RouterLink>
          <a v-else href="#" @click.prevent class="side-link" :title="collapsed ? item.label : ''">
            <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="navIconPaths[item.icon]"></svg>
            <span v-if="!collapsed" class="side-label">{{ item.label }}</span>
          </a>
        </template>
      </nav>

      <div class="side-footer">
        <button class="user" @click="profileOpen = !profileOpen" :class="{ active: profileOpen }">
          <span class="user-avatar">AP</span>
          <template v-if="!collapsed">
            <span class="user-name">Asha</span>
            <span class="chev">⌄</span>
          </template>
        </button>
      </div>
    </aside>

    <main class="content" :class="{ collapsed }">
      <div class="breadcrumb">BUILD <span class="sep">›</span> SHIP <span class="sep">›</span> EVOLVE</div>
      <div class="page-body">
        <RouterView />
      </div>
    </main>

    <!-- Profile Bottom Sheet -->
    <div class="profile-overlay" v-if="profileOpen" @click="profileOpen = false"></div>
    <div class="profile-sheet" :class="{ open: profileOpen }">
      <div class="sheet-content">
        <!-- Theme Buttons at Top -->
        <div class="theme-buttons-row">
          <button
            class="theme-btn-horizontal"
            :class="{ active: !lightMode }"
            @click="lightMode = false"
            title="Dark mode">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <span>Dark</span>
          </button>
          <button
            class="theme-btn-horizontal"
            :class="{ active: lightMode }"
            @click="lightMode = true"
            title="Light mode">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <span>Light</span>
          </button>
        </div>

        <!-- Notifications Link -->
        <a href="#" class="sheet-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span>Notifications</span>
          <span class="badge">●</span>
        </a>

        <!-- CLI Link -->
        <a href="#" class="sheet-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span>CLI</span>
        </a>

        <!-- Profile Link -->
        <a href="#" class="sheet-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </a>

        <!-- Logout -->
        <button class="sheet-link sheet-logout" @click="router.push('/')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.dash {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
  color: #f0e6e3;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --glow-rest: 0 0 0 1px rgba(224, 71, 58, 0.14), 0 0 16px rgba(224, 71, 58, 0.10);
  --glow-hover: 0 0 0 1px rgba(224, 71, 58, 0.5), 0 0 22px rgba(224, 71, 58, 0.3),
    0 0 44px rgba(224, 71, 58, 0.16);
}

/* Sidebar */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid rgba(224, 71, 58, 0.1);
  display: flex;
  flex-direction: column;
  padding: clamp(14px, 2.4vh, 24px) 16px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), padding 0.25s ease;
  z-index: 101;
}

.sidebar.collapsed {
  width: 68px;
  padding: 24px 12px;
}

.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(14px, 3.2vh, 32px);
  min-height: 20px;
  flex-shrink: 0;
}

.sidebar.collapsed .sidebar-top {
  justify-content: center;
}

.collapse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(224, 71, 58, 0.12);
  background: rgba(224, 71, 58, 0.04);
  color: #907a76;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.collapse-btn:hover {
  background: rgba(224, 71, 58, 0.1);
  border-color: rgba(224, 71, 58, 0.35);
  color: #ffab9b;
  box-shadow: 0 0 10px rgba(224, 71, 58, 0.15);
}

.collapse-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.collapse-btn.collapsed .collapse-icon {
  transform: scaleX(-1);
}

.collapse-btn svg {
  width: 16px;
  height: 16px;
}

.brand {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.25em;
  padding: 0 12px;
  white-space: nowrap;
}

@keyframes nav-slide-in {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 6px rgba(224, 71, 58, 0.5); }
  50%       { box-shadow: 0 0 14px rgba(224, 71, 58, 0.9), 0 0 24px rgba(224, 71, 58, 0.35); }
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.side-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: clamp(5px, 1.05vh, 9px) 12px;
  border-radius: 8px;
  font-size: 13.5px;
  color: #a08a86;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: nav-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.side-link:nth-child(1) { animation-delay: 0.04s; }
.side-link:nth-child(2) { animation-delay: 0.08s; }
.side-link:nth-child(3) { animation-delay: 0.12s; }
.side-link:nth-child(4) { animation-delay: 0.16s; }
.side-link:nth-child(5) { animation-delay: 0.20s; }
.side-link:nth-child(6) { animation-delay: 0.24s; }
.side-link:nth-child(7) { animation-delay: 0.28s; }
.side-link:nth-child(8) { animation-delay: 0.32s; }
.side-link:nth-child(9) { animation-delay: 0.36s; }

.side-link::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.side-link:hover::after { transform: translateX(100%); }

.sidebar.collapsed .side-link {
  justify-content: center;
  padding: 9px;
}

.side-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f0e6e3;
  transform: translateX(2px);
}

.sidebar.collapsed .side-link:hover {
  transform: none;
}

.side-link.active {
  background: rgba(224, 71, 58, 0.14);
  color: #ffab9b;
}

.side-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 55%;
  border-radius: 0 3px 3px 0;
  background: #e0473a;
  animation: glow-pulse 2.4s ease-in-out infinite;
}

.side-icon-svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.side-link:hover .side-icon-svg,
.side-link.active .side-icon-svg {
  opacity: 1;
}

.side-footer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid rgba(224, 71, 58, 0.1);
}

.user {
  border: none;
  background: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  transition: background 0.2s ease;
}

.sidebar.collapsed .user {
  justify-content: center;
  padding: 8px;
}

.user:hover {
  background: rgba(224, 71, 58, 0.06);
}

.user.active {
  background: rgba(224, 71, 58, 0.12);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0473a, #c22e2e);
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.user-name {
  font-size: 13px;
  font-weight: 500;
  color: #d4c5c1;
  flex: 1;
}

.chev {
  font-size: 12px;
  color: #907a76;
  transition: transform 0.25s ease;
}

.user.active .chev {
  transform: rotate(180deg);
}

/* Main content shell */
.content {
  flex: 1;
  height: 100vh;
  margin-left: 220px;
  padding: clamp(8px, 1.6vh, 16px) clamp(14px, 1.7vw, 26px) clamp(8px, 1.6vh, 14px);
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.content.collapsed {
  margin-left: 68px;
}

.breadcrumb {
  position: absolute;
  top: clamp(9px, 1.7vh, 20px);
  right: clamp(16px, 1.8vw, 32px);
  font-size: clamp(9.5px, 1.3vh, 11px);
  letter-spacing: 0.2em;
  color: #5a4642;
  z-index: 2;
}

.sep {
  margin: 0 4px;
  color: #3d2d2a;
}

.page-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .dash {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
  .content {
    height: auto;
    overflow: visible;
  }
}

/* ── Light mode ─────────────────────────────────────────────────── */
.dash.light {
  background: var(--bg);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px, 32px 32px;
  color: #2c1810;
  --accent: #e0473a;
  --accent-soft: rgba(224, 71, 58, 0.1);
  --accent-mid: rgba(224, 71, 58, 0.22);
  --warm-border: rgba(160, 90, 70, 0.13);
  --warm-hover: rgba(160, 90, 70, 0.07);
}

.dash.light .sidebar {
  background: var(--bg);
  border-right-color: var(--warm-border);
}

.dash.light .brand { color: #2c1810; }

.dash.light .side-link { color: #8a6258; }

.dash.light .side-link:hover {
  background: var(--warm-hover);
  color: #2c1810;
}

.dash.light .side-link.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.dash.light .side-link.active::before { background: var(--accent); }

.dash.light .side-footer { border-top-color: var(--warm-border); }

.dash.light .collapse-btn {
  border-color: rgba(160, 90, 70, 0.2);
  background: rgba(160, 90, 70, 0.04);
  color: #9a7268;
}

.dash.light .collapse-btn:hover {
  background: rgba(160, 90, 70, 0.1);
  border-color: rgba(160, 90, 70, 0.4);
  color: var(--accent);
  box-shadow: 0 0 10px rgba(160, 90, 70, 0.12);
}

.dash.light .user:hover { background: var(--warm-hover); }

.dash.light .user-name { color: #4a2e26; }

.dash.light .chev { color: #c0a098; }

.dash.light .breadcrumb { color: #c0a098; }

.dash.light .sep { color: #d8c0b8; }

/* Profile bottom sheet */
.profile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fade-in 0.25s ease;
}

.profile-sheet {
  position: fixed;
  bottom: -600px;
  left: 0;
  width: 220px;
  padding-bottom: 70px;
  max-height: 65vh;
  background: var(--bg);
  border-top: 1px solid rgba(224, 71, 58, 0.12);
  border-right: 1px solid rgba(224, 71, 58, 0.12);
  border-top-right-radius: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 16px;
  transition: bottom 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow-y: auto;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
}

.profile-sheet.open {
  bottom: 0;
}

.sheet-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.theme-buttons-row {
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(224, 71, 58, 0.1);
  margin-bottom: 4px;
}

.theme-btn-horizontal {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(224, 71, 58, 0.15);
  background: transparent;
  color: #a08a86;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn-horizontal svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.theme-btn-horizontal:hover {
  background: rgba(224, 71, 58, 0.08);
  border-color: rgba(224, 71, 58, 0.3);
  color: #f0e6e3;
}

.theme-btn-horizontal.active {
  background: rgba(224, 71, 58, 0.15);
  border-color: rgba(224, 71, 58, 0.45);
  color: #ffab9b;
  box-shadow: 0 0 12px rgba(224, 71, 58, 0.1);
}

.sheet-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 8px;
  color: #d4c5c1;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s ease;
  text-decoration: none;
}

.sheet-link:hover {
  background: rgba(224, 71, 58, 0.08);
  color: #ffab9b;
}

.sheet-link svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sheet-link .badge {
  margin-left: auto;
  color: #e0473a;
  font-size: 10px;
}

.sheet-logout {
  color: #c0736a;
  background: none;
  border: none;
  border-top: 1px solid rgba(224, 71, 58, 0.1);
  width: 100%;
  cursor: pointer;
  margin-top: -60px;
  padding-top: 12px;
  margin-bottom: 0;
}

.sheet-logout:hover {
  background: rgba(224, 71, 58, 0.1);
  color: #ff7a6e;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.dash.light .profile-sheet {
  background: var(--bg);
  border-top-color: var(--warm-border);
  border-right-color: var(--warm-border);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.08);
}

.dash.light .theme-buttons-row {
  border-bottom-color: var(--warm-border);
}

.dash.light .theme-btn-horizontal {
  border-color: rgba(160, 90, 70, 0.2);
  color: #8a6258;
}

.dash.light .theme-btn-horizontal:hover {
  background: rgba(160, 90, 70, 0.08);
  border-color: rgba(160, 90, 70, 0.35);
  color: #2c1810;
}

.dash.light .theme-btn-horizontal.active {
  background: rgba(224, 71, 58, 0.1);
  border-color: rgba(224, 71, 58, 0.45);
  color: #c22e2e;
  box-shadow: 0 0 12px rgba(224, 71, 58, 0.1);
}

.dash.light .sheet-link {
  color: #8a6258;
}

.dash.light .sheet-link:hover {
  background: rgba(160, 90, 70, 0.06);
  color: #c22e2e;
}

.dash.light .sheet-link .badge {
  color: var(--accent);
}
</style>
