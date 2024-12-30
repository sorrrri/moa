<template>
  <article v-if="faq.length > 0" id="faq" class="faq">
    <div class="title">자주 묻는 질문</div>
    <div class="content">
      <ul>
        <li
          v-for="(list, index) in faq"
          :key="index"
          :class="{ 'is-active': activeIndex === index }"
        >
          <div class="question" @click="toggleAnswer(index)">{{ list.questionContents }}</div>
          <div class="answer">
            {{ list.answerContents }}
          </div>
        </li>
      </ul>
      <button v-if="isCollapsed" class="expand-content" @click.prevent="showAll">더보기</button>
      <button v-if="isExpanded" class="collapse-content" @click="showPartly()">접기</button>
    </div>
  </article>
</template>

<script setup>
import { useExpertFaq } from '~/composables/expert/faq.js'
const { activeIndex, toggleAnswer, faq, showAll, isCollapsed, isExpanded, showPartly } =
  useExpertFaq()
</script>
