import { toHTML } from "@portabletext/to-html";
import { I18nBlock, Locale } from '../sanity.types';
import { SanityClient } from '../sanity/sanityClient';
import type { LocalizationModel } from './localizationModel';

export class LocalizationService {

  constructor(private sanityClient: SanityClient) { }

  async getById(id: string): Promise<LocalizationModel | null> {

    try {
      const result = await this.sanityClient.getById<Locale>('locale', id)

      if (!result) {
        return null
      }

      var nbNOString: string = ""
      var nnNOString: string = ""
      var enGBString: string = ""

      var nbNOTranslation: I18nBlock | undefined = result.translations?.find(t => t.key === 'nb-NO')?.value
      var nnNOTranslation: I18nBlock | undefined = result.translations?.find(t => t.key === 'nn-NO')?.value
      var enGBTranslation: I18nBlock | undefined = result.translations?.find(t => t.key === 'en-GB')?.value

      if (nbNOTranslation !== undefined) {
        nbNOString = toHTML(nbNOTranslation, { onMissingComponent: () => '' }) // Handle missing components gracefully
      }

      if (nnNOTranslation !== undefined) {
        nnNOString = toHTML(nnNOTranslation, { onMissingComponent: () => '' }) // Handle missing components gracefully
      }

      if (enGBTranslation !== undefined) {
        enGBString = toHTML(enGBTranslation, { onMissingComponent: () => '' }) // Handle missing components gracefully
      }

      // Convert Locale to LocalizationEntry
      const localizationEntry: LocalizationModel = {
        id: result.id?.current || result._id,
        "nb-NO": nbNOString,
        "nn-NO": nnNOString,
        "en-GB": enGBString
      }

      return localizationEntry
    } catch (error) {
      console.error(`Error loading localization entry with id ${id}:`, error)
      return null
    }

  }
}
