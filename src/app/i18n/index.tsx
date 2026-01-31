import en from "./en";
import es from "./es";
import it from "./it";

export const translations = {
  en,
  es,
  it,
};

export type Lang = keyof typeof translations;
