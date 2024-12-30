<template>
  <Modal id="businessLicense" title="사업자등록증" class="modal-business">
    <header>
      <h3>사업자 등록증</h3>
    </header>
    <section>
      <ul class="list">
        <li>
          <h4>사업자 등록번호</h4>
          <input
            v-model="businessLicense.number"
            maxlength="12"
            type="text"
            placeholder="[-] 없이 10자리 입력해주세요"
            @input="formatNumber($event)"
          />
        </li>
        <li>
          <h4>사업자 등록증 사진</h4>
          <small>첨부된 사진은 검수용으로 사용됩니다.</small>
          <input id="businessLicenseImage" type="file" @change="uploadBusinessLicenseImage" />
          <label for="businessLicenseImage">사진 등록</label>
        </li>
        <li v-if="businessLicense.image">
          <a
            v-if="businessLicense.image.includes('pdf')"
            :href="businessLicense.image"
            target="_blank"
          >
            PDF 파일 미리보기
          </a>
          <div v-else class="image">
            <img
              :src="businessLicense.image"
              alt=""
              @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
            />
          </div>
        </li>
      </ul>
    </section>
    <footer class="button">
      <button :disabled="!isValid" @click="updateBusinessLicense">등록하기</button>
    </footer>
  </Modal>
</template>
<script setup>
import { useBusinessLicense } from '~/composables/expert/businessLicense.js'
const {
  isValid,
  formatNumber,
  businessLicense,
  uploadBusinessLicenseImage,
  updateBusinessLicense
} = useBusinessLicense()
</script>
