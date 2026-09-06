<script setup lang="ts">
const features = [
  {
    title: 'Autonomous agents',
    description: 'Delegate entire tickets. Company plans, writes, tests, and opens the PR.',
  },
  {
    title: 'Enterprise-grade security',
    description: 'SOC 2 Type II, SSO, and full audit trails on every action an agent takes.',
  },
  {
    title: 'Built for scale',
    description: 'Run hundreds of agents in parallel across every repo your org owns.',
  },
]
</script>

<template>
  <section class="features">
    <div class="container grid">
      <div v-for="feature in features" :key="feature.title" class="card">
        <h3 class="card-title">{{ feature.title }}</h3>
        <p class="card-copy">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 96px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 28px;
  background: var(--surface);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
}

.card-copy {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
