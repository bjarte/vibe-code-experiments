import { SanityClient } from '../sanity/sanityClient'
import type { LocalizationEntry } from './localizationEntry'
import { Locale } from '../schemaTypes/documents/locale'

export class LocalizationLoader {
  private client = new SanityClient()

  async getById(id: string): Promise<LocalizationEntry | null> {
    try {
      const result = await this.client.getById<Locale>('localizationEntry', id)
      return result
    } catch (error) {
      console.error(`Error loading localization entry with id ${id}:`, error)
      return null
    }
  }
}
