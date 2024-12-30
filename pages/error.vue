<template>
  <main class="content-error small">
    <section>
      <header>
        <div class="logo" />
      </header>
      <div class="image">
        <img src="/images/common/error.png" alt="" />
      </div>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>
        <span>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</span>
        <span>입력하신 주소가 정확한지 다시 한번 확인해주시기 바랍니다.</span>
      </p>
      <button onclick="history.back()">이전페이지로</button>
      <a href="/">메인페이지로 이동</a>
    </section>
  </main>
</template>
