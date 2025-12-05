/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function() {

(function (root, $, undefined) {
  'use strict';

  $(function () {
    // DOM ready, take it away

    // Section slider
    var sliderSections = $('.er-slider');
    if (sliderSections.length) {
      sliderSections.each(function () {
        $(this).attr('class', 'er-slider swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).append('<div class="swiper-pagination"></div>');
        $(this).children().children().attr('class', 'swiper-slide');
        var pagination = $(this).find('.swiper-pagination');
        var swiper = new Swiper(this, {
          loop: true,
          speed: 500,
          pagination: {
            el: pagination[0],
            clickable: true
          }
        });
      });
    }

    // Hero Slider
    var sliderHeroSections = $('.er-slider-hero');
    if (sliderHeroSections.length) {
      sliderHeroSections.each(function () {
        $(this).attr('class', 'er-slider-hero swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).append('<div class="swiper-pagination"></div>');
        $(this).children().children().attr('class', 'swiper-slide');
        var pagination = $(this).find('.swiper-pagination');
        var swiper = new Swiper(this, {
          loop: true,
          speed: 500,
          autoplay: {
            delay: 5000
          },
          pagination: {
            el: pagination[0],
            clickable: true
          }
        });
        console.log(swiper);
      });
    }

    // Section slider logos
    var sliderLogosSections = $('.et-slider-logos .elementor-image-gallery');
    if (sliderLogosSections.length) {
      sliderLogosSections.each(function () {
        $(this).attr('class', 'er-slider swiper');
        $(this).children().attr('class', 'swiper-wrapper');
        $(this).children().children().attr('class', 'swiper-slide');
        var swiper = new Swiper(this, {
          spaceBetween: 0,
          centeredSlides: true,
          speed: 6000,
          autoplay: {
            delay: 1
          },
          loop: true,
          slidesPerView: 5,
          allowTouchMove: false,
          disableOnInteraction: true,
          breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 0
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 0
            }
          }
        });
      });
    }
    var navButtons = document.querySelectorAll('.er-accordion-nav button');
    var accordionItems = document.querySelectorAll('.er-accordion .e-n-accordion-item');
    if (navButtons.length === 0 || accordionItems.length === 0) {
      return;
    }
    navButtons.forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        navButtons.forEach(function (b) {
          return b.classList.remove('active');
        });
        btn.classList.add('active');
        accordionItems[index].querySelector('.e-n-accordion-item-title').click();

        // Optional: Scroll to accordion
        setTimeout(function () {
          $('html, body').animate({
            scrollTop: $(accordionItems[index]).offset().top - 100
          }, 500);
        }, 500);
      });
    });
    accordionItems.forEach(function (item, index) {
      var title = item.querySelector('.e-n-accordion-item-title');
      title.addEventListener('click', function () {
        // Remove active class from all buttons
        navButtons.forEach(function (b) {
          return b.classList.remove('active');
        });
        navButtons[index].classList.add('active');
      });
    });
    var hash = window.location.hash;
    navButtons.forEach(function (btn) {
      if (btn.dataset.target === hash) {
        if (btn.classList.contains('active')) return;
        btn.click();
      }
    });
    var leasingCalculator;
    if ($("#lur_main_layout").length > 0) {
      if ($("#calculator-container").length > 0) $("#calculator-container").append($("#lur_main_layout"));
      leasingCalculator = new LeasingCalculator($("#lur_main_layout"));
    }
    $(".expand-btn").on("click", function (e) {
      e.preventDefault();
      $($(this).data("show")).toggleClass("active");
      $($(this).data("hide")).removeClass("active");
      if ($($(this).data("show")).hasClass("active")) $(this).text($(this).data("text-active"));else $(this).text($(this).data("text"));
      return false;
    });
  });
})(this, jQuery);

/***/ }),

/***/ "./src/js/calculator.js":
/*!******************************!*\
  !*** ./src/js/calculator.js ***!
  \******************************/
/***/ (() => {

function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var euroradCalc = function (Kl) {
  "use strict";

  function Ds(c) {
    return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c["default"] : c;
  }
  var Ks = {
      exports: {}
    },
    ee = {}; /**
             * @license React
             * react.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
  var Us;
  function ic() {
    if (Us) return ee;
    Us = 1;
    var c = Symbol["for"]("react.element"),
      r = Symbol["for"]("react.portal"),
      u = Symbol["for"]("react.fragment"),
      S = Symbol["for"]("react.strict_mode"),
      v = Symbol["for"]("react.profiler"),
      P = Symbol["for"]("react.provider"),
      C = Symbol["for"]("react.context"),
      N = Symbol["for"]("react.forward_ref"),
      L = Symbol["for"]("react.suspense"),
      B = Symbol["for"]("react.memo"),
      T = Symbol["for"]("react.lazy"),
      Z = Symbol.iterator;
    function z(p) {
      return p === null || _typeof(p) != "object" ? null : (p = Z && p[Z] || p["@@iterator"], typeof p == "function" ? p : null);
    }
    var K = {
        isMounted: function isMounted() {
          return !1;
        },
        enqueueForceUpdate: function enqueueForceUpdate() {},
        enqueueReplaceState: function enqueueReplaceState() {},
        enqueueSetState: function enqueueSetState() {}
      },
      X = Object.assign,
      Y = {};
    function G(p, w, q) {
      this.props = p, this.context = w, this.refs = Y, this.updater = q || K;
    }
    G.prototype.isReactComponent = {}, G.prototype.setState = function (p, w) {
      if (_typeof(p) != "object" && typeof p != "function" && p != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, p, w, "setState");
    }, G.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    };
    function J() {}
    J.prototype = G.prototype;
    function oe(p, w, q) {
      this.props = p, this.context = w, this.refs = Y, this.updater = q || K;
    }
    var ce = oe.prototype = new J();
    ce.constructor = oe, X(ce, G.prototype), ce.isPureReactComponent = !0;
    var le = Array.isArray,
      Ee = Object.prototype.hasOwnProperty,
      ge = {
        current: null
      },
      pe = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      };
    function Q(p, w, q) {
      var te,
        ie = {},
        se = null,
        me = null;
      if (w != null) for (te in w.ref !== void 0 && (me = w.ref), w.key !== void 0 && (se = "" + w.key), w) Ee.call(w, te) && !pe.hasOwnProperty(te) && (ie[te] = w[te]);
      var de = arguments.length - 2;
      if (de === 1) ie.children = q;else if (1 < de) {
        for (var ke = Array(de), lt = 0; lt < de; lt++) ke[lt] = arguments[lt + 2];
        ie.children = ke;
      }
      if (p && p.defaultProps) for (te in de = p.defaultProps, de) ie[te] === void 0 && (ie[te] = de[te]);
      return {
        $$typeof: c,
        type: p,
        key: se,
        ref: me,
        props: ie,
        _owner: ge.current
      };
    }
    function ne(p, w) {
      return {
        $$typeof: c,
        type: p.type,
        key: w,
        ref: p.ref,
        props: p.props,
        _owner: p._owner
      };
    }
    function Ge(p) {
      return _typeof(p) == "object" && p !== null && p.$$typeof === c;
    }
    function mt(p) {
      var w = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + p.replace(/[=:]/g, function (q) {
        return w[q];
      });
    }
    var _ = /\/+/g;
    function fe(p, w) {
      return _typeof(p) == "object" && p !== null && p.key != null ? mt("" + p.key) : w.toString(36);
    }
    function rt(p, w, q, te, ie) {
      var se = _typeof(p);
      (se === "undefined" || se === "boolean") && (p = null);
      var me = !1;
      if (p === null) me = !0;else switch (se) {
        case "string":
        case "number":
          me = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case c:
            case r:
              me = !0;
          }
      }
      if (me) return me = p, ie = ie(me), p = te === "" ? "." + fe(me, 0) : te, le(ie) ? (q = "", p != null && (q = p.replace(_, "$&/") + "/"), rt(ie, w, q, "", function (lt) {
        return lt;
      })) : ie != null && (Ge(ie) && (ie = ne(ie, q + (!ie.key || me && me.key === ie.key ? "" : ("" + ie.key).replace(_, "$&/") + "/") + p)), w.push(ie)), 1;
      if (me = 0, te = te === "" ? "." : te + ":", le(p)) for (var de = 0; de < p.length; de++) {
        se = p[de];
        var ke = te + fe(se, de);
        me += rt(se, w, q, ke, ie);
      } else if (ke = z(p), typeof ke == "function") for (p = ke.call(p), de = 0; !(se = p.next()).done;) se = se.value, ke = te + fe(se, de++), me += rt(se, w, q, ke, ie);else if (se === "object") throw w = String(p), Error("Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead.");
      return me;
    }
    function Qe(p, w, q) {
      if (p == null) return p;
      var te = [],
        ie = 0;
      return rt(p, te, "", "", function (se) {
        return w.call(q, se, ie++);
      }), te;
    }
    function Oe(p) {
      if (p._status === -1) {
        var w = p._result;
        w = w(), w.then(function (q) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = q);
        }, function (q) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = q);
        }), p._status === -1 && (p._status = 0, p._result = w);
      }
      if (p._status === 1) return p._result["default"];
      throw p._result;
    }
    var ye = {
        current: null
      },
      F = {
        transition: null
      },
      W = {
        ReactCurrentDispatcher: ye,
        ReactCurrentBatchConfig: F,
        ReactCurrentOwner: ge
      };
    function b() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    return ee.Children = {
      map: Qe,
      forEach: function forEach(p, w, q) {
        Qe(p, function () {
          w.apply(this, arguments);
        }, q);
      },
      count: function count(p) {
        var w = 0;
        return Qe(p, function () {
          w++;
        }), w;
      },
      toArray: function toArray(p) {
        return Qe(p, function (w) {
          return w;
        }) || [];
      },
      only: function only(p) {
        if (!Ge(p)) throw Error("React.Children.only expected to receive a single React element child.");
        return p;
      }
    }, ee.Component = G, ee.Fragment = u, ee.Profiler = v, ee.PureComponent = oe, ee.StrictMode = S, ee.Suspense = L, ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W, ee.act = b, ee.cloneElement = function (p, w, q) {
      if (p == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + p + ".");
      var te = X({}, p.props),
        ie = p.key,
        se = p.ref,
        me = p._owner;
      if (w != null) {
        if (w.ref !== void 0 && (se = w.ref, me = ge.current), w.key !== void 0 && (ie = "" + w.key), p.type && p.type.defaultProps) var de = p.type.defaultProps;
        for (ke in w) Ee.call(w, ke) && !pe.hasOwnProperty(ke) && (te[ke] = w[ke] === void 0 && de !== void 0 ? de[ke] : w[ke]);
      }
      var ke = arguments.length - 2;
      if (ke === 1) te.children = q;else if (1 < ke) {
        de = Array(ke);
        for (var lt = 0; lt < ke; lt++) de[lt] = arguments[lt + 2];
        te.children = de;
      }
      return {
        $$typeof: c,
        type: p.type,
        key: ie,
        ref: se,
        props: te,
        _owner: me
      };
    }, ee.createContext = function (p) {
      return p = {
        $$typeof: C,
        _currentValue: p,
        _currentValue2: p,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }, p.Provider = {
        $$typeof: P,
        _context: p
      }, p.Consumer = p;
    }, ee.createElement = Q, ee.createFactory = function (p) {
      var w = Q.bind(null, p);
      return w.type = p, w;
    }, ee.createRef = function () {
      return {
        current: null
      };
    }, ee.forwardRef = function (p) {
      return {
        $$typeof: N,
        render: p
      };
    }, ee.isValidElement = Ge, ee.lazy = function (p) {
      return {
        $$typeof: T,
        _payload: {
          _status: -1,
          _result: p
        },
        _init: Oe
      };
    }, ee.memo = function (p, w) {
      return {
        $$typeof: B,
        type: p,
        compare: w === void 0 ? null : w
      };
    }, ee.startTransition = function (p) {
      var w = F.transition;
      F.transition = {};
      try {
        p();
      } finally {
        F.transition = w;
      }
    }, ee.unstable_act = b, ee.useCallback = function (p, w) {
      return ye.current.useCallback(p, w);
    }, ee.useContext = function (p) {
      return ye.current.useContext(p);
    }, ee.useDebugValue = function () {}, ee.useDeferredValue = function (p) {
      return ye.current.useDeferredValue(p);
    }, ee.useEffect = function (p, w) {
      return ye.current.useEffect(p, w);
    }, ee.useId = function () {
      return ye.current.useId();
    }, ee.useImperativeHandle = function (p, w, q) {
      return ye.current.useImperativeHandle(p, w, q);
    }, ee.useInsertionEffect = function (p, w) {
      return ye.current.useInsertionEffect(p, w);
    }, ee.useLayoutEffect = function (p, w) {
      return ye.current.useLayoutEffect(p, w);
    }, ee.useMemo = function (p, w) {
      return ye.current.useMemo(p, w);
    }, ee.useReducer = function (p, w, q) {
      return ye.current.useReducer(p, w, q);
    }, ee.useRef = function (p) {
      return ye.current.useRef(p);
    }, ee.useState = function (p) {
      return ye.current.useState(p);
    }, ee.useSyncExternalStore = function (p, w, q) {
      return ye.current.useSyncExternalStore(p, w, q);
    }, ee.useTransition = function () {
      return ye.current.useTransition();
    }, ee.version = "18.3.1", ee;
  }
  Ks.exports = ic();
  var ue = Ks.exports;
  var sc = Ds(ue);
  var Hs = {
      exports: {}
    },
    Je = {},
    Ul = {
      exports: {}
    },
    Hl = {}; /**
             * @license React
             * scheduler.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
  var Ws;
  function ac() {
    return Ws || (Ws = 1, function (c) {
      function r(F, W) {
        var b = F.length;
        F.push(W);
        e: for (; 0 < b;) {
          var p = b - 1 >>> 1,
            w = F[p];
          if (0 < v(w, W)) F[p] = W, F[b] = w, b = p;else break e;
        }
      }
      function u(F) {
        return F.length === 0 ? null : F[0];
      }
      function S(F) {
        if (F.length === 0) return null;
        var W = F[0],
          b = F.pop();
        if (b !== W) {
          F[0] = b;
          e: for (var p = 0, w = F.length, q = w >>> 1; p < q;) {
            var te = 2 * (p + 1) - 1,
              ie = F[te],
              se = te + 1,
              me = F[se];
            if (0 > v(ie, b)) se < w && 0 > v(me, ie) ? (F[p] = me, F[se] = b, p = se) : (F[p] = ie, F[te] = b, p = te);else if (se < w && 0 > v(me, b)) F[p] = me, F[se] = b, p = se;else break e;
          }
        }
        return W;
      }
      function v(F, W) {
        var b = F.sortIndex - W.sortIndex;
        return b !== 0 ? b : F.id - W.id;
      }
      if ((typeof performance === "undefined" ? "undefined" : _typeof(performance)) == "object" && typeof performance.now == "function") {
        var P = performance;
        c.unstable_now = function () {
          return P.now();
        };
      } else {
        var C = Date,
          N = C.now();
        c.unstable_now = function () {
          return C.now() - N;
        };
      }
      var L = [],
        B = [],
        T = 1,
        Z = null,
        z = 3,
        K = !1,
        X = !1,
        Y = !1,
        G = typeof setTimeout == "function" ? setTimeout : null,
        J = typeof clearTimeout == "function" ? clearTimeout : null,
        oe = (typeof setImmediate === "undefined" ? "undefined" : _typeof(setImmediate)) < "u" ? setImmediate : null;
      (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ce(F) {
        for (var W = u(B); W !== null;) {
          if (W.callback === null) S(B);else if (W.startTime <= F) S(B), W.sortIndex = W.expirationTime, r(L, W);else break;
          W = u(B);
        }
      }
      function le(F) {
        if (Y = !1, ce(F), !X) if (u(L) !== null) X = !0, Oe(Ee);else {
          var W = u(B);
          W !== null && ye(le, W.startTime - F);
        }
      }
      function Ee(F, W) {
        X = !1, Y && (Y = !1, J(Q), Q = -1), K = !0;
        var b = z;
        try {
          for (ce(W), Z = u(L); Z !== null && (!(Z.expirationTime > W) || F && !mt());) {
            var p = Z.callback;
            if (typeof p == "function") {
              Z.callback = null, z = Z.priorityLevel;
              var w = p(Z.expirationTime <= W);
              W = c.unstable_now(), typeof w == "function" ? Z.callback = w : Z === u(L) && S(L), ce(W);
            } else S(L);
            Z = u(L);
          }
          if (Z !== null) var q = !0;else {
            var te = u(B);
            te !== null && ye(le, te.startTime - W), q = !1;
          }
          return q;
        } finally {
          Z = null, z = b, K = !1;
        }
      }
      var ge = !1,
        pe = null,
        Q = -1,
        ne = 5,
        Ge = -1;
      function mt() {
        return !(c.unstable_now() - Ge < ne);
      }
      function _() {
        if (pe !== null) {
          var F = c.unstable_now();
          Ge = F;
          var W = !0;
          try {
            W = pe(!0, F);
          } finally {
            W ? fe() : (ge = !1, pe = null);
          }
        } else ge = !1;
      }
      var fe;
      if (typeof oe == "function") fe = function fe() {
        oe(_);
      };else if ((typeof MessageChannel === "undefined" ? "undefined" : _typeof(MessageChannel)) < "u") {
        var rt = new MessageChannel(),
          Qe = rt.port2;
        rt.port1.onmessage = _, fe = function fe() {
          Qe.postMessage(null);
        };
      } else fe = function fe() {
        G(_, 0);
      };
      function Oe(F) {
        pe = F, ge || (ge = !0, fe());
      }
      function ye(F, W) {
        Q = G(function () {
          F(c.unstable_now());
        }, W);
      }
      c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function (F) {
        F.callback = null;
      }, c.unstable_continueExecution = function () {
        X || K || (X = !0, Oe(Ee));
      }, c.unstable_forceFrameRate = function (F) {
        0 > F || 125 < F ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ne = 0 < F ? Math.floor(1e3 / F) : 5;
      }, c.unstable_getCurrentPriorityLevel = function () {
        return z;
      }, c.unstable_getFirstCallbackNode = function () {
        return u(L);
      }, c.unstable_next = function (F) {
        switch (z) {
          case 1:
          case 2:
          case 3:
            var W = 3;
            break;
          default:
            W = z;
        }
        var b = z;
        z = W;
        try {
          return F();
        } finally {
          z = b;
        }
      }, c.unstable_pauseExecution = function () {}, c.unstable_requestPaint = function () {}, c.unstable_runWithPriority = function (F, W) {
        switch (F) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            F = 3;
        }
        var b = z;
        z = F;
        try {
          return W();
        } finally {
          z = b;
        }
      }, c.unstable_scheduleCallback = function (F, W, b) {
        var p = c.unstable_now();
        switch (_typeof(b) == "object" && b !== null ? (b = b.delay, b = typeof b == "number" && 0 < b ? p + b : p) : b = p, F) {
          case 1:
            var w = -1;
            break;
          case 2:
            w = 250;
            break;
          case 5:
            w = 1073741823;
            break;
          case 4:
            w = 1e4;
            break;
          default:
            w = 5e3;
        }
        return w = b + w, F = {
          id: T++,
          callback: W,
          priorityLevel: F,
          startTime: b,
          expirationTime: w,
          sortIndex: -1
        }, b > p ? (F.sortIndex = b, r(B, F), u(L) === null && F === u(B) && (Y ? (J(Q), Q = -1) : Y = !0, ye(le, b - p))) : (F.sortIndex = w, r(L, F), X || K || (X = !0, Oe(Ee))), F;
      }, c.unstable_shouldYield = mt, c.unstable_wrapCallback = function (F) {
        var W = z;
        return function () {
          var b = z;
          z = W;
          try {
            return F.apply(this, arguments);
          } finally {
            z = b;
          }
        };
      };
    }(Hl)), Hl;
  }
  var $s;
  function oc() {
    return $s || ($s = 1, Ul.exports = ac()), Ul.exports;
  } /**
    * @license React
    * react-dom.production.min.js
    *
    * Copyright (c) Facebook, Inc. and its affiliates.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    */
  var Js;
  function uc() {
    if (Js) return Je;
    Js = 1;
    var c = ue,
      r = oc();
    function u(e) {
      for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
      return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var S = new Set(),
      v = {};
    function P(e, t) {
      C(e, t), C(e + "Capture", t);
    }
    function C(e, t) {
      for (v[e] = t, e = 0; e < t.length; e++) S.add(t[e]);
    }
    var N = !((typeof window === "undefined" ? "undefined" : _typeof(window)) > "u" || _typeof(window.document) > "u" || _typeof(window.document.createElement) > "u"),
      L = Object.prototype.hasOwnProperty,
      B = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      T = {},
      Z = {};
    function z(e) {
      return L.call(Z, e) ? !0 : L.call(T, e) ? !1 : B.test(e) ? Z[e] = !0 : (T[e] = !0, !1);
    }
    function K(e, t, n, l) {
      if (n !== null && n.type === 0) return !1;
      switch (_typeof(t)) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return l ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
          return !1;
      }
    }
    function X(e, t, n, l) {
      if (t === null || _typeof(t) > "u" || K(e, t, n, l)) return !0;
      if (l) return !1;
      if (n !== null) switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
      return !1;
    }
    function Y(e, t, n, l, i, s, o) {
      this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = l, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = o;
    }
    var G = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
      G[e] = new Y(e, 0, !1, e, null, !1, !1);
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
      var t = e[0];
      G[t] = new Y(t, 1, !1, e[1], null, !1, !1);
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
      G[e] = new Y(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
      G[e] = new Y(e, 2, !1, e, null, !1, !1);
    }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
      G[e] = new Y(e, 3, !1, e.toLowerCase(), null, !1, !1);
    }), ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      G[e] = new Y(e, 3, !0, e, null, !1, !1);
    }), ["capture", "download"].forEach(function (e) {
      G[e] = new Y(e, 4, !1, e, null, !1, !1);
    }), ["cols", "rows", "size", "span"].forEach(function (e) {
      G[e] = new Y(e, 6, !1, e, null, !1, !1);
    }), ["rowSpan", "start"].forEach(function (e) {
      G[e] = new Y(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var J = /[\-:]([a-z])/g;
    function oe(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
      var t = e.replace(J, oe);
      G[t] = new Y(t, 1, !1, e, null, !1, !1);
    }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
      var t = e.replace(J, oe);
      G[t] = new Y(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    }), ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(J, oe);
      G[t] = new Y(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }), ["tabIndex", "crossOrigin"].forEach(function (e) {
      G[e] = new Y(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }), G.xlinkHref = new Y("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function (e) {
      G[e] = new Y(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function ce(e, t, n, l) {
      var i = G.hasOwnProperty(t) ? G[t] : null;
      (i !== null ? i.type !== 0 : l || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (X(t, n, i, l) && (n = null), l || i === null ? z(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, l = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, l ? e.setAttributeNS(l, t, n) : e.setAttribute(t, n))));
    }
    var le = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Ee = Symbol["for"]("react.element"),
      ge = Symbol["for"]("react.portal"),
      pe = Symbol["for"]("react.fragment"),
      Q = Symbol["for"]("react.strict_mode"),
      ne = Symbol["for"]("react.profiler"),
      Ge = Symbol["for"]("react.provider"),
      mt = Symbol["for"]("react.context"),
      _ = Symbol["for"]("react.forward_ref"),
      fe = Symbol["for"]("react.suspense"),
      rt = Symbol["for"]("react.suspense_list"),
      Qe = Symbol["for"]("react.memo"),
      Oe = Symbol["for"]("react.lazy"),
      ye = Symbol["for"]("react.offscreen"),
      F = Symbol.iterator;
    function W(e) {
      return e === null || _typeof(e) != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var b = Object.assign,
      p;
    function w(e) {
      if (p === void 0) try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        p = t && t[1] || "";
      }
      return "\n" + p + e;
    }
    var q = !1;
    function te(e, t) {
      if (!e || q) return "";
      q = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t) {
          if (t = function t() {
            throw Error();
          }, Object.defineProperty(t.prototype, "props", {
            set: function set() {
              throw Error();
            }
          }), (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) == "object" && Reflect.construct) {
            try {
              Reflect.construct(t, []);
            } catch (y) {
              var l = y;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (y) {
              l = y;
            }
            e.call(t.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (y) {
            l = y;
          }
          e();
        }
      } catch (y) {
        if (y && l && typeof y.stack == "string") {
          for (var i = y.stack.split("\n"), s = l.stack.split("\n"), o = i.length - 1, f = s.length - 1; 1 <= o && 0 <= f && i[o] !== s[f];) f--;
          for (; 1 <= o && 0 <= f; o--, f--) if (i[o] !== s[f]) {
            if (o !== 1 || f !== 1) do if (o--, f--, 0 > f || i[o] !== s[f]) {
              var d = "\n" + i[o].replace(" at new ", " at ");
              return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), d;
            } while (1 <= o && 0 <= f);
            break;
          }
        }
      } finally {
        q = !1, Error.prepareStackTrace = n;
      }
      return (e = e ? e.displayName || e.name : "") ? w(e) : "";
    }
    function ie(e) {
      switch (e.tag) {
        case 5:
          return w(e.type);
        case 16:
          return w("Lazy");
        case 13:
          return w("Suspense");
        case 19:
          return w("SuspenseList");
        case 0:
        case 2:
        case 15:
          return e = te(e.type, !1), e;
        case 11:
          return e = te(e.type.render, !1), e;
        case 1:
          return e = te(e.type, !0), e;
        default:
          return "";
      }
    }
    function se(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case pe:
          return "Fragment";
        case ge:
          return "Portal";
        case ne:
          return "Profiler";
        case Q:
          return "StrictMode";
        case fe:
          return "Suspense";
        case rt:
          return "SuspenseList";
      }
      if (_typeof(e) == "object") switch (e.$$typeof) {
        case mt:
          return (e.displayName || "Context") + ".Consumer";
        case Ge:
          return (e._context.displayName || "Context") + ".Provider";
        case _:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Qe:
          return t = e.displayName || null, t !== null ? t : se(e.type) || "Memo";
        case Oe:
          t = e._payload, e = e._init;
          try {
            return se(e(t));
          } catch (_unused) {}
      }
      return null;
    }
    function me(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return "Cache";
        case 9:
          return (t.displayName || "Context") + ".Consumer";
        case 10:
          return (t._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return se(t);
        case 8:
          return t === Q ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == "function") return t.displayName || t.name || null;
          if (typeof t == "string") return t;
      }
      return null;
    }
    function de(e) {
      switch (_typeof(e)) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function ke(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function lt(e) {
      var t = ke(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        l = "" + e[t];
      if (!e.hasOwnProperty(t) && _typeof(n) < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get,
          s = n.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function get() {
            return i.call(this);
          },
          set: function set(o) {
            l = "" + o, s.call(this, o);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function getValue() {
            return l;
          },
          setValue: function setValue(o) {
            l = "" + o;
          },
          stopTracking: function stopTracking() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Zr(e) {
      e._valueTracker || (e._valueTracker = lt(e));
    }
    function ca(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        l = "";
      return e && (l = ke(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
    }
    function Fr(e) {
      if (e = e || ((typeof document === "undefined" ? "undefined" : _typeof(document)) < "u" ? document : void 0), _typeof(e) > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch (_unused2) {
        return e.body;
      }
    }
    function Gl(e, t) {
      var n = t.checked;
      return b({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n !== null && n !== void 0 ? n : e._wrapperState.initialChecked
      });
    }
    function fa(e, t) {
      var n = t.defaultValue == null ? "" : t.defaultValue,
        l = t.checked != null ? t.checked : t.defaultChecked;
      n = de(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: l,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
      };
    }
    function da(e, t) {
      t = t.checked, t != null && ce(e, "checked", t, !1);
    }
    function Ql(e, t) {
      da(e, t);
      var n = de(t.value),
        l = t.type;
      if (n != null) l === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);else if (l === "submit" || l === "reset") {
        e.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Xl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Xl(e, t.type, de(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
    }
    function ha(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var l = t.type;
        if (!(l !== "submit" && l !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
      }
      n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
    }
    function Xl(e, t, n) {
      (t !== "number" || Fr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    var $n = Array.isArray;
    function xn(e, t, n, l) {
      if (e = e.options, t) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && l && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + de(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            e[i].selected = !0, l && (e[i].defaultSelected = !0);
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Yl(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(u(91));
      return b({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
      });
    }
    function pa(e, t) {
      var n = t.value;
      if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
          if (t != null) throw Error(u(92));
          if ($n(n)) {
            if (1 < n.length) throw Error(u(93));
            n = n[0];
          }
          t = n;
        }
        t == null && (t = ""), n = t;
      }
      e._wrapperState = {
        initialValue: de(n)
      };
    }
    function ma(e, t) {
      var n = de(t.value),
        l = de(t.defaultValue);
      n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), l != null && (e.defaultValue = "" + l);
    }
    function va(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
    }
    function ga(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function ql(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml" ? ga(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var _r,
      ya = function (e) {
        return (typeof MSApp === "undefined" ? "undefined" : _typeof(MSApp)) < "u" && MSApp.execUnsafeLocalFunction ? function (t, n, l, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, l, i);
          });
        } : e;
      }(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;else {
          for (_r = _r || document.createElement("div"), _r.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = _r.firstChild; e.firstChild;) e.removeChild(e.firstChild);
          for (; t.firstChild;) e.appendChild(t.firstChild);
        }
      });
    function Jn(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Gn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      },
      Wc = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Gn).forEach(function (e) {
      Wc.forEach(function (t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Gn[t] = Gn[e];
      });
    });
    function xa(e, t, n) {
      return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Gn.hasOwnProperty(e) && Gn[e] ? ("" + t).trim() : t + "px";
    }
    function Sa(e, t) {
      e = e.style;
      for (var n in t) if (t.hasOwnProperty(n)) {
        var l = n.indexOf("--") === 0,
          i = xa(n, t[n], l);
        n === "float" && (n = "cssFloat"), l ? e.setProperty(n, i) : e[n] = i;
      }
    }
    var $c = b({
      menuitem: !0
    }, {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
    });
    function ei(e, t) {
      if (t) {
        if ($c[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(u(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(u(60));
          if (_typeof(t.dangerouslySetInnerHTML) != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(u(61));
        }
        if (t.style != null && _typeof(t.style) != "object") throw Error(u(62));
      }
    }
    function ti(e, t) {
      if (e.indexOf("-") === -1) return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ni = null;
    function ri(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var li = null,
      Sn = null,
      Tn = null;
    function Ta(e) {
      if (e = gr(e)) {
        if (typeof li != "function") throw Error(u(280));
        var t = e.stateNode;
        t && (t = ll(t), li(e.stateNode, e.type, t));
      }
    }
    function ka(e) {
      Sn ? Tn ? Tn.push(e) : Tn = [e] : Sn = e;
    }
    function wa() {
      if (Sn) {
        var e = Sn,
          t = Tn;
        if (Tn = Sn = null, Ta(e), t) for (e = 0; e < t.length; e++) Ta(t[e]);
      }
    }
    function ja(e, t) {
      return e(t);
    }
    function Ea() {}
    var ii = !1;
    function Pa(e, t, n) {
      if (ii) return e(t, n);
      ii = !0;
      try {
        return ja(e, t, n);
      } finally {
        ii = !1, (Sn !== null || Tn !== null) && (Ea(), wa());
      }
    }
    function Qn(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var l = ll(n);
      if (l === null) return null;
      n = l[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != "function") throw Error(u(231, t, _typeof(n)));
      return n;
    }
    var si = !1;
    if (N) try {
      var Xn = {};
      Object.defineProperty(Xn, "passive", {
        get: function get() {
          si = !0;
        }
      }), window.addEventListener("test", Xn, Xn), window.removeEventListener("test", Xn, Xn);
    } catch (_unused3) {
      si = !1;
    }
    function Jc(e, t, n, l, i, s, o, f, d) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, y);
      } catch (j) {
        this.onError(j);
      }
    }
    var Yn = !1,
      Ir = null,
      Ar = !1,
      ai = null,
      Gc = {
        onError: function onError(e) {
          Yn = !0, Ir = e;
        }
      };
    function Qc(e, t, n, l, i, s, o, f, d) {
      Yn = !1, Ir = null, Jc.apply(Gc, arguments);
    }
    function Xc(e, t, n, l, i, s, o, f, d) {
      if (Qc.apply(this, arguments), Yn) {
        if (Yn) {
          var y = Ir;
          Yn = !1, Ir = null;
        } else throw Error(u(198));
        Ar || (Ar = !0, ai = y);
      }
    }
    function sn(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t["return"];) t = t["return"];else {
        e = t;
        do t = e, t.flags & 4098 && (n = t["return"]), e = t["return"]; while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function Va(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function Na(e) {
      if (sn(e) !== e) throw Error(u(188));
    }
    function Yc(e) {
      var t = e.alternate;
      if (!t) {
        if (t = sn(e), t === null) throw Error(u(188));
        return t !== e ? null : e;
      }
      for (var n = e, l = t;;) {
        var i = n["return"];
        if (i === null) break;
        var s = i.alternate;
        if (s === null) {
          if (l = i["return"], l !== null) {
            n = l;
            continue;
          }
          break;
        }
        if (i.child === s.child) {
          for (s = i.child; s;) {
            if (s === n) return Na(i), e;
            if (s === l) return Na(i), t;
            s = s.sibling;
          }
          throw Error(u(188));
        }
        if (n["return"] !== l["return"]) n = i, l = s;else {
          for (var o = !1, f = i.child; f;) {
            if (f === n) {
              o = !0, n = i, l = s;
              break;
            }
            if (f === l) {
              o = !0, l = i, n = s;
              break;
            }
            f = f.sibling;
          }
          if (!o) {
            for (f = s.child; f;) {
              if (f === n) {
                o = !0, n = s, l = i;
                break;
              }
              if (f === l) {
                o = !0, l = s, n = i;
                break;
              }
              f = f.sibling;
            }
            if (!o) throw Error(u(189));
          }
        }
        if (n.alternate !== l) throw Error(u(190));
      }
      if (n.tag !== 3) throw Error(u(188));
      return n.stateNode.current === n ? e : t;
    }
    function Ba(e) {
      return e = Yc(e), e !== null ? Ca(e) : null;
    }
    function Ca(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null;) {
        var t = Ca(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var La = r.unstable_scheduleCallback,
      Ra = r.unstable_cancelCallback,
      qc = r.unstable_shouldYield,
      ef = r.unstable_requestPaint,
      Ce = r.unstable_now,
      tf = r.unstable_getCurrentPriorityLevel,
      oi = r.unstable_ImmediatePriority,
      Za = r.unstable_UserBlockingPriority,
      br = r.unstable_NormalPriority,
      nf = r.unstable_LowPriority,
      Fa = r.unstable_IdlePriority,
      Mr = null,
      wt = null;
    function rf(e) {
      if (wt && typeof wt.onCommitFiberRoot == "function") try {
        wt.onCommitFiberRoot(Mr, e, void 0, (e.current.flags & 128) === 128);
      } catch (_unused4) {}
    }
    var vt = Math.clz32 ? Math.clz32 : af,
      lf = Math.log,
      sf = Math.LN2;
    function af(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (lf(e) / sf | 0) | 0;
    }
    var Or = 64,
      zr = 4194304;
    function qn(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function Dr(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var l = 0,
        i = e.suspendedLanes,
        s = e.pingedLanes,
        o = n & 268435455;
      if (o !== 0) {
        var f = o & ~i;
        f !== 0 ? l = qn(f) : (s &= o, s !== 0 && (l = qn(s)));
      } else o = n & ~i, o !== 0 ? l = qn(o) : s !== 0 && (l = qn(s));
      if (l === 0) return 0;
      if (t !== 0 && t !== l && !(t & i) && (i = l & -l, s = t & -t, i >= s || i === 16 && (s & 4194240) !== 0)) return t;
      if (l & 4 && (l |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= l; 0 < t;) n = 31 - vt(t), i = 1 << n, l |= e[n], t &= ~i;
      return l;
    }
    function of(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function uf(e, t) {
      for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s;) {
        var o = 31 - vt(s),
          f = 1 << o,
          d = i[o];
        d === -1 ? (!(f & n) || f & l) && (i[o] = of(f, t)) : d <= t && (e.expiredLanes |= f), s &= ~f;
      }
    }
    function ui(e) {
      return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function _a() {
      var e = Or;
      return Or <<= 1, !(Or & 4194240) && (Or = 64), e;
    }
    function ci(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function er(e, t, n) {
      e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - vt(t), e[t] = n;
    }
    function cf(e, t) {
      var n = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
      var l = e.eventTimes;
      for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - vt(n),
          s = 1 << i;
        t[i] = 0, l[i] = -1, e[i] = -1, n &= ~s;
      }
    }
    function fi(e, t) {
      var n = e.entangledLanes |= t;
      for (e = e.entanglements; n;) {
        var l = 31 - vt(n),
          i = 1 << l;
        i & t | e[l] & t && (e[l] |= t), n &= ~i;
      }
    }
    var he = 0;
    function Ia(e) {
      return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
    }
    var Aa,
      di,
      ba,
      Ma,
      Oa,
      hi = !1,
      Kr = [],
      bt = null,
      Mt = null,
      Ot = null,
      tr = new Map(),
      nr = new Map(),
      zt = [],
      ff = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function za(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          bt = null;
          break;
        case "dragenter":
        case "dragleave":
          Mt = null;
          break;
        case "mouseover":
        case "mouseout":
          Ot = null;
          break;
        case "pointerover":
        case "pointerout":
          tr["delete"](t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          nr["delete"](t.pointerId);
      }
    }
    function rr(e, t, n, l, i, s) {
      return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: l,
        nativeEvent: s,
        targetContainers: [i]
      }, t !== null && (t = gr(t), t !== null && di(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
    }
    function df(e, t, n, l, i) {
      switch (t) {
        case "focusin":
          return bt = rr(bt, e, t, n, l, i), !0;
        case "dragenter":
          return Mt = rr(Mt, e, t, n, l, i), !0;
        case "mouseover":
          return Ot = rr(Ot, e, t, n, l, i), !0;
        case "pointerover":
          var s = i.pointerId;
          return tr.set(s, rr(tr.get(s) || null, e, t, n, l, i)), !0;
        case "gotpointercapture":
          return s = i.pointerId, nr.set(s, rr(nr.get(s) || null, e, t, n, l, i)), !0;
      }
      return !1;
    }
    function Da(e) {
      var t = an(e.target);
      if (t !== null) {
        var n = sn(t);
        if (n !== null) {
          if (t = n.tag, t === 13) {
            if (t = Va(n), t !== null) {
              e.blockedOn = t, Oa(e.priority, function () {
                ba(n);
              });
              return;
            }
          } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Ur(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length;) {
        var n = mi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var l = new n.constructor(n.type, n);
          ni = l, n.target.dispatchEvent(l), ni = null;
        } else return t = gr(n), t !== null && di(t), e.blockedOn = n, !1;
        t.shift();
      }
      return !0;
    }
    function Ka(e, t, n) {
      Ur(e) && n["delete"](t);
    }
    function hf() {
      hi = !1, bt !== null && Ur(bt) && (bt = null), Mt !== null && Ur(Mt) && (Mt = null), Ot !== null && Ur(Ot) && (Ot = null), tr.forEach(Ka), nr.forEach(Ka);
    }
    function lr(e, t) {
      e.blockedOn === t && (e.blockedOn = null, hi || (hi = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, hf)));
    }
    function ir(e) {
      function t(i) {
        return lr(i, e);
      }
      if (0 < Kr.length) {
        lr(Kr[0], e);
        for (var n = 1; n < Kr.length; n++) {
          var l = Kr[n];
          l.blockedOn === e && (l.blockedOn = null);
        }
      }
      for (bt !== null && lr(bt, e), Mt !== null && lr(Mt, e), Ot !== null && lr(Ot, e), tr.forEach(t), nr.forEach(t), n = 0; n < zt.length; n++) l = zt[n], l.blockedOn === e && (l.blockedOn = null);
      for (; 0 < zt.length && (n = zt[0], n.blockedOn === null);) Da(n), n.blockedOn === null && zt.shift();
    }
    var kn = le.ReactCurrentBatchConfig,
      Hr = !0;
    function pf(e, t, n, l) {
      var i = he,
        s = kn.transition;
      kn.transition = null;
      try {
        he = 1, pi(e, t, n, l);
      } finally {
        he = i, kn.transition = s;
      }
    }
    function mf(e, t, n, l) {
      var i = he,
        s = kn.transition;
      kn.transition = null;
      try {
        he = 4, pi(e, t, n, l);
      } finally {
        he = i, kn.transition = s;
      }
    }
    function pi(e, t, n, l) {
      if (Hr) {
        var i = mi(e, t, n, l);
        if (i === null) Ri(e, t, l, Wr, n), za(e, l);else if (df(i, e, t, n, l)) l.stopPropagation();else if (za(e, l), t & 4 && -1 < ff.indexOf(e)) {
          for (; i !== null;) {
            var s = gr(i);
            if (s !== null && Aa(s), s = mi(e, t, n, l), s === null && Ri(e, t, l, Wr, n), s === i) break;
            i = s;
          }
          i !== null && l.stopPropagation();
        } else Ri(e, t, l, null, n);
      }
    }
    var Wr = null;
    function mi(e, t, n, l) {
      if (Wr = null, e = ri(l), e = an(e), e !== null) if (t = sn(e), t === null) e = null;else if (n = t.tag, n === 13) {
        if (e = Va(t), e !== null) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
      return Wr = e, null;
    }
    function Ua(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (tf()) {
            case oi:
              return 1;
            case Za:
              return 4;
            case br:
            case nf:
              return 16;
            case Fa:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var Dt = null,
      vi = null,
      $r = null;
    function Ha() {
      if ($r) return $r;
      var e,
        t = vi,
        n = t.length,
        l,
        i = "value" in Dt ? Dt.value : Dt.textContent,
        s = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (l = 1; l <= o && t[n - l] === i[s - l]; l++);
      return $r = i.slice(e, 1 < l ? 1 - l : void 0);
    }
    function Jr(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Gr() {
      return !0;
    }
    function Wa() {
      return !1;
    }
    function it(e) {
      function t(n, l, i, s, o) {
        this._reactName = n, this._targetInst = i, this.type = l, this.nativeEvent = s, this.target = o, this.currentTarget = null;
        for (var f in e) e.hasOwnProperty(f) && (n = e[f], this[f] = n ? n(s) : s[f]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Gr : Wa, this.isPropagationStopped = Wa, this;
      }
      return b(t.prototype, {
        preventDefault: function preventDefault() {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Gr);
        },
        stopPropagation: function stopPropagation() {
          var n = this.nativeEvent;
          n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Gr);
        },
        persist: function persist() {},
        isPersistent: Gr
      }), t;
    }
    var wn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function timeStamp(e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      },
      gi = it(wn),
      sr = b({}, wn, {
        view: 0,
        detail: 0
      }),
      vf = it(sr),
      yi,
      xi,
      ar,
      Qr = b({}, sr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Ti,
        button: 0,
        buttons: 0,
        relatedTarget: function relatedTarget(e) {
          return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
        },
        movementX: function movementX(e) {
          return "movementX" in e ? e.movementX : (e !== ar && (ar && e.type === "mousemove" ? (yi = e.screenX - ar.screenX, xi = e.screenY - ar.screenY) : xi = yi = 0, ar = e), yi);
        },
        movementY: function movementY(e) {
          return "movementY" in e ? e.movementY : xi;
        }
      }),
      $a = it(Qr),
      gf = b({}, Qr, {
        dataTransfer: 0
      }),
      yf = it(gf),
      xf = b({}, sr, {
        relatedTarget: 0
      }),
      Si = it(xf),
      Sf = b({}, wn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      Tf = it(Sf),
      kf = b({}, wn, {
        clipboardData: function clipboardData(e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        }
      }),
      wf = it(kf),
      jf = b({}, wn, {
        data: 0
      }),
      Ja = it(jf),
      Ef = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      },
      Pf = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      },
      Vf = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
    function Nf(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Vf[e]) ? !!t[e] : !1;
    }
    function Ti() {
      return Nf;
    }
    var Bf = b({}, sr, {
        key: function key(e) {
          if (e.key) {
            var t = Ef[e.key] || e.key;
            if (t !== "Unidentified") return t;
          }
          return e.type === "keypress" ? (e = Jr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pf[e.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Ti,
        charCode: function charCode(e) {
          return e.type === "keypress" ? Jr(e) : 0;
        },
        keyCode: function keyCode(e) {
          return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function which(e) {
          return e.type === "keypress" ? Jr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        }
      }),
      Cf = it(Bf),
      Lf = b({}, Qr, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      }),
      Ga = it(Lf),
      Rf = b({}, sr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Ti
      }),
      Zf = it(Rf),
      Ff = b({}, wn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      _f = it(Ff),
      If = b({}, Qr, {
        deltaX: function deltaX(e) {
          return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function deltaY(e) {
          return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      }),
      Af = it(If),
      bf = [9, 13, 27, 32],
      ki = N && "CompositionEvent" in window,
      or = null;
    N && "documentMode" in document && (or = document.documentMode);
    var Mf = N && "TextEvent" in window && !or,
      Qa = N && (!ki || or && 8 < or && 11 >= or),
      Xa = " ",
      Ya = !1;
    function qa(e, t) {
      switch (e) {
        case "keyup":
          return bf.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function eo(e) {
      return e = e.detail, _typeof(e) == "object" && "data" in e ? e.data : null;
    }
    var jn = !1;
    function Of(e, t) {
      switch (e) {
        case "compositionend":
          return eo(t);
        case "keypress":
          return t.which !== 32 ? null : (Ya = !0, Xa);
        case "textInput":
          return e = t.data, e === Xa && Ya ? null : e;
        default:
          return null;
      }
    }
    function zf(e, t) {
      if (jn) return e === "compositionend" || !ki && qa(e, t) ? (e = Ha(), $r = vi = Dt = null, jn = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t["char"] && 1 < t["char"].length) return t["char"];
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Qa && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var Df = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function to(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Df[e.type] : t === "textarea";
    }
    function no(e, t, n, l) {
      ka(l), t = tl(t, "onChange"), 0 < t.length && (n = new gi("onChange", "change", null, n, l), e.push({
        event: n,
        listeners: t
      }));
    }
    var ur = null,
      cr = null;
    function Kf(e) {
      To(e, 0);
    }
    function Xr(e) {
      var t = Bn(e);
      if (ca(t)) return e;
    }
    function Uf(e, t) {
      if (e === "change") return t;
    }
    var ro = !1;
    if (N) {
      var wi;
      if (N) {
        var ji = "oninput" in document;
        if (!ji) {
          var lo = document.createElement("div");
          lo.setAttribute("oninput", "return;"), ji = typeof lo.oninput == "function";
        }
        wi = ji;
      } else wi = !1;
      ro = wi && (!document.documentMode || 9 < document.documentMode);
    }
    function io() {
      ur && (ur.detachEvent("onpropertychange", so), cr = ur = null);
    }
    function so(e) {
      if (e.propertyName === "value" && Xr(cr)) {
        var t = [];
        no(t, cr, e, ri(e)), Pa(Kf, t);
      }
    }
    function Hf(e, t, n) {
      e === "focusin" ? (io(), ur = t, cr = n, ur.attachEvent("onpropertychange", so)) : e === "focusout" && io();
    }
    function Wf(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xr(cr);
    }
    function $f(e, t) {
      if (e === "click") return Xr(t);
    }
    function Jf(e, t) {
      if (e === "input" || e === "change") return Xr(t);
    }
    function Gf(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var gt = typeof Object.is == "function" ? Object.is : Gf;
    function fr(e, t) {
      if (gt(e, t)) return !0;
      if (_typeof(e) != "object" || e === null || _typeof(t) != "object" || t === null) return !1;
      var n = Object.keys(e),
        l = Object.keys(t);
      if (n.length !== l.length) return !1;
      for (l = 0; l < n.length; l++) {
        var i = n[l];
        if (!L.call(t, i) || !gt(e[i], t[i])) return !1;
      }
      return !0;
    }
    function ao(e) {
      for (; e && e.firstChild;) e = e.firstChild;
      return e;
    }
    function oo(e, t) {
      var n = ao(e);
      e = 0;
      for (var l; n;) {
        if (n.nodeType === 3) {
          if (l = e + n.textContent.length, e <= t && l >= t) return {
            node: n,
            offset: t - e
          };
          e = l;
        }
        e: {
          for (; n;) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = ao(n);
      }
    }
    function uo(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uo(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function co() {
      for (var e = window, t = Fr(); t instanceof e.HTMLIFrameElement;) {
        try {
          var n = typeof t.contentWindow.location.href == "string";
        } catch (_unused5) {
          n = !1;
        }
        if (n) e = t.contentWindow;else break;
        t = Fr(e.document);
      }
      return t;
    }
    function Ei(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Qf(e) {
      var t = co(),
        n = e.focusedElem,
        l = e.selectionRange;
      if (t !== n && n && n.ownerDocument && uo(n.ownerDocument.documentElement, n)) {
        if (l !== null && Ei(n)) {
          if (t = l.start, e = l.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
            e = e.getSelection();
            var i = n.textContent.length,
              s = Math.min(l.start, i);
            l = l.end === void 0 ? s : Math.min(l.end, i), !e.extend && s > l && (i = l, l = s, s = i), i = oo(n, s);
            var o = oo(n, l);
            i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), s > l ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
          element: e,
          left: e.scrollLeft,
          top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
      }
    }
    var Xf = N && "documentMode" in document && 11 >= document.documentMode,
      En = null,
      Pi = null,
      dr = null,
      Vi = !1;
    function fo(e, t, n) {
      var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Vi || En == null || En !== Fr(l) || (l = En, "selectionStart" in l && Ei(l) ? l = {
        start: l.selectionStart,
        end: l.selectionEnd
      } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
        anchorNode: l.anchorNode,
        anchorOffset: l.anchorOffset,
        focusNode: l.focusNode,
        focusOffset: l.focusOffset
      }), dr && fr(dr, l) || (dr = l, l = tl(Pi, "onSelect"), 0 < l.length && (t = new gi("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: l
      }), t.target = En)));
    }
    function Yr(e, t) {
      var n = {};
      return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
    }
    var Pn = {
        animationend: Yr("Animation", "AnimationEnd"),
        animationiteration: Yr("Animation", "AnimationIteration"),
        animationstart: Yr("Animation", "AnimationStart"),
        transitionend: Yr("Transition", "TransitionEnd")
      },
      Ni = {},
      ho = {};
    N && (ho = document.createElement("div").style, "AnimationEvent" in window || (delete Pn.animationend.animation, delete Pn.animationiteration.animation, delete Pn.animationstart.animation), "TransitionEvent" in window || delete Pn.transitionend.transition);
    function qr(e) {
      if (Ni[e]) return Ni[e];
      if (!Pn[e]) return e;
      var t = Pn[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in ho) return Ni[e] = t[n];
      return e;
    }
    var po = qr("animationend"),
      mo = qr("animationiteration"),
      vo = qr("animationstart"),
      go = qr("transitionend"),
      yo = new Map(),
      xo = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function Kt(e, t) {
      yo.set(e, t), P(t, [e]);
    }
    for (var Bi = 0; Bi < xo.length; Bi++) {
      var Ci = xo[Bi],
        Yf = Ci.toLowerCase(),
        qf = Ci[0].toUpperCase() + Ci.slice(1);
      Kt(Yf, "on" + qf);
    }
    Kt(po, "onAnimationEnd"), Kt(mo, "onAnimationIteration"), Kt(vo, "onAnimationStart"), Kt("dblclick", "onDoubleClick"), Kt("focusin", "onFocus"), Kt("focusout", "onBlur"), Kt(go, "onTransitionEnd"), C("onMouseEnter", ["mouseout", "mouseover"]), C("onMouseLeave", ["mouseout", "mouseover"]), C("onPointerEnter", ["pointerout", "pointerover"]), C("onPointerLeave", ["pointerout", "pointerover"]), P("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), P("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), P("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), P("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), P("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), P("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var hr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
      ed = new Set("cancel close invalid load scroll toggle".split(" ").concat(hr));
    function So(e, t, n) {
      var l = e.type || "unknown-event";
      e.currentTarget = n, Xc(l, t, void 0, e), e.currentTarget = null;
    }
    function To(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var l = e[n],
          i = l.event;
        l = l.listeners;
        e: {
          var s = void 0;
          if (t) for (var o = l.length - 1; 0 <= o; o--) {
            var f = l[o],
              d = f.instance,
              y = f.currentTarget;
            if (f = f.listener, d !== s && i.isPropagationStopped()) break e;
            So(i, f, y), s = d;
          } else for (o = 0; o < l.length; o++) {
            if (f = l[o], d = f.instance, y = f.currentTarget, f = f.listener, d !== s && i.isPropagationStopped()) break e;
            So(i, f, y), s = d;
          }
        }
      }
      if (Ar) throw e = ai, Ar = !1, ai = null, e;
    }
    function xe(e, t) {
      var n = t[bi];
      n === void 0 && (n = t[bi] = new Set());
      var l = e + "__bubble";
      n.has(l) || (ko(t, e, 2, !1), n.add(l));
    }
    function Li(e, t, n) {
      var l = 0;
      t && (l |= 4), ko(n, e, l, t);
    }
    var el = "_reactListening" + Math.random().toString(36).slice(2);
    function pr(e) {
      if (!e[el]) {
        e[el] = !0, S.forEach(function (n) {
          n !== "selectionchange" && (ed.has(n) || Li(n, !1, e), Li(n, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[el] || (t[el] = !0, Li("selectionchange", !1, t));
      }
    }
    function ko(e, t, n, l) {
      switch (Ua(t)) {
        case 1:
          var i = pf;
          break;
        case 4:
          i = mf;
          break;
        default:
          i = pi;
      }
      n = i.bind(null, t, n, e), i = void 0, !si || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
      }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
      }) : e.addEventListener(t, n, !1);
    }
    function Ri(e, t, n, l, i) {
      var s = l;
      if (!(t & 1) && !(t & 2) && l !== null) e: for (;;) {
        if (l === null) return;
        var o = l.tag;
        if (o === 3 || o === 4) {
          var f = l.stateNode.containerInfo;
          if (f === i || f.nodeType === 8 && f.parentNode === i) break;
          if (o === 4) for (o = l["return"]; o !== null;) {
            var d = o.tag;
            if ((d === 3 || d === 4) && (d = o.stateNode.containerInfo, d === i || d.nodeType === 8 && d.parentNode === i)) return;
            o = o["return"];
          }
          for (; f !== null;) {
            if (o = an(f), o === null) return;
            if (d = o.tag, d === 5 || d === 6) {
              l = s = o;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l["return"];
      }
      Pa(function () {
        var y = s,
          j = ri(n),
          E = [];
        e: {
          var k = yo.get(e);
          if (k !== void 0) {
            var I = gi,
              M = e;
            switch (e) {
              case "keypress":
                if (Jr(n) === 0) break e;
              case "keydown":
              case "keyup":
                I = Cf;
                break;
              case "focusin":
                M = "focus", I = Si;
                break;
              case "focusout":
                M = "blur", I = Si;
                break;
              case "beforeblur":
              case "afterblur":
                I = Si;
                break;
              case "click":
                if (n.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                I = $a;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                I = yf;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                I = Zf;
                break;
              case po:
              case mo:
              case vo:
                I = Tf;
                break;
              case go:
                I = _f;
                break;
              case "scroll":
                I = vf;
                break;
              case "wheel":
                I = Af;
                break;
              case "copy":
              case "cut":
              case "paste":
                I = wf;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                I = Ga;
            }
            var O = (t & 4) !== 0,
              Le = !O && e === "scroll",
              m = O ? k !== null ? k + "Capture" : null : k;
            O = [];
            for (var h = y, g; h !== null;) {
              g = h;
              var V = g.stateNode;
              if (g.tag === 5 && V !== null && (g = V, m !== null && (V = Qn(h, m), V != null && O.push(mr(h, V, g)))), Le) break;
              h = h["return"];
            }
            0 < O.length && (k = new I(k, M, null, n, j), E.push({
              event: k,
              listeners: O
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (k = e === "mouseover" || e === "pointerover", I = e === "mouseout" || e === "pointerout", k && n !== ni && (M = n.relatedTarget || n.fromElement) && (an(M) || M[Bt])) break e;
            if ((I || k) && (k = j.window === j ? j : (k = j.ownerDocument) ? k.defaultView || k.parentWindow : window, I ? (M = n.relatedTarget || n.toElement, I = y, M = M ? an(M) : null, M !== null && (Le = sn(M), M !== Le || M.tag !== 5 && M.tag !== 6) && (M = null)) : (I = null, M = y), I !== M)) {
              if (O = $a, V = "onMouseLeave", m = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (O = Ga, V = "onPointerLeave", m = "onPointerEnter", h = "pointer"), Le = I == null ? k : Bn(I), g = M == null ? k : Bn(M), k = new O(V, h + "leave", I, n, j), k.target = Le, k.relatedTarget = g, V = null, an(j) === y && (O = new O(m, h + "enter", M, n, j), O.target = g, O.relatedTarget = Le, V = O), Le = V, I && M) t: {
                for (O = I, m = M, h = 0, g = O; g; g = Vn(g)) h++;
                for (g = 0, V = m; V; V = Vn(V)) g++;
                for (; 0 < h - g;) O = Vn(O), h--;
                for (; 0 < g - h;) m = Vn(m), g--;
                for (; h--;) {
                  if (O === m || m !== null && O === m.alternate) break t;
                  O = Vn(O), m = Vn(m);
                }
                O = null;
              } else O = null;
              I !== null && wo(E, k, I, O, !1), M !== null && Le !== null && wo(E, Le, M, O, !0);
            }
          }
          e: {
            if (k = y ? Bn(y) : window, I = k.nodeName && k.nodeName.toLowerCase(), I === "select" || I === "input" && k.type === "file") var D = Uf;else if (to(k)) {
              if (ro) D = Jf;else {
                D = Wf;
                var U = Hf;
              }
            } else (I = k.nodeName) && I.toLowerCase() === "input" && (k.type === "checkbox" || k.type === "radio") && (D = $f);
            if (D && (D = D(e, y))) {
              no(E, D, n, j);
              break e;
            }
            U && U(e, k, y), e === "focusout" && (U = k._wrapperState) && U.controlled && k.type === "number" && Xl(k, "number", k.value);
          }
          switch (U = y ? Bn(y) : window, e) {
            case "focusin":
              (to(U) || U.contentEditable === "true") && (En = U, Pi = y, dr = null);
              break;
            case "focusout":
              dr = Pi = En = null;
              break;
            case "mousedown":
              Vi = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Vi = !1, fo(E, n, j);
              break;
            case "selectionchange":
              if (Xf) break;
            case "keydown":
            case "keyup":
              fo(E, n, j);
          }
          var H;
          if (ki) e: {
            switch (e) {
              case "compositionstart":
                var $ = "onCompositionStart";
                break e;
              case "compositionend":
                $ = "onCompositionEnd";
                break e;
              case "compositionupdate":
                $ = "onCompositionUpdate";
                break e;
            }
            $ = void 0;
          } else jn ? qa(e, n) && ($ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && ($ = "onCompositionStart");
          $ && (Qa && n.locale !== "ko" && (jn || $ !== "onCompositionStart" ? $ === "onCompositionEnd" && jn && (H = Ha()) : (Dt = j, vi = "value" in Dt ? Dt.value : Dt.textContent, jn = !0)), U = tl(y, $), 0 < U.length && ($ = new Ja($, e, null, n, j), E.push({
            event: $,
            listeners: U
          }), H ? $.data = H : (H = eo(n), H !== null && ($.data = H)))), (H = Mf ? Of(e, n) : zf(e, n)) && (y = tl(y, "onBeforeInput"), 0 < y.length && (j = new Ja("onBeforeInput", "beforeinput", null, n, j), E.push({
            event: j,
            listeners: y
          }), j.data = H));
        }
        To(E, t);
      });
    }
    function mr(e, t, n) {
      return {
        instance: e,
        listener: t,
        currentTarget: n
      };
    }
    function tl(e, t) {
      for (var n = t + "Capture", l = []; e !== null;) {
        var i = e,
          s = i.stateNode;
        i.tag === 5 && s !== null && (i = s, s = Qn(e, n), s != null && l.unshift(mr(e, s, i)), s = Qn(e, t), s != null && l.push(mr(e, s, i))), e = e["return"];
      }
      return l;
    }
    function Vn(e) {
      if (e === null) return null;
      do e = e["return"]; while (e && e.tag !== 5);
      return e || null;
    }
    function wo(e, t, n, l, i) {
      for (var s = t._reactName, o = []; n !== null && n !== l;) {
        var f = n,
          d = f.alternate,
          y = f.stateNode;
        if (d !== null && d === l) break;
        f.tag === 5 && y !== null && (f = y, i ? (d = Qn(n, s), d != null && o.unshift(mr(n, d, f))) : i || (d = Qn(n, s), d != null && o.push(mr(n, d, f)))), n = n["return"];
      }
      o.length !== 0 && e.push({
        event: t,
        listeners: o
      });
    }
    var td = /\r\n?/g,
      nd = /\u0000|\uFFFD/g;
    function jo(e) {
      return (typeof e == "string" ? e : "" + e).replace(td, "\n").replace(nd, "");
    }
    function nl(e, t, n) {
      if (t = jo(t), jo(e) !== t && n) throw Error(u(425));
    }
    function rl() {}
    var Zi = null,
      Fi = null;
    function _i(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || _typeof(t.dangerouslySetInnerHTML) == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    var Ii = typeof setTimeout == "function" ? setTimeout : void 0,
      rd = typeof clearTimeout == "function" ? clearTimeout : void 0,
      Eo = typeof Promise == "function" ? Promise : void 0,
      ld = typeof queueMicrotask == "function" ? queueMicrotask : _typeof(Eo) < "u" ? function (e) {
        return Eo.resolve(null).then(e)["catch"](id);
      } : Ii;
    function id(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Ai(e, t) {
      var n = t,
        l = 0;
      do {
        var i = n.nextSibling;
        if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
          if (l === 0) {
            e.removeChild(i), ir(t);
            return;
          }
          l--;
        } else n !== "$" && n !== "$?" && n !== "$!" || l++;
        n = i;
      } while (n);
      ir(t);
    }
    function Ut(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
          if (t === "/$") return null;
        }
      }
      return e;
    }
    function Po(e) {
      e = e.previousSibling;
      for (var t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "$" || n === "$!" || n === "$?") {
            if (t === 0) return e;
            t--;
          } else n === "/$" && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var Nn = Math.random().toString(36).slice(2),
      jt = "__reactFiber$" + Nn,
      vr = "__reactProps$" + Nn,
      Bt = "__reactContainer$" + Nn,
      bi = "__reactEvents$" + Nn,
      sd = "__reactListeners$" + Nn,
      ad = "__reactHandles$" + Nn;
    function an(e) {
      var t = e[jt];
      if (t) return t;
      for (var n = e.parentNode; n;) {
        if (t = n[Bt] || n[jt]) {
          if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Po(e); e !== null;) {
            if (n = e[jt]) return n;
            e = Po(e);
          }
          return t;
        }
        e = n, n = e.parentNode;
      }
      return null;
    }
    function gr(e) {
      return e = e[jt] || e[Bt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function Bn(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(u(33));
    }
    function ll(e) {
      return e[vr] || null;
    }
    var Mi = [],
      Cn = -1;
    function Ht(e) {
      return {
        current: e
      };
    }
    function Se(e) {
      0 > Cn || (e.current = Mi[Cn], Mi[Cn] = null, Cn--);
    }
    function ve(e, t) {
      Cn++, Mi[Cn] = e.current, e.current = t;
    }
    var Wt = {},
      ze = Ht(Wt),
      Xe = Ht(!1),
      on = Wt;
    function Ln(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Wt;
      var l = e.stateNode;
      if (l && l.__reactInternalMemoizedUnmaskedChildContext === t) return l.__reactInternalMemoizedMaskedChildContext;
      var i = {},
        s;
      for (s in n) i[s] = t[s];
      return l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
    }
    function Ye(e) {
      return e = e.childContextTypes, e != null;
    }
    function il() {
      Se(Xe), Se(ze);
    }
    function Vo(e, t, n) {
      if (ze.current !== Wt) throw Error(u(168));
      ve(ze, t), ve(Xe, n);
    }
    function No(e, t, n) {
      var l = e.stateNode;
      if (t = t.childContextTypes, typeof l.getChildContext != "function") return n;
      l = l.getChildContext();
      for (var i in l) if (!(i in t)) throw Error(u(108, me(e) || "Unknown", i));
      return b({}, n, l);
    }
    function sl(e) {
      return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Wt, on = ze.current, ve(ze, e), ve(Xe, Xe.current), !0;
    }
    function Bo(e, t, n) {
      var l = e.stateNode;
      if (!l) throw Error(u(169));
      n ? (e = No(e, t, on), l.__reactInternalMemoizedMergedChildContext = e, Se(Xe), Se(ze), ve(ze, e)) : Se(Xe), ve(Xe, n);
    }
    var Ct = null,
      al = !1,
      Oi = !1;
    function Co(e) {
      Ct === null ? Ct = [e] : Ct.push(e);
    }
    function od(e) {
      al = !0, Co(e);
    }
    function $t() {
      if (!Oi && Ct !== null) {
        Oi = !0;
        var e = 0,
          t = he;
        try {
          var n = Ct;
          for (he = 1; e < n.length; e++) {
            var l = n[e];
            do l = l(!0); while (l !== null);
          }
          Ct = null, al = !1;
        } catch (i) {
          throw Ct !== null && (Ct = Ct.slice(e + 1)), La(oi, $t), i;
        } finally {
          he = t, Oi = !1;
        }
      }
      return null;
    }
    var Rn = [],
      Zn = 0,
      ol = null,
      ul = 0,
      ut = [],
      ct = 0,
      un = null,
      Lt = 1,
      Rt = "";
    function cn(e, t) {
      Rn[Zn++] = ul, Rn[Zn++] = ol, ol = e, ul = t;
    }
    function Lo(e, t, n) {
      ut[ct++] = Lt, ut[ct++] = Rt, ut[ct++] = un, un = e;
      var l = Lt;
      e = Rt;
      var i = 32 - vt(l) - 1;
      l &= ~(1 << i), n += 1;
      var s = 32 - vt(t) + i;
      if (30 < s) {
        var o = i - i % 5;
        s = (l & (1 << o) - 1).toString(32), l >>= o, i -= o, Lt = 1 << 32 - vt(t) + i | n << i | l, Rt = s + e;
      } else Lt = 1 << s | n << i | l, Rt = e;
    }
    function zi(e) {
      e["return"] !== null && (cn(e, 1), Lo(e, 1, 0));
    }
    function Di(e) {
      for (; e === ol;) ol = Rn[--Zn], Rn[Zn] = null, ul = Rn[--Zn], Rn[Zn] = null;
      for (; e === un;) un = ut[--ct], ut[ct] = null, Rt = ut[--ct], ut[ct] = null, Lt = ut[--ct], ut[ct] = null;
    }
    var st = null,
      at = null,
      we = !1,
      yt = null;
    function Ro(e, t) {
      var n = pt(5, null, null, 0);
      n.elementType = "DELETED", n.stateNode = t, n["return"] = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
    }
    function Zo(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, st = e, at = Ut(t.firstChild), !0) : !1;
        case 6:
          return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, st = e, at = null, !0) : !1;
        case 13:
          return t = t.nodeType !== 8 ? null : t, t !== null ? (n = un !== null ? {
            id: Lt,
            overflow: Rt
          } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
          }, n = pt(18, null, null, 0), n.stateNode = t, n["return"] = e, e.child = n, st = e, at = null, !0) : !1;
        default:
          return !1;
      }
    }
    function Ki(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function Ui(e) {
      if (we) {
        var t = at;
        if (t) {
          var n = t;
          if (!Zo(e, t)) {
            if (Ki(e)) throw Error(u(418));
            t = Ut(n.nextSibling);
            var l = st;
            t && Zo(e, t) ? Ro(l, n) : (e.flags = e.flags & -4097 | 2, we = !1, st = e);
          }
        } else {
          if (Ki(e)) throw Error(u(418));
          e.flags = e.flags & -4097 | 2, we = !1, st = e;
        }
      }
    }
    function Fo(e) {
      for (e = e["return"]; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e["return"];
      st = e;
    }
    function cl(e) {
      if (e !== st) return !1;
      if (!we) return Fo(e), we = !0, !1;
      var t;
      if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_i(e.type, e.memoizedProps)), t && (t = at)) {
        if (Ki(e)) throw _o(), Error(u(418));
        for (; t;) Ro(e, t), t = Ut(t.nextSibling);
      }
      if (Fo(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
        e: {
          for (e = e.nextSibling, t = 0; e;) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === "/$") {
                if (t === 0) {
                  at = Ut(e.nextSibling);
                  break e;
                }
                t--;
              } else n !== "$" && n !== "$!" && n !== "$?" || t++;
            }
            e = e.nextSibling;
          }
          at = null;
        }
      } else at = st ? Ut(e.stateNode.nextSibling) : null;
      return !0;
    }
    function _o() {
      for (var e = at; e;) e = Ut(e.nextSibling);
    }
    function Fn() {
      at = st = null, we = !1;
    }
    function Hi(e) {
      yt === null ? yt = [e] : yt.push(e);
    }
    var ud = le.ReactCurrentBatchConfig;
    function yr(e, t, n) {
      if (e = n.ref, e !== null && typeof e != "function" && _typeof(e) != "object") {
        if (n._owner) {
          if (n = n._owner, n) {
            if (n.tag !== 1) throw Error(u(309));
            var l = n.stateNode;
          }
          if (!l) throw Error(u(147, e));
          var i = l,
            s = "" + e;
          return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t = function t(o) {
            var f = i.refs;
            o === null ? delete f[s] : f[s] = o;
          }, t._stringRef = s, t);
        }
        if (typeof e != "string") throw Error(u(284));
        if (!n._owner) throw Error(u(290, e));
      }
      return e;
    }
    function fl(e, t) {
      throw e = Object.prototype.toString.call(t), Error(u(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
    }
    function Io(e) {
      var t = e._init;
      return t(e._payload);
    }
    function Ao(e) {
      function t(m, h) {
        if (e) {
          var g = m.deletions;
          g === null ? (m.deletions = [h], m.flags |= 16) : g.push(h);
        }
      }
      function n(m, h) {
        if (!e) return null;
        for (; h !== null;) t(m, h), h = h.sibling;
        return null;
      }
      function l(m, h) {
        for (m = new Map(); h !== null;) h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
        return m;
      }
      function i(m, h) {
        return m = tn(m, h), m.index = 0, m.sibling = null, m;
      }
      function s(m, h, g) {
        return m.index = g, e ? (g = m.alternate, g !== null ? (g = g.index, g < h ? (m.flags |= 2, h) : g) : (m.flags |= 2, h)) : (m.flags |= 1048576, h);
      }
      function o(m) {
        return e && m.alternate === null && (m.flags |= 2), m;
      }
      function f(m, h, g, V) {
        return h === null || h.tag !== 6 ? (h = Is(g, m.mode, V), h["return"] = m, h) : (h = i(h, g), h["return"] = m, h);
      }
      function d(m, h, g, V) {
        var D = g.type;
        return D === pe ? j(m, h, g.props.children, V, g.key) : h !== null && (h.elementType === D || _typeof(D) == "object" && D !== null && D.$$typeof === Oe && Io(D) === h.type) ? (V = i(h, g.props), V.ref = yr(m, h, g), V["return"] = m, V) : (V = _l(g.type, g.key, g.props, null, m.mode, V), V.ref = yr(m, h, g), V["return"] = m, V);
      }
      function y(m, h, g, V) {
        return h === null || h.tag !== 4 || h.stateNode.containerInfo !== g.containerInfo || h.stateNode.implementation !== g.implementation ? (h = As(g, m.mode, V), h["return"] = m, h) : (h = i(h, g.children || []), h["return"] = m, h);
      }
      function j(m, h, g, V, D) {
        return h === null || h.tag !== 7 ? (h = yn(g, m.mode, V, D), h["return"] = m, h) : (h = i(h, g), h["return"] = m, h);
      }
      function E(m, h, g) {
        if (typeof h == "string" && h !== "" || typeof h == "number") return h = Is("" + h, m.mode, g), h["return"] = m, h;
        if (_typeof(h) == "object" && h !== null) {
          switch (h.$$typeof) {
            case Ee:
              return g = _l(h.type, h.key, h.props, null, m.mode, g), g.ref = yr(m, null, h), g["return"] = m, g;
            case ge:
              return h = As(h, m.mode, g), h["return"] = m, h;
            case Oe:
              var V = h._init;
              return E(m, V(h._payload), g);
          }
          if ($n(h) || W(h)) return h = yn(h, m.mode, g, null), h["return"] = m, h;
          fl(m, h);
        }
        return null;
      }
      function k(m, h, g, V) {
        var D = h !== null ? h.key : null;
        if (typeof g == "string" && g !== "" || typeof g == "number") return D !== null ? null : f(m, h, "" + g, V);
        if (_typeof(g) == "object" && g !== null) {
          switch (g.$$typeof) {
            case Ee:
              return g.key === D ? d(m, h, g, V) : null;
            case ge:
              return g.key === D ? y(m, h, g, V) : null;
            case Oe:
              return D = g._init, k(m, h, D(g._payload), V);
          }
          if ($n(g) || W(g)) return D !== null ? null : j(m, h, g, V, null);
          fl(m, g);
        }
        return null;
      }
      function I(m, h, g, V, D) {
        if (typeof V == "string" && V !== "" || typeof V == "number") return m = m.get(g) || null, f(h, m, "" + V, D);
        if (_typeof(V) == "object" && V !== null) {
          switch (V.$$typeof) {
            case Ee:
              return m = m.get(V.key === null ? g : V.key) || null, d(h, m, V, D);
            case ge:
              return m = m.get(V.key === null ? g : V.key) || null, y(h, m, V, D);
            case Oe:
              var U = V._init;
              return I(m, h, g, U(V._payload), D);
          }
          if ($n(V) || W(V)) return m = m.get(g) || null, j(h, m, V, D, null);
          fl(h, V);
        }
        return null;
      }
      function M(m, h, g, V) {
        for (var D = null, U = null, H = h, $ = h = 0, Ae = null; H !== null && $ < g.length; $++) {
          H.index > $ ? (Ae = H, H = null) : Ae = H.sibling;
          var ae = k(m, H, g[$], V);
          if (ae === null) {
            H === null && (H = Ae);
            break;
          }
          e && H && ae.alternate === null && t(m, H), h = s(ae, h, $), U === null ? D = ae : U.sibling = ae, U = ae, H = Ae;
        }
        if ($ === g.length) return n(m, H), we && cn(m, $), D;
        if (H === null) {
          for (; $ < g.length; $++) H = E(m, g[$], V), H !== null && (h = s(H, h, $), U === null ? D = H : U.sibling = H, U = H);
          return we && cn(m, $), D;
        }
        for (H = l(m, H); $ < g.length; $++) Ae = I(H, m, $, g[$], V), Ae !== null && (e && Ae.alternate !== null && H["delete"](Ae.key === null ? $ : Ae.key), h = s(Ae, h, $), U === null ? D = Ae : U.sibling = Ae, U = Ae);
        return e && H.forEach(function (nn) {
          return t(m, nn);
        }), we && cn(m, $), D;
      }
      function O(m, h, g, V) {
        var D = W(g);
        if (typeof D != "function") throw Error(u(150));
        if (g = D.call(g), g == null) throw Error(u(151));
        for (var U = D = null, H = h, $ = h = 0, Ae = null, ae = g.next(); H !== null && !ae.done; $++, ae = g.next()) {
          H.index > $ ? (Ae = H, H = null) : Ae = H.sibling;
          var nn = k(m, H, ae.value, V);
          if (nn === null) {
            H === null && (H = Ae);
            break;
          }
          e && H && nn.alternate === null && t(m, H), h = s(nn, h, $), U === null ? D = nn : U.sibling = nn, U = nn, H = Ae;
        }
        if (ae.done) return n(m, H), we && cn(m, $), D;
        if (H === null) {
          for (; !ae.done; $++, ae = g.next()) ae = E(m, ae.value, V), ae !== null && (h = s(ae, h, $), U === null ? D = ae : U.sibling = ae, U = ae);
          return we && cn(m, $), D;
        }
        for (H = l(m, H); !ae.done; $++, ae = g.next()) ae = I(H, m, $, ae.value, V), ae !== null && (e && ae.alternate !== null && H["delete"](ae.key === null ? $ : ae.key), h = s(ae, h, $), U === null ? D = ae : U.sibling = ae, U = ae);
        return e && H.forEach(function (Dd) {
          return t(m, Dd);
        }), we && cn(m, $), D;
      }
      function Le(m, h, g, V) {
        if (_typeof(g) == "object" && g !== null && g.type === pe && g.key === null && (g = g.props.children), _typeof(g) == "object" && g !== null) {
          switch (g.$$typeof) {
            case Ee:
              e: {
                for (var D = g.key, U = h; U !== null;) {
                  if (U.key === D) {
                    if (D = g.type, D === pe) {
                      if (U.tag === 7) {
                        n(m, U.sibling), h = i(U, g.props.children), h["return"] = m, m = h;
                        break e;
                      }
                    } else if (U.elementType === D || _typeof(D) == "object" && D !== null && D.$$typeof === Oe && Io(D) === U.type) {
                      n(m, U.sibling), h = i(U, g.props), h.ref = yr(m, U, g), h["return"] = m, m = h;
                      break e;
                    }
                    n(m, U);
                    break;
                  } else t(m, U);
                  U = U.sibling;
                }
                g.type === pe ? (h = yn(g.props.children, m.mode, V, g.key), h["return"] = m, m = h) : (V = _l(g.type, g.key, g.props, null, m.mode, V), V.ref = yr(m, h, g), V["return"] = m, m = V);
              }
              return o(m);
            case ge:
              e: {
                for (U = g.key; h !== null;) {
                  if (h.key === U) {
                    if (h.tag === 4 && h.stateNode.containerInfo === g.containerInfo && h.stateNode.implementation === g.implementation) {
                      n(m, h.sibling), h = i(h, g.children || []), h["return"] = m, m = h;
                      break e;
                    } else {
                      n(m, h);
                      break;
                    }
                  } else t(m, h);
                  h = h.sibling;
                }
                h = As(g, m.mode, V), h["return"] = m, m = h;
              }
              return o(m);
            case Oe:
              return U = g._init, Le(m, h, U(g._payload), V);
          }
          if ($n(g)) return M(m, h, g, V);
          if (W(g)) return O(m, h, g, V);
          fl(m, g);
        }
        return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, h !== null && h.tag === 6 ? (n(m, h.sibling), h = i(h, g), h["return"] = m, m = h) : (n(m, h), h = Is(g, m.mode, V), h["return"] = m, m = h), o(m)) : n(m, h);
      }
      return Le;
    }
    var _n = Ao(!0),
      bo = Ao(!1),
      dl = Ht(null),
      hl = null,
      In = null,
      Wi = null;
    function $i() {
      Wi = In = hl = null;
    }
    function Ji(e) {
      var t = dl.current;
      Se(dl), e._currentValue = t;
    }
    function Gi(e, t, n) {
      for (; e !== null;) {
        var l = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
        e = e["return"];
      }
    }
    function An(e, t) {
      hl = e, Wi = In = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (qe = !0), e.firstContext = null);
    }
    function ft(e) {
      var t = e._currentValue;
      if (Wi !== e) if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, In === null) {
        if (hl === null) throw Error(u(308));
        In = e, hl.dependencies = {
          lanes: 0,
          firstContext: e
        };
      } else In = In.next = e;
      return t;
    }
    var fn = null;
    function Qi(e) {
      fn === null ? fn = [e] : fn.push(e);
    }
    function Mo(e, t, n, l) {
      var i = t.interleaved;
      return i === null ? (n.next = n, Qi(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Zt(e, l);
    }
    function Zt(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e["return"]; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e["return"];
      return n.tag === 3 ? n.stateNode : null;
    }
    var Jt = !1;
    function Xi(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: 0
        },
        effects: null
      };
    }
    function Oo(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
      });
    }
    function Ft(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Gt(e, t, n) {
      var l = e.updateQueue;
      if (l === null) return null;
      if (l = l.shared, re & 2) {
        var i = l.pending;
        return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, Zt(e, n);
      }
      return i = l.interleaved, i === null ? (t.next = t, Qi(l)) : (t.next = i.next, i.next = t), l.interleaved = t, Zt(e, n);
    }
    function pl(e, t, n) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var l = t.lanes;
        l &= e.pendingLanes, n |= l, t.lanes = n, fi(e, n);
      }
    }
    function zo(e, t) {
      var n = e.updateQueue,
        l = e.alternate;
      if (l !== null && (l = l.updateQueue, n === l)) {
        var i = null,
          s = null;
        if (n = n.firstBaseUpdate, n !== null) {
          do {
            var o = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null
            };
            s === null ? i = s = o : s = s.next = o, n = n.next;
          } while (n !== null);
          s === null ? i = s = t : s = s.next = t;
        } else i = s = t;
        n = {
          baseState: l.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: s,
          shared: l.shared,
          effects: l.effects
        }, e.updateQueue = n;
        return;
      }
      e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
    }
    function ml(e, t, n, l) {
      var i = e.updateQueue;
      Jt = !1;
      var s = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        f = i.shared.pending;
      if (f !== null) {
        i.shared.pending = null;
        var d = f,
          y = d.next;
        d.next = null, o === null ? s = y : o.next = y, o = d;
        var j = e.alternate;
        j !== null && (j = j.updateQueue, f = j.lastBaseUpdate, f !== o && (f === null ? j.firstBaseUpdate = y : f.next = y, j.lastBaseUpdate = d));
      }
      if (s !== null) {
        var E = i.baseState;
        o = 0, j = y = d = null, f = s;
        do {
          var k = f.lane,
            I = f.eventTime;
          if ((l & k) === k) {
            j !== null && (j = j.next = {
              eventTime: I,
              lane: 0,
              tag: f.tag,
              payload: f.payload,
              callback: f.callback,
              next: null
            });
            e: {
              var M = e,
                O = f;
              switch (k = t, I = n, O.tag) {
                case 1:
                  if (M = O.payload, typeof M == "function") {
                    E = M.call(I, E, k);
                    break e;
                  }
                  E = M;
                  break e;
                case 3:
                  M.flags = M.flags & -65537 | 128;
                case 0:
                  if (M = O.payload, k = typeof M == "function" ? M.call(I, E, k) : M, k == null) break e;
                  E = b({}, E, k);
                  break e;
                case 2:
                  Jt = !0;
              }
            }
            f.callback !== null && f.lane !== 0 && (e.flags |= 64, k = i.effects, k === null ? i.effects = [f] : k.push(f));
          } else I = {
            eventTime: I,
            lane: k,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, j === null ? (y = j = I, d = E) : j = j.next = I, o |= k;
          if (f = f.next, f === null) {
            if (f = i.shared.pending, f === null) break;
            k = f, f = k.next, k.next = null, i.lastBaseUpdate = k, i.shared.pending = null;
          }
        } while (!0);
        if (j === null && (d = E), i.baseState = d, i.firstBaseUpdate = y, i.lastBaseUpdate = j, t = i.shared.interleaved, t !== null) {
          i = t;
          do o |= i.lane, i = i.next; while (i !== t);
        } else s === null && (i.shared.lanes = 0);
        pn |= o, e.lanes = o, e.memoizedState = E;
      }
    }
    function Do(e, t, n) {
      if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
        var l = e[t],
          i = l.callback;
        if (i !== null) {
          if (l.callback = null, l = n, typeof i != "function") throw Error(u(191, i));
          i.call(l);
        }
      }
    }
    var xr = {},
      Et = Ht(xr),
      Sr = Ht(xr),
      Tr = Ht(xr);
    function dn(e) {
      if (e === xr) throw Error(u(174));
      return e;
    }
    function Yi(e, t) {
      switch (ve(Tr, t), ve(Sr, e), ve(Et, xr), e = t.nodeType, e) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : ql(null, "");
          break;
        default:
          e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ql(t, e);
      }
      Se(Et), ve(Et, t);
    }
    function bn() {
      Se(Et), Se(Sr), Se(Tr);
    }
    function Ko(e) {
      dn(Tr.current);
      var t = dn(Et.current),
        n = ql(t, e.type);
      t !== n && (ve(Sr, e), ve(Et, n));
    }
    function qi(e) {
      Sr.current === e && (Se(Et), Se(Sr));
    }
    var Pe = Ht(0);
    function vl(e) {
      for (var t = e; t !== null;) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          t.child["return"] = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t["return"] === null || t["return"] === e) return null;
          t = t["return"];
        }
        t.sibling["return"] = t["return"], t = t.sibling;
      }
      return null;
    }
    var es = [];
    function ts() {
      for (var e = 0; e < es.length; e++) es[e]._workInProgressVersionPrimary = null;
      es.length = 0;
    }
    var gl = le.ReactCurrentDispatcher,
      ns = le.ReactCurrentBatchConfig,
      hn = 0,
      Ve = null,
      Ze = null,
      _e = null,
      yl = !1,
      kr = !1,
      wr = 0,
      cd = 0;
    function De() {
      throw Error(u(321));
    }
    function rs(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!gt(e[n], t[n])) return !1;
      return !0;
    }
    function ls(e, t, n, l, i, s) {
      if (hn = s, Ve = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, gl.current = e === null || e.memoizedState === null ? pd : md, e = n(l, i), kr) {
        s = 0;
        do {
          if (kr = !1, wr = 0, 25 <= s) throw Error(u(301));
          s += 1, _e = Ze = null, t.updateQueue = null, gl.current = vd, e = n(l, i);
        } while (kr);
      }
      if (gl.current = Tl, t = Ze !== null && Ze.next !== null, hn = 0, _e = Ze = Ve = null, yl = !1, t) throw Error(u(300));
      return e;
    }
    function is() {
      var e = wr !== 0;
      return wr = 0, e;
    }
    function Pt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return _e === null ? Ve.memoizedState = _e = e : _e = _e.next = e, _e;
    }
    function dt() {
      if (Ze === null) {
        var e = Ve.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Ze.next;
      var t = _e === null ? Ve.memoizedState : _e.next;
      if (t !== null) _e = t, Ze = e;else {
        if (e === null) throw Error(u(310));
        Ze = e, e = {
          memoizedState: Ze.memoizedState,
          baseState: Ze.baseState,
          baseQueue: Ze.baseQueue,
          queue: Ze.queue,
          next: null
        }, _e === null ? Ve.memoizedState = _e = e : _e = _e.next = e;
      }
      return _e;
    }
    function jr(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ss(e) {
      var t = dt(),
        n = t.queue;
      if (n === null) throw Error(u(311));
      n.lastRenderedReducer = e;
      var l = Ze,
        i = l.baseQueue,
        s = n.pending;
      if (s !== null) {
        if (i !== null) {
          var o = i.next;
          i.next = s.next, s.next = o;
        }
        l.baseQueue = i = s, n.pending = null;
      }
      if (i !== null) {
        s = i.next, l = l.baseState;
        var f = o = null,
          d = null,
          y = s;
        do {
          var j = y.lane;
          if ((hn & j) === j) d !== null && (d = d.next = {
            lane: 0,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }), l = y.hasEagerState ? y.eagerState : e(l, y.action);else {
            var E = {
              lane: j,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            };
            d === null ? (f = d = E, o = l) : d = d.next = E, Ve.lanes |= j, pn |= j;
          }
          y = y.next;
        } while (y !== null && y !== s);
        d === null ? o = l : d.next = f, gt(l, t.memoizedState) || (qe = !0), t.memoizedState = l, t.baseState = o, t.baseQueue = d, n.lastRenderedState = l;
      }
      if (e = n.interleaved, e !== null) {
        i = e;
        do s = i.lane, Ve.lanes |= s, pn |= s, i = i.next; while (i !== e);
      } else i === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function as(e) {
      var t = dt(),
        n = t.queue;
      if (n === null) throw Error(u(311));
      n.lastRenderedReducer = e;
      var l = n.dispatch,
        i = n.pending,
        s = t.memoizedState;
      if (i !== null) {
        n.pending = null;
        var o = i = i.next;
        do s = e(s, o.action), o = o.next; while (o !== i);
        gt(s, t.memoizedState) || (qe = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), n.lastRenderedState = s;
      }
      return [s, l];
    }
    function Uo() {}
    function Ho(e, t) {
      var n = Ve,
        l = dt(),
        i = t(),
        s = !gt(l.memoizedState, i);
      if (s && (l.memoizedState = i, qe = !0), l = l.queue, os(Jo.bind(null, n, l, e), [e]), l.getSnapshot !== t || s || _e !== null && _e.memoizedState.tag & 1) {
        if (n.flags |= 2048, Er(9, $o.bind(null, n, l, i, t), void 0, null), Ie === null) throw Error(u(349));
        hn & 30 || Wo(n, t, i);
      }
      return i;
    }
    function Wo(e, t, n) {
      e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
      }, t = Ve.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ve.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
    }
    function $o(e, t, n, l) {
      t.value = n, t.getSnapshot = l, Go(t) && Qo(e);
    }
    function Jo(e, t, n) {
      return n(function () {
        Go(t) && Qo(e);
      });
    }
    function Go(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !gt(e, n);
      } catch (_unused6) {
        return !0;
      }
    }
    function Qo(e) {
      var t = Zt(e, 1);
      t !== null && kt(t, e, 1, -1);
    }
    function Xo(e) {
      var t = Pt();
      return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jr,
        lastRenderedState: e
      }, t.queue = e, e = e.dispatch = hd.bind(null, Ve, e), [t.memoizedState, e];
    }
    function Er(e, t, n, l) {
      return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: l,
        next: null
      }, t = Ve.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
      }, Ve.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e)), e;
    }
    function Yo() {
      return dt().memoizedState;
    }
    function xl(e, t, n, l) {
      var i = Pt();
      Ve.flags |= e, i.memoizedState = Er(1 | t, n, void 0, l === void 0 ? null : l);
    }
    function Sl(e, t, n, l) {
      var i = dt();
      l = l === void 0 ? null : l;
      var s = void 0;
      if (Ze !== null) {
        var o = Ze.memoizedState;
        if (s = o.destroy, l !== null && rs(l, o.deps)) {
          i.memoizedState = Er(t, n, s, l);
          return;
        }
      }
      Ve.flags |= e, i.memoizedState = Er(1 | t, n, s, l);
    }
    function qo(e, t) {
      return xl(8390656, 8, e, t);
    }
    function os(e, t) {
      return Sl(2048, 8, e, t);
    }
    function eu(e, t) {
      return Sl(4, 2, e, t);
    }
    function tu(e, t) {
      return Sl(4, 4, e, t);
    }
    function nu(e, t) {
      if (typeof t == "function") return e = e(), t(e), function () {
        t(null);
      };
      if (t != null) return e = e(), t.current = e, function () {
        t.current = null;
      };
    }
    function ru(e, t, n) {
      return n = n != null ? n.concat([e]) : null, Sl(4, 4, nu.bind(null, t, e), n);
    }
    function us() {}
    function lu(e, t) {
      var n = dt();
      t = t === void 0 ? null : t;
      var l = n.memoizedState;
      return l !== null && t !== null && rs(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
    }
    function iu(e, t) {
      var n = dt();
      t = t === void 0 ? null : t;
      var l = n.memoizedState;
      return l !== null && t !== null && rs(t, l[1]) ? l[0] : (e = e(), n.memoizedState = [e, t], e);
    }
    function su(e, t, n) {
      return hn & 21 ? (gt(n, t) || (n = _a(), Ve.lanes |= n, pn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, qe = !0), e.memoizedState = n);
    }
    function fd(e, t) {
      var n = he;
      he = n !== 0 && 4 > n ? n : 4, e(!0);
      var l = ns.transition;
      ns.transition = {};
      try {
        e(!1), t();
      } finally {
        he = n, ns.transition = l;
      }
    }
    function au() {
      return dt().memoizedState;
    }
    function dd(e, t, n) {
      var l = qt(e);
      if (n = {
        lane: l,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, ou(e)) uu(t, n);else if (n = Mo(e, t, n, l), n !== null) {
        var i = $e();
        kt(n, e, l, i), cu(n, t, l);
      }
    }
    function hd(e, t, n) {
      var l = qt(e),
        i = {
          lane: l,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null
        };
      if (ou(e)) uu(t, i);else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null)) try {
          var o = t.lastRenderedState,
            f = s(o, n);
          if (i.hasEagerState = !0, i.eagerState = f, gt(f, o)) {
            var d = t.interleaved;
            d === null ? (i.next = i, Qi(t)) : (i.next = d.next, d.next = i), t.interleaved = i;
            return;
          }
        } catch (_unused7) {} finally {}
        n = Mo(e, t, i, l), n !== null && (i = $e(), kt(n, e, l, i), cu(n, t, l));
      }
    }
    function ou(e) {
      var t = e.alternate;
      return e === Ve || t !== null && t === Ve;
    }
    function uu(e, t) {
      kr = yl = !0;
      var n = e.pending;
      n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
    }
    function cu(e, t, n) {
      if (n & 4194240) {
        var l = t.lanes;
        l &= e.pendingLanes, n |= l, t.lanes = n, fi(e, n);
      }
    }
    var Tl = {
        readContext: ft,
        useCallback: De,
        useContext: De,
        useEffect: De,
        useImperativeHandle: De,
        useInsertionEffect: De,
        useLayoutEffect: De,
        useMemo: De,
        useReducer: De,
        useRef: De,
        useState: De,
        useDebugValue: De,
        useDeferredValue: De,
        useTransition: De,
        useMutableSource: De,
        useSyncExternalStore: De,
        useId: De,
        unstable_isNewReconciler: !1
      },
      pd = {
        readContext: ft,
        useCallback: function useCallback(e, t) {
          return Pt().memoizedState = [e, t === void 0 ? null : t], e;
        },
        useContext: ft,
        useEffect: qo,
        useImperativeHandle: function useImperativeHandle(e, t, n) {
          return n = n != null ? n.concat([e]) : null, xl(4194308, 4, nu.bind(null, t, e), n);
        },
        useLayoutEffect: function useLayoutEffect(e, t) {
          return xl(4194308, 4, e, t);
        },
        useInsertionEffect: function useInsertionEffect(e, t) {
          return xl(4, 2, e, t);
        },
        useMemo: function useMemo(e, t) {
          var n = Pt();
          return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
        },
        useReducer: function useReducer(e, t, n) {
          var l = Pt();
          return t = n !== void 0 ? n(t) : t, l.memoizedState = l.baseState = t, e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
          }, l.queue = e, e = e.dispatch = dd.bind(null, Ve, e), [l.memoizedState, e];
        },
        useRef: function useRef(e) {
          var t = Pt();
          return e = {
            current: e
          }, t.memoizedState = e;
        },
        useState: Xo,
        useDebugValue: us,
        useDeferredValue: function useDeferredValue(e) {
          return Pt().memoizedState = e;
        },
        useTransition: function useTransition() {
          var e = Xo(!1),
            t = e[0];
          return e = fd.bind(null, e[1]), Pt().memoizedState = e, [t, e];
        },
        useMutableSource: function useMutableSource() {},
        useSyncExternalStore: function useSyncExternalStore(e, t, n) {
          var l = Ve,
            i = Pt();
          if (we) {
            if (n === void 0) throw Error(u(407));
            n = n();
          } else {
            if (n = t(), Ie === null) throw Error(u(349));
            hn & 30 || Wo(l, t, n);
          }
          i.memoizedState = n;
          var s = {
            value: n,
            getSnapshot: t
          };
          return i.queue = s, qo(Jo.bind(null, l, s, e), [e]), l.flags |= 2048, Er(9, $o.bind(null, l, s, n, t), void 0, null), n;
        },
        useId: function useId() {
          var e = Pt(),
            t = Ie.identifierPrefix;
          if (we) {
            var n = Rt,
              l = Lt;
            n = (l & ~(1 << 32 - vt(l) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = wr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
          } else n = cd++, t = ":" + t + "r" + n.toString(32) + ":";
          return e.memoizedState = t;
        },
        unstable_isNewReconciler: !1
      },
      md = {
        readContext: ft,
        useCallback: lu,
        useContext: ft,
        useEffect: os,
        useImperativeHandle: ru,
        useInsertionEffect: eu,
        useLayoutEffect: tu,
        useMemo: iu,
        useReducer: ss,
        useRef: Yo,
        useState: function useState() {
          return ss(jr);
        },
        useDebugValue: us,
        useDeferredValue: function useDeferredValue(e) {
          var t = dt();
          return su(t, Ze.memoizedState, e);
        },
        useTransition: function useTransition() {
          var e = ss(jr)[0],
            t = dt().memoizedState;
          return [e, t];
        },
        useMutableSource: Uo,
        useSyncExternalStore: Ho,
        useId: au,
        unstable_isNewReconciler: !1
      },
      vd = {
        readContext: ft,
        useCallback: lu,
        useContext: ft,
        useEffect: os,
        useImperativeHandle: ru,
        useInsertionEffect: eu,
        useLayoutEffect: tu,
        useMemo: iu,
        useReducer: as,
        useRef: Yo,
        useState: function useState() {
          return as(jr);
        },
        useDebugValue: us,
        useDeferredValue: function useDeferredValue(e) {
          var t = dt();
          return Ze === null ? t.memoizedState = e : su(t, Ze.memoizedState, e);
        },
        useTransition: function useTransition() {
          var e = as(jr)[0],
            t = dt().memoizedState;
          return [e, t];
        },
        useMutableSource: Uo,
        useSyncExternalStore: Ho,
        useId: au,
        unstable_isNewReconciler: !1
      };
    function xt(e, t) {
      if (e && e.defaultProps) {
        t = b({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    function cs(e, t, n, l) {
      t = e.memoizedState, n = n(l, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
    }
    var kl = {
      isMounted: function isMounted(e) {
        return (e = e._reactInternals) ? sn(e) === e : !1;
      },
      enqueueSetState: function enqueueSetState(e, t, n) {
        e = e._reactInternals;
        var l = $e(),
          i = qt(e),
          s = Ft(l, i);
        s.payload = t, n != null && (s.callback = n), t = Gt(e, s, i), t !== null && (kt(t, e, i, l), pl(t, e, i));
      },
      enqueueReplaceState: function enqueueReplaceState(e, t, n) {
        e = e._reactInternals;
        var l = $e(),
          i = qt(e),
          s = Ft(l, i);
        s.tag = 1, s.payload = t, n != null && (s.callback = n), t = Gt(e, s, i), t !== null && (kt(t, e, i, l), pl(t, e, i));
      },
      enqueueForceUpdate: function enqueueForceUpdate(e, t) {
        e = e._reactInternals;
        var n = $e(),
          l = qt(e),
          i = Ft(n, l);
        i.tag = 2, t != null && (i.callback = t), t = Gt(e, i, l), t !== null && (kt(t, e, l, n), pl(t, e, l));
      }
    };
    function fu(e, t, n, l, i, s, o) {
      return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, s, o) : t.prototype && t.prototype.isPureReactComponent ? !fr(n, l) || !fr(i, s) : !0;
    }
    function du(e, t, n) {
      var l = !1,
        i = Wt,
        s = t.contextType;
      return _typeof(s) == "object" && s !== null ? s = ft(s) : (i = Ye(t) ? on : ze.current, l = t.contextTypes, s = (l = l != null) ? Ln(e, i) : Wt), t = new t(n, s), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, l && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = s), t;
    }
    function hu(e, t, n, l) {
      e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && kl.enqueueReplaceState(t, t.state, null);
    }
    function fs(e, t, n, l) {
      var i = e.stateNode;
      i.props = n, i.state = e.memoizedState, i.refs = {}, Xi(e);
      var s = t.contextType;
      _typeof(s) == "object" && s !== null ? i.context = ft(s) : (s = Ye(t) ? on : ze.current, i.context = Ln(e, s)), i.state = e.memoizedState, s = t.getDerivedStateFromProps, typeof s == "function" && (cs(e, t, s, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && kl.enqueueReplaceState(i, i.state, null), ml(e, n, i, l), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
    }
    function Mn(e, t) {
      try {
        var n = "",
          l = t;
        do n += ie(l), l = l["return"]; while (l);
        var i = n;
      } catch (s) {
        i = "\nError generating stack: " + s.message + "\n" + s.stack;
      }
      return {
        value: e,
        source: t,
        stack: i,
        digest: null
      };
    }
    function ds(e, t, n) {
      return {
        value: e,
        source: null,
        stack: n !== null && n !== void 0 ? n : null,
        digest: t !== null && t !== void 0 ? t : null
      };
    }
    function hs(e, t) {
      try {
        console.error(t.value);
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    var gd = typeof WeakMap == "function" ? WeakMap : Map;
    function pu(e, t, n) {
      n = Ft(-1, n), n.tag = 3, n.payload = {
        element: null
      };
      var l = t.value;
      return n.callback = function () {
        Bl || (Bl = !0, Ns = l), hs(e, t);
      }, n;
    }
    function mu(e, t, n) {
      n = Ft(-1, n), n.tag = 3;
      var l = e.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var i = t.value;
        n.payload = function () {
          return l(i);
        }, n.callback = function () {
          hs(e, t);
        };
      }
      var s = e.stateNode;
      return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function () {
        hs(e, t), typeof l != "function" && (Xt === null ? Xt = new Set([this]) : Xt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : ""
        });
      }), n;
    }
    function vu(e, t, n) {
      var l = e.pingCache;
      if (l === null) {
        l = e.pingCache = new gd();
        var i = new Set();
        l.set(t, i);
      } else i = l.get(t), i === void 0 && (i = new Set(), l.set(t, i));
      i.has(n) || (i.add(n), e = Ld.bind(null, e, t, n), t.then(e, e));
    }
    function gu(e) {
      do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e["return"];
      } while (e !== null);
      return null;
    }
    function yu(e, t, n, l, i) {
      return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ft(-1, 1), t.tag = 2, Gt(n, t, 1))), n.lanes |= 1), e);
    }
    var yd = le.ReactCurrentOwner,
      qe = !1;
    function We(e, t, n, l) {
      t.child = e === null ? bo(t, null, n, l) : _n(t, e.child, n, l);
    }
    function xu(e, t, n, l, i) {
      n = n.render;
      var s = t.ref;
      return An(t, i), l = ls(e, t, n, l, s, i), n = is(), e !== null && !qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, _t(e, t, i)) : (we && n && zi(t), t.flags |= 1, We(e, t, l, i), t.child);
    }
    function Su(e, t, n, l, i) {
      if (e === null) {
        var s = n.type;
        return typeof s == "function" && !_s(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = s, Tu(e, t, s, l, i)) : (e = _l(n.type, null, l, t, t.mode, i), e.ref = t.ref, e["return"] = t, t.child = e);
      }
      if (s = e.child, !(e.lanes & i)) {
        var o = s.memoizedProps;
        if (n = n.compare, n = n !== null ? n : fr, n(o, l) && e.ref === t.ref) return _t(e, t, i);
      }
      return t.flags |= 1, e = tn(s, l), e.ref = t.ref, e["return"] = t, t.child = e;
    }
    function Tu(e, t, n, l, i) {
      if (e !== null) {
        var s = e.memoizedProps;
        if (fr(s, l) && e.ref === t.ref) if (qe = !1, t.pendingProps = l = s, (e.lanes & i) !== 0) e.flags & 131072 && (qe = !0);else return t.lanes = e.lanes, _t(e, t, i);
      }
      return ps(e, t, n, l, i);
    }
    function ku(e, t, n) {
      var l = t.pendingProps,
        i = l.children,
        s = e !== null ? e.memoizedState : null;
      if (l.mode === "hidden") {
        if (!(t.mode & 1)) t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }, ve(zn, ot), ot |= n;else {
          if (!(n & 1073741824)) return e = s !== null ? s.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null
          }, t.updateQueue = null, ve(zn, ot), ot |= e, null;
          t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
          }, l = s !== null ? s.baseLanes : n, ve(zn, ot), ot |= l;
        }
      } else s !== null ? (l = s.baseLanes | n, t.memoizedState = null) : l = n, ve(zn, ot), ot |= l;
      return We(e, t, i, n), t.child;
    }
    function wu(e, t) {
      var n = t.ref;
      (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
    }
    function ps(e, t, n, l, i) {
      var s = Ye(n) ? on : ze.current;
      return s = Ln(t, s), An(t, i), n = ls(e, t, n, l, s, i), l = is(), e !== null && !qe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, _t(e, t, i)) : (we && l && zi(t), t.flags |= 1, We(e, t, n, i), t.child);
    }
    function ju(e, t, n, l, i) {
      if (Ye(n)) {
        var s = !0;
        sl(t);
      } else s = !1;
      if (An(t, i), t.stateNode === null) jl(e, t), du(t, n, l), fs(t, n, l, i), l = !0;else if (e === null) {
        var o = t.stateNode,
          f = t.memoizedProps;
        o.props = f;
        var d = o.context,
          y = n.contextType;
        _typeof(y) == "object" && y !== null ? y = ft(y) : (y = Ye(n) ? on : ze.current, y = Ln(t, y));
        var j = n.getDerivedStateFromProps,
          E = typeof j == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        E || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (f !== l || d !== y) && hu(t, o, l, y), Jt = !1;
        var k = t.memoizedState;
        o.state = k, ml(t, l, o, i), d = t.memoizedState, f !== l || k !== d || Xe.current || Jt ? (typeof j == "function" && (cs(t, n, j, l), d = t.memoizedState), (f = Jt || fu(t, n, f, l, k, d, y)) ? (E || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = d), o.props = l, o.state = d, o.context = y, l = f) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
      } else {
        o = t.stateNode, Oo(e, t), f = t.memoizedProps, y = t.type === t.elementType ? f : xt(t.type, f), o.props = y, E = t.pendingProps, k = o.context, d = n.contextType, _typeof(d) == "object" && d !== null ? d = ft(d) : (d = Ye(n) ? on : ze.current, d = Ln(t, d));
        var I = n.getDerivedStateFromProps;
        (j = typeof I == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (f !== E || k !== d) && hu(t, o, l, d), Jt = !1, k = t.memoizedState, o.state = k, ml(t, l, o, i);
        var M = t.memoizedState;
        f !== E || k !== M || Xe.current || Jt ? (typeof I == "function" && (cs(t, n, I, l), M = t.memoizedState), (y = Jt || fu(t, n, y, l, k, M, d) || !1) ? (j || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(l, M, d), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(l, M, d)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = M), o.props = l, o.state = M, o.context = d, l = y) : (typeof o.componentDidUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), l = !1);
      }
      return ms(e, t, n, l, s, i);
    }
    function ms(e, t, n, l, i, s) {
      wu(e, t);
      var o = (t.flags & 128) !== 0;
      if (!l && !o) return i && Bo(t, n, !1), _t(e, t, s);
      l = t.stateNode, yd.current = t;
      var f = o && typeof n.getDerivedStateFromError != "function" ? null : l.render();
      return t.flags |= 1, e !== null && o ? (t.child = _n(t, e.child, null, s), t.child = _n(t, null, f, s)) : We(e, t, f, s), t.memoizedState = l.state, i && Bo(t, n, !0), t.child;
    }
    function Eu(e) {
      var t = e.stateNode;
      t.pendingContext ? Vo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Vo(e, t.context, !1), Yi(e, t.containerInfo);
    }
    function Pu(e, t, n, l, i) {
      return Fn(), Hi(i), t.flags |= 256, We(e, t, n, l), t.child;
    }
    var vs = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0
    };
    function gs(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null
      };
    }
    function Vu(e, t, n) {
      var l = t.pendingProps,
        i = Pe.current,
        s = !1,
        o = (t.flags & 128) !== 0,
        f;
      if ((f = o) || (f = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), f ? (s = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ve(Pe, i & 1), e === null) return Ui(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = l.children, e = l.fallback, s ? (l = t.mode, s = t.child, o = {
        mode: "hidden",
        children: o
      }, !(l & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = Il(o, l, 0, null), e = yn(e, l, n, null), s["return"] = t, e["return"] = t, s.sibling = e, t.child = s, t.child.memoizedState = gs(n), t.memoizedState = vs, e) : ys(t, o));
      if (i = e.memoizedState, i !== null && (f = i.dehydrated, f !== null)) return xd(e, t, o, l, f, i, n);
      if (s) {
        s = l.fallback, o = t.mode, i = e.child, f = i.sibling;
        var d = {
          mode: "hidden",
          children: l.children
        };
        return !(o & 1) && t.child !== i ? (l = t.child, l.childLanes = 0, l.pendingProps = d, t.deletions = null) : (l = tn(i, d), l.subtreeFlags = i.subtreeFlags & 14680064), f !== null ? s = tn(f, s) : (s = yn(s, o, n, null), s.flags |= 2), s["return"] = t, l["return"] = t, l.sibling = s, t.child = l, l = s, s = t.child, o = e.child.memoizedState, o = o === null ? gs(n) : {
          baseLanes: o.baseLanes | n,
          cachePool: null,
          transitions: o.transitions
        }, s.memoizedState = o, s.childLanes = e.childLanes & ~n, t.memoizedState = vs, l;
      }
      return s = e.child, e = s.sibling, l = tn(s, {
        mode: "visible",
        children: l.children
      }), !(t.mode & 1) && (l.lanes = n), l["return"] = t, l.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = l, t.memoizedState = null, l;
    }
    function ys(e, t) {
      return t = Il({
        mode: "visible",
        children: t
      }, e.mode, 0, null), t["return"] = e, e.child = t;
    }
    function wl(e, t, n, l) {
      return l !== null && Hi(l), _n(t, e.child, null, n), e = ys(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
    }
    function xd(e, t, n, l, i, s, o) {
      if (n) return t.flags & 256 ? (t.flags &= -257, l = ds(Error(u(422))), wl(e, t, o, l)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (s = l.fallback, i = t.mode, l = Il({
        mode: "visible",
        children: l.children
      }, i, 0, null), s = yn(s, i, o, null), s.flags |= 2, l["return"] = t, s["return"] = t, l.sibling = s, t.child = l, t.mode & 1 && _n(t, e.child, null, o), t.child.memoizedState = gs(o), t.memoizedState = vs, s);
      if (!(t.mode & 1)) return wl(e, t, o, null);
      if (i.data === "$!") {
        if (l = i.nextSibling && i.nextSibling.dataset, l) var f = l.dgst;
        return l = f, s = Error(u(419)), l = ds(s, l, void 0), wl(e, t, o, l);
      }
      if (f = (o & e.childLanes) !== 0, qe || f) {
        if (l = Ie, l !== null) {
          switch (o & -o) {
            case 4:
              i = 2;
              break;
            case 16:
              i = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              i = 32;
              break;
            case 536870912:
              i = 268435456;
              break;
            default:
              i = 0;
          }
          i = i & (l.suspendedLanes | o) ? 0 : i, i !== 0 && i !== s.retryLane && (s.retryLane = i, Zt(e, i), kt(l, e, i, -1));
        }
        return Fs(), l = ds(Error(u(421))), wl(e, t, o, l);
      }
      return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Rd.bind(null, e), i._reactRetry = t, null) : (e = s.treeContext, at = Ut(i.nextSibling), st = t, we = !0, yt = null, e !== null && (ut[ct++] = Lt, ut[ct++] = Rt, ut[ct++] = un, Lt = e.id, Rt = e.overflow, un = t), t = ys(t, l.children), t.flags |= 4096, t);
    }
    function Nu(e, t, n) {
      e.lanes |= t;
      var l = e.alternate;
      l !== null && (l.lanes |= t), Gi(e["return"], t, n);
    }
    function xs(e, t, n, l, i) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: l,
        tail: n,
        tailMode: i
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = l, s.tail = n, s.tailMode = i);
    }
    function Bu(e, t, n) {
      var l = t.pendingProps,
        i = l.revealOrder,
        s = l.tail;
      if (We(e, t, l.children, n), l = Pe.current, l & 2) l = l & 1 | 2, t.flags |= 128;else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
          if (e.tag === 13) e.memoizedState !== null && Nu(e, n, t);else if (e.tag === 19) Nu(e, n, t);else if (e.child !== null) {
            e.child["return"] = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null;) {
            if (e["return"] === null || e["return"] === t) break e;
            e = e["return"];
          }
          e.sibling["return"] = e["return"], e = e.sibling;
        }
        l &= 1;
      }
      if (ve(Pe, l), !(t.mode & 1)) t.memoizedState = null;else switch (i) {
        case "forwards":
          for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && vl(e) === null && (i = n), n = n.sibling;
          n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), xs(t, !1, i, n, s);
          break;
        case "backwards":
          for (n = null, i = t.child, t.child = null; i !== null;) {
            if (e = i.alternate, e !== null && vl(e) === null) {
              t.child = i;
              break;
            }
            e = i.sibling, i.sibling = n, n = i, i = e;
          }
          xs(t, !0, n, null, s);
          break;
        case "together":
          xs(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function jl(e, t) {
      !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
    }
    function _t(e, t, n) {
      if (e !== null && (t.dependencies = e.dependencies), pn |= t.lanes, !(n & t.childLanes)) return null;
      if (e !== null && t.child !== e.child) throw Error(u(153));
      if (t.child !== null) {
        for (e = t.child, n = tn(e, e.pendingProps), t.child = n, n["return"] = t; e.sibling !== null;) e = e.sibling, n = n.sibling = tn(e, e.pendingProps), n["return"] = t;
        n.sibling = null;
      }
      return t.child;
    }
    function Sd(e, t, n) {
      switch (t.tag) {
        case 3:
          Eu(t), Fn();
          break;
        case 5:
          Ko(t);
          break;
        case 1:
          Ye(t.type) && sl(t);
          break;
        case 4:
          Yi(t, t.stateNode.containerInfo);
          break;
        case 10:
          var l = t.type._context,
            i = t.memoizedProps.value;
          ve(dl, l._currentValue), l._currentValue = i;
          break;
        case 13:
          if (l = t.memoizedState, l !== null) return l.dehydrated !== null ? (ve(Pe, Pe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Vu(e, t, n) : (ve(Pe, Pe.current & 1), e = _t(e, t, n), e !== null ? e.sibling : null);
          ve(Pe, Pe.current & 1);
          break;
        case 19:
          if (l = (n & t.childLanes) !== 0, e.flags & 128) {
            if (l) return Bu(e, t, n);
            t.flags |= 128;
          }
          if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ve(Pe, Pe.current), l) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, ku(e, t, n);
      }
      return _t(e, t, n);
    }
    var Cu, Ss, Lu, Ru;
    Cu = function Cu(e, t) {
      for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);else if (n.tag !== 4 && n.child !== null) {
          n.child["return"] = n, n = n.child;
          continue;
        }
        if (n === t) break;
        for (; n.sibling === null;) {
          if (n["return"] === null || n["return"] === t) return;
          n = n["return"];
        }
        n.sibling["return"] = n["return"], n = n.sibling;
      }
    }, Ss = function Ss() {}, Lu = function Lu(e, t, n, l) {
      var i = e.memoizedProps;
      if (i !== l) {
        e = t.stateNode, dn(Et.current);
        var s = null;
        switch (n) {
          case "input":
            i = Gl(e, i), l = Gl(e, l), s = [];
            break;
          case "select":
            i = b({}, i, {
              value: void 0
            }), l = b({}, l, {
              value: void 0
            }), s = [];
            break;
          case "textarea":
            i = Yl(e, i), l = Yl(e, l), s = [];
            break;
          default:
            typeof i.onClick != "function" && typeof l.onClick == "function" && (e.onclick = rl);
        }
        ei(n, l);
        var o;
        n = null;
        for (y in i) if (!l.hasOwnProperty(y) && i.hasOwnProperty(y) && i[y] != null) if (y === "style") {
          var f = i[y];
          for (o in f) f.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
        } else y !== "dangerouslySetInnerHTML" && y !== "children" && y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && y !== "autoFocus" && (v.hasOwnProperty(y) ? s || (s = []) : (s = s || []).push(y, null));
        for (y in l) {
          var _i2;
          var d = l[y];
          if (f = (_i2 = i) === null || _i2 === void 0 ? void 0 : _i2[y], l.hasOwnProperty(y) && d !== f && (d != null || f != null)) if (y === "style") {
            if (f) {
              for (o in f) !f.hasOwnProperty(o) || d && d.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
              for (o in d) d.hasOwnProperty(o) && f[o] !== d[o] && (n || (n = {}), n[o] = d[o]);
            } else n || (s || (s = []), s.push(y, n)), n = d;
          } else y === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, f = f ? f.__html : void 0, d != null && f !== d && (s = s || []).push(y, d)) : y === "children" ? typeof d != "string" && typeof d != "number" || (s = s || []).push(y, "" + d) : y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && (v.hasOwnProperty(y) ? (d != null && y === "onScroll" && xe("scroll", e), s || f === d || (s = [])) : (s = s || []).push(y, d));
        }
        n && (s = s || []).push("style", n);
        var y = s;
        (t.updateQueue = y) && (t.flags |= 4);
      }
    }, Ru = function Ru(e, t, n, l) {
      n !== l && (t.flags |= 4);
    };
    function Pr(e, t) {
      if (!we) switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null;) n.alternate !== null && (l = n), n = n.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
    }
    function Ke(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        l = 0;
      if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, l |= i.subtreeFlags & 14680064, l |= i.flags & 14680064, i["return"] = e, i = i.sibling;else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i["return"] = e, i = i.sibling;
      return e.subtreeFlags |= l, e.childLanes = n, t;
    }
    function Td(e, t, n) {
      var l = t.pendingProps;
      switch (Di(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Ke(t), null;
        case 1:
          return Ye(t.type) && il(), Ke(t), null;
        case 3:
          return l = t.stateNode, bn(), Se(Xe), Se(ze), ts(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (cl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, yt !== null && (Ls(yt), yt = null))), Ss(e, t), Ke(t), null;
        case 5:
          qi(t);
          var i = dn(Tr.current);
          if (n = t.type, e !== null && t.stateNode != null) Lu(e, t, n, l, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);else {
            if (!l) {
              if (t.stateNode === null) throw Error(u(166));
              return Ke(t), null;
            }
            if (e = dn(Et.current), cl(t)) {
              l = t.stateNode, n = t.type;
              var s = t.memoizedProps;
              switch (l[jt] = t, l[vr] = s, e = (t.mode & 1) !== 0, n) {
                case "dialog":
                  xe("cancel", l), xe("close", l);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  xe("load", l);
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < hr.length; i++) xe(hr[i], l);
                  break;
                case "source":
                  xe("error", l);
                  break;
                case "img":
                case "image":
                case "link":
                  xe("error", l), xe("load", l);
                  break;
                case "details":
                  xe("toggle", l);
                  break;
                case "input":
                  fa(l, s), xe("invalid", l);
                  break;
                case "select":
                  l._wrapperState = {
                    wasMultiple: !!s.multiple
                  }, xe("invalid", l);
                  break;
                case "textarea":
                  pa(l, s), xe("invalid", l);
              }
              ei(n, s), i = null;
              for (var o in s) if (s.hasOwnProperty(o)) {
                var f = s[o];
                o === "children" ? typeof f == "string" ? l.textContent !== f && (s.suppressHydrationWarning !== !0 && nl(l.textContent, f, e), i = ["children", f]) : typeof f == "number" && l.textContent !== "" + f && (s.suppressHydrationWarning !== !0 && nl(l.textContent, f, e), i = ["children", "" + f]) : v.hasOwnProperty(o) && f != null && o === "onScroll" && xe("scroll", l);
              }
              switch (n) {
                case "input":
                  Zr(l), ha(l, s, !0);
                  break;
                case "textarea":
                  Zr(l), va(l);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof s.onClick == "function" && (l.onclick = rl);
              }
              l = i, t.updateQueue = l, l !== null && (t.flags |= 4);
            } else {
              o = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ga(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof l.is == "string" ? e = o.createElement(n, {
                is: l.is
              }) : (e = o.createElement(n), n === "select" && (o = e, l.multiple ? o.multiple = !0 : l.size && (o.size = l.size))) : e = o.createElementNS(e, n), e[jt] = t, e[vr] = l, Cu(e, t, !1, !1), t.stateNode = e;
              e: {
                switch (o = ti(n, l), n) {
                  case "dialog":
                    xe("cancel", e), xe("close", e), i = l;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    xe("load", e), i = l;
                    break;
                  case "video":
                  case "audio":
                    for (i = 0; i < hr.length; i++) xe(hr[i], e);
                    i = l;
                    break;
                  case "source":
                    xe("error", e), i = l;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    xe("error", e), xe("load", e), i = l;
                    break;
                  case "details":
                    xe("toggle", e), i = l;
                    break;
                  case "input":
                    fa(e, l), i = Gl(e, l), xe("invalid", e);
                    break;
                  case "option":
                    i = l;
                    break;
                  case "select":
                    e._wrapperState = {
                      wasMultiple: !!l.multiple
                    }, i = b({}, l, {
                      value: void 0
                    }), xe("invalid", e);
                    break;
                  case "textarea":
                    pa(e, l), i = Yl(e, l), xe("invalid", e);
                    break;
                  default:
                    i = l;
                }
                ei(n, i), f = i;
                for (s in f) if (f.hasOwnProperty(s)) {
                  var d = f[s];
                  s === "style" ? Sa(e, d) : s === "dangerouslySetInnerHTML" ? (d = d ? d.__html : void 0, d != null && ya(e, d)) : s === "children" ? typeof d == "string" ? (n !== "textarea" || d !== "") && Jn(e, d) : typeof d == "number" && Jn(e, "" + d) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (v.hasOwnProperty(s) ? d != null && s === "onScroll" && xe("scroll", e) : d != null && ce(e, s, d, o));
                }
                switch (n) {
                  case "input":
                    Zr(e), ha(e, l, !1);
                    break;
                  case "textarea":
                    Zr(e), va(e);
                    break;
                  case "option":
                    l.value != null && e.setAttribute("value", "" + de(l.value));
                    break;
                  case "select":
                    e.multiple = !!l.multiple, s = l.value, s != null ? xn(e, !!l.multiple, s, !1) : l.defaultValue != null && xn(e, !!l.multiple, l.defaultValue, !0);
                    break;
                  default:
                    typeof i.onClick == "function" && (e.onclick = rl);
                }
                switch (n) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l = !!l.autoFocus;
                    break e;
                  case "img":
                    l = !0;
                    break e;
                  default:
                    l = !1;
                }
              }
              l && (t.flags |= 4);
            }
            t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
          }
          return Ke(t), null;
        case 6:
          if (e && t.stateNode != null) Ru(e, t, e.memoizedProps, l);else {
            if (typeof l != "string" && t.stateNode === null) throw Error(u(166));
            if (n = dn(Tr.current), dn(Et.current), cl(t)) {
              if (l = t.stateNode, n = t.memoizedProps, l[jt] = t, (s = l.nodeValue !== n) && (e = st, e !== null)) switch (e.tag) {
                case 3:
                  nl(l.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 && nl(l.nodeValue, n, (e.mode & 1) !== 0);
              }
              s && (t.flags |= 4);
            } else l = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(l), l[jt] = t, t.stateNode = l;
          }
          return Ke(t), null;
        case 13:
          if (Se(Pe), l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (we && at !== null && t.mode & 1 && !(t.flags & 128)) _o(), Fn(), t.flags |= 98560, s = !1;else if (s = cl(t), l !== null && l.dehydrated !== null) {
              if (e === null) {
                if (!s) throw Error(u(318));
                if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(u(317));
                s[jt] = t;
              } else Fn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
              Ke(t), s = !1;
            } else yt !== null && (Ls(yt), yt = null), s = !0;
            if (!s) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128 ? (t.lanes = n, t) : (l = l !== null, l !== (e !== null && e.memoizedState !== null) && l && (t.child.flags |= 8192, t.mode & 1 && (e === null || Pe.current & 1 ? Fe === 0 && (Fe = 3) : Fs())), t.updateQueue !== null && (t.flags |= 4), Ke(t), null);
        case 4:
          return bn(), Ss(e, t), e === null && pr(t.stateNode.containerInfo), Ke(t), null;
        case 10:
          return Ji(t.type._context), Ke(t), null;
        case 17:
          return Ye(t.type) && il(), Ke(t), null;
        case 19:
          if (Se(Pe), s = t.memoizedState, s === null) return Ke(t), null;
          if (l = (t.flags & 128) !== 0, o = s.rendering, o === null) {
            if (l) Pr(s, !1);else {
              if (Fe !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
                if (o = vl(e), o !== null) {
                  for (t.flags |= 128, Pr(s, !1), l = o.updateQueue, l !== null && (t.updateQueue = l, t.flags |= 4), t.subtreeFlags = 0, l = n, n = t.child; n !== null;) s = n, e = l, s.flags &= 14680066, o = s.alternate, o === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o.memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, e = o.dependencies, s.dependencies = e === null ? null : {
                    lanes: e.lanes,
                    firstContext: e.firstContext
                  }), n = n.sibling;
                  return ve(Pe, Pe.current & 1 | 2), t.child;
                }
                e = e.sibling;
              }
              s.tail !== null && Ce() > Dn && (t.flags |= 128, l = !0, Pr(s, !1), t.lanes = 4194304);
            }
          } else {
            if (!l) if (e = vl(o), e !== null) {
              if (t.flags |= 128, l = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Pr(s, !0), s.tail === null && s.tailMode === "hidden" && !o.alternate && !we) return Ke(t), null;
            } else 2 * Ce() - s.renderingStartTime > Dn && n !== 1073741824 && (t.flags |= 128, l = !0, Pr(s, !1), t.lanes = 4194304);
            s.isBackwards ? (o.sibling = t.child, t.child = o) : (n = s.last, n !== null ? n.sibling = o : t.child = o, s.last = o);
          }
          return s.tail !== null ? (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = Ce(), t.sibling = null, n = Pe.current, ve(Pe, l ? n & 1 | 2 : n & 1), t) : (Ke(t), null);
        case 22:
        case 23:
          return Zs(), l = t.memoizedState !== null, e !== null && e.memoizedState !== null !== l && (t.flags |= 8192), l && t.mode & 1 ? ot & 1073741824 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(u(156, t.tag));
    }
    function kd(e, t) {
      switch (Di(t), t.tag) {
        case 1:
          return Ye(t.type) && il(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
          return bn(), Se(Xe), Se(ze), ts(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
          return qi(t), null;
        case 13:
          if (Se(Pe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null) throw Error(u(340));
            Fn();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
          return Se(Pe), null;
        case 4:
          return bn(), null;
        case 10:
          return Ji(t.type._context), null;
        case 22:
        case 23:
          return Zs(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var El = !1,
      Ue = !1,
      wd = typeof WeakSet == "function" ? WeakSet : Set,
      A = null;
    function On(e, t) {
      var n = e.ref;
      if (n !== null) if (typeof n == "function") try {
        n(null);
      } catch (l) {
        Ne(e, t, l);
      } else n.current = null;
    }
    function Ts(e, t, n) {
      try {
        n();
      } catch (l) {
        Ne(e, t, l);
      }
    }
    var Zu = !1;
    function jd(e, t) {
      if (Zi = Hr, e = co(), Ei(e)) {
        if ("selectionStart" in e) var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };else e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var i = l.anchorOffset,
              s = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch (_unused8) {
              n = null;
              break e;
            }
            var o = 0,
              f = -1,
              d = -1,
              y = 0,
              j = 0,
              E = e,
              k = null;
            t: for (;;) {
              for (var I; E !== n || i !== 0 && E.nodeType !== 3 || (f = o + i), E !== s || l !== 0 && E.nodeType !== 3 || (d = o + l), E.nodeType === 3 && (o += E.nodeValue.length), (I = E.firstChild) !== null;) k = E, E = I;
              for (;;) {
                if (E === e) break t;
                if (k === n && ++y === i && (f = o), k === s && ++j === l && (d = o), (I = E.nextSibling) !== null) break;
                E = k, k = E.parentNode;
              }
              E = I;
            }
            n = f === -1 || d === -1 ? null : {
              start: f,
              end: d
            };
          } else n = null;
        }
        n = n || {
          start: 0,
          end: 0
        };
      } else n = null;
      for (Fi = {
        focusedElem: e,
        selectionRange: n
      }, Hr = !1, A = t; A !== null;) if (t = A, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e["return"] = t, A = e;else for (; A !== null;) {
        t = A;
        try {
          var M = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (M !== null) {
                var O = M.memoizedProps,
                  Le = M.memoizedState,
                  m = t.stateNode,
                  h = m.getSnapshotBeforeUpdate(t.elementType === t.type ? O : xt(t.type, O), Le);
                m.__reactInternalSnapshotBeforeUpdate = h;
              }
              break;
            case 3:
              var g = t.stateNode.containerInfo;
              g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(u(163));
          }
        } catch (V) {
          Ne(t, t["return"], V);
        }
        if (e = t.sibling, e !== null) {
          e["return"] = t["return"], A = e;
          break;
        }
        A = t["return"];
      }
      return M = Zu, Zu = !1, M;
    }
    function Vr(e, t, n) {
      var l = t.updateQueue;
      if (l = l !== null ? l.lastEffect : null, l !== null) {
        var i = l = l.next;
        do {
          if ((i.tag & e) === e) {
            var s = i.destroy;
            i.destroy = void 0, s !== void 0 && Ts(t, n, s);
          }
          i = i.next;
        } while (i !== l);
      }
    }
    function Pl(e, t) {
      if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
          if ((n.tag & e) === e) {
            var l = n.create;
            n.destroy = l();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function ks(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
          case 5:
            e = n;
            break;
          default:
            e = n;
        }
        typeof t == "function" ? t(e) : t.current = e;
      }
    }
    function Fu(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Fu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[jt], delete t[vr], delete t[bi], delete t[sd], delete t[ad])), e.stateNode = null, e["return"] = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function _u(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Iu(e) {
      e: for (;;) {
        for (; e.sibling === null;) {
          if (e["return"] === null || _u(e["return"])) return null;
          e = e["return"];
        }
        for (e.sibling["return"] = e["return"], e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child["return"] = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function ws(e, t, n) {
      var l = e.tag;
      if (l === 5 || l === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rl));else if (l !== 4 && (e = e.child, e !== null)) for (ws(e, t, n), e = e.sibling; e !== null;) ws(e, t, n), e = e.sibling;
    }
    function js(e, t, n) {
      var l = e.tag;
      if (l === 5 || l === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);else if (l !== 4 && (e = e.child, e !== null)) for (js(e, t, n), e = e.sibling; e !== null;) js(e, t, n), e = e.sibling;
    }
    var be = null,
      St = !1;
    function Qt(e, t, n) {
      for (n = n.child; n !== null;) Au(e, t, n), n = n.sibling;
    }
    function Au(e, t, n) {
      if (wt && typeof wt.onCommitFiberUnmount == "function") try {
        wt.onCommitFiberUnmount(Mr, n);
      } catch (_unused9) {}
      switch (n.tag) {
        case 5:
          Ue || On(n, t);
        case 6:
          var l = be,
            i = St;
          be = null, Qt(e, t, n), be = l, St = i, be !== null && (St ? (e = be, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : be.removeChild(n.stateNode));
          break;
        case 18:
          be !== null && (St ? (e = be, n = n.stateNode, e.nodeType === 8 ? Ai(e.parentNode, n) : e.nodeType === 1 && Ai(e, n), ir(e)) : Ai(be, n.stateNode));
          break;
        case 4:
          l = be, i = St, be = n.stateNode.containerInfo, St = !0, Qt(e, t, n), be = l, St = i;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!Ue && (l = n.updateQueue, l !== null && (l = l.lastEffect, l !== null))) {
            i = l = l.next;
            do {
              var s = i,
                o = s.destroy;
              s = s.tag, o !== void 0 && (s & 2 || s & 4) && Ts(n, t, o), i = i.next;
            } while (i !== l);
          }
          Qt(e, t, n);
          break;
        case 1:
          if (!Ue && (On(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function")) try {
            l.props = n.memoizedProps, l.state = n.memoizedState, l.componentWillUnmount();
          } catch (f) {
            Ne(n, t, f);
          }
          Qt(e, t, n);
          break;
        case 21:
          Qt(e, t, n);
          break;
        case 22:
          n.mode & 1 ? (Ue = (l = Ue) || n.memoizedState !== null, Qt(e, t, n), Ue = l) : Qt(e, t, n);
          break;
        default:
          Qt(e, t, n);
      }
    }
    function bu(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new wd()), t.forEach(function (l) {
          var i = Zd.bind(null, e, l);
          n.has(l) || (n.add(l), l.then(i, i));
        });
      }
    }
    function Tt(e, t) {
      var n = t.deletions;
      if (n !== null) for (var l = 0; l < n.length; l++) {
        var i = n[l];
        try {
          var s = e,
            o = t,
            f = o;
          e: for (; f !== null;) {
            switch (f.tag) {
              case 5:
                be = f.stateNode, St = !1;
                break e;
              case 3:
                be = f.stateNode.containerInfo, St = !0;
                break e;
              case 4:
                be = f.stateNode.containerInfo, St = !0;
                break e;
            }
            f = f["return"];
          }
          if (be === null) throw Error(u(160));
          Au(s, o, i), be = null, St = !1;
          var d = i.alternate;
          d !== null && (d["return"] = null), i["return"] = null;
        } catch (y) {
          Ne(i, t, y);
        }
      }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) Mu(t, e), t = t.sibling;
    }
    function Mu(e, t) {
      var n = e.alternate,
        l = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (Tt(t, e), Vt(e), l & 4) {
            try {
              Vr(3, e, e["return"]), Pl(3, e);
            } catch (O) {
              Ne(e, e["return"], O);
            }
            try {
              Vr(5, e, e["return"]);
            } catch (O) {
              Ne(e, e["return"], O);
            }
          }
          break;
        case 1:
          Tt(t, e), Vt(e), l & 512 && n !== null && On(n, n["return"]);
          break;
        case 5:
          if (Tt(t, e), Vt(e), l & 512 && n !== null && On(n, n["return"]), e.flags & 32) {
            var i = e.stateNode;
            try {
              Jn(i, "");
            } catch (O) {
              Ne(e, e["return"], O);
            }
          }
          if (l & 4 && (i = e.stateNode, i != null)) {
            var s = e.memoizedProps,
              o = n !== null ? n.memoizedProps : s,
              f = e.type,
              d = e.updateQueue;
            if (e.updateQueue = null, d !== null) try {
              f === "input" && s.type === "radio" && s.name != null && da(i, s), ti(f, o);
              var y = ti(f, s);
              for (o = 0; o < d.length; o += 2) {
                var j = d[o],
                  E = d[o + 1];
                j === "style" ? Sa(i, E) : j === "dangerouslySetInnerHTML" ? ya(i, E) : j === "children" ? Jn(i, E) : ce(i, j, E, y);
              }
              switch (f) {
                case "input":
                  Ql(i, s);
                  break;
                case "textarea":
                  ma(i, s);
                  break;
                case "select":
                  var k = i._wrapperState.wasMultiple;
                  i._wrapperState.wasMultiple = !!s.multiple;
                  var I = s.value;
                  I != null ? xn(i, !!s.multiple, I, !1) : k !== !!s.multiple && (s.defaultValue != null ? xn(i, !!s.multiple, s.defaultValue, !0) : xn(i, !!s.multiple, s.multiple ? [] : "", !1));
              }
              i[vr] = s;
            } catch (O) {
              Ne(e, e["return"], O);
            }
          }
          break;
        case 6:
          if (Tt(t, e), Vt(e), l & 4) {
            if (e.stateNode === null) throw Error(u(162));
            i = e.stateNode, s = e.memoizedProps;
            try {
              i.nodeValue = s;
            } catch (O) {
              Ne(e, e["return"], O);
            }
          }
          break;
        case 3:
          if (Tt(t, e), Vt(e), l & 4 && n !== null && n.memoizedState.isDehydrated) try {
            ir(t.containerInfo);
          } catch (O) {
            Ne(e, e["return"], O);
          }
          break;
        case 4:
          Tt(t, e), Vt(e);
          break;
        case 13:
          Tt(t, e), Vt(e), i = e.child, i.flags & 8192 && (s = i.memoizedState !== null, i.stateNode.isHidden = s, !s || i.alternate !== null && i.alternate.memoizedState !== null || (Vs = Ce())), l & 4 && bu(e);
          break;
        case 22:
          if (j = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ue = (y = Ue) || j, Tt(t, e), Ue = y) : Tt(t, e), Vt(e), l & 8192) {
            if (y = e.memoizedState !== null, (e.stateNode.isHidden = y) && !j && e.mode & 1) for (A = e, j = e.child; j !== null;) {
              for (E = A = j; A !== null;) {
                switch (k = A, I = k.child, k.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Vr(4, k, k["return"]);
                    break;
                  case 1:
                    On(k, k["return"]);
                    var M = k.stateNode;
                    if (typeof M.componentWillUnmount == "function") {
                      l = k, n = k["return"];
                      try {
                        t = l, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                      } catch (O) {
                        Ne(l, n, O);
                      }
                    }
                    break;
                  case 5:
                    On(k, k["return"]);
                    break;
                  case 22:
                    if (k.memoizedState !== null) {
                      Du(E);
                      continue;
                    }
                }
                I !== null ? (I["return"] = k, A = I) : Du(E);
              }
              j = j.sibling;
            }
            e: for (j = null, E = e;;) {
              if (E.tag === 5) {
                if (j === null) {
                  j = E;
                  try {
                    i = E.stateNode, y ? (s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (f = E.stateNode, d = E.memoizedProps.style, o = d != null && d.hasOwnProperty("display") ? d.display : null, f.style.display = xa("display", o));
                  } catch (O) {
                    Ne(e, e["return"], O);
                  }
                }
              } else if (E.tag === 6) {
                if (j === null) try {
                  E.stateNode.nodeValue = y ? "" : E.memoizedProps;
                } catch (O) {
                  Ne(e, e["return"], O);
                }
              } else if ((E.tag !== 22 && E.tag !== 23 || E.memoizedState === null || E === e) && E.child !== null) {
                E.child["return"] = E, E = E.child;
                continue;
              }
              if (E === e) break e;
              for (; E.sibling === null;) {
                if (E["return"] === null || E["return"] === e) break e;
                j === E && (j = null), E = E["return"];
              }
              j === E && (j = null), E.sibling["return"] = E["return"], E = E.sibling;
            }
          }
          break;
        case 19:
          Tt(t, e), Vt(e), l & 4 && bu(e);
          break;
        case 21:
          break;
        default:
          Tt(t, e), Vt(e);
      }
    }
    function Vt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var n = e["return"]; n !== null;) {
              if (_u(n)) {
                var l = n;
                break e;
              }
              n = n["return"];
            }
            throw Error(u(160));
          }
          switch (l.tag) {
            case 5:
              var i = l.stateNode;
              l.flags & 32 && (Jn(i, ""), l.flags &= -33);
              var s = Iu(e);
              js(e, s, i);
              break;
            case 3:
            case 4:
              var o = l.stateNode.containerInfo,
                f = Iu(e);
              ws(e, f, o);
              break;
            default:
              throw Error(u(161));
          }
        } catch (d) {
          Ne(e, e["return"], d);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Ed(e, t, n) {
      A = e, Ou(e);
    }
    function Ou(e, t, n) {
      for (var l = (e.mode & 1) !== 0; A !== null;) {
        var i = A,
          s = i.child;
        if (i.tag === 22 && l) {
          var o = i.memoizedState !== null || El;
          if (!o) {
            var f = i.alternate,
              d = f !== null && f.memoizedState !== null || Ue;
            f = El;
            var y = Ue;
            if (El = o, (Ue = d) && !y) for (A = i; A !== null;) o = A, d = o.child, o.tag === 22 && o.memoizedState !== null ? Ku(i) : d !== null ? (d["return"] = o, A = d) : Ku(i);
            for (; s !== null;) A = s, Ou(s), s = s.sibling;
            A = i, El = f, Ue = y;
          }
          zu(e);
        } else i.subtreeFlags & 8772 && s !== null ? (s["return"] = i, A = s) : zu(e);
      }
    }
    function zu(e) {
      for (; A !== null;) {
        var t = A;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772) switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ue || Pl(5, t);
                break;
              case 1:
                var l = t.stateNode;
                if (t.flags & 4 && !Ue) if (n === null) l.componentDidMount();else {
                  var i = t.elementType === t.type ? n.memoizedProps : xt(t.type, n.memoizedProps);
                  l.componentDidUpdate(i, n.memoizedState, l.__reactInternalSnapshotBeforeUpdate);
                }
                var s = t.updateQueue;
                s !== null && Do(t, s, l);
                break;
              case 3:
                var o = t.updateQueue;
                if (o !== null) {
                  if (n = null, t.child !== null) switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                  Do(t, o, n);
                }
                break;
              case 5:
                var f = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = f;
                  var d = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d.autoFocus && n.focus();
                      break;
                    case "img":
                      d.src && (n.src = d.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var y = t.alternate;
                  if (y !== null) {
                    var j = y.memoizedState;
                    if (j !== null) {
                      var E = j.dehydrated;
                      E !== null && ir(E);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(u(163));
            }
            Ue || t.flags & 512 && ks(t);
          } catch (k) {
            Ne(t, t["return"], k);
          }
        }
        if (t === e) {
          A = null;
          break;
        }
        if (n = t.sibling, n !== null) {
          n["return"] = t["return"], A = n;
          break;
        }
        A = t["return"];
      }
    }
    function Du(e) {
      for (; A !== null;) {
        var t = A;
        if (t === e) {
          A = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          n["return"] = t["return"], A = n;
          break;
        }
        A = t["return"];
      }
    }
    function Ku(e) {
      for (; A !== null;) {
        var t = A;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t["return"];
              try {
                Pl(4, t);
              } catch (d) {
                Ne(t, n, d);
              }
              break;
            case 1:
              var l = t.stateNode;
              if (typeof l.componentDidMount == "function") {
                var i = t["return"];
                try {
                  l.componentDidMount();
                } catch (d) {
                  Ne(t, i, d);
                }
              }
              var s = t["return"];
              try {
                ks(t);
              } catch (d) {
                Ne(t, s, d);
              }
              break;
            case 5:
              var o = t["return"];
              try {
                ks(t);
              } catch (d) {
                Ne(t, o, d);
              }
          }
        } catch (d) {
          Ne(t, t["return"], d);
        }
        if (t === e) {
          A = null;
          break;
        }
        var f = t.sibling;
        if (f !== null) {
          f["return"] = t["return"], A = f;
          break;
        }
        A = t["return"];
      }
    }
    var Pd = Math.ceil,
      Vl = le.ReactCurrentDispatcher,
      Es = le.ReactCurrentOwner,
      ht = le.ReactCurrentBatchConfig,
      re = 0,
      Ie = null,
      Re = null,
      Me = 0,
      ot = 0,
      zn = Ht(0),
      Fe = 0,
      Nr = null,
      pn = 0,
      Nl = 0,
      Ps = 0,
      Br = null,
      et = null,
      Vs = 0,
      Dn = 1 / 0,
      It = null,
      Bl = !1,
      Ns = null,
      Xt = null,
      Cl = !1,
      Yt = null,
      Ll = 0,
      Cr = 0,
      Bs = null,
      Rl = -1,
      Zl = 0;
    function $e() {
      return re & 6 ? Ce() : Rl !== -1 ? Rl : Rl = Ce();
    }
    function qt(e) {
      return e.mode & 1 ? re & 2 && Me !== 0 ? Me & -Me : ud.transition !== null ? (Zl === 0 && (Zl = _a()), Zl) : (e = he, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ua(e.type)), e) : 1;
    }
    function kt(e, t, n, l) {
      if (50 < Cr) throw Cr = 0, Bs = null, Error(u(185));
      er(e, n, l), (!(re & 2) || e !== Ie) && (e === Ie && (!(re & 2) && (Nl |= n), Fe === 4 && en(e, Me)), tt(e, l), n === 1 && re === 0 && !(t.mode & 1) && (Dn = Ce() + 500, al && $t()));
    }
    function tt(e, t) {
      var n = e.callbackNode;
      uf(e, t);
      var l = Dr(e, e === Ie ? Me : 0);
      if (l === 0) n !== null && Ra(n), e.callbackNode = null, e.callbackPriority = 0;else if (t = l & -l, e.callbackPriority !== t) {
        if (n != null && Ra(n), t === 1) e.tag === 0 ? od(Hu.bind(null, e)) : Co(Hu.bind(null, e)), ld(function () {
          !(re & 6) && $t();
        }), n = null;else {
          switch (Ia(l)) {
            case 1:
              n = oi;
              break;
            case 4:
              n = Za;
              break;
            case 16:
              n = br;
              break;
            case 536870912:
              n = Fa;
              break;
            default:
              n = br;
          }
          n = qu(n, Uu.bind(null, e));
        }
        e.callbackPriority = t, e.callbackNode = n;
      }
    }
    function Uu(e, t) {
      if (Rl = -1, Zl = 0, re & 6) throw Error(u(327));
      var n = e.callbackNode;
      if (Kn() && e.callbackNode !== n) return null;
      var l = Dr(e, e === Ie ? Me : 0);
      if (l === 0) return null;
      if (l & 30 || l & e.expiredLanes || t) t = Fl(e, l);else {
        t = l;
        var i = re;
        re |= 2;
        var s = $u();
        (Ie !== e || Me !== t) && (It = null, Dn = Ce() + 500, vn(e, t));
        do try {
          Bd();
          break;
        } catch (f) {
          Wu(e, f);
        } while (!0);
        $i(), Vl.current = s, re = i, Re !== null ? t = 0 : (Ie = null, Me = 0, t = Fe);
      }
      if (t !== 0) {
        if (t === 2 && (i = ui(e), i !== 0 && (l = i, t = Cs(e, i))), t === 1) throw n = Nr, vn(e, 0), en(e, l), tt(e, Ce()), n;
        if (t === 6) en(e, l);else {
          if (i = e.current.alternate, !(l & 30) && !Vd(i) && (t = Fl(e, l), t === 2 && (s = ui(e), s !== 0 && (l = s, t = Cs(e, s))), t === 1)) throw n = Nr, vn(e, 0), en(e, l), tt(e, Ce()), n;
          switch (e.finishedWork = i, e.finishedLanes = l, t) {
            case 0:
            case 1:
              throw Error(u(345));
            case 2:
              gn(e, et, It);
              break;
            case 3:
              if (en(e, l), (l & 130023424) === l && (t = Vs + 500 - Ce(), 10 < t)) {
                if (Dr(e, 0) !== 0) break;
                if (i = e.suspendedLanes, (i & l) !== l) {
                  $e(), e.pingedLanes |= e.suspendedLanes & i;
                  break;
                }
                e.timeoutHandle = Ii(gn.bind(null, e, et, It), t);
                break;
              }
              gn(e, et, It);
              break;
            case 4:
              if (en(e, l), (l & 4194240) === l) break;
              for (t = e.eventTimes, i = -1; 0 < l;) {
                var o = 31 - vt(l);
                s = 1 << o, o = t[o], o > i && (i = o), l &= ~s;
              }
              if (l = i, l = Ce() - l, l = (120 > l ? 120 : 480 > l ? 480 : 1080 > l ? 1080 : 1920 > l ? 1920 : 3e3 > l ? 3e3 : 4320 > l ? 4320 : 1960 * Pd(l / 1960)) - l, 10 < l) {
                e.timeoutHandle = Ii(gn.bind(null, e, et, It), l);
                break;
              }
              gn(e, et, It);
              break;
            case 5:
              gn(e, et, It);
              break;
            default:
              throw Error(u(329));
          }
        }
      }
      return tt(e, Ce()), e.callbackNode === n ? Uu.bind(null, e) : null;
    }
    function Cs(e, t) {
      var n = Br;
      return e.current.memoizedState.isDehydrated && (vn(e, t).flags |= 256), e = Fl(e, t), e !== 2 && (t = et, et = n, t !== null && Ls(t)), e;
    }
    function Ls(e) {
      et === null ? et = e : et.push.apply(et, e);
    }
    function Vd(e) {
      for (var t = e;;) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && (n = n.stores, n !== null)) for (var l = 0; l < n.length; l++) {
            var i = n[l],
              s = i.getSnapshot;
            i = i.value;
            try {
              if (!gt(s(), i)) return !1;
            } catch (_unused0) {
              return !1;
            }
          }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n["return"] = t, t = n;else {
          if (t === e) break;
          for (; t.sibling === null;) {
            if (t["return"] === null || t["return"] === e) return !0;
            t = t["return"];
          }
          t.sibling["return"] = t["return"], t = t.sibling;
        }
      }
      return !0;
    }
    function en(e, t) {
      for (t &= ~Ps, t &= ~Nl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - vt(t),
          l = 1 << n;
        e[n] = -1, t &= ~l;
      }
    }
    function Hu(e) {
      if (re & 6) throw Error(u(327));
      Kn();
      var t = Dr(e, 0);
      if (!(t & 1)) return tt(e, Ce()), null;
      var n = Fl(e, t);
      if (e.tag !== 0 && n === 2) {
        var l = ui(e);
        l !== 0 && (t = l, n = Cs(e, l));
      }
      if (n === 1) throw n = Nr, vn(e, 0), en(e, t), tt(e, Ce()), n;
      if (n === 6) throw Error(u(345));
      return e.finishedWork = e.current.alternate, e.finishedLanes = t, gn(e, et, It), tt(e, Ce()), null;
    }
    function Rs(e, t) {
      var n = re;
      re |= 1;
      try {
        return e(t);
      } finally {
        re = n, re === 0 && (Dn = Ce() + 500, al && $t());
      }
    }
    function mn(e) {
      Yt !== null && Yt.tag === 0 && !(re & 6) && Kn();
      var t = re;
      re |= 1;
      var n = ht.transition,
        l = he;
      try {
        if (ht.transition = null, he = 1, e) return e();
      } finally {
        he = l, ht.transition = n, re = t, !(re & 6) && $t();
      }
    }
    function Zs() {
      ot = zn.current, Se(zn);
    }
    function vn(e, t) {
      e.finishedWork = null, e.finishedLanes = 0;
      var n = e.timeoutHandle;
      if (n !== -1 && (e.timeoutHandle = -1, rd(n)), Re !== null) for (n = Re["return"]; n !== null;) {
        var l = n;
        switch (Di(l), l.tag) {
          case 1:
            l = l.type.childContextTypes, l != null && il();
            break;
          case 3:
            bn(), Se(Xe), Se(ze), ts();
            break;
          case 5:
            qi(l);
            break;
          case 4:
            bn();
            break;
          case 13:
            Se(Pe);
            break;
          case 19:
            Se(Pe);
            break;
          case 10:
            Ji(l.type._context);
            break;
          case 22:
          case 23:
            Zs();
        }
        n = n["return"];
      }
      if (Ie = e, Re = e = tn(e.current, null), Me = ot = t, Fe = 0, Nr = null, Ps = Nl = pn = 0, et = Br = null, fn !== null) {
        for (t = 0; t < fn.length; t++) if (n = fn[t], l = n.interleaved, l !== null) {
          n.interleaved = null;
          var i = l.next,
            s = n.pending;
          if (s !== null) {
            var o = s.next;
            s.next = i, l.next = o;
          }
          n.pending = l;
        }
        fn = null;
      }
      return e;
    }
    function Wu(e, t) {
      do {
        var n = Re;
        try {
          if ($i(), gl.current = Tl, yl) {
            for (var l = Ve.memoizedState; l !== null;) {
              var i = l.queue;
              i !== null && (i.pending = null), l = l.next;
            }
            yl = !1;
          }
          if (hn = 0, _e = Ze = Ve = null, kr = !1, wr = 0, Es.current = null, n === null || n["return"] === null) {
            Fe = 1, Nr = t, Re = null;
            break;
          }
          e: {
            var s = e,
              o = n["return"],
              f = n,
              d = t;
            if (t = Me, f.flags |= 32768, d !== null && _typeof(d) == "object" && typeof d.then == "function") {
              var y = d,
                j = f,
                E = j.tag;
              if (!(j.mode & 1) && (E === 0 || E === 11 || E === 15)) {
                var k = j.alternate;
                k ? (j.updateQueue = k.updateQueue, j.memoizedState = k.memoizedState, j.lanes = k.lanes) : (j.updateQueue = null, j.memoizedState = null);
              }
              var I = gu(o);
              if (I !== null) {
                I.flags &= -257, yu(I, o, f, s, t), I.mode & 1 && vu(s, y, t), t = I, d = y;
                var M = t.updateQueue;
                if (M === null) {
                  var O = new Set();
                  O.add(d), t.updateQueue = O;
                } else M.add(d);
                break e;
              } else {
                if (!(t & 1)) {
                  vu(s, y, t), Fs();
                  break e;
                }
                d = Error(u(426));
              }
            } else if (we && f.mode & 1) {
              var Le = gu(o);
              if (Le !== null) {
                !(Le.flags & 65536) && (Le.flags |= 256), yu(Le, o, f, s, t), Hi(Mn(d, f));
                break e;
              }
            }
            s = d = Mn(d, f), Fe !== 4 && (Fe = 2), Br === null ? Br = [s] : Br.push(s), s = o;
            do {
              switch (s.tag) {
                case 3:
                  s.flags |= 65536, t &= -t, s.lanes |= t;
                  var m = pu(s, d, t);
                  zo(s, m);
                  break e;
                case 1:
                  f = d;
                  var h = s.type,
                    g = s.stateNode;
                  if (!(s.flags & 128) && (typeof h.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (Xt === null || !Xt.has(g)))) {
                    s.flags |= 65536, t &= -t, s.lanes |= t;
                    var V = mu(s, f, t);
                    zo(s, V);
                    break e;
                  }
              }
              s = s["return"];
            } while (s !== null);
          }
          Gu(n);
        } catch (D) {
          t = D, Re === n && n !== null && (Re = n = n["return"]);
          continue;
        }
        break;
      } while (!0);
    }
    function $u() {
      var e = Vl.current;
      return Vl.current = Tl, e === null ? Tl : e;
    }
    function Fs() {
      (Fe === 0 || Fe === 3 || Fe === 2) && (Fe = 4), Ie === null || !(pn & 268435455) && !(Nl & 268435455) || en(Ie, Me);
    }
    function Fl(e, t) {
      var n = re;
      re |= 2;
      var l = $u();
      (Ie !== e || Me !== t) && (It = null, vn(e, t));
      do try {
        Nd();
        break;
      } catch (i) {
        Wu(e, i);
      } while (!0);
      if ($i(), re = n, Vl.current = l, Re !== null) throw Error(u(261));
      return Ie = null, Me = 0, Fe;
    }
    function Nd() {
      for (; Re !== null;) Ju(Re);
    }
    function Bd() {
      for (; Re !== null && !qc();) Ju(Re);
    }
    function Ju(e) {
      var t = Yu(e.alternate, e, ot);
      e.memoizedProps = e.pendingProps, t === null ? Gu(e) : Re = t, Es.current = null;
    }
    function Gu(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (e = t["return"], t.flags & 32768) {
          if (n = kd(n, t), n !== null) {
            n.flags &= 32767, Re = n;
            return;
          }
          if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;else {
            Fe = 6, Re = null;
            return;
          }
        } else if (n = Td(n, t, ot), n !== null) {
          Re = n;
          return;
        }
        if (t = t.sibling, t !== null) {
          Re = t;
          return;
        }
        Re = t = e;
      } while (t !== null);
      Fe === 0 && (Fe = 5);
    }
    function gn(e, t, n) {
      var l = he,
        i = ht.transition;
      try {
        ht.transition = null, he = 1, Cd(e, t, n, l);
      } finally {
        ht.transition = i, he = l;
      }
      return null;
    }
    function Cd(e, t, n, l) {
      do Kn(); while (Yt !== null);
      if (re & 6) throw Error(u(327));
      n = e.finishedWork;
      var i = e.finishedLanes;
      if (n === null) return null;
      if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(u(177));
      e.callbackNode = null, e.callbackPriority = 0;
      var s = n.lanes | n.childLanes;
      if (cf(e, s), e === Ie && (Re = Ie = null, Me = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Cl || (Cl = !0, qu(br, function () {
        return Kn(), null;
      })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
        s = ht.transition, ht.transition = null;
        var o = he;
        he = 1;
        var f = re;
        re |= 4, Es.current = null, jd(e, n), Mu(n, e), Qf(Fi), Hr = !!Zi, Fi = Zi = null, e.current = n, Ed(n), ef(), re = f, he = o, ht.transition = s;
      } else e.current = n;
      if (Cl && (Cl = !1, Yt = e, Ll = i), s = e.pendingLanes, s === 0 && (Xt = null), rf(n.stateNode), tt(e, Ce()), t !== null) for (l = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], l(i.value, {
        componentStack: i.stack,
        digest: i.digest
      });
      if (Bl) throw Bl = !1, e = Ns, Ns = null, e;
      return Ll & 1 && e.tag !== 0 && Kn(), s = e.pendingLanes, s & 1 ? e === Bs ? Cr++ : (Cr = 0, Bs = e) : Cr = 0, $t(), null;
    }
    function Kn() {
      if (Yt !== null) {
        var e = Ia(Ll),
          t = ht.transition,
          n = he;
        try {
          if (ht.transition = null, he = 16 > e ? 16 : e, Yt === null) var l = !1;else {
            if (e = Yt, Yt = null, Ll = 0, re & 6) throw Error(u(331));
            var i = re;
            for (re |= 4, A = e.current; A !== null;) {
              var s = A,
                o = s.child;
              if (A.flags & 16) {
                var f = s.deletions;
                if (f !== null) {
                  for (var d = 0; d < f.length; d++) {
                    var y = f[d];
                    for (A = y; A !== null;) {
                      var j = A;
                      switch (j.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Vr(8, j, s);
                      }
                      var E = j.child;
                      if (E !== null) E["return"] = j, A = E;else for (; A !== null;) {
                        j = A;
                        var k = j.sibling,
                          I = j["return"];
                        if (Fu(j), j === y) {
                          A = null;
                          break;
                        }
                        if (k !== null) {
                          k["return"] = I, A = k;
                          break;
                        }
                        A = I;
                      }
                    }
                  }
                  var M = s.alternate;
                  if (M !== null) {
                    var O = M.child;
                    if (O !== null) {
                      M.child = null;
                      do {
                        var Le = O.sibling;
                        O.sibling = null, O = Le;
                      } while (O !== null);
                    }
                  }
                  A = s;
                }
              }
              if (s.subtreeFlags & 2064 && o !== null) o["return"] = s, A = o;else e: for (; A !== null;) {
                if (s = A, s.flags & 2048) switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Vr(9, s, s["return"]);
                }
                var m = s.sibling;
                if (m !== null) {
                  m["return"] = s["return"], A = m;
                  break e;
                }
                A = s["return"];
              }
            }
            var h = e.current;
            for (A = h; A !== null;) {
              o = A;
              var g = o.child;
              if (o.subtreeFlags & 2064 && g !== null) g["return"] = o, A = g;else e: for (o = h; A !== null;) {
                if (f = A, f.flags & 2048) try {
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pl(9, f);
                  }
                } catch (D) {
                  Ne(f, f["return"], D);
                }
                if (f === o) {
                  A = null;
                  break e;
                }
                var V = f.sibling;
                if (V !== null) {
                  V["return"] = f["return"], A = V;
                  break e;
                }
                A = f["return"];
              }
            }
            if (re = i, $t(), wt && typeof wt.onPostCommitFiberRoot == "function") try {
              wt.onPostCommitFiberRoot(Mr, e);
            } catch (_unused1) {}
            l = !0;
          }
          return l;
        } finally {
          he = n, ht.transition = t;
        }
      }
      return !1;
    }
    function Qu(e, t, n) {
      t = Mn(n, t), t = pu(e, t, 1), e = Gt(e, t, 1), t = $e(), e !== null && (er(e, 1, t), tt(e, t));
    }
    function Ne(e, t, n) {
      if (e.tag === 3) Qu(e, e, n);else for (; t !== null;) {
        if (t.tag === 3) {
          Qu(t, e, n);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Xt === null || !Xt.has(l))) {
            e = Mn(n, e), e = mu(t, e, 1), t = Gt(t, e, 1), e = $e(), t !== null && (er(t, 1, e), tt(t, e));
            break;
          }
        }
        t = t["return"];
      }
    }
    function Ld(e, t, n) {
      var l = e.pingCache;
      l !== null && l["delete"](t), t = $e(), e.pingedLanes |= e.suspendedLanes & n, Ie === e && (Me & n) === n && (Fe === 4 || Fe === 3 && (Me & 130023424) === Me && 500 > Ce() - Vs ? vn(e, 0) : Ps |= n), tt(e, t);
    }
    function Xu(e, t) {
      t === 0 && (e.mode & 1 ? (t = zr, zr <<= 1, !(zr & 130023424) && (zr = 4194304)) : t = 1);
      var n = $e();
      e = Zt(e, t), e !== null && (er(e, t, n), tt(e, n));
    }
    function Rd(e) {
      var t = e.memoizedState,
        n = 0;
      t !== null && (n = t.retryLane), Xu(e, n);
    }
    function Zd(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var l = e.stateNode,
            i = e.memoizedState;
          i !== null && (n = i.retryLane);
          break;
        case 19:
          l = e.stateNode;
          break;
        default:
          throw Error(u(314));
      }
      l !== null && l["delete"](t), Xu(e, n);
    }
    var Yu;
    Yu = function Yu(e, t, n) {
      if (e !== null) {
        if (e.memoizedProps !== t.pendingProps || Xe.current) qe = !0;else {
          if (!(e.lanes & n) && !(t.flags & 128)) return qe = !1, Sd(e, t, n);
          qe = !!(e.flags & 131072);
        }
      } else qe = !1, we && t.flags & 1048576 && Lo(t, ul, t.index);
      switch (t.lanes = 0, t.tag) {
        case 2:
          var l = t.type;
          jl(e, t), e = t.pendingProps;
          var i = Ln(t, ze.current);
          An(t, n), i = ls(null, t, l, e, i, n);
          var s = is();
          return t.flags |= 1, _typeof(i) == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ye(l) ? (s = !0, sl(t)) : s = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, Xi(t), i.updater = kl, t.stateNode = i, i._reactInternals = t, fs(t, l, e, n), t = ms(null, t, l, !0, s, n)) : (t.tag = 0, we && s && zi(t), We(null, t, i, n), t = t.child), t;
        case 16:
          l = t.elementType;
          e: {
            switch (jl(e, t), e = t.pendingProps, i = l._init, l = i(l._payload), t.type = l, i = t.tag = _d(l), e = xt(l, e), i) {
              case 0:
                t = ps(null, t, l, e, n);
                break e;
              case 1:
                t = ju(null, t, l, e, n);
                break e;
              case 11:
                t = xu(null, t, l, e, n);
                break e;
              case 14:
                t = Su(null, t, l, xt(l.type, e), n);
                break e;
            }
            throw Error(u(306, l, ""));
          }
          return t;
        case 0:
          return l = t.type, i = t.pendingProps, i = t.elementType === l ? i : xt(l, i), ps(e, t, l, i, n);
        case 1:
          return l = t.type, i = t.pendingProps, i = t.elementType === l ? i : xt(l, i), ju(e, t, l, i, n);
        case 3:
          e: {
            if (Eu(t), e === null) throw Error(u(387));
            l = t.pendingProps, s = t.memoizedState, i = s.element, Oo(e, t), ml(t, l, null, n);
            var o = t.memoizedState;
            if (l = o.element, s.isDehydrated) {
              if (s = {
                element: l,
                isDehydrated: !1,
                cache: o.cache,
                pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                transitions: o.transitions
              }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
                i = Mn(Error(u(423)), t), t = Pu(e, t, l, n, i);
                break e;
              } else if (l !== i) {
                i = Mn(Error(u(424)), t), t = Pu(e, t, l, n, i);
                break e;
              } else for (at = Ut(t.stateNode.containerInfo.firstChild), st = t, we = !0, yt = null, n = bo(t, null, l, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
            } else {
              if (Fn(), l === i) {
                t = _t(e, t, n);
                break e;
              }
              We(e, t, l, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return Ko(t), e === null && Ui(t), l = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, o = i.children, _i(l, i) ? o = null : s !== null && _i(l, s) && (t.flags |= 32), wu(e, t), We(e, t, o, n), t.child;
        case 6:
          return e === null && Ui(t), null;
        case 13:
          return Vu(e, t, n);
        case 4:
          return Yi(t, t.stateNode.containerInfo), l = t.pendingProps, e === null ? t.child = _n(t, null, l, n) : We(e, t, l, n), t.child;
        case 11:
          return l = t.type, i = t.pendingProps, i = t.elementType === l ? i : xt(l, i), xu(e, t, l, i, n);
        case 7:
          return We(e, t, t.pendingProps, n), t.child;
        case 8:
          return We(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return We(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (l = t.type._context, i = t.pendingProps, s = t.memoizedProps, o = i.value, ve(dl, l._currentValue), l._currentValue = o, s !== null) if (gt(s.value, o)) {
              if (s.children === i.children && !Xe.current) {
                t = _t(e, t, n);
                break e;
              }
            } else for (s = t.child, s !== null && (s["return"] = t); s !== null;) {
              var f = s.dependencies;
              if (f !== null) {
                o = s.child;
                for (var d = f.firstContext; d !== null;) {
                  if (d.context === l) {
                    if (s.tag === 1) {
                      d = Ft(-1, n & -n), d.tag = 2;
                      var y = s.updateQueue;
                      if (y !== null) {
                        y = y.shared;
                        var j = y.pending;
                        j === null ? d.next = d : (d.next = j.next, j.next = d), y.pending = d;
                      }
                    }
                    s.lanes |= n, d = s.alternate, d !== null && (d.lanes |= n), Gi(s["return"], n, t), f.lanes |= n;
                    break;
                  }
                  d = d.next;
                }
              } else if (s.tag === 10) o = s.type === t.type ? null : s.child;else if (s.tag === 18) {
                if (o = s["return"], o === null) throw Error(u(341));
                o.lanes |= n, f = o.alternate, f !== null && (f.lanes |= n), Gi(o, n, t), o = s.sibling;
              } else o = s.child;
              if (o !== null) o["return"] = s;else for (o = s; o !== null;) {
                if (o === t) {
                  o = null;
                  break;
                }
                if (s = o.sibling, s !== null) {
                  s["return"] = o["return"], o = s;
                  break;
                }
                o = o["return"];
              }
              s = o;
            }
            We(e, t, i.children, n), t = t.child;
          }
          return t;
        case 9:
          return i = t.type, l = t.pendingProps.children, An(t, n), i = ft(i), l = l(i), t.flags |= 1, We(e, t, l, n), t.child;
        case 14:
          return l = t.type, i = xt(l, t.pendingProps), i = xt(l.type, i), Su(e, t, l, i, n);
        case 15:
          return Tu(e, t, t.type, t.pendingProps, n);
        case 17:
          return l = t.type, i = t.pendingProps, i = t.elementType === l ? i : xt(l, i), jl(e, t), t.tag = 1, Ye(l) ? (e = !0, sl(t)) : e = !1, An(t, n), du(t, l, i), fs(t, l, i, n), ms(null, t, l, !0, e, n);
        case 19:
          return Bu(e, t, n);
        case 22:
          return ku(e, t, n);
      }
      throw Error(u(156, t.tag));
    };
    function qu(e, t) {
      return La(e, t);
    }
    function Fd(e, t, n, l) {
      this.tag = e, this.key = n, this.sibling = this.child = this["return"] = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function pt(e, t, n, l) {
      return new Fd(e, t, n, l);
    }
    function _s(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function _d(e) {
      if (typeof e == "function") return _s(e) ? 1 : 0;
      if (e != null) {
        if (e = e.$$typeof, e === _) return 11;
        if (e === Qe) return 14;
      }
      return 2;
    }
    function tn(e, t) {
      var n = e.alternate;
      return n === null ? (n = pt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
    }
    function _l(e, t, n, l, i, s) {
      var o = 2;
      if (l = e, typeof e == "function") _s(e) && (o = 1);else if (typeof e == "string") o = 5;else e: switch (e) {
        case pe:
          return yn(n.children, i, s, t);
        case Q:
          o = 8, i |= 8;
          break;
        case ne:
          return e = pt(12, n, t, i | 2), e.elementType = ne, e.lanes = s, e;
        case fe:
          return e = pt(13, n, t, i), e.elementType = fe, e.lanes = s, e;
        case rt:
          return e = pt(19, n, t, i), e.elementType = rt, e.lanes = s, e;
        case ye:
          return Il(n, i, s, t);
        default:
          if (_typeof(e) == "object" && e !== null) switch (e.$$typeof) {
            case Ge:
              o = 10;
              break e;
            case mt:
              o = 9;
              break e;
            case _:
              o = 11;
              break e;
            case Qe:
              o = 14;
              break e;
            case Oe:
              o = 16, l = null;
              break e;
          }
          throw Error(u(130, e == null ? e : _typeof(e), ""));
      }
      return t = pt(o, n, t, i), t.elementType = e, t.type = l, t.lanes = s, t;
    }
    function yn(e, t, n, l) {
      return e = pt(7, e, l, t), e.lanes = n, e;
    }
    function Il(e, t, n, l) {
      return e = pt(22, e, l, t), e.elementType = ye, e.lanes = n, e.stateNode = {
        isHidden: !1
      }, e;
    }
    function Is(e, t, n) {
      return e = pt(6, e, null, t), e.lanes = n, e;
    }
    function As(e, t, n) {
      return t = pt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Id(e, t, n, l, i) {
      this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ci(0), this.expirationTimes = ci(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ci(0), this.identifierPrefix = l, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
    }
    function bs(e, t, n, l, i, s, o, f, d) {
      return e = new Id(e, t, n, f, d), t === 1 ? (t = 1, s === !0 && (t |= 8)) : t = 0, s = pt(3, null, null, t), e.current = s, s.stateNode = e, s.memoizedState = {
        element: l,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }, Xi(s), e;
    }
    function Ad(e, t, n) {
      var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: ge,
        key: l == null ? null : "" + l,
        children: e,
        containerInfo: t,
        implementation: n
      };
    }
    function ec(e) {
      if (!e) return Wt;
      e = e._reactInternals;
      e: {
        if (sn(e) !== e || e.tag !== 1) throw Error(u(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (Ye(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t["return"];
        } while (t !== null);
        throw Error(u(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (Ye(n)) return No(e, n, t);
      }
      return t;
    }
    function tc(e, t, n, l, i, s, o, f, d) {
      return e = bs(n, l, !0, e, i, s, o, f, d), e.context = ec(null), n = e.current, l = $e(), i = qt(n), s = Ft(l, i), s.callback = t !== null && t !== void 0 ? t : null, Gt(n, s, i), e.current.lanes = i, er(e, i, l), tt(e, l), e;
    }
    function Al(e, t, n, l) {
      var i = t.current,
        s = $e(),
        o = qt(i);
      return n = ec(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ft(s, o), t.payload = {
        element: e
      }, l = l === void 0 ? null : l, l !== null && (t.callback = l), e = Gt(i, t, o), e !== null && (kt(e, i, o, s), pl(e, i, o)), o;
    }
    function bl(e) {
      if (e = e.current, !e.child) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function nc(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function Ms(e, t) {
      nc(e, t), (e = e.alternate) && nc(e, t);
    }
    function bd() {
      return null;
    }
    var rc = typeof reportError == "function" ? reportError : function (e) {
      console.error(e);
    };
    function Os(e) {
      this._internalRoot = e;
    }
    Ml.prototype.render = Os.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      Al(e, t, null, null);
    }, Ml.prototype.unmount = Os.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        mn(function () {
          Al(null, e, null, null);
        }), t[Bt] = null;
      }
    };
    function Ml(e) {
      this._internalRoot = e;
    }
    Ml.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Ma();
        e = {
          blockedOn: null,
          target: e,
          priority: t
        };
        for (var n = 0; n < zt.length && t !== 0 && t < zt[n].priority; n++);
        zt.splice(n, 0, e), n === 0 && Da(e);
      }
    };
    function zs(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ol(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function lc() {}
    function Md(e, t, n, l, i) {
      if (i) {
        if (typeof l == "function") {
          var s = l;
          l = function l() {
            var y = bl(o);
            s.call(y);
          };
        }
        var o = tc(t, l, e, 0, null, !1, !1, "", lc);
        return e._reactRootContainer = o, e[Bt] = o.current, pr(e.nodeType === 8 ? e.parentNode : e), mn(), o;
      }
      for (; i = e.lastChild;) e.removeChild(i);
      if (typeof l == "function") {
        var f = l;
        l = function l() {
          var y = bl(d);
          f.call(y);
        };
      }
      var d = bs(e, 0, !1, null, null, !1, !1, "", lc);
      return e._reactRootContainer = d, e[Bt] = d.current, pr(e.nodeType === 8 ? e.parentNode : e), mn(function () {
        Al(t, d, n, l);
      }), d;
    }
    function zl(e, t, n, l, i) {
      var s = n._reactRootContainer;
      if (s) {
        var o = s;
        if (typeof i == "function") {
          var f = i;
          i = function i() {
            var d = bl(o);
            f.call(d);
          };
        }
        Al(t, o, e, i);
      } else o = Md(n, t, e, i, l);
      return bl(o);
    }
    Aa = function Aa(e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = qn(t.pendingLanes);
            n !== 0 && (fi(t, n | 1), tt(t, Ce()), !(re & 6) && (Dn = Ce() + 500, $t()));
          }
          break;
        case 13:
          mn(function () {
            var l = Zt(e, 1);
            if (l !== null) {
              var i = $e();
              kt(l, e, 1, i);
            }
          }), Ms(e, 1);
      }
    }, di = function di(e) {
      if (e.tag === 13) {
        var t = Zt(e, 134217728);
        if (t !== null) {
          var n = $e();
          kt(t, e, 134217728, n);
        }
        Ms(e, 134217728);
      }
    }, ba = function ba(e) {
      if (e.tag === 13) {
        var t = qt(e),
          n = Zt(e, t);
        if (n !== null) {
          var l = $e();
          kt(n, e, t, l);
        }
        Ms(e, t);
      }
    }, Ma = function Ma() {
      return he;
    }, Oa = function Oa(e, t) {
      var n = he;
      try {
        return he = e, t();
      } finally {
        he = n;
      }
    }, li = function li(e, t, n) {
      switch (t) {
        case "input":
          if (Ql(e, n), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode;) n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var i = ll(l);
                if (!i) throw Error(u(90));
                ca(l), Ql(l, i);
              }
            }
          }
          break;
        case "textarea":
          ma(e, n);
          break;
        case "select":
          t = n.value, t != null && xn(e, !!n.multiple, t, !1);
      }
    }, ja = Rs, Ea = mn;
    var Od = {
        usingClientEntryPoint: !1,
        Events: [gr, Bn, ll, ka, wa, Rs]
      },
      Lr = {
        findFiberByHostInstance: an,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
      },
      zd = {
        bundleType: Lr.bundleType,
        version: Lr.version,
        rendererPackageName: Lr.rendererPackageName,
        rendererConfig: Lr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: le.ReactCurrentDispatcher,
        findHostInstanceByFiber: function findHostInstanceByFiber(e) {
          return e = Ba(e), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Lr.findFiberByHostInstance || bd,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
      };
    if ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ? "undefined" : _typeof(__REACT_DEVTOOLS_GLOBAL_HOOK__)) < "u") {
      var Dl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Dl.isDisabled && Dl.supportsFiber) try {
        Mr = Dl.inject(zd), wt = Dl;
      } catch (_unused10) {}
    }
    return Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Od, Je.createPortal = function (e, t) {
      var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!zs(t)) throw Error(u(200));
      return Ad(e, t, null, n);
    }, Je.createRoot = function (e, t) {
      if (!zs(e)) throw Error(u(299));
      var n = !1,
        l = "",
        i = rc;
      return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = bs(e, 1, !1, null, null, n, !1, l, i), e[Bt] = t.current, pr(e.nodeType === 8 ? e.parentNode : e), new Os(t);
    }, Je.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0) throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
      return e = Ba(t), e = e === null ? null : e.stateNode, e;
    }, Je.flushSync = function (e) {
      return mn(e);
    }, Je.hydrate = function (e, t, n) {
      if (!Ol(t)) throw Error(u(200));
      return zl(null, e, t, !0, n);
    }, Je.hydrateRoot = function (e, t, n) {
      if (!zs(e)) throw Error(u(405));
      var l = n != null && n.hydratedSources || null,
        i = !1,
        s = "",
        o = rc;
      if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = tc(t, null, e, 1, n !== null && n !== void 0 ? n : null, i, !1, s, o), e[Bt] = t.current, pr(e), l) for (e = 0; e < l.length; e++) n = l[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
      return new Ml(t);
    }, Je.render = function (e, t, n) {
      if (!Ol(t)) throw Error(u(200));
      return zl(null, e, t, !1, n);
    }, Je.unmountComponentAtNode = function (e) {
      if (!Ol(e)) throw Error(u(40));
      return e._reactRootContainer ? (mn(function () {
        zl(null, null, e, !1, function () {
          e._reactRootContainer = null, e[Bt] = null;
        });
      }), !0) : !1;
    }, Je.unstable_batchedUpdates = Rs, Je.unstable_renderSubtreeIntoContainer = function (e, t, n, l) {
      if (!Ol(n)) throw Error(u(200));
      if (e == null || e._reactInternals === void 0) throw Error(u(38));
      return zl(e, t, n, !1, l);
    }, Je.version = "18.3.1-next-f1338f8080-20240426", Je;
  }
  function Gs() {
    if (!((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ? "undefined" : _typeof(__REACT_DEVTOOLS_GLOBAL_HOOK__)) > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gs);
    } catch (c) {
      console.error(c);
    }
  }
  Gs(), Hs.exports = uc();
  var cc = Hs.exports;
  var fc = Ds(cc);
  var Qs = {
      exports: {}
    },
    Un = {}; /**
             * @license React
             * react-jsx-runtime.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
  var Xs;
  function dc() {
    if (Xs) return Un;
    Xs = 1;
    var c = ue,
      r = Symbol["for"]("react.element"),
      u = Symbol["for"]("react.fragment"),
      S = Object.prototype.hasOwnProperty,
      v = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      P = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      };
    function C(N, L, B) {
      var T,
        Z = {},
        z = null,
        K = null;
      B !== void 0 && (z = "" + B), L.key !== void 0 && (z = "" + L.key), L.ref !== void 0 && (K = L.ref);
      for (T in L) S.call(L, T) && !P.hasOwnProperty(T) && (Z[T] = L[T]);
      if (N && N.defaultProps) for (T in L = N.defaultProps, L) Z[T] === void 0 && (Z[T] = L[T]);
      return {
        $$typeof: r,
        type: N,
        key: z,
        ref: K,
        props: Z,
        _owner: v.current
      };
    }
    return Un.Fragment = u, Un.jsx = C, Un.jsxs = C, Un;
  }
  Qs.exports = dc();
  var a = Qs.exports; /*!
                      * Merge two or more objects together.
                      * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
                      * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
                      * @param   {Object}   objects  The objects to merge together
                      * @returns {Object}            Merged values of defaults and options
                      *
                      * Use the function as follows:
                      * let shallowMerge = extend(obj1, obj2);
                      * let deepMerge = extend(true, obj1, obj2)
                      */
  var _Ys = function Ys(c, r) {
      for (var _i3 = 0, _Object$keys = Object.keys(r); _i3 < _Object$keys.length; _i3++) {
        var u = _Object$keys[_i3];
        r[u] instanceof Object && (r[u].length ? c[u] = r[u] : Object.assign(r[u], _Ys(c[u], r[u])));
      }
      return Object.assign(c || {}, r), c;
    },
    rn = function rn() {
      return ue.useContext(qs);
    },
    hc = function hc() {
      var _rn = rn(),
        c = _rn.options.colors;
      return c ? a.jsx("style", {
        children: "\n        #eur-leasingcalc {\n            --color-text: ".concat(c.text, ";\n            --color-text-required: ").concat(c.textRequired, ";\n            --color-input-required: ").concat(c.inputRequired, ";\n            --color-form-bg: ").concat(c.formBg, ";\n            --color-yes: ").concat(c.yes, ";\n            --color-no: ").concat(c.no, ";\n            --color-primary: ").concat(c.primary, ";\n            --color-button: ").concat(c.button, ";\n            --color-button-text: ").concat(c.buttonText, ";\n            --color-button-light: ").concat(c.buttonLight, ";\n            --color-text-light: ").concat(c.textLight, ";\n            --color-border: ").concat(c.border, ";\n            --color-input: ").concat(c.input, ";\n            --color-input-disabled: ").concat(c.inputDisabled, ";\n            --color-result-row-alternate: ").concat(c.resultRowAlternate, ";\n            --color-result-row-highlight: ").concat(c.resultRowHighlight, ";\n            --color-result-row-head: ").concat(c.resultRowHead, ";\n            --color-result-row-foot: ").concat(c.resultRowFoot, ";\n            --color-result-detail-button: ").concat(c.resultDetailButton, ";\n            --color-head-row-bg: ").concat(c.headRowBg, ";\n            --color-head-box-bg: ").concat(c.headBoxBg, ";\n            \n        }\n    ")
      }) : null;
    },
    qs = ue.createContext({
      options: {}
    });
  function pc(_ref) {
    var c = _ref.options,
      r = _ref.defaultOptions,
      u = _ref.children;
    var S = _Ys(r, c);
    return a.jsxs(qs.Provider, {
      value: {
        options: S
      },
      children: [a.jsx(hc, {}), u]
    });
  }
  function x(c) {
    var _r$settings, _r$texts;
    var _rn2 = rn(),
      r = _rn2.options,
      u = r === null || r === void 0 || (_r$settings = r.settings) === null || _r$settings === void 0 ? void 0 : _r$settings.language;
    if (!u) return c;
    var S = r === null || r === void 0 || (_r$texts = r.texts) === null || _r$texts === void 0 || (_r$texts = _r$texts[u]) === null || _r$texts === void 0 ? void 0 : _r$texts[c];
    return S ? a.jsx("span", {
      dangerouslySetInnerHTML: {
        __html: S
      }
    }) : c;
  }
  var Te = function Te(_ref2) {
      var c = _ref2.children,
        r = _ref2.className;
      return a.jsx("div", {
        className: "flex max-md:flex-col gap-1 w-full ".concat(r || ""),
        children: c
      });
    },
    je = function je(_ref3) {
      var c = _ref3.children,
        r = _ref3.className;
      return a.jsx("div", {
        className: "flex gap-1 w-full items-center grow ".concat(r || "", " justify-start md:justify-start"),
        children: c
      });
    },
    Be = function Be(_ref4) {
      var c = _ref4.children,
        r = _ref4.strong;
      return a.jsx("div", {
        className: "text-[--color-text] text-sm justify-start gap-3 grow min-w-30 w-[50%] max-md:w-full md:w-[40%] shrink-0 items-center flex pr-3 pl-0 max-md:pt-4 max-md:pb-2 text-sm ".concat(r ? "text-bold" : ""),
        children: c
      });
    },
    ln = function ln(_ref5) {
      var _ref5$options = _ref5.options,
        c = _ref5$options === void 0 ? [] : _ref5$options,
        r = _ref5.disabled,
        u = _ref5.initialValue,
        _ref5$onChange = _ref5.onChange,
        S = _ref5$onChange === void 0 ? function () {} : _ref5$onChange,
        _ref5$type = _ref5.type,
        v = _ref5$type === void 0 ? "text" : _ref5$type,
        _ref5$required = _ref5.required,
        P = _ref5$required === void 0 ? !1 : _ref5$required;
      var _ue$useState = ue.useState(u),
        _ue$useState2 = _slicedToArray(_ue$useState, 2),
        C = _ue$useState2[0],
        N = _ue$useState2[1],
        L = function L(B) {
          var T = v === "number" ? parseFloat(B.target.value.toString()) : v === "bool" ? B.target.value === "true" ? "true" : "false" : B.target.value;
          N(T.toString()), S(T.toString());
        };
      return a.jsx("div", {
        className: "border border-[--color-border] w-full flex font-normal text-base ",
        children: c.length > 1 ? a.jsx("select", {
          onChange: L,
          defaultValue: String(C),
          className: "border-0 px-4 py-2 w-full border-r-8 border-r-transparent ".concat(P && !C ? "bg-[--color-input-required]" : "", " ").concat(r ? "cursor-not-allowed bg-[--color-input-disabled]" : "bg-[--color-input]"),
          children: c.map(function (_ref6) {
            var B = _ref6.name,
              T = _ref6.optValue;
            return a.jsx("option", {
              value: T,
              children: B
            }, "key-" + T);
          })
        }) : a.jsx("p", {
          className: "color-black border-0 px-4 py-2 w-full ".concat(r ? "cursor-not-allowed bg-[--color-input-disabled]" : "bg-[--color-input]"),
          children: c[0].name
        })
      });
    },
    nt = function nt(_ref7) {
      var _ref7$initialValue = _ref7.initialValue,
        c = _ref7$initialValue === void 0 ? 0 : _ref7$initialValue,
        r = _ref7.calculatedValue,
        _ref7$onChange = _ref7.onChange,
        u = _ref7$onChange === void 0 ? function () {} : _ref7$onChange,
        _ref7$prefix = _ref7.prefix,
        S = _ref7$prefix === void 0 ? "" : _ref7$prefix,
        v = _ref7.type,
        _ref7$step = _ref7.step,
        P = _ref7$step === void 0 ? 1 : _ref7$step,
        _ref7$min = _ref7.min,
        C = _ref7$min === void 0 ? 0 : _ref7$min,
        _ref7$max = _ref7.max,
        N = _ref7$max === void 0 ? 1 / 0 : _ref7$max,
        L = _ref7.disabled,
        _ref7$placeholder = _ref7.placeholder,
        B = _ref7$placeholder === void 0 ? "" : _ref7$placeholder,
        _ref7$variant = _ref7.variant,
        T = _ref7$variant === void 0 ? "normal" : _ref7$variant,
        _ref7$required = _ref7.required,
        Z = _ref7$required === void 0 ? !1 : _ref7$required;
      var _ue$useState3 = ue.useState(c),
        _ue$useState4 = _slicedToArray(_ue$useState3, 2),
        z = _ue$useState4[0],
        K = _ue$useState4[1];
      ue.useEffect(function () {
        z > N && K(N);
      }, [N]), ue.useEffect(function () {
        r && K(r);
      }, [r]);
      var X = function X(G) {
          var _G$target;
          var J = v === "number" ? parseFloat(G === null || G === void 0 || (_G$target = G.target) === null || _G$target === void 0 ? void 0 : _G$target.value) : 0;
          K(J), u(J);
        },
        Y = function Y(G) {
          var J = v === "number" ? parseFloat(G.target.value) : 0;
          v === "number" && (N && J > N && (J = N), C && J < C && (J = C), isNaN(J) && (J = C)), K(J), u(J);
        };
      return a.jsxs("div", {
        className: "flex w-full items-center text-right border border-[--color-border] font-normal ".concat(T !== "big" ? "text-sm" : "text-lg", " ").concat(Z && !z ? "bg-[--color-input-required]" : "", " ").concat(L ? "bg-[--color-input-disabled]" : "bg-[--color-input]"),
        children: [a.jsx("span", {
          className: "px-4 leading-none",
          children: S
        }), a.jsx("input", {
          placeholder: B,
          type: v,
          value: z,
          min: v === "number" ? C : 0,
          max: v === "number" ? N : 1 / 0,
          step: P,
          onChange: X,
          onBlur: Y,
          disabled: L,
          className: "border-0 px-4 ".concat(T === "big" ? "py-3.5" : "py-2", " bg-transparent text-right w-full")
        })]
      });
    },
    Nt = function Nt(_ref8) {
      var _ref8$size = _ref8.size,
        c = _ref8$size === void 0 ? "medium" : _ref8$size,
        _ref8$type = _ref8.type,
        r = _ref8$type === void 0 ? "button" : _ref8$type,
        _ref8$circle = _ref8.circle,
        u = _ref8$circle === void 0 ? !1 : _ref8$circle,
        S = _ref8.noPadding,
        v = _ref8.loading,
        P = _ref8.children,
        _ref8$variant = _ref8.variant,
        C = _ref8$variant === void 0 ? "secondary" : _ref8$variant,
        N = _ref8.className,
        L = _ref8.onClick;
      var B = S ? "p-0" : r === "link" ? "px-0" : c === "big" ? "py-2 px-4" : c === "medium" ? "py-1.5 px-2 text-sm" : c === "small" ? "py-1.5 px-2 text-xs" : c === "mini" ? "px-1.5 py-1.5 text-xs" : "",
        T = c === "big" ? "text-lg" : c === "medium" ? "text-sm" : c === "small" || c === "mini" ? "text-xs" : "",
        Z = u ? "rounded-full shrink-0 aspect-square leading-[0px] inline-flex items-center justify-center" : "",
        z = r === "link" ? "bg-transparent border-0 text-[--color-primary] font-normal" : C === "primary" ? "bg-[--color-button] text-[--color-button-text]" : C === "secondary" ? "bg-[--color-button-light] text-[--color-button-text]" : "";
      return a.jsxs("button", {
        onClick: L,
        className: "".concat(v ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto", " border-1 rounded-full font-display cursor-pointer self-center ").concat(z, " ").concat(T, " ").concat(B, " ").concat(Z, " ").concat(N || "", " "),
        children: [!v && P, a.jsx("span", {
          className: "".concat(v ? "inline" : "hidden"),
          children: x("loading")
        })]
      });
    },
    ea = ue.createContext({
      content: null,
      setContent: null
    }),
    mc = function mc() {
      return ue.useContext(ea);
    };
  function vc(_ref9) {
    var c = _ref9.children;
    var _ue$useState5 = ue.useState(null),
      _ue$useState6 = _slicedToArray(_ue$useState5, 2),
      r = _ue$useState6[0],
      u = _ue$useState6[1],
      S = function S() {
        u(null);
      };
    return a.jsxs(ea.Provider, {
      value: {
        content: r,
        setContent: u
      },
      children: [a.jsx("div", {
        className: "z-10 relative",
        children: c
      }), a.jsx("div", {
        className: "fixed left-0 top-0 w-full h-full transition-all duration-200 ease-out bg-black/80 z-20 ".concat(r ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"),
        onClick: function onClick(v) {
          S(), v.stopPropagation();
        },
        children: a.jsxs("div", {
          className: "transition-all duration-200 ease-out bg-white p-2 lg:p-8 rounded-md absolute left-1/2 top-1/2 right-auto bottom-auto max-h-[calc(100vh-50px)] w-[700px] max-w-[calc(100vw-20px)] flex overflow-auto -translate-y-1/2 -translate-x-1/2",
          onClick: function onClick(v) {
            v.stopPropagation();
          },
          children: [a.jsx(Nt, {
            className: "absolute font-display top-0 right-0 rounded-full h-10 w-10 flex justify-center items-center bg-transparent text-black",
            onClick: S,
            children: "✕"
          }), a.jsx("div", {
            className: "w-full",
            children: r
          })]
        })
      })]
    });
  }
  var He = function He(_ref0) {
      var c = _ref0.children,
        r = _ref0.buttonText,
        u = _ref0.url;
      var _mc = mc(),
        S = _mc.setContent,
        v = function v() {
          u ? window.open(u, "_blank") : S && S(c);
        };
      return a.jsx("span", {
        className: "relative",
        children: a.jsx(Nt, {
          variant: "tertiary",
          size: r ? "medium" : "mini",
          type: r ? "link" : "button",
          circle: !r,
          onClick: v,
          noPadding: !0,
          className: "".concat(r ? "" : "ml-0 aspect-square leading-[0px]", " p-0 m-0 align-middle"),
          children: r || a.jsx("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 20 20",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: a.jsx("path", {
              d: "M9.325 15H10.825V9H9.325V15ZM10 7.15C10.2333 7.15 10.4292 7.075 10.5875 6.925C10.7458 6.775 10.825 6.58333 10.825 6.35C10.825 6.11667 10.7458 5.91667 10.5875 5.75C10.4292 5.58333 10.2333 5.5 10 5.5C9.76667 5.5 9.57083 5.58333 9.4125 5.75C9.25417 5.91667 9.175 6.11667 9.175 6.35C9.175 6.58333 9.25417 6.775 9.4125 6.925C9.57083 7.075 9.76667 7.15 10 7.15ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3583 0 9.975C0 8.60833 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.64167 0 10.025 0C11.3917 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10.025 18.5C12.375 18.5 14.375 17.6708 16.025 16.0125C17.675 14.3542 18.5 12.3417 18.5 9.975C18.5 7.625 17.675 5.625 16.025 3.975C14.375 2.325 12.3667 1.5 10 1.5C7.65 1.5 5.64583 2.325 3.9875 3.975C2.32917 5.625 1.5 7.63333 1.5 10C1.5 12.35 2.32917 14.3542 3.9875 16.0125C5.64583 17.6708 7.65833 18.5 10.025 18.5Z",
              fill: "black"
            })
          })
        })
      });
    },
    Hn = function Hn() {
      var _rn3 = rn(),
        c = _rn3.options.settings,
        _ref1 = c || {},
        r = _ref1.insurancePackages,
        u = [];
      r === null || r === void 0 || r.map(function (_ref10) {
        var v = _ref10.features;
        if (v) for (var _i4 = 0, _Object$entries = Object.entries(v); _i4 < _Object$entries.length; _i4++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 1),
            P = _Object$entries$_i[0];
          u.push(P);
        }
        return u;
      });
      var S = _toConsumableArray(new Set(u));
      return a.jsxs("div", {
        className: "flex flex-col overflow-auto h-full w-full",
        children: [a.jsx("h2", {
          className: "text-left",
          children: x("compareTableHeadline")
        }), a.jsxs("table", {
          className: "w-full border-collapse border-spacing-0",
          children: [a.jsx("thead", {
            children: a.jsxs("tr", {
              children: [a.jsx("th", {
                className: "text-left max-w-24",
                children: x("compareTableRepairOrReplacement")
              }), r === null || r === void 0 ? void 0 : r.map(function (_ref11) {
                var v = _ref11.name,
                  P = _ref11.title;
                return a.jsx("th", {
                  className: "text-left max-w-24",
                  children: P
                }, v);
              })]
            })
          }), a.jsx("tbody", {
            children: S.map(function (v) {
              return a.jsxs("tr", {
                children: [a.jsx("th", {
                  className: "max-w-[200px]",
                  children: x("compareTable".concat(v))
                }), r === null || r === void 0 ? void 0 : r.map(function (_ref12) {
                  var P = _ref12.name,
                    C = _ref12.features;
                  var N = C === null || C === void 0 ? void 0 : C[v];
                  return C instanceof Object ? P && a.jsx("td", {
                    className: "max-w-16 text-center",
                    children: N === !0 ? a.jsx(gc, {}) : N === !1 ? a.jsx(yc, {}) : typeof N == "string" ? x(N) : "N/A"
                  }, P) : a.jsx("td", {
                    className: "max-w-16 text-[#eee]",
                    children: "N/A"
                  });
                })]
              }, v);
            })
          })]
        })]
      });
    },
    gc = function gc() {
      var _c$colors;
      var _rn4 = rn(),
        c = _rn4.options;
      return a.jsx("span", {
        className: "".concat(c !== null && c !== void 0 && (_c$colors = c.colors) !== null && _c$colors !== void 0 && _c$colors.yes ? "bg-[--color-yes]" : "bg-[#6edc6e]", " w-6 h-6 inline-flex items-center justify-center rounded-full text-white"),
        children: a.jsx("svg", {
          width: "16",
          height: "11",
          viewBox: "0 0 15 11",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: a.jsx("path", {
            d: "M5.33336 8.64325L12.9934 0.982422L14.1725 2.16076L5.33336 10.9999L0.0300293 5.69659L1.20836 4.51826L5.33336 8.64325Z",
            fill: "currentColor",
            stroke: "currentColor",
            strokeWidth: "1"
          })
        })
      });
    },
    yc = function yc() {
      return a.jsx("span", {
        className: "bg-[#ddd] font-display w-6 h-6 inline-flex items-center justify-center rounded-full text-white",
        children: "-"
      });
    },
    xc = function xc(_ref13) {
      var c = _ref13.onChange,
        r = _ref13.onRemove,
        u = _ref13.index,
        _ref13$price = _ref13.price,
        S = _ref13$price === void 0 ? 0 : _ref13$price,
        _ref13$uvp = _ref13.uvp,
        v = _ref13$uvp === void 0 ? 0 : _ref13$uvp,
        _ref13$uid = _ref13.uid,
        P = _ref13$uid === void 0 ? 0 : _ref13$uid,
        C = _ref13.removeAvailable,
        N = _ref13.isProduct,
        L = _ref13.maxBikePrice,
        B = _ref13.minBikePrice,
        T = _ref13.extended;
      var _ue$useState7 = ue.useState(S),
        _ue$useState8 = _slicedToArray(_ue$useState7, 2),
        Z = _ue$useState8[0],
        z = _ue$useState8[1],
        _ue$useState9 = ue.useState(v),
        _ue$useState0 = _slicedToArray(_ue$useState9, 2),
        K = _ue$useState0[0],
        X = _ue$useState0[1],
        Y = function Y(J) {
          isNaN(J) && (J = 0), z(J), c({
            index: u,
            row: {
              price: J,
              uvp: K,
              uid: P
            }
          });
        },
        G = function G(J) {
          isNaN(J) && (J = 0), X(J), c({
            index: u,
            row: {
              price: Z,
              uvp: J,
              uid: P
            }
          });
        };
      return T ? a.jsxs(a.Fragment, {
        children: [a.jsxs("div", {
          className: "col-span-2 max-md:col-span-1 border-b border-b-[--color-border] pt-4 pb-2 mb-2 text-sm flex justify-between ".concat(C ? "" : "hidden"),
          children: ["# ", u + 1, a.jsx("div", {
            children: a.jsxs("div", {
              className: "flex justify-end items-center gap-2 text-xs cursor-pointer",
              onClick: function onClick() {
                return r(u);
              },
              children: [a.jsx("span", {
                className: "opacity-30",
                children: x("removeBike")
              }), a.jsx(Nt, {
                variant: "primary",
                noPadding: !0,
                className: "rounded-none aspect-square w-5 leading-none text-xs",
                children: "-"
              })]
            })
          })]
        }), T && a.jsx("div", {
          className: "whitespace-normal text-lg",
          children: x("totalPrice")
        }), a.jsx("div", {
          className: "pb-4",
          children: a.jsx(nt, {
            type: "number",
            prefix: "€",
            min: B,
            max: L,
            placeholder: (S || 0).toString(),
            initialValue: S,
            onChange: function onChange(J) {
              G(J), Y(J);
            },
            disabled: N,
            variant: "big"
          })
        }), T && a.jsx("div", {
          className: "text-lg",
          children: x("totalPriceUVP")
        }), a.jsx("div", {
          children: a.jsx(nt, {
            type: "number",
            min: B,
            max: L,
            prefix: "€",
            placeholder: (K || 0).toString(),
            calculatedValue: K,
            disabled: N,
            onChange: G,
            variant: "big"
          })
        })]
      }) : a.jsx("div", {
        className: "pb-5",
        children: a.jsx("div", {
          children: a.jsx(nt, {
            type: "number",
            min: B,
            max: L,
            prefix: "€",
            placeholder: (K || 0).toString(),
            initialValue: K,
            disabled: N,
            onChange: function onChange(J) {
              G(J), Y(J);
            }
          })
        })
      });
    },
    Sc = ue.memo(function (_ref14) {
      var _ref14$initialValueUv = _ref14.initialValueUvp,
        c = _ref14$initialValueUv === void 0 ? 0 : _ref14$initialValueUv,
        _ref14$initialValue = _ref14.initialValue,
        r = _ref14$initialValue === void 0 ? 0 : _ref14$initialValue,
        _ref14$onChange = _ref14.onChange,
        u = _ref14$onChange === void 0 ? function () {} : _ref14$onChange,
        S = _ref14.maxBikes,
        v = _ref14.extended,
        _ref14$maxBikePrice = _ref14.maxBikePrice,
        P = _ref14$maxBikePrice === void 0 ? 1 / 0 : _ref14$maxBikePrice;
      var _rn5 = rn(),
        C = _rn5.options,
        N = C.settings,
        L = ue.useRef(0),
        B = {
          price: r,
          uvp: c,
          uid: L.current
        },
        T = ue.useRef([B]),
        Z = ue.useRef({
          total: r,
          totalUvp: c
        }),
        z = function z() {
          if (T.current.length < 1) return;
          var oe = 0,
            ce = 0;
          T.current.map(function (_ref15) {
            var Ee = _ref15.price,
              ge = _ref15.uvp;
            return oe += Ee, ce += ge, null;
          }), Z.current.total = oe, Z.current.totalUvp = ce;
          var le = T.current.length;
          u({
            totalPrice: oe,
            totalPriceUVP: ce,
            bikeCount: le,
            bikeRows: T.current
          });
        };
      if (!N) return null;
      var K = N.minBikePrice,
        X = N.isProduct,
        Y = function Y() {
          var oe = _toConsumableArray(T.current);
          oe.length >= S || (oe.push(_objectSpread(_objectSpread({}, B), {}, {
            uid: ++L.current
          })), T.current = oe, z());
        },
        G = function G(oe) {
          var ce = _toConsumableArray(T.current);
          ce.splice(oe, 1), T.current = ce, z();
        },
        J = function J(_ref16) {
          var oe = _ref16.index,
            ce = _ref16.row;
          var le = _toConsumableArray(T.current);
          le[oe] = ce, T.current = le, z();
        };
      return a.jsxs("div", {
        className: "w-full",
        children: [a.jsx("div", {
          className: "mt-2 pt-4 w-full content-center grid ".concat(v ? "grid-cols-2 max-md:grid-cols-1" : "grid-cols-1", " gap-4 items-center"),
          children: T.current.map(function (_ref17, Ee) {
            var oe = _ref17.price,
              ce = _ref17.uvp,
              le = _ref17.uid;
            return a.jsx(xc, {
              maxBikePrice: P || 1 / 0,
              minBikePrice: K || 0,
              price: oe,
              uvp: ce,
              onChange: J,
              onRemove: G,
              uid: le,
              index: Ee,
              removeAvailable: T.current.length > 1,
              isProduct: X || !1,
              extended: v
            }, "row" + le);
          })
        }), a.jsx("div", {
          className: "mt-4 pt-4 ".concat(v ? "block" : "hidden", " border-t border-t-[--color-border]"),
          children: T.current.length < S && a.jsxs("div", {
            className: "flex justify-end items-center gap-2 text-md cursor-pointer",
            onClick: Y,
            children: [a.jsx("span", {
              className: "opacity-50",
              children: x("addBike")
            }), a.jsx(Nt, {
              variant: "primary",
              noPadding: !0,
              className: "rounded-none aspect-square w-5 leading-none text-xs",
              children: "+"
            })]
          })
        }), a.jsx("div", {
          className: "".concat(S > 1 && T.current.length > 1 ? "" : "hidden"),
          children: a.jsxs("div", {
            className: "py-4 text-right ".concat(v ? "block" : "hidden"),
            children: [x("sumBikes"), ":", " ", Z.current.total.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR"
            }), " ", "/", " ", Z.current.totalUvp.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR"
            }), " ", "(", x("UVP"), ")"]
          })
        })]
      });
    }, function (c, r) {
      return !(c.extended !== r.extended || c.sendParams !== r.sendParams);
    }),
    Rr = function Rr(_ref18) {
      var _ref18$onChange = _ref18.onChange,
        c = _ref18$onChange === void 0 ? function () {} : _ref18$onChange,
        r = _ref18.initialValue;
      var _ue$useState1 = ue.useState(typeof r == "boolean" ? r : r === "AG"),
        _ue$useState10 = _slicedToArray(_ue$useState1, 2),
        u = _ue$useState10[0],
        S = _ue$useState10[1],
        v = function v() {
          var P = !u;
          S(P), c(P);
        };
      return a.jsx("div", {
        children: a.jsxs("div", {
          onClick: v,
          className: "relative text-sm h-10 select-none justify-between items-center inline-flex w-28 border-0 p-2 cursor-pointertext-white transition-all text-white ".concat(u === !0 ? "bg-[--color-yes]" : "bg-[--color-no]"),
          children: [a.jsx("span", {
            className: "absolute h-6 w-12 shrink-0 bg-white z-10 ".concat(u === !0 ? "left-[calc(100%-58px)]" : "left-[5px]", " transition-all")
          }), a.jsx("span", {
            className: "px-2 text-center flex-grow transition-opacity ".concat(u === !0 ? "opacity-100" : "opacity-0"),
            children: "Ja"
          }), a.jsx("span", {
            className: "px-2 text-center flex-grow transition-opacity ".concat(u === !0 ? "opacity-0" : "opacity-100"),
            children: "Nein"
          })]
        })
      });
    },
    Tc = function Tc(_ref19) {
      var c = _ref19.children;
      return a.jsx("div", {
        className: "flex flex-col gap-4 relative w-full max-w-[1200px] min-w-[375px] bg-[--color-form-bg] text-[--color-text] rounded-lg",
        children: c
      });
    },
    At = function At(_ref20) {
      var c = _ref20.noBorder,
        r = _ref20.children,
        u = _ref20.className;
      return a.jsx("div", {
        className: "flex flex-col px-10 max-md:px-4 gap-4 ".concat(c ? "border-0 border-[--color-border] border-b-1" : "", " ").concat(u || ""),
        children: r
      });
    },
    ta = 1.19,
    Wl = function Wl(c) {
      return c / ta;
    },
    na = function na(c) {
      return c * ta;
    };
  function R(c) {
    return c === void 0 ? "-- €" : c.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR"
    });
  }
  function Wn(c) {
    return c === void 0 ? "-- %" : c.toFixed(0) + "%";
  }
  var $l = function $l(_ref21) {
      var c = _ref21.children,
        r = _ref21.className;
      return a.jsx("div", {
        className: "flex-grow w-1/3 text-left px-4 py-3 flex flex-col min-w-150 border-l border-[--color-border] ".concat(r || ""),
        children: c
      });
    },
    ra = function ra(_ref22) {
      var c = _ref22.bikePrices,
        r = _ref22.withBikes;
      return a.jsxs("div", {
        children: [a.jsx("h3", {
          children: x("yourPrice")
        }), a.jsx("div", {
          children: a.jsxs("table", {
            children: [a.jsx("thead", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {}), a.jsx("th", {
                  children: x("leasingRateTotal")
                }), a.jsx("th", {
                  children: x("realNetShort")
                })]
              })
            }), a.jsx("tbody", {
              children: a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("comparisonLeasingRate")
                }), a.jsx("td", {
                  children: R(c === null || c === void 0 ? void 0 : c.leasingRate)
                }), a.jsx("td", {
                  children: R(r === null || r === void 0 ? void 0 : r.leasingRate)
                })]
              })
            })]
          })
        })]
      });
    },
    kc = function kc(_ref23) {
      var _N$insurancePackages;
      var c = _ref23.results;
      var _ref24 = c || {},
        r = _ref24.comparison,
        u = _ref24.inputParams,
        S = _ref24.savings,
        v = _ref24.bikePrices,
        _ref25 = r || {},
        P = _ref25.withBikes,
        _rn6 = rn(),
        C = _rn6.options,
        N = C.settings,
        _ref26 = N || {},
        L = _ref26.insuranceCost,
        B = u === null || u === void 0 ? void 0 : u.insurancePackage,
        T = N === null || N === void 0 || (_N$insurancePackages = N.insurancePackages) === null || _N$insurancePackages === void 0 ? void 0 : _N$insurancePackages.find(function (z) {
          return (z === null || z === void 0 ? void 0 : z.name) === B;
        }),
        Z = T !== null && T !== void 0 && T.insuranceInspectionCost ? ", zzgl. ".concat(R(2 * (T === null || T === void 0 ? void 0 : T.insuranceInspectionCost)), " ").concat(T === null || T === void 0 ? void 0 : T.insuranceInspectionCostText) : "";
      return a.jsxs("div", {
        children: [a.jsx("h3", {
          className: "pr-8",
          children: x("comparisonPurchaseToLeasing")
        }), L && Z && a.jsxs("p", {
          className: "text-sm mb-2",
          children: [x("insuranceCostInclusive1"), " ", R(L), " ", x("insuranceCostInclusive2"), " (", x("insuranceCostExplaination"), Z, ")", "; ", x("insuranceCostInclusive3")]
        }), a.jsxs("div", {
          children: [a.jsxs("table", {
            className: "[&_td]:text-right",
            children: [a.jsx("thead", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {}), a.jsx("th", {
                  children: x("purchase")
                })]
              })
            }), a.jsxs("tbody", {
              children: [a.jsxs("tr", {
                className: "border-top ",
                children: [a.jsx("th", {
                  children: x("purchasePrice")
                }), a.jsx("td", {
                  children: R(v === null || v === void 0 ? void 0 : v.bikePrice)
                })]
              }), a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: x("insurance")
                }), a.jsxs("td", {
                  children: ["+ ", R(N === null || N === void 0 ? void 0 : N.insuranceCost)]
                })]
              }), (T === null || T === void 0 ? void 0 : T.insuranceInspectionCost) && a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: T === null || T === void 0 ? void 0 : T.insuranceInspectionCostText
                }), a.jsxs("td", {
                  children: ["+ ", R(2 * (T === null || T === void 0 ? void 0 : T.insuranceInspectionCost))]
                })]
              }), a.jsxs("tr", {
                children: [a.jsxs("th", {
                  children: [x("leasingRateTotalCostWithBike"), " × 36"]
                }), a.jsxs("td", {
                  children: ["- ", R(P === null || P === void 0 ? void 0 : P.leasingTotal)]
                })]
              }), (u === null || u === void 0 ? void 0 : u.totalPriceUVP) && a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: x("takeoverPrice")
                }), a.jsxs("td", {
                  children: ["- ", R(.16 * (u === null || u === void 0 ? void 0 : u.totalPriceUVP))]
                })]
              })]
            })]
          }), a.jsx("table", {
            className: "[&_td]:text-right mt-4",
            children: a.jsx("tbody", {
              children: a.jsxs("tr", {
                className: "alternate",
                children: [a.jsx("th", {
                  children: x("savingsAgainstPurchase")
                }), a.jsx("td", {}), a.jsxs("td", {
                  colSpan: 2,
                  children: [R(v === null || v === void 0 ? void 0 : v.bikesPlusRepair), " ", a.jsx("br", {}), "- ", R(P === null || P === void 0 ? void 0 : P.leasingTotal), a.jsx("br", {}), "= ", R(S === null || S === void 0 ? void 0 : S.savingsAbsolute), a.jsx("br", {}), "= ", Wn(S === null || S === void 0 ? void 0 : S.savingsPercent)]
                })]
              })
            })
          })]
        })]
      });
    },
    wc = function wc(_ref27) {
      var _c$leasingRateInsuran;
      var c = _ref27.bikePrices;
      return a.jsxs("div", {
        children: [a.jsx("h3", {
          className: "pr-8",
          children: x("calculationLeasingCosts")
        }), a.jsx("div", {
          children: a.jsxs("table", {
            className: "[&_td]:text-right",
            children: [a.jsxs("tbody", {
              children: [a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsxs("th", {
                  children: [x("leasingRate"), " ", x("leasingRateAddition")]
                }), a.jsx("td", {
                  children: c && R((c === null || c === void 0 ? void 0 : c.leasingRate) - (c === null || c === void 0 ? void 0 : c.leasingRateInsurancePerMonth))
                })]
              }), c === null || c === void 0 || (_c$leasingRateInsuran = c.leasingRateInsurancesPerBike) === null || _c$leasingRateInsuran === void 0 ? void 0 : _c$leasingRateInsuran.map(function (_ref28, u) {
                var r = _ref28.leasinginsurancePerMonth;
                return a.jsxs("tr", {
                  className: "hightlight",
                  children: [a.jsxs("th", {
                    children: [x("leasinginsurancePerMonth"), " ", x("forBike"), " #", u + 1]
                  }), a.jsx("td", {
                    children: R(r)
                  })]
                }, u + r);
              })]
            }), a.jsx("tfoot", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {
                  children: x("leasingPriceTotal")
                }), a.jsxs("th", {
                  className: "text-right",
                  children: [a.jsx("span", {
                    className: "font-normal",
                    children: x("exclVat")
                  }), " ", R(c === null || c === void 0 ? void 0 : c.leasingRate)]
                })]
              })
            })]
          })
        })]
      });
    },
    la = function la(_ref29) {
      var c = _ref29.bikePrices,
        r = _ref29.useFullBikeUvpPrice,
        u = _ref29.inputParams;
      return a.jsx("div", {
        children: a.jsx("div", {
          children: a.jsxs("table", {
            className: "[&_td]:text-right",
            children: [a.jsx("thead", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {
                  children: x("calculationPlusNonCashBenefit")
                }), a.jsx("th", {})]
              })
            }), a.jsxs("tbody", {
              children: [a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("totalPriceUVP")
                }), a.jsx("td", {
                  children: R(u === null || u === void 0 ? void 0 : u.totalPriceUVP)
                })]
              }), !r && a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsxs("th", {
                  children: [x("quarterPriceUVP"), " ", a.jsxs(He, {
                    children: [a.jsx("h2", {
                      children: x("quarterPriceUVP")
                    }), a.jsx("p", {
                      children: x("quarterPriceUVPHintText")
                    })]
                  })]
                }), a.jsx("td", {
                  children: R(c === null || c === void 0 ? void 0 : c.bikePriceQuarterUvp)
                })]
              }), a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("referenceValueNonCashBenefit")
                }), a.jsx("td", {
                  children: (c === null || c === void 0 ? void 0 : c.bikePricePercentFull) && R((c === null || c === void 0 ? void 0 : c.bikePricePercent) * 100)
                })]
              })]
            }), a.jsx("tfoot", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {
                  children: x("nonCashBenefitAccordingToOnePercentRule")
                }), a.jsx("th", {
                  className: "text-right",
                  children: R(c === null || c === void 0 ? void 0 : c.bikePricePercent)
                })]
              })
            })]
          })
        })
      });
    },
    ia = function ia(_ref30) {
      var _c$inputParams, _X$contributions, _K$contributions, _X$contributions2, _K$contributions2, _X$contributions3, _K$contributions3, _X$contributions4, _K$contributions4, _X$contributions5, _K$contributions5, _X$contributions6, _K$contributions6, _X$contributions7, _K$contributions7, _X$contributions8, _K$contributions8, _X$contributions9, _K$contributions9, _X$contributions0, _K$contributions0, _X$contributions1, _X$contributions10;
      var c = _ref30.results,
        r = _ref30.extended;
      var _ue$useState11 = ue.useState(r),
        _ue$useState12 = _slicedToArray(_ue$useState11, 2),
        u = _ue$useState12[0],
        S = _ue$useState12[1],
        _ue$useState13 = ue.useState(!1),
        _ue$useState14 = _slicedToArray(_ue$useState13, 2),
        v = _ue$useState14[0],
        P = _ue$useState14[1],
        _ue$useState15 = ue.useState(!1),
        _ue$useState16 = _slicedToArray(_ue$useState15, 2),
        C = _ue$useState16[0],
        N = _ue$useState16[1],
        _ref31 = c || {},
        L = _ref31.comparison,
        B = _ref31.inputParams,
        T = _ref31.settings,
        Z = _ref31.bikePrices,
        z = _ref31.benefit,
        _ref32 = L || {},
        K = _ref32.withBikes,
        X = _ref32.withoutBikes;
      return a.jsxs(a.Fragment, {
        children: [a.jsx("div", {
          children: a.jsxs("table", {
            className: "[&_td]:text-right",
            children: [a.jsx("thead", {
              children: a.jsxs("tr", {
                className: "",
                children: [a.jsx("th", {
                  children: x("comparisonWithToWithoutBike")
                }), a.jsx("th", {
                  className: "text-right",
                  children: x("withoutBikes")
                }), a.jsx("th", {
                  className: "text-right",
                  children: x("withBikes")
                })]
              })
            }), a.jsxs("tbody", {
              children: [a.jsxs("tr", {
                className: "alternate",
                children: [a.jsx("th", {
                  children: c !== null && c !== void 0 && (_c$inputParams = c.inputParams) !== null && _c$inputParams !== void 0 && _c$inputParams.workTypeOfficial ? x("salaryGrossOfficial") : x("salaryGross")
                }), a.jsx("td", {
                  children: R(B === null || B === void 0 ? void 0 : B.salaryGross)
                }), a.jsx("td", {
                  children: R(B === null || B === void 0 ? void 0 : B.salaryGross)
                })]
              }), a.jsxs("tr", {
                children: [a.jsxs("th", {
                  children: [x("leasingPriceTotal"), " ", x("leasingRateAddition")]
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["- ", R(Z === null || Z === void 0 ? void 0 : Z.leasingRate)]
                })]
              }), a.jsxs("tr", {
                className: "".concat(z !== null && z !== void 0 && z.other && (z === null || z === void 0 ? void 0 : z.other) > 0 ? "" : "hidden"),
                children: [a.jsx("th", {
                  children: x("benefitOther")
                }), a.jsxs("td", {
                  children: ["+ ", R(z === null || z === void 0 ? void 0 : z.other)]
                }), a.jsxs("td", {
                  children: ["+ ", R(z === null || z === void 0 ? void 0 : z.other)]
                })]
              }), !(T !== null && T !== void 0 && T.benefitHidden) && a.jsxs("tr", {
                className: "".concat(z !== null && z !== void 0 && z.bikes && (z === null || z === void 0 ? void 0 : z.bikes) > 0 ? "" : "hidden"),
                children: [a.jsx("th", {
                  children: x("benefitTable")
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["+ ", R(z === null || z === void 0 ? void 0 : z.bikes)]
                })]
              }), a.jsxs("tr", {
                className: "".concat(Z !== null && Z !== void 0 && Z.bikePriceVatToSubtract && (Z === null || Z === void 0 ? void 0 : Z.bikePriceVatToSubtract) > 0 ? "" : "hidden"),
                children: [a.jsx("th", {
                  children: x("bikePriceVatToSubtract")
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["- ", R(Z === null || Z === void 0 ? void 0 : Z.bikePriceVatToSubtract)]
                })]
              }), a.jsxs("tr", {
                className: "alternate",
                children: [a.jsx("th", {
                  children: x("salaryWithBikes")
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["= ", R(K === null || K === void 0 ? void 0 : K.salaryGross)]
                })]
              }), a.jsxs("tr", {
                children: [a.jsxs("th", {
                  children: [x("plusNonCashBenefit"), " ", (B === null || B === void 0 ? void 0 : B.totalPriceUVP) && a.jsx(He, {
                    children: a.jsx(la, {
                      bikePrices: Z,
                      useFullBikeUvpPrice: (T === null || T === void 0 ? void 0 : T.useFullBikeUvpPrice) || !1,
                      inputParams: B
                    })
                  })]
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["+ ", R(Z === null || Z === void 0 ? void 0 : Z.bikePricePercent)]
                })]
              }), a.jsxs("tr", {
                className: "alternate",
                children: [a.jsx("th", {
                  children: x("taxBasis")
                }), a.jsxs("td", {
                  children: ["= ", R(X === null || X === void 0 ? void 0 : X.taxBasis)]
                }), a.jsxs("td", {
                  children: ["= ", R(K === null || K === void 0 ? void 0 : K.taxBasis)]
                })]
              }), a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: a.jsxs("div", {
                    className: "flex flex-nowrap gap-3",
                    children: [a.jsx(Nt, {
                      size: "mini",
                      noPadding: !0,
                      className: "rounded-none aspect-square w-5 leading-none text-xs",
                      variant: "primary",
                      circle: !0,
                      onClick: function onClick() {
                        return P(!v);
                      },
                      children: v ? "-" : "+"
                    }), " ", x("taxes")]
                  })
                }), a.jsxs("td", {
                  children: ["- ", R(X === null || X === void 0 || (_X$contributions = X.contributions) === null || _X$contributions === void 0 || (_X$contributions = _X$contributions.taxes) === null || _X$contributions === void 0 ? void 0 : _X$contributions.total)]
                }), a.jsxs("td", {
                  children: ["- ", R(K === null || K === void 0 || (_K$contributions = K.contributions) === null || _K$contributions === void 0 || (_K$contributions = _K$contributions.taxes) === null || _K$contributions === void 0 ? void 0 : _K$contributions.total)]
                })]
              }), v && a.jsxs(a.Fragment, {
                children: [a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("churchTax")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions2 = X.contributions) === null || _X$contributions2 === void 0 || (_X$contributions2 = _X$contributions2.taxes) === null || _X$contributions2 === void 0 ? void 0 : _X$contributions2.church)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions2 = K.contributions) === null || _K$contributions2 === void 0 || (_K$contributions2 = _K$contributions2.taxes) === null || _K$contributions2 === void 0 ? void 0 : _K$contributions2.church)
                  })]
                }), a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("solidarityTax")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions3 = X.contributions) === null || _X$contributions3 === void 0 || (_X$contributions3 = _X$contributions3.taxes) === null || _X$contributions3 === void 0 ? void 0 : _X$contributions3.soli)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions3 = K.contributions) === null || _K$contributions3 === void 0 || (_K$contributions3 = _K$contributions3.taxes) === null || _K$contributions3 === void 0 ? void 0 : _K$contributions3.soli)
                  })]
                }), a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("incomeTax")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions4 = X.contributions) === null || _X$contributions4 === void 0 || (_X$contributions4 = _X$contributions4.taxes) === null || _X$contributions4 === void 0 ? void 0 : _X$contributions4.income)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions4 = K.contributions) === null || _K$contributions4 === void 0 || (_K$contributions4 = _K$contributions4.taxes) === null || _K$contributions4 === void 0 ? void 0 : _K$contributions4.income)
                  })]
                })]
              }), a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: a.jsxs("div", {
                    className: "flex flex-nowrap gap-3",
                    children: [a.jsx(Nt, {
                      size: "mini",
                      noPadding: !0,
                      className: "rounded-none aspect-square w-5 leading-none text-xs",
                      variant: "primary",
                      circle: !0,
                      onClick: function onClick() {
                        return N(!C);
                      },
                      children: C ? "-" : "+"
                    }), " ", x("socialInsurances")]
                  })
                }), a.jsxs("td", {
                  children: ["- ", R(X === null || X === void 0 || (_X$contributions5 = X.contributions) === null || _X$contributions5 === void 0 || (_X$contributions5 = _X$contributions5.insurances) === null || _X$contributions5 === void 0 || (_X$contributions5 = _X$contributions5.employee) === null || _X$contributions5 === void 0 ? void 0 : _X$contributions5.total)]
                }), a.jsxs("td", {
                  children: ["- ", R(K === null || K === void 0 || (_K$contributions5 = K.contributions) === null || _K$contributions5 === void 0 || (_K$contributions5 = _K$contributions5.insurances) === null || _K$contributions5 === void 0 || (_K$contributions5 = _K$contributions5.employee) === null || _K$contributions5 === void 0 ? void 0 : _K$contributions5.total)]
                })]
              }), C && a.jsxs(a.Fragment, {
                children: [a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("unemploymentInsurance")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions6 = X.contributions) === null || _X$contributions6 === void 0 || (_X$contributions6 = _X$contributions6.insurances) === null || _X$contributions6 === void 0 || (_X$contributions6 = _X$contributions6.employee) === null || _X$contributions6 === void 0 ? void 0 : _X$contributions6.aVers)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions6 = K.contributions) === null || _K$contributions6 === void 0 || (_K$contributions6 = _K$contributions6.insurances) === null || _K$contributions6 === void 0 || (_K$contributions6 = _K$contributions6.employee) === null || _K$contributions6 === void 0 ? void 0 : _K$contributions6.aVers)
                  })]
                }), a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("pensionInsurance")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions7 = X.contributions) === null || _X$contributions7 === void 0 || (_X$contributions7 = _X$contributions7.insurances) === null || _X$contributions7 === void 0 || (_X$contributions7 = _X$contributions7.employee) === null || _X$contributions7 === void 0 ? void 0 : _X$contributions7.rVers)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions7 = K.contributions) === null || _K$contributions7 === void 0 || (_K$contributions7 = _K$contributions7.insurances) === null || _K$contributions7 === void 0 || (_K$contributions7 = _K$contributions7.employee) === null || _K$contributions7 === void 0 ? void 0 : _K$contributions7.rVers)
                  })]
                }), a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("careInsurance")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions8 = X.contributions) === null || _X$contributions8 === void 0 || (_X$contributions8 = _X$contributions8.insurances) === null || _X$contributions8 === void 0 || (_X$contributions8 = _X$contributions8.employee) === null || _X$contributions8 === void 0 ? void 0 : _X$contributions8.pVers)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions8 = K.contributions) === null || _K$contributions8 === void 0 || (_K$contributions8 = _K$contributions8.insurances) === null || _K$contributions8 === void 0 || (_K$contributions8 = _K$contributions8.employee) === null || _K$contributions8 === void 0 ? void 0 : _K$contributions8.pVers)
                  })]
                }), a.jsxs("tr", {
                  children: [a.jsx("th", {
                    className: "indent",
                    children: x("healthInsurance")
                  }), a.jsx("td", {
                    children: R(X === null || X === void 0 || (_X$contributions9 = X.contributions) === null || _X$contributions9 === void 0 || (_X$contributions9 = _X$contributions9.insurances) === null || _X$contributions9 === void 0 || (_X$contributions9 = _X$contributions9.employee) === null || _X$contributions9 === void 0 ? void 0 : _X$contributions9.kVers)
                  }), a.jsx("td", {
                    children: R(K === null || K === void 0 || (_K$contributions9 = K.contributions) === null || _K$contributions9 === void 0 || (_K$contributions9 = _K$contributions9.insurances) === null || _K$contributions9 === void 0 || (_K$contributions9 = _K$contributions9.employee) === null || _K$contributions9 === void 0 ? void 0 : _K$contributions9.kVers)
                  })]
                })]
              }), a.jsxs("tr", {
                className: "alternate",
                children: [a.jsx("th", {
                  children: x("salaryNet")
                }), a.jsxs("td", {
                  children: ["= ", R(X === null || X === void 0 || (_X$contributions0 = X.contributions) === null || _X$contributions0 === void 0 ? void 0 : _X$contributions0.salaryNet)]
                }), a.jsxs("td", {
                  children: ["= ", R(K === null || K === void 0 || (_K$contributions0 = K.contributions) === null || _K$contributions0 === void 0 ? void 0 : _K$contributions0.salaryNet)]
                })]
              }), a.jsxs("tr", {
                children: [a.jsx("th", {
                  children: x("minusNonCashBenefit")
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: ["- ", R(Z === null || Z === void 0 ? void 0 : Z.bikePricePercent)]
                })]
              }), a.jsxs("tr", {
                className: "alternate font-display",
                children: [a.jsx("th", {
                  children: x("payout")
                }), a.jsxs("td", {
                  children: ["= ", R(X === null || X === void 0 || (_X$contributions1 = X.contributions) === null || _X$contributions1 === void 0 ? void 0 : _X$contributions1.salaryNet)]
                }), a.jsxs("td", {
                  children: ["= ", R(K === null || K === void 0 ? void 0 : K.salaryNet)]
                })]
              }), a.jsxs("tr", {
                className: "alternate font-display text-lg",
                children: [a.jsx("th", {
                  children: x("realNet")
                }), a.jsx("td", {}), a.jsxs("td", {
                  children: [R(X === null || X === void 0 || (_X$contributions10 = X.contributions) === null || _X$contributions10 === void 0 ? void 0 : _X$contributions10.salaryNet), " ", a.jsx("br", {}), a.jsxs("span", {
                    className: "whitespace-nowrap",
                    children: ["- ", R(K === null || K === void 0 ? void 0 : K.salaryNet)]
                  }), a.jsx("br", {}), "= ", R(K === null || K === void 0 ? void 0 : K.leasingRate)]
                })]
              })]
            })]
          })
        }), a.jsx("div", {
          className: "text-center py-4 hidden",
          children: a.jsx(Nt, {
            onClick: function onClick() {
              return S(!u);
            },
            type: "link",
            children: u ? a.jsxs(a.Fragment, {
              children: [x("showOnlySummary"), " -"]
            }) : a.jsxs(a.Fragment, {
              children: [x("showExtended"), " +"]
            })
          })
        })]
      });
    },
    jc = function jc(_ref33) {
      var _u$savings, _u$savings2;
      var c = _ref33.bikePrices,
        r = _ref33.withBikes,
        u = _ref33.results;
      var _ref34 = (u === null || u === void 0 ? void 0 : u.inputParams) || {},
        S = _ref34.leasingPeriod;
      return a.jsxs("div", {
        children: [a.jsx("h3", {
          className: "pr-8",
          children: x("comparisonLeasingCostTotal")
        }), a.jsx("div", {
          children: a.jsx("table", {
            className: "[&_td]:text-right",
            children: a.jsxs("tbody", {
              children: [a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("comparisonLeasingCostTotalNormal")
                }), a.jsxs("td", {
                  children: [R(c === null || c === void 0 ? void 0 : c.leasingRate), " × ", S, " ", x("months"), a.jsx("br", {}), "= ", R(c === null || c === void 0 ? void 0 : c.leasingRateNormalTotal)]
                })]
              }), a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("comparsionLeasingCostViaSalary")
                }), a.jsxs("td", {
                  children: [R(r === null || r === void 0 ? void 0 : r.leasingRate), " × ", S, " ", x("months"), a.jsx("br", {}), "= ", R(r === null || r === void 0 ? void 0 : r.leasingTotal)]
                })]
              }), a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("savingsLeasingAbsolute")
                }), a.jsxs("td", {
                  children: [R(c === null || c === void 0 ? void 0 : c.leasingRateNormalTotal), " - ", R(r === null || r === void 0 ? void 0 : r.leasingTotal), a.jsx("br", {}), "= ", R(u === null || u === void 0 || (_u$savings = u.savings) === null || _u$savings === void 0 ? void 0 : _u$savings.savingsLeasingAbsolute)]
                })]
              }), a.jsxs("tr", {
                className: "hightlight",
                children: [a.jsx("th", {
                  children: x("savingsLeasingPercent")
                }), a.jsxs("td", {
                  children: ["1 - (", R(r === null || r === void 0 ? void 0 : r.leasingTotal), " / ", R(c === null || c === void 0 ? void 0 : c.leasingRateNormalTotal), ")", a.jsx("br", {}), "= ", Wn(u === null || u === void 0 || (_u$savings2 = u.savings) === null || _u$savings2 === void 0 ? void 0 : _u$savings2.savingsLeasingPercent)]
                })]
              })]
            })
          })
        })]
      });
    },
    Ec = function Ec(_ref35) {
      var c = _ref35.results,
        r = _ref35.extended,
        _ref35$layout = _ref35.layout,
        u = _ref35$layout === void 0 ? "rows" : _ref35$layout;
      return u === "rows" ? a.jsx(Vc, {
        extended: r,
        results: c
      }) : a.jsx(Pc, {
        extended: r,
        results: c
      });
    },
    Pc = function Pc(_ref36) {
      var _C$insurancePackages;
      var c = _ref36.results,
        r = _ref36.extended;
      var _ref37 = c || {},
        u = _ref37.comparison,
        S = _ref37.inputParams,
        v = _ref37.savings,
        P = _ref37.bikePrices,
        C = _ref37.settings,
        _ref38 = u || {},
        N = _ref38.withBikes;
      var L = "";
      return C !== null && C !== void 0 && (_C$insurancePackages = C.insurancePackages) !== null && _C$insurancePackages !== void 0 && _C$insurancePackages.map(function (_ref39) {
        var B = _ref39.name,
          T = _ref39.title;
        return B === (S === null || S === void 0 ? void 0 : S.insurancePackage) && (L = T || ""), L;
      }), a.jsxs("div", {
        className: "max-w-full",
        children: [a.jsxs("div", {
          className: "shadow-lg rounded-lg my-4 p-4 bg-white",
          children: [r ? a.jsxs(a.Fragment, {
            children: [a.jsx("h2", {
              className: "text-center text-xl mb-2",
              children: x("yourPriceIndividual")
            }), a.jsxs("p", {
              className: "mt-2",
              children: ["(", x("incl"), " ", L, "-", x("package"), a.jsx(He, {
                url: C === null || C === void 0 ? void 0 : C.linkToInsurances,
                children: a.jsx(Hn, {})
              }), ")"]
            })]
          }) : a.jsx("h2", {
            className: "text-center text-xl mb-2",
            children: x("yourPrice")
          }), a.jsxs("div", {
            className: "flex flex-wrap",
            children: [a.jsxs($l, {
              className: "border-l-0",
              children: [a.jsx("div", {
                className: "text-3xl text-[--color-primary]",
                children: R(N === null || N === void 0 ? void 0 : N.leasingRate)
              }), a.jsxs("div", {
                className: "text-md",
                children: ["(", x("instead"), " ", R(P === null || P === void 0 ? void 0 : P.leasingRate), ")"]
              }), a.jsx("div", {
                className: "text-xs py-2 text-[--color-text-light]",
                children: x("monthly")
              }), P && a.jsxs(He, {
                buttonText: x("showDetails"),
                children: [a.jsx("div", {
                  className: "pb-6",
                  children: a.jsx(wc, {
                    bikePrices: P
                  })
                }), a.jsx(ra, {
                  bikePrices: P,
                  withBikes: N
                })]
              })]
            }), a.jsxs($l, {
              children: [a.jsx("div", {
                className: "text-3xl text-[--color-primary]",
                children: Wn(v === null || v === void 0 ? void 0 : v.savingsLeasingPercent)
              }), a.jsxs("div", {
                className: "text-md",
                children: ["(-", R(v === null || v === void 0 ? void 0 : v.savingsLeasingAbsolute), ")"]
              }), a.jsxs("div", {
                className: "text-xs py-2 text-[--color-text-light]",
                children: [x("saving"), " ", x("againstLeasing")]
              }), P && a.jsxs(He, {
                buttonText: x("showDetails"),
                children: [a.jsx("div", {
                  className: "pb-6",
                  children: a.jsx(ra, {
                    bikePrices: P,
                    withBikes: N
                  })
                }), a.jsx(jc, {
                  bikePrices: P,
                  withBikes: N,
                  results: c
                })]
              })]
            }), a.jsxs($l, {
              children: [a.jsx("div", {
                className: "text-3xl text-[--color-primary]",
                children: Wn(v === null || v === void 0 ? void 0 : v.savingsPercent)
              }), a.jsxs("div", {
                className: "text-md",
                children: ["(-", R(v === null || v === void 0 ? void 0 : v.savingsAbsolute), ")"]
              }), a.jsxs("div", {
                className: "text-xs py-2 text-[--color-text-light]",
                children: [x("saving"), " ", x("againstPurchase")]
              })]
            })]
          }), a.jsx("div", {
            className: "text-center pt-4",
            children: (c === null || c === void 0 ? void 0 : c.comparison) && a.jsxs(He, {
              buttonText: x("showCalculation"),
              children: [a.jsx("h3", {
                children: x("comparisonWithToWithoutBike")
              }), a.jsx(ia, {
                results: c
              })]
            })
          })]
        }), a.jsx("div", {
          className: "text-lg text-[--color-text-light]",
          children: x("smallText")
        })]
      });
    },
    Vc = function Vc(_ref40) {
      var _P$insurancePackages, _P$insurancePackages2, _C, _C2, _C3, _v$leasingRateInsuran, _r$withBikes;
      var c = _ref40.results;
      var _ref41 = c || {},
        r = _ref41.comparison,
        u = _ref41.inputParams,
        S = _ref41.savings,
        v = _ref41.bikePrices,
        P = _ref41.settings;
      var C = {};
      P === null || P === void 0 || (_P$insurancePackages = P.insurancePackages) === null || _P$insurancePackages === void 0 || _P$insurancePackages.map(function (T) {
        return (T === null || T === void 0 ? void 0 : T.name) === (u === null || u === void 0 ? void 0 : u.insurancePackage) && (C = T || ""), C;
      });
      var N = P === null || P === void 0 || (_P$insurancePackages2 = P.insurancePackages) === null || _P$insurancePackages2 === void 0 || (_P$insurancePackages2 = _P$insurancePackages2.find(function (T) {
          return T.name === (u === null || u === void 0 ? void 0 : u.insurancePackage);
        })) === null || _P$insurancePackages2 === void 0 ? void 0 : _P$insurancePackages2.title,
        _ref42 = P || {},
        L = _ref42.insuranceCost,
        B = (_C = C) !== null && _C !== void 0 && _C.insuranceInspectionCost ? ", zzgl. ".concat(R(2 * ((_C2 = C) === null || _C2 === void 0 ? void 0 : _C2.insuranceInspectionCost)), " ").concat((_C3 = C) === null || _C3 === void 0 ? void 0 : _C3.insuranceInspectionCostText) : "";
      return a.jsxs("div", {
        className: "max-w-full",
        children: [a.jsxs("div", {
          className: "flex flex-col items-stretch",
          children: [a.jsxs("div", {
            className: "border-l-0 flex text-sm justify-between w-full bg-[--color-result-row-highlight] py-8 px-10 max-md:px-4 pb-4 border-b",
            children: [a.jsx("div", {
              children: x("leasingRate")
            }), a.jsx("div", {
              children: R(v === null || v === void 0 ? void 0 : v.leasingRateWithoutInsurance)
            })]
          }), v && (v === null || v === void 0 || (_v$leasingRateInsuran = v.leasingRateInsurancesPerBike) === null || _v$leasingRateInsuran === void 0 ? void 0 : _v$leasingRateInsuran.map(function (_ref43, Z) {
            var T = _ref43.leasinginsurancePerMonth;
            return a.jsxs("div", {
              className: "border-l-0 text-sm flex justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b",
              children: [a.jsxs("div", {
                className: "flex gap-2 items-center flex-wrap",
                children: [a.jsxs("div", {
                  children: [x("leasinginsurancePerMonth"), " ", x("forBike"), " #", Z + 1]
                }), a.jsx(He, {
                  buttonText: "(".concat(N, "-Paket)"),
                  url: P === null || P === void 0 ? void 0 : P.linkToInsurances,
                  children: a.jsx(Hn, {})
                })]
              }), a.jsx("div", {
                children: R(T)
              })]
            }, Z);
          })), a.jsxs("div", {
            className: "border-l-0 flex text-sm justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b",
            children: [a.jsxs("div", {
              className: "flex gap-2 items-center flex-wrap",
              children: [a.jsx("div", {
                children: x("leasingPriceTotal")
              }), a.jsx(He, {
                buttonText: "(".concat(N, "-Paket)"),
                url: P === null || P === void 0 ? void 0 : P.linkToInsurances,
                children: a.jsx(Hn, {})
              })]
            }), a.jsx("div", {
              className: "text-sm items-end",
              children: a.jsx("div", {
                children: R(v === null || v === void 0 ? void 0 : v.leasingRate)
              })
            })]
          }), a.jsxs("div", {
            className: "border-l-0 text-xl font-display flex justify-between items-center w-full py-8 px-10 max-md:px-4 border-b border-l border-l-4 border-l-[--color-primary]",
            children: [a.jsxs("div", {
              className: "flex gap-2 items-center flex-wrap",
              children: [a.jsx("div", {
                children: x("leasingRateWithBike")
              }), a.jsx(He, {
                buttonText: "(inkl. ".concat(N, "-Paket)"),
                url: P === null || P === void 0 ? void 0 : P.linkToInsurances,
                children: a.jsx(Hn, {})
              })]
            }), a.jsx("div", {
              className: "flex flex-col items-end",
              children: a.jsx("div", {
                children: R(r === null || r === void 0 || (_r$withBikes = r.withBikes) === null || _r$withBikes === void 0 ? void 0 : _r$withBikes.leasingRate)
              })
            })]
          }), a.jsxs("div", {
            className: "border-l-0 text-sm flex justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b",
            children: [a.jsxs("div", {
              className: "",
              children: [x("saving"), " ", x("againstPurchase"), " ", (c === null || c === void 0 ? void 0 : c.comparison) && a.jsx(He, {
                buttonText: x("showDetails"),
                children: a.jsx(kc, {
                  results: c
                })
              })]
            }), a.jsxs("div", {
              className: "flex flex-col items-end",
              children: [a.jsxs("div", {
                children: [R(S === null || S === void 0 ? void 0 : S.savingsAbsolute), "* "]
              }), a.jsx("div", {
                children: Wn(S === null || S === void 0 ? void 0 : S.savingsPercent)
              })]
            })]
          })]
        }), a.jsxs("div", {
          className: "text-lg max-md:text-sm py-10 max-md:py-4 [&_p+p]:mt-3",
          children: [x("smallText"), L && B && a.jsxs("p", {
            className: "mt-4",
            children: ["* ", x("insuranceCostInclusive1"), " ", R(L), " ", x("insuranceCostInclusive2"), " (", x("insuranceCostExplaination"), B, ")", "; ", x("insuranceCostInclusive3")]
          })]
        }), a.jsx(Nc, {
          results: c,
          bikePrices: v,
          inputParams: u
        })]
      });
    },
    Nc = function Nc(_ref44) {
      var c = _ref44.results,
        r = _ref44.bikePrices,
        u = _ref44.inputParams;
      var _ue$useState17 = ue.useState(!1),
        _ue$useState18 = _slicedToArray(_ue$useState17, 2),
        S = _ue$useState18[0],
        v = _ue$useState18[1];
      return ue.useEffect(function () {
        v(!!(c !== null && c !== void 0 && c.comparison));
      }, [c === null || c === void 0 ? void 0 : c.comparison]), a.jsxs(a.Fragment, {
        children: [a.jsxs("div", {
          className: "border-l border-l-4 border-l-[--color-primary] bg-[--color-result-detail-button] p-8 mt-4 uppercase text-xl font-display flex justify-between cursor-pointer",
          onClick: function onClick() {
            return v(!S);
          },
          children: [a.jsx("span", {
            children: x("showExtended")
          }), " ", a.jsx("span", {
            children: S ? "-" : "+"
          })]
        }), a.jsxs("div", {
          className: "flex flex-col gap-4 ".concat(S ? "" : "hidden"),
          children: [(u === null || u === void 0 ? void 0 : u.totalPriceUVP) && a.jsx(la, {
            bikePrices: r,
            inputParams: u
          }), a.jsx(ia, {
            extended: !0,
            results: c
          })]
        })]
      });
    };
  var Bc = /*#__PURE__*/function () {
    function Bc() {
      _classCallCheck(this, Bc);
      this.init();
    }
    return _createClass(Bc, [{
      key: "init",
      value: function init() {
        var r = this;
        r.debugmode = !1, r.prepareDataObject();
      }
    }, {
      key: "prepareDataObject",
      value: function prepareDataObject() {
        var r = this;
        r.AF = 0, r.AJAHR = 0, r.ALTER1 = 0, r.F = 1, r.JFREIB = 0, r.JHINZU = 0, r.JRE4 = 0, r.JRE4ENT = 0, r.JVBEZ = 0, r.KRV = 0, r.KVZ = 1, r.LZZ = 2, r.LZZFREIB = 0, r.LZZHINZU = 0, r.MBV = 0, r.PKPV = 0, r.PKV = 0, r.PVA = 0, r.PVS = 0, r.PVZ = 0, r.R = 0, r.RE4 = 0, r.SONSTB = 0, r.SONSTENT = 0, r.STERBE = 0, r.STKL = 0, r.VBEZ = 0, r.VBEZM = 0, r.VBEZS = 0, r.VBS = 0, r.VJAHR = 0, r.ZKF = 0, r.ZMVB = 0, r.LST1, r.LST2, r.LST3, r.LSTOSO, r.LSTSO = 0, r.BK = 0, r.BKS = 0, r.LSTLZZ = 0, r.SOLZLZZ = 0, r.SOLZS = 0, r.STS = 0, r.VKVLZZ = 0, r.VKVSONST = 0, r.VFRB = 0, r.VFRBS1 = 0, r.VFRBS2 = 0, r.WVFRB = 0, r.WVFRB = 0, r.WVFRBM = 0, r.ALTE = 0, r.ANP = 0, r.ANTEIL1 = 0, r.BMG = 0, r.BBGKVPV = 0, r.BBGRV = 0, r.DIFF = 0, r.EFA = 0, r.FVB = 0, r.FVBSO = 0, r.FVBZ = 0, r.FVBZSO = 0, r.GFB = 0, r.HBALTE = 0, r.HFVB = 0, r.HFVBZ = 0, r.HFVBZSO = 0, r.HOCH = 0, r.J = 0, r.JBMG = 0, r.JLFREIB = 0, r.JLHINZU = 0, r.JW = 0, r.K = 0, r.KFB = 0, r.KVSATZAG = 0, r.KVSATZAN = 0, r.KZTAB = 0, r.LSTJAHR = 0, r.LST1 = 0, r.LST2 = 0, r.LST3 = 0, r.LSTOSO = 0, r.LSTSO = 0, r.MIST = 0, r.PVSATZAG = 0, r.PVSATZAN = 0, r.RVSATZAN = 0, r.RW = 0, r.SAP = 0, r.SOLZFREI = 0, r.SOLZJ = 0, r.SOLZMIN = 0, r.SOLZSBMG = 0, r.SOLZSZVE = 0, r.ST = 0, r.ST1 = 0, r.ST2 = 0, r.STOVMT = 0, r.VBEZB = 0, r.VBEZBSO = 0, r.VERGL = 0, r.VHB = 0, r.VKV = 0, r.VSP = 0, r.VSPN = 0, r.VSP1 = 0, r.VSP2 = 0, r.VSP3 = 0, r.W1STKL5 = 0, r.W2STKL5 = 0, r.W3STKL5 = 0, r.X = 0, r.Y = 0, r.ZRE4 = 0, r.ZRE4J = 0, r.ZRE4VP = 0, r.ZTABFB = 0, r.ZVBEZ = 0, r.ZVBEZJ = 0, r.ZVE = 0, r.ZX = 0, r.ZZX = 0, r.RVERS = 0, r.KVERS = 0, r.PVERS = 0, r.AVERS = 0, r.varTab1 = [], r.varTab1[0] = 0, r.varTab1[1] = .4, r.varTab1[2] = .384, r.varTab1[3] = .368, r.varTab1[4] = .352, r.varTab1[5] = .336, r.varTab1[6] = .32, r.varTab1[7] = .304, r.varTab1[8] = .288, r.varTab1[9] = .272, r.varTab1[10] = .256, r.varTab1[11] = .24, r.varTab1[12] = .224, r.varTab1[13] = .208, r.varTab1[14] = .192, r.varTab1[15] = .176, r.varTab1[16] = .16, r.varTab1[17] = .152, r.varTab1[18] = .144, r.varTab1[19] = .14, r.varTab1[20] = .136, r.varTab1[21] = .132, r.varTab1[22] = .128, r.varTab1[23] = .124, r.varTab1[24] = .12, r.varTab1[25] = .116, r.varTab1[26] = .112, r.varTab1[27] = .108, r.varTab1[28] = .104, r.varTab1[29] = .1, r.varTab1[30] = .096, r.varTab1[31] = .092, r.varTab1[32] = .088, r.varTab1[33] = .084, r.varTab1[34] = .08, r.varTab1[35] = .076, r.varTab1[36] = .072, r.varTab1[37] = .068, r.varTab1[38] = .064, r.varTab1[39] = .06, r.varTab1[40] = .056, r.varTab1[41] = .052, r.varTab1[42] = .048, r.varTab1[43] = .044, r.varTab1[44] = .04, r.varTab1[45] = .036, r.varTab1[46] = .032, r.varTab1[47] = .028, r.varTab1[48] = .024, r.varTab1[49] = .02, r.varTab1[50] = .016, r.varTab1[51] = .012, r.varTab1[52] = .008, r.varTab1[53] = .004, r.varTab1[54] = 0, r.varTab2 = [], r.varTab2[0] = 0, r.varTab2[1] = 3e3, r.varTab2[2] = 2880, r.varTab2[3] = 2760, r.varTab2[4] = 2640, r.varTab2[5] = 2520, r.varTab2[6] = 2400, r.varTab2[7] = 2280, r.varTab2[8] = 2160, r.varTab2[9] = 2040, r.varTab2[10] = 1920, r.varTab2[11] = 1800, r.varTab2[12] = 1680, r.varTab2[13] = 1560, r.varTab2[14] = 1440, r.varTab2[15] = 1320, r.varTab2[16] = 1200, r.varTab2[17] = 1140, r.varTab2[18] = 1080, r.varTab2[19] = 1050, r.varTab2[20] = 1020, r.varTab2[21] = 990, r.varTab2[22] = 960, r.varTab2[23] = 930, r.varTab2[24] = 900, r.varTab2[25] = 870, r.varTab2[26] = 840, r.varTab2[27] = 810, r.varTab2[28] = 780, r.varTab2[29] = 750, r.varTab2[30] = 720, r.varTab2[31] = 690, r.varTab2[32] = 660, r.varTab2[33] = 630, r.varTab2[34] = 600, r.varTab2[35] = 570, r.varTab2[36] = 540, r.varTab2[37] = 510, r.varTab2[38] = 480, r.varTab2[39] = 450, r.varTab2[40] = 420, r.varTab2[41] = 390, r.varTab2[42] = 360, r.varTab2[43] = 330, r.varTab2[44] = 300, r.varTab2[45] = 270, r.varTab2[46] = 240, r.varTab2[47] = 210, r.varTab2[48] = 180, r.varTab2[49] = 150, r.varTab2[50] = 120, r.varTab2[51] = 90, r.varTab2[52] = 60, r.varTab2[53] = 30, r.varTab2[54] = 0, r.varTab3 = [], r.varTab3[0] = 0, r.varTab3[1] = 900, r.varTab3[2] = 864, r.varTab3[3] = 828, r.varTab3[4] = 792, r.varTab3[5] = 756, r.varTab3[6] = 720, r.varTab3[7] = 684, r.varTab3[8] = 648, r.varTab3[9] = 612, r.varTab3[10] = 576, r.varTab3[11] = 540, r.varTab3[12] = 504, r.varTab3[13] = 468, r.varTab3[14] = 432, r.varTab3[15] = 396, r.varTab3[16] = 360, r.varTab3[17] = 342, r.varTab3[18] = 324, r.varTab3[19] = 315, r.varTab3[20] = 306, r.varTab3[21] = 297, r.varTab3[22] = 288, r.varTab3[23] = 279, r.varTab3[24] = 270, r.varTab3[25] = 261, r.varTab3[26] = 252, r.varTab3[27] = 243, r.varTab3[28] = 234, r.varTab3[29] = 225, r.varTab3[30] = 216, r.varTab3[31] = 207, r.varTab3[32] = 198, r.varTab3[33] = 189, r.varTab3[34] = 180, r.varTab3[35] = 171, r.varTab3[36] = 162, r.varTab3[37] = 153, r.varTab3[38] = 144, r.varTab3[39] = 135, r.varTab3[40] = 126, r.varTab3[41] = 117, r.varTab3[42] = 108, r.varTab3[43] = 99, r.varTab3[44] = 90, r.varTab3[45] = 81, r.varTab3[46] = 72, r.varTab3[47] = 63, r.varTab3[48] = 54, r.varTab3[49] = 45, r.varTab3[50] = 36, r.varTab3[51] = 27, r.varTab3[52] = 18, r.varTab3[53] = 9, r.varTab3[54] = 0, r.varTab4 = [], r.varTab4[0] = 0, r.varTab4[1] = .4, r.varTab4[2] = .384, r.varTab4[3] = .368, r.varTab4[4] = .352, r.varTab4[5] = .336, r.varTab4[6] = .32, r.varTab4[7] = .304, r.varTab4[8] = .288, r.varTab4[9] = .272, r.varTab4[10] = .256, r.varTab4[11] = .24, r.varTab4[12] = .224, r.varTab4[13] = .208, r.varTab4[14] = .192, r.varTab4[15] = .176, r.varTab4[16] = .16, r.varTab4[17] = .152, r.varTab4[18] = .144, r.varTab4[19] = .14, r.varTab4[20] = .136, r.varTab4[21] = .132, r.varTab4[22] = .128, r.varTab4[23] = .124, r.varTab4[24] = .12, r.varTab4[25] = .116, r.varTab4[26] = .112, r.varTab4[27] = .108, r.varTab4[28] = .104, r.varTab4[29] = .1, r.varTab4[30] = .096, r.varTab4[31] = .092, r.varTab4[32] = .088, r.varTab4[33] = .084, r.varTab4[34] = .08, r.varTab4[35] = .076, r.varTab4[36] = .072, r.varTab4[37] = .068, r.varTab4[38] = .064, r.varTab4[39] = .06, r.varTab4[40] = .056, r.varTab4[41] = .052, r.varTab4[42] = .048, r.varTab4[43] = .044, r.varTab4[44] = .04, r.varTab4[45] = .036, r.varTab4[46] = .032, r.varTab4[47] = .028, r.varTab4[48] = .024, r.varTab4[49] = .02, r.varTab4[50] = .016, r.varTab4[51] = .012, r.varTab4[52] = .008, r.varTab4[53] = .004, r.varTab4[54] = 0, r.varTab5 = [], r.varTab5[0] = 0, r.varTab5[1] = 1900, r.varTab5[2] = 1824, r.varTab5[3] = 1748, r.varTab5[4] = 1672, r.varTab5[5] = 1596, r.varTab5[6] = 1520, r.varTab5[7] = 1444, r.varTab5[8] = 1368, r.varTab5[9] = 1292, r.varTab5[10] = 1216, r.varTab5[11] = 1140, r.varTab5[12] = 1064, r.varTab5[13] = 988, r.varTab5[14] = 912, r.varTab5[15] = 836, r.varTab5[16] = 760, r.varTab5[17] = 722, r.varTab5[18] = 684, r.varTab5[19] = 665, r.varTab5[20] = 646, r.varTab5[21] = 627, r.varTab5[22] = 608, r.varTab5[23] = 589, r.varTab5[24] = 570, r.varTab5[25] = 551, r.varTab5[26] = 532, r.varTab5[27] = 513, r.varTab5[28] = 494, r.varTab5[29] = 475, r.varTab5[30] = 456, r.varTab5[31] = 437, r.varTab5[32] = 418, r.varTab5[33] = 399, r.varTab5[34] = 380, r.varTab5[35] = 361, r.varTab5[36] = 342, r.varTab5[37] = 323, r.varTab5[38] = 304, r.varTab5[39] = 285, r.varTab5[40] = 266, r.varTab5[41] = 247, r.varTab5[42] = 228, r.varTab5[43] = 209, r.varTab5[44] = 190, r.varTab5[45] = 171, r.varTab5[46] = 152, r.varTab5[47] = 133, r.varTab5[48] = 114, r.varTab5[49] = 95, r.varTab5[50] = 76, r.varTab5[51] = 57, r.varTab5[52] = 38, r.varTab5[53] = 19, r.varTab5[54] = 0;
      }
    }, {
      key: "TAB1",
      value: function TAB1(r) {
        return this.varTab1[r];
      }
    }, {
      key: "TAB2",
      value: function TAB2(r) {
        return this.varTab2[r];
      }
    }, {
      key: "TAB3",
      value: function TAB3(r) {
        return this.varTab3[r];
      }
    }, {
      key: "TAB4",
      value: function TAB4(r) {
        return this.varTab4[r];
      }
    }, {
      key: "TAB5",
      value: function TAB5(r) {
        return this.varTab5[r];
      }
    }, {
      key: "func_LST",
      value: function func_LST() {
        var r = this;
        r.func_MPARA(), r.func_MRE4JL(), r.VBEZBSO = 0, r.func_MRE4(), r.func_MRE4ABZ(), r.func_MBERECH(), r.func_MSONST();
      }
    }, {
      key: "func_MPARA",
      value: function func_MPARA() {
        var r = this;
        r.KRV < 1 && (r.BBGRV = 96600, r.RVSATZAN = .093), r.BBGKVPV = 66150, r.KVSATZAN = r.KVZ / 2 / 100 + .07, r.KVSATZAG = .0825, r.PVS === 1 ? (r.PVSATZAN = .023, r.PVSATZAG = .013) : (r.PVSATZAN = .018, r.PVSATZAG = .018), r.PVZ === 1 ? r.PVSATZAN = r.PVSATZAN + .006 : r.PVSATZAN = r.PVSATZAN - r.PVA * .0025, r.W1STKL5 = 13432, r.W2STKL5 = 33380, r.W3STKL5 = 222260, r.GFB = 11784, r.SOLZFREI = 18130;
      }
    }, {
      key: "func_MRE4JL",
      value: function func_MRE4JL() {
        var r = this,
          u = 1;
        r.LZZ == 1 ? u = 1 : r.LZZ == 2 ? u = 12 : r.LZZ == 3 ? u = 51.42857142857143 : u = 360, r.ZRE4J = r.RE4 * u / 100, r.ZVBEZJ = r.VBEZ * u / 100, r.JLFREIB = r.LZZFREIB * u / 100, r.JLHINZU = r.LZZHINZU * u / 100, r.AF == 0 && (r.F = 1);
      }
    }, {
      key: "func_MRE4",
      value: function func_MRE4() {
        var r = this;
        r.ZVBEZJ == 0 ? (r.FVBZ = 0, r.FVB = 0, r.FVBZSO = 0, r.FVBSO = 0) : (r.VJAHR < 2006 ? r.J = 1 : r.VJAHR < 2058 ? r.J = r.VJAHR - 2004 : r.J = 54, r.LZZ == 1 ? (r.VBEZB = r.VBEZM * r.ZMVB + r.VBEZS, r.HFVB = Math.ceil(r.TAB2(r.J) / 12 * r.ZMVB), r.FVBZ = Math.ceil(r.TAB3(r.J) / 12 * r.ZMVB)) : (r.VBEZB = r.VBEZM * 12 + r.VBEZS, r.HFVB = Math.ceil(r.TAB2(r.J)), r.FVBZ = Math.ceil(r.TAB3(r.J))), r.FVB = r.decimalCeil(r.VBEZB * r.TAB1(r.J) / 100, 2), r.FVB > r.HFVB && (r.FVB = r.HFVB), r.FVB > r.ZVBEZJ && (r.FVB = r.ZVBEZJ), r.FVBSO = r.decimalCeil(r.FVB + r.VBEZBSO * r.TAB1(r.J) / 100, 2), r.FVBSO > r.TAB2(r.J) && (r.FVBSO = r.TAB2(r.J)), r.HFVBZSO = (r.VBEZB + r.VBEZBSO) / 100 - r.FVBSO, r.FVBZSO = Math.ceil(r.FVBZ + r.VBEZBSO / 100), r.FVBZSO > r.HFVBZSO && (r.FVBZSO = Math.ceil(r.HFVBZSO)), r.FVBZSO > r.TAB3(r.J) && (r.FVBZSO = r.TAB3(r.J)), r.HFVBZ = r.VBEZB / 100 - r.FVB, r.FVBZ > r.HFVBZ && (r.FVBZ = Math.ceil(r.HFVBZ))), r.func_MRE4ALTE();
      }
    }, {
      key: "func_MRE4ALTE",
      value: function func_MRE4ALTE() {
        var r = this;
        r.ALTER1 == 0 ? r.ALTE = 0 : (r.AJAHR < 2006 ? r.K = 1 : r.AJAHR < 2058 ? r.K = r.AJAHR - 2004 : r.K = 54, r.BMG = r.ZRE4J - r.ZVBEZJ, r.ALTE = Math.ceil(r.BMG * r.TAB4(r.K)), r.HBALTE = r.TAB5(r.K), r.ALTE > r.HBALTE && (r.ALTE = r.HBALTE));
      }
    }, {
      key: "func_MRE4ABZ",
      value: function func_MRE4ABZ() {
        var r = this;
        r.ZRE4 = r.ZRE4J - r.FVB - r.ALTE - r.JLFREIB + r.JLHINZU, r.ZRE4 < 0 && (r.ZRE4 = 0), r.ZRE4VP = r.ZRE4J, r.ZVBEZ = r.ZVBEZJ - r.FVB, r.ZVBEZ < 0 && (r.ZVBEZ = 0);
      }
    }, {
      key: "func_MBERECH",
      value: function func_MBERECH() {
        var r = this;
        r.func_MZTABFB(), r.VFRB = (r.ANP + r.FVB + r.FVBZ) * 100, r.func_MLSTJAHR(), r.WVFRB = (r.ZVE - r.GFB) * 100, r.WVFRB < 0 && (r.WVFRB = 0), r.LSTJAHR = r.ST * r.F, r.func_UPLSTLZZ(), r.func_UPVKVLZZ(), r.ZKF > 0 ? (r.ZTABFB = r.ZTABFB + r.KFB, r.func_MRE4ABZ(), r.func_MLSTJAHR(), r.JBMG = r.ST * r.F) : r.JBMG = r.LSTJAHR, r.func_MSOLZ();
      }
    }, {
      key: "func_MZTABFB",
      value: function func_MZTABFB() {
        var r = this;
        r.ANP = 0, r.ZVBEZ >= 0 && r.ZVBEZ < r.FVBZ && (r.FVBZ = r.ZVBEZ), r.STKL < 6 ? r.ZVBEZ > 0 && (r.ZVBEZ - r.FVBZ < 102 ? r.ANP = Math.ceil(r.ZVBEZ - r.FVBZ) : r.ANP = 102) : (r.FVBZ = 0, r.FVBZSO = 0), r.STKL < 6 && r.ZRE4 > r.ZVBEZ && (r.ZRE4 - r.ZVBEZ < 1230 ? r.ANP = Math.ceil(r.ANP + r.ZRE4 - r.ZVBEZ) : r.ANP = r.ANP + 1230), r.KZTAB = 1, r.STKL == 1 ? (r.SAP = 36, r.KFB = r.ZKF * 9540) : r.STKL == 2 ? (r.EFA = 4260, r.SAP = 36, r.KFB = r.ZKF * 9540) : r.STKL == 3 ? (r.KZTAB = 2, r.SAP = 36, r.KFB = r.ZKF * 9540) : r.STKL == 4 ? (r.SAP = 36, r.KFB = r.ZKF * 4770) : (r.STKL == 5 && (r.SAP = 36), r.KFB = 0), r.ZTABFB = r.EFA + r.ANP + r.SAP + r.FVBZ;
      }
    }, {
      key: "func_MLSTJAHR",
      value: function func_MLSTJAHR() {
        var r = this;
        r.func_UPEVP(), r.ZVE = r.ZRE4 - r.ZTABFB - r.VSP, r.func_UPMLST();
      }
    }, {
      key: "func_UPVKVLZZ",
      value: function func_UPVKVLZZ() {
        var r = this;
        r.func_UPVKV(), r.JW = r.VKV, r.func_UPANTEIL(), r.VKVLZZ = r.ANTEIL1;
      }
    }, {
      key: "func_UPVKV",
      value: function func_UPVKV() {
        var r = this;
        r.PKV > 0 ? r.VSP2 > r.VSP3 ? r.VKV = r.VSP2 * 100 : r.VKV = r.VSP3 * 100 : r.VKV = 0;
      }
    }, {
      key: "func_UPLSTLZZ",
      value: function func_UPLSTLZZ() {
        var r = this;
        r.JW = r.LSTJAHR * 100, r.func_UPANTEIL(), r.LSTLZZ = r.ANTEIL1;
      }
    }, {
      key: "func_UPMLST",
      value: function func_UPMLST() {
        var r = this;
        r.ZVE < 1 ? (r.ZVE = 0, r.X = 0) : r.X = Math.floor(r.ZVE / r.KZTAB), r.STKL < 5 ? r.func_UPTAB24() : r.func_MST5_6();
      }
    }, {
      key: "func_UPEVP",
      value: function func_UPEVP() {
        var r = this;
        r.KRV == 1 ? r.VSP1 = 0 : (r.ZRE4VP > r.BBGRV && (r.ZRE4VP = r.BBGRV), r.VSP1 = r.RVSATZAN * r.ZRE4VP), r.VSP2 = .12 * r.ZRE4VP, r.STKL == 3 ? r.VHB = 3e3 : r.VHB = 1900, r.VSP2 > r.VHB && (r.VSP2 = r.VHB), r.VSPN = Math.ceil(r.VSP1 + r.VSP2), r.func_MVSP(), r.VSPN > r.VSP && (r.VSP = r.VSPN), r.AVERS = r.ZRE4VP * .015;
      }
    }, {
      key: "func_MVSP",
      value: function func_MVSP() {
        var r = this;
        r.ZRE4VP > r.BBGKVPV && (r.ZRE4VP = r.BBGKVPV), r.PKV > 0 ? (r.STKL == 6 ? r.VSP3 = 0 : (r.VSP3 = r.PKPV * 12 / 100, r.PKV == 2 && (r.VSP3 = r.VSP3 - r.ZRE4VP * (r.KVSATZAG + r.PVSATZAG))), r.KVERS = 0, r.PVERS = 0) : r.VSP3 = r.ZRE4VP * (r.KVSATZAN + r.PVSATZAN), r.VSP = Math.ceil(r.VSP3 + r.VSP1);
      }
    }, {
      key: "func_MST5_6",
      value: function func_MST5_6() {
        var r = this;
        r.ZZX = r.X, r.ZZX > r.W2STKL5 ? (r.ZX = r.W2STKL5, r.func_UP5_6(), r.ZZX > r.W3STKL5 ? (r.ST = Math.floor(r.ST + (r.W3STKL5 - r.W2STKL5) * .42), r.ST = Math.floor(r.ST + (r.ZZX - r.W3STKL5) * .45)) : r.ST = Math.floor(r.ST + (r.ZZX - r.W2STKL5) * .42)) : (r.ZX = r.ZZX, r.func_UP5_6(), r.ZZX > r.W1STKL5 && (r.VERGL = r.ST, r.ZX = r.W1STKL5, r.func_UP5_6(), r.HOCH = Math.floor(r.ST + (r.ZZX - r.W1STKL5) * .42), r.HOCH < r.VERGL ? r.ST = r.HOCH : r.ST = r.VERGL));
      }
    }, {
      key: "func_UP5_6",
      value: function func_UP5_6() {
        var r = this;
        r.X = r.ZX * 1.25, r.func_UPTAB24(), r.ST1 = r.ST, r.X = r.ZX * .75, r.func_UPTAB24(), r.ST2 = r.ST, r.DIFF = (r.ST1 - r.ST2) * 2, r.MIST = Math.floor(r.ZX * .14), r.MIST > r.DIFF ? r.ST = r.MIST : r.ST = r.DIFF;
      }
    }, {
      key: "func_MSOLZ",
      value: function func_MSOLZ() {
        var r = this;
        r.SOLZFREI = r.SOLZFREI * r.KZTAB, r.JBMG > r.SOLZFREI ? (r.SOLZJ = r.decimalFloor(r.JBMG * 5.5 / 100, 2), r.SOLZMIN = (r.JBMG - r.SOLZFREI) * 11.9 / 100, r.SOLZMIN < r.SOLZJ && (r.SOLZJ = r.SOLZMIN), r.JW = r.SOLZJ * 100, r.func_UPANTEIL(), r.SOLZLZZ = r.ANTEIL1) : r.SOLZLZZ = 0, r.R > 0 ? (r.JW = r.JBMG * 100, r.func_UPANTEIL(), r.BK = r.ANTEIL1) : r.BK = 0;
      }
    }, {
      key: "func_UPANTEIL",
      value: function func_UPANTEIL() {
        var r = this;
        r.LZZ == 1 ? r.ANTEIL1 = r.JW : r.LZZ == 2 ? r.ANTEIL1 = r.decimalFloor(r.JW / 12, 0) : r.LZZ == 3 ? r.ANTEIL1 = r.decimalFloor(r.JW * 7 / 360, 0) : r.ANTEIL1 = r.decimalFloor(r.JW / 360, 0);
      }
    }, {
      key: "func_MSONST",
      value: function func_MSONST() {
        var r = this;
        r.LZZ = 1, r.ZMVB == 0 && (r.ZMVB = 12), r.SONSTB == 0 && r.MBV == 0 ? (r.VKVSONST = 0, r.LSTSO = 0, r.STS = 0, r.SOLZS = 0, r.BKS = 0) : (r.func_MOSONST(), r.func_UPVKV(), r.VKVSONST = r.VKV, r.ZRE4J = (r.JRE4 + r.SONSTB) / 100, r.ZVBEZJ = (r.JVBEZ + r.VBS) / 100, r.VBEZBSO = r.STERBE, r.func_MRE4SONST(), r.func_MLSTJAHR(), r.WVFRBM = (r.ZVE - r.GFB) * 100, r.WVFRBM < 0 && (r.WVFRBM = 0), r.func_UPVKV(), r.VKVSONST = r.VKV - r.VKVSONST, r.LSTSO = r.ST * 100, r.STS = Math.abs(Math.floor((r.LSTSO - r.LSTOSO) * r.F)), r.func_STSMIN());
      }
    }, {
      key: "func_STSMIN",
      value: function func_STSMIN() {
        var r = this;
        r.STS < 0 ? (r.MBV != 0 && (r.LSTLZZ = r.LSTLZZ + r.STS, r.LSTLZZ < 0 && (r.LSTLZZ = 0), r.SOLZLZZ = r.decimalFloor(r.SOLZLZZ + r.STS * 5.5 / 100, 2), r.SOLZLZZ < 0 && (r.SOLZLZZ = 0), r.BK = r.BK + r.STS, r.BK < 0 && (r.BK = 0)), r.STS = 0, r.SOLZS = 0) : r.func_MSOLZSTS(), r.R > 0 ? r.BKS = r.STS : r.BKS = 0;
      }
    }, {
      key: "func_MSOLZSTS",
      value: function func_MSOLZSTS() {
        var r = this;
        r.ZKF > 0 ? r.SOLZSZVE = r.ZVE - r.KFB : r.SOLZSZVE = r.ZVE, r.SOLZSZVE < 1 ? (r.SOLZSZVE = 0, r.X = 0) : r.X = Math.floor(r.SOLZSZVE / r.KZTAB), r.STKL < 5 ? r.func_UPTAB24() : r.func_MST5_6(), r.SOLZSBMG = Math.floor(r.ST * r.F), r.SOLZSBMG > r.SOLZFREI ? r.SOLZS = r.decimalFloor(r.STS * 5.5 / 100, 2) : r.SOLZS = 0;
      }
    }, {
      key: "func_MOSONST",
      value: function func_MOSONST() {
        var r = this;
        r.ZRE4J = r.JRE4 / 100, r.ZVBEZJ = r.JVBEZ / 100, r.JLFREIB = r.JFREIB / 100, r.JLHINZU = r.JHINZU / 100, r.func_MRE4(), r.func_MRE4ABZ(), r.ZRE4VP = r.ZRE4VP - r.JRE4ENT / 100, r.func_MZTABFB(), r.VFRBS1 = (r.ANP + r.FVB + r.FVBZ) * 100, r.func_MLSTJAHR(), r.WVFRBO = (r.ZVE - r.GFB) * 100, r.WVFRBO < 0 && (r.WVFRBO = 0), r.LSTOSO = r.ST * 100;
      }
    }, {
      key: "func_MRE4SONST",
      value: function func_MRE4SONST() {
        var r = this;
        r.func_MRE4(), r.FVB = r.FVBSO, r.func_MRE4ABZ(), r.ZRE4VP = r.ZRE4VP + r.MBV / 100 - r.JRE4ENT / 100 - r.SONSTENT / 100, r.FVBZ = r.FVBZSO, r.func_MZTABFB(), r.VFRBS2 = (r.ANP + r.FVB + r.FVBZ) * 100 - r.VFRBS1;
      }
    }, {
      key: "func_UPTAB24",
      value: function func_UPTAB24() {
        var r = this;
        r.X < r.GFB + 1 ? r.ST = 0 : r.X < 17006 ? (r.Y = (r.X - r.GFB) / 1e4, r.RW = r.Y * 954.8, r.RW = r.RW + 1400, r.ST = Math.floor(r.RW * r.Y)) : r.X < 66761 ? (r.Y = (r.X - 17005) / 1e4, r.RW = r.Y * 181.19, r.RW = r.RW + 2397, r.RW = r.RW * r.Y, r.ST = Math.floor(r.RW + 991.21)) : r.X < 277826 ? r.ST = Math.floor(r.X * .42 - 10636.31) : r.ST = Math.floor(r.X * .45 - 18971.06), r.ST = r.ST * r.KZTAB;
      }
    }, {
      key: "decimalRound",
      value: function decimalRound(r, u) {
        var S = Math.pow(10, u);
        return Math.round(r * S) / S;
      }
    }, {
      key: "decimalCeil",
      value: function decimalCeil(r, u) {
        var S = Math.pow(10, u);
        return Math.ceil(r * S) / S;
      }
    }, {
      key: "decimalFloor",
      value: function decimalFloor(r, u) {
        var S = Math.pow(10, u);
        return Math.floor(r * S) / S;
      }
    }, {
      key: "initParams",
      value: function initParams() {
        var r = this;
        r.AF = 0, r.AJAHR = 0, r.ALTER1 = 0, r.ENTSCH = 0, r.F = 1, r.JFREIB = 0, r.JHINZU = 0, r.JRE4 = 0, r.JRE4ENT = 0, r.JVBEZ = 0, r.KRV = 0, r.LZZ = 2, r.LZZFREIB = 0, r.LZZHINZU = 0, r.PKPV = 0, r.PKV = 0, r.PVS = 0, r.PVZ = 0, r.R = 0, r.RE4 = 0, r.SONSTB = 0, r.SONSTENT = 0, r.STERBE = 0, r.STKL = 0, r.VBEZ = 0, r.VBEZM = 0, r.VBEZS = 0, r.VBS = 0, r.VJAHR = 0, r.VKAPA = 0, r.VMT = 0, r.ZKF = 0, r.ZMVB = 0, r.BK = 0, r.BKS = 0, r.BKV = 0, r.LSTLZZ = 0, r.SOLZLZZ = 0, r.SOLZS = 0, r.SOLZV = 0, r.STS = 0, r.STV = 0, r.VKVLZZ = 0, r.VKVSONST = 0, r.ALTE = 0, r.ANP = 0, r.ANTEIL1 = 0, r.BMG = 0, r.DIFF = 0, r.EFA = 0, r.FVB = 0, r.FVBSO = 0, r.FVBZ = 0, r.FVBZSO = 0, r.HBALTE = 0, r.HFVB = 0, r.HFVBZ = 0, r.HFVBZSO = 0, r.HOCH = 0, r.J = 0, r.JBMG = 0, r.JLFREIB = 0, r.JLHINZU = 0, r.JW = 0, r.K = 0, r.KENNVMT = 0, r.KFB = 0, r.KVSATZAG = 0, r.KVSATZAN = 0, r.KZTAB = 0, r.LSTJAHR = 0, r.LST1, r.LST2, r.LST3, r.LSTOSO, r.LSTSO = 0, r.MIST = 0, r.PVSATZAG = 0, r.PVSATZAN = 0, r.RW = 0, r.SAP = 0, r.SOLZFREI = 0, r.SOLZJ = 0, r.SOLZMIN = 0, r.ST = 0, r.ST1 = 0, r.ST2 = 0, r.STOVMT = 0, r.VBEZB = 0, r.VBEZBSO = 0, r.VERGL = 0, r.VHB = 0, r.VKV = 0, r.VSP = 0, r.VSPN = 0, r.VSP1 = 0, r.VSP2 = 0, r.VSP3 = 0, r.W1STKL5 = 0, r.W2STKL5 = 0, r.W3STKL5 = 0, r.X = 0, r.Y = 0, r.ZRE4 = 0, r.ZRE4J = 0, r.ZRE4VP = 0, r.ZTABFB = 0, r.ZVBEZ = 0, r.ZVBEZJ = 0, r.ZVE = 0, r.ZX = 0, r.ZZX = 0;
      }
    }]);
  }();
  function Cc(_ref45) {
    var c = _ref45.inputParams,
      r = _ref45.taxBasis;
    var u = new Bc();
    u.initParams(), u.STKL = c.taxClass, u.LZZ = 2, u.ZKF = c.hasChildren ? c.childAllowances : 0, u.AF = u.STKL === 5 ? 1 : 0, u.F = u.STKL === 5 ? c === null || c === void 0 ? void 0 : c.taxFactor : 1, u.R = c.churchTax === !0 ? 1 : 0, u.RE4 = r * 100, u.STKL > 4 && (u.STKL -= 1), u.PVZ = !c.hasChildren || c.childAllowances === 0 ? 1 : 0, u.KVZ = c.healthInsuranceFactor, u.PKPV = 0;
    var v = new Date().getFullYear() - 24;
    u.AJAHR = v + 65, u.ALTER1 = 0, c.workTypeOfficial ? (u.PKV = 1, u.KRV = 2) : (u.PKV = ((c === null || c === void 0 ? void 0 : c.healthInsurance) || 1) - 1, u.KRV = c === null || c === void 0 ? void 0 : c.pensionInsurance), u.PVS = c.region === "SACHSEN" ? 1 : 0, u.func_LST();
    var P = Math.floor(u.LSTLZZ) / 100,
      C = Math.floor(u.SOLZLZZ) / 100,
      N = c.region === "BW" || c.region === "BAYERN" ? .08 : .09,
      L = c.churchTax === !0 ? Math.floor(u.BK * N) / 100 : 0,
      T = {
        total: P + C + L,
        income: P,
        soli: C,
        church: L,
        b: u
      };
    return console.log({
      b: u
    }), T;
  }
  var Lc = function Lc(_ref46) {
    var c = _ref46.healthInsuranceFactor,
      _ref46$childrenCount = _ref46.childrenCount,
      r = _ref46$childrenCount === void 0 ? 0 : _ref46$childrenCount,
      u = _ref46.taxBasis,
      S = _ref46.b;
    var L = .018,
      B = .042 - L,
      T = 0,
      Z = 0;
    r > 0 && (T = .006, r > 1 && (Z = r - 1, T += .0025 * Math.min(Z, 5))), T = Math.round(T * 1e4) / 1e4, B -= T, S.PVS == 1 && (B += 0), S.PVS == 1 && (L -= 0);
    var Y = (.146 + (c || 1) / 100) / 2,
      J = .186 / 2,
      oe = 5512.5,
      ce = 8050,
      le = 8050;
    var Ee = 0,
      ge = 0,
      pe = 0,
      Q = 0,
      ne = 0;
    if (S.PKV < 1) {
      var fe = u > oe ? oe : u;
      Ee = fe * B, ge = fe * L, pe = fe * Y;
    } else pe = S.PKPV / 100;
    if (S.KRV == 2) Q = 0;else {
      var _fe = u > ce ? ce : u;
      S.KRV == 1 && (_fe = u > le ? le : u), Q = _fe * J, ne = _fe * .013;
    }
    var Ge = {
        total: ne + Q + pe + Ee,
        aVers: ne,
        rVers: Q,
        kVers: pe,
        pVers: Ee
      },
      mt = {
        total: ne + Q + ge + pe,
        aVers: ne,
        rVers: Q,
        pVers: ge,
        kVers: pe
      };
    return {
      employee: Ge,
      employer: mt
    };
  };
  function sa(_ref47) {
    var c = _ref47.taxBasis,
      r = _ref47.inputParams;
    var u = Cc({
        inputParams: r,
        taxBasis: c
      }),
      S = Lc({
        healthInsuranceFactor: r === null || r === void 0 ? void 0 : r.healthInsuranceFactor,
        childrenCount: r !== null && r !== void 0 && r.hasChildren ? r === null || r === void 0 ? void 0 : r.childrenCount : 0,
        taxBasis: c,
        b: u.b
      }),
      v = u.total + S.employee.total;
    return {
      salaryNet: c - v,
      taxes: u,
      insurances: S,
      contributionsTotal: v
    };
  }
  function Rc(_ref48) {
    var c = _ref48.bikePrices,
      r = _ref48.totalCost,
      u = _ref48.leasingRate,
      S = _ref48.leasingPriceNormalTotal,
      v = _ref48.leasingTotal;
    var P = c.bikesPlusRepair - r,
      C = Math.round((1 - r / c.bikesPlusRepair) * 100 * 100) / Math.pow(10, 2),
      N = (c.leasingRate - u) / c.leasingRate * 100,
      L = S - v;
    return {
      savingsPercent: C,
      savingsAbsolute: P,
      savingsLeasingPercent: N,
      savingsLeasingAbsolute: L
    };
  }
  function Zc(_ref49) {
    var c = _ref49.inputParams,
      r = _ref49.settings;
    if (!(c !== null && c !== void 0 && c.totalPriceUVP)) return null;
    var u = (c === null || c === void 0 ? void 0 : c.totalPriceUVP) / 4,
      S = Math.floor(u / 100),
      v = Math.floor((c === null || c === void 0 ? void 0 : c.totalPriceUVP) / 100);
    return {
      bikesPriceFractionUvp: r !== null && r !== void 0 && r.useFullBikeUvpPrice ? v : S,
      bikePricePercent: S,
      bikePriceQuarterUvp: u,
      bikePricePercentFull: v
    };
  }
  function Jl(_ref50) {
    var _r$insurancePackages;
    var c = _ref50.inputParams,
      r = _ref50.settings;
    return (r === null || r === void 0 || (_r$insurancePackages = r.insurancePackages) === null || _r$insurancePackages === void 0 ? void 0 : _r$insurancePackages.filter(function (_ref51) {
      var u = _ref51.name;
      return u === (c === null || c === void 0 ? void 0 : c.insurancePackage);
    })[0]) || {};
  }
  function Fc(_ref52) {
    var c = _ref52.settings,
      r = _ref52.inputParams,
      u = _ref52.bikePrice,
      S = _ref52.bikePriceWithLeasingInsurance;
    var v,
      P = Wl(u);
    var _Jl = Jl({
        inputParams: r,
        settings: c
      }),
      C = _Jl.leasingFactors,
      N = C === null || C === void 0 ? void 0 : C[C.length - 1],
      L = C === null || C === void 0 ? void 0 : C[0];
    if (v = (L === null || L === void 0 ? void 0 : L.value) || 3.22, c !== null && c !== void 0 && c.includeInsuranceForFactorComparison && (P = Wl(S)), P > ((L === null || L === void 0 ? void 0 : L.upto) || 1 / 0) && C !== null && C !== void 0 && C.length) for (var T = (C === null || C === void 0 ? void 0 : C.length) - 1; T >= 0; T--) {
      var Z = C === null || C === void 0 ? void 0 : C[T];
      (Z === null || Z === void 0 ? void 0 : Z.upto) && P <= (Z === null || Z === void 0 ? void 0 : Z.upto) && (v = Z === null || Z === void 0 ? void 0 : Z.value);
    }
    return N !== null && N !== void 0 && N.upto && P > (N === null || N === void 0 ? void 0 : N.upto) && (v = N === null || N === void 0 ? void 0 : N.value), {
      leasingRateFactor: v || 3.22
    };
  }
  function _c(_ref53) {
    var c = _ref53.inputParams,
      r = _ref53.settings,
      u = _ref53.leasingRateInsurancePerMonth,
      S = _ref53.leasingRateInsurancePerMonthNet,
      v = _ref53.bikePrice,
      P = _ref53.bikePriceWithLeasingInsurance;
    var _Fc = Fc({
        settings: r,
        inputParams: c,
        bikePrice: v,
        bikePriceWithLeasingInsurance: P
      }),
      C = _Fc.leasingRateFactor,
      N = v * (C / 100),
      L = Wl(N),
      B = c.employerTaxDeduction ? L : N,
      T = B + u,
      Z = S + L;
    return {
      leasingRate: c.employerTaxDeduction ? Z : T,
      leasingRateWithoutInsurance: B,
      leasingRateFactor: C
    };
  }
  function Ic(_ref54) {
    var c = _ref54.inputParams,
      r = _ref54.settings;
    var u = 0,
      S = 0,
      v = 0;
    if (!(c !== null && c !== void 0 && c.bikeRows)) return null;
    var P = c === null || c === void 0 ? void 0 : c.bikeRows.map(function (_ref55) {
        var B = _ref55.price;
        var _Ac = Ac({
            inputParams: c,
            settings: r,
            bikePrice: B
          }),
          T = _Ac.leasingInsurance,
          Z = _Ac.leasingInsuranceNet;
        u += T, S += Z, v += B + T;
        var z = T / ((c === null || c === void 0 ? void 0 : c.leasingPeriod) || 36),
          K = Z / ((c === null || c === void 0 ? void 0 : c.leasingPeriod) || 36);
        return {
          leasinginsurancePerMonth: c !== null && c !== void 0 && c.employerTaxDeduction ? K : z,
          leasingInsurance: T,
          leasingInsuranceNet: Z,
          bikeWithInsurance: B + T
        };
      }),
      C = u / (c.leasingPeriod || 36),
      N = S / (c.leasingPeriod || 36);
    return {
      leasingRateInsuranceTotal: u,
      leasingRateInsuranceTotalNet: S,
      leasingRateInsurancePerMonth: C,
      leasingRateInsurancePerMonthNet: N,
      bikePriceWithLeasingInsurance: v,
      leasingRateInsurancesPerBike: P
    };
  }
  function Ac(_ref56) {
    var c = _ref56.bikePrice,
      r = _ref56.settings,
      u = _ref56.inputParams;
    var _Jl2 = Jl({
        inputParams: u,
        settings: r
      }),
      S = _Jl2.leasingInsurancePrices,
      v = S === null || S === void 0 ? void 0 : S[S.length - 1],
      P = S === null || S === void 0 ? void 0 : S[0];
    var C = 0;
    if (P !== null && P !== void 0 && P.upto) {
      if (C = (P === null || P === void 0 ? void 0 : P.value) || 0, c > (P === null || P === void 0 ? void 0 : P.upto) && S !== null && S !== void 0 && S.length) for (var T = (S === null || S === void 0 ? void 0 : S.length) - 1; T >= 0; T--) {
        var Z = S === null || S === void 0 ? void 0 : S[T];
        (Z === null || Z === void 0 ? void 0 : Z.upto) && c <= (Z === null || Z === void 0 ? void 0 : Z.upto) && (C = (Z === null || Z === void 0 ? void 0 : Z.value) || 0);
      }
      (v === null || v === void 0 ? void 0 : v.upto) && c > (v === null || v === void 0 ? void 0 : v.upto) && (C = v.value || 0);
    }
    var N = 3.33 * 36,
      L = C - N;
    return {
      leasingInsurance: r !== null && r !== void 0 && r.noTaxOnInsurance ? L + na(N) : na(C),
      leasingInsuranceNet: C
    };
  }
  function bc(_ref57) {
    var _Jl3;
    var c = _ref57.inputParams,
      r = _ref57.settings;
    if (!(c !== null && c !== void 0 && c.totalPriceUVP)) return null;
    var u = (c === null || c === void 0 ? void 0 : c.totalPrice) || 0,
      S = Ic({
        inputParams: c,
        settings: r
      });
    if (!S) return null;
    var v = S.leasingRateInsurancePerMonth,
      P = S.leasingRateInsurancePerMonthNet,
      C = S.leasingRateInsuranceTotal,
      N = S.leasingRateInsuranceTotalNet,
      L = S.bikePriceWithLeasingInsurance,
      B = S.leasingRateInsurancesPerBike,
      _c2 = _c({
        inputParams: c,
        settings: r,
        bikePrice: u,
        leasingRateInsurancePerMonth: v,
        leasingRateInsurancePerMonthNet: P,
        bikePriceWithLeasingInsurance: L
      }),
      T = _c2.leasingRate,
      Z = _c2.leasingRateFactor,
      z = _c2.leasingRateWithoutInsurance,
      K = Zc({
        inputParams: c,
        settings: r
      });
    if (!K) return null;
    var X = K.bikePricePercent,
      Y = K.bikePriceQuarterUvp,
      G = K.bikePricePercentFull,
      J = K.bikesPriceFractionUvp,
      oe = ((r === null || r === void 0 ? void 0 : r.insuranceCost) || 400) * ((c === null || c === void 0 ? void 0 : c.bikeCount) || 1),
      le = ((_Jl3 = Jl({
        inputParams: c,
        settings: r
      })) === null || _Jl3 === void 0 ? void 0 : _Jl3.insuranceInspectionCost) || 0,
      Ee = ((c === null || c === void 0 ? void 0 : c.totalPrice) || 0) + oe + le * 2,
      ge = r !== null && r !== void 0 && r.subtractTaxAfterEmployerBenefit ? Math.round(J * 19) / 119 : 0,
      pe = T * ((c === null || c === void 0 ? void 0 : c.leasingPeriod) || 36);
    return {
      bikePrice: u,
      bikePriceVatToSubtract: ge,
      bikePricePercent: X,
      bikePriceQuarterUvp: Y,
      bikePricePercentFull: G,
      bikesPriceFractionUvp: J,
      leasingRate: T,
      leasingRateWithoutInsurance: z,
      leasingRateFactor: Z,
      bikesPlusRepair: Ee,
      leasingRateNormalTotal: pe,
      leasingRateInsurancePerMonth: v,
      leasingRateInsurancePerMonthNet: P,
      bikePriceWithLeasingInsurance: L,
      leasingRateInsuranceTotal: C,
      leasingRateInsuranceTotalNet: N,
      leasingRateInsurancesPerBike: B
    };
  }
  function aa(_ref58) {
    var _r$benefitAdditional;
    var c = _ref58.settings,
      r = _ref58.inputParams,
      u = _ref58.bikePrices;
    var S = c === null || c === void 0 ? void 0 : c.benefitType;
    var v = 0;
    var P = Math.min((c === null || c === void 0 ? void 0 : c.benefitBikeCount) || 1, (r === null || r === void 0 ? void 0 : r.bikeCount) || 1);
    if (S === 0) v = 0;else if (S === 1) {
      var B = Mc({
        settings: c,
        insurancePackage: (r === null || r === void 0 ? void 0 : r.insurancePackage) || ""
      });
      v = c !== null && c !== void 0 && c.benefitMultiply ? P * B : B;
    } else if (S === 2) v = r !== null && r !== void 0 && r.benefit ? c !== null && c !== void 0 && c.benefitMultiply ? (r === null || r === void 0 ? void 0 : r.benefit) * P : r === null || r === void 0 ? void 0 : r.benefit : 0;else if (S === 3) {
      var _B = r !== null && r !== void 0 && r.benefit ? (r === null || r === void 0 ? void 0 : r.benefit) / 100 : 0;
      v = u ? Math.round(u.leasingRate * _B * 100) / 100 : 0;
    } else if (S === 4) {
      var _B2 = r.benefit ? r.benefit / 100 : 0,
        T = u ? u === null || u === void 0 ? void 0 : u.leasingRateInsurancePerMonthNet : 0;
      v = Math.round(T * _B2 * 100) / 100;
    } else if (S === 5) {
      var _B3 = r.benefit ? r.benefit / 100 : 0;
      v = r !== null && r !== void 0 && r.totalPriceUVP ? Math.round((r === null || r === void 0 ? void 0 : r.totalPriceUVP) * _B3 * 100) / 100 : 0;
    } else if (S === 6) v = r.benefit ? c !== null && c !== void 0 && c.benefitMultiply ? r.benefit * P : r === null || r === void 0 ? void 0 : r.benefit : 0;else if (S === 7) v = r !== null && r !== void 0 && r.benefit ? c !== null && c !== void 0 && c.benefitMultiply ? r.benefit * P : r === null || r === void 0 ? void 0 : r.benefit : 0;else if (S === 8) {
      var _B4 = r.benefit ? r.benefit / 100 : 0,
        _T = r.benefit2 ? r.benefit2 / 100 : 0,
        Z = u ? u === null || u === void 0 ? void 0 : u.leasingRateInsurancePerMonthNet : 0,
        z = (u === null || u === void 0 ? void 0 : u.leasingRateWithoutInsurance) || 0;
      v = u ? Math.round(z * _T * 100) / 100 + Math.round(Z * _B4 * 100) / 100 : 0;
    }
    var C = r === null || r === void 0 || (_r$benefitAdditional = r.benefitAdditional) === null || _r$benefitAdditional === void 0 ? void 0 : _r$benefitAdditional.reduce(function (B, T) {
      return B + T.value;
    }, 0);
    var N = 0;
    return N += C || 0, N += (r === null || r === void 0 ? void 0 : r.benefitAds) || 0, N += (r === null || r === void 0 ? void 0 : r.benefitPhone) || 0, N += (r === null || r === void 0 ? void 0 : r.benefitInternet) || 0, {
      bikes: v,
      bike: (r === null || r === void 0 ? void 0 : r.benefit) || 0,
      other: N
    };
  }
  function Mc(_ref59) {
    var _c$benefitPerInsuranc;
    var c = _ref59.settings,
      r = _ref59.insurancePackage;
    return (c === null || c === void 0 || (_c$benefitPerInsuranc = c.benefitPerInsurancePackage) === null || _c$benefitPerInsuranc === void 0 ? void 0 : _c$benefitPerInsuranc[r]) || 0;
  }
  var Oc = function Oc(_ref60) {
    var c = _ref60.settings,
      r = _ref60.inputParams;
    var u, S;
    if (!(r !== null && r !== void 0 && r.totalPriceUVP)) return null;
    var v = bc({
      inputParams: r,
      settings: c
    });
    if (!v) return null;
    var P = aa({
      bikePrices: v,
      settings: c,
      inputParams: r
    });
    if (r !== null && r !== void 0 && r.salaryGross) {
      var N = (r === null || r === void 0 ? void 0 : r.salaryGross) - P.other,
        L = sa({
          inputParams: r,
          taxBasis: N
        }),
        B = (r === null || r === void 0 ? void 0 : r.salaryGross) - v.leasingRate + P.other + P.bikes - v.bikePriceVatToSubtract,
        T = B + v.bikePricePercent,
        Z = sa({
          inputParams: r,
          taxBasis: T
        }),
        z = Z.salaryNet - v.bikePricePercent,
        K = Math.round((L.salaryNet - z) * 100) / 100,
        X = v.bikePrice * .16,
        Y = K * ((r === null || r === void 0 ? void 0 : r.leasingPeriod) || 36),
        G = Y + X;
      u = Rc({
        bikePrices: v,
        leasingRate: K,
        totalCost: G,
        leasingTotal: Y,
        leasingPriceNormalTotal: v.leasingRateNormalTotal
      }), S = {
        withBikes: {
          contributions: Z,
          taxBasis: T,
          leasingRate: K,
          leasingTotal: Y,
          salaryGross: B,
          salaryNet: z,
          takeoverPrice: X,
          totalCost: G
        },
        withoutBikes: {
          contributions: L,
          taxBasis: N,
          salaryGross: r === null || r === void 0 ? void 0 : r.salaryGross,
          salaryNet: L.salaryNet
        }
      };
    }
    return {
      inputParams: r,
      bikePrices: v,
      savings: u,
      settings: c,
      benefit: P,
      comparison: S
    };
  };
  function oa() {
    return a.jsx("span", {
      className: "text-[--color-text-required]",
      children: "Pflichtfeld"
    });
  }
  var zc = function zc(c) {
    var _c$comparison;
    return !!(c !== null && c !== void 0 && (_c$comparison = c.comparison) !== null && _c$comparison !== void 0 && (_c$comparison = _c$comparison.withBikes) !== null && _c$comparison !== void 0 && _c$comparison.leasingRate);
  };
  function Dc() {
    var _v$current, _ref61, _v$current3, _v$current4, _v$current5, _v$current6, _v$current7, _v$current0, _v$current1, _v$current10, _v$current11, _v$current12, _v$current13, _v$current14, _v$current$healthInsu, _v$current15, _v$current$pensionIns;
    var _rn7 = rn(),
      c = _rn7.options,
      r = c.initialParams,
      u = c.settings,
      S = c.hiddenInputs,
      v = ue.useRef(_objectSpread({}, r)),
      _ue$useState19 = ue.useState({}),
      _ue$useState20 = _slicedToArray(_ue$useState19, 2),
      P = _ue$useState20[0],
      C = _ue$useState20[1],
      _ue$useState21 = ue.useState({}),
      _ue$useState22 = _slicedToArray(_ue$useState21, 2),
      N = _ue$useState22[0],
      L = _ue$useState22[1],
      _ue$useState23 = ue.useState((u === null || u === void 0 ? void 0 : u.formMode) !== "compact"),
      _ue$useState24 = _slicedToArray(_ue$useState23, 2),
      B = _ue$useState24[0],
      T = _ue$useState24[1],
      _ue$useState25 = ue.useState(!1),
      _ue$useState26 = _slicedToArray(_ue$useState25, 2),
      Z = _ue$useState26[0],
      z = _ue$useState26[1];
    if (ue.useEffect(function () {
      (u === null || u === void 0 ? void 0 : u.calculateMethod) === "direct" && pe();
    }, [v.current]), !u || !r) return null;
    var K = u.maxBikes,
      X = u.insurancePackages,
      Y = u.benefitType,
      G = u.benefitFixed,
      J = u.regions,
      oe = u.formMode,
      ce = u.calculateMethod,
      le = r.employerTaxDeduction,
      Ee = r.totalPrice,
      ge = r.totalPriceUVP,
      pe = function pe() {
        z(!1);
        var _ = Oc({
          settings: u,
          inputParams: v.current
        });
        if (C(_), zc(_)) L({});else {
          if (!v.current.salaryGross || !v.current.region) return;
          z(!0);
        }
      },
      Q = function Q(_) {
        var fe = _objectSpread(_objectSpread(_objectSpread({}, r), v.current), _);
        v.current = fe, ce === "direct" && pe(), L(_);
      },
      ne = function ne(_) {
        return (S === null || S === void 0 ? void 0 : S.includes(_)) === !1;
      },
      Ge = P ? aa({
        inputParams: _objectSpread(_objectSpread({}, u), v.current),
        bikePrices: P === null || P === void 0 ? void 0 : P.bikePrices,
        settings: u
      }) : {
        bikes: 0,
        bike: 0
      },
      mt = v !== null && v !== void 0 && (_v$current = v.current) !== null && _v$current !== void 0 && _v$current.insurancePackage ? X === null || X === void 0 ? void 0 : X.find(function (_) {
        var _v$current2;
        return _.name === (v === null || v === void 0 || (_v$current2 = v.current) === null || _v$current2 === void 0 ? void 0 : _v$current2.insurancePackage);
      }) : null;
    return a.jsx(a.Fragment, {
      children: a.jsxs(Tc, {
        children: [a.jsxs("div", {
          className: "border border-[--color-border] bg-[--color-head-box-bg] pb-6",
          children: [a.jsx("h1", {
            className: "px-10 py-8 bg-[--color-head-row-bg] text-2xl font-display border-b border-b-[--color-border]",
            children: x("bikes")
          }), a.jsx(Te, {
            className: "px-10",
            children: a.jsx(je, {
              children: a.jsx(Sc, {
                extended: B,
                onChange: function onChange(_) {
                  return Q(_objectSpread({}, _));
                },
                maxBikes: K || 1 / 0,
                initialValue: Ee || 0,
                initialValueUvp: ge || 0,
                sendParams: v.current,
                maxBikePrice: (mt === null || mt === void 0 ? void 0 : mt.maxBikePrice) || (u === null || u === void 0 ? void 0 : u.maxBikePrice) || 1 / 0
              })
            })
          })]
        }), a.jsx(At, {
          className: "pt-6",
          children: a.jsxs(Te, {
            children: [a.jsxs(Be, {
              children: [v !== null && v !== void 0 && v.current.workTypeOfficial ? x("salaryGrossOfficial") : x("salaryGross"), " ", a.jsx(oa, {})]
            }), x("salaryGrossWithTax") !== "salaryGrossWithTax" && a.jsx(He, {
              children: a.jsx("p", {
                children: x("salaryGrossWithTax")
              })
            }), a.jsx(je, {
              children: a.jsx(nt, {
                required: !0,
                onChange: function onChange(_) {
                  return Q({
                    salaryGross: _
                  });
                },
                type: "number",
                min: 0,
                placeholder: (_ref61 = (v === null || v === void 0 || (_v$current3 = v.current) === null || _v$current3 === void 0 ? void 0 : _v$current3.salaryGross) || 0) === null || _ref61 === void 0 ? void 0 : _ref61.toString(),
                initialValue: (v === null || v === void 0 || (_v$current4 = v.current) === null || _v$current4 === void 0 ? void 0 : _v$current4.salaryGross) || 0,
                prefix: "€"
              })
            })]
          })
        }), a.jsx(At, {
          children: ne("region") && a.jsxs(Te, {
            children: [a.jsxs(Be, {
              children: [x("region"), " ", a.jsx(oa, {})]
            }), a.jsx(je, {
              children: a.jsx(ln, {
                required: !0,
                onChange: function onChange(_) {
                  return Q({
                    region: _
                  });
                },
                initialValue: v === null || v === void 0 ? void 0 : v.current.region,
                type: "text",
                options: [{
                  name: "bitte Bundesland wählen",
                  optValue: ""
                }].concat(_toConsumableArray((J !== null && J !== void 0 ? J : []).map(function (_ref62) {
                  var _ = _ref62.full,
                    fe = _ref62["short"];
                  return {
                    name: _,
                    optValue: fe
                  };
                })))
              })
            })]
          })
        }), oe === "compact" && a.jsx(At, {
          children: a.jsx(Te, {
            className: "justify-center py-2 border-t border-b mb-4",
            children: a.jsx(Nt, {
              className: "text-sm",
              onClick: function onClick() {
                return T(!B);
              },
              type: "link",
              children: B ? a.jsxs(a.Fragment, {
                children: [x("hideFields"), " -"]
              }) : a.jsxs(a.Fragment, {
                children: [x("showFields"), " +"]
              })
            })
          })
        }), (ne("insurancePackage") || ne("leasingPeriod")) && a.jsxs(At, {
          className: B ? "block" : "hidden",
          children: [ne("insurancePackage") && a.jsxs(Te, {
            children: [a.jsxs(Be, {
              children: [x("insurancePackage"), " ", a.jsx(He, {
                url: u === null || u === void 0 ? void 0 : u.linkToInsurances,
                children: a.jsx(Hn, {})
              })]
            }), a.jsx(je, {
              children: a.jsx(ln, {
                onChange: function onChange(_) {
                  return Q({
                    insurancePackage: _
                  });
                },
                initialValue: v === null || v === void 0 || (_v$current5 = v.current) === null || _v$current5 === void 0 ? void 0 : _v$current5.insurancePackage,
                type: "text",
                options: X === null || X === void 0 ? void 0 : X.map(function (_ref63) {
                  var _ = _ref63.name,
                    fe = _ref63.title;
                  return {
                    name: fe,
                    optValue: _
                  };
                })
              })
            })]
          }), ne("leasingPeriod") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("leasingPeriod")
            }), a.jsx(je, {
              children: a.jsx(ln, {
                onChange: function onChange(_) {
                  return Q({
                    leasingPeriod: parseFloat(_)
                  });
                },
                initialValue: v === null || v === void 0 || (_v$current6 = v.current) === null || _v$current6 === void 0 || (_v$current6 = _v$current6.leasingPeriod) === null || _v$current6 === void 0 ? void 0 : _v$current6.toString(),
                type: "number",
                options: [{
                  name: "36",
                  optValue: "36"
                }, {
                  name: "48",
                  optValue: "48"
                }]
              })
            })]
          })]
        }), (le && ne("employerTaxDeduction") || ne("benefit") && Y !== 0) && a.jsxs(At, {
          className: B ? "block" : "hidden",
          children: [ne("benefit") && !(u !== null && u !== void 0 && u.benefitHidden) && a.jsxs(a.Fragment, {
            children: [a.jsxs(Te, {
              children: [a.jsxs(Be, {
                children: [x(Y === 2 ? "benefitPerBike" : "benefit"), a.jsxs(He, {
                  children: [a.jsx("h2", {
                    children: x("benefitHintHeadline")
                  }), a.jsx("p", {
                    children: x("benefitHintText")
                  })]
                })]
              }), a.jsx(je, {
                children: (u === null || u === void 0 ? void 0 : u.benefitType) === 7 && u !== null && u !== void 0 && u.benefitDropdown && u.benefitDropdown.length > 0 ? a.jsx(ln, {
                  onChange: function onChange(_) {
                    return Q({
                      benefit: parseFloat(_)
                    });
                  },
                  initialValue: v === null || v === void 0 || (_v$current7 = v.current) === null || _v$current7 === void 0 || (_v$current7 = _v$current7.benefit) === null || _v$current7 === void 0 ? void 0 : _v$current7.toString(),
                  options: u.benefitDropdown
                }) : a.jsx(nt, {
                  onChange: function onChange(_) {
                    return Q({
                      benefit: _
                    });
                  },
                  initialValue: Ge.bikes,
                  calculatedValue: Ge.bike,
                  disabled: G,
                  step: .1,
                  min: 0,
                  prefix: "€",
                  type: "number"
                })
              })]
            }), (u === null || u === void 0 ? void 0 : u.benefitAdditional) && (u === null || u === void 0 ? void 0 : u.benefitAdditional.length) > 0 && (u === null || u === void 0 ? void 0 : u.benefitAdditional.map(function (_ref64, Qe) {
              var _v$current9;
              var _ = _ref64.name,
                fe = _ref64.value,
                rt = _ref64.editable;
              return a.jsxs(Te, {
                children: [a.jsx(Be, {
                  children: _
                }), a.jsx(je, {
                  children: a.jsx(nt, {
                    onChange: function onChange(Oe) {
                      var _v$current8;
                      var ye = (v === null || v === void 0 || (_v$current8 = v.current) === null || _v$current8 === void 0 ? void 0 : _v$current8.benefitAdditional) || (u === null || u === void 0 ? void 0 : u.benefitAdditional) || [];
                      ye[Qe] = {
                        name: _,
                        value: Oe
                      }, Q({
                        benefitAdditional: ye
                      });
                    },
                    initialValue: (v === null || v === void 0 || (_v$current9 = v.current) === null || _v$current9 === void 0 || (_v$current9 = _v$current9.benefitAdditional) === null || _v$current9 === void 0 || (_v$current9 = _v$current9[Qe]) === null || _v$current9 === void 0 ? void 0 : _v$current9.value) || fe || 0,
                    disabled: !rt,
                    step: .1,
                    prefix: "€",
                    min: 0,
                    type: "number"
                  })
                })]
              }, Qe);
            }))]
          }), ne("benefitInternet") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("benefitInternet")
            }), a.jsx(je, {
              children: a.jsx(nt, {
                onChange: function onChange(_) {
                  return Q({
                    benefitInternet: _
                  });
                },
                initialValue: (v === null || v === void 0 || (_v$current0 = v.current) === null || _v$current0 === void 0 ? void 0 : _v$current0.benefitInternet) || 0,
                step: .1,
                prefix: "€",
                min: 0,
                type: "number"
              })
            })]
          }), ne("benefitPhone") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("benefitPhone")
            }), a.jsx(je, {
              children: a.jsx(nt, {
                onChange: function onChange(_) {
                  return Q({
                    benefitPhone: _
                  });
                },
                initialValue: (v === null || v === void 0 || (_v$current1 = v.current) === null || _v$current1 === void 0 ? void 0 : _v$current1.benefitPhone) || 0,
                step: .1,
                prefix: "€",
                min: 0,
                type: "number"
              })
            })]
          }), ne("benefitAds") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("benefitAds")
            }), a.jsx(je, {
              children: a.jsx(nt, {
                onChange: function onChange(_) {
                  return Q({
                    benefitAds: _
                  });
                },
                initialValue: (v === null || v === void 0 || (_v$current10 = v.current) === null || _v$current10 === void 0 ? void 0 : _v$current10.benefitAds) || 0,
                step: .1,
                prefix: "€",
                min: 0,
                type: "number"
              })
            })]
          }), le && ne("employerTaxDeduction") && a.jsxs(Te, {
            children: [a.jsxs(Be, {
              children: [x("employerTaxDeduction"), a.jsxs(He, {
                children: [a.jsx("h2", {
                  children: x("employerTaxDeductionHintHeadline")
                }), a.jsx("p", {
                  children: x("employerTaxDeductionHintText")
                })]
              })]
            }), a.jsx(je, {
              children: a.jsx(Rr, {
                onChange: function onChange(_) {
                  return Q({
                    employerTaxDeduction: _
                  });
                },
                initialValue: v === null || v === void 0 ? void 0 : v.current.employerTaxDeduction
              })
            })]
          })]
        }), a.jsxs(At, {
          className: B ? "block" : "hidden",
          children: [ne("taxClass") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("taxClass")
            }), a.jsx(je, {
              children: a.jsx(ln, {
                onChange: function onChange(_) {
                  return Q({
                    taxClass: parseInt(_)
                  });
                },
                initialValue: v === null || v === void 0 || (_v$current11 = v.current) === null || _v$current11 === void 0 || (_v$current11 = _v$current11.taxClass) === null || _v$current11 === void 0 ? void 0 : _v$current11.toString(),
                type: "number",
                options: [{
                  optValue: "1",
                  name: "Klasse I"
                }, {
                  optValue: "2",
                  name: "Klasse II"
                }, {
                  optValue: "3",
                  name: "Klasse III"
                }, {
                  optValue: "4",
                  name: "Klasse IV ohne Faktorverfahren"
                }, {
                  optValue: "5",
                  name: "Klasse IV mit Faktorverfahren"
                }, {
                  optValue: "6",
                  name: "Klasse V"
                }, {
                  optValue: "7",
                  name: "Klasse VI"
                }]
              })
            })]
          }), a.jsxs(Te, {
            className: "".concat((v === null || v === void 0 ? void 0 : v.current.taxClass) === 5 ? "flex" : "hidden"),
            children: [a.jsx(Be, {
              children: x("taxFactor")
            }), a.jsx(je, {
              children: a.jsx(nt, {
                onChange: function onChange(_) {
                  return Q({
                    taxFactor: _
                  });
                },
                initialValue: (v === null || v === void 0 ? void 0 : v.current.taxFactor) || 1,
                step: .001,
                type: "number",
                max: 1,
                min: .001
              })
            })]
          }), ne("churchTax") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("churchTax")
            }), a.jsx(je, {
              children: a.jsx(Rr, {
                onChange: function onChange(_) {
                  return Q({
                    churchTax: _
                  });
                },
                initialValue: v === null || v === void 0 ? void 0 : v.current.churchTax
              })
            })]
          }), ne("hasChildren") && a.jsxs(a.Fragment, {
            children: [a.jsxs(Te, {
              children: [a.jsx(Be, {
                children: x("hasChildren")
              }), a.jsx(je, {
                children: a.jsx(Rr, {
                  onChange: function onChange(_) {
                    return Q({
                      hasChildren: _
                    });
                  },
                  initialValue: v === null || v === void 0 ? void 0 : v.current.hasChildren
                })
              })]
            }), (v === null || v === void 0 ? void 0 : v.current.hasChildren) && a.jsxs(a.Fragment, {
              children: [a.jsxs(Te, {
                children: [a.jsx(Be, {
                  children: x("childAllowances")
                }), a.jsx(je, {
                  children: a.jsx(nt, {
                    onChange: function onChange(_) {
                      return Q({
                        childAllowances: _
                      });
                    },
                    initialValue: (v === null || v === void 0 || (_v$current12 = v.current) === null || _v$current12 === void 0 ? void 0 : _v$current12.childAllowances) || 0,
                    step: .5,
                    type: "number"
                  })
                })]
              }), a.jsxs(Te, {
                children: [a.jsx(Be, {
                  children: x("childrenCount")
                }), a.jsx(je, {
                  children: a.jsx(nt, {
                    onChange: function onChange(_) {
                      return Q({
                        childrenCount: _
                      });
                    },
                    initialValue: (v === null || v === void 0 || (_v$current13 = v.current) === null || _v$current13 === void 0 ? void 0 : _v$current13.childrenCount) || 0,
                    step: 1,
                    type: "number"
                  })
                })]
              })]
            })]
          })]
        }), (ne("healthInsurance") || ne("pensionInsurance") || ne("workTypeOfficial")) && a.jsxs(At, {
          className: B ? "block" : "hidden",
          children: [ne("workTypeOfficial") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("workTypeOfficial")
            }), a.jsx(je, {
              children: a.jsx(Rr, {
                onChange: function onChange(_) {
                  return Q({
                    workTypeOfficial: _
                  });
                },
                initialValue: v === null || v === void 0 ? void 0 : v.current.workTypeOfficial
              })
            })]
          }), !(v !== null && v !== void 0 && (_v$current14 = v.current) !== null && _v$current14 !== void 0 && _v$current14.workTypeOfficial) && ne("healthInsurance") && a.jsxs(a.Fragment, {
            children: [a.jsxs(Te, {
              children: [a.jsx(Be, {
                children: x("healthInsurance")
              }), a.jsx(je, {
                children: a.jsx(ln, {
                  onChange: function onChange(_) {
                    return Q({
                      healthInsurance: parseInt(_)
                    });
                  },
                  initialValue: (v === null || v === void 0 || (_v$current$healthInsu = v.current.healthInsurance) === null || _v$current$healthInsu === void 0 ? void 0 : _v$current$healthInsu.toString()) || "1",
                  type: "number",
                  options: [{
                    optValue: "1",
                    name: "gesetzliche Krankenversicherung"
                  }, {
                    optValue: "2",
                    name: "private Krankenversicherung"
                  }]
                })
              })]
            }), a.jsxs(Te, {
              className: "".concat((v === null || v === void 0 ? void 0 : v.current.healthInsurance) === 1 ? "flex" : "hidden"),
              children: [a.jsxs(Be, {
                children: [x("healthInsuranceFactor"), a.jsxs(He, {
                  children: [a.jsx("h2", {
                    children: x("healthInsuranceFactorHintHeadline")
                  }), a.jsx("p", {
                    children: x("healthInsuranceFactorHintText")
                  })]
                })]
              }), a.jsx(je, {
                children: a.jsx(nt, {
                  onChange: function onChange(_) {
                    return Q({
                      healthInsuranceFactor: _
                    });
                  },
                  initialValue: (v === null || v === void 0 ? void 0 : v.current.healthInsuranceFactor) || 1.6,
                  step: .01,
                  min: .01,
                  max: 10,
                  prefix: "%",
                  type: "number"
                })
              })]
            })]
          }), !(v !== null && v !== void 0 && (_v$current15 = v.current) !== null && _v$current15 !== void 0 && _v$current15.workTypeOfficial) && ne("pensionInsurance") && a.jsxs(Te, {
            children: [a.jsx(Be, {
              children: x("pensionInsurance")
            }), a.jsx(je, {
              children: a.jsx(ln, {
                onChange: function onChange(_) {
                  return Q({
                    pensionInsurance: parseInt(_)
                  });
                },
                initialValue: (v === null || v === void 0 || (_v$current$pensionIns = v.current.pensionInsurance) === null || _v$current$pensionIns === void 0 ? void 0 : _v$current$pensionIns.toString()) || "0",
                type: "number",
                options: [{
                  name: "Ja (West)",
                  optValue: "0"
                }, {
                  name: "Ja (Ost)",
                  optValue: "1"
                }, {
                  name: "Nein",
                  optValue: "2"
                }]
              })
            })]
          })]
        }), a.jsxs(At, {
          noBorder: !0,
          children: [a.jsxs(Te, {
            className: "".concat(N !== null && N !== void 0 && N.bikeRows && ce !== "direct" ? "" : "hidden"),
            children: [a.jsx(Be, {}), a.jsx(je, {
              children: a.jsx(Nt, {
                size: "big",
                onClick: pe,
                className: "w-full",
                children: x("calculate")
              })
            })]
          }), a.jsx(Te, {
            children: a.jsx(je, {
              className: "justify-center w-full flex-col"
            })
          })]
        }), a.jsx(Ec, {
          extended: B,
          results: _objectSpread({}, P)
        }), a.jsx("div", {
          className: "border-2 border-[#cf0000] p-4 rounded-md ".concat(Z ? "" : "hidden"),
          children: x("error")
        })]
      })
    });
  }
  var Kc = {
      initialParams: {
        totalPrice: 999.99,
        totalPriceUVP: 999.99,
        leasingPeriod: 36,
        bikeCount: 1,
        bikeRows: [{
          price: 999.99,
          uvp: 999.99,
          uid: 0
        }],
        insurancePackage: "premiumPlus",
        salaryGross: 0,
        employerTaxDeduction: !0,
        churchTax: !0,
        taxClass: 1,
        taxFactor: 1,
        pensionInsurance: 0,
        healthInsurance: 1,
        healthInsuranceFactor: 1.7,
        region: "",
        workTypeOfficial: !1,
        hasChildren: !1,
        childAllowances: 0,
        childrenCount: 0,
        benefit: 5,
        benefit2: 0,
        benefitInternet: 0,
        benefitPhone: 0,
        benefitAds: 0,
        benefitAdditional: void 0
      },
      settings: {
        language: "de",
        isProduct: !1,
        calculateMethod: "direct",
        formMode: "extended",
        insuranceCost: 400,
        maxBikes: 2,
        maxBikePrice: 1 / 0,
        minBikePrice: 357,
        linkToInsurances: void 0,
        benefitType: 2,
        benefitHidden: !1,
        benefitDropdown: void 0,
        benefitAdditional: void 0,
        benefitPerInsurancePackage: {},
        benefitBikeCount: 1e3,
        benefitMultiply: !1,
        benefitFixed: !1,
        noTaxOnInsurance: !1,
        subtractBenefitsInResults: !1,
        subtractTaxAfterEmployerBenefit: !1,
        useFullBikeUvpPrice: !0,
        includeInsuranceForFactorComparison: !1,
        hasReverseCalculator: !1,
        regions: [{
          "short": "BW",
          full: "Baden-Württemberg"
        }, {
          "short": "BAYERN",
          full: "Bayern"
        }, {
          "short": "BERLIN",
          full: "Berlin"
        }, {
          "short": "BRANDENBURG",
          full: "Brandenburg"
        }, {
          "short": "BREMEN",
          full: "Bremen"
        }, {
          "short": "HH",
          full: "Hamburg"
        }, {
          "short": "HESSEN",
          full: "Hessen"
        }, {
          "short": "MECKLENBURG",
          full: "Mecklenburg-Vorpommern"
        }, {
          "short": "NIEDERSACHSEN",
          full: "Niedersachsen"
        }, {
          "short": "NRW",
          full: "Nordrhein-Westfalen"
        }, {
          "short": "RP",
          full: "Rheinland-Pfalz"
        }, {
          "short": "SAARLAND",
          full: "Saarland"
        }, {
          "short": "SACHSEN",
          full: "Sachsen"
        }, {
          "short": "SA",
          full: "Sachsen-Anhalt"
        }, {
          "short": "SH",
          full: "Schleswig-Holstein"
        }, {
          "short": "TH",
          full: "Thüringen"
        }],
        insurancePackages: [{
          name: "basis",
          title: "Basis",
          leasingFactors: [{
            upto: 1e8,
            value: 3.27
          }],
          leasingInsurancePrices: [{
            upto: 1500,
            value: 169.92
          }, {
            upto: 3e3,
            value: 347.04
          }, {
            upto: 4760,
            value: 421.92
          }, {
            upto: 5e3,
            value: 587.16
          }, {
            upto: 6e3,
            value: 587.16
          }, {
            upto: 8e3,
            value: 752.04
          }, {
            upto: 1e4,
            value: 961.92
          }, {
            upto: 12e3,
            value: 1172.16
          }],
          maxBikePrice: 12e3,
          insuranceInspectionCostText: "",
          insuranceInspectionCost: 0,
          features: {
            Accident: !0,
            Fall: !0,
            Vandalism: !0,
            ImproperHandling: !0,
            ElectricDamage: !0,
            BatteryDamage: !0,
            MaterialDamage: !0,
            Theft: !0,
            Burglary: !0,
            Robbery: !0,
            WearOff: !1,
            CostAbsorbtion: !1,
            AbsorbtionAfterYear2: !1,
            MobilityProtection: !1,
            SickLeave: !1,
            ParentalLeave: !1,
            DepartureOfEmployee: !1,
            AccidentalDeath: !1,
            Deductible: "basicDeductible",
            SmallClaims: "basicSmallClaims"
          }
        }, {
          name: "premium",
          title: "Premium",
          leasingFactors: [{
            upto: 1e8,
            value: 3.27
          }],
          leasingInsurancePrices: [{
            upto: 1500,
            value: 533.52
          }, {
            upto: 3e3,
            value: 583.2
          }, {
            upto: 4760,
            value: 678.24
          }, {
            upto: 5e3,
            value: 821.52
          }, {
            upto: 6e3,
            value: 893.52
          }, {
            upto: 8e3,
            value: 1088.28
          }, {
            upto: 1e4,
            value: 1338.48
          }, {
            upto: 12e3,
            value: 1583.28
          }],
          maxBikePrice: 12e3,
          insuranceInspectionCostText: "UVV-Prüfung",
          insuranceInspectionCost: 30,
          features: {
            Accident: !0,
            Fall: !0,
            Vandalism: !0,
            ImproperHandling: !0,
            ElectricDamage: !0,
            BatteryDamage: !0,
            MaterialDamage: !0,
            Theft: !0,
            Burglary: !0,
            Robbery: !0,
            WearOff: !0,
            CostAbsorbtion: !0,
            AbsorbtionAfterYear2: !1,
            MobilityProtection: !0,
            SickLeave: !1,
            ParentalLeave: !1,
            DepartureOfEmployee: !1,
            AccidentalDeath: !1,
            Deductible: "compareTableNone",
            SmallClaims: "compareTableNone"
          }
        }, {
          name: "premiumPlus",
          title: "PremiumPLUS",
          leasingFactors: [{
            upto: 1e8,
            value: 3.27
          }],
          leasingInsurancePrices: [{
            upto: 1e3,
            value: 548.64
          }, {
            upto: 1500,
            value: 600.12
          }, {
            upto: 2e3,
            value: 676.8
          }, {
            upto: 2500,
            value: 734.4
          }, {
            upto: 3e3,
            value: 793.8
          }, {
            upto: 3500,
            value: 852.12
          }, {
            upto: 4e3,
            value: 913.68
          }, {
            upto: 5e3,
            value: 969.48
          }, {
            upto: 6e3,
            value: 1109.52
          }, {
            upto: 7e3,
            value: 1247.04
          }, {
            upto: 8e3,
            value: 1383.12
          }, {
            upto: 1e4,
            value: 1526.04
          }, {
            upto: 12e3,
            value: 1764
          }, {
            upto: 15e3,
            value: 2236.32
          }, {
            upto: 2e4,
            value: 2840.76
          }],
          maxBikePrice: 2e4,
          insuranceInspectionCostText: "Inspektion/UVV Prüfung",
          insuranceInspectionCost: 90,
          features: {
            Accident: !0,
            Fall: !0,
            Vandalism: !0,
            ImproperHandling: !0,
            ElectricDamage: !0,
            BatteryDamage: !0,
            MaterialDamage: !0,
            Theft: !0,
            Burglary: !0,
            Robbery: !0,
            WearOff: !0,
            CostAbsorbtion: !1,
            AbsorbtionAfterYear2: !0,
            MobilityProtection: !0,
            SickLeave: !0,
            ParentalLeave: !0,
            DepartureOfEmployee: !0,
            AccidentalDeath: !0,
            Deductible: "compareTableNone",
            SmallClaims: "compareTableNone"
          }
        }]
      },
      hiddenInputs: ["benefitAds", "benefitPhone", "benefitInternet", "leasingPeriod"],
      colors: {
        text: "#000000",
        textRequired: "#00000055",
        textLight: "#aaaaaa",
        formBg: "#ffffff",
        headRowBg: "#F0F7F2",
        headBoxBg: "#FCFCFC",
        yes: "#6caf6c",
        no: "#cccccc",
        primary: "orange",
        button: "orange",
        buttonText: "#ffffff",
        buttonLight: "#cccccc",
        border: "#EFEFEF",
        input: "white",
        inputDisabled: "#dddddd",
        inputRequired: "#eeeeee",
        resultRowHighlight: "#f7f7f7",
        resultRowAlternate: "#f7f7f7",
        resultRowHead: "#eeeeee",
        resultRowFoot: "#f7f7f7",
        resultDetailButton: "#e8e8e8"
      },
      texts: {
        de: {
          leasingTotal: "Gesamtrate über x Monate [netto wenn Arbeitgeber vorsteuerabzugsberechtigt true ist, brutto wenn Arbeitgeber vorsteuerabzugsberechtigt false ist]",
          savingsPercent: "Ersparnis Prozent gegenüber dem Direktkauf",
          monthly: "monatlich",
          againstPurchase: "gegenüber Direktkauf",
          againstLeasing: "gegenüber Leasing ohne Gehalts&shy;umwandlung",
          instead: "statt",
          saving: "Ersparnis",
          leasingRate: "Monatliche Leasingrate",
          leasingRateAddition: " ",
          leasingRateTotal: "Monatliche Leasingrate inkl. Versicherung ohne Gehalts&shy;umwandlung",
          leasingRateWithBike: "Tatsächliche monatliche Netto&shy;belastung",
          leasingRateTotalCostWithBike: "Tatsächliche Netto&shy;belastung",
          savingsAgainstPurchase: "Ersparnis Betrag gegenüber dem Direktkauf",
          realNet: "Tatsächliche Nettobelastung durch die Gehalts&shy;umwandlung (Differenz zu Gehalt ohne Leasing)",
          realNetShort: "Tatsächliche monatliche Netto&shy;belastung durch die Gehalts&shy;umwandlung",
          exclVat: "exkl. MwSt.",
          totalPrice: "Bike-Kaufpreis (inkl. Zubehör und MwSt.)",
          totalPriceUVP: "Brutto&shy;listenpreis (UVP) Bike (inkl. Zubehör und MwSt.)",
          quarterPriceUVPHintText: "Laut dem Erlass der obersten Finanzbehörden vom 09.01.2020 werden Diensträder, die erstmals ab dem 01.01.2020 überlassen werden, mit 1% des auf volle 100 € abgerundeten Viertels der unverbindlichen Preisempfehlung besteuert. Dies entspricht 0,25% vom ganzen Bruttolistenpreis.“",
          quarterPriceUVP: "Geviertelter Bruttolistenpreis",
          referenceValueNonCashBenefit: "Bezugsgröße für geldwerten Vorteil",
          nonCashBenefitAccordingToOnePercentRule: "geldwerter Vorteil (gem. 1%-Regel)",
          salaryGross: "Bruttogehalt (monatlich)",
          salaryGrossOfficial: "Besoldung (monatlich)",
          leasingPeriod: "Leasingdauer",
          employerTaxDeduction: "Arbeitgeber ist vorsteuer&shy;abzugs&shy;berechtigt",
          calculate: "Individuelle Leasingrate berechnen",
          insurancePackage: "Versicherungspaket",
          benefit: "Arbeitgeber&shy;zuschuss (monatlich)",
          benefitTable: "Arbeitgeber&shy;zuschuss (monatlich)",
          benefitPerBike: "Arbeitgeber&shy;zuschuss je Bike (monatlich)",
          benefitInternet: "Internetpauschale (monatlich)",
          benefitPhone: "Handykostenzuschuß (monatlich)",
          benefitAds: "Werbeflächenzuschuss (monatlich)",
          benefitOther: "Weitere Zuschüsse",
          addBike: "Bike hinzufügen",
          removeBike: "Bike entfernen",
          bikes: "Bikes",
          insurance: "Versicherung",
          other: "Sonstiges",
          sumBikes: "Summe",
          healthInsuranceFactor: "KV&#8209;Zusatzbeitrag",
          healthInsuranceFactorHintHeadline: "KV&#8209;Zusatzbeitrag",
          healthInsuranceFactorHintText: "Die gesetzlichen Krankenkassen erheben seit dem 1. Januar 2015 einen individuellen Zusatzbeitrag. Informationen hierzu erhalten Sie bei Ihrer Krankenkasse oder finden Sie auf Ihrer Gehaltsabrechnung. In der Regel liegt der KV-Zusatzbeitrag bei 1,3 %.",
          benefitHintHeadline: "Arbeitgeber&shy;zuschuss",
          compare: "vergleichen",
          benefitHintText: "Aus steuerlicher Sicht empfehlen wir einen Arbeitgeber-Zuschuss.",
          employerTaxDeductionHintHeadline: "Vorsteuerabzugsberechtigung",
          employerTaxDeductionHintText: "Vorsteuerabzugsberechtigt sind Unternehmen, die ihre Einnahmen und Ausgaben inklusive Mehrwertsteuer tätigen. Sie können die entrichtete Vorsteuer mit der vereinnahmten Umsatzsteuer verrechnen, bekommen also die Vorsteuer vom Finanzamt zurück. Arbeitgeber, die vorsteuerabzugsberechtigt sind, verrechnen bei der Gehaltsumwandlung nur die Netto-Leasingrate mit dem Bruttogehalt. Weitere Informationen erhalten Sie bei Ihrem Arbeitgeber.",
          taxFactor: "Faktor für Faktorverfahren",
          salaryGrossWithTax: "",
          compareTableHeadline: "Leistungen Versicherungsschutz im Vergleich",
          compareTableRepairOrReplacement: "Reparatur oder Ersatz bei",
          compareTableAccident: "Unfall",
          compareTableFall: "Sturz",
          compareTableVandalism: "Vandalismus",
          compareTableImproperHandling: "fahrlässige, unsachgemäße Handhabung",
          compareTableElectricDamage: "Elektronikschäden",
          compareTableBatteryDamage: "Akku-Defekte",
          compareTableMaterialDamage: "Material-, Produktions-, & Konstruktions&shy;fehler ab dem 25. Monat nach Abschluss des Leasing&shy;vertrags",
          compareTableTheft: "Diebstahl",
          compareTableBurglary: "Einbruchsdiebstahl",
          compareTableRobbery: "Raub",
          compareTableWearOff: "Verschleiß ab dem 1. Tag",
          compareTableCostAbsorbtion: "Kostenübernahme für UVV-Prüfung nach dem 1. und 2. Versicherungsjahr",
          compareTableAbsorbtionAfterYear2: "Kostenübernahme für Inspektion inkl. UVV nach dem 1. und 2. Versicherungs&shy;jahr",
          compareTableMobilityProtection: "Mobilitätsschutz",
          compareTableSickLeave: "Krankheitsbedingtem Ausfall",
          compareTableParentalLeave: "Elternzeit",
          compareTableDepartureOfEmployee: "Ausscheiden des Mitarbeiters",
          compareTableAccidentalDeath: "Unfalltod",
          compareTableDeductible: "Selbstbeteiligung",
          compareTableSmallClaims: "Bagatellschadensregelung",
          compareTableDeductibleBasis: "40 Euro brutto pro Schadensfall",
          compareTableSmallClaimsBasis: "Bagatellschäden bis zu einem Betrag von 75 Euro werden nicht erstattet",
          compareTableNone: "keine",
          basicDeductible: "40 Euro brutto pro Schadensfall",
          basicSmallClaims: "Bagatellschäden bis zu einem Betrag von 75 Euro werden nicht erstattet",
          errorMessageHeadline: "Kalkulation fehlgeschlagen",
          errorMessageRepeatLater: "Bitte versuchen Sie es später erneut.",
          loading: "Die Leasingrate wird für Sie kalkuliert...",
          leasing: "Leasing",
          purchase: "Kauf",
          totalCostInclInsurance: "Gesamtkosten inkl. Reparaturen bei Kauf bzw. Versicherung bei Leasing",
          insuranceCostExplaination: "durchschnittlicher Wert für eine Vollkaskoversicherung für eine Laufzeit von 36 Monaten",
          insuranceCostInclusive1: "Inkl. einer Vollkaskoversicherung in Höhe von",
          insuranceCostInclusive2: "je Bike",
          insuranceCostInclusive3: "inkl. erwarteter Restkaufwert.",
          salaryWithBikes: "Bruttos&shy;entgelt nach Gehalts&shy;umwandlung",
          socialInsurances: "Sozial&shy;versicherungs&shy;beiträge",
          unemploymentInsurance: "Arbeitslosen&shy;versicherung",
          pensionInsurance: "Renten&shy;versicherung",
          careInsurance: "Pflege&shy;versicherung",
          healthInsurance: "Kranken&shy;versicherung",
          taxes: "Steuern",
          churchTax: "Kirchensteuer",
          solidarityTax: "Solidaritätssteuer",
          incomeTax: "Lohnsteuer",
          salaryNet: "Nettogehalt",
          plusNonCashBenefit: "zuzüglich geldwerter Vorteil",
          calculationPlusNonCashBenefit: "Berechnung geldwerter Vorteil",
          taxBasis: "Versteuerungs&shy;grundlage",
          minusNonCashBenefit: "abzüglich versteuerter geldwerter Vorteil",
          bikePriceVatToSubtract: "abzüglich Umsatzsteuer aus dem Sachbezug",
          payout: "Auszahlungs&shy;betrag",
          purchasePrice: "Kaufpreis",
          takeoverPrice: "16% des UVP",
          yourPriceIndividual: "Ihr persönlicher Leasing&shy;preis",
          yourPrice: "Ihr Leasing&shy;preis",
          calculationLeasingCosts: "Berechnung der monatlichen Leasingrate ohne Gehalts&shy;umwandlung",
          leasingPriceTotal: "Monatliche Gesamt&shy;leasing&shy;rate ",
          leasinginsurancePerMonth: "Monatliche Versicherungsprämie",
          forBike: "für Bike",
          comparisonWithToWithoutBike: "Vergleichs&shy;rechnung Ersparnis bei Bar&shy;lohn&shy;umwandlung",
          comparisonPurchaseToLeasing: "Vergleich Kauf gegenüber Leasing",
          comparisonLeasingRate: "Vergleich Leasing gegenüber Gehalts&shy;umwandlung",
          comparisonLeasingCostTotal: "Vergleich der Gesamtkosten hinsichtlich der kommpletten Leasingperiode",
          comparisonLeasingCostTotalNormal: "Gesamtkosten Leasing ohne Gehaltsumwandlung",
          comparsionLeasingCostViaSalary: "Gesamtkosten Leasing per Gehaltsumwandlung",
          savingsLeasingAbsolute: "Absolute Ersparnis",
          savingsLeasingPercent: "Prozentuale Ersparnis",
          showExtended: "Detailberechnung ansehen",
          showOnlySummary: "Kurzfassung",
          showDetails: "Details",
          showCalculation: "Berechnung zur Gehalts&shy;umwandlung anzeigen",
          hideCalculation: "Berechnung ausblenden",
          showFields: "Individuelle Einstellungen einstellen",
          hideFields: "Individuelle Einstellungen ausblenden",
          months: "Monate",
          productPriceHintText: "Der hiergenannte Wert ist ein unverbindlicher Aktionspreis, den konkreten Bike-Kaufpreis erfahren Sie bei Ihrem Fachhändler.",
          region: "Bundesland",
          workTypeOfficial: "Sind sie verbeamtet?",
          taxClass: "Steuerklasse",
          hasChildren: "Haben Sie Kinder?",
          childAllowances: "Zahl der Kinderfreibeträge",
          childrenCount: "Anzahl der Kinder",
          withoutBikes: "ohne Bikes",
          withBikes: "mit Bikes",
          smallText: "<p>(Unverbindliches Kalkulationsbeispiel. Die Berechnung hängt vom individuellen Einkommen, der Steuerklasse und den jeweiligen Freibeträgen ab. Bitte wenden Sie sich bei steuerlichen Fragen an Ihren Steuerberater.)</p><p>Die Grundmietzeit beginnt mit dem Ersten des auf die Übernahme folgenden Kalendermonats. Erfolgt die Übernahme vor dem Beginn der Grundmietzeit, ist für die Zwischenzeit je Tag 1/30 der monatlichen Leasingrate zu zahlen.</p>",
          error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
          incl: "inkl.",
          "package": "Paket"
        }
      }
    },
    Uc = {
      version: "1.1.9"
    }.version,
    ua = function ua(_ref65) {
      var c = _ref65.options;
      return a.jsx("div", {
        id: "eur-leasingcalc",
        "data-version": Uc,
        children: a.jsx(pc, {
          options: _objectSpread({}, c),
          defaultOptions: Kc,
          children: a.jsx(vc, {
            children: a.jsx(Dc, {})
          })
        })
      });
    },
    Hc = ua;
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) < "u" && document.addEventListener("DOMContentLoaded", function () {
    var c = document.getElementById("eurorad-calc");
    if (c) {
      var r = {};
      var u = c.getAttribute("data-options");
      if (u) try {
        r = JSON.parse(u);
      } catch (S) {
        console.error("Error parsing options:", S);
      }
      fc.render(sc.createElement(ua, {
        options: r
      }), c);
    }
  }), Kl.EurLeasingCalc = Hc, Object.defineProperty(Kl, Symbol.toStringTag, {
    value: "Module"
  }), Kl;
}({});

/***/ }),

/***/ "./src/js/help-center.js":
/*!*******************************!*\
  !*** ./src/js/help-center.js ***!
  \*******************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var firstNavItem = document.querySelector('.er-help-category-nav .e-filter-item');
  var listing = document.querySelector('.er-help-loop');
  var nav = document.querySelector('.er-help-category-nav');

  // Check if search query param is in URL
  var urlParams = new URLSearchParams(window.location.search);
  if (firstNavItem && !urlParams.has('search')) {
    setTimeout(function () {
      // Triger click
      var clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      firstNavItem.dispatchEvent(clickEvent);
      listing.classList.remove('init');
    }, 500);
  }

  // if(urlParams.has('search')) {
  //   nav.classList.add('hidden');
  // }

  var loopGrid = document.querySelector('.er-help-loop');
  var searchInput = document.querySelector('.er-help-center-search input');
  var searchInputButton = document.querySelector('.er-help-center-search-button');
  var filterHelpCenter = function filterHelpCenter(search) {
    var loopGridItems = loopGrid.querySelectorAll('.e-loop-item');
    if (loopGridItems.length > 0) {
      loopGridItems.forEach(function (item) {
        var itemContent = item.textContent.toLowerCase();
        var searchQuery = search.toLowerCase();
        if (itemContent.includes(searchQuery)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  };
  if (searchInputButton) {
    searchInputButton.addEventListener('click', function () {
      filterHelpCenter(searchInput ? searchInput.value : '');
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      if (searchInput.value === '') {
        filterHelpCenter('');
      }
    });
    searchInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        filterHelpCenter(searchInput ? searchInput.value : '');
      }
    });
  }
  if (searchInput && loopGrid) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        filterHelpCenter(searchInput ? searchInput.value : '');
      });
    });
    observer.observe(loopGrid, {
      childList: true,
      subtree: true
    });
  }
});

/***/ }),

/***/ "./src/js/locations.js":
/*!*****************************!*\
  !*** ./src/js/locations.js ***!
  \*****************************/
/***/ (() => {

var map;
var searchParams = {
  lat: 0,
  lng: 0,
  radius: 10,
  city: ''
};
window.initMaps = function () {
  var partnerLocatorBlock = document.querySelector('.er-locations');
  var partnersMap = document.querySelector('.er-locations__map');
  var partnerLocatorList = document.querySelector('.er-locations__list');
  var partnerLocatorToggleMap = document.querySelector('#er-locations-toggle-map');
  var partnerLocatorToggleList = document.querySelector('#er-locations-toggle-list');
  var partnerLocatorRadiusButtonsContainer = document.querySelector('.er-locations__radius-buttons');
  var partnerLocatorRadiusButtons = document.querySelectorAll('.er-locations__radius-button');
  var partnerLocatorInput = document.querySelector('.er-locations__search-input');
  var partnerLocatorGeolocate = document.querySelector('.er-locations__geolocate');
  var partnerLocatorResultCounter = document.querySelector('.er-locations__results-count');
  var partnerLocatorButton = document.querySelector('.er-locations__submit');
  if (partnersMap) {
    map = initMap(partnersMap);
  }
  if (partnerLocatorInput) {
    initPartnerLocator(partnerLocatorInput, map);
    if (partnerLocatorInput && partnerLocatorInput.value.trim() !== '') {
      var geocoder = new google.maps.Geocoder();
      document.body.classList.add('autocomplete-suppress');
      geocoder.geocode({
        address: partnerLocatorInput.value
      }, function (results, status) {
        if (status === 'OK' && results[0]) {
          var lat = results[0].geometry.location.lat();
          var lng = results[0].geometry.location.lng();
          searchParams.lat = lat;
          searchParams.lng = lng;
          checkSubmitButtonEnable();
          if (map) map.setCenter({
            lat: lat,
            lng: lng
          });
          partnerLocatorButton.click();
        }
      });
    }
  }
  if (partnerLocatorToggleMap) {
    partnerLocatorToggleMap.addEventListener('click', function () {
      partnerLocatorToggleMap.classList.add('active');
      partnerLocatorToggleList.classList.remove('active');
      partnerLocatorBlock.dataset.mode = 'map';
    });
  }
  if (partnerLocatorToggleList) {
    partnerLocatorToggleList.addEventListener('click', function () {
      partnerLocatorToggleList.classList.add('active');
      partnerLocatorToggleMap.classList.remove('active');
      partnerLocatorBlock.dataset.mode = 'list';
    });
  }
  if (partnerLocatorRadiusButtons) {
    partnerLocatorRadiusButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        partnerLocatorRadiusButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        searchParams.radius = parseInt(button.dataset.radius);
        checkSubmitButtonEnable();
      });
    });
  }
  var geolocateOptions = {
    maximumAge: 60000,
    timeout: 5000,
    enableHighAccuracy: true
  };
  if (partnerLocatorGeolocate) {
    partnerLocatorGeolocate.addEventListener('click', function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          //You have your locaton here
          map.setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          searchParams.lat = pos.coords.latitude;
          searchParams.lng = pos.coords.longitude;
          checkSubmitButtonEnable();
          var geocoder = new google.maps.Geocoder();
          var latlng = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          geocoder.geocode({
            location: latlng
          }, function (results, status) {
            if (status === 'OK') {
              if (results[0]) {
                partnerLocatorInput.value = results[0].formatted_address;
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        }, function (error) {
          console.log('Geolocate error!', error.code, error.message);
        }, geolocateOptions);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
  }
  function checkSubmitButtonEnable() {
    if (searchParams.lat && searchParams.lng && searchParams.radius) {
      partnerLocatorButton.disabled = false;
    } else {
      partnerLocatorButton.disabled = true;
    }
  }
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  function initPartnerLocator(input, map) {
    if (input) {
      input.addEventListener('focus', function () {
        document.body.classList.remove('autocomplete-suppress');
      });
      var options = {
        componentRestrictions: {
          country: ['be', 'de']
        },
        strictBounds: false
      };
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        searchParams.lat = lat;
        searchParams.lng = lng;
        var addressComponents = place.address_components;
        searchParams.city = addressComponents.find(function (component) {
          return component.types[0] === 'locality';
        }).long_name;
        checkSubmitButtonEnable();
        map.setCenter({
          lat: lat,
          lng: lng
        });
      });
    }
    if (partnerLocatorButton) {
      partnerLocatorButton.addEventListener('click', function () {
        google.maps.event.trigger(input, 'focus', {});
        partnerLocatorBlock.classList.remove('er-locations--init');
        partnerLocatorBlock.classList.add('er-locations--loading');
        partnerLocatorList.innerHTML = '';
        var listHtml = '';

        // Prepare data for POST
        var formData = new FormData();
        formData.append('action', 'search_locations');
        formData.append('nonce', locationSearchAjax.nonce); // nonce localized from PHP
        formData.append('lat', searchParams.lat);
        formData.append('lng', searchParams.lng);
        formData.append('radius', searchParams.radius);
        formData.append('city', searchParams.city);

        // Send AJAX request
        fetch(locationSearchAjax.ajax_url, {
          method: 'POST',
          body: formData,
          credentials: 'same-origin'
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.success) {
            // data.data is the array of locations
            if (data.data.length) {
              data.data.forEach(function (location) {
                listHtml += "\n                  <div class=\"er-locations__item\"\n                  data-title=\"".concat(location.title, "\"\n                  data-street=\"").concat(location.street, "\"\n                  data-street=\"").concat(location.postcode, "\"\n                  data-street=\"").concat(location.city, "\"\n                  data-lat=\"").concat(location.lat, "\"\n                  data-lng=\"").concat(location.lng, "\"\n                  data-phone=\"").concat(location.phone, "\"\n                  data-website=\"").concat(location.website, "\"\n                  data-email=\"").concat(location.email, "\"\n                  >\n                    <div class=\"er-locations__item-icon\"></div>\n                    <div class=\"er-locations__item-content\">\n                      <h4 class=\"er-locations__item-title\">").concat(location.title, "</h4>\n                      <p class=\"er-locations__item-address\">").concat(location.street, "<br>").concat(location.postcode, "<br>").concat(location.city, "</p>\n                      <div class=\"er-locations__item-contact\">") + (location.phone ? "<a class=\"er-locations__item-phone\" href=\"tel:".concat(location.phone, "\">").concat(location.phone, "</a>") : '') + (location.email ? "<a class=\"er-locations__item-email\" href=\"mailto:".concat(location.email, "\">").concat(location.email, "</a>") : '') + (location.website ? "<a class=\"er-locations__item-website\" href=\"".concat(location.website, "\" target=\"_blank\">").concat(location.website, "</a>") : '') + "</div>\n                    </div>\n                  </div>\n                ";
              });
              partnerLocatorList.innerHTML = listHtml;
              setTimeout(function () {
                refreshMarkers(map);
                centerMap(map);
              }, 100);
              //showPartnersWithinRadius(searchParams.lat, searchParams.lng, searchParams.radius);
              partnerLocatorBlock.classList.remove('er-locations--empty');
            } else {
              partnerLocatorBlock.classList.add('er-locations--empty');
              partnerLocatorList.innerHTML = listHtml;
            }
            partnerLocatorResultCounter.innerHTML = data.data.length;
            setTimeout(function () {
              partnerLocatorBlock.classList.remove('er-locations--loading');
            }, 2000);

            // Render your map markers here
          } else {
            alert('Location search error');
          }
        })["catch"](function (error) {
          console.error('AJAX error:', error);
          alert('AJAX error');
        });
      });
    }
  }
  function initMap(el) {
    var locations = document.querySelectorAll('.er-locations__item');
    var mapArgs = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(el, mapArgs);
    map.markers = [];
    return map;
  }
  function refreshMarkers(map) {
    var locations = document.querySelectorAll('.er-locations__item');

    // remove all markers from map
    for (var i = 0; i < map.markers.length; i++) {
      map.markers[i].setMap(null);
    }
    map.markers = [];
    locations.forEach(function (location) {
      initMarker(location, map);
    });
  }
  function initMarker(markerEl, map) {
    var lat = markerEl.getAttribute('data-lat');
    var lng = markerEl.getAttribute('data-lng');
    if (!lat || !lng) {
      return;
    }
    var bounds = {
      north: 53.55,
      // Germany’s northernmost latitude
      south: 47.30,
      // Belgium’s southernmost latitude
      east: 15.03,
      // Germany’s easternmost longitude
      west: 2.53 // Belgium’s westernmost longitude
    };
    if (parseFloat(lat) < bounds.south || parseFloat(lat) > bounds.north || parseFloat(lng) < bounds.west || parseFloat(lng) > bounds.east) {
      return;
    }
    var latLng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
    var icon = {
      url: '/wp-content/themes/hello-theme-child/dist/icons/google_maps_pin.svg',
      scaledSize: new google.maps.Size(30, 30),
      // scaled size
      origin: new google.maps.Point(0, 0),
      // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    // const iconActive = {
    //   url: '/wp-content/themes/enerix/icons/map-pin-active.png',
    //   scaledSize: new google.maps.Size(20, 20), // scaled size
    //   origin: new google.maps.Point(0, 0), // origin
    //   anchor: new google.maps.Point(0, 0), // anchor
    // };

    var marker = new google.maps.Marker({
      partnerId: markerEl.dataset.partnerId,
      position: latLng,
      map: map,
      content: markerEl.innerHTML,
      icon: icon
    });
    if (markerEl.innerHTML) {
      var infowindow = new google.maps.InfoWindow({
        partnerId: markerEl.dataset.partnerId,
        content: markerEl.innerHTML
      });
      marker.infowindow = infowindow;
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        //marker.setIcon(iconActive);
      });
      google.maps.event.addListener(infowindow, 'closeclick', function () {
        //marker.setIcon(icon);
      });
    }
    map.markers.push(marker);
  }

  // function centerOnPartner(map, partnerId) {
  //     let iconCenterActive = {
  //         url: '/wp-content/themes/enerix/icons/map-pin-active.png',
  //         scaledSize: new google.maps.Size(20, 20), // scaled size
  //         origin: new google.maps.Point(0, 0), // origin
  //         anchor: new google.maps.Point(0, 0) // anchor
  //     };

  //     map.markers.forEach(function (marker) {
  //         if (marker.partnerId == partnerId) {
  //             marker.setIcon(iconCenterActive);
  //             map.setCenter(marker.position);
  //             map.setZoom(12);
  //             marker.infowindow.open(map, marker);
  //         }
  //     });
  // }

  function centerMap(map) {
    var bounds = new google.maps.LatLngBounds();
    map.markers.forEach(function (marker) {
      bounds.extend({
        lat: marker.position.lat(),
        lng: marker.position.lng()
      });
    });
    if (map.markers.length == 1) {
      map.setZoom(15); // set a default zoom for single marker
      map.setCenter(bounds.getCenter());
    } else {
      map.fitBounds(bounds, 50); // add padding

      // Optional: limit max zoom after fitBounds
      google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
        var MIN_ZOOM = 9;
        if (map.getZoom() < MIN_ZOOM) {
          map.setZoom(MIN_ZOOM);
        }
      });
    }
  }
};

/***/ }),

/***/ "./src/js/micrositeHeader.js":
/*!***********************************!*\
  !*** ./src/js/micrositeHeader.js ***!
  \***********************************/
/***/ (() => {

var micrositeHeaderToggle = document.querySelector('.er-microsite-menu-toggle');
if (micrositeHeaderToggle) {
  console.log('microsite header toggle found');
  var siteNavigation = document.querySelector('.er-site-navigation');
  micrositeHeaderToggle.addEventListener('click', function () {
    var expanded = micrositeHeaderToggle.getAttribute('aria-expanded') === 'true' || false;
    micrositeHeaderToggle.setAttribute('aria-expanded', !expanded);
    siteNavigation.classList.toggle('active');
  });
}

/***/ }),

/***/ "./src/js/online-partners.js":
/*!***********************************!*\
  !*** ./src/js/online-partners.js ***!
  \***********************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var loopGrid = document.querySelector('.er-online-partner-loop');
  var searchInput = document.querySelector('.er-online-partner-search input');
  var searchInputButton = document.querySelector('.er-online-partner-search-button');
  var filterHelpCenter = function filterHelpCenter(search) {
    var loopGridItems = loopGrid.querySelectorAll('.e-loop-item');
    if (loopGridItems.length > 0) {
      loopGridItems.forEach(function (item) {
        var itemContent = item.textContent.toLowerCase();
        var searchQuery = search.toLowerCase();
        if (itemContent.includes(searchQuery)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  };
  if (searchInputButton) {
    searchInputButton.addEventListener('click', function () {
      filterHelpCenter(searchInput ? searchInput.value : '');
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      if (searchInput.value === '') {
        filterHelpCenter('');
      }
    });
    searchInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        filterHelpCenter(searchInput ? searchInput.value : '');
      }
    });
  }
  if (searchInput && loopGrid) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        filterHelpCenter(searchInput ? searchInput.value : '');
      });
    });
    observer.observe(loopGrid, {
      childList: true,
      subtree: true
    });
  }
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/js/app": 0,
/******/ 			"dist/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhello_elementor_child"] = self["webpackChunkhello_elementor_child"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/calculator.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/locations.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/help-center.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/online-partners.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/js/micrositeHeader.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dist/css/app"], () => (__webpack_require__("./src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map