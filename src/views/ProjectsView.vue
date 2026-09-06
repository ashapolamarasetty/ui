<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: string
  name: string
  description: string
  status: 'Active' | 'Paused' | 'Archived'
  team: string
  createdAt: string
  progress: number
}

const projects: Project[] = [
  { id: '1', name: 'MNP Modernisation', description: 'Implement retry handling', status: 'Active', team: 'Backend', createdAt: '2026-08-15', progress: 68 },
  { id: '2', name: 'Sanity Portal', description: 'Generate ELK integration', status: 'Active', team: 'Frontend', createdAt: '2026-08-10', progress: 42 },
  { id: '3', name: 'Payments Service', description: 'Refactor authentication', status: 'Active', team: 'Backend', createdAt: '2026-08-05', progress: 15 },
  { id: '4', name: 'Data Platform', description: 'Migrate ingest pipeline', status: 'Paused', team: 'Data', createdAt: '2026-07-28', progress: 55 },
  { id: '5', name: 'Identity Service', description: 'Add SSO provider', status: 'Active', team: 'Backend', createdAt: '2026-07-20', progress: 27 },
  { id: '6', name: 'Cache Layer Optimization', description: 'Implement Redis strategy', status: 'Active', team: 'Infrastructure', createdAt: '2026-07-15', progress: 38 },
  { id: '7', name: 'Analytics Dashboard', description: 'Real-time metrics dashboard', status: 'Active', team: 'Frontend', createdAt: '2026-07-10', progress: 72 },
  { id: '8', name: 'Security Audit', description: 'Complete security review', status: 'Paused', team: 'Security', createdAt: '2026-06-30', progress: 85 },
  { id: '9', name: 'Migration to Kubernetes', description: 'Containerize infrastructure', status: 'Archived', team: 'DevOps', createdAt: '2026-06-15', progress: 100 },
  { id: '10', name: 'API Rate Limiting', description: 'Implement rate limiting', status: 'Active', team: 'Backend', createdAt: '2026-09-01', progress: 22 },
]

const searchQuery = ref('')
const statusFilter = ref<'All' | 'Active' | 'Paused' | 'Archived'>('All')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const sortBy = ref<'name' | 'progress' | 'createdAt'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

const filteredProjects = computed(() => {
  let filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || p.status === statusFilter.value
    return matchesSearch && matchesStatus
  })

  filtered.sort((a, b) => {
    let aVal: any = a[sortBy.value]
    let bVal: any = b[sortBy.value]

    if (sortOrder.value === 'asc') {
      return aVal < bVal ? -1 : 1
    } else {
      return aVal > bVal ? -1 : 1
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage.value))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProjects.value.slice(start, end)
})

const toggleSort = (column: 'name' | 'progress' | 'createdAt') => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return '#4ade80'
    case 'Paused': return '#f59e0b'
    case 'Archived': return '#6b7280'
    default: return '#9ca3af'
  }
}
</script>

<template>
  <div class="projects-container">
    <div class="projects-header">
      <div>
        <h1>Projects</h1>
        <p>Manage and track all your projects</p>
      </div>
      <button class="new-btn">+ New Onboarding</button>
    </div>

    <div class="filters-row">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search projects..." />
      </div>
      <div class="status-filter">
        <select v-model="statusFilter">
          <option>All</option>
          <option>Active</option>
          <option>Paused</option>
          <option>Archived</option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="projects-table">
        <thead>
          <tr>
            <th @click="toggleSort('name')" class="sortable">
              <span>Project Name</span>
              <span v-if="sortBy === 'name'" class="sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Description</th>
            <th>Team</th>
            <th>Status</th>
            <th @click="toggleSort('progress')" class="sortable">
              <span>Progress</span>
              <span v-if="sortBy === 'progress'" class="sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="toggleSort('createdAt')" class="sortable">
              <span>Created</span>
              <span v-if="sortBy === 'createdAt'" class="sort-icon">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in paginatedProjects" :key="project.id" class="project-row">
            <td class="project-name">{{ project.name }}</td>
            <td class="project-desc">{{ project.description }}</td>
            <td class="team">{{ project.team }}</td>
            <td>
              <span class="status-badge" :style="{ backgroundColor: getStatusColor(project.status) + '22', color: getStatusColor(project.status) }">
                {{ project.status }}
              </span>
            </td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
                <span class="progress-text">{{ project.progress }}%</span>
              </div>
            </td>
            <td class="created-date">{{ project.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1" class="page-btn">← Prev</button>
      <div class="page-info">
        Page {{ currentPage }} of {{ totalPages }} ({{ filteredProjects.length }} projects)
      </div>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="page-btn">Next →</button>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: #f0e6e3;
  padding: clamp(16px, 2vh, 24px) clamp(16px, 2vw, 32px);
  gap: 20px;
}

.projects-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
}

.projects-header h1 {
  font-size: clamp(24px, 3vh, 32px);
  font-weight: 700;
  margin: 0 0 4px;
}

.projects-header p {
  font-size: 13px;
  color: #907a76;
  margin: 0;
}

