'use strict';
/** @jsx element */

import element from 'magic-virtual-element';
import extend from 'xtend';
export let name = 'Swiper';
let Swiper = null;

export function initialState (props) {
  return {
    swiper: null
  };
}

function prevClick (e, { state }, setState) {
  if (!state.swiper) {
    return;
  }

  state.swiper.slidePrev();
}

function nextClick (e, { state }, setState) {
  if (!state.swiper) {
    return;
  }

  state.swiper.slideNext();
}

export function render ({ props, state }) {
  var innerContent = props.children.map((el, index) => {
    return <div class='swiper__slide'>{el}</div>;
  });

  return (<div>
    <div class='swiper'>
      <div class='swiper__inner'>{innerContent}</div>
    </div>
    <div class='swiper__arrow swiper__arrow-left' onClick={prevClick}></div>
    <div class='swiper__arrow swiper__arrow-right' onClick={nextClick}></div>
  </div>);
}

export function afterRender ({ state }, el) {
  const { swiper } = state;

  if (swiper) {
    swiper.onResize();
  }
}

export function afterUpdate ({ state: { swiper }, props: { activeSlide } }) {
  if (swiper && typeof activeSlide === 'number') {
    swiper.slideTo(activeSlide);
  }
}

export function afterMount ({ props }, el, setState) {
  let swiper = null;
  if (!Swiper) {
    Swiper = require('swiper');
  }

  function forward (name) {
    return function () {
      if (swiper && props[name]) {
        props[name]({
          activeIndex: swiper.activeIndex,
          clickedIndex: swiper.clickedIndex
        });
      }
    };
  }

  const opts = extend(props, {
    wrapperClass: 'swiper__inner',
    slideClass: 'swiper__slide',
    slideActiveClass: 'swiper__slide__active',
    slideVisibleClass: 'swiper__slide__visible',
    slideDuplicateClass: 'swiper__slide__duplicate',
    slideNextClass: 'swiper__slide__next',
    slidePrevClass: 'swiper__slide__prev',
    onSlideChangeStart: forward('onSlideChangeStart'),
    onSlideChangeEnd: forward('onSlideChangeEnd'),
    onTransitionStart: forward('onTransitionStart'),
    onTransitionEnd: forward('onTransitionEnd'),
    onClick: forward('onClick'),
    initialSlide: props.activeSlide || 0
  });

  swiper = new Swiper(el.querySelector('.swiper'), opts);

  setState({
    swiper: swiper
  });
}

export default { initialState, render, afterRender, afterMount, afterUpdate };
