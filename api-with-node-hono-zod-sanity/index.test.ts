import { describe, expect, it } from 'vitest'
import { app } from './index'
import type { LocalizationModel } from './localization/localizationModel'

describe('API endpoints', () => {
  it('should return localization data for valid id', async () => {
    const req = new Request('http://localhost:3000/api/utbetalingermfe')
    const res = await app.fetch(req)

    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual({
      id: 'utbetalingermfe',
      'nb-NO': 'Mine utbetalinger',
      'nn-NO': 'Mine utbetalingar',
      'en-GB': 'My payments',
    })
  })

  it('should handle different ids correctly', async () => {
    const req = new Request('http://localhost:3000/api/forsidemfe')
    const res = await app.fetch(req)

    expect(res.status).toBe(200)

    const data = (await res.json()) as LocalizationModel
    expect(data.id).toBe('forsidemfe')
    expect(data['nb-NO']).toBe('En positiv dame holder opp en telefon hvor telefonskjermen viser at pensjonen er i orden')
  })

  it('should return 404 for non-existent routes', async () => {
    const req = new Request('http://localhost:3000/nonexistent')
    const res = await app.fetch(req)

    expect(res.status).toBe(404)
  })
})
