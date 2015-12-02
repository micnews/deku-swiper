'use strict';
/** @jsx element */

import Swiper from 'swiper';
import element from 'magic-virtual-element';
export let name = 'Swiper';

function initialState (props) {
  return {
    swiper: null
  }
}

function render ({ props, state }) {
  var innerContent = props.children.map((el, index) => {
    return <div class='swiper__slide'>{el}</div>;
  });

  return <div class='swiper'>
    <div class='swiper__inner'>{innerContent}</div>
  </div>;
}

function afterMount (component, el, setState) {
  var swiper = new Swiper(el, {
    wrapperClass: 'swiper__inner',
    slideClass: 'swiper__slide',
    slideActiveClass: 'swiper__slide__active',
    slideVisibleClass: 'swiper__slide__visible',
    slideDuplicateClass: 'swiper__slide__duplicate',
    slideNextClass: 'swiper__slide__next',
    slidePrevClass: 'swiper__slide__prev',
    slidesPerView: 2,
    centeredSlides: true
  });

  setState({
    swiper: swiper
  });
}

export default { initialState, render, afterMount };
