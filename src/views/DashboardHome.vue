<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const collapsed = ref(false)
const notificationsOn = ref(true)
const profileOpen = ref(false)

const lightMode = ref(false)
const themeMode = ref('dark') // 'light', 'dark', 'black'

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const isDark = saved ? saved === 'dark' : document.documentElement.getAttribute('data-theme') === 'dark'
  lightMode.value = !isDark
})

watch(lightMode, (isLight) => {
  const theme = isLight ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  try { localStorage.setItem('theme', theme) } catch {}
})

const navItems = [
  { label: 'Home', icon: 'home', active: true },
  { label: 'Projects', icon: 'projects' },
  { label: 'Tasks', icon: 'tasks' },
  { label: 'Agents', icon: 'agents' },
  { label: 'Knowledge', icon: 'knowledge' },
  { label: 'Skills', icon: 'skills' },
  { label: 'Integrations', icon: 'integrations' },
  { label: 'Security', icon: 'security' },
  { label: 'Insights', icon: 'insights' },
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

const quickActions = [
  { label: 'Create a new project', icon: '📁' },
  { label: 'Fix a bug', icon: '🐞' },
  { label: 'Add a feature', icon: '✨' },
  { label: 'Run tests', icon: '▶' },
  { label: 'Improve performance', icon: '📈' },
]

const activeWork = [
  { title: 'MNP Modernisation', desc: 'Implement retry handling', status: 'Tests running…', pct: 68 },
  { title: 'Sanity Portal', desc: 'Generate ELK integration', status: 'Inspecting 12 files…', pct: 42 },
  { title: 'Payments Service', desc: 'Refactor authentication', status: 'Planning next steps…', pct: 15 },
  { title: 'Data Platform', desc: 'Migrate ingest pipeline', status: 'Writing migrations…', pct: 55 },
  { title: 'Identity Service', desc: 'Add SSO provider', status: 'Reviewing diff…', pct: 27 },
  { title: 'Cache Layer Optimization', desc: 'Implement Redis strategy', status: 'Configuring cluster…', pct: 38 },
]

const forYou = [
  { icon: '📄', color: '#6b8bff', text: 'PR #284 ready for review', time: '12m ago' },
  { icon: '🛡', color: '#ff6b6b', text: 'Security review requires action', time: '1h ago' },
  { icon: '📋', color: '#6b8bff', text: 'Project Atlas needs setup', time: '2h ago' },
  { icon: '✅', color: '#4ade80', text: 'Skill evaluation completed', time: '4h ago' },
  { icon: '🔌', color: '#4ade80', text: 'New integration available', time: '1d ago' },
]

const activity = [
  { icon: '💻', color: '#f59e0b', title: 'Code committed', subtitle: 'Agent · MNP Modernisation', time: '3m ago' },
  { icon: '✅', color: '#4ade80', title: 'Tests passed', subtitle: 'Agent · Sanity Portal', time: '17m ago' },
  { icon: '🛡', color: '#e0473a', title: 'Security scan', subtitle: 'No issues found', time: '28m ago' },
  { icon: '🔀', color: '#6b8bff', title: 'Pull request opened', subtitle: '#284 · Payments Service', time: '42m ago' },
]

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
        <a v-for="item in navItems" :key="item.label" href="#" class="side-link" :class="{ active: item.active }" :title="collapsed ? item.label : ''">
          <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" v-html="navIconPaths[item.icon]"></svg>
          <span v-if="!collapsed" class="side-label">{{ item.label }}</span>
        </a>
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

      <div class="body-grid">
        <section class="main-col">
          <div class="main-top">
            <div>
              <h1 class="greeting">Good afternoon, Asha</h1>
              <p class="subgreeting">Your software factory is live.</p>
            </div>
            <div class="top-actions">
              <button class="icon-btn" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </button>
              <button class="icon-btn" aria-label="Notifications">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span class="dot-badge"></span>
              </button>
            </div>
          </div>

          <div class="orb-stage">
            <img :src="lightMode ? '/images/atlas_light_matched_synced.gif' : '/images/atlas_orbit_arcs_synced.gif'" alt="Atlas: Ideas into impact" class="orb-gif" />
          </div>

          <div class="quick-actions">
            <button v-for="qa in quickActions" :key="qa.label" class="quick-pill">
              <span>{{ qa.icon }}</span>{{ qa.label }}
            </button>
          </div>

          <div class="activity-section panel">
            <div class="panel-head">
              <h3>Recent activity</h3>
              <a href="#" class="view-all">View all →</a>
            </div>
            <div class="activity-grid">
              <div v-for="a in activity" :key="a.title" class="activity-card">
                <span class="activity-icon" :style="{ background: a.color + '22', color: a.color }">{{ a.icon }}</span>
                <div class="activity-title">{{ a.title }}</div>
                <div class="activity-sub">{{ a.subtitle }}</div>
                <div class="activity-time">{{ a.time }}</div>
              </div>
            </div>
          </div>
        </section>

        <aside class="right-col">
          <div class="panel">
            <div class="panel-head">
              <h3>Active work</h3>
              <a href="#" class="view-all">View all →</a>
            </div>
            <div v-for="w in activeWork" :key="w.title" class="work-row">
              <span class="work-dot"></span>
              <div class="work-info">
                <div class="work-title">{{ w.title }}</div>
                <div class="work-desc">{{ w.desc }}</div>
                <div class="work-status">{{ w.status }}</div>
              </div>
              <div class="work-ring" :style="{ '--pct': w.pct }">
                <svg viewBox="0 0 36 36">
                  <path class="ring-bg" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
                  <path class="ring-fg" :style="{ strokeDasharray: `${w.pct}, 100` }" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
                </svg>
                <span>{{ w.pct }}%</span>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-head">
              <h3>For you <span class="count">{{ forYou.length }}</span></h3>
              <a href="#" class="view-all">View all →</a>
            </div>
            <div v-for="f in forYou" :key="f.text" class="foryou-row">
              <span class="foryou-icon" :style="{ color: f.color }">{{ f.icon }}</span>
              <span class="foryou-text">{{ f.text }}</span>
              <span class="foryou-time">{{ f.time }}</span>
            </div>
          </div>

        </aside>
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
  /* shared accent glow — the ring the prompt bar has in the design,
     reused by the icon buttons and quick-action pills */
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

/* ripple-style hover shimmer */
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

/* animated left-edge glow bar for active item */
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

.sidebar.collapsed .user {
  justify-content: center;
  padding: 8px;
}

.user:hover {
  background: rgba(255, 255, 255, 0.04);
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c62828, #ff8a65);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  color: #fff;
}

.user-name {
  flex: 1;
  color: #d4c5c1;
}

.chev {
  color: #666;
  font-size: 11px;
}

/* Footer toggles */
.footer-toggles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-toggle-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #a08a86;
  font-size: 12.5px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}

