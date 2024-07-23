
/*  요구사항
1. 현재를 기준으로 .calendar 요소 동적 생성
2. nav 요소 클릭 시 익월 또는 전월을 기준으로 .calendar 요소 동적 생성
3. 현재 표시 중인 달의 1일 앞과 말일 뒤에 전달, 다음달 날짜 표시
4. today 구분
5. 일요일 > 폰트 컬러 지정(red)
6. 캘린더 크기는 동적으로 변경 가능
7. 날짜 클릭 시 'yyyy-mm-dd' 형태로 콘솔에 출력
8. 최초 datePicker 로딩 시 빈 문자열
9. datePicker는 readonly
10. 캘린더 내 날짜 선택 시 datePicker 값 변경
11. 캘린더, datePicker 외 클릭 시 캘린더 비활성화
12. datePicker 값 존재 시 datePicker 값 기준으로 캘린더 렌더링
*/

// 변수 선언
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let clicked = false;
const monthsName = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];
const calendar = document.querySelector('.calendar');
const calendarNav = document.querySelector('.calendar_nav');
const selectDate = document.querySelector('.date_picker');
const calendarArea = document.querySelector('.calendar_area');

// DOM 생성
const setCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();                 // 1일 시작 요일
    const lastDate = new Date(year, month + 1, 0).getDate();            // 달의 마지막 날짜
    const lastDay = new Date(year, month, lastDate).getDay();           // 달의 마지막 요일
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();      // 이전 달 마지막 날짜
    const calendarMonth = document.querySelector('.calendar_month');
    const calendarYear = document.querySelector('.calendar_year');

    calendarMonth.innerText = monthsName[month];
    calendarYear.innerText = year;

    const calendarDate = document.querySelector('.calendar_date');
    calendarDate.innerHTML = '';

    // 이전 달 
    for( let i = firstDay; i > 0; i-- ) {
        const day = document.createElement('li');
        day.classList.add('not_today');
        day.innerText = lastDayOfLastMonth - i + 1;
        calendarDate.append(day);
    }

    // 현재
    for( let i = 1; i <= lastDate; i++ ) {
        const day = document.createElement('li');
        day.innerText = i;
        calendarDate.append(day);

        // today
        if( i - firstDay + 1 === currentDate.getDate() && month === currentDate.getMonth() ) day.classList.add('today');
    }

    // 다음 달
    for( let i = lastDay; i < 6; i++ ) {
        const day = document.createElement('li');
        day.classList.add('not_today');
        day.innerText = i - lastDay + 1;
        calendarDate.append(day);
    }

    setSelectDate(year, month, calendarDate);
};

// nav 버튼 클릭 시 캘린더 업데이트
const setUpdateDate = (e) => {
    if( e.target.tagName !== 'BUTTON' ) return;
    e.target.id === 'prev' ? currentMonth-- : currentMonth++;

    if( currentMonth < 0 || currentMonth > 11 ) {
        currentDate = new Date(currentYear, currentMonth);
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
    } else {
        currentDate = new Date();
    }
    setCalendar(currentYear, currentMonth);
};

// date select 시 input 업데이트
const setSelectDate = (year, month, calendarDate) => {
    calendarDate.addEventListener('click', (e) => {
        if( e.target.matches('.not_today') || e.target === calendarDate ) return;

        const days = [...calendarDate.children];
        days.forEach((day) => day.classList.remove('select'));
        e.target.classList.add('select');

        const day = e.target.innerText;
        selectDate.value = `${year}년 ${month+1}월 ${day}일`;
    });
};

// datePicker 클릭 시  캘린더 표기
const setPickerCalendar = () => {
    if( clicked ) calendarArea.classList.add('hide');
    else calendarArea.classList.remove('hide');
    clicked = !clicked;
};

// datePicker & 캘린더 외 클릭 시 비활성화
const setHideCalendar = (e) => {
    if( e.target.id !== 'datePicker' ) {
        const targetArea = e.target.closest('.calendar_area');
        if( !targetArea ) calendarArea.classList.add('hide');
    }
    clicked = false;
};

const datePicker = () => {
    setCalendar(currentYear, currentMonth);
    calendarNav.addEventListener('click', setUpdateDate);
    selectDate.addEventListener('click', setPickerCalendar);
    document.addEventListener('click', setHideCalendar);
};

datePicker();