<template>
  <article id="portfolio" class="portfolio">
    <!-- 프로필 관리 -->
    <h3>포트폴리오</h3>
    <button class="btn-add" type="button" @click="openModal('addPortfolio')">
      포트폴리오 등록하기
    </button>
    <Sortable
      :list="portfolios"
      item-key="id"
      tag="ul"
      :options="sortableOptions"
      class="sortable"
      @end="reorderPortfolio"
    >
      <template #item="{ element }">
        <li :key="element.id" :data-seq="element.seq">
          <div class="buttons">
            <button class="btn-move draggable" type="button" />
            <button
              class="btn-trash"
              @click.prevent="openConfirmModal('removePortfolio', element)"
            />
          </div>
          <div class="image" @click.prevent="openModal('editPortfolio', element)">
            <img
              :src="thumbnail(element)"
              :alt="`${element.name} 썸내일`"
              @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
            />
          </div>
          <strong>{{ element.title }}</strong>
          <div class="skills">
            <span v-for="skill in element.categoryList" :key="skill.seq">
              {{ skill.name }}
            </span>
          </div>
        </li>
      </template>
    </Sortable>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <ModalRemovePortfolio
        v-if="currentConfirmModal === 'removePortfolio'"
        :list="selectedConfirmList"
      />
    </Transition>
    <Transition name="fade">
      <ModalEditPortfolio v-if="currentModal === 'editPortfolio'" />
    </Transition>
    <Transition name="fade">
      <ModalAddPortfolio v-if="currentModal === 'addPortfolio'" />
    </Transition>
  </Teleport>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import ModalEditPortfolio from '~/components/modal/portfolio/edit.vue'
import ModalAddPortfolio from '~/components/modal/portfolio/add.vue'
import ModalRemovePortfolio from '~/components/modal/confirm.vue'
import { useEditPortfolio } from '~/composables/expert/portfolio.js'
const { thumbnail, portfolios, reorderPortfolio, sortableOptions } = useEditPortfolio()
import { useConfirmModal, useCustomModal } from '~/composables/modal/index.js'
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
const { openModal, currentModal } = useCustomModal()
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
