<template>
  <a class="skip-link" href="#main" @click.prevent="focusMain">Перейти к содержимому</a>
  <app-header />
  <router-view :key="$route.fullPath.split('?')[0]" />
  <app-footer />
  <app-toast />
</template>

<script setup>
import { onMounted } from 'vue'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppToast from '@/components/AppToast.vue'
import { useNotify } from '@/composables/useNotify'
import { useProfiles } from '@/composables/useProfiles'
import { useSaved } from '@/composables/useSaved'

const { load: loadProfiles } = useProfiles()
const { load: loadSaved } = useSaved()
const { notify } = useNotify()

function focusMain() {
  document.getElementById('main')?.focus()
}

onMounted(() => {
  Promise.all([loadProfiles(), loadSaved()]).catch((error) => notify(error.message))
})
</script>
