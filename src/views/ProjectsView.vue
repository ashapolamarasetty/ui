<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import EasyDataTable from 'vue3-easy-data-table'
import type { Header, ServerOptions } from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

interface Project {
  id: string
  name: string
  description: string
  status: 'Active' | 'Paused' | 'Archived'
  type: 'Design' | 'Code'
  team: string
  createdAt: string
  progress: number
}

const projects: Project[] = [
  { id: '1', name: 'MNP Modernisation', description: 'Implement retry handling', status: 'Active', type: 'Code', team: 'Backend', createdAt: '2026-08-15', progress: 68 },
  { id: '2', name: 'Sanity Portal', description: 'Generate ELK integration', status: 'Active', type: 'Design', team: 'Frontend', createdAt: '2026-08-10', progress: 42 },
  { id: '3', name: 'Payments Service', description: 'Refactor authentication', status: 'Active', type: 'Code', team: 'Backend', createdAt: '2026-08-05', progress: 15 },
  { id: '4', name: 'Data Platform', description: 'Migrate ingest pipeline', status: 'Paused', type: 'Code', team: 'Data', createdAt: '2026-07-28', progress: 55 },
  { id: '5', name: 'Identity Service', description: 'Add SSO provider', status: 'Active', type: 'Code', team: 'Backend', createdAt: '2026-07-20', progress: 27 },
  { id: '6', name: 'Cache Layer Optimization', description: 'Implement Redis strategy', status: 'Active', type: 'Code', team: 'Infrastructure', createdAt: '2026-07-15', progress: 38 },
  { id: '7', name: 'Analytics Dashboard', description: 'Real-time metrics dashboard', status: 'Active', type: 'Design', team: 'Frontend', createdAt: '2026-07-10', progress: 72 },
  { id: '8', name: 'Security Audit', description: 'Complete security review', status: 'Paused', type: 'Design', team: 'Security', createdAt: '2026-06-30', progress: 85 },
  { id: '9', name: 'Migration to Kubernetes', description: 'Containerize infrastructure', status: 'Archived', type: 'Code', team: 'DevOps', createdAt: '2026-06-15', progress: 100 },
  { id: '10', name: 'API Rate Limiting', description: 'Implement rate limiting', status: 'Active', type: 'Code', team: 'Backend', createdAt: '2026-09-01', progress: 22 },
]

const headers: Header[] = [
  { text: 'PROJECT NAME', value: 'name', sortable: true },
  { text: 'DESCRIPTION', value: 'description' },
  { text: 'TYPE', value: 'type' },
  { text: 'TEAM', value: 'team' },
  { text: 'STATUS', value: 'status' },
  { text: 'PROGRESS', value: 'progress', sortable: true },
  { text: 'CREATED', value: 'createdAt', sortable: true },
]

const searchQuery = ref('')
const statusFilter = ref<'All' | 'Active' | 'Paused' | 'Archived'>('All')
const statuses: Array<'All' | 'Active' | 'Paused' | 'Archived'> = ['All', 'Active', 'Paused', 'Archived']

const typeFilter = ref<'All' | 'Design' | 'Code'>('All')
const types: Array<'All' | 'Design' | 'Code'> = ['All', 'Design', 'Code']
const typeIndex = computed(() => types.indexOf(typeFilter.value))

const serverOptions = ref<ServerOptions>({ page: 1, rowsPerPage: 6, sortBy: 'name', sortType: 'asc' })

const filteredSorted = computed(() => {
  const q = searchQuery.value.toLowerCase()
  let list = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    const matchesStatus = statusFilter.value === 'All' || p.status === statusFilter.value
    const matchesType = typeFilter.value === 'All' || p.type === typeFilter.value
    return matchesSearch && matchesStatus && matchesType
  })

  const { sortBy, sortType } = serverOptions.value
  if (sortBy && typeof sortBy === 'string') {
    const key = sortBy as keyof Project
    list = [...list].sort((a, b) => {
      const av: any = a[key]
      const bv: any = b[key]
      if (av < bv) return sortType === 'desc' ? 1 : -1
      if (av > bv) return sortType === 'desc' ? -1 : 1
      return 0
    })
  }
  return list
})

const totalCount = computed(() => filteredSorted.value.length)

const pagedItems = computed(() => {
  const { page, rowsPerPage } = serverOptions.value
  const start = (page - 1) * rowsPerPage
  return filteredSorted.value.slice(start, start + rowsPerPage)
})

const tableKey = computed(() =>
  `${serverOptions.value.page}-${serverOptions.value.sortBy}-${serverOptions.value.sortType}-${searchQuery.value}-${statusFilter.value}-${typeFilter.value}`
)

