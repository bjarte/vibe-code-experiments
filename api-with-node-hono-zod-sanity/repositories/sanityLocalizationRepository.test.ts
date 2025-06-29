import { describe, it, expect } from 'vitest'
import { SanityLocalizationRepository } from './sanityLocalizationRepository'

describe('SanityLocalizationRepository', () => {
  const repository = new SanityLocalizationRepository()

  it('should return localization entry with correct id', () => {
    const result = repository.getById('test-id')

    expect(result).toBeDefined()
    expect(result?.id).toBe('test-id')
  })

  it('should return correct localized strings', () => {
    const result = repository.getById('any-id')

    expect(result).toEqual({
      id: 'any-id',
      'nb-NO': 'Min nøkkel',
      'nn-NO': 'Mi nykjel',
      'en-GB': 'My key'
    })
  })

  it('should return same localized strings for different ids', () => {
    const result1 = repository.getById('id1')
    const result2 = repository.getById('id2')

    expect(result1?.['nb-NO']).toBe(result2?.['nb-NO'])
    expect(result1?.['nn-NO']).toBe(result2?.['nn-NO'])
    expect(result1?.['en-GB']).toBe(result2?.['en-GB'])
  })
})
