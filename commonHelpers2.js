import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as s}from"./assets/vendor-8d2a943f.js";const c=document.querySelector('input[name="delay"]'),i=document.querySelector('input[value="fulfilled"]'),l=document.querySelector('input[value="rejected"]'),u=document.querySelector("form");u.addEventListener("submit",o=>{o.preventDefault();const t=parseInt(c.value,10);new Promise((e,r)=>{setTimeout(()=>{i.checked?e(t):l.checked&&r(t)},t)}).then(e=>{s.success({title:"Success",message:`Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Error",message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map