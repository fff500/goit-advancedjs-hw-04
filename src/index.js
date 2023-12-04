import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PHOTOS_PER_PAGE = 40;
const simpleLightboxInstance = new SimpleLightbox('.gallery a');
const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handlerLoadMore, options);

let query;
let counterObserver;
let page = 1;

elements.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  observer.unobserve(elements.guard);
  elements.gallery.innerHTML = '';
  counterObserver = 0;

  query = event.target.elements.searchQuery.value.trim();

  if (!query) return alert('Please, write correct search query.');

  try {
    const {
      data: { hits, totalHits },
    } = await fetchPhotos(query);

    if (!hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
      });
    } else {
      createMarkup(hits);
      simpleLightboxInstance.refresh();
      observer.observe(elements.guard);
      iziToast.info({
        message: `Hooray! We found ${totalHits} images.`,
      });
      page = 2;

      if (page === Math.ceil(totalHits / PHOTOS_PER_PAGE)) {
        iziToast.warning({
          message: `We're sorry, but you've reached the end of search results.`,
        });
        observer.unobserve(elements.guard);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchPhotos(query, page = 1) {
  const params = new URLSearchParams({
    key: '9172745-088e6c545fefcd781d4229961',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PHOTOS_PER_PAGE,
  });

  const response = await axios.get('https://pixabay.com/api/', { params });

  if (response.status !== 200) {
    throw new Error(response.statusText || 'Something went wrong');
  }

  return response;
}

async function handlerLoadMore(entries) {
  counterObserver += 1;

  entries.forEach(async entry => {
    try {
      if (entry.isIntersecting) {
        const {
          data: { hits, totalHits },
        } = await fetchPhotos(query, page);

        createMarkup(hits);
        simpleLightboxInstance.refresh();
        page += 1;

        if (page === Math.ceil(totalHits / PHOTOS_PER_PAGE)) {
          iziToast.warning({
            message: `We're sorry, but you've reached the end of search results.`,
          });
          observer.unobserve(elements.guard);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function createMarkup(imagesArray) {
  const markup = imagesArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a href="${largeImageURL}" class="photo-card">
          <div>
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-image"/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <br>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                <br>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      `;
      }
    )
    .join('');

  elements.gallery.insertAdjacentHTML('beforeend', markup);
}
