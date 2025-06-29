import type { LocalizationEntry } from './localizationEntry'

export interface LocalizationLoader {
  getById(id: string): LocalizationEntry | undefined
}
