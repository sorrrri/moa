<template>
  <main class="content-contacts">
    <form id="formRegist">
      <header class="content-header">
        <div class="wrapper">
          <h1>상담하기</h1>
          <p>온라인 커머스 , 가비아커머스에 문의하세요.</p>
        </div>
      </header>
      <div class="wrapper">
        <section>
          <header>
            <h3>문의 정보</h3>
            <small class="asterisk">필수 입력사항</small>
          </header>
          <ul class="inputs">
            <li>
              <div class="asterisk">문의 구분</div>
              <div class="selects">
                <input id="956028751" type="hidden" name="category" value="956028751" />
                아마존 입점
              </div>
            </li>
            <li>
              <div class="asterisk">제목</div>
              <input
                type="text"
                name="voc_subject"
                placeholder="제목을 입력하세요."
                autocomplete="off"
                value=""
              />
            </li>
            <li>
              <div class="asterisk">내용</div>
              <textarea
                class="editor"
                name="voc_contents"
                rows="20"
                cols="20"
                placeholder="문의 내용을 입력하세요."
              >
아마존 입점 전 원활한 상담을 위해 아래 사항을 기재해 주시면 확인 후 연락 드리겠습니다.

1. 회사명

2. 의뢰 제품군

3. 예산과 일정

4. 아마존 계정 보유 여부

5. 담당자 성함과 연락처, 이메일주소

6. 기타 문의내용</textarea
              >
            </li>
            <li class="attach-files">
              <div>파일첨부</div>
              <div class="input">
                <button class="voc-fileinput-button dz-clickable" type="button">
                  첨부파일 추가
                </button>
                <small
                  >5개 파일, 총 10 MB까지 첨부 가능합니다. (이미지, 문서, 압축 파일 첨부
                  가능)</small
                >
                <div id="previews" class="files dz-preview dz-file-preview"></div>
              </div>
            </li>
          </ul>
        </section>
        <section>
          <header>
            <h3>답변 받으실 분</h3>
          </header>
          <ul class="inputs">
            <li>
              <div class="asterisk">이름</div>
              <input type="text" name="customer_name" placeholder="이름을 입력하세요." value="" />
            </li>
            <li>
              <div class="asterisk">이메일</div>
              <div>
                <input
                  type="email"
                  name="customer_email"
                  placeholder="이메일을 입력하세요."
                  value=""
                />
                <div class="checkbox">
                  <input
                    id="is_email"
                    name="is_email"
                    type="checkbox"
                    value="1"
                    checked=""
                    onclick="openDialogAlert({ 'msg': '비회원은 메일로 답변 받습니다.' }); return false;"
                  />
                  <label for="is_email">메일로 답변받기</label>

                  <svg width="15px" height="10px">
                    <polyline points="1,5 6,9 14,1"></polyline>
                  </svg>
                </div>
              </div>
            </li>
            <li>
              <div class="asterisk">연락처</div>
              <div>
                <input type="tel" name="customer_hp" placeholder="연락처를 입력하세요." value="" />
                <div class="checkbox">
                  <input id="is_sms" name="is_sms" type="checkbox" value="1" />
                  <label for="is_sms">문자로 알림받기</label>

                  <svg width="15px" height="10px">
                    <polyline points="1,5 6,9 14,1"></polyline>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
          <div class="captcha_code">
          </div>
        </section>
        <section class="section-agreement">
          <header>
            <h3>개인정보 수집·이용에 대한 안내</h3>
          </header>
          <dl>
            <dt>개인정보 수집 정보</dt>
            <dd>
              가비아CNS는 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한
              법률을 준수하고 있습니다.
            </dd>
            <dd>
              가비아CNS는 고객님에게 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
              개인정보의 보유 및 이용 기간을 안내해 드리며 동의 여부를 체크해 주시기 바랍니다.
            </dd>
            <dd>수집에 동의하지 않는다면 문의가 제한됩니다.</dd>
            <dt>수집하는 개인정보 항목</dt>
            <dd>이름, 이메일, 휴대전화번호</dd>
            <dt>개인정보의 수집 및 이용 목적</dt>
            <dd>
              이름, 이메일, 휴대전화: 문의 사항에 대한 답변을 전달하기 위한 의사소통 경로의 확보
            </dd>
            <dt>개인정보의 보유 및 이용 기간</dt>
            <dd>원칙적으로 개인정보의 수집∙이용 목적 달성 시 바로 파기합니다.</dd>
            <dd>
              수집∙이용 목적을 달성한 경우에도 법률의 규정에 따라 보존할 필요가 있다면 고객의
              개인정보를 보유할 수 있습니다.
            </dd>
            <dd>- 답변 종료 후 30일간</dd>
          </dl>
          <div class="checkbox">
            <input id="agree_personal" name="agree_personal" type="checkbox" value="1" />
            <label for="agree_personal"
              >개인정보 수집에 동의합니다. (문의에 답하기 위한 최소한의 개인정보이므로 동의하지 않을
              경우 문의를 진행하실 수 없습니다.)
            </label>

            <svg width="15px" height="10px">
              <polyline points="1,5 6,9 14,1"></polyline>
            </svg>
          </div>
        </section>
        <section class="section-buttons">
          <button class="arrow-bg" type="submit">상담 신청</button>
        </section>
      </div>
    </form>
  </main>
</template>

<script>
export default {}
</script>

<style></style>
