import 'dotenv/config'
import { describe, it, expect } from 'vitest'
import { SanityClient } from './sanityClient'
import type { Locale } from '../sanity.types'

describe('SanityClient', () => {
  const client = new SanityClient()

  it('should fetch locale entry with id "utbetalingermfe"', async () => {
    console.log('Starting test: fetching locale entry with id "pensjon"')
    const result = await client.getById<Locale>('locale', 'pensjon')
    console.log('Result:', result)

    expect(result).toBeDefined()

    if (result) {
      console.log('Result ID:', result._id)
      console.log('Result Type:', result._type)
      expect(result._id).toBe('utbetalingermfe')
      expect(result._type).toBe('locale')
      expect(result._createdAt).toBeDefined()
      expect(result._updatedAt).toBeDefined()
    }
  })

  it('should return null for non-existent entry', async () => {
    console.log('Starting test: fetching non-existent entry')
    const result = await client.getById<Locale>('locale', 'non-existent-id')
    console.log('Result for non-existent entry:', result)

    expect(result).toBeNull()
  })
})
