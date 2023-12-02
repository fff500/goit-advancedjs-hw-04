import{a as h}from"./assets/vendor-a61d8330.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u=40,i={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};let l,c=1;const y={root:null,rootMargin:"300px",threshold:1},d=new IntersectionObserver(v,y);i.form.addEventListener("submit",b);async function f(n,o=1){const r=new URLSearchParams({key:"9172745-088e6c545fefcd781d4229961",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:u});return await h.get("https://pixabay.com/api/",{params:r})}async function b(n){n.preventDefault(),l=n.target.elements.searchQuery.value.trim();const{data:{hits:o,totalHits:r}}=await f(l);console.log(r),m(o),d.observe(i.guard)}function m(n){const o=n.map(({webformatURL:r,largeImageURL:s,tags:e,likes:t,views:a,comments:p,downloads:g})=>`
        <div class="photo-card">
          <img src="${r}" alt="${e}" loading="lazy" class="photo-image"/>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <br>
              ${t}
            </p>
            <p class="info-item">
              <b>Views</b>
              <br>
              ${a}
            </p>
            <p class="info-item">
              <b>Comments</b>
              <br>
              ${p}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <br>
              ${g}
            </p>
          </div>
        </div>
      `).join("");i.gallery.insertAdjacentHTML("beforeend",o)}function v(n){n.forEach(o=>{o.isIntersecting&&(c+=1,f(l,c).then(r=>{const{data:{hits:s,totalHits:e}}=r;i.gallery.insertAdjacentHTML("beforeend",m(s)),c*u>=e&&d.unobserve(i.guard)}).catch(r=>console.log(r)))})}
//# sourceMappingURL=commonHelpers.js.map
