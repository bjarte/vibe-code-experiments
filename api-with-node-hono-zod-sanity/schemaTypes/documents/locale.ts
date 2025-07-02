import { defineField, defineType } from "sanity";
import { supportedLanguages } from "../../src/lib/i18n";

export const locale = defineType({
    name: "locale",
    title: "Locale",
    type: "document",
    preview: {
        select: {
            id: "id",
            i18n: "translations",
        },
        prepare: ({ id, i18n }) => ({
            title: id.current,
            subtitle: `${(() => {
                let totals = 0;
                const expectedTotal = i18n.length * supportedLanguages.length;
                i18n.map((t: any) => {
                    for (const key in t.value) {
                        if (t.value[key] && t.value[key] !== null) {
                            totals++;
                        }
                    }
                });
                return `${totals} of ${expectedTotal} translated`;
            })()}`,
        }),
    },
    fields: [
        defineField({
            name: "id",
            title: "ID of document",
            type: "slug",
        }),
        defineField({
            name: "translations",
            title: "Translations",
            type: "array",
            of: [{ type: "translationKey" }],
        }),
    ],
});
