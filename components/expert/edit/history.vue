<template>
  <article class="history">
    <div class="title">기업 연혁</div>
    <div>
      <button class="btn-add" type="button" @click="addList">추가하기</button>
      <ul v-if="history">
        <li v-for="(list, index) in history" :key="index">
          <div class="inputs">
            <input
              v-model.trim="list.historyDate"
              type="number"
              placeholder="YYYY"
              pattern="\d{4}"
              maxlength="4"
              @input="handleInput"
            />
            <textarea
              v-if="blank(list)"
              v-model.trim="list.historyContents"
              placeholder="내용을 입력해주세요"
              rows="3"
              @keydown.enter="addBullets"
            />
          </div>
          <button class="btn-remove" type="button" @click="removeList(index)" />
          <Transition name="fade">
            <small v-if="list.historyDate.length == 0" class="caution">
              내용을 입력해주세요.
            </small>
          </Transition>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { useEditExpertHistory } from '~/composables/expert/history.js'
const { addList, removeList, history, handleInput, addBullets, blank } = useEditExpertHistory()
</script>
