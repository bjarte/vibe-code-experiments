import { toHTML } from '@portabletext/to-html'
import { I18nBlock, Locale } from '../sanity.types'
import { SanityClient } from '../sanity/sanityClient'
import type { LocalizationModel } from './localizationModel'

export class LocalizationService {
  constructor(private sanityClient: SanityClient) {}

  async getById(id: string): Promise<LocalizationModel | null> {
    try {
      const result = await this.sanityClient.getById<Locale>('locale', id)

      if (!result?.translations) {
        return null
      }

      /*
      Example from Optimizely
      https://www.kpt.spk.no/locales/msm/pensjon/utbetalinger_mfe/

      Stored as:
      utbetalinger_mfe
      - felles
      -- tittel

      
      {
      "felles": {
        "tittel": "Mine utbetalinger",
      },
      

      Same locales in Sanity:
      https://www.sanity.io/@oNjtJStyK/studio/vqb0f7zjothq3253d8o7hk2u/production/structure/locale;YYLEHI4DIMLvrZa2Xm9ScN

      Stored as
      utbetalinger_mfe
      - felles.tittel
      
      */

      var nbNOString: string = ''
      var nnNOString: string = ''
      var enGBString: string = ''

      var i18nBlock: I18nBlock | undefined = result.translations[0]?.value

      if (i18nBlock?.nb !== undefined) {
        nbNOString = toHTML(i18nBlock?.nb, { onMissingComponent: () => '' }).replace(
          /^<p>|<\/p>$/g,
          ''
        )
      }

      if (i18nBlock?.nn !== undefined) {
        nnNOString = toHTML(i18nBlock?.nn, { onMissingComponent: () => '' }).replace(
          /^<p>|<\/p>$/g,
          ''
        )
      }

      if (i18nBlock?.en !== undefined) {
        enGBString = toHTML(i18nBlock?.en, { onMissingComponent: () => '' }).replace(
          /^<p>|<\/p>$/g,
          ''
        )
      }

      // Convert Locale to LocalizationEntry
      const localizationEntry: LocalizationModel = {
        id: result.id?.current || result._id,
        'nb-NO': nbNOString,
        'nn-NO': nnNOString,
        'en-GB': enGBString,
      }

      return localizationEntry
    } catch (error) {
      console.error(`Error loading localization entry with id ${id}:`, error)
      return null
    }
  }
}
