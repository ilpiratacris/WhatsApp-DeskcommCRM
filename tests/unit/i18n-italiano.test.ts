import { describe, expect, it } from "vitest";
import { format } from "date-fns";

import { DICIONARIO, traduzir } from "@/lib/i18n/dicionario";
import italiano from "@/lib/i18n/traducoes/it.json";
import { localeDeData, tagDeIdioma } from "@/lib/i18n/datas";
import { normalizarIdioma, parseAcceptLanguage } from "@/lib/i18n/idiomas";
import { NAV_CATALOG, NAV_GROUPS } from "@/lib/navigation/catalogo";

const catalogo: Record<string, string> = italiano;
const tokens = (s: string) => s.match(/\{\{?[^{}\n]+\}?\}|https?:\/\/[^\s]+|`[^`]+`/g) ?? [];

describe("italiano: catálogo, parâmetros e preferência", () => {
  it("cobre todas as frases do dicionário sem traduções vazias", () => {
    expect(Object.keys(DICIONARIO).length).toBeGreaterThan(8000);
    expect(Object.keys(DICIONARIO).filter((chave) => !catalogo[chave]?.trim())).toEqual([]);
  });

  it("preserva parâmetros, URLs e trechos de código de cada frase", () => {
    expect(
      Object.keys(DICIONARIO).filter(
        (chave) => JSON.stringify(tokens(chave)) !== JSON.stringify(tokens(catalogo[chave] ?? "")),
      ),
    ).toEqual([]);
  });

  it("resolve os textos reais da navegação e seus hubs", () => {
    const textos = NAV_CATALOG.flatMap((item) => [item.label, item.description, "section" in item ? item.section : undefined])
      .concat(NAV_GROUPS.flatMap((grupo) => [grupo.label, grupo.hub?.label]))
      .filter((texto): texto is string => Boolean(texto));
    expect(textos.filter((texto) => !catalogo[texto])).toEqual([]);
    expect(traduzir("Configurações", "it")).toBe("Impostazioni");
    expect(traduzir("Senha", "it")).toBe("Password");
    expect(traduzir("testo sconosciuto", "it")).toBe("testo sconosciuto");
  });

  it("aceita italiano e mantém o padrão histórico para valores desconhecidos", () => {
    expect(normalizarIdioma("it")).toBe("it");
    expect(normalizarIdioma("xx")).toBe("pt-BR");
    expect(parseAcceptLanguage("it-IT,it;q=0.9,en;q=0.8")).toBe("it");
    expect(tagDeIdioma("it")).toBe("it-IT");
    expect(format(new Date(2026, 9, 4), "EEEE d MMMM", { locale: localeDeData("it") })).toBe(
      "domenica 4 ottobre",
    );
  });
});
