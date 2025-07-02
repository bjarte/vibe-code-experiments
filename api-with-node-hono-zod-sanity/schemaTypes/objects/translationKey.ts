import { defineType, defineField } from "sanity";
import { supportedLanguages } from "../../src/lib/i18n";

export const translationKey = defineType({
    name: "translationKey",
    title: "Translation Key",
    type: "object",
    preview: {
        select: {
            key: "key",
            value: "value",
        },
        prepare: ({ key, value }) => {
            const block = (value.nb || []).find((block: any) => block._type === "block");
            return {
                title: key,
                subtitle: `${supportedLanguages.map((lang) => `${value[lang.id] ? "✅" : "📋"} ${lang.id}`).join(" ")} | ${
                    block
                        ? block.children
                              .filter((child: any) => child._type === "span")
                              .map((span: any) => span.text)
                              .join("")
                        : "No title"
                }`,
            };
        },
    },
    fields: [
        defineField({
            name: "value",
            title: "Value",
            type: "i18n.block",
        }),
        defineField({
            name: "key",
            title: "Key",
            type: "string",
            readOnly: true,
        }),
        defineField({
            name: "devInput",
            title: "Utvikler input",
            type: "i18n.string",
            readOnly: true,
        }),
    ],
});
