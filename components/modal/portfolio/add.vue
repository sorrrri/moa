<template>
  <Modal class="modal-add-portfolio">
    <header>
      <h3>포트폴리오 등록</h3>
    </header>
    <section>
      <ul class="list">
        <li>
          <h4 class="asterisk">포트폴리오 제목</h4>
          <div class="input">
            <input
              v-model.trim="portfolio.title"
              type="text"
              minlength="2"
              maxlength="30"
              placeholder="포트폴리오 제목을 입력해 주세요."
              required
              @change="validateTitle"
            />
            <small class="character-counter">
              <strong>
                {{ portfolio.title?.length }}
              </strong>
              /30
            </small>
          </div>
          <Transition name="fade">
            <small v-if="isInvalidTitle" class="caution">
              제목을 2자 이상 30자 이하로 입력해주세요.
            </small>
          </Transition>
        </li>
        <li>
          <h4 class="asterisk">설명</h4>
          <div class="input">
            <textarea
              v-model.trim="portfolio.desc"
              cols="30"
              rows="3"
              maxlength="100"
              @change="validateDescription"
            />
            <small class="character-counter">
              <strong>
                {{ portfolio.desc?.length }}
              </strong>
              /100
            </small>
          </div>
          <Transition name="fade">
            <small v-if="isInvalidDescription"> 설명을 입력해주세요. </small>
          </Transition>
        </li>

        <li>
          <h4>작업 연도</h4>
          <div class="selectbox">
            <select id="" v-model="portfolio.year" name="">
              <!-- <option :value="null" disabled selected>test</option> -->
              <option v-for="(list, index) in years" :key="index" :value="list">
                {{ list }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <h4 class="asterisk">이미지</h4>
          <small>최대 4MB의 JPG, PNG 이미지 파일을 업로드할 수 있습니다.</small>
          <small>(이미지 사이즈 가로,세로 최소 600px / 최대 5000px)</small>
          <input
            id="uploadPortfolioImages"
            multiple
            type="file"
            :disabled="portfolioImages.length > 9"
            @change="uploadPortfolioImages($event)"
          />
          <label for="uploadPortfolioImages">
            사진 추가
            <small>{{ portfolioImages ? portfolioImages.length : 0 }}/10</small>
          </label>
          <div v-if="portfolioImages.length > 0" class="images">
            <div v-for="(image, index) in portfolioImages" :key="image" class="image">
              <img
                :src="originalImage(image)"
                @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
              />
              <button class="btn-remove" @click="removeImage(index)" />
            </div>
          </div>
        </li>
        <li>
          <h4 class="asterisk">전문 분야</h4>
          <small>포트폴리오에 해당하는 전문 분야를 선택해 주세요. (여러 개 선택 가능)</small>
          <ul class="skills">
            <li v-for="(list, index) in expertSkills" :key="list.categorySeq">
              <div class="checkbox">
                <input
                  :id="`add-skill-${index}`"
                  v-model="portfolio.skills"
                  type="checkbox"
                  :value="list.categorySeq"
                />
                <label :for="`add-skill-${index}`">{{ list.categoryName }}</label>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <footer class="button">
      <button :disabled="!isValid" @click="submitAddPortfolio">등록하기</button>
    </footer>
  </Modal>
</template>
<script setup>
import { useExpertSkills } from '~/composables/expert/skills.js'
import { useExpertPortfolio, useAddPortfolio } from '~/composables/expert/portfolio.js'
const { originalImage } = useExpertPortfolio()
const {
  isValid,
  isInvalidTitle,
  validateTitle,
  isInvalidDescription,
  validateDescription,
  years,
  portfolio,
  portfolioImages,
  uploadPortfolioImages,
  removeImage,
  submitAddPortfolio
} = useAddPortfolio()
const { expertSkills } = useExpertSkills()
</script>
