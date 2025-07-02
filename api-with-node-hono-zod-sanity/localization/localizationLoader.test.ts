import { describe, expect, it } from 'vitest'
import { LocalizationLoader } from './localizationLoader'

describe('LocalizationLoader', () => {
  const loader = new LocalizationLoader()

  it('should return localization entry with correct id', () => {
    const result = loader.getById('test-id')

    expect(result).toBeDefined()
    expect(result?.id).toBe('test-id')
  })

  it('should return correct localized strings', () => {
    const result = loader.getById('any-id')

    expect(result).toEqual({
      id: 'any-id',
      'nb-NO': 'Min nøkkel',
      'nn-NO': 'Mi nykjel',
      'en-GB': 'My key'
    })
  })

  it('should return same localized strings for different ids', () => {
    const result1 = loader.getById('id1')
    const result2 = loader.getById('id2')

    expect(result1?.['nb-NO']).toBe(result2?.['nb-NO'])
    expect(result1?.['nn-NO']).toBe(result2?.['nn-NO'])
    expect(result1?.['en-GB']).toBe(result2?.['en-GB'])
  })
})
