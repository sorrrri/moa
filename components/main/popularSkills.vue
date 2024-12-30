<template>
  <section v-if="popularSkills.length > 0" class="section-services">
    <div v-if="popularSkills.length > 0" class="wrapper">
      <h2>인기 서비스</h2>
      <ul>
        <li v-for="list in popularSkills" :key="list.seq" @click="requestQuote(list)">
          <div class="image">
            <img
              v-if="list.fileInfo"
              :src="`${MOA_API_URL}/${list.fileInfo.filePath}`"
              :alt="`${list.name} 썸네일`"
              @error="(event) => (event.target.src = '/images/common/logo_gr.svg')"
            />
          </div>
          {{ list.name }}
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { useExpertSkills } from '~/composables/expert/skills.js'
const { popularSkills } = useExpertSkills()
import { ref } from 'vue'
const MOA_API_URL = ref(`${import.meta.env.VITE_MOA_API_URL}`)
import { useRequestQuotation } from '~/composables/client/quotation.js'
const { requestQuote } = useRequestQuotation()
</script>
