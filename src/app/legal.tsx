import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-white space-y-16">

      {/* 🇬🇧 ENGLISH */}
      <section>
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4">
          By paying the deposit, you agree to the following:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Deposits for Basic, Standard, and Pro plans are non-refundable.</li>
          <li>Actual travel costs (airfare, hotels, meals, transport, etc.) are not included.</li>
          <li>Itinerary is personalized but may be subject to availability.</li>
          <li>Please ensure you review all details before making the payment.</li>
        </ul>
      </section>

      {/* 🇪🇸 ESPAÑOL */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Términos y Condiciones</h2>
        <p className="mb-4">
          Al pagar el depósito, aceptas lo siguiente:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Los depósitos de los planes Básico, Estándar y Pro no son reembolsables.</li>
          <li>Los costos reales del viaje (vuelos, hoteles, comidas, transporte, etc.) no están incluidos.</li>
          <li>El itinerario es personalizado pero puede estar sujeto a disponibilidad.</li>
          <li>Por favor revisa todos los detalles antes de realizar el pago.</li>
        </ul>
      </section>

      {/* 🇮🇹 ITALIANO */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Termini e Condizioni</h2>
        <p className="mb-4">
          Pagando il deposito, accetti quanto segue:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>I depositi per i piani Base, Standard e Pro non sono rimborsabili.</li>
          <li>I costi reali del viaggio (voli, hotel, pasti, trasporti, ecc.) non sono inclusi.</li>
          <li>L’itinerario è personalizzato ma può essere soggetto a disponibilità.</li>
          <li>Ti preghiamo di controllare tutti i dettagli prima di effettuare il pagamento.</li>
        </ul>
      </section>

      {/* BACK */}
      <div className="pt-10 border-t border-neutral-800">
        <Link href="/" className="text-[#C7A24A] underline">
          ← Back to Home
        </Link>
      </div>

    </main>
  );
}
