import { defineField, defineType } from "sanity";
import { supportedLanguages } from "../../src/lib/i18n";

export const i18nBlock = defineType({
    name: "i18n.block",
    title: "i18n Block",
    type: "object",
    groups: supportedLanguages.map(({ id, title }) => ({
        name: id,
        title,
    })),
    fields: supportedLanguages.map(({ id, title }) =>
        defineField({
            name: id,
            group: id,
            title,
            type: "array",
            of: [{ type: "block" }],
        }),
    ),
});
