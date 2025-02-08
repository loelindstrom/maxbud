<template>
  <v-container>
    <h1>Dina utgiftsmoduler</h1>

    <v-text-field
      variant="outlined"
      density="comfortable"
      placeholder="Sök..."
      prepend-inner-icon="mdi-magnify"
      class="mb-4"
    />

    <v-row>
      <v-col
        v-for="module in modules"
        :key="module.title"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <ModuleContainer
          :title="module.title"
          :icon="module.icon"
          :module-component="module.component"
        >
          <div
            v-if="!module.component"
            class="text-h2 pa-12"
          >
            {{ module.title }} Content
          </div>
        </ModuleContainer>
      </v-col>

      <!-- Add new module button -->
      <v-col
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <v-hover v-slot="{ isHovering }">
          <v-card
            class="module-card d-flex align-center justify-center"
            :elevation="isHovering ? 8 : 2"
            :class="{ 'on-hover': isHovering }"
            tabindex="0"
            height="100%"
            @keydown.enter="showNewModuleDialog"
            @keydown.space.prevent="showNewModuleDialog"
            @click="showNewModuleDialog"
          >
            <div class="square-content">
              <v-icon
                size="48"
                color="primary"
              >
                mdi-plus
              </v-icon>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <NewModulePrompt
      ref="newModulePrompt"
      @create="createNewModule"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ModuleContainer from '@/components/ModuleContainer.vue'
import NewModulePrompt from '@/components/NewModulePrompt.vue'
import HouseModule from '@/components/HouseModule.vue'

const modules = ref([
  {
    title: 'Bostad',
    icon: 'mdi-home-outline',
    component: HouseModule
  },
  {
    title: 'Mina utgifter',
    icon: 'mdi-card-account-details-outline'
  },
  {
    title: 'Kött och fisk',
    icon: 'mdi-food-fork-drink'
  }
])

const newModulePrompt = ref()

const showNewModuleDialog = () => {
  newModulePrompt.value.dialog = true
}

const createNewModule = (newModule: { title: string; icon: string }) => {
  modules.value.push(newModule)
}
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