.new-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid rgba(224, 71, 58, 0.3);
  background: rgba(224, 71, 58, 0.15);
  color: #ffab9b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-btn:hover {
  background: rgba(224, 71, 58, 0.25);
  border-color: rgba(224, 71, 58, 0.6);
  box-shadow: 0 0 12px rgba(224, 71, 58, 0.2);
}

.filters-row {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 8px;
}

.search-box svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.6;
}

.search-box input {
  flex: 1;
  background: none;
  border: none;
  color: #f0e6e3;
  font-size: 13px;
  outline: none;
}

.search-box input::placeholder {
  color: #6a5550;
}

.status-filter select {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 8px;
  color: #f0e6e3;
  font-size: 13px;
  cursor: pointer;
}

.status-filter select option {
  background: #16140f;
  color: #f0e6e3;
}

.table-wrapper {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  border: 1px solid rgba(224, 71, 58, 0.12);
  border-radius: 12px;
  background: rgba(224, 71, 58, 0.04);
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.projects-table thead {
  position: sticky;
  top: 0;
  background: rgba(224, 71, 58, 0.08);
  border-bottom: 1px solid rgba(224, 71, 58, 0.12);
}

.projects-table th {
  padding: 12px 14px;
  text-align: left;
  font-weight: 600;
  color: #ffab9b;
  user-select: none;
}

.sortable {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
}

.sortable:hover {
  color: #fff;
}

.sort-icon {
  font-size: 11px;
  opacity: 0.8;
}

.projects-table tbody tr {
  border-bottom: 1px solid rgba(224, 71, 58, 0.08);
  transition: background 0.15s ease;
}

.projects-table tbody tr:hover {
  background: rgba(224, 71, 58, 0.06);
}

.projects-table td {
  padding: 12px 14px;
  color: #d4c5c1;
}

.project-name {
  font-weight: 500;
  color: #f0e6e3;
}

.project-desc {
  font-size: 12px;
  color: #907a76;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.team {
  font-size: 12px;
  color: #907a76;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
}

.progress-fill {
  height: 4px;
  background: linear-gradient(90deg, #e0473a, #ffab9b);
  border-radius: 2px;
  min-width: 20px;
}

.progress-text {
  font-size: 11px;
  color: #907a76;
  min-width: 30px;
  text-align: right;
}

.created-date {
  font-size: 12px;
  color: #6a5550;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-shrink: 0;
  padding: 12px 0;
}

.page-btn {
  padding: 8px 14px;
  background: rgba(224, 71, 58, 0.12);
  border: 1px solid rgba(224, 71, 58, 0.25);
  border-radius: 6px;
  color: #ffab9b;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(224, 71, 58, 0.2);
  border-color: rgba(224, 71, 58, 0.5);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 12px;
  color: #907a76;
}

/* Light mode */
:root[data-theme="light"] .projects-container {
  background: var(--bg);
  color: #2c1810;
}

:root[data-theme="light"] .projects-header h1 {
  color: #2c1810;
}

:root[data-theme="light"] .projects-header p {
  color: #9a7268;
}

:root[data-theme="light"] .new-btn {
  background: rgba(224, 71, 58, 0.08);
  border-color: rgba(160, 90, 70, 0.2);
  color: #c22e2e;
}

:root[data-theme="light"] .new-btn:hover {
  background: rgba(224, 71, 58, 0.15);
  border-color: rgba(224, 71, 58, 0.5);
}

:root[data-theme="light"] .search-box {
  background: rgba(160, 90, 70, 0.04);
  border-color: rgba(160, 90, 70, 0.18);
}

:root[data-theme="light"] .search-box input {
  color: #2c1810;
}

:root[data-theme="light"] .search-box input::placeholder {
  color: #c0a098;
}

:root[data-theme="light"] .status-filter select {
  background: rgba(160, 90, 70, 0.04);
  border-color: rgba(160, 90, 70, 0.18);
  color: #2c1810;
}

:root[data-theme="light"] .status-filter select option {
  background: #f4efe7;
  color: #2c1810;
}

:root[data-theme="light"] .table-wrapper {
  border-color: rgba(160, 90, 70, 0.15);
  background: rgba(160, 90, 70, 0.03);
}

:root[data-theme="light"] .projects-table thead {
  background: rgba(160, 90, 70, 0.08);
  border-bottom-color: rgba(160, 90, 70, 0.15);
}

:root[data-theme="light"] .projects-table th {
  color: #c22e2e;
}

:root[data-theme="light"] .projects-table tbody tr:hover {
  background: rgba(160, 90, 70, 0.06);
}

:root[data-theme="light"] .projects-table td {
  color: #4a2e26;
}

:root[data-theme="light"] .project-name {
  color: #2c1810;
}

:root[data-theme="light"] .project-desc,
:root[data-theme="light"] .team {
  color: #9a7268;
}

:root[data-theme="light"] .progress-text,
:root[data-theme="light"] .page-info {
  color: #b09088;
}

:root[data-theme="light"] .created-date {
  color: #c0a098;
}

:root[data-theme="light"] .page-btn {
  background: rgba(224, 71, 58, 0.08);
  border-color: rgba(224, 71, 58, 0.2);
  color: var(--accent);
}

:root[data-theme="light"] .page-btn:hover:not(:disabled) {
  background: rgba(224, 71, 58, 0.15);
  border-color: rgba(224, 71, 58, 0.4);
}
</style>
