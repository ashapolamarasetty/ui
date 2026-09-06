<script setup lang="ts"></script>

<template>
  <section class="cta">
    <div class="container cta-inner">
      <h2 class="cta-title">Ready to build the software of the future?</h2>
      <a href="#" class="btn btn-light">Start Building</a>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--dark-bg);
  color: var(--dark-fg);
  padding: 88px 0;
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
}

.cta-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  max-width: 520px;
}
</style>
