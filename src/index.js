import axios from 'axios';
//import iziToast from 'izitoast';

//import 'izitoast/dist/css/iziToast.min.css';
//
// Описаний в документації
//import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
//import "simplelightbox/dist/simple-lightbox.min.css";
const PHOTOS_PER_PAGE = 40;

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

let query;
let counterObserver = 0;
let page = 1;

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handlerLoadMore, options);

elements.form.addEventListener('submit', handleSubmit);

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

  return response;
}

async function handleSubmit(event) {
  event.preventDefault();

  query = event.target.elements.searchQuery.value.trim();

  const {
    data: { hits, totalHits },
  } = await fetchPhotos(query);
  console.log(totalHits);

  createMarkup(hits);

  observer.observe(elements.guard);
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
        <div class="photo-card">
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
      `;
      }
    )
    .join('');

  elements.gallery.insertAdjacentHTML('beforeend', markup);
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

          if (page * PHOTOS_PER_PAGE >= totalHits) {
            observer.unobserve(elements.guard);
          }
        })
        .catch(err => console.log(err));
    }
  });
}
