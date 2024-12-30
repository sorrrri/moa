<template>
  <div class="modal" tabindex="0">
    <div class="dialog">
      <div class="close" @click="closeModal" />
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useCustomModal } from '~/composables/modal/index.js'
const { closeModal } = useCustomModal()
</script>
