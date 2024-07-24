
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function changeVideo(name){
  const bgVideoList = document.querySelectorAll('.bg-video')
  const models = document.querySelectorAll('.model')

  bgVideoList.forEach(video =>{
      video.classList.remove('active')
      if(video.classList.contains(name)){
          video.classList.add('active')
      }
  })

  models.forEach(model =>{
      model.classList.remove('active')
      if(model.classList.contains(name)){
          model.classList.add('active')
      }
  })
}

const beforeAfterSlider = document.querySelector('.before-after-slider')
const imgBefore = document.querySelector('.img-before')
const line = document.querySelector('.before-line')

beforeAfterSlider.addEventListener('mousemove',e=>{
imgBefore.style.width =`${e.layerX}px`
line.style.left =`${e.layerX}px`

})

const container = document.querySelector('.container1');
const nav = document.querySelector('nav');
var tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });

container.addEventListener('click', () => {
  if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      container.classList.remove('hide');
  } else {
      nav.classList.add('show');
      container.classList.add('hide');
  }
});

const blobCursor = (() => {  
const cursor = document.querySelector('#cursorBlob');
const links = document.querySelectorAll('.nav__link');
const setCursorPos = (e) => {
  const { pageX: posX, pageY: posY } = e;
  cursor.style.top = `${posY - (cursor.offsetHeight / 2)}px`;
  cursor.style.left = `${posX - (cursor.offsetWidth / 2)}px`;
};
document.addEventListener('mousemove', setCursorPos);

const setCursorHover = () => cursor.style.transform = 'scale(2.5)';
const removeCursorHover = () => cursor.style.transform = '';
links.forEach(link => link.addEventListener('mouseover', setCursorHover));
links.forEach(link => link.addEventListener('mouseleave', removeCursorHover));  
})();  


const link = document.querySelectorAll('.link');
const linkHoverReveal = document.querySelectorAll('.hover-reveal');
const linkImages = document.querySelectorAll('.hidden-img');


for(let i = 0; i < link.length; i++) {
link[i].addEventListener('mousemove', (e) => {
  linkHoverReveal[i].style.opacity = 1;
  linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(5deg)`;
  linkImages[i].style.transform = 'scale(1, 1)';
  linkHoverReveal[i].style.left = e.clientX + "px";
})

link[i].addEventListener('mouseleave', (e) => {
  linkHoverReveal[i].style.opacity = 0;
  linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
  linkImages[i].style.transform = 'scale(0.8, 0.8)';
})
}


// Variables
const el = document.querySelector(".title-marquee");

// Variables ~ Widths
let elWidth = el.offsetWidth;
let windowWidth = window.innerWidth;

// Variables ~ Mouse
let mouseX = 0;
let prevMouseX = 0;

// Target: value we want to animate to
let skewTarget = 0;
let translateTarget = 0;

// WithEasing: value we use to animate
let skewWithEasing = 0;
let translateWithEasing = 0;

// EasingFactor: determines how quick the animation/interpolation goes
let skewEasingFactor = 0.1;
let translateEasingFactor = 0.05;

// Events
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

// Functions
function handleMouseMove(e) {
  mouseX = e.pageX;
}

function handleWindowResize(e) {
  elWidth = el.offsetWidth;
  windowWidth = window.innerWidth;
}

function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end;
}

function animateMe() {
  // Get difference between current and previous mouse position
  skewTarget = mouseX - prevMouseX;
  prevMouseX = mouseX;

  // Calc how much we need to translate our el
  translateTarget = (elWidth - windowWidth) / windowWidth * mouseX * -1;

  // Ease between start and target values (skew)
  skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

  // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
  skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

  // Ease between start and target values (translate)
  translateWithEasing = lerp(
  translateWithEasing,
  translateTarget,
  translateEasingFactor);


  el.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;

  // RAF
  window.requestAnimationFrame(animateMe);
}

window.requestAnimationFrame(animateMe);


gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  const sections = gsap.utils.toArray('section');

  let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
          trigger: '.history',
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          start: 'top top',
          end: 3000,
      }
  })

  gsap.to('.History-heading', {
      fontSize: '2.5rem',
      top: '4rem',
      scrollTrigger: {
          trigger: '.logo',
          start: 'top top',
          end: 1500,
          scrub: 0.5,
      }
  })

  gsap.to('.line', {
      height: '10rem',
      scrollTrigger: {
          trigger: '.line',
          scrub: 0.5,
          start: 'center center',
          end: 2000,
      }
  })

  document.querySelectorAll('.character').forEach(el => {

      gsap.to(el.querySelector('.caption'), {
          x: 0,
          y: 0,
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.caption'),
              start: 'top bottom',
              end: '+=1000',
              scrub: 0.5,
          }
      })

      gsap.to(el.querySelector('.quote'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.quote'),
              start: 'top bottom',
              end: '+=20%',
              scrub: 0.5,
          }
      })

      gsap.to(el.querySelector('.nickname'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.nickname'),
              start: 'top bottom',
              end: '+=10%',
              scrub: 0.5,
          }
      })

      gsap.to(el.querySelector('.block'), {
          x: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.block'),
              start: 'top bottom',
              end: '+=' + window.innerWidth,
              scrub: 0.5,
          }
      })

      gsap.to(el.querySelector('img'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('img'),
              start: 'top bottom',
              end: '+=50%',
              scrub: 0.5,
          }
      })

      gsap.to(el.querySelector('.huge-text'), {
          y: 0,
          ease: 'none',
          scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el.querySelector('.huge-text'),
              start: 'top bottom',
              end: '+=100%',
              scrub: 0.5,
          }
      })

  })

})

