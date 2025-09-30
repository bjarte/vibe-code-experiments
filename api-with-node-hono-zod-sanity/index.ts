import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import 'dotenv/config'
import { Hono } from 'hono'
import { z } from 'zod'
import type { LocalizationModel } from './localization/localizationModel'
import { LocalizationService } from './localization/localizationService'
import { SanityClient, SanityDocument } from './sanity/sanityClient'

export const app = new Hono()

const sanityClient = new SanityClient()
const localizationService = new LocalizationService(sanityClient)

const idSchema = z.object({
  id: z.string(),
})

app.get('/api/:id', zValidator('param', idSchema), async (context) => {
  const { id } = context.req.valid('param')

  if (id === 'locale') {
    const documents: SanityDocument[] | null = await sanityClient.getAll('locale')
    return context.json(documents)
  }

  const translations: LocalizationModel | null = await localizationService.getById(id)

  if (!translations) {
    return context.json({ error: 'ID not found' }, 404)
  }

  return context.json(translations)
})

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(
      `Server is running. Example query: http://localhost:${info.port}/api/utbetalingermfe`
    )
  }
)
