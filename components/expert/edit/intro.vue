<template>
  <article class="profile">
    <h3 id="intro">소개</h3>
    <div>프로필 사진</div>
    <div>
      <div class="image">
        <img
          :src="expertThumbnail"
          alt=""
          @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
        />
      </div>
      <input
        id="uploadExpertThumbnail"
        type="file"
        accept="image/*"
        @change="uploadExpertThumbnail"
      />
      <label v-if="expertThumbnail" for="uploadExpertThumbnail">사진 변경</label>
      <label v-else for="uploadExpertThumbnail">사진 등록</label>
      <small>최소 250px*250px의 JPG,PNG 이미지 파일을 권장드립니다.</small>
    </div>
  </article>
  <article>
    <div class="asterisk">기업명</div>
    <div>
      <div class="input">
        <input v-model.trim="expertTitle" type="text" placeholder="기업명을 입력해주세요" />
        <small class="character-counter">
          <strong :class="{ warning: expertTitle.length > 30 }">
            {{ expertTitle.length }}
          </strong>
          /30
        </small>
      </div>
      <Transition name="fade">
        <small v-if="expertTitle.length > 30" class="caution">
          입력 글자수는 30자를 넘을 수 없습니다.
        </small>
      </Transition>
    </div>
  </article>
  <article>
    <div>소개문구</div>
    <div>
      <div class="input">
        <textarea
          v-model.trim="expertDescription"
          rows="4"
          placeholder="클라이언트에게 어필할 수 있도록 전문기업의 장점과 특징, 서비스 제공방향, 준비사항을 자세히 적어주세요."
        />
        <small class="character-counter">
          <strong :class="{ warning: expertDescription.length > 150 }">{{
            expertDescription.length
          }}</strong
          >/150
        </small>
      </div>
      <Transition name="fade">
        <small
          v-if="
            (expertDescription.length > 0 && expertDescription.length < 30) ||
            expertDescription.length > 150
          "
          class="caution"
        >
          소개문구는 30자 이상, 150자를 넘을 수 없습니다.
        </small>
      </Transition>
    </div>
  </article>
</template>

<script setup>
import { useEditExpertIntro } from '~/composables/expert/intro.js'
const { expertTitle, expertDescription, expertThumbnail, uploadExpertThumbnail } =
  useEditExpertIntro()
</script>
