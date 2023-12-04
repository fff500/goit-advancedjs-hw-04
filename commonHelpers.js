import{S as b,i as l,a as v}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d=40,m=new b(".gallery a"),n={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")},w={root:null,rootMargin:"300px",threshold:1},u=new IntersectionObserver(S,w);let f,c=1;n.form.addEventListener("submit",L);async function L(a){if(a.preventDefault(),u.unobserve(n.guard),n.gallery.innerHTML="",f=a.target.elements.searchQuery.value.trim(),!f)return alert("Please, write correct search query.");try{const{data:{hits:r,totalHits:o}}=await h(f);r.length?(g(r),m.refresh(),u.observe(n.guard),l.info({message:`Hooray! We found ${o} images.`}),c=2,c===Math.ceil(o/d)&&(l.warning({message:"We're sorry, but you've reached the end of search results."}),u.unobserve(n.guard))):l.error({message:"Sorry, there are no images matching your search query. Please try again."})}catch(r){console.error(r)}}async function h(a,r=1){const o=new URLSearchParams({key:"9172745-088e6c545fefcd781d4229961",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:d}),s=await v.get("https://pixabay.com/api/",{params:o});if(s.status!==200)throw new Error(s.statusText||"Something went wrong");return s}async function S(a){a.forEach(async r=>{try{if(r.isIntersecting){const{data:{hits:o,totalHits:s}}=await h(f,c);g(o),m.refresh(),c+=1,c===Math.ceil(s/d)&&(l.warning({message:"We're sorry, but you've reached the end of search results."}),u.unobserve(n.guard))}}catch(o){console.error(o)}})}function g(a){const r=a.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:p,downloads:y})=>`
        <a href="${s}" class="photo-card">
          <div>
            <img src="${o}" alt="${e}" loading="lazy" class="photo-image"/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <br>
                ${t}
              </p>
              <p class="info-item">
                <b>Views</b>
                <br>
                ${i}
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br>
                ${p}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br>
                ${y}
              </p>
            </div>
          </div>
        </a>
      `).join("");n.gallery.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
