<template>
  <div class="modal" tabindex="0">
    <div class="dialog">
      <div class="close" @click="closeNestedModal" />
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useCustomModal } from '~/composables/modal/index.js'
const { closeNestedModal } = useCustomModal()
</script>
