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