watch([searchQuery, statusFilter, typeFilter], () => {
  serverOptions.value = { ...serverOptions.value, page: 1 }
})

const setStatusFilter = (s: typeof statusFilter.value) => {
  statusFilter.value = s
}
</script>

<template>
  <div class="projects-page">
    <!-- Section 1: Heading -->
    <section class="page-header">
      <div>
        <h1 class="greeting">
          Projects
          <Transition name="count-pop" mode="out-in">
            <span class="count-badge" :key="totalCount">{{ totalCount }}</span>
          </Transition>
        </h1>
        <p class="subgreeting">Manage and track all your projects</p>
      </div>
      <button class="new-onboarding-btn">
        <span class="btn-shimmer"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span class="btn-text">New Onboarding</span>
      </button>
    </section>

    <!-- Section 2: Table with tabs + filters -->
    <section class="table-section panel">
      <div class="type-tabs">
        <button
          v-for="t in types"
          :key="t"
          class="type-tab"
          :class="{ active: typeFilter === t }"
          @click="typeFilter = t">
          {{ t }}
        </button>
        <div class="tab-indicator" :style="{ transform: `translateX(${typeIndex * 100}%)`, width: `${100 / types.length}%` }"></div>
      </div>

      <div class="filters-row">
        <div class="status-pills">
          <button
            v-for="s in statuses"
            :key="s"
            class="status-pill"
            :class="{ active: statusFilter === s }"
            @click="setStatusFilter(s)">
            {{ s }}
          </button>
        </div>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search projects..." />
        </div>
      </div>

      <div class="table-wrap">
        <EasyDataTable
          :key="tableKey"
          :headers="headers"
          :items="pagedItems"
          :server-items-length="totalCount"
          v-model:server-options="serverOptions"
          theme-color="#e0473a"
          table-class-name="atlas-table"
          hide-rows-per-page
          empty-message="No projects match your filters.">
          <template #item-type="item">
            <span class="type-badge" :class="`type-${item.type.toLowerCase()}`">
              <svg v-if="item.type === 'Design'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="17" r="2"/><circle cx="6" cy="12" r="3"/><path d="M9 10.5l2.5-2M8 13.5l9 2.5"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
              {{ item.type }}
            </span>
          </template>
          <template #item-status="item">
            <span class="status-badge" :class="`status-${item.status.toLowerCase()}`">{{ item.status }}</span>
          </template>
          <template #item-progress="item">
            <div class="progress-cell">
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: item.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ item.progress }}%</span>
            </div>
          </template>
        </EasyDataTable>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: clamp(14px, 2vh, 22px);
}

@keyframes slide-fade-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Section 1: Heading */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  margin-top: clamp(24px, 3.2vh, 32px);
  animation: slide-fade-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.greeting {
  font-size: clamp(19px, 2.7vh, 26px);
  font-weight: 600;
  margin: 0 0 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 22px;
  padding: 0 7px;
  border-radius: 999px;
  background: rgba(224, 71, 58, 0.18);
  color: #ffab9b;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(224, 71, 58, 0.15);
}

.count-pop-enter-active {
  animation: count-pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes count-pop-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

.subgreeting {
  color: #907a76;
  font-size: clamp(11.5px, 1.5vh, 13px);
  margin: 0;
}

.new-onboarding-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid rgba(224, 71, 58, 0.3);
  background: rgba(224, 71, 58, 0.15);
  color: #ffab9b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(224, 71, 58, 0.1);
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease,
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}

.btn-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: shimmer-sweep 3.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer-sweep {
  0%, 40% { transform: translateX(-100%); }
  60%, 100% { transform: translateX(100%); }
}

.new-onboarding-btn svg {
  width: 15px;
  height: 15px;
  position: relative;
  z-index: 1;
}

.btn-text {
  position: relative;
  z-index: 1;
}

.new-onboarding-btn:hover {
  border-color: rgba(224, 71, 58, 0.7);
  background: rgba(224, 71, 58, 0.28);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(224, 71, 58, 0.6), 0 0 20px rgba(224, 71, 58, 0.45), 0 0 40px rgba(224, 71, 58, 0.2);
  transform: translateY(-2px);
}

.new-onboarding-btn:active {
  transform: translateY(0);
}

