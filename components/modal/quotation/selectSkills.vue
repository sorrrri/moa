<template>
  <Modal class="modal-quotation-skills">
    <header>
      <h3>견적을 받고 싶은 분야를 선택하세요</h3>
    </header>
    <ul v-if="expertSkills">
      <li v-for="(skill, index) in expertSkills" :key="skill.categorySeq">
        <input
          :id="`skill-${index}`"
          type="radio"
          name="quotationSkills"
          :value="skill.categorySeq"
          @click="openModal('requestQuote', skill)"
        />
        <label :for="`skill-${index}`">{{ skill.categoryName }}</label>
      </li>
    </ul>
  </Modal>
</template>
<script setup>
import { useExpertSkills } from '~/composables/expert/skills.js'
import { useCustomModal } from '~/composables/modal/index.js'
const { openModal } = useCustomModal()
const { expertSkills } = useExpertSkills()
defineProps({
  list: {
    type: Object,
    required: true
  }
})
</script>
