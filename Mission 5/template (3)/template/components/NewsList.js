// do something!

// NewsList 컴포넌트

// 변수 선언
let PAGE = 1;
let category = '';
const newsListContainer = document.querySelector('.news-list-container');

// 데이터 통신 > newlist 출력
const setNews = async(PAGE = 1, category) => {
    let pageSize = 5;
    const API_KEY = 'c57d23692c57485e898f4b40290227c8';
    const URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${PAGE}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(URL);
        const articles = response.data.articles;
        return await articles;
    } catch (error) { console.log(error); }
};

// 스크롤 이벤트 설정
const setScrollOver = (scrollOver) => {
    const callback = async (entries) => {
        for( const entry of entries) {
            if( entry.isIntersecting ) {
                const newsList = await setNews(++PAGE, category);
                if( newsList.length > 0 ) {
                    const newsListDOM = setNewsListDOM(newsList);
                    newsListContainer.appendChild(newsListDOM);
                }
                observer.unobserve(entry.target);
                entry.target.remove();
            }
        }
    };
    const observer = new IntersectionObserver(callback, { threshold: 1.0 });
    observer.observe(scrollOver);
};

// 무한 스크롤 동적 생성
const createScrollOver = () => {
    const scrollOver = document.createElement('div');
    scrollOver.className = 'scroll-observer';
    const observeImg = document.createElement('img');
    observeImg.src = './img/ball-triangle.svg';
    observeImg.alt = 'Loading';
    scrollOver.appendChild(observeImg);
    return scrollOver;
};

// DOM 생성 
const setNewsListDOM = (newsList) => {
    const $newsList = document.createElement('article');
    $newsList.className = 'news-list';
    newsListContainer.appendChild($newsList);
    newsList.forEach((news) => {
        const { title, description, url, urlToImage } = news;
        const newsItem = document.createElement('section');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
        <div class="thumbnail">
            <a href="${url}" target="_blank" rel="noopener noreferrer">
            <img
                src="${urlToImage ? urlToImage : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='}"
                alt="thumbnail" />
            </a>
        </div>
        <div class="contents">
            <h2><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
            <p>${description ? description : '' }</p>
        </div>
        `;
        $newsList.appendChild(newsItem);
    });
    const scrollOver = createScrollOver();
    $newsList.appendChild(scrollOver);
    setScrollOver(scrollOver);

    return $newsList;
};

const NewsList = async (category) => {
    const newsList = await setNews(PAGE, category);
    const newsListDOM = setNewsListDOM(newsList);
    return newsListDOM;
};

export default NewsList;