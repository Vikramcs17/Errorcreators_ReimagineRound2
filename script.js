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
