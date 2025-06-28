import type { LocalizationEntry } from '../models/localizationEntry'

export interface LocalizationRepository {
  getById(id: string): LocalizationEntry | undefined
}

export class DummyLocalizationRepository implements LocalizationRepository {
  getById(id: string): LocalizationEntry | undefined {
    return {
      id,
      "nb-NO": "Min nøkkel",
      "nn-NO": "Mi nykjel",
      "en-GB": "My key"
    }
  }
}