<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Skapa ny modul</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="newModule.title"
            label="Modulnamn"
            required
          />

          <v-combobox
            v-model="selectedIcon"
            :items="commonIcons"
            label="Välj ikon"
            required
          >
            <template #item="{ props, item }">
              <v-list-item v-bind="props">
                <template #prepend>
                  <v-icon :icon="item.raw" />
                </template>
                <v-list-item-title>{{ item.raw }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-combobox>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="dialog = false"
        >
          Avbryt
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :disabled="!isValid"
          @click="createModule"
        >
          Skapa
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const dialog = ref(false)
const selectedIcon = ref('')
const newModule = ref({
  title: '',
  icon: ''
})

// Common MDI icons - add more as needed
const commonIcons = [
  'mdi-home-outline',
  'mdi-card-account-details-outline',
  'mdi-food-fork-drink',
  'mdi-shopping-outline',
  'mdi-car-outline',
  'mdi-medical-bag',
  'mdi-school-outline',
  'mdi-gamepad-variant-outline'
]

const isValid = computed(() =>
  newModule.value.title.length > 0 && selectedIcon.value
)

const emit = defineEmits(['create'])

const createModule = () => {
  emit('create', {
    title: newModule.value.title,
    icon: selectedIcon.value
  })
  dialog.value = false
  newModule.value.title = ''
  selectedIcon.value = ''
}

defineExpose({ dialog })
</script>
