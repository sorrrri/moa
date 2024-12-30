<template>
  <Modal class="modal-quotations">
    <aside class="quotations">
      <strong class="title">{{ details.category.name }}</strong>
      <ul>
        <li
          v-for="(list, index) in details.estimateItemList"
          :key="index"
          :class="{ 'is-active': activeProfile === index, disabled: list.expert.status != 9 }"
          @click="setActiveProfile(index, list)"
        >
          <div class="thumbnail">
            <img
              :src="
                list.expert.profileImage?.filePath
                  ? `${MOA_API_URL}/${list.expert.profileImage.filePath}`
                  : '/images/common/no_thumbnail.png'
              "
              :alt="`${list.expert.nickName} 썸내일`"
              @error="(event) => (event.target.src = '/images/common/no_thumbnail.png')"
            />
          </div>
          <div class="information">
            <h3 v-if="list.expert.nickName">{{ list.expert.nickName }}</h3>
            <h3 v-else>&nbsp;</h3>
            <p v-if="list.price && !isNaN(list.price)">{{ formatPrice(list.price) }}원</p>
            <p v-else>0원</p>
          </div>
        </li>
      </ul>
    </aside>
    <main class="content-expert profile">
      <Overview />
      <div class="pricing">
        <strong>견적 금액 : </strong>
        <strong class="blue price">
          {{ formatPrice(quote.price) }}
        </strong>
      </div>
      <section class="section-description">
        <ul>
          <li>
            <h4>견적 설명</h4>
            <p>
              {{ quote?.description }}
            </p>
          </li>
        </ul>
      </section>
      <template v-if="selectedExpert.status == 9">
        <section class="section-tabs">
          <div class="wrapper">
            <ul class="tabs">
              <li v-for="(tab, index) in tabs" :key="index">
                <a
                  :href="`#${tab.name}`"
                  :class="{ 'is-active': activeIndex === index }"
                  @click.prevent="scrollToAnchor(tab, index, 270)"
                >
                  {{ tab.title }}
                </a>
              </li>
            </ul>
          </div>
        </section>
        <Transition name="fade">
          <div class="tab-content information">
            <Intro />
            <Skills />
            <History />
            <Certification />
            <Portfolio />
            <Reviews />
            <Faq />
          </div>
        </Transition>
      </template>
      <template v-else>
        <section class="section-tabs">
          <div class="wrapper blur">
            <ul class="tabs">
              <li
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ 'is-active': activeIndex === index }"
              >
                <a :href="`#${tab.name}`">
                  {{ tab.title }}
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div class="blur tab-content information">
          <Intro />
          <Skills />
          <div class="caution">활동이 중지되었거나 해지한 전문가입니다.</div>
        </div>
      </template>
    </main>
  </Modal>
</template>

<script setup>
import Modal from '~/components/modal/nested.vue'
import { useClientQuotation } from '~/composables/client/quotation.js'
import { useExpertInformationTabs } from '~/composables/expert/profile.js'
import { useFormatter } from '~/composables/subs.js'
import Overview from '~/components/expert/overview.vue'
import Intro from '~/components/expert/intro.vue'
import Certification from '~/components/expert/certification.vue'
import Portfolio from '~/components/expert/portfolio.vue'
import Skills from '~/components/expert/skills.vue'
import History from '~/components/expert/history.vue'
import Reviews from '~/components/expert/reviews.vue'
import Faq from '~/components/expert/faq.vue'
const { scrollToAnchor, activeIndex, tabs } = useExpertInformationTabs()
const { formatPrice } = useFormatter()
const { MOA_API_URL, selectedExpert, setActiveProfile, activeProfile, quote, details } =
  useClientQuotation()
</script>
