/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 在这里添加环境变量的类型
  readonly VITE_APP_TITLE: string;

  readonly VITE_APP_FLAG: string;
  readonly VITE_APP_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
