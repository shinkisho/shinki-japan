"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const legalContent = {
  en: {
    title: "Terms & Conditions",
    intro: "By paying the deposit, you agree to the following:",
    points: [
      "Deposits for Basic, Standard, and Pro plans are non-refundable.",
      "Actual travel costs (airfare, hotels, meals, transport, etc.) are not included.",
      "Itinerary is personalized but may be subject to availability.",
      "Please ensure you review all details before making the payment.",
    ],
    back: "← Back to Home",
  },
  es: {
    title: "Términos y Condiciones",
    intro: "Al pagar el depósito, aceptas lo siguiente:",
    points: [
      "Los depósitos de los planes Básico, Estándar y Pro no son reembolsables.",
      "Los costos reales del viaje (vuelos, hoteles, comidas, transporte, etc.) no están incluidos.",
      "El itinerario es personalizado pero puede estar sujeto a disponibilidad.",
      "Por favor revisa todos los detalles antes de realizar el pago.",
    ],
    back: "← Volver al inicio",
  },
  it: {
    title: "Termini e Condizioni",
    intro: "Pagando il deposito, accetti quanto segue:",
    points: [
      "I depositi per i piani Base, Standard e Pro non sono rimborsabili.",
      "I costi reali del viaggio (voli, hotel, pasti, trasporti, ecc.) non sono inclusi.",
      "L’itinerario è personalizzato ma può essere soggetto a disponibilità.",
      "Ti preghiamo di controllare tutti i dettagli prima di effettuare il pagamento.",
    ],
    back: "← Torna alla Home",
  },
} as const;

export default function Legal() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"en" | "es" | "it">("en");

  // 🔥 URLの ?lang= を初期言語に反映
  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "en" || urlLang === "es" || urlLang === "it") {
      setLang(urlLang);
    }
  }, [searchParams]);

  const t = legalContent[lang];

  return (
    <main className="min-h-screen bg-[#141414] text-white relative px-6 py-20">
      
      {/* 🌍 Language Switch */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 text-xs">
        {(["en", "es", "it"] as const).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-3 py-1 border rounded ${
              lang === code
                ? "border-[#C7A24A] text-[#C7A24A]"
                : "border-neutral-600 text-neutral-400 hover:border-[#C7A24A]"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

        <p className="mb-4">{t.intro}</p>

        <ul className="list-disc list-inside mb-10 space-y-2">
          {t.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <Link
          href={`/?lang=${lang}`}
          className="text-[#C7A24A] underline"
        >
          {t.back}
        </Link>
      </div>
    </main>
  );
}
