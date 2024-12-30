<template>
  <main-header />
  <router-view />
  <main-footer />
  <Navigation />
  <ModalAlert />
  <ModalConfirm />
  <Transition name="fade">
    <ModalRequestQuote v-if="currentModal === 'requestQuote'" />
  </Transition>
  <Transition name="fade">
    <Loader v-if="isLoading" />
  </Transition>
</template>
<script setup>
import MainHeader from '~/layouts/mainHeader.vue'
import Navigation from '~/layouts/navigation.vue'
import MainFooter from '~/layouts/mainFooter.vue'
import ModalAlert from '~/components/modal/alert.vue'
import ModalConfirm from '~/components/modal/confirm.vue'
import ModalRequestQuote from '~/components/modal/quotation/request.vue'
import { useCustomModal } from '~/composables/modal/index.js'
const { currentModal } = useCustomModal()

// 로딩바 추가
import Loader from '~/components/Loader.vue'
import { useLoader } from '~/composables/subs.js'
const { isLoading } = useLoader()
</script>
