// do something!

/*  요구사항
1. 상단 토글 버튼 클릭 시 사이드 내비게이션 토글
2. 사이트 내비게이션 상태 관리
    - 내비게이션이 포함된 웹페이지가 앱 내 여러개 존재한다 가정
    - active 상태는 앱 전역에서 사용되며, 페이지 이동 시 이전 상태 유지
    - 새로고침/페이지 이동/앱 재시작 시 상태 유지(영속적인 저장 방법 필요)
3. 새로고침 시 요소 이동이 보이지 않도록
4. 새로고침 시 트랜지션 발생하지 않도록
*/

// 변수 선언
const KEY = 'toggle';
const body = document.querySelector('body');
const toggleBtn = document.querySelector('.toggle');
const nav = document.querySelector('nav');

// 버튼 클릭 이벤트
const toggleBtnEvent = () => {
    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        body.classList.remove('preload');
    });
};

// 새로고침/페이지 이동/앱 재시작 시 state 유지
const loadState = (key) => {
    if (key === 'open') {
        nav.classList.add('active');
        body.classList.add('preload');
    } else {
        nav.classList.remove('active');
    }
};

// 콘텐츠 로드를 위해 body style hidden 제거
const init = () => {
    body.style.visibility = 'visible';
    body.classList.remove('preload');
};

// 로컬스토리지 상태 저장
const saveState = () => {
    if (nav.matches('.active')) {
        localStorage.setItem(KEY, 'open');
    } else {
        localStorage.setItem(KEY, 'close');
    }
};

window.addEventListener('beforeunload', () => {
    saveState();
});

// 콘텐츠 로드
window.addEventListener('DOMContentLoaded', () => {
    const getKey = localStorage.getItem(KEY);
    init();
    toggleBtnEvent();
    loadState(getKey);
});