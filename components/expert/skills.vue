<template>
  <article class="skills">
    <div class="title asterisk">전문 분야</div>
    <div>
      <button v-if="onEditPage" class="btn-add" type="button" @click="openModal('selectSkills')">
        추가하기
      </button>
      <ul v-if="expertSkills">
        <li v-for="(list, index) in expertSkills" :key="list.seq">
          {{ list.categoryName }}
          <button v-if="onEditPage" class="x" @click.prevent="removeList(index)" />
        </li>
      </ul>
      <small v-if="expertSkills?.length > 15" class="caution">
        전문 분야는 15개 이하로 선택해주시기 바랍니다.
      </small>
      <small v-else-if="onEditPage"> 1개 이상 최대 15개까지 전문 분야 선택이 가능합니다. </small>
    </div>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="currentModal === 'selectSkills'" class="modal-skills" :list="expertSkills">
        <Skills />
      </Modal>
    </Transition>
  </Teleport>
</template>

<script setup>
import Skills from '../Skills.vue'
import { useRoute } from 'vue-router'
import { useCustomModal } from '~/composables/modal/index.js'
import { useSelectExpertSkills } from '~/composables/expert/skills.js'
const { removeList, expertSkills } = useSelectExpertSkills()
const { openModal, currentModal } = useCustomModal()
const route = useRoute()
const onEditPage = route.path.includes('edit')
</script>
