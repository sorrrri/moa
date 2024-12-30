<template>
  <Modal class="modal-forms favorite-quotation">
    <header>
      <h3>자주쓰는 견적</h3>
    </header>
    <section v-if="favoriteQuotes?.length > 0">
      <ul>
        <li
          v-for="(list, index) in favoriteQuotes"
          :key="index"
          class="tooltip"
          :class="{ 'is-active': activeFormIndex === index }"
        >
          <div>
            <span @click.prevent="openConfirmModal('applyForm', list)">
              {{ list.title }}
            </span>
            <article>
              <strong>견적 금액 {{ list.price }}원</strong>
              <p>
                {{ list.description }}
              </p>
            </article>
            <div class="buttons">
              <button
                class="btn-remove"
                @click.prevent="openConfirmModal('removeQuoteForm', list)"
              />
              <button class="btn-edit" @click="toggleForm(index)" />
            </div>
          </div>
          <form @submit.prevent="submitEditForm(list)">
            <div class="input">
              <span>제목</span>
              <input v-model="list.title" type="text" />
            </div>
            <div class="input">
              <span>금액</span>
              <input v-model="list.price" type="text" placeholder="견적 총 금액을 입력해주세요." />
            </div>
            <div class="input">
              <span>설명</span>
              <textarea
                v-model="list.description"
                rows="4"
                placeholder="건적에 대해 추가 설명을 남겨주세요.
  자세하게 설명을 남겨주시면 고객으로부터
  연락을 더 많이 받을 수 있습니다."
              />
            </div>
            <footer class="buttons">
              <button @click.prevent="activeFormIndex = null">취소</button>
              <button type="submit">수정</button>
            </footer>
          </form>
        </li>
      </ul>
    </section>
    <section v-else class="no-content">
      <img src="/images/common/no_content.png" alt="" />
      <p>
        <span>등록된 자주쓰는 견적서가 없습니다.</span>
      </p>
    </section>
  </Modal>
  <Teleport to="body">
    <Transition name="fade">
      <ConfirmModal v-if="currentConfirmModal === 'removeQuoteForm'" :list="selectedConfirmList" />
    </Transition>
    <Transition name="fade">
      <ConfirmModal v-if="currentConfirmModal === 'applyForm'" :list="selectedConfirmList" />
    </Transition>
  </Teleport>
</template>
<script setup>
import ConfirmModal from '~/components/modal/confirm.vue'
import { useConfirmModal } from '~/composables/modal/index.js'
import { useFavoriteQuoteForm } from '~/composables/expert/quotation.js'
const { currentConfirmModal, openConfirmModal, selectedConfirmList } = useConfirmModal()
const { activeFormIndex, toggleForm, favoriteQuotes, submitEditForm } = useFavoriteQuoteForm()
</script>
