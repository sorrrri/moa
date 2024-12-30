<template>
  <Transition name="fade">
    <div v-if="alertModal" class="modal alert" tabindex="0" @keydown.enter="closeModal">
      <div class="dialog">
        <p v-html="alertMessage" />
        <footer class="buttons">
          <button @click="closeModal">확인</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useAlertModal } from '~/composables/modal/index.js'
const { alertModal, alertMessage, closeModal } = useAlertModal()
</script>
