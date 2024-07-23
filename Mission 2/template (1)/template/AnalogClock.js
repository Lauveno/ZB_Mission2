
/*  요구사항
1. 현재 시간을 표시하는 아날로그 시계 구현
2. 초침, 분침, 시침 모두 일정한 각도로 
3. 시계는 js를 사용해 동적으로 생성
4. js코드 재사용 가능
*/

// 현재 시간 및 각도 계산
const setTime = (currentTime) => {
    const [currentHour, currentMinutes, currentSeconds] = currentTime;

    setInterval(() => {
        const date = new Date();
        const hour = date.getHours() % 12;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        currentHour.style.setProperty('--deg', (hour * 30) + (minutes * 0.5));
        currentMinutes.style.setProperty('--deg', (minutes * 6) + (seconds * 0.1));
        currentSeconds.style.setProperty('--deg', seconds * 6);
    }, 1000);
};

// DOM 생성
const setDOM = (container) => {
    const currentHour = document.createElement('div');
    currentHour.className = 'hand hour';
    const currentMinutes = document.createElement('div');
    currentMinutes.className = 'hand minute';
    const currentSeconds = document.createElement('div');
    currentSeconds.className = 'hand second';

    for (let i = 1; i <= 12; i++) {
        const time = document.createElement('div');
        time.className = `time time${i}`;
        time.innerText = i;
        container.appendChild(time);
    }
    return [currentHour, currentMinutes, currentSeconds];
};

const AnalogClock = container => {
    // do something!
    const currentTime = setDOM(container);
    container.append(...currentTime);
    setTime(currentTime);
};

export default AnalogClock;
