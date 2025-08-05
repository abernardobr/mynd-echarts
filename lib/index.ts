import type { App } from 'vue'
import MyndEcharts from './components/MyndEcharts.vue'

export { MyndEcharts }

// Re-export specific items to avoid conflicts
export * from './types'
export * from './composables'
export { debounce, throttle } from './utils'

// Plugin install function
export default {
  install(app: App) {
    app.component('MyndEcharts', MyndEcharts)
  }
}