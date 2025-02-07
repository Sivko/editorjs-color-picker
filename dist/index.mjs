(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('html{font-family:Arial,Helvetica,sans-serif}.ce-popover--inline .ce-popover--nested .ce-popover__container{width:min-content!important;min-width:unset!important}.ce-popover--inline .ce-popover--nested .ce-popover__items{width:max-content}.editorjs__colorpicker-container{display:grid;gap:8px;padding:6px}.editorjs__colorpicker-label{color:#78716c;font-size:12px;font-weight:600;line-height:18px;grid-column:1 / -1}.editorjs__colorpicker-tooltip{position:fixed;font-size:12px;font-weight:400;line-height:12px;background-color:#454241;color:#fff;border-radius:6px;padding:6px 8px;z-index:1000;white-space:nowrap;pointer-events:none}.editorjs__color-selector__container-item:hover .editorjs__colopicker--selector__container-item__tooltip,.editorjs__background-selector__container-item:hover .editorjs__colopicker--selector__container-item__tooltip{opacity:1}.editorjs__color-selector__container-item:before{content:"A";position:absolute;font-size:14px;left:0;right:0;text-align:center;top:4px}.editorjs__color-selector__container-item,.editorjs__background-selector__container-item{position:relative;width:24px;height:24px;display:block;cursor:pointer;border-radius:6px}.editorjs__color-selector__container-item--shadow,.editorjs__background-selector__container-item--shadow{position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:0 0 0 1px inset;border-radius:6px;transition:all .5s ease}.editorjs__color-selector__container-item--shadow:hover,.editorjs__background-selector__container-item--shadow:hover{box-shadow:0 0 0 2px inset}')),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var p = Object.defineProperty;
var C = (i, t, e) => t in i ? p(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var s = (i, t, e) => C(i, typeof t != "symbol" ? t + "" : t, e);
const d = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M5.24296 11.4075C5.23167 10.6253 5.52446 9.8395 6.12132 9.24264L9.65686 5.70711C10.0474 5.31658 10.6809 5.31693 11.0714 5.70745L16.0205 10.6565C16.2268 10.8629 16.3243 11.1371 16.3126 11.4075M5.24296 11.4075C5.25382 12.1607 5.54661 12.9106 6.12132 13.4853L8 15.364M5.24296 11.4075H11.9565M16.3126 11.4075C16.3022 11.6487 16.205 11.8869 16.0208 12.0711L12.4853 15.6066C11.3137 16.7782 9.41421 16.7782 8.24264 15.6066L8 15.364M16.3126 11.4075H11.9565M8 15.364L11.9565 11.4075"/><path stroke="currentColor" stroke-width="2" d="M20 17.4615C20 18.3112 19.3284 19 18.5 19C17.6716 19 17 18.3112 17 17.4615C17 16.6119 17.9 15.6154 18.5 15C19.1 15.6154 20 16.6119 20 17.4615Z"/></svg>';
class E {
  constructor({ api: t, config: e }) {
    s(this, "api");
    s(this, "tag", "SPAN");
    s(this, "class", "cdx-text-color");
    s(this, "lastRange", null);
    s(this, "tooltip", null);
    s(this, "icon", d);
    s(this, "columns", 5);
    s(this, "colors");
    s(this, "backgrounds");
    this.api = t, this.colors = (e == null ? void 0 : e.colors) ?? this.getDefaultColors(), this.backgrounds = (e == null ? void 0 : e.backgrounds) ?? this.getDefaultBackgrounds(), this.icon = (e == null ? void 0 : e.icon) ?? d;
  }
  static get title() {
    return "Color";
  }
  static get isInline() {
    return !0;
  }
  getDefaultColors() {
    return {
      "Угольный черный": ["#1C1917", "#1C1917"],
      "Пепельный серый": ["#78716C", "#E7E5E4"],
      "Бирюзовый морской": ["#0D9488", "#99F6E4"],
      "Огненно-оранжевый": ["#EA580C", "#FED7AA"],
      "Золотисто-жёлтый": ["#CA8A04", "#FEF08A"],
      "Ярко-зелёный": ["#16A34A", "#BBF7D0"],
      "Сапфировый синий": ["#1C64F2", "#BFDBFE"],
      "Фиолетовый аметист": ["#9333EA", "#E9D5FF"],
      "Малиновый розовый": ["#DB2777", "#FBCFE8"],
      "Алый красный": ["#DC2626", "#FECACA"]
    };
  }
  getDefaultBackgrounds() {
    return {
      "Угольный черный": ["#1C1917", "#fff"],
      "Серебристо-серый": ["#E7E5E4", "#F5F5F4"],
      "Нежная мята": ["#99F6E4", "#CCFBF1"],
      Персиковый: ["#FED7AA", "#FFEDD5"],
      "Пастельный желтый": ["#FEF08A", "#FEF9C3"],
      "Мятно-зеленый": ["#BBF7D0", "#DCFCE7"],
      "Небесно-голубой": ["#BFDBFE", "#DBEAFE"],
      Лавандовый: ["#E9D5FF", "#F3E8FF"],
      "Розовый пастель": ["#FBCFE8", "#FCE7F3"],
      "Нежно-коралловый": ["#FECACA", "#FEE2E2"]
    };
  }
  render() {
    const t = document.createElement("button");
    return t.type = "button", t.innerHTML = this.icon, t.classList.add(this.api.styles.inlineToolButton), t.addEventListener("mousedown", (e) => e.preventDefault()), t;
  }
  surround(t) {
    this.lastRange = t;
  }
  wrapAndColor(t, e, o = !1) {
    if (!t) return;
    const r = t.extractContents(), n = document.createElement(this.tag);
    n.classList.add(this.class), n.appendChild(r), n.style[o ? "backgroundColor" : "color"] = e, n.innerHTML = n.textContent || "", t.insertNode(n), this.api.selection.expandToTag(n);
  }
  createTooltip(t, e) {
    const o = document.createElement("div");
    o.classList.add("editorjs__colorpicker-tooltip"), o.innerHTML = t, document.body.appendChild(o);
    const r = e.getBoundingClientRect();
    return o.style.position = "fixed", o.style.top = `${r.top - 30}px`, o.style.left = `${r.left + r.width / 2 - o.offsetWidth / 2}px`, o;
  }
  createLabel(t) {
    const e = document.createElement("div");
    return e.classList.add("editorjs__colorpicker-label"), e.innerHTML = t, e;
  }
  createPickerSection(t, e, o = !1) {
    const r = document.createElement("div");
    return r.classList.add("editorjs__colorpicker-container"), r.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`, r.append(this.createLabel(t)), Object.entries(e).forEach(([n, [c, u]]) => {
      const l = document.createElement("div");
      l.classList.add(`editorjs__${o ? "background" : "color"}-selector__container-item`), l.style[o ? "backgroundColor" : "color"] = c, l.innerHTML = `<div class="editorjs__${o ? "background" : "color"}-selector__container-item--shadow" style="color: ${u}"></div>`, r.append(l), l.onclick = () => this.wrapAndColor(this.lastRange, c, o), l.onmouseenter = () => this.tooltip = this.createTooltip(n, l), l.onmouseleave = () => {
        var a;
        return (a = this.tooltip) == null ? void 0 : a.remove();
      };
    }), r;
  }
  renderActions() {
    const t = document.createElement("div");
    return t.append(this.createPickerSection("Цвет текста", this.colors)), t.append(this.createPickerSection("Цвет фона", this.backgrounds, !0)), t;
  }
  clear() {
    var t;
    (t = this.tooltip) == null || t.remove();
  }
  static get sanitize() {
    return {
      span: {
        style: {
          color: !0
        }
      }
    };
  }
}
export {
  E as default
};
