import { describe, expect, it, vi } from 'vitest'
import { LocalizationService } from './localizationService'
import { SanityClient } from '../sanity/sanityClient'
import type { Locale } from '../sanity.types'
import type { LocalizationModel } from './localizationModel'

describe('LocalizationService', () => {
  const mockSanityClient = {
    getById: vi.fn()
  } as unknown as SanityClient

  const localizationService = new LocalizationService(mockSanityClient)

  it('should return localization entry with correct id', async () => {
    const mockLocale: Locale = {
      _id: 'test-id',
      _type: 'locale',
      _createdAt: '2023-01-01',
      _updatedAt: '2023-01-01',
      _rev: 'rev1',
      id: { _type: 'slug', current: 'test-id' },
      translations: [
        {
          _key: 'nb-NO',
          _type: 'translationKey',
          key: 'nb-NO',
          value: { _type: 'i18n.block', nb: [{ _type: 'block', _key: 'key1', children: [{ _type: 'span', _key: 'span1', text: 'Min nøkkel' }] }] }
        },
        {
          _key: 'nn-NO',
          _type: 'translationKey',
          key: 'nn-NO',
          value: { _type: 'i18n.block', nn: [{ _type: 'block', _key: 'key2', children: [{ _type: 'span', _key: 'span2', text: 'Mi nykjel' }] }] }
        },
        {
          _key: 'en-GB',
          _type: 'translationKey',
          key: 'en-GB',
          value: { _type: 'i18n.block', en: [{ _type: 'block', _key: 'key3', children: [{ _type: 'span', _key: 'span3', text: 'My key' }] }] }
        }
      ]
    }

    vi.mocked(mockSanityClient.getById).mockResolvedValue(mockLocale)

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
      _rev: 'rev1',
      id: { _type: 'slug', current: 'any-id' },
      translations: [
        {
          _key: 'nb-NO',
          _type: 'translationKey',
          key: 'nb-NO',
          value: { _type: 'i18n.block', nb: [{ _type: 'block', _key: 'key1', children: [{ _type: 'span', _key: 'span1', text: 'Min nøkkel' }] }] }
        },
        {
          _key: 'nn-NO',
          _type: 'translationKey',
          key: 'nn-NO',
          value: { _type: 'i18n.block', nn: [{ _type: 'block', _key: 'key2', children: [{ _type: 'span', _key: 'span2', text: 'Mi nykjel' }] }] }
        },
        {
          _key: 'en-GB',
          _type: 'translationKey',
          key: 'en-GB',
          value: { _type: 'i18n.block', en: [{ _type: 'block', _key: 'key3', children: [{ _type: 'span', _key: 'span3', text: 'My key' }] }] }
        }
      ]
    }

    vi.mocked(mockSanityClient.getById).mockResolvedValue(mockLocale)

    const result = await localizationService.getById('any-id')

    expect(result).toEqual({
      id: 'any-id',
      'nb-NO': '<p>Min nøkkel</p>',
      'nn-NO': '<p>Mi nykjel</p>',
      'en-GB': '<p>My key</p>'
    })
  })

  it('should return null when locale not found', async () => {
    vi.mocked(mockSanityClient.getById).mockResolvedValue(null)

    const result = await localizationService.getById('nonexistent-id')

    expect(result).toBeNull()
  })
})
