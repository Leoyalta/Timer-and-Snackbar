import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as c,f as S}from"./assets/vendor-A92OCY9B.js";c.settings({resetOnHover:!0,color:"red",position:"topRight"});const s=document.querySelector("#datetime-picker"),t=document.querySelector("[data-start]"),r=document.querySelector(".timer"),b=r.querySelector("[data-days]"),p=r.querySelector("[data-hours]"),v=r.querySelector("[data-minutes]"),q=r.querySelector("[data-seconds]");let i=null;const L={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){i=e[0],i<=Date.now()?(c.show({title:"Warning",message:"Please choose a date in the future"}),t.disabled=!0,t.classList.toggle("disabled"),s.classList.toggle("disabled")):(t.disabled=!1,t.classList.remove("disabled"),s.classList.add("active"),s.classList.remove("disabled"))}};S(s,L);t.addEventListener("click",T);function l({days:e,hours:o,minutes:n,seconds:d}){b.textContent=e,p.textContent=o,v.textContent=n,q.textContent=d}let u=null;function T(){u=setInterval(()=>{const e=Date.now(),o=i-e;if(o<=0){clearInterval(u),l(m(0)),c.show({title:"Finished!",message:"Timer finished!"});return}const n=m(o);l(n)},1e3),s.disabled=!0,t.disabled=!0}function a(e){return String(e).padStart(2,"0")}function m(e){const h=a(Math.floor(e/864e5)),f=a(Math.floor(e%864e5/36e5)),y=a(Math.floor(e%864e5%36e5/6e4)),g=a(Math.floor(e%864e5%36e5%6e4/1e3));return{days:h,hours:f,minutes:y,seconds:g}}
//# sourceMappingURL=1-timer.js.map
