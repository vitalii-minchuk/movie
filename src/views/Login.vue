<template>
  <div>
    {{ authStore.loginError }}
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { push } = useRouter()

const init = async () => {
  await authStore.googleAuth()
  push('/')
}
init()
</script>
