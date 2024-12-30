<template>
  <main class="content-main interactive">
    <section class="section-main">
      <div class="wrapper">
        <h1>
          <span>해외 진출 전문가에게</span>
          <span>서비스를 요청하고 견적을 받아보세요</span>
        </h1>
        <Search />
      </div>
    </section>
    <section class="section-categories">
      <div class="wrapper">
        <nav>
          <router-link
            v-for="list in categories.slice(0, 10)"
            :key="list.seq"
            :to="`/category/${list.seq}`"
            :title="`category-${list.code}`"
          >
            {{ list.name }}
          </router-link>
        </nav>
      </div>
    </section>
    <section class="section-subs">
      <div class="wrapper">
        <button
          type="button"
          onclick="window.open('https://www.gabiacns.com/cms/library/2004917116')"
        >
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/sub_1.png"
            alt=""
          />
        </button>
        <button
          type="button"
          onclick="window.open('https://www.gabiacns.com/cms/library/377056914')"
          target="_blank"
        >
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/sub_2.png"
            alt=""
          />
        </button>
        <button
          type="button"
          onclick="window.open('https://www.gabiacns.com/cms/library/1714272283')"
        >
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/sub_3.png"
            alt=""
          />
        </button>
        <button
          type="button"
          onclick="window.open('https://www.gabiacns.com/cms/library/109449001')"
        >
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/sub_4.png"
            alt=""
          />
        </button>
      </div>
    </section>
    <section class="section-global">
      <div class="wrapper">
        <h1>
          <span>해외 진출,</span>
          <span>어디서부터</span>
          <span><strong>시작</strong>해야 할까?</span>
          <div class="images">
            <img
              loading="lazy"
              decoding="async"
              draggable="false"
              src="/images/main/highlight_1.png"
              alt=""
            />
            <img
              loading="lazy"
              decoding="async"
              draggable="false"
              src="/images/main/highlight_2.png"
              alt=""
            />
          </div>
        </h1>
        <div class="steps">
          <ul>
            <li>
              <div>
                <i>
                  <span>step 1</span>
                  사전준비
                </i>
                <h3>
                  <span>해외 진출을</span>
                  <span>처음 시작한다면?</span>
                </h3>
              </div>
              <nav>
                <router-link to="/category/1">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_consulting.png"
                    alt=""
                  />
                  컨설팅·인증
                </router-link>
                <router-link to="/category/2">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_design.png"
                    alt=""
                  />
                  디자인 개발
                </router-link>
                <router-link to="/category/3">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_photo.png"
                    alt=""
                  />
                  사진·영상
                </router-link>
              </nav>
            </li>
            <li>
              <div>
                <i>
                  <span>step 2</span>
                  판매하기
                </i>
                <h3>
                  <span>어떻게 판매해야 할지</span>
                  <span>모르겠다면?</span>
                </h3>
              </div>
              <nav>
                <router-link to="/category/4">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_shopping.png"
                    alt=""
                  />
                  오픈마켓
                </router-link>
                <router-link to="/category/5">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_mall.png"
                    alt=""
                  />
                  쇼핑몰
                </router-link>
                <router-link to="/category/6">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_money.png"
                    alt=""
                  />
                  크라우드 펀딩
                </router-link>
              </nav>
            </li>
            <li>
              <div>
                <i>
                  <span>step 3</span>
                  운영하기
                </i>
                <h3>
                  <span>전문적인 운영을</span>
                  <span>희망한다면?</span>
                </h3>
              </div>
              <nav>
                <router-link to="/category/7">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_sales.png"
                    alt=""
                  />
                  영업지원
                </router-link>
                <router-link to="/category/8">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_parcel.png"
                    alt=""
                  />
                  물류
                </router-link>
                <router-link to="/category/9">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_ads.png"
                    alt=""
                  />
                  광고 · 마케팅
                </router-link>
              </nav>
            </li>
            <li>
              <div>
                <i>
                  <span>step 4</span>
                  경영지원
                </i>
                <h3>
                  <span>회사 경영에 대한 지원을</span>
                  <span>받고 싶다면?</span>
                </h3>
              </div>
              <nav>
                <router-link to="/category/10">
                  <img
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    src="/images/common//icons/ico_legal.png"
                    alt=""
                  />
                  법무 · 세무 · 회계
                </router-link>
              </nav>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <PopularSkills />
    <Events />
    <section class="section-ads">
      <div class="wrapper">
        <router-link to="/intro">
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/bottom_banner.png"
            alt=""
          />
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            src="/images/main/bottom_banner_s.png"
            alt=""
          />
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import PopularSkills from '~/components/main/popularSkills.vue'
import PopularExperts from '~/components/main/popularExperts.vue'
import Events from '~/components/main/events.vue'
import { useCategoryPage } from '~/composables/expert/skills.js'
const { categories } = useCategoryPage()
import Search from '~/components/Search.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: '가비아커머스 - 모아, 해외 진출 전문가 매칭 MOA',
  meta: [
    {
      name: 'description',
      content: '해외 진출 전문가에게 서비스를 요청하고 견적을 받아보세요'
    },
    {
      property: 'og:title',
      content: '가비아커머스 - 모아, 해외 진출 전문가 매칭 MOA'
    },
    {
      property: 'og:description',
      content: '해외 진출 전문가에게 서비스를 요청하고 견적을 받아보세요'
    },
    {
      property: 'og:image',
      content: 'https://moa.gabiacns.com/images/common/meta/moa_main_visual.png'
    },
    {
      property: 'og:url',
      content: 'https://moa.gabiacns.com'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://moa.gabiacns.com'
    }
  ]
})
</script>
