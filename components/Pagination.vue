<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" class="first" @click="goToFirstPage" />
    <button :disabled="currentPage === 1" class="prev" @click="goToPrevPage" />
    <button
      v-for="page in displayedPages"
      :key="page"
      class="page"
      :class="{ 'is-active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" class="next" @click="goToNextPage" />
    <button :disabled="currentPage === totalPages" class="last" @click="goToLastPage" />
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
import { usePagination } from '~/composables/pagination.js'
const {
  currentPage,
  totalPages,
  displayedPages,
  goToFirstPage,
  goToPrevPage,
  goToNextPage,
  goToLastPage,
  goToPage
} = usePagination(props.title)
</script>
