/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 在这里添加环境变量的类型
  readonly VITE_APP_TITLE: string

  readonly VITE_APP_API_FLAG: string
  readonly VITE_APP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "CME2D"
declare module "CME-RasterRender"
declare module "CME_MeteoSinglePoint"
