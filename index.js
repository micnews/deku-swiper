'use strict';
/** @jsx element */

import Swiper from 'swiper';
import element from 'magic-virtual-element';
export let name = 'Swiper';

export function initialState (props) {
  return {
    swiper: null
  };
}

export function render ({ props, state }) {
  var innerContent = props.children.map((el, index) => {
    return <div class='swiper__slide'>{el}</div>;
  });

  return (<div class='swiper'>
    <div class='swiper__inner'>{innerContent}</div>
  </div>);
}

export function afterRender ({ state }, el) {
  const { swiper } = state;

  if (swiper) {
    swiper.onResize();
  }
}

export function afterMount ({ props }, el, setState) {
  let swiper = null;

  function handleSlideChangeStart () {
    if (swiper && props['onSlideChangeStart']) {
      props['onSlideChangeStart'](swiper.activeIndex);
    }
  }

  function handleSlideChangeEnd () {
    if (swiper && props['onSlideChangeEnd']) {
      props['onSlideChangeEnd'](swiper.activeIndex);
    }
  }

  function handleTransitionStart () {
    if (swiper && props['onTransitionStart']) {
      props['onTransitionStart'](swiper.activeIndex);
    }
  }

  function handleTransitionEnd () {
    if (swiper && props['onTransitionEnd']) {
      props['onTransitionEnd'](swiper.activeIndex);
    }
  }

  swiper = new Swiper(el, {
    wrapperClass: 'swiper__inner',
    slideClass: 'swiper__slide',
    slideActiveClass: 'swiper__slide__active',
    slideVisibleClass: 'swiper__slide__visible',
    slideDuplicateClass: 'swiper__slide__duplicate',
    slideNextClass: 'swiper__slide__next',
    slidePrevClass: 'swiper__slide__prev',
    slidesPerView: props['slides-per-view'],
    centeredSlides: props['centered-slides'],
    initialSlide: props['initial-slide'],
    onSlideChangeStart: handleSlideChangeStart,
    onSlideChangeEnd: handleSlideChangeEnd,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd
  });

  setState({
    swiper: swiper
  });
}

export default { initialState, render, afterRender, afterMount };
