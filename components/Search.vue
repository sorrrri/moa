<template>
  <div class="search">
    <input
      ref="search"
      v-model="searchTerm"
      placeholder="어떤 분야의 전문가를 찾으시나요?"
      type="search"
      @keyup.enter="saveSearchTerm"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @click="fetchCategoryList"
    />
    <div class="focus" />
    <Transition name="fade">
      <div v-if="suggestedSkills.length > 0" ref="suggestion" class="suggestion">
        <ul>
          <li v-for="list in suggestedSkills" :key="list.code">
            <div @click="requestQuote(list)">
              {{ list.name }}
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
  <div v-if="isMobile && searchPage" class="list">
    <h4>최근 검색한 키워드</h4>
    <div class="keywords">
      <span v-for="term in searchHistory" :key="term" @click="inputSearchTerm(term)">
        {{ term }}
        <button class="btn-remove" @click="removeTerm(term)" />
      </span>
    </div>
  </div>
  <div v-if="isMobile && searchPage" class="list">
    <h4>인기 키워드</h4>
    <ul>
      <li v-for="term in popularKeywords.slice(0, 8)" :key="term.seq" @click="requestQuote(term)">
        {{ term.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useSearchTerms } from '~/composables/search.js'
import { useMobile } from '~/composables/subs.js'
import { useRequestQuotation } from '~/composables/client/quotation.js'
const { requestQuote } = useRequestQuotation()
const {
  popularKeywords,
  searchPage,
  search,
  suggestion,
  searchTerm,
  handleCompositionStart,
  handleCompositionUpdate,
  handleCompositionEnd,
  fetchCategoryList,
  suggestedSkills,
  saveSearchTerm,
  searchHistory,
  removeTerm,
  inputSearchTerm
} = useSearchTerms()
const { isMobile } = useMobile()
</script>
