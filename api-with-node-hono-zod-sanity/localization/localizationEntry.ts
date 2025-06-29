import type { SanityDocument } from '../sanity/sanityClient'

export interface LocalizationEntry extends SanityDocument {
  _type: 'locale'
  "slug": string
  "nb-NO": string
  "nn-NO": string
  "en-GB": string
}
