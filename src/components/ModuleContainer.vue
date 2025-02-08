<template>
  <v-dialog
    v-model="isExpanded"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template #activator="{ props: dialogProps }">
      <v-hover v-slot="{ isHovering }">
        <v-card
          class="module-card"
          :elevation="isHovering ? 8 : 2"
          :class="{ 'on-hover': isHovering }"
          v-bind="dialogProps"
          tabindex="0"
          @keydown.enter="isExpanded = true"
          @keydown.space.prevent="isExpanded = true"
        >
          <div class="square-content">
            <v-card-item class="text-center fill-height">
              <v-icon
                :size="mobileBreakpoint ? 36 : 48"
                color="primary"
                class="mb-2"
              >
                {{ icon }}
              </v-icon>
              <v-card-title class="text-body-1 text-center d-block">
                {{ title }}
              </v-card-title>
            </v-card-item>
          </div>
        </v-card>
      </v-hover>
    </template>

    <v-card>
      <v-toolbar color="primary">
        <v-btn
          icon
          @click="isExpanded = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <component
          :is="moduleComponent"
          v-if="moduleComponent"
        />
        <slot v-else />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import type { Component } from 'vue'

defineProps<{
  title: string
  icon: string
  moduleComponent?: Component
}>()

const isExpanded = ref(false)
const { mobile: mobileBreakpoint } = useDisplay()
</script>

<style scoped>
.module-card {
  transition: all 0.2s;
}

.square-content {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-card:focus {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.on-hover {
  position: relative;
}

.on-hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: inherit;
  background: rgb(var(--v-theme-primary));
  opacity: 0.08;
  filter: blur(12px);
  transform: translateY(4px);
}
</style>
