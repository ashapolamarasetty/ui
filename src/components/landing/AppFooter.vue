<script setup lang="ts">
const columns = [
  { title: 'Resources', links: ['News', 'Articles', 'Case Studies', 'Docs', 'Open Source'] },
  { title: 'Company', links: ['Careers', 'Enterprise', 'Security', 'Partners'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'SLA', 'DPA'] },
]
const socials = ['X', 'LinkedIn', 'GitHub']
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <a href="#" class="logo">
          <span class="logo-mark">C</span>
          Company
        </a>

        <div class="columns">
          <div v-for="col in columns" :key="col.title" class="column">
            <p class="column-title">{{ col.title }}</p>
            <a v-for="link in col.links" :key="link" href="#" class="column-link">{{ link }}</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© Company 2026. All rights reserved.</span>
        <div class="socials">
          <a v-for="social in socials" :key="social" href="#">{{ social }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--dark-bg);
  color: var(--dark-muted);
  border-top: 1px solid var(--dark-border);
  padding: 64px 0 32px;
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-fg);
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--dark-fg);
  color: var(--dark-bg);
  font-size: 13px;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.column-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--dark-fg);
  margin-bottom: 4px;
}

.column-link {
  font-size: 13px;
  color: var(--dark-muted);
}

.column-link:hover {
  color: var(--dark-fg);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--dark-border);
  font-size: 13px;
}

.socials {
  display: flex;
  gap: 20px;
}

.socials a:hover {
  color: var(--dark-fg);
}

@media (min-width: 640px) {
  .footer-top {
    flex-direction: row;
    justify-content: space-between;
  }

  .columns {
    grid-template-columns: repeat(3, 1fr);
    gap: 64px;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
