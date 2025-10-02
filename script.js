// ====== CONFIG ======
const REGISTER_LINK = "https://forms.gle/QjFgns9B8RgQeeep6"; // replace with your actual form link

// ====== Loader animation ======
const loaderPerc = document.getElementById('loaderPerc');
const loaderBar  = document.getElementById('loaderBar');
const loaderWrap = document.getElementById('loaderWrap');
const site = document.getElementById('site');

let perc = 0;
const fakeLoad = setInterval(() => {
  perc += Math.floor(Math.random() * 6) + 4; // lively feel
  if (perc >= 100) perc = 100;
  loaderPerc.textContent = perc + "%";
  loaderBar.style.width = perc + "%";
  if (perc >= 100) {
    clearInterval(fakeLoad);
    setTimeout(()=> {
      loaderWrap.style.opacity = "0";
      loaderWrap.style.transform = "scale(0.98)";
      setTimeout(()=>{
        loaderWrap.style.display = "none";
        site.classList.remove('hidden');
        AOS.init({ duration: 900, once: true });
        runHeroGSAP();
      }, 350);
    }, 400);
  }
}, 120);

// ====== GSAP hero animation ======
function runHeroGSAP(){
  if (typeof gsap !== "undefined") {
    gsap.from(".main-title", { y: 50, opacity: 0, duration: 1.1, ease: "power3.out" });
    gsap.from(".subtitle", { y: 20, opacity: 0, duration: 0.9, delay: 0.3 });
    gsap.from(".hero-cta", { scale: 0.95, opacity: 0, duration: 0.9, delay: 0.6 });
    gsap.from(".countdown-wrap", { y:20, opacity:0, duration:0.8, delay:0.9 });
  }
}

// ====== Register buttons ======
const regBtns = document.querySelectorAll('#registerBtn, #heroRegister');
regBtns.forEach(b=>{
  b.addEventListener('click', ()=> window.open(REGISTER_LINK,"_blank"));
});

// ====== Sticky nav effect & mobile toggle ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 40){
    navbar.style.background = "linear-gradient(90deg, rgba(2,2,2,0.96), rgba(10,10,10,0.96))";
    navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,0.6)";
  } else {
    navbar.style.background = "rgba(3,3,3,0.6)";
    navbar.style.boxShadow = "none";
  }
});
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// ====== Smooth scrolling ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });
});

// ====== Live countdown to Oct 11, 2025 ======
function updateCountdown(){
  const target = new Date("2025-10-11T09:00:00");
  const now = new Date();
  let diff = target - now;
  if(diff<0) diff=0;
  const days=Math.floor(diff/(1000*60*60*24));
  const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes=Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds=Math.floor((diff%(1000*60))/1000);
  document.getElementById('days').textContent=days;
  document.getElementById('hours').textContent=String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent=String(minutes).padStart(2,'0');
  document.getElementById('seconds').textContent=String(seconds).padStart(2,'0');
}
setInterval(updateCountdown,1000);
updateCountdown();
