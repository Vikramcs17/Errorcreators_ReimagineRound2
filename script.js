document.addEventListener('DOMContentLoaded', function() {
  const menuOpen = document.querySelector('.menu-open');
  const menuClose = document.querySelector('.menu-close');
  const navContainer = document.querySelector('.nav-container');
  const page1 = document.querySelector('.page1');

  menuOpen.addEventListener('click', function() {
      navContainer.classList.add('show');
      page1.classList.add('hidden'); // Hide video behind navbar
  });

  menuClose.addEventListener('click', function() {
      console.log('Close button clicked'); // Debugging log
      navContainer.classList.remove('show');
      page1.classList.remove('hidden'); // Show video
      console.log("hello")
  });

  function changeVideo(name) {
      const bgVideoList = document.querySelectorAll('.bg-video');
      const models = document.querySelectorAll('.model');

      bgVideoList.forEach(video => {
          video.classList.remove('active');
          if (video.classList.contains(name)) {
              video.classList.add('active');
          }
      });

      models.forEach(model => {
          model.classList.remove('active');
          if (model.classList.contains(name)) {
              model.classList.add('active');
          }
      });
  }

  // Expose changeVideo function to global scope
  window.changeVideo = changeVideo;
});
const beforeAfterSlider = document.querySelector('.before-after-slider')
const imgBefore = document.querySelector('.img-before')
const line = document.querySelector('.before-line')

beforeAfterSlider.addEventListener('mousemove',e=>{
imgBefore.style.width =`${e.layerX}px`
line.style.left =`${e.layerX}px`

})


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

var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        // Adjust to show pagination for up to 6 slides
        var titles = [
          "DYNAMIC DRIVING",
          "TRANSMISSIONS",
          "SUSPENSION",
          "STEERING",
          "BRAKES",
          "EXHAUST"
        ];
        // Only render bullets for the first 6 slides
        if (index < 6) {
          return '<span class="' + className + ' swiper-pagination-text">' + titles[index] + '</span>';
        } else {
          return ''; // Do not render pagination for slides beyond the 6th
        }
      },
      bulletClass: 'swiper-pagination-text',
      bulletActiveClass: 'swiper-pagination-text-active'
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1, // Adjust this as needed
    loop: true // Set to true if you want looping behavior
  });

// footer
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".contact-link").addEventListener("click", (e)=>{
    e.preventDefault();
    document.querySelector(".footer-wrapper").scrollIntoView({ behavior: "smooth" });
});

// PAGE 6 JS 

const videoOverLay1 = document.querySelector("#video-over1");
const tl6 = gsap.timeline({
  scrollTrigger: {
      trigger: videoOverLay1,
      start: "center center",
      end: "bottom 5%",
      scrub: true,
      pin: false,
  },
});
tl6.to(videoOverLay1, {
  scale: 3,
  opacity: 0,
});
const videoOverLay2 = document.querySelector("#video-over2");
const tl7 = gsap.timeline({
  scrollTrigger: {
      trigger: videoOverLay2,
      start: "center center",
      end: "bottom 5%",
      scrub: true,
      pin: false,
  },
});
tl7.to(videoOverLay2, {
  scale: 3,
  opacity: 0,
});
const videoOverLay3 = document.querySelector("#video-over3");
const tl8 = gsap.timeline({
  scrollTrigger: {
      trigger: videoOverLay3,
      start: "center center",
      end: "bottom 5%",
      scrub: true,
      pin: false,
  },
});
tl8.to(videoOverLay3, {
  scale: 3,
 opacity:0,
});



//   let elem = document.querySelectorAll(".elem")
//   let left = document.querySelector('.left')

//   elem.forEach(function (e) {
//       e.addEventListener("mouseenter", function (dets) {
//           gsap.to(this.querySelector('.picture'), {
//               opacity: 1,
//               scale: 1
//           })
//           let data = e.getAttribute('data-image')
//           left.style.backgroundImage = url(${data})

//       })
//       e.addEventListener("mouseleave", function (dets) {
//           gsap.to(this.querySelector('.picture'), {
//               opacity: 0,
//               scale: 0
//           })
//       })
//       e.addEventListener("mousemove", function (dets) {
//           gsap.to(this.querySelector('.picture'), {
//               x: gsap.utils.mapRange(0, window.innerWidth, -500, 300, dets.clientX),
//               y: gsap.utils.mapRange(0, window.innerHeight, -50, 100, dets.clientY),
//               opacity: 1,
//               scale: 1
//           })
//           left.style.backgroundImage = url(${data})

//       })
//   })
//   let tl = gsap.timeline({
//       delay: .3
//   })
//   tl.from(".footer h1 span", {
//       opacity: 0,
//       stagger: .2,
//       duration: .5,
//   })
//   tl.from('.footer h3', {
//       x: 40,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2
//   })
//   tl.from(".page-1", {
//       opacity: 0,
//       ease: Power4
//   })

//   tl.from(".navbar", {
//       y: -400
//   })

//   tl.from(".lists h4:nth-child(odd)", {
//       y: 400,
//       stagger: .3,
//       duration: .7
//   }, 'a')
//   tl.from(".lists h4:nth-child(even)", {
//       y: -400,
//       stagger: .3,
//       duration: .7
//   }, 'a')

//   tl.from(".heading h1 span", {
//       opacity: 0,
//       stagger: .2,
//       duration: .5,
//   }, 'c')
//   tl.from(".side-text h1 span", {
//       opacity: 0,
//       stagger: .2,
//       duration: .5,
//   }, 'c')
//   tl.from(".page-1 h3:nth-child(odd)", {
//       y: 400,
//       stagger: .3,
//       duration: .5
//   }, 'b')
//   tl.from(".page-1 h3:nth-child(even)", {
//       y: -400,
//       stagger: .3,
//       duration: .5
//   }, 'b')
//   tl.to(".page-1 button", {
//       opacity: 1,
//       duration: .5
//   })
//   tl.from(".absolute", {
//       x: 550,
//       duration: .3
//   })
//   let video = document.querySelector('.video video')
//   gsap.to(video, {
//       scrollTrigger: {
//           trigger: video,
//           start: '5% top',
//           end: 'bottom top',
//           scrub: 1
//       },
//       onStart: () => {
//           video.play()
//       }
//   })
//   gsap.to('.video', {
//       scrollTrigger: {
//           trigger: '.video',
//           start: '3% top',
//           end: 'bottom top',
//           scrub: 1,
//           pin: true
//       },
//   })
//   gsap.from(".back h1", {
//       scrollTrigger: {
//           trigger: ".back h1",
//           start: "top 40%",
//           end: "bottom 80%",
//           scrub: 1,
//       },
//       y: 200,
//       stagger: .3,
//       duration: .3
//   })
//   gsap.to(".front", {
//       scrollTrigger: {
//           trigger: ".page-4",
//           start: "80% top",
//           end: "top top",
//           scrub: 1,
//       },
//       left: 0,
//       duration: .2,
//   })