.footer-toggles.collapsed .footer-toggle-btn {
  justify-content: center;
  padding: 8px;
}

.footer-toggle-btn svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.footer-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #f0e6e3;
}

.footer-toggle-btn.active {
  color: #ffab9b;
}

.toggle-label {
  flex: 1;
  white-space: nowrap;
}

.toggle-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e0473a;
  box-shadow: 0 0 6px rgba(224, 71, 58, 0.8);
  flex-shrink: 0;
}

/* Main content */
/* the page is locked to the viewport — nothing scrolls, so every vertical
   measurement below is fluid and the orb absorbs whatever space is left */
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

/* rides up on short viewports so the right column can start higher without
   the first panel sliding underneath it */
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

.body-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(250px, 24vw, 350px);
  gap: clamp(12px, 1.5vw, 24px);
  flex: 1;
  min-height: 0;
}

.main-col {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.main-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  /* the orb is pulled up under this row — keep the text and buttons on top */
  position: relative;
  z-index: 1;
}

.greeting {
  font-size: clamp(19px, 2.7vh, 26px);
  font-weight: 600;
  margin: 0 0 2px;
}

.subgreeting {
  color: #907a76;
  font-size: clamp(11.5px, 1.5vh, 13px);
  margin: 0;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.icon-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(224, 71, 58, 0.15);
  background: rgba(224, 71, 58, 0.04);
  color: #d4c5c1;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease,
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 6px rgba(224, 71, 58, 0.08);
}

