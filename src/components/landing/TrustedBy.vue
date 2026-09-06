<script setup lang="ts">
const logos = ['Northwind', 'Vertex', 'Halo', 'Fathom', 'Nimbus', 'Acme']
</script>

<template>
  <section class="trusted">
    <div class="container">
      <p class="label">Trusted by leading engineering teams</p>
      <div class="logo-row">
        <span v-for="logo in logos" :key="logo" class="logo">{{ logo }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trusted {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.label {
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 28px;
}

.logo-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  row-gap: 20px;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--muted);
  opacity: 0.6;
  transition: opacity 0.15s ease;
}

.logo:hover {
  opacity: 1;
  color: var(--fg);
}
</style>