/* Section 2: Table panel */
.table-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  animation: slide-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;

  /* vue3-easy-data-table theming to match Atlas palette */
  --easy-table-border: none;
  --easy-table-row-border: 1px solid rgba(224, 71, 58, 0.1);

  --easy-table-header-font-size: 11px;
  --easy-table-header-height: 42px;
  --easy-table-header-background-color: transparent;
  --easy-table-header-font-color: #907a76;
  --easy-table-header-item-padding: 10px 14px;

  --easy-table-body-row-height: 54px;
  --easy-table-body-row-font-size: 12.5px;
  --easy-table-body-row-background-color: transparent;
  --easy-table-body-row-font-color: #d4c5c1;
  --easy-table-body-row-hover-background-color: rgba(224, 71, 58, 0.06);
  --easy-table-body-row-hover-font-color: #f0e6e3;
  --easy-table-body-item-padding: 10px 14px;

  --easy-table-footer-background-color: transparent;
  --easy-table-footer-font-color: #907a76;
  --easy-table-footer-font-size: 11.5px;
  --easy-table-footer-height: 52px;
  --easy-table-footer-padding: 0 4px;

  --easy-table-scrollbar-track-color: transparent;
  --easy-table-scrollbar-thumb-color: rgba(224, 71, 58, 0.25);
  --easy-table-scrollbar-corner-color: transparent;
}

.panel {
  background: var(--bg);
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 14px;
}

/* Type tabs with sliding underline indicator */
.type-tabs {
  position: relative;
  display: flex;
  border-bottom: 1px solid rgba(224, 71, 58, 0.12);
  flex-shrink: 0;
}

.type-tab {
  flex: 1;
  max-width: 120px;
  padding: 10px 4px 12px;
  background: none;
  border: none;
  color: #907a76;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: color 0.2s ease;
}

.type-tab:hover {
  color: #d4c5c1;
}

.type-tab.active {
  color: #ffab9b;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  max-width: 120px;
  height: 2px;
  background: linear-gradient(90deg, #e0473a, #ffab9b);
  border-radius: 2px 2px 0 0;
  box-shadow: 0 0 8px rgba(224, 71, 58, 0.5);
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Type badges (Design / Code) */
.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.type-badge svg {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}

.type-design {
  background: rgba(168, 85, 247, 0.14);
  color: #c084fc;
}

.type-code {
  background: rgba(96, 165, 250, 0.14);
  color: #60a5fa;
}

/* Filters row — moved to the right */
.filters-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.status-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.status-pill {
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid rgba(224, 71, 58, 0.15);
  background: rgba(224, 71, 58, 0.04);
  color: #a08a86;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-pill:hover {
  border-color: rgba(224, 71, 58, 0.4);
  color: #f0e6e3;
}

.status-pill.active {
  background: rgba(224, 71, 58, 0.2);
  border-color: rgba(224, 71, 58, 0.55);
  color: #ffab9b;
  box-shadow: 0 0 10px rgba(224, 71, 58, 0.18);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 13px;
  width: 220px;
  border-radius: 999px;
  border: 1px solid rgba(224, 71, 58, 0.15);
  background: rgba(224, 71, 58, 0.04);
  box-shadow: 0 0 6px rgba(224, 71, 58, 0.08);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box:focus-within {
  border-color: rgba(224, 71, 58, 0.5);
  box-shadow: 0 0 0 1px rgba(224, 71, 58, 0.35), 0 0 16px rgba(224, 71, 58, 0.2);
}

.search-box svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #907a76;
}

.search-box input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #f0e6e3;
  font-size: 12px;
  min-width: 0;
}

.search-box input::placeholder {
  color: #6a5550;
}

/* Table animation wrapper */
.table-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.status-active {
  background: rgba(74, 222, 128, 0.14);
  color: #4ade80;
}

.status-paused {
  background: rgba(245, 158, 11, 0.14);
  color: #f59e0b;
}

.status-archived {
  background: rgba(148, 163, 184, 0.14);
  color: #94a3b8;
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
}

/* Progress bar */
.progress-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 120px;
}

.progress-track {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: rgba(224, 71, 58, 0.12);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #e0473a, #ffab9b);
  animation: fill-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-origin: left;
}

