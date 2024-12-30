<template>
  <article v-if="history?.length > 0" class="history">
    <div class="title">기업 연혁</div>
    <div>
      <ul :class="{ gradation: isCollapsed }">
        <li v-for="(list, index) in history" :key="index">
          <strong>{{ list.historyDate }}</strong>
          <p>
            {{ list.historyContents }}
          </p>
        </li>
      </ul>
      <button v-if="isCollapsed" class="expand-content" @click.prevent="showAll">더보기</button>
      <button v-if="isExpanded" class="collapse-content" @click="showPartly()">접기</button>
    </div>
  </article>
</template>

<script setup>
import { useExpertHistory } from '~/composables/expert/history.js'
const { history, showAll, isCollapsed, isExpanded, showPartly } = useExpertHistory()
</script>
