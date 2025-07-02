export const supportedLanguages = [
    { id: "nb", title: "Norwegian (Bokmål)" },
    { id: "nn", title: "Norwegian (Nynorsk)" },
    { id: "en", title: "English" },
];
export const defaultLanguages = ["nb"];

export const requireAllLanguages = (value: Record<string, string>) => {
    const hasAllLanguages = supportedLanguages.every((lang) => value[lang.id]);
    if (!hasAllLanguages) {
        return "Missing translations for all languages";
    }
    return true;
};
