
// Header ==============================================

const burger = document.querySelector('.header__catalog');
const burgerMenu = document.querySelector('.header-catalog');
const cart = document.querySelector(`.header__cart`);
const cartMenu = document.querySelector(`.header-cart`);
const closeCartMenu = document.querySelector(`.header-cart__cart-content--close`);
const header = document.querySelector(`.header`);
const body = document.body;
const main = document.querySelector(`.main`);
const itemCatalog = document.querySelector(`.header-catalog__items`);
const itemsCatalog = document.querySelectorAll(`.header-catalog__item`);

addEventListener("click", openBurger);
closeCartMenu.addEventListener("click", closeCart)
itemsCatalog.forEach(item => {
   item.addEventListener('mouseenter', selectSectionCatalog);
})

function openBurger(e) {

   if (e.target.closest('.header__catalog')) {
      burger.classList.toggle('active');
      burgerMenu.classList.toggle('active');
      body.classList.toggle('lock')
   }
   if (!e.target.closest('.header-catalog') && !e.target.closest('.header__catalog')) {
      burger.classList.remove('active');
      burgerMenu.classList.remove('active');
   }

   if (e.target.closest('.header__cart')) {
      if (!cart.classList.contains('active')) {
         cart.classList.toggle('active')
      }
      if (!cartMenu.classList.contains('active')) {
         cartMenu.classList.toggle('active')
      }
      if (!header.classList.contains('lock')) {
         header.classList.toggle('lock')
      }
      if (!body.classList.contains('lock')) {
         body.classList.toggle('lock')
      }
   }
   if (!e.target.closest('.header__cart') && !e.target.closest('.header-cart')) {
      cart.classList.remove('active');
      cartMenu.classList.remove('active');
      header.classList.remove('lock')
   }
   if (!e.target.closest('.header__cart') && !e.target.closest('.header-cart') && !e.target.closest('.header-catalog') && !e.target.closest('.header__catalog')) {
      if (body.classList.contains('lock')) {
         body.classList.remove('lock')
      }
   }
}

function closeCart() {
   if (cart.classList.contains('active')) {
      cart.classList.remove('active')
   }
   if (cartMenu.classList.contains('active')) {
      cartMenu.classList.remove('active')
   }
   if (header.classList.contains('lock')) {
      header.classList.remove('lock')
   }
   if (body.classList.contains('lock')) {
      body.classList.remove('lock')
   }
}

function selectSectionCatalog(e){
   let el = e.target;
   if (el.classList.contains('header-catalog__item')){
      itemsCatalog.forEach(item => {
         if (item.classList.contains('header-catalog__item--hovered')){
            item.classList.remove('header-catalog__item--hovered');
         }
      })
      el.classList.toggle('header-catalog__item--hovered');
   }
}

// Navigation ==============================================


// Перебирає всі ці посилання й отримує їх посилання

const allA = body.querySelectorAll('a').forEach((link) => {

   // Якщо є то прибирає з посилань #

   let href = link.getAttribute('href');
   let target = link.getAttribute('target');
   if (href && href.length > 1) {
      href = href.split('#')[1];
   }
   link.addEventListener("click", function (e) {
      if (href && !target) {
         e.preventDefault();
         if (document.documentElement.style.scrollPaddingTop != `${header.offsetHeight}px`) {
            document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
         }
         if (href && href.length !== 0) {

            // Шукає елемент з таким же id як і посилання

            var el = document.getElementById(href);
         }

         // Якщо посилання не пусте й воно є на сторінці то просткролює до нього

         if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
         } else {
            window.scrollTo(0, 0);
         }
      }
   });
});

// Animation by using dataSet Attribute ====================

const startPage = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         if (entry.target.classList.contains('anim')) {
            setTimeout(function () {
               entry.target.classList.remove('anim');
               startPage.unobserve(entry.target);
            }, (entry.target.dataset.start * 1000))
         }
      }
   })
})

const repeatAnimationElementPage = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         if (entry.target.dataset.anim) {
            setTimeout(function () {
               if (!entry.target.classList.contains('anim')) {
                  entry.target.classList.add('anim');
               }
            }, (entry.target.dataset.anim * 1000))
         } else {
            if (!entry.target.classList.contains('anim')) {
               entry.target.classList.add('anim')
            }
         }
      } else {
         if (entry.target.dataset.anim) {
            setTimeout(function () {
               if (entry.target.classList.contains('anim')) {
                  entry.target.classList.remove('anim')
               }
            }, (entry.target.dataset.anim * 1000))
         } else {
            if (entry.target.classList.contains('anim')) {
               entry.target.classList.remove('anim')
            }
         }
      }
   })
}, {
   threshold: 0.5,
})

document.querySelectorAll(`[data-start]`).forEach((initialAnimation) => {
   if (!initialAnimation.classList.contains('anim')) {
      initialAnimation.classList.add('anim')
   }
   startPage.observe(initialAnimation)
})

document.querySelectorAll(`[data-anim]`).forEach((initialAnimation) => {
   repeatAnimationElementPage.observe(initialAnimation)
})
