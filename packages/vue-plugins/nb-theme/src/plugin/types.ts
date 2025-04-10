import type { Ref } from 'vue'

export type ThemeTextMap = Record<string, Record<string, string>>

export interface ThemeOptions {
  theme: string
  dev?: boolean
  texts?: ThemeTextMap
}

export interface ThemePluginContext {
  theme: Ref<string>
  changeTheme: (value?: string) => void
  getThemeVariableValue: (prop: string | null) => string
  getThemeText: (text: string) => string
}
