import { jsx as t, jsxs as r, Fragment as A } from "react/jsx-runtime";
import me from "react-dom";
import { useContext as le, createContext as se, useState as k, useEffect as j, memo as pe, useRef as $ } from "react";
var Y = {}, te = me;
Y.createRoot = te.createRoot, Y.hydrateRoot = te.hydrateRoot;
/*!
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
const ce = (n, e) => {
  for (const a of Object.keys(e))
    e[a] instanceof Object && (e[a].length ? n[a] = e[a] : Object.assign(e[a], ce(n[a], e[a])));
  return Object.assign(n || {}, e), n;
}, W = () => le(oe), Ve = () => {
  const {
    options: { colors: n }
  } = W();
  return n ? /* @__PURE__ */ t("style", { children: `
        #eur-leasingcalc {
            --color-text: ${n.text};
            --color-text-required: ${n.textRequired};
            --color-input-required: ${n.inputRequired};
            --color-form-bg: ${n.formBg};
            --color-yes: ${n.yes};
            --color-no: ${n.no};
            --color-primary: ${n.primary};
            --color-button: ${n.button};
            --color-button-text: ${n.buttonText};
            --color-button-light: ${n.buttonLight};
            --color-text-light: ${n.textLight};
            --color-border: ${n.border};
            --color-input: ${n.input};
            --color-input-disabled: ${n.inputDisabled};
            --color-result-row-alternate: ${n.resultRowAlternate};
            --color-result-row-highlight: ${n.resultRowHighlight};
            --color-result-row-head: ${n.resultRowHead};
            --color-result-row-foot: ${n.resultRowFoot};
            --color-result-detail-button: ${n.resultDetailButton};
            --color-head-row-bg: ${n.headRowBg};
            --color-head-box-bg: ${n.headBoxBg};
            
        }
    ` }) : null;
}, oe = se({ options: {} });
function Se({
  options: n,
  defaultOptions: e,
  children: a
}) {
  const s = ce(
    e,
    n
  );
  return /* @__PURE__ */ r(oe.Provider, { value: { options: s }, children: [
    /* @__PURE__ */ t(Ve, {}),
    a
  ] });
}
function l(n) {
  const { options: e } = W(), a = e?.settings?.language;
  if (!a)
    return n;
  const s = e?.texts?.[a]?.[n];
  return s ? /* @__PURE__ */ t("span", { dangerouslySetInnerHTML: { __html: s } }) : n;
}
const P = ({ children: n, className: e }) => /* @__PURE__ */ t("div", { className: `flex max-md:flex-col gap-1 w-full ${e || ""}`, children: n }), x = ({ children: n, className: e }) => /* @__PURE__ */ t(
  "div",
  {
    className: `flex gap-1 w-full items-center grow ${e || ""} justify-start md:justify-start`,
    children: n
  }
), R = ({ children: n, strong: e }) => /* @__PURE__ */ t(
  "div",
  {
    className: `text-[--color-text] text-sm justify-start gap-3 grow min-w-30 w-[50%] max-md:w-full md:w-[40%] shrink-0 items-center flex pr-3 pl-0 max-md:pt-4 max-md:pb-2 text-sm ${e ? "text-bold" : ""}`,
    children: n
  }
), G = ({
  options: n = [],
  disabled: e,
  initialValue: a,
  onChange: s = () => {
  },
  type: i = "text",
  required: c = !1
}) => {
  const [d, h] = k(a), g = (b) => {
    const u = i === "number" ? parseFloat(b.target.value.toString()) : i === "bool" ? b.target.value === "true" ? "true" : "false" : b.target.value;
    h(u.toString()), s(u.toString());
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: "border border-[--color-border] w-full flex font-normal text-base ",
      children: n.length > 1 ? /* @__PURE__ */ t(
        "select",
        {
          onChange: g,
          defaultValue: String(d),
          className: `border-0 px-4 py-2 w-full border-r-8 border-r-transparent ${c && !d ? "bg-[--color-input-required]" : ""} ${e ? "cursor-not-allowed bg-[--color-input-disabled]" : "bg-[--color-input]"}`,
          children: n.map(({ name: b, optValue: u }) => /* @__PURE__ */ t("option", { value: u, children: b }, "key-" + u))
        }
      ) : /* @__PURE__ */ t(
        "p",
        {
          className: `color-black border-0 px-4 py-2 w-full ${e ? "cursor-not-allowed bg-[--color-input-disabled]" : "bg-[--color-input]"}`,
          children: n[0].name
        }
      )
    }
  );
}, w = ({
  initialValue: n = 0,
  calculatedValue: e,
  onChange: a = () => {
  },
  prefix: s = "",
  type: i,
  step: c = 1,
  min: d = 0,
  max: h = 1 / 0,
  disabled: g,
  placeholder: b = "",
  variant: u = "normal",
  required: T = !1
}) => {
  const [p, m] = k(n), [B, L] = k(!1);
  return j(() => {
    p > h && m(h);
  }, [h]), j(() => {
    e && !B && m(e);
  }, [e]), /* @__PURE__ */ r(
    "div",
    {
      className: `flex w-full items-center text-right border border-[--color-border] font-normal ${u !== "big" ? "text-sm" : "text-lg"} ${T && !p ? "bg-[--color-input-required]" : ""} ${g ? "bg-[--color-input-disabled]" : "bg-[--color-input]"}`,
      children: [
        /* @__PURE__ */ t("span", { className: "px-4 leading-none", children: s }),
        /* @__PURE__ */ t(
          "input",
          {
            placeholder: b,
            type: i,
            value: p,
            min: i === "number" ? d : 0,
            max: i === "number" ? h : 1 / 0,
            step: c,
            onChange: (Z) => {
              const V = i === "number" ? parseFloat(Z?.target?.value) : 0;
              L(!0), m(V);
            },
            onBlur: (Z) => {
              let V = i === "number" ? parseFloat(Z.target.value) : 0;
              i === "number" && (h && V > h && (V = h), d && V < d && (V = d), isNaN(V) && (V = d)), m(V), a(V);
            },
            disabled: g,
            className: `border-0 px-4 ${u === "big" ? "py-3.5" : "py-2"} bg-transparent text-right w-full`
          }
        )
      ]
    }
  );
}, O = ({
  size: n = "medium",
  type: e = "button",
  circle: a = !1,
  noPadding: s,
  loading: i,
  children: c,
  variant: d = "secondary",
  className: h,
  onClick: g
}) => /* @__PURE__ */ r(
  "button",
  {
    onClick: g,
    className: `${i ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto"} border-1 rounded-full font-display cursor-pointer self-center ${e === "link" ? "bg-transparent border-0 text-[--color-primary] font-normal" : d === "primary" ? "bg-[--color-button] text-[--color-button-text]" : d === "secondary" ? "bg-[--color-button-light] text-[--color-button-text]" : ""} ${n === "big" ? "text-lg" : n === "medium" ? "text-sm" : n === "small" || n === "mini" ? "text-xs" : ""} ${s ? "p-0" : e === "link" ? "px-0" : n === "big" ? "py-2 px-4" : n === "medium" ? "py-1.5 px-2 text-sm" : n === "small" ? "py-1.5 px-2 text-xs" : n === "mini" ? "px-1.5 py-1.5 text-xs" : ""} ${a ? "rounded-full shrink-0 aspect-square leading-[0px] inline-flex items-center justify-center" : ""} ${h || ""} `,
    children: [
      !i && c,
      /* @__PURE__ */ t("span", { className: `${i ? "inline" : "hidden"}`, children: l("loading") })
    ]
  }
), he = se({
  content: null,
  setContent: null
}), Be = () => le(he);
function ve({
  children: n
}) {
  const [e, a] = k(null), s = () => {
    a(null);
  };
  return /* @__PURE__ */ r(he.Provider, { value: { content: e, setContent: a }, children: [
    /* @__PURE__ */ t("div", { className: "z-10 relative", children: n }),
    /* @__PURE__ */ t(
      "div",
      {
        className: `fixed left-0 top-0 w-full h-full transition-all duration-200 ease-out bg-black/80 z-20 ${e ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        onClick: (i) => {
          s(), i.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          "div",
          {
            className: "transition-all duration-200 ease-out bg-white p-2 lg:p-8 rounded-md absolute left-1/2 top-1/2 right-auto bottom-auto max-h-[calc(100vh-50px)] w-[700px] max-w-[calc(100vw-20px)] flex overflow-auto -translate-y-1/2 -translate-x-1/2",
            onClick: (i) => {
              i.stopPropagation();
            },
            children: [
              /* @__PURE__ */ t(
                O,
                {
                  className: "absolute font-display top-0 right-0 rounded-full h-10 w-10 flex justify-center items-center bg-transparent text-black",
                  onClick: s,
                  children: "✕"
                }
              ),
              /* @__PURE__ */ t("div", { className: "w-full", children: e })
            ]
          }
        )
      }
    )
  ] });
}
const y = ({ children: n, buttonText: e, url: a }) => {
  const { setContent: s } = Be();
  return /* @__PURE__ */ t("span", { className: "relative", children: /* @__PURE__ */ t(
    O,
    {
      variant: "tertiary",
      size: e ? "medium" : "mini",
      type: e ? "link" : "button",
      circle: !e,
      onClick: () => {
        a ? window.open(a, "_blank") : s && s(n);
      },
      noPadding: !0,
      className: `${e ? "" : "ml-0 aspect-square leading-[0px]"} p-0 m-0 align-middle`,
      children: e || /* @__PURE__ */ t(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ t(
            "path",
            {
              d: "M9.325 15H10.825V9H9.325V15ZM10 7.15C10.2333 7.15 10.4292 7.075 10.5875 6.925C10.7458 6.775 10.825 6.58333 10.825 6.35C10.825 6.11667 10.7458 5.91667 10.5875 5.75C10.4292 5.58333 10.2333 5.5 10 5.5C9.76667 5.5 9.57083 5.58333 9.4125 5.75C9.25417 5.91667 9.175 6.11667 9.175 6.35C9.175 6.58333 9.25417 6.775 9.4125 6.925C9.57083 7.075 9.76667 7.15 10 7.15ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3583 0 9.975C0 8.60833 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.64167 0 10.025 0C11.3917 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10.025 18.5C12.375 18.5 14.375 17.6708 16.025 16.0125C17.675 14.3542 18.5 12.3417 18.5 9.975C18.5 7.625 17.675 5.625 16.025 3.975C14.375 2.325 12.3667 1.5 10 1.5C7.65 1.5 5.64583 2.325 3.9875 3.975C2.32917 5.625 1.5 7.63333 1.5 10C1.5 12.35 2.32917 14.3542 3.9875 16.0125C5.64583 17.6708 7.65833 18.5 10.025 18.5Z",
              fill: "black"
            }
          )
        }
      )
    }
  ) });
}, _ = () => {
  const {
    options: { settings: n }
  } = W(), { insurancePackages: e } = n || {}, a = [];
  e?.map(({ features: i }) => {
    if (i)
      for (const [c] of Object.entries(i))
        a.push(c);
    return a;
  });
  const s = [...new Set(a)];
  return /* @__PURE__ */ r("div", { className: "flex flex-col overflow-auto h-full w-full", children: [
    /* @__PURE__ */ t("h2", { className: "text-left", children: l("compareTableHeadline") }),
    /* @__PURE__ */ r("table", { className: "w-full border-collapse border-spacing-0", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ t("th", { className: "text-left max-w-24", children: l("compareTableRepairOrReplacement") }),
        e?.map(({ name: i, title: c }) => /* @__PURE__ */ t("th", { className: "text-left max-w-24", children: c }, i))
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: s.map((i) => /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ t("th", { className: "max-w-[200px]", children: l(`compareTable${i}`) }),
        e?.map(
          ({ name: c, features: d }) => {
            const h = d?.[i];
            return d instanceof Object ? c && /* @__PURE__ */ t("td", { className: "max-w-16 text-center", children: h === !0 ? /* @__PURE__ */ t(Ze, {}) : h === !1 ? /* @__PURE__ */ t(Pe, {}) : typeof h == "string" ? l(h) : "N/A" }, c) : /* @__PURE__ */ t("td", { className: "max-w-16 text-[#eee]", children: "N/A" });
          }
        )
      ] }, i)) })
    ] })
  ] });
}, Ze = () => {
  const { options: n } = W();
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${n?.colors?.yes ? "bg-[--color-yes]" : "bg-[#6edc6e]"} w-6 h-6 inline-flex items-center justify-center rounded-full text-white`,
      children: /* @__PURE__ */ t(
        "svg",
        {
          width: "16",
          height: "11",
          viewBox: "0 0 15 11",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ t(
            "path",
            {
              d: "M5.33336 8.64325L12.9934 0.982422L14.1725 2.16076L5.33336 10.9999L0.0300293 5.69659L1.20836 4.51826L5.33336 8.64325Z",
              fill: "currentColor",
              stroke: "currentColor",
              strokeWidth: "1"
            }
          )
        }
      )
    }
  );
}, Pe = () => /* @__PURE__ */ t("span", { className: "bg-[#ddd] font-display w-6 h-6 inline-flex items-center justify-center rounded-full text-white", children: "-" }), xe = ({
  onChange: n,
  onRemove: e,
  index: a,
  price: s = 0,
  uvp: i = 0,
  uid: c = 0,
  removeAvailable: d,
  isProduct: h,
  maxBikePrice: g,
  minBikePrice: b,
  extended: u
}) => {
  const [T, p] = k(s), [m, B] = k(i), L = (N) => {
    isNaN(N) && (N = 0), p(N), n({ index: a, row: { price: N, uvp: m, uid: c } });
  }, F = (N) => {
    isNaN(N) && (N = 0), B(N), n({ index: a, row: { price: T, uvp: N, uid: c } });
  };
  return u ? /* @__PURE__ */ r(A, { children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: `col-span-2 max-md:col-span-1 border-b border-b-[--color-border] pt-4 pb-2 mb-2 text-sm flex justify-between ${d ? "" : "hidden"}`,
        children: [
          "# ",
          a + 1,
          /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r(
            "div",
            {
              className: "flex justify-end items-center gap-2 text-xs cursor-pointer",
              onClick: () => e(a),
              children: [
                /* @__PURE__ */ t("span", { className: "opacity-30", children: l("removeBike") }),
                /* @__PURE__ */ t(
                  O,
                  {
                    variant: "primary",
                    noPadding: !0,
                    className: "rounded-none aspect-square w-5 leading-none text-xs",
                    children: "-"
                  }
                )
              ]
            }
          ) })
        ]
      }
    ),
    u && /* @__PURE__ */ t("div", { className: "whitespace-normal text-lg", children: l("totalPrice") }),
    /* @__PURE__ */ t("div", { className: "pb-4", children: /* @__PURE__ */ t(
      w,
      {
        type: "number",
        prefix: "€",
        min: b,
        max: g,
        placeholder: s.toString(),
        initialValue: s,
        onChange: L,
        disabled: h,
        variant: "big"
      }
    ) }),
    u && /* @__PURE__ */ t("div", { className: "text-lg", children: l("totalPriceUVP") }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
      w,
      {
        type: "number",
        min: b,
        max: g,
        prefix: "€",
        placeholder: m.toString(),
        initialValue: m,
        disabled: h,
        onChange: F,
        variant: "big"
      }
    ) })
  ] }) : /* @__PURE__ */ t("div", { className: "pb-5", children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
    w,
    {
      type: "number",
      min: b,
      max: g,
      prefix: "€",
      placeholder: m.toString(),
      initialValue: m,
      disabled: h,
      onChange: (N) => {
        F(N), L(N);
      }
    }
  ) }) });
}, Ne = pe(
  ({
    initialValueUvp: n = 0,
    initialValue: e = 0,
    onChange: a = () => {
    },
    maxBikes: s,
    extended: i,
    maxBikePrice: c = 1 / 0
  }) => {
    const { options: d } = W(), { settings: h } = d, g = $(0), b = {
      price: e,
      uvp: n,
      uid: g.current
    }, u = $([b]), T = $({ total: e, totalUvp: n }), p = () => {
      if (u.current.length < 1)
        return;
      let Z = 0, V = 0;
      u.current.map(({ price: M, uvp: C }) => (Z += M, V += C, null)), T.current.total = Z, T.current.totalUvp = V;
      const E = u.current.length;
      a({
        totalPrice: Z,
        totalPriceUVP: V,
        bikeCount: E,
        bikeRows: u.current
      });
    };
    if (!h)
      return null;
    const { minBikePrice: m } = h, { isProduct: B } = h, L = () => {
      const Z = [...u.current];
      Z.length >= s || (Z.push({ ...b, uid: ++g.current }), u.current = Z, p());
    }, F = (Z) => {
      const V = [...u.current];
      V.splice(Z, 1), u.current = V, p();
    }, N = ({ index: Z, row: V }) => {
      const E = [...u.current];
      E[Z] = V, u.current = E, p();
    };
    return /* @__PURE__ */ r("div", { className: "w-full", children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: `mt-2 pt-4 w-full content-center grid ${i ? "grid-cols-2 max-md:grid-cols-1" : "grid-cols-1"} gap-4 items-center`,
          children: u.current.map(({ price: Z, uvp: V, uid: E }, M) => /* @__PURE__ */ t(
            xe,
            {
              maxBikePrice: c || 1 / 0,
              minBikePrice: m || 0,
              price: Z,
              uvp: V,
              onChange: N,
              onRemove: F,
              uid: E,
              index: M,
              removeAvailable: u.current.length > 1,
              isProduct: B || !1,
              extended: i
            },
            "row" + E
          ))
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: `mt-4 pt-4 ${i ? "block" : "hidden"} border-t border-t-[--color-border]`,
          children: u.current.length < s && /* @__PURE__ */ r(
            "div",
            {
              className: "flex justify-end items-center gap-2 text-md cursor-pointer",
              onClick: L,
              children: [
                /* @__PURE__ */ t("span", { className: "opacity-50", children: l("addBike") }),
                /* @__PURE__ */ t(
                  O,
                  {
                    variant: "primary",
                    noPadding: !0,
                    className: "rounded-none aspect-square w-5 leading-none text-xs",
                    children: "+"
                  }
                )
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: `${s > 1 && u.current.length > 1 ? "" : "hidden"}`,
          children: /* @__PURE__ */ r("div", { className: `py-4 text-right ${i ? "block" : "hidden"}`, children: [
            l("sumBikes"),
            ":",
            " ",
            T.current.total.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR"
            }),
            " ",
            "/",
            " ",
            T.current.totalUvp.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR"
            }),
            " ",
            "(",
            l("UVP"),
            ")"
          ] })
        }
      )
    ] });
  },
  (n, e) => !(n.extended !== e.extended || n.sendParams !== e.sendParams)
), D = ({ onChange: n = () => {
}, initialValue: e }) => {
  const [a, s] = k(
    typeof e == "boolean" ? e : e === "AG"
  );
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r(
    "div",
    {
      onClick: () => {
        const c = !a;
        s(c), n(c);
      },
      className: `relative text-sm h-10 select-none justify-between items-center inline-flex w-28 border-0 p-2 cursor-pointertext-white transition-all text-white ${a === !0 ? "bg-[--color-yes]" : "bg-[--color-no]"}`,
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: `absolute h-6 w-12 shrink-0 bg-white z-10 ${a === !0 ? "left-[calc(100%-58px)]" : "left-[5px]"} transition-all`
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: `px-2 text-center flex-grow transition-opacity ${a === !0 ? "opacity-100" : "opacity-0"}`,
            children: "Ja"
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: `px-2 text-center flex-grow transition-opacity ${a === !0 ? "opacity-0" : "opacity-100"}`,
            children: "Nein"
          }
        )
      ]
    }
  ) });
}, Re = ({ children: n }) => /* @__PURE__ */ t("div", { className: "flex flex-col gap-4 relative w-full max-w-[1200px] min-w-[375px] bg-[--color-form-bg] text-[--color-text] rounded-lg", children: n }), J = ({ noBorder: n, children: e, className: a }) => /* @__PURE__ */ t(
  "div",
  {
    className: `flex flex-col px-10 max-md:px-4 gap-4 ${n ? "border-0 border-[--color-border] border-b-1" : ""} ${a || ""}`,
    children: e
  }
), ue = 1.19, Q = (n) => n / ue, ne = (n) => n * ue;
function o(n) {
  return n === void 0 ? "-- €" : n.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR"
  });
}
function U(n) {
  return n === void 0 ? "-- %" : n.toFixed(0) + "%";
}
const q = ({ children: n, className: e }) => /* @__PURE__ */ t(
  "div",
  {
    className: `flex-grow w-1/3 text-left px-4 py-3 flex flex-col min-w-150 border-l border-[--color-border] ${e || ""}`,
    children: n
  }
), re = ({ bikePrices: n, withBikes: e }) => /* @__PURE__ */ r("div", { children: [
  /* @__PURE__ */ t("h3", { children: l("yourPrice") }),
  /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r("table", { children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ r("tr", { className: "", children: [
      /* @__PURE__ */ t("th", {}),
      /* @__PURE__ */ t("th", { children: l("leasingRateTotal") }),
      /* @__PURE__ */ t("th", { children: l("realNetShort") })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: /* @__PURE__ */ r("tr", { className: "hightlight", children: [
      /* @__PURE__ */ t("th", { children: l("comparisonLeasingRate") }),
      /* @__PURE__ */ t("td", { children: o(n?.leasingRate) }),
      /* @__PURE__ */ t("td", { children: o(e?.leasingRate) })
    ] }) })
  ] }) })
] }), Le = ({ results: n }) => {
  const { comparison: e, inputParams: a, savings: s, bikePrices: i } = n || {}, { withBikes: c } = e || {}, { options: d } = W(), { settings: h } = d, { repairCost: g } = h || {};
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ t("h3", { className: "pr-8", children: l("comparisonPurchaseToLeasing") }),
    g && /* @__PURE__ */ r("p", { className: "text-sm mb-2", children: [
      l("insuranceCostInclusive1"),
      " ",
      o(g),
      " ",
      l("insuranceCostInclusive2"),
      " (",
      l("insuranceCostExplaination"),
      ")"
    ] }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r("table", { className: "[&_td]:text-right", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ r("tr", { className: "", children: [
        /* @__PURE__ */ t("th", {}),
        /* @__PURE__ */ t("th", { children: l("purchase") }),
        /* @__PURE__ */ t("th", { children: l("leasing") })
      ] }) }),
      /* @__PURE__ */ r("tbody", { children: [
        /* @__PURE__ */ r("tr", { className: "border-top ", children: [
          /* @__PURE__ */ t("th", { children: l("leasingRateWithBike") }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            a?.leasingPeriod,
            " ",
            l("months"),
            " ×",
            " ",
            o(c?.leasingRate),
            " ",
            /* @__PURE__ */ t("br", {}),
            "= ",
            o(c?.leasingTotal)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "", children: [
          /* @__PURE__ */ t("th", { children: l("takeoverPrice") }),
          /* @__PURE__ */ t("td", { children: o(i?.bikePrice) }),
          /* @__PURE__ */ t("td", { children: o(c?.takeoverPrice) })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("totalCostInclInsurance") }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(i?.bikesPlusRepair)
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(c?.totalCost)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("savingsAgainstPurchase") }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { colSpan: 2, children: [
            o(i?.bikesPlusRepair),
            " ",
            /* @__PURE__ */ t("br", {}),
            "- ",
            o(c?.totalCost),
            /* @__PURE__ */ t("br", {}),
            "= ",
            o(s?.savingsAbsolute)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("savingsPercent") }),
          /* @__PURE__ */ r("td", { colSpan: 2, children: [
            "1 - (",
            o(c?.totalCost),
            ")  / ",
            o(i?.bikesPlusRepair),
            ")",
            /* @__PURE__ */ t("br", {}),
            "= ",
            U(s?.savingsPercent)
          ] })
        ] })
      ] })
    ] }) })
  ] });
}, Ee = ({ bikePrices: n }) => /* @__PURE__ */ r("div", { children: [
  /* @__PURE__ */ t("h3", { className: "pr-8", children: l("calculationLeasingCosts") }),
  /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r("table", { className: "[&_td]:text-right", children: [
    /* @__PURE__ */ r("tbody", { children: [
      /* @__PURE__ */ r("tr", { className: "hightlight", children: [
        /* @__PURE__ */ r("th", { children: [
          l("leasingRate"),
          " ",
          l("leasingRateAddition")
        ] }),
        /* @__PURE__ */ t("td", { children: n && o(
          n?.leasingRate - n?.leasingRateInsurancePerMonth
        ) })
      ] }),
      n?.leasingRateInsurancesPerBike?.map(
        ({
          leasinginsurancePerMonth: e
        }, a) => /* @__PURE__ */ r("tr", { className: "hightlight", children: [
          /* @__PURE__ */ r("th", { children: [
            l("leasinginsurancePerMonth"),
            " ",
            l("forBike"),
            " #",
            a + 1
          ] }),
          /* @__PURE__ */ t("td", { children: o(e) })
        ] }, a + e)
      )
    ] }),
    /* @__PURE__ */ t("tfoot", { children: /* @__PURE__ */ r("tr", { className: "", children: [
      /* @__PURE__ */ t("th", { children: l("leasingPriceTotal") }),
      /* @__PURE__ */ r("th", { className: "text-right", children: [
        /* @__PURE__ */ t("span", { className: "font-normal", children: l("exclVat") }),
        " ",
        o(n?.leasingRate)
      ] })
    ] }) })
  ] }) })
] }), de = ({
  bikePrices: n,
  useFullBikeUvpPrice: e
}) => /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r("table", { className: "[&_td]:text-right", children: [
  /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ r("tr", { className: "", children: [
    /* @__PURE__ */ t("th", { children: l("calculationPlusNonCashBenefit") }),
    /* @__PURE__ */ t("th", {})
  ] }) }),
  /* @__PURE__ */ r("tbody", { children: [
    /* @__PURE__ */ r("tr", { className: "hightlight", children: [
      /* @__PURE__ */ t("th", { children: l("totalPriceUVP") }),
      /* @__PURE__ */ t("td", { children: o(n?.bikePrice) })
    ] }),
    !e && /* @__PURE__ */ r("tr", { className: "hightlight", children: [
      /* @__PURE__ */ r("th", { children: [
        l("quarterPriceUVP"),
        /* @__PURE__ */ r(y, { children: [
          /* @__PURE__ */ t("h2", { children: l("quarterPriceUVP") }),
          /* @__PURE__ */ t("p", { children: l("quarterPriceUVPHintText") })
        ] })
      ] }),
      /* @__PURE__ */ t("td", { children: o(n?.bikePriceQuarterUvp) })
    ] }),
    /* @__PURE__ */ r("tr", { className: "hightlight", children: [
      /* @__PURE__ */ t("th", { children: l("referenceValueNonCashBenefit") }),
      /* @__PURE__ */ t("td", { children: n?.bikePricePercentFull && o(Math.round(n?.bikePricePercentFull) * 100) })
    ] })
  ] }),
  /* @__PURE__ */ t("tfoot", { children: /* @__PURE__ */ r("tr", { className: "", children: [
    /* @__PURE__ */ t("th", { children: l("nonCashBenefitAccordingToOnePercentRule") }),
    /* @__PURE__ */ t("th", { className: "text-right", children: o(n?.bikePricePercent) })
  ] }) })
] }) }) }), be = ({ results: n, extended: e }) => {
  const [a, s] = k(e), [i, c] = k(!1), [d, h] = k(!1), { comparison: g, inputParams: b, settings: u, bikePrices: T, benefit: p } = n || {}, { withBikes: m, withoutBikes: B } = g || {};
  return /* @__PURE__ */ r(A, { children: [
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ r("table", { className: "[&_td]:text-right", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ r("tr", { className: "", children: [
        /* @__PURE__ */ t("th", { children: l("comparisonWithToWithoutBike") }),
        /* @__PURE__ */ t("th", { className: "text-right", children: l("withoutBikes") }),
        /* @__PURE__ */ t("th", { className: "text-right", children: l("withBikes") })
      ] }) }),
      /* @__PURE__ */ r("tbody", { children: [
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: n?.inputParams?.workTypeOfficial ? l("salaryGrossOfficial") : l("salaryGross") }),
          /* @__PURE__ */ t("td", { children: o(b?.salaryGross) }),
          /* @__PURE__ */ t("td", { children: o(b?.salaryGross) })
        ] }),
        /* @__PURE__ */ r("tr", { children: [
          /* @__PURE__ */ r("th", { children: [
            l("leasingRate"),
            " ",
            l("leasingRateAddition")
          ] }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(T?.leasingRate)
          ] })
        ] }),
        /* @__PURE__ */ r(
          "tr",
          {
            className: `${p?.other && p?.other > 0 ? "" : "hidden"}`,
            children: [
              /* @__PURE__ */ t("th", { children: l("benefitOther") }),
              /* @__PURE__ */ r("td", { children: [
                "+ ",
                o(p?.other)
              ] }),
              /* @__PURE__ */ r("td", { children: [
                "+ ",
                o(p?.other)
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r(
          "tr",
          {
            className: `${p?.bikes && p?.bikes > 0 ? "" : "hidden"}`,
            children: [
              /* @__PURE__ */ t("th", { children: l("benefitTable") }),
              /* @__PURE__ */ t("td", {}),
              /* @__PURE__ */ r("td", { children: [
                "+ ",
                o(p?.bikes)
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r(
          "tr",
          {
            className: `${T?.bikePriceVatToSubtract && T?.bikePriceVatToSubtract > 0 ? "" : "hidden"}`,
            children: [
              /* @__PURE__ */ t("th", { children: l("bikePriceVatToSubtract") }),
              /* @__PURE__ */ t("td", {}),
              /* @__PURE__ */ r("td", { children: [
                "- ",
                o(T?.bikePriceVatToSubtract)
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("salaryWithBikes") }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(m?.salaryGross)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { children: [
          /* @__PURE__ */ r("th", { children: [
            l("plusNonCashBenefit"),
            " ",
            /* @__PURE__ */ t(y, { children: /* @__PURE__ */ t(
              de,
              {
                bikePrices: T,
                useFullBikeUvpPrice: u?.useFullBikeUvpPrice || !1
              }
            ) })
          ] }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            "+ ",
            o(T?.bikePricePercent)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("taxBasis") }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(B?.taxBasis)
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(m?.taxBasis)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { children: [
          /* @__PURE__ */ t("th", { children: /* @__PURE__ */ r("div", { className: "flex flex-nowrap gap-3", children: [
            /* @__PURE__ */ t(
              O,
              {
                size: "mini",
                noPadding: !0,
                className: "rounded-none aspect-square w-5 leading-none text-xs",
                variant: "primary",
                circle: !0,
                onClick: () => c(!i),
                children: i ? "-" : "+"
              }
            ),
            " ",
            l("taxes")
          ] }) }),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(B?.contributions?.taxes?.total)
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(m?.contributions?.taxes?.total)
          ] })
        ] }),
        i && /* @__PURE__ */ r(A, { children: [
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("churchTax") }),
            /* @__PURE__ */ t("td", { children: o(B?.contributions?.taxes?.church) }),
            /* @__PURE__ */ t("td", { children: o(m?.contributions?.taxes?.church) })
          ] }),
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("solidarityTax") }),
            /* @__PURE__ */ t("td", { children: o(B?.contributions?.taxes?.soli) }),
            /* @__PURE__ */ t("td", { children: o(m?.contributions?.taxes?.soli) })
          ] }),
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("incomeTax") }),
            /* @__PURE__ */ t("td", { children: o(B?.contributions?.taxes?.income) }),
            /* @__PURE__ */ t("td", { children: o(m?.contributions?.taxes?.income) })
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { children: [
          /* @__PURE__ */ t("th", { children: /* @__PURE__ */ r("div", { className: "flex flex-nowrap gap-3", children: [
            /* @__PURE__ */ t(
              O,
              {
                size: "mini",
                noPadding: !0,
                className: "rounded-none aspect-square w-5 leading-none text-xs",
                variant: "primary",
                circle: !0,
                onClick: () => h(!d),
                children: d ? "-" : "+"
              }
            ),
            " ",
            l("socialInsurances")
          ] }) }),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(
              B?.contributions?.insurances?.employee?.total
            )
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(
              m?.contributions?.insurances?.employee?.total
            )
          ] })
        ] }),
        d && /* @__PURE__ */ r(A, { children: [
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("unemploymentInsurance") }),
            /* @__PURE__ */ t("td", { children: o(
              B?.contributions?.insurances?.employee?.aVers
            ) }),
            /* @__PURE__ */ t("td", { children: o(
              m?.contributions?.insurances?.employee?.aVers
            ) })
          ] }),
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("pensionInsurance") }),
            /* @__PURE__ */ t("td", { children: o(
              B?.contributions?.insurances?.employee?.rVers
            ) }),
            /* @__PURE__ */ t("td", { children: o(
              m?.contributions?.insurances?.employee?.rVers
            ) })
          ] }),
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("careInsurance") }),
            /* @__PURE__ */ t("td", { children: o(
              B?.contributions?.insurances?.employee?.pVers
            ) }),
            /* @__PURE__ */ t("td", { children: o(
              m?.contributions?.insurances?.employee?.pVers
            ) })
          ] }),
          /* @__PURE__ */ r("tr", { children: [
            /* @__PURE__ */ t("th", { className: "indent", children: l("healthInsurance") }),
            /* @__PURE__ */ t("td", { children: o(
              B?.contributions?.insurances?.employee?.kVers
            ) }),
            /* @__PURE__ */ t("td", { children: o(
              m?.contributions?.insurances?.employee?.kVers
            ) })
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate", children: [
          /* @__PURE__ */ t("th", { children: l("salaryNet") }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(B?.contributions?.salaryNet)
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(m?.contributions?.salaryNet)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { children: [
          /* @__PURE__ */ t("th", { children: l("minusNonCashBenefit") }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            "- ",
            o(T?.bikePricePercent)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate font-display", children: [
          /* @__PURE__ */ t("th", { children: l("payout") }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(B?.contributions?.salaryNet)
          ] }),
          /* @__PURE__ */ r("td", { children: [
            "= ",
            o(m?.salaryNet)
          ] })
        ] }),
        /* @__PURE__ */ r("tr", { className: "alternate font-display text-lg", children: [
          /* @__PURE__ */ t("th", { children: l("realNet") }),
          /* @__PURE__ */ t("td", {}),
          /* @__PURE__ */ r("td", { children: [
            o(B?.contributions?.salaryNet),
            " ",
            /* @__PURE__ */ t("br", {}),
            "-",
            " ",
            o(m?.salaryNet),
            /* @__PURE__ */ t("br", {}),
            "= ",
            o(m?.leasingRate)
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "text-center py-4 hidden", children: /* @__PURE__ */ t(O, { onClick: () => s(!a), type: "link", children: a ? /* @__PURE__ */ r(A, { children: [
      l("showOnlySummary"),
      " -"
    ] }) : /* @__PURE__ */ r(A, { children: [
      l("showExtended"),
      " +"
    ] }) }) })
  ] });
}, Ae = ({
  bikePrices: n,
  withBikes: e,
  results: a
}) => {
  const { leasingPeriod: s } = a?.inputParams || {};
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ t("h3", { className: "pr-8", children: l("comparisonLeasingCostTotal") }),
    /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t("table", { className: "[&_td]:text-right", children: /* @__PURE__ */ r("tbody", { children: [
      /* @__PURE__ */ r("tr", { className: "hightlight", children: [
        /* @__PURE__ */ t("th", { children: l("comparisonLeasingCostTotalNormal") }),
        /* @__PURE__ */ r("td", { children: [
          o(n?.leasingRate),
          " × ",
          s,
          " ",
          l("months"),
          /* @__PURE__ */ t("br", {}),
          "= ",
          o(n?.leasingRateNormalTotal)
        ] })
      ] }),
      /* @__PURE__ */ r("tr", { className: "hightlight", children: [
        /* @__PURE__ */ t("th", { children: l("comparsionLeasingCostViaSalary") }),
        /* @__PURE__ */ r("td", { children: [
          o(e?.leasingRate),
          " × ",
          s,
          " ",
          l("months"),
          /* @__PURE__ */ t("br", {}),
          "= ",
          o(e?.leasingTotal)
        ] })
      ] }),
      /* @__PURE__ */ r("tr", { className: "hightlight", children: [
        /* @__PURE__ */ t("th", { children: l("savingsLeasingAbsolute") }),
        /* @__PURE__ */ r("td", { children: [
          o(n?.leasingRateNormalTotal),
          " - ",
          o(e?.leasingTotal),
          /* @__PURE__ */ t("br", {}),
          "= ",
          o(a?.savings?.savingsLeasingAbsolute)
        ] })
      ] }),
      /* @__PURE__ */ r("tr", { className: "hightlight", children: [
        /* @__PURE__ */ t("th", { children: l("savingsLeasingPercent") }),
        /* @__PURE__ */ r("td", { children: [
          "1 - (",
          o(e?.leasingTotal),
          " / ",
          o(n?.leasingRateNormalTotal),
          ")",
          /* @__PURE__ */ t("br", {}),
          "= ",
          U(a?.savings?.savingsLeasingPercent)
        ] })
      ] })
    ] }) }) })
  ] });
}, ye = ({ results: n, extended: e, layout: a = "rows" }) => a === "rows" ? /* @__PURE__ */ t(Fe, { extended: e, results: n }) : /* @__PURE__ */ t(ke, { extended: e, results: n }), ke = ({ results: n, extended: e }) => {
  const { comparison: a, inputParams: s, savings: i, bikePrices: c, settings: d } = n || {}, { withBikes: h } = a || {};
  let g = "";
  return d?.insurancePackages?.map(({ name: b, title: u }) => (b === s?.insurancePackage && (g = u || ""), g)), /* @__PURE__ */ r("div", { className: "max-w-full", children: [
    /* @__PURE__ */ r("div", { className: "shadow-lg rounded-lg my-4 p-4 bg-white", children: [
      e ? /* @__PURE__ */ r(A, { children: [
        /* @__PURE__ */ t("h2", { className: "text-center text-xl mb-2", children: l("yourPriceIndividual") }),
        /* @__PURE__ */ r("p", { className: "mt-2", children: [
          "(",
          l("incl"),
          " ",
          g,
          "-",
          l("package"),
          /* @__PURE__ */ t(y, { url: d?.linkToInsurances, children: /* @__PURE__ */ t(_, {}) }),
          ")"
        ] })
      ] }) : /* @__PURE__ */ t("h2", { className: "text-center text-xl mb-2", children: l("yourPrice") }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap", children: [
        /* @__PURE__ */ r(q, { className: "border-l-0", children: [
          /* @__PURE__ */ t("div", { className: "text-3xl text-[--color-primary]", children: o(h?.leasingRate) }),
          /* @__PURE__ */ r("div", { className: "text-md", children: [
            "(",
            l("instead"),
            " ",
            o(c?.leasingRate),
            ")"
          ] }),
          /* @__PURE__ */ t("div", { className: "text-xs py-2 text-[--color-text-light]", children: l("monthly") }),
          c && /* @__PURE__ */ r(y, { buttonText: l("showDetails"), children: [
            /* @__PURE__ */ t("div", { className: "pb-6", children: /* @__PURE__ */ t(Ee, { bikePrices: c }) }),
            /* @__PURE__ */ t(re, { bikePrices: c, withBikes: h })
          ] })
        ] }),
        /* @__PURE__ */ r(q, { children: [
          /* @__PURE__ */ t("div", { className: "text-3xl text-[--color-primary]", children: U(i?.savingsLeasingPercent) }),
          /* @__PURE__ */ r("div", { className: "text-md", children: [
            "(-",
            o(i?.savingsLeasingAbsolute),
            ")"
          ] }),
          /* @__PURE__ */ r("div", { className: "text-xs py-2 text-[--color-text-light]", children: [
            l("saving"),
            " ",
            l("againstLeasing")
          ] }),
          c && /* @__PURE__ */ r(y, { buttonText: l("showDetails"), children: [
            /* @__PURE__ */ t("div", { className: "pb-6", children: /* @__PURE__ */ t(re, { bikePrices: c, withBikes: h }) }),
            /* @__PURE__ */ t(
              Ae,
              {
                bikePrices: c,
                withBikes: h,
                results: n
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r(q, { children: [
          /* @__PURE__ */ t("div", { className: "text-3xl text-[--color-primary]", children: U(i?.savingsPercent) }),
          /* @__PURE__ */ r("div", { className: "text-md", children: [
            "(-",
            o(i?.savingsAbsolute),
            ")"
          ] }),
          /* @__PURE__ */ r("div", { className: "text-xs py-2 text-[--color-text-light]", children: [
            l("saving"),
            " ",
            l("againstPurchase")
          ] }),
          n?.comparison && /* @__PURE__ */ t(y, { buttonText: l("showDetails"), children: /* @__PURE__ */ t(Le, { results: n }) })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-center pt-4", children: n?.comparison && /* @__PURE__ */ r(y, { buttonText: l("showCalculation"), children: [
        /* @__PURE__ */ t("h3", { children: l("comparisonWithToWithoutBike") }),
        /* @__PURE__ */ t(be, { results: n })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "text-lg text-[--color-text-light]", children: l("smallText") })
  ] });
}, Fe = ({ results: n }) => {
  const { comparison: e, inputParams: a, savings: s, bikePrices: i, settings: c } = n || {};
  let d = "";
  c?.insurancePackages?.map(({ name: b, title: u }) => (b === a?.insurancePackage && (d = u || ""), d));
  const h = c?.insurancePackages?.find(
    (b) => b.name === a?.insurancePackage
  )?.title, g = `${l("leasinginsurancePerMonth")} ${l("forBike")} #`;
  return /* @__PURE__ */ r("div", { className: "max-w-full", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col items-stretch", children: [
      /* @__PURE__ */ r("div", { className: "border-l-0 flex text-sm justify-between w-full bg-[--color-result-row-highlight] py-8 px-10 max-md:px-4 pb-4 border-b", children: [
        /* @__PURE__ */ t("div", { children: l("leasingRate") }),
        /* @__PURE__ */ t("div", { children: o(i?.leasingRateWithoutInsuranceNet) })
      ] }),
      i?.leasingRateInsurancesPerBike?.map(
        ({ leasinginsurancePerMonthNet: b }, u) => /* @__PURE__ */ r(
          "div",
          {
            className: "border-l-0 text-sm flex justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b",
            children: [
              /* @__PURE__ */ r("div", { className: "flex gap-2 items-center flex-wrap", children: [
                /* @__PURE__ */ r("div", { children: [
                  g,
                  u + 1
                ] }),
                /* @__PURE__ */ t(
                  y,
                  {
                    buttonText: `(${h}-Paket)`,
                    url: c?.linkToInsurances,
                    children: /* @__PURE__ */ t(_, {})
                  }
                )
              ] }),
              /* @__PURE__ */ t("div", { children: o(b) })
            ]
          },
          u
        )
      ),
      /* @__PURE__ */ r("div", { className: "border-l-0 flex text-sm justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b", children: [
        /* @__PURE__ */ r("div", { className: "flex gap-2 items-center flex-wrap", children: [
          /* @__PURE__ */ t("div", { children: l("leasingPriceTotal") }),
          /* @__PURE__ */ t(
            y,
            {
              buttonText: `(${h}-Paket)`,
              url: c?.linkToInsurances,
              children: /* @__PURE__ */ t(_, {})
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "text-sm items-end", children: /* @__PURE__ */ t("div", { children: o(i?.leasingRate) }) })
      ] }),
      /* @__PURE__ */ r("div", { className: "border-l-0 text-xl font-display flex justify-between items-center w-full py-8 px-10 max-md:px-4 border-b border-l border-l-4 border-l-[--color-primary]", children: [
        /* @__PURE__ */ r("div", { className: "flex gap-2 items-center flex-wrap", children: [
          /* @__PURE__ */ t("div", { children: l("leasingRateWithBike") }),
          /* @__PURE__ */ t(
            y,
            {
              buttonText: `(inkl. ${h}-Paket)`,
              url: c?.linkToInsurances,
              children: /* @__PURE__ */ t(_, {})
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col items-end", children: /* @__PURE__ */ t("div", { children: o(e?.withBikes?.leasingRate) }) })
      ] }),
      /* @__PURE__ */ r("div", { className: "border-l-0 text-sm flex justify-between items-center w-full bg-[--color-result-row-highlight] py-4 px-10 max-md:px-4 border-b", children: [
        /* @__PURE__ */ r("div", { className: "", children: [
          l("saving"),
          " ",
          l("againstPurchase")
        ] }),
        /* @__PURE__ */ r("div", { className: "flex flex-col items-end", children: [
          /* @__PURE__ */ r("div", { children: [
            o(s?.savingsAbsolute),
            "*"
          ] }),
          /* @__PURE__ */ t("div", { children: U(s?.savingsPercent) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "text-lg max-md:text-sm py-10 max-md:py-4 [&_p+p]:mt-3", children: l("smallText") }),
    /* @__PURE__ */ t(we, { results: n, bikePrices: i })
  ] });
}, we = ({
  results: n,
  bikePrices: e
}) => {
  const [a, s] = k(!1);
  return j(() => {
    s(!!n?.comparison);
  }, [n?.comparison]), /* @__PURE__ */ r(A, { children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: "border-l border-l-4 border-l-[--color-primary] bg-[--color-result-detail-button] p-8 mt-4 uppercase text-xl font-display flex justify-between cursor-pointer",
        onClick: () => s(!a),
        children: [
          /* @__PURE__ */ t("span", { children: l("showExtended") }),
          " ",
          /* @__PURE__ */ t("span", { children: a ? "-" : "+" })
        ]
      }
    ),
    /* @__PURE__ */ r("div", { className: `flex flex-col gap-4 ${a ? "" : "hidden"}`, children: [
      /* @__PURE__ */ t(de, { bikePrices: e }),
      /* @__PURE__ */ t(be, { extended: !0, results: n })
    ] })
  ] });
};
class Me {
  constructor() {
    this.init();
  }
  // initialize the whole stuff
  init() {
    const e = this;
    e.debugmode = !1, e.prepareDataObject();
  }
  prepareDataObject() {
    const e = this;
    e.AF = 0, e.AJAHR = 0, e.ALTER1 = 0, e.ENTSCH = 0, e.F = 1, e.JFREIB = 0, e.JHINZU = 0, e.JRE4 = 0, e.JRE4ENT = 0, e.JVBEZ = 0, e.KRV = 0, e.KVZ = 1, e.LZZ = 2, e.LZZFREIB = 0, e.LZZHINZU = 0, e.MBV = 0, e.PKPV = 0, e.PKV = 0, e.PVS = 0, e.PVZ = 0, e.R = 0, e.RE4 = 0, e.SONSTB = 0, e.SONSTENT = 0, e.STERBE = 0, e.STKL = 0, e.VBEZ = 0, e.VBEZM = 0, e.VBEZS = 0, e.VBS = 0, e.VJAHR = 0, e.VKAPA = 0, e.VMT = 0, e.ZKF = 0, e.ZMVB = 0, e.LST1, e.LST2, e.LST3, e.LSTOSO, e.LSTSO = 0, e.BK = 0, e.BKS = 0, e.BKV = 0, e.LSTLZZ = 0, e.SOLZLZZ = 0, e.SOLZS = 0, e.SOLZV = 0, e.STS = 0, e.STV = 0, e.VKVLZZ = 0, e.VKVSONST = 0, e.VFRB = 0, e.VFRBS1 = 0, e.VFRBS2 = 0, e.WVFRB = 0, e.WVFRB = 0, e.WVFRBM = 0, e.ALTE = 0, e.ANP = 0, e.ANTEIL1 = 0, e.BMG = 0, e.BBGKVPV = 0, e.BBGRV = 0, e.DIFF = 0, e.EFA = 0, e.FVB = 0, e.FVBSO = 0, e.FVBZ = 0, e.FVBZSO = 0, e.GFB = 0, e.HBALTE = 0, e.HFVB = 0, e.HFVBZ = 0, e.HFVBZSO = 0, e.HOCH = 0, e.J = 0, e.JBMG = 0, e.JLFREIB = 0, e.JLHINZU = 0, e.JW = 0, e.K = 0, e.KENNVMT = 0, e.KFB = 0, e.KVSATZAG = 0, e.KVSATZAN = 0, e.KZTAB = 0, e.LSTJAHR = 0, e.LST1, e.LST2, e.LST3, e.LSTOSO, e.LSTSO = 0, e.MIST = 0, e.PVSATZAG = 0, e.PVSATZAN = 0, e.RVSATZAN = 0, e.RW = 0, e.SAP = 0, e.SOLZFREI = 0, e.SOLZJ = 0, e.SOLZMIN = 0, e.SOLZSBMG = 0, e.SOLZSZVE = 0, e.SOLZVBMG = 0, e.ST = 0, e.ST1 = 0, e.ST2 = 0, e.STOVMT = 0, e.VBEZB = 0, e.VBEZBSO = 0, e.VERGL = 0, e.VHB = 0, e.VKV = 0, e.VSP = 0, e.VSPN = 0, e.VSP1 = 0, e.VSP2 = 0, e.VSP3 = 0, e.W1STKL5 = 0, e.W2STKL5 = 0, e.W3STKL5 = 0, e.X = 0, e.Y = 0, e.ZRE4 = 0, e.ZRE4J = 0, e.ZRE4VP = 0, e.ZTABFB = 0, e.ZVBEZ = 0, e.ZVBEZJ = 0, e.ZVE = 0, e.ZX = 0, e.ZZX = 0, e.RVERS = 0, e.KVERS = 0, e.PVERS = 0, e.AVERS = 0, e.varTab1 = [], e.varTab1[0] = 0, e.varTab1[1] = 0.4, e.varTab1[2] = 0.384, e.varTab1[3] = 0.368, e.varTab1[4] = 0.352, e.varTab1[5] = 0.336, e.varTab1[6] = 0.32, e.varTab1[7] = 0.304, e.varTab1[8] = 0.288, e.varTab1[9] = 0.272, e.varTab1[10] = 0.256, e.varTab1[11] = 0.24, e.varTab1[12] = 0.224, e.varTab1[13] = 0.208, e.varTab1[14] = 0.192, e.varTab1[15] = 0.176, e.varTab1[16] = 0.16, e.varTab1[17] = 0.152, e.varTab1[18] = 0.144, e.varTab1[19] = 0.136, e.varTab1[20] = 0.128, e.varTab1[21] = 0.12, e.varTab1[22] = 0.112, e.varTab1[23] = 0.104, e.varTab1[24] = 0.096, e.varTab1[25] = 0.088, e.varTab1[26] = 0.08, e.varTab1[27] = 0.072, e.varTab1[28] = 0.064, e.varTab1[29] = 0.056, e.varTab1[30] = 0.048, e.varTab1[31] = 0.04, e.varTab1[32] = 0.032, e.varTab1[33] = 0.024, e.varTab1[34] = 0.016, e.varTab1[35] = 8e-3, e.varTab1[36] = 0, e.varTab2 = [], e.varTab2[0] = 0, e.varTab2[1] = 3e3, e.varTab2[2] = 2880, e.varTab2[3] = 2760, e.varTab2[4] = 2640, e.varTab2[5] = 2520, e.varTab2[6] = 2400, e.varTab2[7] = 2280, e.varTab2[8] = 2160, e.varTab2[9] = 2040, e.varTab2[10] = 1920, e.varTab2[11] = 1800, e.varTab2[12] = 1680, e.varTab2[13] = 1560, e.varTab2[14] = 1440, e.varTab2[15] = 1320, e.varTab2[16] = 1200, e.varTab2[17] = 1140, e.varTab2[18] = 1080, e.varTab2[19] = 1020, e.varTab2[20] = 960, e.varTab2[21] = 900, e.varTab2[22] = 840, e.varTab2[23] = 780, e.varTab2[24] = 720, e.varTab2[25] = 660, e.varTab2[26] = 600, e.varTab2[27] = 540, e.varTab2[28] = 480, e.varTab2[29] = 420, e.varTab2[30] = 360, e.varTab2[31] = 300, e.varTab2[32] = 240, e.varTab2[33] = 180, e.varTab2[34] = 120, e.varTab2[35] = 60, e.varTab2[36] = 0, e.varTab3 = [], e.varTab3[0] = 0, e.varTab3[1] = 900, e.varTab3[2] = 864, e.varTab3[3] = 828, e.varTab3[4] = 792, e.varTab3[5] = 756, e.varTab3[6] = 720, e.varTab3[7] = 684, e.varTab3[8] = 648, e.varTab3[9] = 612, e.varTab3[10] = 576, e.varTab3[11] = 540, e.varTab3[12] = 504, e.varTab3[13] = 468, e.varTab3[14] = 432, e.varTab3[15] = 396, e.varTab3[16] = 360, e.varTab3[17] = 342, e.varTab3[18] = 324, e.varTab3[19] = 306, e.varTab3[20] = 288, e.varTab3[21] = 270, e.varTab3[22] = 252, e.varTab3[23] = 234, e.varTab3[24] = 216, e.varTab3[25] = 198, e.varTab3[26] = 180, e.varTab3[27] = 162, e.varTab3[28] = 144, e.varTab3[29] = 126, e.varTab3[30] = 108, e.varTab3[31] = 90, e.varTab3[32] = 72, e.varTab3[33] = 54, e.varTab3[34] = 36, e.varTab3[35] = 18, e.varTab3[36] = 0, e.varTab4 = [], e.varTab4[0] = 0, e.varTab4[1] = 0.4, e.varTab4[2] = 0.384, e.varTab4[3] = 0.368, e.varTab4[4] = 0.352, e.varTab4[5] = 0.336, e.varTab4[6] = 0.32, e.varTab4[7] = 0.304, e.varTab4[8] = 0.288, e.varTab4[9] = 0.272, e.varTab4[10] = 0.256, e.varTab4[11] = 0.24, e.varTab4[12] = 0.224, e.varTab4[13] = 0.208, e.varTab4[14] = 0.192, e.varTab4[15] = 0.176, e.varTab4[16] = 0.16, e.varTab4[17] = 0.152, e.varTab4[18] = 0.144, e.varTab4[19] = 0.136, e.varTab4[20] = 0.128, e.varTab4[21] = 0.12, e.varTab4[22] = 0.112, e.varTab4[23] = 0.104, e.varTab4[24] = 0.096, e.varTab4[25] = 0.088, e.varTab4[26] = 0.08, e.varTab4[27] = 0.072, e.varTab4[28] = 0.064, e.varTab4[29] = 0.056, e.varTab4[30] = 0.048, e.varTab4[31] = 0.04, e.varTab4[32] = 0.032, e.varTab4[33] = 0.024, e.varTab4[34] = 0.016, e.varTab4[35] = 8e-3, e.varTab4[36] = 0, e.varTab5 = [], e.varTab5[0] = 0, e.varTab5[1] = 1900, e.varTab5[2] = 1824, e.varTab5[3] = 1748, e.varTab5[4] = 1672, e.varTab5[5] = 1596, e.varTab5[6] = 1520, e.varTab5[7] = 1444, e.varTab5[8] = 1368, e.varTab5[9] = 1292, e.varTab5[10] = 1216, e.varTab5[11] = 1140, e.varTab5[12] = 1064, e.varTab5[13] = 988, e.varTab5[14] = 912, e.varTab5[15] = 836, e.varTab5[16] = 760, e.varTab5[17] = 722, e.varTab5[18] = 684, e.varTab5[19] = 646, e.varTab5[20] = 608, e.varTab5[21] = 570, e.varTab5[22] = 532, e.varTab5[23] = 494, e.varTab5[24] = 456, e.varTab5[25] = 418, e.varTab5[26] = 380, e.varTab5[27] = 342, e.varTab5[28] = 304, e.varTab5[29] = 266, e.varTab5[30] = 228, e.varTab5[31] = 190, e.varTab5[32] = 152, e.varTab5[33] = 114, e.varTab5[34] = 76, e.varTab5[35] = 38, e.varTab5[36] = 0;
  }
  TAB1(e) {
    return this.varTab1[e];
  }
  TAB2(e) {
    return this.varTab2[e];
  }
  TAB3(e) {
    return this.varTab3[e];
  }
  TAB4(e) {
    return this.varTab4[e];
  }
  TAB5(e) {
    return this.varTab5[e];
  }
  // *******************************
  // * LUR FUNCTIONS
  // *******************************
  /*
   * Zuweisung von Werten für bestimmte Sozialversicherungsparameter
   */
  func_MPARA() {
    const e = this;
    e.KRV < 2 && (e.KRV === 0 ? e.BBGRV = 90600 : e.BBGRV = 89400, e.RVSATZAN = 0.093), e.BBGKVPV = 62100, e.KVSATZAN = e.KVZ / 2 / 100 + 0.07, e.KVSATZAG = 85e-4 + 0.07, e.PVS === 1 ? (e.PVSATZAN = 0.022, e.PVSATZAG = 0.012) : (e.PVSATZAN = 0.017, e.PVSATZAG = 0.017), e.PVZ === 1 && (e.PVSATZAN = e.PVSATZAN + 6e-3), e.W1STKL5 = 13279, e.W2STKL5 = 33380, e.W3STKL5 = 222260, e.GFB = 11604, e.SOLZFREI = 18130;
  }
  /*
   * Ermittlung des Jahresarbeitslohns und der Freibeträge
   */
  func_MRE4JL() {
    var e = this, a = 1;
    e.LZZ == 1 ? a = 1 : e.LZZ == 2 ? a = 12 : e.LZZ == 3 ? a = 360 / 7 : a = 360, e.ZRE4J = e.RE4 * a / 100, e.ZVBEZJ = e.VBEZ * a / 100, e.JLFREIB = e.LZZFREIB * a / 100, e.JLHINZU = e.LZZHINZU * a / 100, e.AF == 0 && (e.F = 1);
  }
  /*
   * Altersentlastungsbetrag
   */
  func_MRE4ALTE() {
    const e = this;
    e.ALTER1 == 0 ? e.ALTE = 0 : (e.AJAHR < 2006 ? e.K = 1 : e.AJAHR < 2040 ? e.K = e.AJAHR - 2004 : e.K = 36, e.BMG = e.ZRE4J - e.ZVBEZJ, e.ALTE = Math.ceil(e.BMG * e.TAB4(e.K)), e.HBALTE = e.TAB5(e.K), e.ALTE > e.HBALTE && (e.ALTE = e.HBALTE));
  }
  /*
   * Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag
   */
  func_MRE4() {
    const e = this;
    e.ZVBEZJ == 0 ? (e.FVBZ = 0, e.FVB = 0, e.FVBZSO = 0, e.FVBSO = 0) : (e.VJAHR < 2006 ? e.J = 1 : e.VJAHR < 2040 ? e.J = e.VJAHR - 2004 : e.J = 36, e.LZZ == 1 ? (e.VBEZB = e.VBEZM * e.ZMVB + e.VBEZS, e.HFVB = e.TAB2(e.J) / 12 * e.ZMVB, e.FVBZ = Math.ceil(e.TAB3(e.J) / 12 * e.ZMVB)) : (e.VBEZB = e.VBEZM * 12 + e.VBEZS, e.HFVB = e.TAB2(e.J), e.FVBZ = e.TAB3(e.J)), e.FVB = e.decimalCeil(e.VBEZB * e.TAB1(e.J) / 100, 2), e.FVB > e.HFVB && (e.FVB = e.HFVB), e.FVB > e.ZVBEZJ && (e.FVB = e.ZVBEZJ), e.FVBSO = e.decimalCeil(e.FVB + e.VBEZBSO * e.TAB1(e.J) / 100, 2), e.FVBSO > e.TAB2(e.J) && (e.FVBSO = e.TAB2(e.J)), e.HFVBZSO = (e.VBEZB + e.VBEZBSO) / 100 - e.FVBSO, e.FVBZSO = Math.ceil(e.FVBZ + e.VBEZBSO / 100), e.FVBZSO > e.HFVBZSO && (e.FVBZSO = Math.ceil(e.HFVBZSO)), e.FVBZSO > e.TAB3(e.J) && (e.FVBZSO = e.TAB3(e.J)), e.HFVBZ = e.VBEZB / 100 - e.FVB, e.FVBZ > e.HFVBZ && (e.FVBZ = Math.ceil(e.HFVBZ))), e.func_MRE4ALTE();
  }
  /*
   * Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge
   */
  func_MRE4ABZ() {
    const e = this;
    e.ZRE4 = e.ZRE4J - e.FVB - e.ALTE - e.JLFREIB + e.JLHINZU, e.ZRE4 < 0 && (e.ZRE4 = 0), e.ZRE4VP = e.ZRE4J, e.KENNVMT == 2 && (e.ZRE4VP = e.ZRE4VP - e.ENTSCH / 100), e.ZVBEZ = e.ZVBEZJ - e.FVB, e.ZVBEZ < 0 && (e.ZVBEZ = 0);
  }
  /**
   * Berechnung für laufende Lohnzahlungszeiträume
   *
   * @returns {undefined}
   */
  func_MBERECH() {
    const e = this;
    e.func_MZTABFB(), e.VFRB = (e.ANP + e.FVB + e.FVBZ) * 100, e.func_MLSTJAHR(), e.WVFRB = (e.ZVE - e.GFB) * 100, e.WVFRB < 0 && (e.WVFRB = 0), e.LSTJAHR = e.ST * e.F, e.func_UPLSTLZZ(), e.func_UPVKVLZZ(), e.ZKF > 0 ? (e.ZTABFB = e.ZTABFB + e.KFB, e.func_MRE4ABZ(), e.func_MLSTJAHR(), e.JBMG = e.ST * e.F) : e.JBMG = e.LSTJAHR, e.func_MSOLZ();
  }
  /**
   * Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
   *
   * @returns {undefined}
   */
  func_MZTABFB() {
    const e = this;
    e.ANP = 0, e.ZVBEZ >= 0 && e.ZVBEZ < e.FVBZ && (e.FVBZ = e.ZVBEZ), e.STKL < 6 ? e.ZVBEZ > 0 && (e.ZVBEZ - e.FVBZ < 102 ? e.ANP = Math.ceil(e.ZVBEZ - e.FVBZ) : e.ANP = 102) : (e.FVBZ = 0, e.FVBZSO = 0), e.STKL < 6 && e.ZRE4 > e.ZVBEZ && (e.ZRE4 - e.ZVBEZ < 1230 ? e.ANP = Math.ceil(e.ANP + e.ZRE4 - e.ZVBEZ) : e.ANP = e.ANP + 1230), e.KZTAB = 1, e.STKL == 1 ? (e.SAP = 36, e.KFB = e.ZKF * 9312) : e.STKL == 2 ? (e.EFA = 4008, e.SAP = 36, e.KFB = e.ZKF * 9312) : e.STKL == 3 ? (e.KZTAB = 2, e.SAP = 36, e.KFB = e.ZKF * 9312) : e.STKL == 4 ? (e.SAP = 36, e.KFB = e.ZKF * 4656) : (e.STKL == 5 && (e.SAP = 36), e.KFB = 0), e.ZTABFB = e.EFA + e.ANP + e.SAP + e.FVBZ;
  }
  /*
   *
   */
  func_UPMLST() {
    const e = this;
    e.ZVE < 1 ? (e.ZVE = 0, e.X = 0) : e.X = Math.floor(e.ZVE / e.KZTAB), e.STKL < 5 ? e.func_UPTAB24() : e.func_MST5_6();
  }
  /*
   * Anteil von Jahresbeträgen für einen LZZ
   */
  func_UPANTEIL() {
    const e = this;
    e.LZZ == 1 ? e.ANTEIL1 = e.JW : e.LZZ == 2 ? e.ANTEIL1 = e.decimalFloor(e.JW / 12, 0) : e.LZZ == 3 ? e.ANTEIL1 = e.decimalFloor(e.JW * 7 / 360, 0) : e.ANTEIL1 = e.decimalFloor(e.JW / 360, 0);
  }
  /*
   *
   */
  func_UPLSTLZZ() {
    const e = this;
    e.JW = e.LSTJAHR * 100, e.func_UPANTEIL(), e.LSTLZZ = e.ANTEIL1;
  }
  /*
   *
   */
  func_UPVKV() {
    const e = this;
    e.PKV > 0 ? e.VSP2 > e.VSP3 ? e.VKV = e.VSP2 * 100 : e.VKV = e.VSP3 * 100 : e.VKV = 0;
  }
  /*
   *
   */
  func_UPVKVLZZ() {
    const e = this;
    e.func_UPVKV(), e.JW = e.VKV, e.func_UPANTEIL(), e.VKVLZZ = e.ANTEIL1;
  }
  /*
   * Solidaritätszuschlag
   */
  func_MSOLZ() {
    const e = this;
    e.SOLZFREI = e.SOLZFREI * e.KZTAB, e.JBMG > e.SOLZFREI ? (e.SOLZJ = e.decimalFloor(e.JBMG * 5.5 / 100, 2), e.SOLZMIN = (e.JBMG - e.SOLZFREI) * 11.9 / 100, e.SOLZMIN < e.SOLZJ && (e.SOLZJ = e.SOLZMIN), e.JW = e.SOLZJ * 100, e.func_UPANTEIL(), e.SOLZLZZ = e.ANTEIL1) : e.SOLZLZZ = 0, e.R > 0 ? (e.JW = e.JBMG * 100, e.func_UPANTEIL(), e.BK = e.ANTEIL1) : e.BK = 0;
  }
  /*
   *
   */
  func_UP5_6() {
    const e = this;
    e.X = e.ZX * 1.25, e.func_UPTAB24(), e.ST1 = e.ST, e.X = e.ZX * 0.75, e.func_UPTAB24(), e.ST2 = e.ST, e.DIFF = (e.ST1 - e.ST2) * 2, e.MIST = Math.floor(e.ZX * 0.14), e.MIST > e.DIFF ? e.ST = e.MIST : e.ST = e.DIFF;
  }
  /*
   * Lohnsteuer für die Klasse V und VI
   */
  func_MST5_6() {
    const e = this;
    e.ZZX = e.X, e.ZZX > e.W2STKL5 ? (e.ZX = e.W2STKL5, e.func_UP5_6(), e.ZZX > e.W3STKL5 ? (e.ST = Math.floor(e.ST + (e.W3STKL5 - e.W2STKL5) * 0.42), e.ST = Math.floor(e.ST + (e.ZZX - e.W3STKL5) * 0.45)) : e.ST = Math.floor(e.ST + (e.ZZX - e.W2STKL5) * 0.42)) : (e.ZX = e.ZZX, e.func_UP5_6(), e.ZZX > e.W1STKL5 && (e.VERGL = e.ST, e.ZX = e.W1STKL5, e.func_UP5_6(), e.HOCH = Math.floor(e.ST + (e.ZZX - e.W1STKL5) * 0.42), e.HOCH < e.VERGL ? e.ST = e.HOCH : e.ST = e.VERGL));
  }
  /*
   * Vorsorgepauschale - Vergleichsberechnung zu Midestvorsorgepauschale
   */
  func_MVSP() {
    const e = this;
    e.ZRE4VP > e.BBGKVPV && (e.ZRE4VP = e.BBGKVPV), e.PKV > 0 ? (e.STKL == 6 ? e.VSP3 = 0 : (e.VSP3 = e.PKPV * 12 / 100, e.PKV == 2 && (e.VSP3 = e.VSP3 - e.ZRE4VP * (e.KVSATZAG + e.PVSATZAG))), e.KVERS = 0, e.PVERS = 0) : e.VSP3 = e.ZRE4VP * (e.KVSATZAN + e.PVSATZAN), e.VSP = Math.ceil(e.VSP3 + e.VSP1);
  }
  /*
   * Vorsorgepauschale
   */
  func_UPEVP() {
    const e = this;
    e.KRV > 1 ? e.VSP1 = 0 : (e.ZRE4VP > e.BBGRV && (e.ZRE4VP = e.BBGRV), e.VSP1 = e.RVSATZAN * e.ZRE4VP), e.VSP2 = 0.12 * e.ZRE4VP, e.STKL == 3 ? e.VHB = 3e3 : e.VHB = 1900, e.VSP2 > e.VHB && (e.VSP2 = e.VHB), e.VSPN = Math.ceil(e.VSP1 + e.VSP2), e.func_MVSP(), e.VSPN > e.VSP && (e.VSP = e.VSPN), e.AVERS = e.ZRE4VP * 0.015;
  }
  func_UPTAB24() {
    const e = this;
    e.X < e.GFB + 1 ? e.ST = 0 : e.X < 17006 ? (e.Y = (e.X - e.GFB) / 1e4, e.RW = e.Y * 922.98, e.RW = e.RW + 1400, e.ST = Math.floor(e.RW * e.Y)) : e.X < 66761 ? (e.Y = (e.X - 17005) / 1e4, e.RW = e.Y * 181.19, e.RW = e.RW + 2397, e.RW = e.RW * e.Y, e.ST = Math.floor(e.RW + 1025.38)) : e.X < 277826 ? e.ST = Math.floor(e.X * 0.42 - 10602.13) : e.ST = Math.floor(e.X * 0.45 - 18936.88), e.ST = e.ST * e.KZTAB;
  }
  /*
   * Ermittlung Jahreslohnsteuer
   */
  func_MLSTJAHR() {
    const e = this;
    e.func_UPEVP(), e.KENNVMT !== 1 ? (e.ZVE = e.ZRE4 - e.ZTABFB - e.VSP, e.func_UPMLST()) : (e.ZVE = e.ZRE4 - e.ZTABFB - e.VSP - e.VMT / 100 - e.VKAPA / 100, e.ZVE < 0 ? (e.ZVE = (e.ZVE + e.VMT / 100 + e.VKAPA / 100) / 5, e.func_UPMLST(), e.ST *= 5) : (e.func_UPMLST(), e.STOVMT = e.ST, e.ZVE = e.ZVE + (e.VMT + e.VKAPA) / 500, e.func_UPMLST(), e.ST = (e.ST - e.STOVMT) * 5 + e.STOVMT));
  }
  /*
   * Berechnung sonstiger Bezüge
   */
  func_MSONST() {
    const e = this;
    e.LZZ = 1, e.ZMVB == 0 && (e.ZMVB = 12), e.SONSTB == 0 && e.MBV == 0 ? (e.VKVSONST = 0, e.LSTSO = 0, e.STS = 0, e.SOLZS = 0, e.BKS = 0) : (e.func_MOSONST(), e.func_UPVKV(), e.VKVSONST = e.VKV, e.ZRE4J = (e.JRE4 + e.SONSTB) / 100, e.ZVBEZJ = (e.JVBEZ + e.VBS) / 100, e.VBEZBSO = e.STERBE, e.func_MRE4SONST(), e.func_MLSTJAHR(), e.WVFRBM = (e.ZVE - e.GFB) * 100, e.WVFRBM < 0 && (e.WVFRBM = 0), e.func_UPVKV(), e.VKVSONST = e.VKV - e.VKVSONST, e.LSTSO = e.ST * 100, e.STS = Math.abs(Math.floor((e.LSTSO - e.LSTOSO) * e.F)), e.func_STSMIN());
  }
  func_STSMIN() {
    const e = this;
    e.STS < 0 ? (e.MBV != 0 && (e.LSTLZZ = e.LSTLZZ + e.STS, e.LSTLZZ < 0 && (e.LSTLZZ = 0), e.SOLZLZZ = e.decimalFloor(e.SOLZLZZ + e.STS * 5.5 / 100, 2), e.SOLZLZZ < 0 && (e.SOLZLZZ = 0), e.BK = e.BK + e.STS, e.BK < 0 && (e.BK = 0)), e.STS = 0, e.SOLZS = 0) : e.func_MSOLZSTS(), e.R > 0 ? e.BKS = e.STS : e.BKS = 0;
  }
  /*
   * Berechnung des SolZ auf sonstige
   * Bezüge
   */
  func_MSOLZSTS() {
    const e = this;
    e.ZKF > 0 ? e.SOLZSZVE = e.ZVE - e.KFB : e.SOLZSZVE = e.ZVE, e.SOLZSZVE < 1 ? (e.SOLZSZVE = 0, e.X = 0) : e.X = Math.floor(e.SOLZSZVE / e.KZTAB), e.STKL < 5 ? e.func_UPTAB24() : e.func_MST5_6(), e.SOLZSBMG = Math.floor(e.ST * e.F), e.SOLZSBMG > e.SOLZFREI ? e.SOLZS = e.decimalFloor(e.STS * 5.5 / 100, 2) : e.SOLZS = 0;
  }
  /*
   * Sonderberechung mit sonstigen Bezügen für Berechnung bei sosntigen Bezügen
   * oder Vergütung für mehrjährige Tätigkeit
   */
  func_MRE4SONST() {
    const e = this;
    e.func_MRE4(), e.FVB = e.FVBSO, e.func_MRE4ABZ(), e.ZRE4VP = e.ZRE4VP + e.MBV / 100 - e.JRE4ENT / 100 - e.SONSTENT / 100, e.FVBZ = e.FVBZSO, e.func_MZTABFB(), e.VFRBS2 = (e.ANP + e.FVB + e.FVBZ) * 100 - e.VFRBS1;
  }
  /*
   * Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen
   * oder Vergütung für mehrjährige Tätigkeit
   */
  func_MOSONST() {
    const e = this;
    e.ZRE4J = e.JRE4 / 100, e.ZVBEZJ = e.JVBEZ / 100, e.JLFREIB = e.JFREIB / 100, e.JLHINZU = e.JHINZU / 100, e.func_MRE4(), e.func_MRE4ABZ(), e.ZRE4VP = e.ZRE4VP - e.JRE4ENT / 100, e.func_MZTABFB(), e.VFRBS1 = (e.ANP + e.FVB + e.FVBZ) * 100, e.func_MLSTJAHR(), e.WVFRBO = (e.ZVE - e.GFB) * 100, e.WVFRBO < 0 && (e.WVFRBO = 0), e.LSTOSO = e.ST * 100;
  }
  /*
   * Berechnung der Vergütung für mehrjährige Tätigkeit
   */
  func_MVMT() {
    const e = this;
    e.VKAPA < 0 && (e.VKAPA = 0), e.VMT + e.VKAPA > 0 ? (e.LSTSO == 0 ? (e.func_MOSONST(), e.LST1 = e.LSTOSO) : e.SLT1 = e.LSTSO, e.VBEZBSO = e.STERBE + e.VKAPA, e.ZRE4J = (e.JRE4 + e.SONSTB + e.VMT + e.VKAPA) / 100, e.ZVBEZJ = (e.JVBEZ + e.VBS + e.VKAPA) / 100, e.KENNVMT = 2, e.func_MRE4SONST(), e.func_MLSTJAHR(), e.LST3 = e.ST * 100, e.func_MRE4ABZ(), e.ZRE4VP = e.ZRE4VP - e.JRE4ENT / 100 - e.SONSTENT / 100, e.KENNVMT = 1, e.func_MLSTJAHR(), e.LST2 = e.ST * 100, e.STV = e.LST2 - e.LST1, e.LST3 = e.LST3 - e.LST1, e.LST3 < e.STV && (e.STV = e.LST3), e.STV < 0 ? e.STV = 0 : e.STV = Math.floor(e.STV * e.F), e.SOLZVBMG = e.STV / 100 + e.JBMG, e.SOLZVBMG > e.SOLZFREI ? e.SOLZV = e.decimalFloor(e.STV * 5.5 / 100, 2) : e.SOLZV = 0, e.R > 0 ? e.BKV = e.STV : e.BKV = 0) : (e.STV = 0, e.SOLZV = 0, e.BKV = 0);
  }
  func_LST() {
    const e = this;
    e.func_MPARA(), e.func_MRE4JL(), e.VBEZBSO = 0, e.KENNVMT = 0, e.func_MRE4(), e.func_MRE4ABZ(), e.func_MBERECH(), e.func_MSONST(), e.func_MVMT();
  }
  // *******************************
  // * HELPER FUNCTIONS
  // *******************************
  decimalRound(e, a) {
    var s = Math.pow(10, a);
    return Math.round(e * s) / s;
  }
  decimalCeil(e, a) {
    var s = Math.pow(10, a);
    return Math.ceil(e * s) / s;
  }
  /**
   * Rundet eine Zahl auf die angegebenen Nachkommastellen ab.
   *
   * @param {Float} numberToFloor Die zu rundende Zahl.
   * @param {Integer} precision Die genauigkeit an Dezimalstellen, auf die abgerundet werden soll.
   * @returns {Float} Das Ergebnis der Rundung.
   */
  decimalFloor(e, a) {
    var s = Math.pow(10, a);
    return Math.floor(e * s) / s;
  }
  initParams() {
    const e = this;
    e.AF = 0, e.AJAHR = 0, e.ALTER1 = 0, e.ENTSCH = 0, e.F = 1, e.JFREIB = 0, e.JHINZU = 0, e.JRE4 = 0, e.JRE4ENT = 0, e.JVBEZ = 0, e.KRV = 0, e.LZZ = 2, e.LZZFREIB = 0, e.LZZHINZU = 0, e.PKPV = 0, e.PKV = 0, e.PVS = 0, e.PVZ = 0, e.R = 0, e.RE4 = 0, e.SONSTB = 0, e.SONSTENT = 0, e.STERBE = 0, e.STKL = 0, e.VBEZ = 0, e.VBEZM = 0, e.VBEZS = 0, e.VBS = 0, e.VJAHR = 0, e.VKAPA = 0, e.VMT = 0, e.ZKF = 0, e.ZMVB = 0, e.BK = 0, e.BKS = 0, e.BKV = 0, e.LSTLZZ = 0, e.SOLZLZZ = 0, e.SOLZS = 0, e.SOLZV = 0, e.STS = 0, e.STV = 0, e.VKVLZZ = 0, e.VKVSONST = 0, e.ALTE = 0, e.ANP = 0, e.ANTEIL1 = 0, e.BMG = 0, e.DIFF = 0, e.EFA = 0, e.FVB = 0, e.FVBSO = 0, e.FVBZ = 0, e.FVBZSO = 0, e.HBALTE = 0, e.HFVB = 0, e.HFVBZ = 0, e.HFVBZSO = 0, e.HOCH = 0, e.J = 0, e.JBMG = 0, e.JLFREIB = 0, e.JLHINZU = 0, e.JW = 0, e.K = 0, e.KENNVMT = 0, e.KFB = 0, e.KVSATZAG = 0, e.KVSATZAN = 0, e.KZTAB = 0, e.LSTJAHR = 0, e.LST1, e.LST2, e.LST3, e.LSTOSO, e.LSTSO = 0, e.MIST = 0, e.PVSATZAG = 0, e.PVSATZAN = 0, e.RW = 0, e.SAP = 0, e.SOLZFREI = 0, e.SOLZJ = 0, e.SOLZMIN = 0, e.ST = 0, e.ST1 = 0, e.ST2 = 0, e.STOVMT = 0, e.VBEZB = 0, e.VBEZBSO = 0, e.VERGL = 0, e.VHB = 0, e.VKV = 0, e.VSP = 0, e.VSPN = 0, e.VSP1 = 0, e.VSP2 = 0, e.VSP3 = 0, e.W1STKL5 = 0, e.W2STKL5 = 0, e.W3STKL5 = 0, e.X = 0, e.Y = 0, e.ZRE4 = 0, e.ZRE4J = 0, e.ZRE4VP = 0, e.ZTABFB = 0, e.ZVBEZ = 0, e.ZVBEZJ = 0, e.ZVE = 0, e.ZX = 0, e.ZZX = 0;
  }
}
function Ie({ inputParams: n, taxBasis: e }) {
  const a = new Me();
  a.initParams(), a.STKL = n.taxClass, a.LZZ = 2, a.ZKF = n.childAllowances, a.AF = a.STKL === 5 ? 1 : 0, a.F = a.STKL === 5 ? n?.taxFactor : 1, a.R = n.churchTax === !0 ? 1 : 0, a.RE4 = e * 100, a.STKL > 4 && (a.STKL -= 1), a.PVZ = n.childAllowances === 0 ? 1 : 0, a.KVZ = n.healthInsuranceFactor, a.PKPV = 0;
  const s = (/* @__PURE__ */ new Date()).getFullYear();
  a.AJAHR = s + 65, a.ALTER1 = 0, n.workTypeOfficial ? (a.PKV = 1, a.KRV = 2) : (a.PKV = (n?.healthInsurance || 1) - 1, a.KRV = n?.pensionInsurance), a.PVS = n.region === "SACHSEN" ? 1 : 0, a.func_LST();
  const i = Math.floor(a.LSTLZZ) / 100, c = Math.floor(a.SOLZLZZ) / 100, d = n.region === "BW" || n.region === "BAYERN" ? 0.08 : 0.09, h = n.churchTax === !0 ? Math.floor(a.BK * d) / 100 : 0;
  return {
    total: i + c + h,
    income: i,
    soli: c,
    church: h,
    b: a
  };
}
const Ce = function({
  healthInsuranceFactor: n,
  childrenCount: e = 0,
  taxBasis: a,
  b: s
}) {
  let g = 0.017, b = 0.04 - g, u = 0, T = 0;
  e > 0 && (u = 6e-3, e > 1 && (T = e - 1, u += 25e-4 * Math.min(T, 5))), u = Math.round(u * 1e4) / 1e4, b -= u, s.PVS == 1 && (b += 5e-3), s.PVS == 1 && (g -= 5e-3);
  const L = (0.146 + (n || 1) / 100) / 2, N = 0.186 / 2, Z = 5175, V = 7450, E = 7550;
  let M = 0, C = 0, I = 0, S = 0, v = 0;
  if (s.PKV < 1) {
    const K = a > Z ? Z : a;
    M = K * b, C = K * g, I = K * L;
  } else
    I = s.PKPV / 100;
  if (s.KRV == 2)
    S = 0;
  else {
    let K = a > V ? V : a;
    s.KRV == 1 && (K = a > E ? E : a), S = K * N, v = K * 0.013;
  }
  const z = {
    total: v + S + I + M,
    aVers: v,
    rVers: S,
    kVers: I,
    pVers: M
  }, f = {
    total: v + S + C + I,
    aVers: v,
    rVers: S,
    pVers: C,
    kVers: I
  };
  return { employee: z, employer: f };
};
function ae({
  taxBasis: n,
  inputParams: e
}) {
  const a = Ie({
    inputParams: e,
    taxBasis: n
  }), s = Ce({
    healthInsuranceFactor: e?.healthInsuranceFactor,
    childrenCount: e?.hasChildren ? e?.childrenCount : 0,
    taxBasis: n,
    b: a.b
  }), i = a.total + s.employee.total;
  return {
    salaryNet: n - i,
    taxes: a,
    insurances: s,
    contributionsTotal: i
  };
}
function Ke({
  bikePrices: n,
  totalCost: e,
  leasingRate: a,
  leasingPriceNormalTotal: s,
  leasingTotal: i
}) {
  const c = n.bikesPlusRepair - e, d = Math.round(
    (1 - e / n.bikesPlusRepair) * 100 * // percent in 2-3 digits
    100
    // for rounding
  ) / Math.pow(10, 2), h = (n.leasingRate - a) / n.leasingRate * 100, g = s - i;
  return {
    savingsPercent: d,
    savingsAbsolute: c,
    savingsLeasingPercent: h,
    savingsLeasingAbsolute: g
  };
}
function Oe({
  inputParams: n,
  settings: e
}) {
  if (!n?.totalPriceUVP)
    return null;
  const a = n?.totalPriceUVP / 4, s = Math.floor(a / 100), i = Math.floor(n?.totalPriceUVP / 100);
  return {
    bikesPriceFractionUvp: e?.useFullBikeUvpPrice ? i : s,
    bikePricePercent: s,
    bikePriceQuarterUvp: a,
    bikePricePercentFull: i
  };
}
function fe({
  inputParams: n,
  settings: e
}) {
  return e?.insurancePackages?.filter(({ name: a }) => a === n?.insurancePackage)[0] || {};
}
function He({
  settings: n,
  inputParams: e,
  bikePrice: a,
  bikePriceWithLeasingInsurance: s
}) {
  let i, c = Q(a);
  const { leasingFactors: d } = fe({ inputParams: e, settings: n }), h = d?.[d.length - 1], g = d?.[0];
  if (i = g?.value || 3.22, n?.includeInsuranceForFactorComparison && (c = Q(s)), c > (g?.upto || 1 / 0) && d?.length)
    for (let u = d?.length - 1; u >= 0; u--) {
      const T = d?.[u];
      T?.upto && c <= T?.upto && (i = T?.value);
    }
  return h?.upto && c > h?.upto && (i = h?.value), {
    leasingRateFactor: i || 3.22
  };
}
function Je({
  inputParams: n,
  settings: e,
  leasingRateInsurancePerMonth: a,
  leasingRateInsurancePerMonthNet: s,
  bikePrice: i,
  bikePriceWithLeasingInsurance: c
}) {
  const { leasingRateFactor: d } = He({
    settings: e,
    inputParams: n,
    bikePrice: i,
    bikePriceWithLeasingInsurance: c
  }), h = i * (d / 100), g = h + a, b = Q(h), u = s + b;
  return {
    leasingRate: n.employerTaxDeduction ? u : g,
    leasingRateWithoutInsurance: h,
    leasingRateWithoutInsuranceNet: b,
    leasingRateFactor: d
  };
}
function Ge({
  inputParams: n,
  settings: e
}) {
  let a = 0, s = 0, i = 0;
  if (!n?.bikeRows)
    return null;
  const c = n?.bikeRows.map(
    ({ price: b }) => {
      const { leasingInsurance: u, leasingInsuranceNet: T } = We({
        inputParams: n,
        settings: e,
        bikePrice: b
      });
      a += u, s += T, i += b + u;
      const p = u / (n?.leasingPeriod || 36), m = T / (n?.leasingPeriod || 36);
      return {
        leasinginsurancePerMonth: p,
        leasinginsurancePerMonthNet: m,
        leasingInsurance: u,
        leasingInsuranceNet: T,
        bikeWithInsurance: b + u
      };
    }
  ), d = a / (n.leasingPeriod || 36), h = s / (n.leasingPeriod || 36);
  return {
    leasingRateInsuranceTotal: a,
    leasingRateInsuranceTotalNet: s,
    leasingRateInsurancePerMonth: d,
    leasingRateInsurancePerMonthNet: h,
    bikePriceWithLeasingInsurance: i,
    leasingRateInsurancesPerBike: c
  };
}
function We({
  bikePrice: n,
  settings: e,
  inputParams: a
}) {
  const { leasingInsurancePrices: s } = fe({
    inputParams: a,
    settings: e
  }), i = s?.[s.length - 1], c = s?.[0];
  let d = 0;
  if (c?.upto) {
    if (d = c?.value || 0, n > c?.upto && s?.length)
      for (let u = s?.length - 1; u >= 0; u--) {
        const T = s?.[u];
        T?.upto && n <= T?.upto && (d = T?.value || 0);
      }
    i?.upto && n > i?.upto && (d = i.value || 0);
  }
  const h = 3.33 * 36, g = d - h;
  return { leasingInsurance: e?.noTaxOnInsurance ? g + ne(h) : ne(d), leasingInsuranceNet: d };
}
function _e({
  inputParams: n,
  settings: e
}) {
  if (!n?.totalPriceUVP)
    return null;
  const a = n?.totalPrice || 0, s = Ge({
    inputParams: n,
    settings: e
  });
  if (!s)
    return null;
  const {
    leasingRateInsurancePerMonth: i,
    leasingRateInsurancePerMonthNet: c,
    leasingRateInsuranceTotal: d,
    leasingRateInsuranceTotalNet: h,
    bikePriceWithLeasingInsurance: g,
    leasingRateInsurancesPerBike: b
  } = s, {
    leasingRate: u,
    leasingRateFactor: T,
    leasingRateWithoutInsurance: p,
    leasingRateWithoutInsuranceNet: m
  } = Je({
    inputParams: n,
    settings: e,
    bikePrice: a,
    leasingRateInsurancePerMonth: i,
    leasingRateInsurancePerMonthNet: c,
    bikePriceWithLeasingInsurance: g
  }), B = Oe({
    inputParams: n,
    settings: e
  });
  if (!B)
    return null;
  const {
    bikePricePercent: L,
    bikePriceQuarterUvp: F,
    bikePricePercentFull: N,
    bikesPriceFractionUvp: Z
  } = B, V = (e?.repairCost || 400) * (n?.bikeCount || 1), E = (n?.totalPrice || 0) + V, M = e?.subtractTaxAfterEmployerBenefit ? Math.round(Z * 19) / 119 : 0, C = u * (n?.leasingPeriod || 36);
  return {
    bikePrice: a,
    bikePriceVatToSubtract: M,
    bikePricePercent: L,
    bikePriceQuarterUvp: F,
    bikePricePercentFull: N,
    bikesPriceFractionUvp: Z,
    leasingRate: u,
    leasingRateWithoutInsurance: p,
    leasingRateWithoutInsuranceNet: m,
    leasingRateFactor: T,
    bikesPlusRepair: E,
    leasingRateNormalTotal: C,
    leasingRateInsurancePerMonth: i,
    leasingRateInsurancePerMonthNet: c,
    bikePriceWithLeasingInsurance: g,
    leasingRateInsuranceTotal: d,
    leasingRateInsuranceTotalNet: h,
    leasingRateInsurancesPerBike: b
  };
}
function ge({
  settings: n,
  inputParams: e,
  bikePrices: a
}) {
  const s = n?.benefitType;
  let i = 0;
  const c = Math.min(
    n?.benefitBikeCount || 1,
    e?.bikeCount || 1
  );
  if (s === 0)
    i = 0;
  else if (s === 1)
    i = c * Ue({
      settings: n,
      insurancePackage: e?.insurancePackage || ""
    });
  else if (s === 2)
    i = e?.benefit ? e?.benefit * c : 0;
  else if (s === 3) {
    const b = e?.benefit ? e?.benefit / 100 : 0;
    i = a ? Math.round(a.leasingRate * b * 100) / 100 : 0;
  } else if (s === 4) {
    const b = e.benefit ? e.benefit / 100 : 0, u = a ? a?.leasingRateInsurancePerMonthNet : 0;
    i = Math.round(u * b * 100) / 100;
  } else if (s === 5) {
    const b = e.benefit ? e.benefit / 100 : 0;
    i = e?.totalPriceUVP ? Math.round(e?.totalPriceUVP * b * 100) / 100 : 0;
  } else if (s === 6)
    i = e.benefit ? e.benefit * c : 0;
  else if (s === 7)
    i = e?.benefit ? e?.benefit * c : 0;
  else if (s === 8) {
    const b = e.benefit ? e.benefit / 100 : 0, u = e.benefit2 ? e.benefit2 / 100 : 0, T = a ? a?.leasingRateInsurancePerMonthNet : 0, p = a?.leasingRateWithoutInsuranceNet || 0;
    i = a ? Math.round(p * u * 100) / 100 + Math.round(T * b * 100) / 100 : 0;
  }
  const d = e?.benefitAdditional?.reduce(
    (b, u) => b + u.value,
    0
  );
  let h = 0;
  return h += d || 0, h += e?.benefitAds || 0, h += e?.benefitPhone || 0, h += e?.benefitInternet || 0, {
    bikes: i,
    other: h
  };
}
function Ue({
  settings: n,
  insurancePackage: e
}) {
  return n?.benefitPerInsurancePackage?.[e] || 0;
}
const ze = ({
  settings: n,
  inputParams: e
}) => {
  let a, s;
  if (!e?.totalPriceUVP)
    return null;
  const i = _e({
    inputParams: e,
    settings: n
  });
  if (!i)
    return null;
  const c = ge({
    bikePrices: i,
    settings: n,
    inputParams: e
  });
  if (e?.salaryGross) {
    const h = e?.salaryGross - c.other, g = ae({
      inputParams: e,
      taxBasis: h
    }), b = e?.salaryGross - i.leasingRate + c.other + c.bikes - i.bikePriceVatToSubtract, u = b + i.bikePricePercent, T = ae({
      inputParams: e,
      taxBasis: u
    }), p = T.salaryNet - i.bikePricePercent, m = Math.round((g.salaryNet - p) * 100) / 100, B = i.bikePrice * 0.1, L = m * (e?.leasingPeriod || 36), F = L + B;
    a = Ke({
      bikePrices: i,
      leasingRate: m,
      totalCost: F,
      leasingTotal: L,
      leasingPriceNormalTotal: i.leasingRateNormalTotal
    }), s = {
      withBikes: {
        contributions: T,
        taxBasis: u,
        leasingRate: m,
        leasingTotal: L,
        salaryGross: b,
        salaryNet: p,
        takeoverPrice: B,
        totalCost: F
      },
      withoutBikes: {
        contributions: g,
        taxBasis: h,
        salaryGross: e?.salaryGross,
        salaryNet: g.salaryNet
      }
    };
  }
  return {
    inputParams: e,
    bikePrices: i,
    savings: a,
    settings: n,
    benefit: c,
    comparison: s
  };
};
function ie() {
  return /* @__PURE__ */ t("span", { className: "text-[--color-text-required]", children: "Pflichtfeld" });
}
const De = (n) => !!n?.comparison?.withBikes?.leasingRate;
function $e() {
  const { options: n } = W(), { initialParams: e, settings: a, hiddenInputs: s } = n, i = $({ ...e }), [c, d] = k({}), [h, g] = k({}), [b, u] = k(
    a?.formMode !== "compact"
  ), [T, p] = k(!1);
  if (j(() => {
    a?.calculateMethod === "direct" && I();
  }, [i.current]), !a || !e)
    return null;
  const {
    maxBikes: m,
    insurancePackages: B,
    benefitType: L,
    benefitFixed: F,
    regions: N,
    formMode: Z,
    calculateMethod: V
  } = a, { employerTaxDeduction: E, totalPrice: M, totalPriceUVP: C } = e, I = () => {
    p(!1);
    const f = ze({
      settings: a,
      inputParams: i.current
    });
    if (d(f), De(f))
      g({});
    else {
      if (!i.current.salaryGross || !i.current.region)
        return;
      p(!0);
    }
  }, S = (f) => {
    const H = {
      ...e,
      ...i.current,
      ...f
    };
    i.current = H, V === "direct" && I(), g(f);
  }, v = (f) => s?.includes(f) === !1, z = c ? ge({
    inputParams: { ...a, ...i.current },
    bikePrices: c?.bikePrices,
    settings: a
  }) : { bikes: 0, internet: 0, phone: 0, ads: 0 };
  return /* @__PURE__ */ t(A, { children: /* @__PURE__ */ r(Re, { children: [
    /* @__PURE__ */ r("div", { className: "border border-[--color-border] bg-[--color-head-box-bg] pb-6", children: [
      /* @__PURE__ */ t("h1", { className: "px-10 py-8 bg-[--color-head-row-bg] text-2xl font-display border-b border-b-[--color-border]", children: l("bikes") }),
      /* @__PURE__ */ t(P, { className: "px-10", children: /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
        Ne,
        {
          extended: b,
          onChange: (f) => S({ ...f }),
          maxBikes: m || 1 / 0,
          initialValue: M || 0,
          initialValueUvp: C || 0,
          sendParams: i.current
        }
      ) }) })
    ] }),
    /* @__PURE__ */ t(J, { className: "pt-6", children: /* @__PURE__ */ r(P, { children: [
      /* @__PURE__ */ r(R, { children: [
        i?.current.workTypeOfficial ? l("salaryGrossOfficial") : l("salaryGross"),
        " ",
        /* @__PURE__ */ t(ie, {})
      ] }),
      l("salaryGrossWithTax") !== "salaryGrossWithTax" && /* @__PURE__ */ t(y, { children: /* @__PURE__ */ t("p", { children: l("salaryGrossWithTax") }) }),
      /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
        w,
        {
          required: !0,
          onChange: (f) => S({ salaryGross: f }),
          type: "number",
          min: 0,
          placeholder: i?.current?.salaryGross?.toString(),
          initialValue: i?.current?.salaryGross || 0,
          prefix: "€"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ t(J, { children: v("region") && /* @__PURE__ */ r(P, { children: [
      /* @__PURE__ */ r(R, { children: [
        l("region"),
        " ",
        /* @__PURE__ */ t(ie, {})
      ] }),
      /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
        G,
        {
          required: !0,
          onChange: (f) => S({ region: f }),
          initialValue: i?.current.region,
          type: "text",
          options: [
            { name: "bitte Bundesland wählen", optValue: "" },
            ...(N ?? []).map(({ full: f, short: H }) => ({ name: f, optValue: H }))
          ]
        }
      ) })
    ] }) }),
    Z === "compact" && /* @__PURE__ */ t(J, { children: /* @__PURE__ */ t(P, { className: "justify-center py-2 border-t border-b mb-4", children: /* @__PURE__ */ t(
      O,
      {
        className: "text-sm",
        onClick: () => u(!b),
        type: "link",
        children: b ? /* @__PURE__ */ r(A, { children: [
          l("hideFields"),
          " -"
        ] }) : /* @__PURE__ */ r(A, { children: [
          l("showFields"),
          " +"
        ] })
      }
    ) }) }),
    (v("insurancePackage") || v("leasingPeriod")) && /* @__PURE__ */ r(J, { className: b ? "block" : "hidden", children: [
      v("insurancePackage") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ r(R, { children: [
          l("insurancePackage"),
          " ",
          /* @__PURE__ */ t(y, { url: a?.linkToInsurances, children: /* @__PURE__ */ t(_, {}) })
        ] }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          G,
          {
            onChange: (f) => S({ insurancePackage: f }),
            initialValue: i?.current?.insurancePackage,
            type: "text",
            options: B?.map(
              ({ name: f, title: H }) => ({ name: H, optValue: f })
            )
          }
        ) })
      ] }),
      v("leasingPeriod") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("leasingPeriod") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          G,
          {
            onChange: (f) => S({ leasingPeriod: parseFloat(f) }),
            initialValue: i?.current?.leasingPeriod?.toString(),
            type: "number",
            options: [
              { name: "36", optValue: "36" },
              { name: "48", optValue: "48" }
            ]
          }
        ) })
      ] })
    ] }),
    (E && v("employerTaxDeduction") || v("benefit") && L !== 0) && /* @__PURE__ */ r(J, { className: b ? "block" : "hidden", children: [
      v("benefit") && /* @__PURE__ */ r(A, { children: [
        /* @__PURE__ */ r(P, { children: [
          /* @__PURE__ */ r(R, { children: [
            l(L === 2 ? "benefitPerBike" : "benefit"),
            /* @__PURE__ */ r(y, { children: [
              /* @__PURE__ */ t("h2", { children: l("benefitHintHeadline") }),
              /* @__PURE__ */ t("p", { children: l("benefitHintText") })
            ] })
          ] }),
          /* @__PURE__ */ t(x, { children: a?.benefitType === 7 && a?.benefitDropdown && a.benefitDropdown.length > 0 ? /* @__PURE__ */ t(
            G,
            {
              onChange: (f) => S({ benefit: parseFloat(f) }),
              initialValue: i?.current?.benefit?.toString(),
              options: a.benefitDropdown
            }
          ) : /* @__PURE__ */ t(
            w,
            {
              onChange: (f) => S({ benefit: f }),
              initialValue: z.bikes,
              calculatedValue: z.bikes,
              disabled: F,
              step: 0.1,
              min: 0,
              prefix: "€",
              type: "number"
            }
          ) })
        ] }),
        a?.benefitAdditional && a?.benefitAdditional.length > 0 && a?.benefitAdditional.map(
          ({ name: f, value: H, editable: K }, X) => /* @__PURE__ */ r(P, { children: [
            /* @__PURE__ */ t(R, { children: f }),
            /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
              w,
              {
                onChange: (Te) => {
                  const ee = i?.current?.benefitAdditional || a?.benefitAdditional || [];
                  ee[X] = { name: f, value: Te }, S({ benefitAdditional: ee });
                },
                initialValue: i?.current?.benefitAdditional?.[X]?.value || H || 0,
                disabled: !K,
                step: 0.1,
                prefix: "€",
                min: 0,
                type: "number"
              }
            ) })
          ] }, X)
        )
      ] }),
      v("benefitInternet") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("benefitInternet") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          w,
          {
            onChange: (f) => S({ benefitInternet: f }),
            initialValue: i?.current?.benefitInternet || 0,
            step: 0.1,
            prefix: "€",
            min: 0,
            type: "number"
          }
        ) })
      ] }),
      v("benefitPhone") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("benefitPhone") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          w,
          {
            onChange: (f) => S({ benefitPhone: f }),
            initialValue: i?.current?.benefitPhone || 0,
            step: 0.1,
            prefix: "€",
            min: 0,
            type: "number"
          }
        ) })
      ] }),
      v("benefitAds") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("benefitAds") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          w,
          {
            onChange: (f) => S({ benefitAds: f }),
            initialValue: i?.current?.benefitAds || 0,
            step: 0.1,
            prefix: "€",
            min: 0,
            type: "number"
          }
        ) })
      ] }),
      E && v("employerTaxDeduction") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ r(R, { children: [
          l("employerTaxDeduction"),
          /* @__PURE__ */ r(y, { children: [
            /* @__PURE__ */ t("h2", { children: l("employerTaxDeductionHintHeadline") }),
            /* @__PURE__ */ t("p", { children: l("employerTaxDeductionHintText") })
          ] })
        ] }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          D,
          {
            onChange: (f) => S({ employerTaxDeduction: f }),
            initialValue: i?.current.employerTaxDeduction
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ r(J, { className: b ? "block" : "hidden", children: [
      v("taxClass") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("taxClass") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          G,
          {
            onChange: (f) => S({ taxClass: parseInt(f) }),
            initialValue: i?.current?.taxClass?.toString(),
            type: "number",
            options: [
              { optValue: "1", name: "Klasse I" },
              { optValue: "2", name: "Klasse II" },
              { optValue: "3", name: "Klasse III" },
              { optValue: "4", name: "Klasse IV ohne Faktorverfahren" },
              { optValue: "5", name: "Klasse IV mit Faktorverfahren" },
              { optValue: "6", name: "Klasse V" },
              { optValue: "7", name: "Klasse VI" }
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ r(
        P,
        {
          className: `${i?.current.taxClass === 5 ? "flex" : "hidden"}`,
          children: [
            /* @__PURE__ */ t(R, { children: l("taxFactor") }),
            /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
              w,
              {
                onChange: (f) => S({ taxFactor: f }),
                initialValue: i?.current.taxFactor || 1,
                step: 1e-3,
                type: "number",
                max: 1,
                min: 1e-3
              }
            ) })
          ]
        }
      ),
      v("churchTax") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("churchTax") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          D,
          {
            onChange: (f) => S({ churchTax: f }),
            initialValue: i?.current.churchTax
          }
        ) })
      ] }),
      v("hasChildren") && /* @__PURE__ */ r(A, { children: [
        /* @__PURE__ */ r(P, { children: [
          /* @__PURE__ */ t(R, { children: l("hasChildren") }),
          /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
            D,
            {
              onChange: (f) => S({ hasChildren: f }),
              initialValue: i?.current.hasChildren
            }
          ) })
        ] }),
        i?.current.hasChildren && /* @__PURE__ */ r(A, { children: [
          /* @__PURE__ */ r(P, { children: [
            /* @__PURE__ */ t(R, { children: l("childAllowances") }),
            /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
              w,
              {
                onChange: (f) => S({ childAllowances: f }),
                initialValue: i?.current?.childAllowances || 0,
                step: 0.5,
                type: "number"
              }
            ) })
          ] }),
          /* @__PURE__ */ r(P, { children: [
            /* @__PURE__ */ t(R, { children: l("childrenCount") }),
            /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
              w,
              {
                onChange: (f) => S({ childrenCount: f }),
                initialValue: i?.current?.childrenCount || 0,
                step: 1,
                type: "number"
              }
            ) })
          ] })
        ] })
      ] })
    ] }),
    (v("healthInsurance") || v("pensionInsurance") || v("workTypeOfficial")) && /* @__PURE__ */ r(J, { className: b ? "block" : "hidden", children: [
      v("workTypeOfficial") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("workTypeOfficial") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          D,
          {
            onChange: (f) => S({ workTypeOfficial: f }),
            initialValue: i?.current.workTypeOfficial
          }
        ) })
      ] }),
      !i?.current?.workTypeOfficial && v("healthInsurance") && /* @__PURE__ */ r(A, { children: [
        /* @__PURE__ */ r(P, { children: [
          /* @__PURE__ */ t(R, { children: l("healthInsurance") }),
          /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
            G,
            {
              onChange: (f) => S({
                healthInsurance: parseInt(f)
              }),
              initialValue: i?.current.healthInsurance?.toString() || "1",
              type: "number",
              options: [
                {
                  optValue: "1",
                  name: "gesetzliche Krankenversicherung"
                },
                {
                  optValue: "2",
                  name: "private Krankenversicherung"
                }
                // {
                //   optValue: "2",
                //   name: "private Krankenversicherung ohne Arbeitgeberzuschuss",
                // },
                // {
                //   optValue: "3",
                //   name: "private Krankenversicherung mit Arbeitgeberzuschuss",
                // },
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ r(
          P,
          {
            className: `${i?.current.healthInsurance === 1 ? "flex" : "hidden"}`,
            children: [
              /* @__PURE__ */ r(R, { children: [
                l("healthInsuranceFactor"),
                /* @__PURE__ */ r(y, { children: [
                  /* @__PURE__ */ t("h2", { children: l("healthInsuranceFactorHintHeadline") }),
                  /* @__PURE__ */ t("p", { children: l("healthInsuranceFactorHintText") })
                ] })
              ] }),
              /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
                w,
                {
                  onChange: (f) => S({ healthInsuranceFactor: f }),
                  initialValue: i?.current.healthInsuranceFactor || 1.6,
                  step: 0.01,
                  min: 0.01,
                  max: 10,
                  prefix: "%",
                  type: "number"
                }
              ) })
            ]
          }
        )
      ] }),
      !i?.current?.workTypeOfficial && v("pensionInsurance") && /* @__PURE__ */ r(P, { children: [
        /* @__PURE__ */ t(R, { children: l("pensionInsurance") }),
        /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(
          G,
          {
            onChange: (f) => S({
              pensionInsurance: parseInt(f)
            }),
            initialValue: i?.current.pensionInsurance?.toString() || "0",
            type: "number",
            options: [
              { name: "Ja (West)", optValue: "0" },
              { name: "Ja (Ost)", optValue: "1" },
              { name: "Nein", optValue: "2" }
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ r(J, { noBorder: !0, children: [
      /* @__PURE__ */ r(
        P,
        {
          className: `${h?.bikeRows && V !== "direct" ? "" : "hidden"}`,
          children: [
            /* @__PURE__ */ t(R, {}),
            /* @__PURE__ */ t(x, { children: /* @__PURE__ */ t(O, { size: "big", onClick: I, className: "w-full", children: l("calculate") }) })
          ]
        }
      ),
      /* @__PURE__ */ t(P, { children: /* @__PURE__ */ t(x, { className: "justify-center w-full flex-col" }) })
    ] }),
    /* @__PURE__ */ t(ye, { extended: b, results: { ...c } }),
    /* @__PURE__ */ t(
      "div",
      {
        className: `border-2 border-[#cf0000] p-4 rounded-md ${T ? "" : "hidden"}`,
        children: l("error")
      }
    )
  ] }) });
}
const je = {
  text: "#000000",
  // text color
  textRequired: "#00000055",
  // required text color
  textLight: "#aaaaaa",
  // lower prio light texts
  formBg: "#ffffff",
  // form background
  headRowBg: "#F0F7F2",
  // head row background
  headBoxBg: "#FCFCFC",
  // head row background
  yes: "#6caf6c",
  // toggle switched to yes
  no: "#cccccc",
  // toggle switched to no
  primary: "orange",
  // headlines, big result numbers
  button: "orange",
  // buttons background
  buttonText: "#ffffff",
  // text on buttons
  buttonLight: "#cccccc",
  // lower prio buttons background
  border: "#EFEFEF",
  // border color
  input: "white",
  // input background
  inputDisabled: "#dddddd",
  // disabled input background
  inputRequired: "#eeeeee",
  // required field background
  resultRowHighlight: "#f7f7f7",
  // result highlighted rows background
  resultRowAlternate: "#f7f7f7",
  // result alternateed rows background
  resultRowHead: "#eeeeee",
  // result heading background
  resultRowFoot: "#f7f7f7",
  // result foot background
  resultDetailButton: "#e8e8e8"
  // result detail button background
}, Xe = {
  // ---------------
  // INITIAL PARAMS
  // ---------------
  // initial form values
  initialParams: {
    // bikes
    totalPrice: 999.99,
    // bike(s) price in €
    totalPriceUVP: 999.99,
    // bike(s) uvp price in €
    leasingPeriod: 36,
    // default is 36 (3 years)
    bikeCount: 1,
    // number of bikes
    bikeRows: [
      {
        price: 999.99,
        uvp: 999.99,
        uid: 0
      }
    ],
    insurancePackage: "premiumPlus",
    // insurance package baisc|premium|premiumPlus
    // income tax and insurances
    salaryGross: 0,
    // monthly income  in €
    employerTaxDeduction: !0,
    // if employer can deduct VAT or not
    churchTax: !1,
    // has to pay church tax or not
    taxClass: 1,
    // tax class I to VI
    taxFactor: 1,
    // tax factor for IV tax class
    pensionInsurance: 0,
    healthInsurance: 1,
    // public (1) or private (1)
    healthInsuranceFactor: 1.7,
    // factor for public health insurance (default is 1.6)
    region: "",
    // region preselect
    workTypeOfficial: !1,
    // if is official (Beamte) or not
    hasChildren: !1,
    // if has children
    childAllowances: 0,
    // child allowances
    childrenCount: 0,
    // number of children
    benefit: 3.33,
    // employer benefit in € per bike or in %
    benefit2: 0,
    // employer benefit in % from insurance when benefit type is 8
    benefitInternet: 0,
    benefitPhone: 0,
    benefitAds: 0,
    benefitAdditional: void 0
  },
  // ---------------
  // INDIVIDUALIZATION
  // ---------------
  settings: {
    language: "de",
    // set language if multiple text sets are include (see texts attribute below)
    isProduct: !1,
    // if calculator is included on product page (prices not editble)
    calculateMethod: "direct",
    // calculate "direct" or via button click ("button")
    formMode: "extended",
    // "extended" or "compact" (the latter can be extended via click)
    // bike settings
    repairCost: 400,
    // repair cost per bike used in calculation
    maxBikes: 2,
    // maximum bikes allowed
    maxBikePrice: 1 / 0,
    // maximum bike price for each bike
    minBikePrice: 357,
    // minimum bike price for each bike
    linkToInsurances: void 0,
    // link to insurance details in comparison table
    // employer benefit
    benefitType: 2,
    benefitDropdown: void 0,
    // choosable benefit
    benefitAdditional: void 0,
    //[{ value: 10, name: "Test 1", editable: false },{ value: 11, name: "Test 2", editable: true },, // additional benefits
    // 0 = none;
    // 1 = fixed value ber bike depending on insurance packae;
    // 2 = fixed value per bike;
    // 3: percent of total price (bikes + insurance),
    // 4: percent of insurance price
    // 5: percent of UVP price
    // 6: free choice via input field
    // 7: dropdown
    // 8: two benefits combined (percent of insurance + percent of leasing rate)
    benefitPerInsurancePackage: {
      // preset employer benefit per package
      // basic: 0,
      // premium: 1,
      // premiumPlus: 2,
    },
    benefitBikeCount: 1e3,
    // maximum bikes the employer benefit will be multiplied with
    benefitFixed: !1,
    // set employer benefit field disabled (so user cannot change it)
    // calculation details
    noTaxOnInsurance: !1,
    // if insurance should be tax free
    subtractBenefitsInResults: !1,
    // if employer benefit should be subtracted from leaseing rate
    subtractTaxAfterEmployerBenefit: !1,
    // if VAT should be subtracted from monthly income after employer benefit
    useFullBikeUvpPrice: !0,
    // default is a quarter of the bike uvp price for subtraction from monthly income. Setting here true uses the full price
    includeInsuranceForFactorComparison: !1,
    // default for looking up leasing factor is netto bike price. If set to "true" the insurance price will be also included for lookup
    hasReverseCalculator: !1,
    // if reverse calculator is available
    // dropdown for regions
    regions: [
      { short: "BW", full: "Baden-Württemberg" },
      { short: "BAYERN", full: "Bayern" },
      { short: "BERLIN", full: "Berlin" },
      { short: "BRANDENBURG", full: "Brandenburg" },
      { short: "BREMEN", full: "Bremen" },
      { short: "HH", full: "Hamburg" },
      { short: "HESSEN", full: "Hessen" },
      { short: "MECKLENBURG", full: "Mecklenburg-Vorpommern" },
      { short: "NIEDERSACHSEN", full: "Niedersachsen" },
      { short: "NRW", full: "Nordrhein-Westfalen" },
      { short: "RP", full: "Rheinland-Pfalz" },
      { short: "SAARLAND", full: "Saarland" },
      { short: "SACHSEN", full: "Sachsen" },
      { short: "SA", full: "Sachsen-Anhalt" },
      { short: "SH", full: "Schleswig-Holstein" },
      { short: "TH", full: "Thüringen" }
    ],
    // insurance and leasing facor tables
    insurancePackages: [
      {
        name: "premium",
        title: "Premium",
        leasingFactors: [{ upto: 1e8, value: 3.27 }],
        leasingInsurancePrices: [
          { upto: 1500, value: 533.52 },
          { upto: 3e3, value: 583.2 },
          { upto: 4760, value: 678.24 },
          { upto: 5e3, value: 821.52 },
          { upto: 6e3, value: 893.52 },
          { upto: 8e3, value: 1088.28 },
          { upto: 1e4, value: 1338.48 },
          { upto: 12e3, value: 1583.28 }
        ],
        maxBikePrice: 1 / 0,
        // insurance features for display in comparison table
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
          SickLeave: !0,
          ParentalLeave: !0,
          DepartureOfEmployee: !0,
          AccidentalDeath: !0,
          Deductible: "compareTableNone",
          SmallClaims: "compareTableNone"
        }
      },
      {
        name: "premiumPlus",
        title: "PremiumPLUS",
        leasingFactors: [{ upto: 1e8, value: 3.27 }],
        leasingInsurancePrices: [
          { upto: 1500, value: 486 },
          { upto: 2e3, value: 558 },
          { upto: 2500, value: 612 },
          { upto: 3e3, value: 666 },
          { upto: 3500, value: 720 },
          { upto: 4e3, value: 774 },
          { upto: 5e3, value: 828 },
          { upto: 6e3, value: 954 },
          { upto: 7e3, value: 1080 },
          { upto: 8e3, value: 1188 },
          { upto: 1e4, value: 1332 },
          { upto: 12e3, value: 1548 },
          { upto: 15e3, value: 1980 },
          { upto: 2e4, value: 2520 }
        ],
        maxBikePrice: 1 / 0,
        // insurance features for display in comparison table
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
      }
    ]
  },
  //  hide different form fields
  hiddenInputs: [
    // "hasChildren",
    // "pensionInsurance",
    // "healthInsurance",
    // "workTypeOfficial",
    // "region",
    // "benefit",
    "benefitAds",
    "benefitPhone",
    "benefitInternet",
    // "insurancePackage",
    "leasingPeriod"
    // "employerTaxDeduction",
    // "taxClass",
    // "churchTax",
  ],
  colors: je,
  // ---------------
  // TEXTS
  // ---------------
  // all texts
  texts: {
    de: {
      // language set german. Add sets with language code that can be selected via settings.language attribute
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
      savingsAgainstPurchase: "Ersparnis Betrag gegenüber dem Direktkauf",
      realNet: "Tatsächliche Nettobelastung durch die Gehalts&shy;umwandlung (Differenz zu Gehalt ohne Leasing)",
      realNetShort: "Tatsächliche monatliche Netto&shy;belastung durch die Gehalts&shy;umwandlung",
      totalPrice: "Bike-Kaufpreis inkl. MwSt.",
      exclVat: "exkl. MwSt.",
      totalPriceUVP: "Brutto&shy;listenpreis (UVP) Bike",
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
      insuranceCostExplaination: "durchschnittlicher Wert für eine Vollkaskoversicherung für eine Laufzeit von 36 Monaten; Zzgl. optionaler Restkaufwert.",
      insuranceCostInclusive1: "Inkl. einer Vollkaskoversicherung in Höhe von",
      insuranceCostInclusive2: "je Bike",
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
      takeoverPrice: "Kaufpreis bzw. Übernahmepreis",
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
      smallText: "<p>(Unverbindliches Kalkulationsbeispiel. Die Berechnung hängt vom individuellen Einkommen, der Steuerklasse und den jeweiligen Freibeträgen ab. Bitte wenden Sie sich bei steuerlichen Fragen an Ihren Steuerberater.)</p><p>Die Grundmietzeit beginnt mit dem Ersten des auf die Übernahme folgenden Kalendermonats. Erfolgt die Übernahme vor dem Beginn der Grundmietzeit, ist für die Zwischenzeit je Tag 1/30 der monatlichen Leasingrate zu zahlen.</p><p>* Inkl. einer Vollkaskoversicherung in Höhe von 400 Euro je Bike (durchschnittlicher Wert für eine Vollkaskoversicherung mit Laufzeit von 36 Monaten); Zzgl. optionaler Restkaufwert.</p>",
      error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      incl: "inkl.",
      package: "Paket"
    }
  }
}, qe = ({ options: n }) => /* @__PURE__ */ t("div", { id: "eur-leasingcalc", children: /* @__PURE__ */ t(
  Se,
  {
    options: { ...n },
    defaultOptions: Xe,
    children: /* @__PURE__ */ t(ve, { children: /* @__PURE__ */ t($e, {}) })
  }
) }), Ye = (n) => n.replace(/-([a-z])/g, (e, a) => a.toUpperCase());
class Qe extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const e = this.getPropsFromAttributes(), { options: a, styleSheet: s, country: i = "de" } = e, c = Y.createRoot(this.shadowRoot);
    let d;
    try {
      d = JSON.parse(a);
    } catch {
      d = a;
    }
    c.render(
      i === "de" ? /* @__PURE__ */ t(qe, { options: d }) : (
        // : country === "at" ? (
        //   <EurLeasingCalcAt options={parsedOptions} />
        // )
        null
      )
    );
    const h = document.createElement("link");
    h.rel = "stylesheet", h.href = s, this?.shadowRoot?.appendChild(h);
  }
  getPropsFromAttributes() {
    const e = {};
    for (let a = 0; a < this.attributes.length; a++) {
      const s = this.attributes[a];
      e[Ye(s.name)] = s.value;
    }
    return e;
  }
}
customElements.define("eur-leasingcalc", Qe);
export {
  qe as EurLeasingCalc,
  Qe as EurLeasingCalcWebComponent
};
//# sourceMappingURL=eurorad-calc.es.js.map
