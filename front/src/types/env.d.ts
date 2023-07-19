/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_server: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}