<template>
  <article v-if="portfolios.length > 0" id="portfolio" class="portfolio">
    <div class="title">전문가 포트폴리오</div>
    <ul>
      <template v-for="list in portfolios" :key="list">
        <li @click="openModal('portfolio', list)">
          <div class="image">
            <img
              :src="thumbnail(list)"
              :alt="`${list.name} 썸내일`"
              @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
            />
          </div>
          <strong>{{ list.title }}</strong>
          <div class="skills">
            <span v-for="skill in list.categoryList" :key="skill.seq">
              {{ skill.name }}
            </span>
          </div>
        </li>
      </template>
    </ul>
    <button v-if="isCollapsed" class="expand-content" @click.prevent="showAll">더보기</button>
    <button v-if="isExpanded" class="collapse-content" @click.prevent="showPartly">접기</button>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <ModalPortfolio v-if="currentModal === 'portfolio'" :portfolio="selectedList" />
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalPortfolio from '~/components/modal/portfolio/main.vue'
import { useExpertPortfolio } from '~/composables/expert/portfolio.js'
const { thumbnail, portfolios, isCollapsed, isExpanded, showAll, showPartly } = useExpertPortfolio()
import { useCustomModal } from '~/composables/modal/index.js'
const { openModal, currentModal, selectedList } = useCustomModal()
</script>
