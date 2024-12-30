<template>
  <header>
    <div class="logo" />
    <h2>전문 분야를 선택해주세요</h2>
    <small>* 전문 분야 변경 가능</small>
  </header>
  <section>
    <ul class="expert-skills">
      <li
        v-for="(primary, index) in primaryCategories"
        :key="primary.code"
        class="primary"
        :class="{ 'is-active': activeIndex === index }"
      >
        <div :title="`category-${primary.code}`" @click="setActive(index)">
          {{ primary.name }}
        </div>
        <ul v-if="primary.belowList.length > 0 && activeIndex === index">
          <li
            v-for="(secondary, subIndex) in primary.belowList"
            :key="secondary.code"
            :class="{ 'is-active': activeIndex2 === subIndex }"
          >
            <div @click="setActive2(subIndex)">{{ secondary.name }}</div>
            <ul v-if="secondary.belowList && activeIndex2 === subIndex">
              <li v-for="tertiary in secondary.belowList" :key="tertiary.code">
                <div class="checkbox">
                  <input
                    :id="tertiary.code"
                    v-model="selectedSkills"
                    type="checkbox"
                    :value="{ value: tertiary.seq, categoryName: tertiary.name }"
                  />
                  <label :for="tertiary.code">{{ tertiary.name }}</label>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <footer v-if="expertRegister" class="buttons">
    <button @click="goBack">이전</button>
    <button
      type="submitExpertRegister"
      :disabled="selectedSkills.length === 0"
      @click="submitRegisterExpert"
    >
      다음
    </button>
  </footer>
  <footer v-else class="button">
    <button type="submit" @click="updateExpertSkills">저장</button>
  </footer>
</template>

<script setup>
import { useVerification } from '~/composables/expert/verification.js'
const { goBack } = useVerification()
import { useSelectExpertSkills } from '~/composables/expert/skills.js'
const {
  activeIndex,
  activeIndex2,
  setActive,
  setActive2,
  expertRegister,
  selectedSkills,
  primaryCategories,
  updateExpertSkills,
  submitRegisterExpert
} = useSelectExpertSkills()
</script>
