<template>

  <div class="info-panel">
    <template v-if="selected">
      <div class="name">{{ name }}</div>
      <div>ID: {{ selected.id }}</div>
      <div>Координаты: {{ Math.round(selected.x) }}, {{ Math.round(selected.y) }}</div>
      <template v-if="unit">
        <div>Скорость: {{ UNIT_TYPES[unit.type].speedPxPerSecond }}</div>
        <div>{{ unit.target ? 'Идёт' : 'Стоит' }}</div>
      </template>
    </template>
    <template v-else>
      <div>ЛКМ — выбрать</div>
      <div>ПКМ — идти</div>
      <div>Курсор к краю экрана — камера</div>
    </template>
  </div>

</template>

<script setup lang="ts">

import { computed } from 'vue'
import { OBJECT_TYPES, UNIT_TYPES } from '@/game/config'
import type { StaticObject, Unit } from '@/game/types'

const props = defineProps<{
  selected: StaticObject | Unit | null
}>()

const unit = computed(() => {
  const selectedObject = props.selected
  if (!selectedObject) {
    return null
  }
  // есть property target есть - значит это юнит
  if ('target' in selectedObject) {
    return selectedObject
  }
  return null
})

// определяем имя объекта для отображения
const name = computed(() => {
  if (unit.value) {
    return UNIT_TYPES[unit.value.type].name
  }
  if (props.selected) {
    return OBJECT_TYPES[props.selected.type].name
  }
  return ''
})
</script>


<style scoped>

.info-panel {
  position: absolute;
  left: 30px;
  bottom: 30px;
  min-width: 200px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 6px;
  pointer-events: none;
}

.name {
  font-weight: bold;
}

</style>
