// do something!

/*  요구사항
1. 정의된 star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달, star 요소들로 구성된 star-rating 요소 생성
2. 재사용 가능
3. star-rating 요소 내부의 css는 js로 자동 추가, 사용자는 star-rating 요소의 위치나 크기 등만을 지정
4. data-max-rating attribute 통해 star 요소의 갯수 지정
5. color 지정
6. 특정 star 요소 클릭 시 star 요소의 rating 결정, rating 결정 시 'rating-change' 통해 외부로 방출
7. star 요소는 boxicons 사용해 구현
*/

// DOM 생성 > maxRating 변수로 요소 전달
const starRatingDOM = (maxRating) => {
    const starRatingContainer = document.createElement('div');
    starRatingContainer.className = 'star-rating-container';

    for(let i = 0; i < maxRating; i++) {
        const ratingStar = document.createElement('i');
        ratingStar.dataset.id = i + 1;
        ratingStar.className = 'bx bxs-star ';
        starRatingContainer.appendChild(ratingStar);
    }
    return starRatingContainer;
};

// 이벤트 설정
const setStar = (event, className) => {
    const stars = Array.from(event.currentTarget.children);
    const starID = event.target.dataset.id;
    stars.forEach((star) => {
        if(star.dataset.id <= starID) star.classList.add(className);
        else star.classList.remove(className);
    });
};

// rating-change 이벤트 설정
const setChange = (event, $container) => {
    const score = event.target.dataset.id;
    const customEvent = new CustomEvent('rating-change', {
        detail: score,
    });
    $container.dispatchEvent(customEvent);
};

// 트리거 이벤트 설정
const setEventListeners = ($container) => {
    const starRatingContainer = $container.children[0];
    starRatingContainer.addEventListener('click', (event) => {
        if (event.target.className == 'star-rating-container') return;
        setStar(event, 'selected');
        setChange(event, $container);
    });
    starRatingContainer.addEventListener('mouseover', (event) => {
        setStar(event,'hovered');
    });
};

const StarRating = ($container) => {
    const maxRating = $container.dataset.maxRating;
    const starRatingContainer = starRatingDOM(maxRating);
    $container.appendChild(starRatingContainer);

    setEventListeners($container);
};

export default StarRating;
