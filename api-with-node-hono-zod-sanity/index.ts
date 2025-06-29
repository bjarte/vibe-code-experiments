import 'dotenv/config'
import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import type { LocalizationEntry } from './localization/localizationEntry'
import type { LocalizationLoader } from './localization/localizationLoader'
import { SanityLocalizationLoader } from './localization/sanityLocalizationLoader'

export const app = new Hono()

const localizationLoader: LocalizationLoader = new SanityLocalizationLoader()

const idSchema = z.object({
  id: z.string()
})

app.get('/api/:id', zValidator('param', idSchema), (context) => {

  const { id } = context.req.valid('param')

  const translations: LocalizationEntry | undefined
    = localizationLoader.getById(id)

  if (!translations) {
    return context.json({ error: 'ID not found' }, 404)
  }

  return context.json(translations)

})

serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