.icon-btn svg {
  width: 16px;
  height: 16px;
}

.icon-btn:hover {
  color: #fff;
  border-color: rgba(224, 71, 58, 0.8);
  background: rgba(224, 71, 58, 0.2);
  box-shadow: 0 0 0 1px rgba(224, 71, 58, 0.7), 0 0 24px rgba(224, 71, 58, 0.6), 0 0 48px rgba(224, 71, 58, 0.35);
  transform: translateY(-1px);
}

.dot-badge {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e0473a;
  box-shadow: 0 0 6px 1px rgba(224, 71, 58, 0.8);
}

/* Orb — both gifs have their palettes remapped so the artwork's backdrop
   becomes the blend mode's identity value: black under screen (dark), white
   under multiply (light). The backdrop therefore contributes nothing and the
   orb merges into whatever is behind it — page colour, grid pattern — with
   no edge mask and no dependence on --bg. The frame is shown whole and
   uncropped — cropping would cut a hard straight line through the outer
   arcs, and the gif's own padding costs nothing now that it is invisible. */
/* the orb is the flex absorber: it takes whatever height is left once the
   fixed rows are laid out, so the page always fills the viewport exactly.
   object-fit keeps the aspect ratio, and the letterboxing it leaves is
   invisible because the backdrop is transparent. */
.orb-stage {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  /* negative top pulls the orb up toward the greeting without moving it */
  margin: clamp(-52px, -5vh, -30px) auto clamp(4px, 1.2vh, 14px);
}

.orb-gif {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
}

/* Quick actions */
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 0.8vw, 10px);
  margin-bottom: clamp(6px, 1.2vh, 12px);
  flex-shrink: 0;
}

.quick-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid rgba(224, 71, 58, 0.15);
  background: rgba(224, 71, 58, 0.04);
  color: #d4c5c1;
  font-size: 12.5px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(224, 71, 58, 0.08);
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease,
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quick-pill:hover {
  border-color: rgba(224, 71, 58, 0.7);
  background: rgba(224, 71, 58, 0.18);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(224, 71, 58, 0.6), 0 0 20px rgba(224, 71, 58, 0.45), 0 0 40px rgba(224, 71, 58, 0.2);
  transform: translateY(-2px);
}

.quick-pill:active {
  transform: translateY(0);
}

/* Activity */
.activity-section {
  margin-top: 0;
  flex-shrink: 0;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(8px, 0.9vw, 14px);
}

.activity-card {
  background: var(--bg);
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 12px;
  padding: clamp(8px, 1.2vh, 14px) clamp(9px, 0.8vw, 14px);
}

.activity-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 8px;
}

.activity-title {
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 4px;
}

.activity-sub {
  font-size: 12px;
  color: #907a76;
  margin-bottom: 10px;
}

.activity-time {
  font-size: 11px;
  color: #5a4642;
}

/* Section heads */
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(4px, 0.8vh, 8px);
  flex-shrink: 0;
}

.panel-head h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.count {
  background: rgba(224, 71, 58, 0.2);
  color: #ffab9b;
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
}

.view-all {
  font-size: 12px;
  color: #907a76;
}

.view-all:hover {
  color: #ffab9b;
}

/* Right column — the two panels divide the full column height between them
   so no blank page shows below "For you" on tall screens */
.right-col {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.2vh, 12px);
  min-height: 0;
  /* clears the absolutely-positioned BUILD › SHIP › EVOLVE breadcrumb,
     which the first panel was otherwise sitting underneath. Must stay
     ahead of that element's own top + line-height at every viewport. */
  margin-top: clamp(26px, 3.6vh, 34px);
}

