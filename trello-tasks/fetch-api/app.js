import { createElement } from './utils/create-element.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
let currentPage = DEFAULT_PAGE;

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('sw-proxy.js', {
        scope: './',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const app = document.getElementById('app');
const wrapper = createElement({
  tag: 'div',
  className: 'wrapper',
  parentNode: app,
});
const header = createElement({
  tag: 'header',
  className: 'header',
  parentNode: wrapper,
  innerHtml: '<h1>Service Worker Proxy</h1>',
});
const postsWrapper = createElement({
  tag: 'div',
  className: 'posts-wrapper',
  parentNode: wrapper,
});
const paginationContainer = createElement({
  tag: 'div',
  className: 'pagination',
  parentNode: postsWrapper,
});
const postsContainer = createElement({
  tag: 'div',
  className: 'posts',
  parentNode: postsWrapper,
});

const createPost = (data, parentNode) => {
  const post = createElement({
    tag: 'div',
    className: 'post',
    parentNode,
  });

  createElement({
    tag: 'h3',
    className: 'post__title',
    textContent: data.title,
    parentNode: post,
  });

  createElement({
    tag: 'p',
    className: 'post__content',
    textContent: data.body,
    parentNode: post,
  });

  return post;
};

const renderPosts = (posts) => {
  postsContainer.innerHTML = '';

  const postsList = createElement({
    tag: 'ul',
    className: 'posts-list list',
    parentNode: postsContainer,
  });

  posts.forEach((post) => {
    const listElement = createElement({
      tag: 'li',
      className: 'posts-list__item',
      parentNode: postsList,
    });

    createPost(post, listElement);
  });
};

const fetchPosts = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_per_page=${limit}`;
  const response = await fetch(url);

  const posts = await response.json();

  renderPosts(posts);
};

const renderPagination = () => {
  paginationContainer.innerHTML = '';

  const list = createElement({
    tag: 'ul',
    className: 'pagination-list list',
    parentNode: paginationContainer,
  });

  [1, 2, 3, 4].map((page) => {
    const element = createElement({
      tag: 'li',
      className: 'pagination-list__item',
      parentNode: list,
      textContent: page,
    });

    if (page === DEFAULT_PAGE) {
      element.classList.add('active');
    }

    element.addEventListener('click', (e) => {
      if (page === currentPage) {
        return;
      }

      list.querySelectorAll('.pagination-list__item').forEach((paginationElement) => {
        if (e.target === paginationElement) {
          e.target.classList.add('active');
        } else {
          paginationElement.classList.remove('active');
        }
      });
      currentPage = page;
      fetchPosts(currentPage);
    });

    return element;
  });
};

registerServiceWorker();
renderPagination();
fetchPosts();
