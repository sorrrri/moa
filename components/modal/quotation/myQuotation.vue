<template>
  <Modal class="my-quotation">
    <header>
      <h3>내 견적 요청 정보</h3>
    </header>
    <section>
      <div class="title">
        <h4>{{ list.category.name }}</h4>
        <small class="date">요청일 {{ formatted(list.registDate, 'slash') }}</small>
      </div>
      <ul>
        <li v-for="(list, index) in splitDescription(list.description)" :key="index">
          <div class="question">{{ list.question }}</div>
          <div class="answer" v-html="breakLines(list.answer)" />
        </li>
      </ul>
    </section>
  </Modal>
</template>
<script setup>
import { useFormatter } from '~/composables/subs.js'
import { useExpertQuotation } from '~/composables/expert/quotation.js'
const { formatted } = useFormatter()
const { splitDescription, breakLines } = useExpertQuotation()
defineProps({
  list: { type: Object, required: true }
})
</script>