/* flex-basis auto (not 0) so panels grow *from their natural height* by an
   equal amount, rather than being forced to equal size — otherwise all the
   slack lands in the short "For you" rows and they look stretched */
.right-col > .panel {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* same reasoning per row: each takes a small, even share of the slack */
.right-col > .panel > .work-row,
.right-col > .panel > .foryou-row {
  flex: 1 1 auto;
  min-height: 0;
}

.right-col > .panel > .work-row {
  max-height: clamp(56px, 8.5vh, 88px);
}

.right-col > .panel > .foryou-row {
  max-height: clamp(32px, 5.5vh, 60px);
}

.panel {
  background: var(--bg);
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 14px;
  padding: clamp(8px, 1.2vh, 12px) clamp(10px, 0.9vw, 14px);
}

.work-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  border-top: 1px solid rgba(224, 71, 58, 0.1);
}

.work-row:first-of-type {
  border-top: none;
}

.work-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid #e0473a;
  flex-shrink: 0;
}

.work-info {
  flex: 1;
  min-width: 0;
}

.work-title {
  font-size: 12.5px;
  font-weight: 600;
}

.work-desc {
  font-size: 11.5px;
  color: #907a76;
  margin-top: 2px;
}

.work-status {
  font-size: 11px;
  color: #6a5550;
  margin-top: 2px;
}

.work-ring {
  position: relative;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
}

.work-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(224, 71, 58, 0.15);
  stroke-width: 3.5;
}

.ring-fg {
  fill: none;
  stroke: #e0473a;
  stroke-width: 3.5;
  stroke-linecap: round;
}

.work-ring span {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: #d4c5c1;
}

.foryou-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  font-size: 12.5px;
}

