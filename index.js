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

export function afterMount ({ props }, el, setState) {
  let swiper = null;
  if (!Swiper) {
    Swiper = require('swiper');
  }

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

  const opts = extend(props, {
    wrapperClass: 'swiper__inner',
    slideClass: 'swiper__slide',
    slideActiveClass: 'swiper__slide__active',
    slideVisibleClass: 'swiper__slide__visible',
    slideDuplicateClass: 'swiper__slide__duplicate',
    slideNextClass: 'swiper__slide__next',
    slidePrevClass: 'swiper__slide__prev',
    onSlideChangeStart: handleSlideChangeStart,
    onSlideChangeEnd: handleSlideChangeEnd,
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    onClick: function (swiper, e) {
      // TODO: swiper click
    }
  });

  swiper = new Swiper(el.querySelector('.swiper'), opts);

  setState({
    swiper: swiper
  });
}

export default { initialState, render, afterRender, afterMount };
