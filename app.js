const emergency=[
 {i:"🚑",n:"অ্যাম্বুলেন্স",p:"জরুরি চিকিৎসা সহায়তা",t:"102"},
 {i:"🚒",n:"ফায়ার সার্ভিস",p:"আগুন/উদ্ধার জরুরি সেবা",t:"101"},
 {i:"👮",n:"পুলিশ",p:"জরুরি পুলিশ সহায়তা",t:"100"},
 {i:"🏥",n:"নিকটস্থ হাসপাতাল",p:"আপনার এলাকার হাসপাতালের নম্বর বসান",t:""}
];
const services=[
 {i:"⚡",n:"ইলেকট্রিশিয়ান",p:"বিদ্যুৎ সংক্রান্ত কাজের লোক",t:""},
 {i:"🔧",n:"প্লাম্বার",p:"পাইপ/জল সংক্রান্ত কাজ",t:""},
 {i:"🧱",n:"রাজমিস্ত্রি",p:"বাড়ি নির্মাণ ও মেরামত",t:""},
 {i:"👷",n:"দৈনিক শ্রমিক",p:"স্থানীয় কাজের লোক",t:""}
];
const markets=[
 {i:"🛒",n:"মুদি দোকান",p:"দৈনন্দিন প্রয়োজনীয় জিনিস",t:""},
 {i:"🥬",n:"স্থানীয় বাজার",p:"সবজি, মাছ, মাংস ও অন্যান্য",t:""},
 {i:"💊",n:"ফার্মেসি",p:"ওষুধ ও প্রয়োজনীয় সামগ্রী",t:""},
 {i:"🥛",n:"দুধ/খাবারের দোকান",p:"স্থানীয় খাবার ও প্রয়োজনীয় পণ্য",t:""}
];
const helplines=[
 {i:"👩",n:"নারী সহায়তা",p:"উদাহরণ নম্বর—প্রকাশের আগে যাচাই করুন",t:"181"},
 {i:"🧒",n:"শিশু সহায়তা",p:"উদাহরণ নম্বর—প্রকাশের আগে যাচাই করুন",t:"1098"}
];
const notices=[
 {t:"স্থানীয় ঘোষণা",d:"এখানে আপনার এলাকার নতুন নোটিশ, ক্যাম্প বা গুরুত্বপূর্ণ ঘোষণা লিখুন।"},
 {t:"তথ্য আপডেট",d:"স্থানীয় সেবা প্রদানকারীর ফোন নম্বর ও ঠিকানা যাচাই করে নিয়মিত আপডেট করুন।"}
];
function card(x){
 const btn=x.t?`<a class="call" href="tel:${x.t}">📞 কল করুন</a>`:`<span class="call" style="opacity:.55">নম্বর যোগ করুন</span>`;
 return `<article class="card" data-search="${(x.n+" "+x.p).toLowerCase()}"><button class="fav" onclick="this.textContent=this.textContent==='☆'?'★':'☆'">☆</button><div class="icon">${x.i}</div><h3>${x.n}</h3><p>${x.p}</p>${btn}</article>`;
}
document.getElementById("emergencyGrid").innerHTML=emergency.map(card).join("");
document.getElementById("serviceGrid").innerHTML=services.map(card).join("");
document.getElementById("marketGrid").innerHTML=markets.map(card).join("");
document.getElementById("helplineGrid").innerHTML=helplines.map(card).join("");
document.getElementById("noticeList").innerHTML=notices.map(x=>`<div class="notice"><strong>${x.t}</strong><div>${x.d}</div></div>`).join("");
document.getElementById("search").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase().trim();
 document.querySelectorAll(".card").forEach(el=>el.style.display=!q||el.dataset.search.includes(q)?"block":"none");
});
let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").hidden=false});
document.getElementById("installBtn").addEventListener("click",async()=>{
 if(!deferredPrompt)return;
 deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null;
});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
