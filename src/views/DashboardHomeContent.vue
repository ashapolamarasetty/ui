<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { lightMode } = useTheme()

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
</template>

<style scoped>
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

.orb-stage {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  margin: clamp(-52px, -5vh, -30px) auto clamp(4px, 1.2vh, 14px);
}

.orb-gif {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
}

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

.right-col {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.2vh, 12px);
  min-height: 0;
  margin-top: clamp(26px, 3.6vh, 34px);
}

.right-col > .panel {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

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

@media (max-width: 1180px) {
  .activity-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
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

/* Light mode */
:root[data-theme="light"] .greeting { color: #2c1810; }
:root[data-theme="light"] .subgreeting { color: #9a7268; }

:root[data-theme="light"] .icon-btn {
  border-color: rgba(224, 71, 58, 0.22);
  background: rgba(224, 71, 58, 0.1);
  color: #4a2e26;
  box-shadow: 0 0 8px rgba(224, 71, 58, 0.08);
}

:root[data-theme="light"] .icon-btn:hover {
  background: rgba(224, 71, 58, 0.16);
  border-color: rgba(224, 71, 58, 0.5);
  color: var(--accent);
  box-shadow: 0 0 16px rgba(224, 71, 58, 0.22);
}

:root[data-theme="light"] .dot-badge { background: var(--accent); }

:root[data-theme="light"] .orb-gif { mix-blend-mode: multiply; }

:root[data-theme="light"] .quick-pill {
  border-color: rgba(224, 71, 58, 0.22);
  background: rgba(224, 71, 58, 0.1);
  color: #4a2e26;
  box-shadow: 0 0 8px rgba(224, 71, 58, 0.08);
}

:root[data-theme="light"] .quick-pill:hover {
  border-color: rgba(224, 71, 58, 0.5);
  background: rgba(224, 71, 58, 0.16);
  color: var(--accent);
  box-shadow: 0 0 16px rgba(224, 71, 58, 0.2);
}

:root[data-theme="light"] .panel {
  background: #fff8f4;
  border-color: rgba(160, 90, 70, 0.13);
  box-shadow: 0 1px 6px rgba(160, 90, 70, 0.08);
}

:root[data-theme="light"] .panel-head h3 { color: #2c1810; }
:root[data-theme="light"] .view-all { color: #b09088; }
:root[data-theme="light"] .view-all:hover { color: var(--accent); }

:root[data-theme="light"] .count {
  background: rgba(224, 71, 58, 0.1);
  color: var(--accent);
}

:root[data-theme="light"] .work-row { border-top-color: rgba(160, 90, 70, 0.13); }
:root[data-theme="light"] .work-dot { border-color: var(--accent); }
:root[data-theme="light"] .work-title { color: #2c1810; }
:root[data-theme="light"] .work-desc { color: #9a7268; }
:root[data-theme="light"] .work-status { color: #b09088; }
:root[data-theme="light"] .ring-bg { stroke: rgba(160, 90, 70, 0.12); }
:root[data-theme="light"] .ring-fg { stroke: var(--accent); }
:root[data-theme="light"] .work-ring span { color: #4a2e26; }
:root[data-theme="light"] .foryou-text { color: #4a2e26; }
:root[data-theme="light"] .foryou-time { color: #b09088; }

:root[data-theme="light"] .activity-card {
  background: #fff8f4;
  border-color: rgba(160, 90, 70, 0.13);
  box-shadow: 0 1px 5px rgba(160, 90, 70, 0.07);
}

:root[data-theme="light"] .activity-title { color: #2c1810; }
:root[data-theme="light"] .activity-sub { color: #9a7268; }
:root[data-theme="light"] .activity-time { color: #b09088; }
</style>
