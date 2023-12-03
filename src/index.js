import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const PHOTOS_PER_PAGE = 40;

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

elements.form.addEventListener('submit', handleSubmit);

let query;
let counterObserver = 0;
let page = 1;
let simpleLightboxInstance;

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handlerLoadMore, options);

async function handleSubmit(event) {
  event.preventDefault();

  elements.gallery.innerHTML = '';

  query = event.target.elements.searchQuery.value.trim();

  const {
    data: { hits },
  } = await fetchPhotos(query);

  if (!hits.length) {
    elements.gallery.innerHTML =
      'Sorry, there are no images matching your search query. Please try again.';
  } else {
    createMarkup(hits);
    simpleLightboxInstance = new SimpleLightbox('.gallery a');
    observer.observe(elements.guard);
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

function handlerLoadMore(entries) {
  counterObserver += 1;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

      fetchPhotos(query, page)
        .then(responce => {
          const {
            data: { hits, totalHits },
          } = responce;

          elements.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

          iziToast.info({
            message: `Hooray! We found ${hits.length} images.`,
          });

          simpleLightboxInstance.refresh();

          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });

          if (page * PHOTOS_PER_PAGE >= totalHits) {
            observer.unobserve(elements.guard);
          }
        })
        .catch(err => console.log(err));
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
