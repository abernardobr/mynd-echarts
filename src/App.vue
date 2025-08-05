<template>
  <div id="app">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo">
            <span class="material-icons" style="font-size: 3rem;">bar_chart</span>
          </div>
          <div>
            <h1>mynd-echarts</h1>
            <p>A powerful Vue 3 wrapper for Apache ECharts</p>
          </div>
        </div>
        <nav class="header-nav">
          <button @click="activeView = 'showcase'" :class="{ active: activeView === 'showcase' }">
            <span class="material-icons">palette</span>
            Showcase
          </button>
          <button @click="activeView = 'playground'" :class="{ active: activeView === 'playground' }">
            <span class="material-icons">science</span>
            Playground
          </button>
          <button @click="activeView = 'examples'" :class="{ active: activeView === 'examples' }">
            <span class="material-icons">library_books</span>
            Examples
          </button>
          <button @click="openGitHub" class="github-btn">
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <!-- Showcase View -->
      <div v-if="activeView === 'showcase'" class="showcase-view">
        <div class="showcase-header">
          <h2>Chart Gallery</h2>
          <p>Explore various chart types with live examples</p>
        </div>
        
        <div class="chart-categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="{ active: selectedCategory === category.id }"
            class="category-btn"
          >
            <span class="material-icons">{{ category.icon }}</span>
            {{ category.name }}
          </button>
        </div>

        <div class="showcase-grid">
          <div 
            v-for="chart in filteredCharts" 
            :key="chart.id"
            class="showcase-card"
            @click="selectChart(chart)"
          >
            <div class="chart-preview">
              <MyndEcharts
                :options="chart.options"
                :theme="currentTheme"
                style="height: 200px"
                :key="`${chart.id}-${themeKey}`"
              />
            </div>
            <div class="chart-info">
              <h3>{{ chart.name }}</h3>
              <p>{{ chart.description }}</p>
              <span class="chart-type">{{ chart.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Playground View -->
      <div v-if="activeView === 'playground'" class="playground-view">
        <div class="playground-header">
          <h2>Interactive Playground</h2>
          <p>Build and customize your charts with live preview</p>
        </div>

        <div class="playground-layout">
          <!-- Editor Panel -->
          <div class="editor-panel">
            <div class="editor-toolbar">
              <select v-model="selectedTemplate" @change="loadTemplate" class="template-select">
                <option value="">Choose a template...</option>
                <optgroup v-for="category in chartCategories" :key="category" :label="category">
                  <option v-for="template in getTemplatesByCategory(category)" :key="template.id" :value="template.id">
                    {{ template.name }}
                  </option>
                </optgroup>
              </select>
              <div class="editor-actions">
                <button @click="formatCode" title="Format Code (Ctrl+Shift+F)">
                  <span class="material-icons">code</span>
                  Format
                </button>
                <button @click="copyCode" title="Copy to Clipboard">
                  <span class="material-icons">content_copy</span>
                  Copy
                </button>
                <button @click="downloadOptions" title="Download JSON">
                  <span class="material-icons">download</span>
                  Download
                </button>
                <button @click="clearEditor" title="Clear Editor">
                  <span class="material-icons">clear</span>
                  Clear
                </button>
              </div>
            </div>
            
            <div class="code-editor">
              <textarea
                v-model="editorContent"
                @input="updatePreview"
                placeholder="Paste your ECharts options here..."
                spellcheck="false"
              ></textarea>
              <div v-if="editorError" class="editor-error">
                ❌ {{ editorError }}
              </div>
            </div>
          </div>

          <!-- Preview Panel -->
          <div class="preview-panel" ref="previewPanelRef">
            <div class="preview-toolbar">
              <h3>Preview</h3>
              <div class="preview-actions">
                <button @click="toggleTheme" class="theme-toggle">
                  <span class="material-icons">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
                  {{ isDarkMode ? 'Light' : 'Dark' }}
                </button>
                <button @click="refreshPreview" :disabled="!validOptions">
                  <span class="material-icons">refresh</span>
                  Refresh
                </button>
                <button @click="toggleFullscreen" class="fullscreen-toggle">
                  <span class="material-icons">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
                  {{ isFullscreen ? 'Exit' : 'Fullscreen' }}
                </button>
              </div>
            </div>
            
            <div class="chart-preview-container">
              <MyndEcharts
                v-if="validOptions && previewOptions"
                :options="previewOptions"
                :theme="currentTheme"
                :key="previewKey"
                :auto-resize="true"
                @ready="handleChartReady"
              />
              <div v-else class="empty-preview">
                <span class="material-icons empty-icon">insert_chart</span>
                <p>Enter valid ECharts options to see preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Examples View -->
      <div v-if="activeView === 'examples'" class="examples-view">
        <div class="examples-header">
          <h2>Live Examples</h2>
          <p>Ready-to-use chart configurations with source code</p>
        </div>

        <div class="examples-grid">
          <div v-for="example in advancedExamples" :key="example.id" class="example-card">
            <div class="example-preview">
              <MyndEcharts
                :options="example.options"
                :theme="currentTheme"
                style="height: 300px"
                :key="`${example.id}-${themeKey}`"
              />
            </div>
            <div class="example-info">
              <h3>{{ example.name }}</h3>
              <p>{{ example.description }}</p>
              <div class="example-tags">
                <span v-for="tag in example.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="example-actions">
                <button @click="viewCode(example)" class="action-btn">
                  <span class="material-icons">code</span>
                  View Code
                </button>
                <button @click="useInPlayground(example)" class="action-btn primary">
                  <span class="material-icons">science</span>
                  Try in Playground
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Code Modal -->
    <div v-if="showCodeModal" class="modal-overlay" @click="closeCodeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedExample?.name }} - Source Code</h3>
          <button @click="closeCodeModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <pre><code>{{ formatJson(selectedExample?.options) }}</code></pre>
        </div>
        <div class="modal-footer">
          <button @click="copyExampleCode" class="action-btn">
            <span class="material-icons">content_copy</span>
            Copy Code
          </button>
          <button @click="useSelectedInPlayground" class="action-btn primary">
            <span class="material-icons">science</span>
            Use in Playground
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { MyndEcharts, useChartTheme } from '@lib/index'
import type { EChartsOption } from 'echarts'
import { showcaseCharts, chartCategories, advancedExamples } from './data/demoData'
import { useAppTheme } from './composables/useAppTheme'

// State
const activeView = ref<'showcase' | 'playground' | 'examples'>('showcase')
const selectedCategory = ref('all')
const selectedChart = ref<any>(null)
const selectedTemplate = ref('')
const isFullscreen = ref(false)
const previewPanelRef = ref<HTMLElement>()
const editorContent = ref(JSON.stringify({
  title: {
    text: 'Sample Chart',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Sales',
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    itemStyle: {
      color: '#5470c6'
    }
  }]
}, null, 2))
const editorError = ref('')
const previewOptions = ref<EChartsOption | null>(null)
const validOptions = ref(false)
const previewKey = ref(0)
const showCodeModal = ref(false)
const selectedExample = ref<any>(null)

// Theme management
const { isDarkMode, toggleTheme: toggleAppTheme } = useAppTheme()
const { currentTheme, setTheme } = useChartTheme({
  defaultTheme: isDarkMode.value ? 'dark' : 'light'
})
const themeKey = ref(0)

// Sync app theme with chart theme
watch(isDarkMode, (newValue) => {
  const newTheme = newValue ? 'dark' : 'light'
  setTheme(newTheme)
  themeKey.value++
  previewKey.value++
})

// Categories
const categories = [
  { id: 'all', name: 'All Charts', icon: 'category' },
  { id: 'line', name: 'Line', icon: 'show_chart' },
  { id: 'bar', name: 'Bar', icon: 'bar_chart' },
  { id: 'pie', name: 'Pie', icon: 'pie_chart' },
  { id: 'scatter', name: 'Scatter', icon: 'scatter_plot' },
  { id: 'radar', name: 'Radar', icon: 'radar' },
  { id: 'heatmap', name: 'Heatmap', icon: 'grid_on' },
  { id: 'tree', name: 'Tree', icon: 'account_tree' },
  { id: 'graph', name: 'Graph', icon: 'hub' },
  { id: 'other', name: 'Other', icon: 'auto_awesome' }
]

// Computed
const filteredCharts = computed(() => {
  if (selectedCategory.value === 'all') {
    return showcaseCharts
  }
  return showcaseCharts.filter(chart => chart.category === selectedCategory.value)
})

// Methods
const selectChart = (chart: any) => {
  selectedChart.value = chart
  editorContent.value = JSON.stringify(chart.options, null, 2)
  activeView.value = 'playground'
  updatePreview()
}

const loadTemplate = () => {
  const template = showcaseCharts.find(c => c.id === selectedTemplate.value)
  if (template) {
    editorContent.value = JSON.stringify(template.options, null, 2)
    updatePreview()
  }
}

const updatePreview = () => {
  try {
    if (!editorContent.value.trim()) {
      validOptions.value = false
      editorError.value = ''
      previewOptions.value = null
      return
    }
    
    const parsed = JSON.parse(editorContent.value)
    previewOptions.value = parsed
    validOptions.value = true
    editorError.value = ''
    previewKey.value++
  } catch (e: any) {
    validOptions.value = false
    editorError.value = e.message
    previewOptions.value = null
  }
}

const formatCode = () => {
  try {
    const parsed = JSON.parse(editorContent.value)
    editorContent.value = JSON.stringify(parsed, null, 2)
    updatePreview()
  } catch (e) {
    // Keep content as is if invalid JSON
  }
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(editorContent.value)
    alert('✅ Copied to clipboard!')
  } catch (err) {
    alert('Failed to copy to clipboard')
  }
}

