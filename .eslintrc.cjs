module.exports = {
  parser: "vue-eslint-parser",

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    ".eslintrc-auto-import.json",
  ],

  settings: {
    "import/resolver": {
      typeScript: true,
      // alias: {
      //   map: [["@", "./src"]],
      //   extensions: [".ts", ".js", ".jsx", ".json", ".vue"],
      // },
    },
  },

  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  plugins: ["@typescript-eslint", "vue", "import"],

  rules: {
    "import/order": [
      "error",
      {
        // 对导入模块进行分组，分组排序规则如下
        groups: [
          "builtin", // 内置模块
          "external", // 外部模块
          "parent", //父节点依赖
          "sibling", //兄弟依赖
          "internal", //内部引用
          "index", // index文件
          "type", //类型文件
          "unknown",
        ],
        //通过路径自定义分组
        pathGroups: [
          {
            pattern: "@/**", // 把@开头的应用放在external分组后面
            group: "external",
            position: "after",
          },
        ],
        // 是否开启独特组，用于区分自定义规则分组和其他规则分组
        distinctGroup: true,
        // 每个分组之间换行
        "newlines-between": "always",
        // 相同分组排列规则 按字母升序排序
        alphabetize: { order: "asc" },
      },
    ],
  },
};
