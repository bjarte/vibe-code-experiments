import { describe, expect, it, vi } from 'bun:test'
import { LocalizationService } from './localizationService'
import { SanityClient } from '../sanity/sanityClient'
import type { Locale } from '../sanity.types'

describe('LocalizationService', () => {
  const mockSanityClient = {
    getById: vi.fn(),
  } as unknown as SanityClient

  const localizationService = new LocalizationService(mockSanityClient)

  it('should return locale entry with correct id', async () => {
    const mockLocale: Locale = {
      _id: 'test-id',
      _type: 'locale',
      _createdAt: '2023-01-01',
      _updatedAt: '2023-01-01',
      _rev: 'any-rev',
      id: { _type: 'slug', current: 'test-id' },
      translations: [],
    }

    ;(mockSanityClient.getById as any).mockResolvedValue(mockLocale)

    var result = await localizationService.getById('test-id')

    expect(result).toBeDefined()
    expect(result?.id).toBe('test-id')
  })

  it('should return correct localized strings', async () => {
    const mockLocale: Locale = {
      _id: 'any-id',
      _type: 'locale',
      _createdAt: '2023-01-01',
      _updatedAt: '2023-01-01',
      _rev: 'any-rev',
      id: { _type: 'slug', current: 'any-id' },
      translations: [
        {
          _key: 'any-key',
          _type: 'translationKey',
          key: 'nb',
          value: {
            _type: 'i18n.block',
            nb: [
              {
                _type: 'block',
                _key: 'key1',
                children: [{ _type: 'span', _key: 'span1', text: 'Min nøkkel' }],
              },
            ],
            nn: [
              {
                _type: 'block',
                _key: 'any-key',
                children: [{ _type: 'span', _key: 'span2', text: 'Mi nykjel' }],
              },
            ],
            en: [
              {
                _type: 'block',
                _key: 'any-key',
                children: [{ _type: 'span', _key: 'span3', text: 'My key' }],
              },
            ],
          },
        },
      ],
    }

    ;(mockSanityClient.getById as any).mockResolvedValue(mockLocale)

    const result = await localizationService.getById('any-id')

    expect(result).toEqual({
      id: 'any-id',
      'nb-NO': 'Min nøkkel',
      'nn-NO': 'Mi nykjel',
      'en-GB': 'My key',
    })
  })

  it('should return null when locale entry not found', async () => {
    ;(mockSanityClient.getById as any).mockResolvedValue(null)

    const result = await localizationService.getById('nonexistent-id')

    expect(result).toBeNull()
  })
})