const downloadOptions = () => {
  const blob = new Blob([editorContent.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'echarts-options.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const clearEditor = () => {
  if (confirm('Clear the editor?')) {
    editorContent.value = ''
    previewOptions.value = null
    validOptions.value = false
    selectedTemplate.value = ''
  }
}

const toggleTheme = () => {
  toggleAppTheme()
}

const refreshPreview = () => {
  updatePreview()
}

const handleChartReady = (instance: any) => {
  // Force a resize to ensure chart renders properly
  setTimeout(() => {
    instance.resize()
  }, 100)
}

const viewCode = (example: any) => {
  selectedExample.value = example
  showCodeModal.value = true
}

const closeCodeModal = () => {
  showCodeModal.value = false
}

const copyExampleCode = async () => {
  const code = JSON.stringify(selectedExample.value.options, null, 2)
  try {
    await navigator.clipboard.writeText(code)
    alert('✅ Copied to clipboard!')
  } catch (err) {
    alert('Failed to copy to clipboard')
  }
}

const useInPlayground = (example: any) => {
  editorContent.value = JSON.stringify(example.options, null, 2)
  activeView.value = 'playground'
  updatePreview()
}

const useSelectedInPlayground = () => {
  useInPlayground(selectedExample.value)
  closeCodeModal()
}

const formatJson = (obj: any) => {
  return JSON.stringify(obj, null, 2)
}

const getTemplatesByCategory = (category: string) => {
  return showcaseCharts.filter(c => c.category === category)
}

const openGitHub = () => {
  window.open('https://github.com/yourusername/mynd-echarts', '_blank')
}

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    if (previewPanelRef.value) {
      try {
        await previewPanelRef.value.requestFullscreen()
        isFullscreen.value = true
      } catch (err) {
        console.error('Error attempting to enter fullscreen:', err)
      }
    }
  } else {
    try {
      await document.exitFullscreen()
      isFullscreen.value = false
    } catch (err) {
      console.error('Error attempting to exit fullscreen:', err)
    }
  }
}

