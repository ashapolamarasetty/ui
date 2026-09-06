import { ref, watch } from 'vue'

const lightMode = ref(false)
let initialized = false

export function useTheme() {
  if (!initialized) {
    initialized = true
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : document.documentElement.getAttribute('data-theme') === 'dark'
    lightMode.value = !isDark
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

    watch(lightMode, (isLight) => {
      const theme = isLight ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', theme)
      try { localStorage.setItem('theme', theme) } catch {}
    })
  }

  return { lightMode }
}
