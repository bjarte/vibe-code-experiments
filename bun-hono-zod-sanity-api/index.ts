import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { localizationData } from './data/localizationData'
import type { LocalizationEntry } from './models/localizationEntry'

const app = new Hono()

const idSchema = z.object({
  id: z.string()
})

app.get('/api/:id', zValidator('param', idSchema), (context) => {
  const { id } = context.req.valid('param')

  const translations: LocalizationEntry | undefined = localizationData[id]

  if (!translations) {
    return context.json({ error: 'ID not found' }, 404)
  }

  return context.json({
    id,
    ...translations
  })
})

export default {
  port: 3000,
  fetch: app.fetch,
}
