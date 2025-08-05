# mynd-echarts

A full-featured Vue 3 wrapper for Apache ECharts with TypeScript support

## Features

- 🚀 Vue 3 Composition API with `<script setup>`
- 📦 Full TypeScript support
- 🎨 All ECharts chart types supported
- 🔧 Auto-resize functionality
- 🎯 Event handling
- 🌈 Theme support
- ⚡ Optimized performance

## Installation

```bash
npm install mynd-echarts echarts
```

## Quick Start

```vue
<template>
  <MyndEcharts :options="chartOptions" style="height: 400px" />
</template>

<script setup lang="ts">
import { MyndEcharts } from 'mynd-echarts'
import type { EChartsOption } from 'echarts'

const chartOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
}
</script>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Run tests
npm run test
```

## License

MIT