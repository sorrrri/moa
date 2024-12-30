<template>
  <article id="intro" class="intro">
    <div class="title">기업 소개</div>
    <div v-if="expertDescription">
      <p
        ref="description"
        :class="{
          'show-all': isExpanded,
          gradation: isCollapsed && !isExpanded
        }"
        v-html="expertDescription"
      />
      <button v-if="isCollapsed" class="expand-content" @click="showAllDescription()">
        더보기
      </button>
      <button v-if="isExpanded" class="collapse-content" @click="showPartlyDescription()">
        접기
      </button>
    </div>
  </article>
</template>
<script setup>
import { useExpertIntro } from '~/composables/expert/intro.js'
const {
  description,
  expertDescription,
  isExpanded,
  isCollapsed,
  showAllDescription,
  showPartlyDescription
} = useExpertIntro()
</script>
