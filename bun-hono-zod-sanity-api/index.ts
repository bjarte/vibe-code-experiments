import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const idSchema = z.object({
  id: z.string()
})

const localizationData: Record<string, { "nb-NO": string, "nn-NO": string, "en-GB": string }> = {
  "mykey": {
    "nb-NO": "Min nøkkel",
    "nn-NO": "Mi nykjel", 
    "en-GB": "My key"
  }
}

app.get('/api/:id', zValidator('param', idSchema), (c) => {
  const { id } = c.req.valid('param')
  
  const translations = localizationData[id]
  
  if (!translations) {
    return c.json({ error: 'ID not found' }, 404)
  }
  
  return c.json({
    id,
    ...translations
  })
})

export default {
  port: 3000,
  fetch: app.fetch,
}