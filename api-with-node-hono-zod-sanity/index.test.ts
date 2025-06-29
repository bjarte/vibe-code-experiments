import { describe, it, expect } from 'vitest'
import { app } from './index'
import type { LocalizationEntry } from './models/localizationEntry'

describe('API endpoints', () => {
  it('should return localization data for valid id', async () => {
    const req = new Request('http://localhost/api/test-key')
    const res = await app.fetch(req)

    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual({
      id: 'test-key',
      'nb-NO': 'Min nøkkel',
      'nn-NO': 'Mi nykjel',
      'en-GB': 'My key'
    })
  })

  it('should handle different ids correctly', async () => {
    const req = new Request('http://localhost/api/another-key')
    const res = await app.fetch(req)

    expect(res.status).toBe(200)

    const data = await res.json() as LocalizationEntry
    expect(data.id).toBe('another-key')
    expect(data.id).toBe('another-key')
    expect(data['nb-NO']).toBe('Min nøkkel')
  })

  it('should return 404 for non-existent routes', async () => {
    const req = new Request('http://localhost/nonexistent')
    const res = await app.fetch(req)

    expect(res.status).toBe(404)
  })
})
