module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-prettier/recommended",
    "stylelint-config-standard-vue",
  ],
  plugins: ["stylelint-prettier", "stylelint-order"],
  overrides: [
    { files: ["**/*.(less|css|vue|html)"], customSyntax: "postcss-less" },
    { files: ["**/*.(html|vue)"], customSyntax: "postcss-html" },
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json", "**/*.md", "**/*.yaml"],
  rules: {
    "order/properties-order": [
      // 定位
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",

      // 显示模式
      "display",
      "flex",
      "flex-bundle",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "grid",
      "grid-area",
      "grid-auto-rows",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-gap",
      "grid-row",
      "grid-row-start",
      "grid-row-end",
      "grid-row-gap",
      "grid-column",
      "grid-column-start",
      "grid-column-end",
      "grid-column-gap",
      "grid-template",
      "grid-template-areas",
      "grid-template-rows",
      "grid-template-columns",
      "gap",
      "align-content",
      "align-items",
      "align-self",
      "justify-content",
      "justify-items",
      "justify-self",
      "order",

      // 盒模型
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "border",
      "border-spacing",
      "border-collapse",
      "border-width",
      "border-style",
      "border-color",
      "border-top",
      "border-right",
      "border-bottom",
      "border-left",
      "border-radius",
      "box-sizing",
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "overflow",
      "overflow-x",
      "overflow-y",
      "clip",
      "clear",

      // 排版
      "font",
      "font-family",
      "font-size",
      "font-smoothing",
      "osx-font-smoothing",
      "font-style",
      "font-weight",
      "line-height",
      "letter-spacing",
      "word-spacing",
      "color",
      "text-align",
      "text-decoration",
      "text-indent",
      "text-overflow",
      "text-rendering",
      "text-size-adjust",
      "text-shadow",
      "text-transform",
      "word-break",
      "word-wrap",
      "white-space",
      "vertical-align",

      // 视觉效果
      "background",
      "background-color",
      "background-image",
      "background-position",
      "background-repeat",
      "background-size",
      "border",
      "border-collapse",
      "border-color",
      "border-radius",
      "border-style",
      "border-width",
      "box-shadow",
      "filter",
      "opacity",

      // 动画
      "transition",
      "animation",
      "animation-name",
      "animation-duration",
      "animation-play-state",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",

      // Misc
      "appearance",
      "content",
      "cursor",
      "pointer-events",
      "visibility",
    ],
  },
};
