import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import type { LocalizationEntry } from './models/localizationEntry'
import { DummyLocalizationRepository } from './repositories/localizationRepository'

const app = new Hono()
const localizationRepo = new DummyLocalizationRepository()

const idSchema = z.object({
  id: z.string()
})

app.get('/api/:id', zValidator('param', idSchema), (context) => {
  const { id } = context.req.valid('param')

  const translations: LocalizationEntry | undefined = localizationRepo.getById(id)

  if (!translations) {
    return context.json({ error: 'ID not found' }, 404)
  }

  return context.json(translations)
})

export default {
  port: 3000,
  fetch: app.fetch,
}
