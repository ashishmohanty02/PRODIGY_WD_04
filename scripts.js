document.addEventListener('DOMContentLoaded', function () {
    'use strict';
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      return all ? document.querySelectorAll(el) : document.querySelector(el);
    };
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      const selectEl = select(el, all);
      if (selectEl) {
        all ? selectEl.forEach(e => e.addEventListener(type, listener)) : selectEl.addEventListener(type, listener);
      }
    };
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener);
    };
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      const header = select('#header');
      const offset = header.offsetHeight;
      const elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      });
    };
  
    /**
     * Back to top button
     */
    const backtotop = select('.back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        window.scrollY > 100 ? backtotop.classList.add('active') : backtotop.classList.remove('active');
      };
      window.addEventListener('load', toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
      select('#navbar').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    });
  
    /**
     * Smooth scroll to sections
     */
    on('click', '.navbar a', function (e) {
      if (this.hash) {
        e.preventDefault();
        scrollto(this.hash);
      }
    });
  
    /**
     * AOS initialization
     */
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  });
  