@keyframes fill-in {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.progress-text {
  font-size: 11px;
  color: #907a76;
  min-width: 30px;
  text-align: right;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .filters-row {
    justify-content: flex-start;
  }
}

/* ── Row entrance animation (retriggered via :key on table change) ── */
@keyframes row-slide-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

:deep(.vue3-easy-data-table__body tr) {
  animation: row-slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: background-color 0.2s ease;
}

:deep(.vue3-easy-data-table__body tr:nth-child(1)) { animation-delay: 0.02s; }
:deep(.vue3-easy-data-table__body tr:nth-child(2)) { animation-delay: 0.06s; }
:deep(.vue3-easy-data-table__body tr:nth-child(3)) { animation-delay: 0.1s; }
:deep(.vue3-easy-data-table__body tr:nth-child(4)) { animation-delay: 0.14s; }
:deep(.vue3-easy-data-table__body tr:nth-child(5)) { animation-delay: 0.18s; }
:deep(.vue3-easy-data-table__body tr:nth-child(6)) { animation-delay: 0.22s; }

:deep(.vue3-easy-data-table__header th) {
  font-weight: 600;
  letter-spacing: 0.04em;
}

:deep(.vue3-easy-data-table__header th.sortable) {
  transition: color 0.15s ease;
}

:deep(.vue3-easy-data-table__header th.sortable:hover) {
  color: #ffab9b;
}

:deep(.vue3-easy-data-table__header th.sortable:not(.none) .sortType-icon) {
  border-bottom-color: #e0473a !important;
}

:deep(.previous-page__click-button .arrow),
:deep(.next-page__click-button .arrow) {
  border-top-color: #907a76;
  border-left-color: #907a76;
  transition: border-color 0.2s ease;
}

:deep(.previous-page__click-button:hover .arrow),
:deep(.next-page__click-button:hover .arrow) {
  border-top-color: #ffab9b;
  border-left-color: #ffab9b;
}

:deep(.vue3-easy-data-table__message) {
  color: #6a5550;
}

/* Light mode */
:root[data-theme="light"] .greeting { color: #2c1810; }
:root[data-theme="light"] .subgreeting { color: #9a7268; }

:root[data-theme="light"] .new-onboarding-btn {
  background: rgba(224, 71, 58, 0.1);
  border-color: rgba(224, 71, 58, 0.22);
  color: var(--accent);
}

:root[data-theme="light"] .new-onboarding-btn:hover {
  background-color: var(--accent);
  border-color: rgba(224, 71, 58, 0.5);
  color: #fff;
}

:root[data-theme="light"] .panel {
  background: #fff8f4;
  border-color: rgba(160, 90, 70, 0.13);
  box-shadow: 0 1px 6px rgba(160, 90, 70, 0.08);
}

:root[data-theme="light"] .count-badge {
  background: rgba(224, 71, 58, 0.12);
  color: var(--accent);
}

:root[data-theme="light"] .type-tabs {
  border-bottom-color: rgba(160, 90, 70, 0.15);
}

:root[data-theme="light"] .type-tab {
  color: #9a7268;
}

:root[data-theme="light"] .type-tab:hover {
  color: #4a2e26;
}

:root[data-theme="light"] .type-tab.active {
  color: var(--accent);
}

:root[data-theme="light"] .table-section {
  --easy-table-row-border: 1px solid rgba(160, 90, 70, 0.12);
  --easy-table-header-font-color: #9a7268;
  --easy-table-body-row-font-color: #4a2e26;
  --easy-table-body-row-hover-background-color: rgba(160, 90, 70, 0.06);
  --easy-table-body-row-hover-font-color: #2c1810;
  --easy-table-footer-font-color: #b09088;
  --easy-table-scrollbar-thumb-color: rgba(160, 90, 70, 0.25);
}

:root[data-theme="light"] .status-pill {
  border-color: rgba(160, 90, 70, 0.18);
  background: rgba(160, 90, 70, 0.04);
  color: #9a7268;
}

:root[data-theme="light"] .status-pill:hover {
  border-color: rgba(160, 90, 70, 0.4);
  color: #2c1810;
}

:root[data-theme="light"] .status-pill.active {
  background: rgba(224, 71, 58, 0.12);
  border-color: rgba(224, 71, 58, 0.5);
  color: var(--accent);
}

:root[data-theme="light"] .search-box {
  border-color: rgba(160, 90, 70, 0.18);
  background: rgba(160, 90, 70, 0.04);
}

:root[data-theme="light"] .search-box:focus-within {
  border-color: rgba(224, 71, 58, 0.4);
}

:root[data-theme="light"] .search-box svg { color: #9a7268; }
:root[data-theme="light"] .search-box input { color: #2c1810; }
:root[data-theme="light"] .search-box input::placeholder { color: #c0a098; }

:root[data-theme="light"] .progress-track { background: rgba(160, 90, 70, 0.14); }

:root[data-theme="light"] :deep(.vue3-easy-data-table__header th.sortable:hover) {
  color: var(--accent);
}

:root[data-theme="light"] :deep(.previous-page__click-button .arrow),
:root[data-theme="light"] :deep(.next-page__click-button .arrow) {
  border-top-color: #b09088;
  border-left-color: #b09088;
}

:root[data-theme="light"] :deep(.previous-page__click-button:hover .arrow),
:root[data-theme="light"] :deep(.next-page__click-button:hover .arrow) {
  border-top-color: var(--accent);
  border-left-color: var(--accent);
}
</style>