.foryou-icon {
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

.foryou-text {
  flex: 1;
  color: #d4c5c1;
}

.foryou-time {
  color: #5a4642;
  font-size: 11px;
  flex-shrink: 0;
}

/* Narrow but still desktop-ish: drop the activity row to two up and let the
   orb give back more height, rather than stacking the columns. */
@media (max-width: 1180px) {
  .activity-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Too small to fit a two-column dashboard in one viewport — stack it and
   allow scrolling, since forcing a fit here would make everything unreadable. */
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
  .body-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .orb-stage {
    flex: 0 0 auto;
    aspect-ratio: 1020 / 620;
    margin: -20px auto 8px;
  }
  .right-col {
    margin-top: 0;
  }
  .right-col > .panel {
    flex: 0 0 auto;
  }
  .right-col > .panel > .work-row,
  .right-col > .panel > .foryou-row {
    flex: 0 0 auto;
  }
}

/* Short viewports: the activity strip is the first thing to give */
@media (max-height: 680px) {
  .activity-sub {
    display: none;
  }
  .activity-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
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

/* Sidebar — same warm cream, border separates it */
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

/* light gif's backdrop is pure white, so multiply is the identity there */
.dash.light .orb-gif { mix-blend-mode: multiply; }

.dash.light .side-footer { border-top-color: var(--warm-border); }

.dash.light .footer-toggle-btn { color: #9a7268; }

.dash.light .footer-toggle-btn:hover {
  background: var(--warm-hover);
  color: #2c1810;
}

.dash.light .footer-toggle-btn.active { color: var(--accent); }

.dash.light .side-link.active::before { background: var(--accent); }

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

.dash.light .collapse-btn { color: #9a7268; }

.dash.light .collapse-btn:hover {
  background: var(--warm-hover);
  color: #2c1810;
}

.dash.light .breadcrumb { color: #c0a098; }

.dash.light .sep { color: #d8c0b8; }

.dash.light .greeting { color: #2c1810; }

.dash.light .subgreeting { color: #9a7268; }

/* Icon buttons */
.dash.light .icon-btn {
  border-color: var(--accent-mid);
  background: var(--accent-soft);
  color: #4a2e26;
  box-shadow: 0 0 8px rgba(224, 71, 58, 0.08);
}

.dash.light .icon-btn:hover {
  background: rgba(224, 71, 58, 0.16);
  border-color: rgba(224, 71, 58, 0.5);
  color: var(--accent);
  box-shadow: 0 0 16px rgba(224, 71, 58, 0.22);
}

.dash.light .dot-badge { background: var(--accent); }

/* Quick pills */
.dash.light .quick-pill {
  border-color: var(--accent-mid);
  background: var(--accent-soft);
  color: #4a2e26;
  box-shadow: 0 0 8px rgba(224, 71, 58, 0.08);
}

.dash.light .quick-pill:hover {
  border-color: rgba(224, 71, 58, 0.5);
  background: rgba(224, 71, 58, 0.16);
  color: var(--accent);
  box-shadow: 0 0 16px rgba(224, 71, 58, 0.2);
}

/* Panels — warm white lifted off the cream bg */
.dash.light .panel {
  background: #fff8f4;
  border-color: var(--warm-border);
  box-shadow: 0 1px 6px rgba(160, 90, 70, 0.08);
}

.dash.light .panel-head h3 { color: #2c1810; }

.dash.light .view-all { color: #b09088; }

.dash.light .view-all:hover { color: var(--accent); }

.dash.light .count {
  background: var(--accent-soft);
  color: var(--accent);
}

.dash.light .work-row { border-top-color: var(--warm-border); }

.dash.light .work-dot { border-color: var(--accent); }

.dash.light .work-title { color: #2c1810; }

.dash.light .work-desc { color: #9a7268; }

.dash.light .work-status { color: #b09088; }

.dash.light .ring-bg { stroke: rgba(160, 90, 70, 0.12); }

.dash.light .ring-fg { stroke: var(--accent); }

.dash.light .work-ring span { color: #4a2e26; }

.dash.light .foryou-text { color: #4a2e26; }

.dash.light .foryou-time { color: #b09088; }

/* Activity cards */
.dash.light .activity-card {
  background: #fff8f4;
  border-color: var(--warm-border);
  box-shadow: 0 1px 5px rgba(160, 90, 70, 0.07);
}

.dash.light .activity-title { color: #2c1810; }

.dash.light .activity-sub { color: #9a7268; }

.dash.light .activity-time { color: #b09088; }

/* Profile Sidebar */
.user {
  border: none;
  background: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
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
  color: #f0e6e3;
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

.profile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fade-in 0.25s ease;
}

/* Bottom-left pull-up sheet */
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

/* Content layout for bottom sheet */
.sheet-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Theme buttons row — Dark | Light side by side at top */
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

/* Sheet navigation links */
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


/* Sheet sections */
.sheet-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(224, 71, 58, 0.1);
}

.sheet-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #907a76;
  text-transform: uppercase;
  padding: 0 4px;
}

/* Profile user info */
.profile-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(224, 71, 58, 0.04);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0473a, #c22e2e);
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  color: #f0e6e3;
  line-height: 1.2;
}

/* Sheet items */
.sheet-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 8px;
  color: #d4c5c1;
  font-size: 12px;
  font-weight: 400;
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
}

.sheet-item:hover {
  background: rgba(224, 71, 58, 0.08);
  color: #ffab9b;
}

.sheet-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  stroke-width: 1.5;
}

.badge {
  margin-left: auto;
  color: #e0473a;
  font-size: 10px;
}

/* Theme toggle */
.theme-toggle-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #907a76;
  text-transform: uppercase;
  padding: 0 4px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #d4c5c1;
  font-size: 12px;
}

.toggle-track {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(224, 71, 58, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
}

.toggle-track.active {
  background: rgba(224, 71, 58, 0.25);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: #f0e6e3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  color: #e0473a;
}

.toggle-track.active .toggle-thumb {
  transform: translateX(20px);
}

.toggle-thumb svg {
  width: 12px;
  height: 12px;
}

.toggle-label {
  font-size: 12px;
  font-weight: 400;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Light mode profile sheet */
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
