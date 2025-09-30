import 'dotenv/config'
import { describe, it, expect } from 'vitest'
import { SanityClient } from './sanityClient'
import type { Locale } from '../sanity.types'

describe('SanityClient', () => {
  const client = new SanityClient()

  const localeId: string = 'utbetalingermfe'
  const localeType: string = 'locale'

  it(`should fetch locale entry with id "${localeId}"`, async () => {
    console.log(`Starting test: fetching ${localeType} entry with id "${localeId}"`)
    const result = await client.getById<Locale>(localeType, localeId)
    console.log('Result:', result)

    expect(result).toBeDefined()

    if (result) {
      console.log('Result ID:', result.id?.current)
      console.log('Result Type:', result._type)
      expect(result.id?.current).toBe(localeId)
      expect(result._type).toBe(localeType)
      expect(result._createdAt).toBeDefined()
      expect(result._updatedAt).toBeDefined()
    }
  })

  it('should return null for non-existent entry', async () => {
    console.log(`Starting test: fetching non-existent ${localeType} entry`)
    const result = await client.getById<Locale>(localeType, 'non-existent-id')
    console.log('Result for non-existent entry:', result)

    expect(result).toBeNull()
  })
})
