import type { LocalizationEntry } from '../models/localizationEntry'

export interface LocalizationLoader {
  getById(id: string): LocalizationEntry | undefined
}