import{S as y,i as b,a as L}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u=40,i={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),guard:document.querySelector(".js-guard")};i.form.addEventListener("submit",v);let c,l=1,d;const w={root:null,rootMargin:"300px",threshold:1},f=new IntersectionObserver(S,w);async function m(n,r=1){const s=new URLSearchParams({key:"9172745-088e6c545fefcd781d4229961",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:u}),o=await L.get("https://pixabay.com/api/",{params:s});if(o.status!==200)throw new Error(o.statusText||"Something went wrong");return o}async function v(n){n.preventDefault(),i.gallery.innerHTML="",c=n.target.elements.searchQuery.value.trim();const{data:{hits:r}}=await m(c);r.length?(g(r),d=new y(".gallery a"),f.observe(i.guard)):i.gallery.innerHTML="Sorry, there are no images matching your search query. Please try again."}function g(n){const r=n.map(({webformatURL:s,largeImageURL:o,tags:e,likes:t,views:a,comments:h,downloads:p})=>`
        <a href="${o}" class="photo-card">
          <div>
            <img src="${s}" alt="${e}" loading="lazy" class="photo-image"/>
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
                ${h}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br>
                ${p}
              </p>
            </div>
          </div>
        </a>
      `).join("");i.gallery.insertAdjacentHTML("beforeend",r)}function S(n){n.forEach(r=>{r.isIntersecting&&(l+=1,m(c,l).then(s=>{const{data:{hits:o,totalHits:e}}=s;i.gallery.insertAdjacentHTML("beforeend",g(o)),b.info({message:`Hooray! We found ${o.length} images.`}),d.refresh();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),l*u>=e&&f.unobserve(i.guard)}).catch(s=>console.log(s)))})}
//# sourceMappingURL=commonHelpers.js.map
