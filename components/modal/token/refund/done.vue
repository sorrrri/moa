<template>
  <Modal class="modal-token done">
    <header>
      <h3>환불 신청 완료</h3>
      <p>환불 신청이 완료되었습니다.</p>
    </header>
    <section>
      <div class="list">
        <ul>
          <li>
            <h4>환불 예상 금액</h4>
            <div class="blue price">30,000</div>
          </li>
        </ul>
      </div>
      <div class="list">
        <h4>환불 계좌</h4>
        <ul>
          <li>국민은행 00-500-01 (예금주 홍길동)</li>
          <li>카드 취소가 불가할 경우 입금 받을 환불 계좌</li>
        </ul>
      </div>
      <ul class="caution">
        <li>
          <div>
            환불은 수동으로 진행되며 담당자가 확인 후 환불 처리됩니다.<br />
            영업일 기준 <strong>3~5일 정도 소요</strong>될 수 있습니다.
          </div>
        </li>
        <li>
          원결제 하신 카드로 취소가 진행되나 카드취소 진행이 불가한 경우 등록하신 계좌로 환불이
          진행됩니다.
        </li>
        <li>보상토큰은 환불되지 않습니다.</li>
      </ul>
    </section>
  </Modal>
</template>
