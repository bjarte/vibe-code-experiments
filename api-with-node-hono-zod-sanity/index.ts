import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import 'dotenv/config'
import { Hono } from 'hono'
import { z } from 'zod'
import type { LocalizationEntry } from './localization/localizationEntry'
import type { LocalizationLoader } from './localization/localizationLoader'
import { SanityLocalizationLoader } from './localization/localizationLoader'
import { SanityClient, SanityDocument } from './sanity/sanityClient'

export const app = new Hono()

const localizationLoader: LocalizationLoader
  = new SanityLocalizationLoader()
const sanityClient
  = new SanityClient()

const idSchema = z.object({
  id: z.string()
})

app.get('/api/:id', zValidator('param', idSchema), async (context) => {

  const { id } = context.req.valid('param')

  console.log(id)

  if (id === 'dummy') {
    const documents: SanityDocument[] | null
      = await sanityClient.getAll("dummyType")
    return context.json(documents)
  }

  const translations: LocalizationEntry | null
    = await localizationLoader.getById(id)

  if (!translations) {
    return context.json({ error: 'ID not found' }, 404)
  }

  return context.json(translations)

})

serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}/api`)
})
