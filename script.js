var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

});

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

