import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env['SANITY_PROJECT_ID'] || '',
  dataset: process.env['SANITY_DATASET'] || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export class SanityClient {
  private client = sanityClient

  async getById<T extends SanityDocument>(type: string, id: string): Promise<T | null> {

    // const query = `*[_type == $type && _id == $id][0]`
    const query = `*[_type == 'locale' && _id == $id][0]`
    const params = { type, id }
    
    try {
      const result = await this.client.fetch<T | null>(query, params)
      return result
    } catch (error) {
      console.error(`Error fetching ${type} with id ${id}:`, error)
      throw error
    }
  }

  async getAll<T extends SanityDocument>(type: string): Promise<T[]> {
    const query = `*[_type == $type]`
    const params = { type }
    
    try {
      const result = await this.client.fetch<T[]>(query, params)
      return result
    } catch (error) {
      console.error(`Error fetching all ${type}:`, error)
      throw error
    }

  }
}