// Listen for fullscreen changes
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// Initialize
watch(() => currentTheme.value, () => {
  themeKey.value++
})

// Initialize preview on mount
onMounted(() => {
  updatePreview()
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* CSS Variables for theming */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f5f6fa;
  --text-primary: #2c3e50;
  --text-secondary: #718096;
  --text-tertiary: #a0aec0;
  --border-color: #e9ecef;
  --border-light: #e2e8f0;
  --shadow: 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 4px 12px rgba(0,0,0,0.15);
}

:global(.dark) {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --bg-tertiary: #374151;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --text-tertiary: #cbd5e0;
  --border-color: #4a5568;
  --border-light: #2d3748;
  --shadow: 0 2px 4px rgba(0,0,0,0.2);
  --shadow-lg: 0 4px 12px rgba(0,0,0,0.3);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Header Styles */
.app-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-size: 3rem;
  line-height: 1;
}

.logo-section h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.logo-section p {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.header-nav {
  display: flex;
  gap: 0.5rem;
}

.header-nav button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.header-nav button .material-icons {
  font-size: 1.125rem;
}

.header-nav button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.header-nav button.active {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.github-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem !important;
  background: #24292e !important;
  color: white !important;
}

.github-btn:hover {
  background: #1a1e22 !important;
}

/* Main Content */
.app-main {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

/* Showcase View */
.showcase-header {
  text-align: center;
  margin-bottom: 3rem;
}

.showcase-header h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.showcase-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.chart-categories {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-light);
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.category-btn .material-icons {
  font-size: 1rem;
}

.category-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
}

.category-btn.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.showcase-card {
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.2s;
}

.showcase-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.chart-preview {
  padding: 1rem;
  background: var(--bg-secondary);
}

.chart-info {
  padding: 1.25rem;
}

.chart-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.chart-info p {
  margin: 0 0 0.75rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.chart-type {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

/* Playground View */
.playground-header {
  text-align: center;
  margin-bottom: 2rem;
}

.playground-header h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.playground-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.playground-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  height: calc(100vh - 300px);
  min-height: 600px;
}

.editor-panel,
.preview-panel {
  background: var(--bg-primary);
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-toolbar,
.preview-toolbar {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--bg-primary);
  cursor: pointer;
}

.editor-actions,
.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.editor-actions button,
.preview-actions button {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.editor-actions button .material-icons,
.preview-actions button .material-icons {
  font-size: 1rem;
}

.editor-actions button:hover,
.preview-actions button:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
}

.theme-toggle {
  background: #4299e1 !important;
  color: white !important;
  border-color: #4299e1 !important;
}

.theme-toggle:hover {
  background: #3182ce !important;
}

.code-editor {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.code-editor textarea {
  flex: 1;
  padding: 1rem;
  border: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.editor-error {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  background: #fed7d7;
  color: #c53030;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.preview-toolbar h3 {
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.chart-preview-container {
  flex: 1;
  padding: 1rem;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

/* Ensure MyndEcharts takes full space */
.chart-preview-container > div:first-child {
  flex: 1;
  width: 100%;
  min-height: 400px;
}

.empty-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--text-tertiary);
}

/* Fullscreen styles */
.preview-panel:fullscreen {
  background: var(--bg-primary);
  padding: 0;
}

.preview-panel:fullscreen .preview-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-primary);
  box-shadow: var(--shadow);
}

.preview-panel:fullscreen .chart-preview-container {
  height: calc(100vh - 60px);
}

.fullscreen-toggle {
  background: #805ad5 !important;
  color: white !important;
  border-color: #805ad5 !important;
}

.fullscreen-toggle:hover {
  background: #6b46c1 !important;
}

/* Examples View */
.examples-header {
  text-align: center;
  margin-bottom: 3rem;
}

.examples-header h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.examples-header p {
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.example-card {
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.example-preview {
  padding: 1.5rem;
  background: var(--bg-secondary);
}

.example-info {
  padding: 1.5rem;
}

.example-info h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.example-info p {
  margin: 0 0 1rem 0;
  color: #718096;
  line-height: 1.6;
}

.example-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e6fffa;
  color: #047857;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

.example-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-btn .material-icons {
  font-size: 1rem;
}

.action-btn:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.action-btn.primary {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.action-btn.primary:hover {
  background: #3182ce;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  color: #718096;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f7fafc;
}

.modal-body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.modal-body pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #2d3748;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 1024px) {
  .playground-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .editor-panel,
  .preview-panel {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .showcase-grid,
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .app-main {
    padding: 1rem;
  }
}

/* Material Icons global styles */
.material-icons {
  vertical-align: middle;
  line-height: 1;
}
</style>