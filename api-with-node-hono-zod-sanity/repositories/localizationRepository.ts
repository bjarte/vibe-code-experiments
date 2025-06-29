import type { LocalizationEntry } from '../models/localizationEntry'

export interface LocalizationRepository {
  getById(id: string): LocalizationEntry | undefined
}