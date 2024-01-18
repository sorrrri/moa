<template>
  <header class="header">
    <div class="wrapper">
      <a href="https://www.gabiacns.com" class="logo">
        <!-- <img src="/images/common/logo.svg" alt="" /> -->
      </a>
      <div class="links">
        <nav>
          <a href="https://shop.gabiacns.com/clickn">쇼핑몰 창업</a>
          <a href="https://custom.gabiacns.com/website">제작·운영 의뢰</a>
          <a href="https://market.gabiacns.com/esellers">오픈마켓 판매</a>
          <a href="https://global.gabiacns.com">해외 진출</a>
          <a href="https://ads.gabiacns.com">광고·마케팅</a>
        </nav>
        <a href="https://www.gabiacns.com/cms/event">이벤트</a>
      </div>
      <div class="hamburg-menu responsive">
        <svg viewBox="0 0 100 100" width="80">
          <path
            d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
          ></path>
          <path d="m 30,50 h 40"></path>
          <path
            d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
          ></path>
        </svg>
      </div>
    </div>
    <div class="subs">
      <button class="aside-handler responsive">
        <svg viewBox="0 0 100 100" width="80">
          <path
            d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429"
          />
          <path d="m 70,50 h -40" />
          <path
            d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429"
          />
        </svg>
      </button>
      <ul class="wrapper">
        <li>
          <menu class="responsive">
            <a href="https://shop.gabiacns.com/clickn">쇼핑몰 창업</a>
          </menu>
          <a href="https://shop.gabiacns.com/clickn">초간편 쇼핑몰</a>
          <a href="https://shop.gabiacns.com/cloud">클라우드 쇼핑몰</a>
          @if (date('Ymd H:i:d') <= '20231231 23:59:59')
          <a href="https://shop.gabiacns.com/license" data-badge="event">독립 쇼핑몰</a>
          @endif @if (date('Ymd H:i:d') >= '20240101 00:00:00')
          <a href="https://shop.gabiacns.com/license">독립 쇼핑몰</a>
          @endif
          <a href="https://shop.gabiacns.com/frelocate">쇼핑몰 이전</a>
          <a href="https://shop.gabiacns.com/editor" data-badge="new">디자인 에디터</a>
        </li>
        <li>
          <menu class="responsive">
            <a href="https://custom.gabiacns.com/website">제작·운영 의뢰</a>
          </menu>
          <a href="https://custom.gabiacns.com/website">쇼핑몰</a>
          <a href="https://custom.gabiacns.com/selling">운영 대행</a>
        </li>
        <li>
          <menu class="responsive">
            <a href="https://market.gabiacns.com/esellers">오픈마켓 판매</a>
          </menu>
          <a href="https://market.gabiacns.com/esellers">쇼핑몰 통합관리</a>
        </li>
        <li>
          <menu class="responsive">
            <a href="https://global.gabiacns.com">해외 진출</a>
          </menu>
          <a href="https://global.gabiacns.com/amazon">아마존 입점</a>
          <a href="https://global.gabiacns.com/alibaba">알리바바 입점</a>
          <a href="https://global.gabiacns.com/globalmall">해외몰 구축</a>
        </li>
        <li>
          <menu class="responsive">
            <a href="https://ads.gabiacns.com">광고·마케팅</a>
          </menu>
          <a href="https://ads.gabiacns.com/agency" data-badge="event">온라인 광고</a>
          <a href="https://ads.gabiacns.com/sns">SNS 마케팅</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style></style>
