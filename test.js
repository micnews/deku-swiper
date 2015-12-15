'use strict';

import test from 'tape';
import { renderString, tree } from 'deku';
import tsml from 'tsml';
import jsdom from 'jsdom';
import element from 'magic-virtual-element';

jsdom.env('', [], function (err, window) {
  if (err) {
    throw err;
  }

  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;

  var Swiper = require('./index');

  test('swiper', function (t) {
    var html = renderString(tree(
      <Swiper>
        <div class='slide-1'></div>
        <div class='slide-2'></div>
        <div class='slide-3'></div>
      </Swiper>
    ));

    t.equal(html, tsml`
      <div>
        <div class="swiper">
          <div class="swiper__inner">
            <div class="swiper__slide">
              <div class="slide-1"></div>
            </div>
            <div class="swiper__slide">
              <div class="slide-2"></div>
            </div>
            <div class="swiper__slide">
              <div class="slide-3"></div>
            </div>
          </div>
        </div>
        <div class="swiper__arrow swiper__arrow-left"></div>
        <div class="swiper__arrow swiper__arrow-right"></div>
      </div>`);
    t.end();
  });
});
