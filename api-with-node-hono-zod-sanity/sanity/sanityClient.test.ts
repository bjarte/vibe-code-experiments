import 'dotenv/config'
import { describe, it, expect } from 'vitest'
import { SanityClient } from './sanityClient'
import type { LocalizationEntry } from '../localization/localizationEntry'

describe('SanityClient', () => {
  const client = new SanityClient()

  it('should fetch locale entry with id "pensjon"', async () => {
    const result = await client.getById<LocalizationEntry>('locale', 'pensjon')

    expect(result).toBeDefined()
    if (result) {

      console.log('Fetched locale entry:', result)

      expect(result._id).toBe('pensjon')
      expect(result._type).toBe('locale')
      expect(result._createdAt).toBeDefined()
      expect(result._updatedAt).toBeDefined()
    }
  })

  it('should return null for non-existent entry', async () => {
    const result = await client.getById<LocalizationEntry>('locale', 'non-existent-id')

    expect(result).toBeNull()
  })
})
