// do something!

/*  요구사항
1. Nav, NewsList 2개의 컴포넌트로 구성
2. News Api 사용해 뉴스 취득
3. 무한 스크롤 사용해 페이지네이션 기능 구현
4. 카테고리는 전역 상태로 관리 > Nav 컴포넌트가 카테고리 변경 시 NewsList 컴포넌트는 새롭게 뉴스 취득
*/

import { NewsList, Nav } from './components/index.js';

window.onload = async function() {
    const newsListContainer = document.querySelector('.news-list-container');
    const root = document.querySelector('#root');

    const proxyTargetObj = { category: 'all', };
    const proxyData = new Proxy(proxyTargetObj, {
        set: async function ( target, property, value ) {
            const newsListDOM = await NewsList(value);
            newsListContainer.innerHTML = '';
            newsListContainer.appendChild(newsListDOM);
        },
    });

    const nav = Nav(proxyData);
    root.insertBefore(nav, newsListContainer);

    const newsListDOM = await NewsList(proxyData.category);
    newsListContainer.appendChild(newsListDOM);
};