import type { LocalizationEntry } from '../models/localizationEntry'
import type { LocalizationRepository } from './localizationRepository'

export class SanityLocalizationRepository implements LocalizationRepository {
  getById(id: string): LocalizationEntry | undefined {
    return {
      id,
      "nb-NO": "Min nøkkel",
      "nn-NO": "Mi nykjel",
      "en-GB": "My key"
    }
  }
}