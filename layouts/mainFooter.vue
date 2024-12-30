<template>
  <footer
    v-if="
      route.name !== 'error' &&
      !route.path.includes('register') &&
      !route.path.includes('charge') &&
      !route.path.includes('edit') &&
      !route.path.includes('search') &&
      !route.path.includes('quotation')
    "
    class="footer"
  >
    <div class="wrapper">
      <section class="section-sitemap">
        <ul class="sitemap">
          <li>
            <a href="https://shop.gabiacns.com/clickn">쇼핑몰 창업</a>
            <a href="https://shop.gabiacns.com/clickn">초간편 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/cloud">클라우드 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/license">독립 쇼핑몰</a>
            <a href="https://shop.gabiacns.com/frelocate">쇼핑몰 이전</a>
          </li>
          <li>
            <a href="https://editor.gabiacns.com/">AI 에디터</a>
            <a href="https://editor.gabiacns.com/" data-badge="new">상품 상세 생성</a>
          </li>
          <li>
            <a href="https://custom.gabiacns.com/website">제작·운영 의뢰</a>
            <a href="https://custom.gabiacns.com/website">쇼핑몰</a>
            <a href="https://custom.gabiacns.com/selling">운영 대행</a>
          </li>
          <li>
            <a href="https://market.gabiacns.com/esellers">오픈마켓 판매</a>
            <a href="https://market.gabiacns.com/esellers">쇼핑몰 통합관리</a>
          </li>
          <li>
            <a href="https://global.gabiacns.com">해외 진출</a>
            <a href="https://global.gabiacns.com/amazon">아마존 입점</a>
            <a href="https://global.gabiacns.com/alibaba">알리바바 입점</a>
            <a href="https://global.gabiacns.com/globalmall">해외몰 구축</a>
            <a href="https://moa.gabiacns.com" data-badge="new">전문가 매칭</a>
          </li>
          <li>
            <a href="https://ads.gabiacns.com">광고·마케팅</a>
            <a href="https://ads.gabiacns.com/agency">온라인 광고</a>
            <a href="https://ads.gabiacns.com/sns">SNS 마케팅</a>
          </li>
          <li>
            <a href="https://www.gabiacns.com/customer">고객센터</a>
            <a href="https://www.gabiacns.com/cms/notice">새소식</a>
            <a href="https://www.gabiacns.com/cms/event">이벤트</a>
            <a href="https://www.gabiacns.com/customer/faq" data-badge="new">FAQ</a>
            <a href="https://www.gabiacns.com/government-benefit">바우처</a>
            <a href="https://www.gabiacns.com/cms/library" data-badge="new">라이브러리</a>
          </li>
        </ul>
      </section>
      <section class="section-contacts">
        <div class="texts">
          <p>
            <a href="https://www.gabiacns.com/customer" target="_blank">고객센터</a>
          </p>
          <p>평일 10:00 ~ 17:00 (주말/공휴일 휴무)</p>
          <p>격주 금요일(2,4주): 10:00 ~ 12:30</p>
          <p>점심 12:30 ~13:30</p>
        </div>
        <ul class="contacts">
          <li>
            <i>
              <img loading="lazy" src="/images/common/footer_01.png" alt="" />
            </i>
            <div>
              쇼핑몰 창업
              <a href="tel:1544-3270">1544-3270</a>
            </div>
          </li>
          <li>
            <i>
              <img loading="lazy" src="/images/common/footer_custom.png" alt="" />
            </i>
            <div>
              제작·운영 의뢰
              <a href="tel:1544-6437">1544-6437</a>
            </div>
          </li>
          <li>
            <i>
              <img loading="lazy" src="/images/common/footer_02.png" alt="" />
            </i>
            <div>
              오픈마켓 판매
              <a href="tel:1544-8318">1544-8318</a>
            </div>
          </li>
          <li>
            <i>
              <img loading="lazy" src="/images/common/footer_03.png" alt="" />
            </i>
            <div>
              해외 진출
              <a href="tel:02-6907-6837">02-6907-6837</a>
            </div>
          </li>
          <li>
            <i>
              <img loading="lazy" src="/images/common/footer_04.png" alt="" />
            </i>
            <div>
              광고∙마케팅
              <a href="tel:1644-4527">1644-4527</a>
            </div>
          </li>
        </ul>
      </section>
      <section class="section-links">
        <div class="links">
          <nav>
            <a href="https://company.gabiacns.com" target="_blank">회사소개</a>
            <a href="https://company.gabiacns.com/recruit" target="_blank">채용</a>
            <a href="https://www.gabiacns.com/policy">약관</a>
            <a href="https://company.gabiacns.com/privacyAll" target="_blank">개인정보처리방침</a>
          </nav>
          <div style="flex-direction: column">
            <div class="dropdown">
              <button type="button" @click.prevent="handleDropdown">패밀리사이트</button>
              <ul :class="{ 'is-active': dropdown }">
                <li>
                  <a href="https://www.clickn.co.kr" target="_blank">클릭엔</a>
                </li>
                <li>
                  <a href="https://www.firstmall.kr" target="_blank">퍼스트몰</a>
                </li>
                <li>
                  <a href="https://www.esellers.co.kr" target="_blank">이셀러스</a>
                </li>
                <li>
                  <a href="https://www.diad.co.kr" target="_blank">가비아CNS 마케팅센터</a>
                </li>
                <li>
                  <a href="https://www.magentokorea.co.kr" target="_blank">마젠토코리아</a>
                </li>
                <li>
                  <a href="https://www.gabia.com" target="_blank">가비아</a>
                </li>
              </ul>
            </div>
            <div class="social-media">
              <a href="https://blog.naver.com/gabia_cns" target="_blank">
                <img loading="lazy" src="/images/common/icons/ico_blog.png" alt="" />
              </a>
              <a href="https://www.instagram.com/gabia.commerce" target="_blank">
                <img loading="lazy" src="/images/common/icons/ico_instagram.png" alt="" />
              </a>
              <a href="https://www.youtube.com/@gabia.commerce" target="_blank">
                <img loading="lazy" src="/images/common/icons/ico_youtube.png" alt="" />
              </a>
              <a href="https://pf.kakao.com/_xgFKiG" target="_blank">
                <img loading="lazy" src="/images/common/icons/ico_kakao.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div class="links">
          <ul>
            <li>(주) 가비아씨엔에스</li>
            <li>경기도 과천시 과천대로7나길 34, 2층 (갈현동, 가비아 앳)</li>
          </ul>
          <ul>
            <li>대표이사: 공경원</li>
            <li>사업자등록번호: 113-86-18829</li>
            <li>통신판매업 신고번호: 제 2024-경기과천-0244 호</li>
          </ul>
          <div class="sns" />
        </div>
        <div class="partners">
          <img loading="lazy" src="/images/common/footer_logo_isms.png" alt="ISMS 인증 로고" />
          <img loading="lazy" src="/images/common/footer_logo_01.png" alt="전문 무역상사 로고" />
          <img
            loading="lazy"
            src="/images/common/footer_logo_02.png"
            alt="청년친화 강소기업 로고"
          />
          <img
            loading="lazy"
            src="/images/common/footer_logo_03.png"
            alt="일하기좋은 중소기업 로고"
          />
          <img loading="lazy" src="/images/common/footer_logo_04.png" alt="벤처 확인기업 로고" />
          <img loading="lazy" src="/images/common/footer_logo_05.png" alt="이노비즈 로고" />
        </div>
      </section>
    </div>
  </footer>
  <footer
    v-else-if="route.path.includes('register') || route.path.includes('charge')"
    class="type2"
  >
    ⓒ GabiaCNS Inc. All Right Reserved.
  </footer>
  <footer v-else />
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { useDropdown } from '~/composables/subs.js'
const { dropdown, handleDropdown } = useDropdown()
</script>
