import type { LocalizationEntry } from '../models/localizationEntry'
import type { LocalizationLoader } from './localizationLoader'

export class SanityLocalizationLoader implements LocalizationLoader {
  getById(id: string): LocalizationEntry | undefined {
    return {
      id,
      "nb-NO": "Min nøkkel",
      "nn-NO": "Mi nykjel",
      "en-GB": "My key"
    }
  }
}