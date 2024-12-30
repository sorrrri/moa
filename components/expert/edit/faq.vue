<template>
  <article id="faq" class="faq">
    <h3 class="title">FAQ</h3>
    <div>
      <div class="title">
        <button v-if="faq.length < 10" class="btn-add" type="button" @click="addList">
          추가하기
        </button>
        <div class="counter">{{ faq.length ?? 0 }}/10</div>
      </div>
      <ul v-if="faq.length > 0">
        <li v-for="(list, index) in faq" :key="index">
          <div class="inputs">
            <input
              v-model.trim="list.questionContents"
              type="text"
              placeholder="질문을 입력해주세요."
            />
            <textarea
              v-model.trim="list.answerContents"
              rows="5"
              placeholder="답변을 입력해주세요."
            />
          </div>
          <button class="btn-remove" type="button" @click="removeList(index)" />
          <small
            v-if="list.questionContents.length == 0 || list.answerContents.length == 0"
            class="caution"
            >내용을 입력해주세요.</small
          >
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { useEditExpertFaq } from '~/composables/expert/faq.js'
const { addList, removeList, faq } = useEditExpertFaq()
</script>
