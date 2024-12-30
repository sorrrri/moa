<template>
  <article class="certification">
    <div class="title">
      <span>자격증 및</span>
      <span>기타 인증 내용</span>
    </div>
    <div>
      <button class="btn-add" type="button" @click="addList">추가하기</button>
      <ul v-if="certification">
        <li v-for="(list, index) in certification" :key="index">
          <div class="inputs">
            <input v-model.trim="list.certificationName" type="text" placeholder="인증명" />
            <input v-model.trim="list.authorityName" type="text" placeholder="기관" />
            <input
              v-model="list.startDate"
              class="date"
              type="text"
              placeholder="YYYY.MM.DD"
              maxlength="10"
              @input="formatDate($event)"
            />
            ~
            <input
              v-model="list.endDate"
              class="date"
              type="text"
              placeholder="YYYY.MM.DD"
              maxlength="10"
              @input="formatDate($event)"
            />
          </div>
          <button class="btn-remove" type="button" @click="removeList(index)" />
          <small
            v-if="list.certificationName.length == 0 || list.authorityName.length == 0"
            class="caution"
            >내용을 입력해주세요.</small
          >
          <small
            v-if="list.certificationName.length > 100 || list.authorityName.length > 100"
            class="caution"
          >
            자격증 및 기타 인증 내용을 100자 이하로 입력해주세요.
          </small>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { useEditExpertCertification } from '~/composables/expert/certification.js'
const { addList, removeList, certification, formatDate } = useEditExpertCertification()
</script>
