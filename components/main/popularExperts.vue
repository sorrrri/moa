<template>
  <section class="section-experts">
    <div v-if="popularExperts !== undefined && popularExperts.length > 0" class="wrapper">
      <h2>인기 전문가</h2>
      <ul>
        <li v-for="(list, index) in popularExperts" :key="index" data-modal="ModalEstimate">
          <router-link :to="{ name: 'expertProfile', params: { seq: list.seq } }">
            <article>
              <div class="image">
                <img
                  :src="thumbnail(list)"
                  :alt="`${list.nickName}`"
                  @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
                />
              </div>
              <div class="title">{{ list.nickName }}</div>
              <div class="skills">
                <span v-for="skill in list.categoryList" :key="skill.seq">
                  {{ skill.categoryName }}
                </span>
              </div>
            </article>
            <div class="reviews">
              <i class="ico-star" />
              <div class="score">{{ list.avgScore }}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { usePopularExpert } from '~/composables/expert/profile.js'
const { popularExperts, thumbnail } = usePopularExpert()
</script>