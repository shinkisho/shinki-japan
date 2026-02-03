"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";




import AnimatedBackground from "./components/AnimatedBackground";

import { motion } from "framer-motion";
import Image from "next/image";
import { serif } from "./fonts";

import AutoGallery from "./components/AutoGallery";
export default function HomeClient() {
  const router = useRouter();
const searchParams = useSearchParams();
const currentLang =
  searchParams.get("lang") === "es" || searchParams.get("lang") === "it"
    ? searchParams.get("lang")
    : "en";
const [lang, setLang] = useState<"en" | "es" | "it">("en");

useEffect(() => {
  const urlLang = searchParams.get("lang");
  if (urlLang === "en" || urlLang === "es" || urlLang === "it") {
    setLang(urlLang);
  }
}, [searchParams]);
const changeLang = (newLang: "en" | "es" | "it") => {
  setLang(newLang);
  router.push(`/?lang=${newLang}`, { scroll: false });
};
 const images = [
  "gallery-1.jpg",
  "gallery-2.jpg",
  "gallery-3.jpg",
  "gallery-4.jpg",
  "gallery-5.jpg",
  
];

const [agreed, setAgreed] = useState(false);



  





/* ---------------- animation ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ---------------- content ---------------- */


const reviews = [
  {
    rating: 5,
     name: "Aimee Walters",
    country: "US",
  commentKey: 0,  
  },

];
/* ---------------- pricing logic ---------------- */

type Locale = "en" | "es" | "it";


type PlanKey = "basic" | "standard" | "pro";

type ContentSchema = {
  /* CTA */
  ctaShort: Record<PlanKey, string>;
  cta: Record<PlanKey, string>;
  ctaConsultation: string;
  heroCtaConsult: string;
  heroCtaWhatsapp: string;

  /* Hero */
  heroTitle1: string;
  heroTitle2: string;

  /* Why section */
  whyTitle: string;
  whyHeading: string;
  whyLead: string;
  whyPoints: readonly string[];
  reasonLabel: string;
  reasons:readonly {
     readonly title: string;
     readonly body:  readonly string[];
  }[];

  /* Profile */
  profile: {
    nameLabel: string;
    bornLabel: string;
    fromLabel: string;
    backgroundLabel: string;
    languagesLabel: string;
    interestsLabel: string;
    admireLabel: string;
    guideLabel: string;

    born: string;
    from: string;
    background: readonly string[];
    languages: readonly string[];
    interests:readonly string[];
    admire:readonly string[];
    guide:readonly string[];
  };

  /* Gallery */
  galleryTitle: string;
  moments: {
    title: string;
    description: string;
  };

  /* Itinerary */
  itineraryLabel: string;
  itineraryTitle: string;
  itineraryDesc: string;

  /* Reviews */
  testimonialsLabel: string;
  reviewsTitle: string;
  reviewsDesc: string;
  reviews:readonly {
    name: string;
    country: string;
    comment: string;
  }[];

  /* Pricing */
  priceSimulatorEyebrow: string;
  priceSimulatorTitle: string;
  priceSimulatorDesc: string;
  selectPlan: string;

  planLabels: Record<PlanKey, string>;
  planDescriptions: Record<
    PlanKey,
    {
      lines:readonly string[];
      highlight?: string;
      note?: string;
    }
  >;

  priceUnit: {
    hour: string;
    day: string;
  };

  slider: {
    hours: string;
    days: string;
  };

  totalLabel: string;
  recommended: string;

  comparison: {
    privateConsulting: string;
    customItinerary: string;
    tokyoGuiding: string;
    nationwideGuiding: string;
  };

  /* Legal / Notes */
  termsPrefix: string;
  termsLink: string;
  notes: {
    points:readonly string[];
    noticeTitle: string;
    noticePoints:readonly string[];
  };
};

const renderPlanTooltip = (plan: PlanKey, t: ContentSchema) => {

  const data = t.planDescriptions[plan];

  return (
    <>
      <strong className="text-[#C7A24A]">
        {t.planLabels[plan]}
      </strong>

      <div className="mt-2 space-y-2 text-sm text-neutral-300 leading-relaxed">
        {data.lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}

     {"highlight" in data && data.highlight && (
  <p className="italic text-neutral-300">
    {data.highlight}
  </p>
)}

{"note" in data && data.note && (
  <p className="text-neutral-400 text-xs">
    {data.note}
  </p>
)}

      </div>
    </>
  );
};



const truncateReview = (text: string, count = 10) => {
  return text.split(" ").slice(0, count).join(" ") + "...";
};

/* ---------------- page ---------------- */


  
  const countryToFlag = (code: string) => {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

  const [plan, setPlan] = useState<"basic" | "standard" | "pro">("pro");
// Standard用（Hourly）
const [hours, setHours] = useState(5);

// Pro用（Daily）
const [days, setDays] = useState(7);
const [activeSection, setActiveSection] = useState<string>("hero");

useEffect(() => {
  const sections = document.querySelectorAll<HTMLElement>("[data-section]");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
       const el = e.target as HTMLElement;
setActiveSection(el.dataset.section!);
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px", // ← ここが肝
      threshold: 0,
    }
  );

  sections.forEach(s => observer.observe(s));
  return () => observer.disconnect();
}, []);






const pricing = {
  basic: {
    type: "fixed",
    price: 290,
  },


  standard: {
    type: "hourly",
    tiers: [
      { maxHours: 5, total: 800 },
      { maxHours: 10, total: 1500 },
      { maxHours: 15, total: 2100 },
      { maxHours: 20, total: 2600 },
      { maxHours: 25, total: 3000 },
      { maxHours: 30, total: 3300 },
      { maxHours: 35, total: 3500 },
      { maxHours: 40, total: 3600 },
    ],
    extraHourRate: 80,
  },

  pro: {
    type: "daily",
    tiers: [
      { days: 7, total: 8400 },
      { days: 8, total: 9200 },
      { days: 9, total: 9900 },
      { days: 10, total: 10500 },
      { days: 11, total: 11000 },
      { days: 12, total: 11400 },
      { days: 13, total: 11700 },
      { days: 14, total: 11900 },
      { days: 15, total: 12000 },
    ],
    extraDayRate: 700,
  },
}as const;

const calculateStandardPrice = (hours: number) => {
  const { tiers, extraHourRate } = pricing.standard;

  // tiersの中で「hours以下で最大のtier」を探す
  const tier = [...tiers].reverse().find(t => hours >= t.maxHours);

  if (tier) {
    const extraHours = hours - tier.maxHours;
    const extra =
      extraHours > 0 ? extraHours * extraHourRate : 0;

    return {
      total: tier.total + extra,
      breakdown:
        extraHours > 0
          ? `$${tier.total} + ${extraHours} × $${extraHourRate}`
          : `$${tier.total}`,
    };
  }

  // 5時間未満（最初のtierより下）
  return {
    total: tiers[0].total,
    breakdown: `$${tiers[0].total}`,
  };
};


const calculateProPrice = (days: number) => {
  const { tiers, extraDayRate } = pricing.pro;

  const tier = [...tiers].reverse().find(t => days >= t.days);

  if (tier) {
    const extraDays = days - tier.days;
    const extra =
      extraDays > 0 ? extraDays * extraDayRate : 0;

    return {
      total: tier.total + extra,
      breakdown:
        extraDays > 0
          ? `$${tier.total} + ${extraDays} × $${extraDayRate}`
          : `$${tier.total}`,
    };
  }

  return {
    total: tiers[0].total,
    breakdown: `$${tiers[0].total}`,
  };
};

const navLabels = {
  en: {
    why: "Why Me",
    price: "Price",
    itinerary: "Itinerary",
    gallery: "Gallery",
    reviews: "Testimonials",
  },
  es: {
    why: "Por qué yo",
    price: "Precio",
    itinerary: "Itinerario",
    gallery: "Galería",
    reviews: "Testimonios",
  },
  it: {
    why: "Perché io",
    price: "Prezzo",
    itinerary: "Itinerario",
    gallery: "Galleria",
    reviews: "Testimonianze",
  },
} as const;
  type PlanDescription = {
  lines: readonly string[]
  highlight?: string
  note?: string
}

 const content = {
  
  en: {
    ctaShort: {
  basic: "Book Basic Plan",
  standard: "Book Standard Plan",
  pro: "Book Pro Plan",
},

    ctaConsultation: "Free Online Consultation",
    testimonialsLabel: "Testimonials",
reviews: [
  {
    name: "Aimee Walters",
    country: "US",
    comment: "Sinki was absolutely lovely to be with. He was attentive and thoughtful. He listened to our questions and helped us communicate with the Tea Ceremony Master. Additionally, he understood that our family was seeking interesting and authentic experiences and took great care helping us plan. Our afternoon and evening with Sinki was once-in-a-lifetime and will remain one of our family’s favorite memories."
 }
],
    moments: {
  title: "Moments Between Destinations",
  description:
    "Fragments of places, light, and quiet encounters — captured not as sights, but as feelings along the way.",
},

    itineraryLabel: "Itinerary",
    notes: {
  points: [
    "No guiding commitment required",
    "Standard & Pro plans include a complimentary Custom Itinerary",
    "Secure your booking with a deposit via Square",
  ],
  noticeTitle: "Please note:",
  noticePoints: [
    "Deposits for Standard and Pro plans, as well as all payments for the Basic plan, are non-refundable once the contract is confirmed.",
    "Itinerary creation includes personalized suggestions for round-trip international flights, accommodations in each city, and dining options, etc.",
    "All actual travel-related expenses — including airfare, hotel costs, meals, domestic transportation within Japan, souvenirs, and personal purchases — are not included in the prices above and remain the responsibility of the guest.",
  ],
},

   termsPrefix: "I have read and agree to the",
termsLink: "Terms & Conditions",
   planDescriptions: {
  basic: {
    lines: [
      "Through a detailed consultation, I create a fully custom itinerary designed only for you.(Guiding is not included)",
    ],
  },

  standard: {
    lines: [
      "Includes a complimentary Custom Itinerary, plus private guiding on your sightseeing days around Tokyo.",
    ],
    note:
      "Recommended: 4-day (40 hours) package · Extra days available at a reduced rate",
  },

  pro: {
    lines: [
      "Your Custom Itinerary is just the beginning.",
      "The very person who designed your journey becomes your private guide from arrival to departure — maximizing every moment of your time in Japan.",
    ],
    highlight:
      "All you need to do is relax and feel Japan between the lines.",
    note:
      "Recommended: 15-day package · Extra days at a preferred rate",
  },
} satisfies Record<PlanKey, PlanDescription>,
 selectPlan: "Select Your Plan",
    reasonLabel: "Reason",
    heroTitle1: "Fully bespoke private journeys",
    heroTitle2: "Attuned to your subtle preferences",
    whyTitle: "Why Me",
    whyPoints: [
      "Your journey is designed and guided by the same professional",
      "Born and raised in Tokyo with deep cultural literacy",
      "Fluent in English, Spanish, and Italian",
      "Specialized in high-end private travel to Japan",
    ],
    galleryTitle: "Gallery",
    contact: "Book Your Free Consultation",
    itineraryTitle: "A Glimpse of Your Journey",
    itineraryDesc: "Example of a bespoke itinerary — every journey is crafted uniquely for you.",
    reviewsTitle: "Reflections from the Journey",
    reviewsDesc:
      "Words shared by those who experienced Japan beyond explanation — where meaning lingered between moments, not landmarks.",
     priceSimulatorEyebrow: "Price Simulator",
      priceSimulatorTitle: "Clarity, Before Commitment",
    priceSimulatorDesc:
      "A transparent way to explore investment ranges — so you can choose your journey with confidence, not uncertainty.",
    cta: {
  basic: "Start with a Basic Plan — Get Your Custom Itinerary",
  standard:
    "Standard Plan with Guaranteed Tokyo Guiding — Pay the Deposit & Get Your Custom Itinerary",
  pro:
    "Pro Plan for a Fully Bespoke Journey — Pay the Deposit & Get Your Custom Itinerary",
},

      heroCtaConsult: "Free Online Consultation",
    heroCtaWhatsapp: "WhatsApp",
     whyHeading: "The Person Behind the Journey",
    whyLead:
      "Not just a guide, but the one who reads what’s left unsaid — designing each moment with cultural depth, intuition, and care.",
   profile: {
      nameLabel: "Name",
      bornLabel: "Born",
      fromLabel: "From",
      backgroundLabel: "Background",
      languagesLabel: "Languages",
      interestsLabel: "Interests",
      admireLabel: "People I admire",
      guideLabel: "Especially good at guiding",

      born: "10 Feb, 1998",
      from: "Tokyo, Japan",

      background: [
        "Former web marketer at a travel agency.",
        "Traveled across 27 countries with a backpack.",
        "Now working as a freelance interpreter-guide in Japan.",
      ],

      languages: ["Japanese", "English", "Spanish", "Italian"],

      interests: ["Travel", "Onsen retreats", "Argentine tango"],

      admire: [
        "Yasujiro Ozu (film director)",
        "Haruki Murakami (writer)",
        "Ryohei Shima (singer)",
        "JaruJaru (comedians)",
        "Tsuyoshi Shinjo (baseball manager)",
      ],

      guide: ["Tea Ceremony", "Shakuhachi (Bamboo Flute)"],
   },
  reasons: [
  {
    title: "Once-in-a-lifetime experience",
    body: [
      "Can you picture the day you’ll come back to Japan?",
      "For most travellers, Japan lies far beyond home.",
      "Unless fortune smiles upon you, the next opportunity may be uncertain.",
      "When you leave, make sure nothing is left undone.",
    ],
  },
  {
    title: "Fully bespoke and one of a kind",
    body: [
      "Together, you and I will craft an itinerary that belongs to no one else in the world.",
      "Every choice, every pause, every detour is shaped around you.",
      "This journey will become a story you’ll tell for the rest of your life.",
    ],
  },
  {
    title: "Between the lines, beyond the guidebooks",
    body: [
      "You will come to understand the true meaning behind my company’s name.",
      "I promise to reveal a side of Japan that is high-context, refined, and at times deliberately elusive.",
      "This is not Japan explained — this is Japan experienced.",
    ],
  },
],
  planLabels: {
      basic: "Basic",
      standard: "Standard",
      pro: "Pro",
    },

    priceUnit: {
      hour: "hour",
      day: "day",
    },

    slider: {
      hours: "Number of hours",
      days: "Number of days",
    },

    totalLabel: "Total",
    recommended: "Recommended",
    comparison: {
  privateConsulting: "Private Consulting",
  customItinerary: "Custom Itinerary",
  tokyoGuiding: "Tokyo Guiding",
  nationwideGuiding: "Nationwide Guiding",
}

  },
  es: {
    ctaShort: {
  basic: "Reservar plan Básico",
  standard: "Reservar plan Estándar",
  pro: "Reservar plan Pro",
},

     ctaConsultation: "Consulta Online Gratuita",
    testimonialsLabel: "Testimonios",
reviews: [
  {
    name: "Aimee Walters",
    country: "US",
    comment: "Estar con Sinki fue absolutamente encantador. Fue atento y considerado en todo momento. Escuchó nuestras preguntas y nos ayudó a comunicarnos con el maestro de la ceremonia del té. Además, comprendió que nuestra familia buscaba experiencias interesantes y auténticas, y puso un gran cuidado en ayudarnos a planificar. Nuestra tarde y noche con Sinki fue una experiencia única en la vida y seguirá siendo uno de los recuerdos favoritos de nuestra familia."
 }
],
    
    moments: {
  title: "Momentos entre destinos",
  description:
    "Fragmentos de lugares, luces y encuentros silenciosos — capturados no como vistas, sino como sensaciones a lo largo del camino.",
},

    itineraryLabel: "Itinerario",

    notes: {
  points: [
    "No se requiere compromiso de guía",
    "Los planes Estándar y Pro incluyen un itinerario personalizado de cortesía",
    "Asegura tu reserva con un depósito a través de Square",
  ],
  noticeTitle: "Por favor ten en cuenta:",
  noticePoints: [
    "Los depósitos de los planes Estándar y Pro, así como todos los pagos del plan Básico, no son reembolsables una vez confirmado el contrato.",
    "La creación del itinerario incluye sugerencias personalizadas para vuelos internacionales de ida y vuelta, alojamiento en cada ciudad y opciones gastronómicas, etc.",
    "Todos los gastos reales del viaje — incluidos vuelos, hoteles, comidas, transporte dentro de Japón, recuerdos y compras personales — no están incluidos en los precios anteriores y son responsabilidad del cliente.",
  ],
},

    termsPrefix: "He leído y acepto",
termsLink: "los Términos y Condiciones",

    planDescriptions: {
  basic: {
    lines: [
      "A través de una consulta detallada, creo un itinerario totalmente personalizado diseñado solo para ti.(La guía no está incluida)",
    ],
  },

  standard: {
    lines: [
      "Incluye un Itinerario Personalizado de cortesía, además de guía privada durante tus días de turismo en Tokio.",
    ],
    note:
      "Recomendado: paquete de 4 días (40 horas) · Días extra disponibles a tarifa reducida",
  },

  pro: {
    lines: [
      "Tu Itinerario Personalizado es solo el comienzo.",
      "La misma persona que diseñó tu viaje se convierte en tu guía privado desde la llegada hasta la salida, aprovechando al máximo cada momento en Japón.",
    ],
    highlight:
      "Todo lo que necesitas hacer es relajarte y sentir Japón entre líneas.",
    note:
      "Recomendado: paquete de 15 días · Días extra a tarifa preferencial",
  },
} satisfies Record<PlanKey, PlanDescription>,

     reasonLabel: "Razón",
    heroTitle1: "Viajes privados completamente personalizados",
    heroTitle2: "Atento a tus preferencias sutiles",
    whyTitle: "Por Qué Yo",
    whyPoints: [
      "Tu viaje es diseñado y guiado por el mismo profesional",
      "Nacido y criado en Tokio con profunda comprensión cultural",
      "Fluido en inglés, español e italiano",
      "Especializado en viajes privados de alto nivel a Japón",
    ],
    galleryTitle: "Galería",
    contact: "Reserva tu consulta gratuita",
    itineraryTitle: "Un vistazo a tu viaje",
    itineraryDesc: "Ejemplo de un itinerario a medida — cada viaje es único y exclusivo para ti.",
    reviewsTitle: "Reflexiones del viaje",
    reviewsDesc:
      "Palabras compartidas por quienes vivieron Japón más allá de la explicación — donde el significado perduraba entre momentos, no en lugares.",
     priceSimulatorEyebrow: "Simulador de Precios",
      priceSimulatorTitle: "Claridad, Antes del Compromiso",
    priceSimulatorDesc:
      "Una manera transparente de explorar rangos de inversión — para que elijas tu viaje con confianza, sin incertidumbre.",
 cta: {
  basic: "Comienza con el Plan Básico — Obtén tu itinerario personalizado",
  standard:
    "Plan Estándar con guía garantizado en Tokio — Paga el depósito y recibe tu itinerario personalizado",
  pro:
    "Plan Pro para un viaje totalmente a medida — Paga el depósito y recibe tu itinerario personalizado",
},
selectPlan: "Selecciona tu plan",
      heroCtaConsult: "Consulta online gratuita",
    heroCtaWhatsapp: "WhatsApp",
     whyHeading: "La persona detrás del viaje",
    whyLead:
      "No solo un guía, sino alguien que sabe leer lo que no se dice — diseñando cada momento con profundidad cultural, intuición y cuidado.",
   profile: {
      nameLabel: "Nombre",
      bornLabel: "Fecha de nacimiento",
      fromLabel: "Origen",
      backgroundLabel: "Trayectoria",
      languagesLabel: "Idiomas",
      interestsLabel: "Intereses",
      admireLabel: "Personas que admiro",
      guideLabel: "Especializado en guiar",

      born: "10 de febrero de 1998",
      from: "Tokio, Japón",

      background: [
        "Ex especialista en marketing web en una agencia de viajes.",
        "Viajó por 27 países con una mochila.",
        "Actualmente trabaja como intérprete-guía freelance en Japón.",
      ],

      languages: ["Japonés", "Inglés", "Español", "Italiano"],

      interests: ["Viajar", "Retiros de onsen", "Tango argentino"],

      admire: [
        "Yasujiro Ozu (director de cine)",
        "Haruki Murakami (escritor)",
        "Ryohei Shima (cantante)",
        "JaruJaru (comediantes)",
        "Tsuyoshi Shinjo (mánager de béisbol)",
      ],

      guide: ["Ceremonia del té", "Shakuhachi (flauta de bambú)"],
    },
    reasons: [
  {
    title: "Una experiencia irrepetible en la vida",
    body: [
      "¿Puedes imaginar el día en que volverás a Japón?",
      "Para la mayoría de los viajeros, Japón está muy lejos de casa.",
      "Si la fortuna no sonríe, la próxima oportunidad puede ser incierta.",
      "Cuando te vayas, asegúrate de no dejar nada pendiente.",
    ],
  },
  {
    title: "Totalmente a medida y única",
    body: [
      "Juntos crearemos un itinerario que no pertenece a nadie más en el mundo.",
      "Cada decisión, cada pausa y cada desvío se diseña pensando en ti.",
      "Este viaje se convertirá en una historia que contarás toda tu vida.",
    ],
  },
  {
    title: "Entre líneas, más allá de las guías",
    body: [
      "Llegarás a comprender el verdadero significado del nombre de mi empresa.",
      "Prometo mostrarte un Japón de alto contexto, refinado y a veces deliberadamente sutil.",
      "Esto no es Japón explicado — es Japón vivido.",
    ],
  },
],

 planLabels: {
      basic: "Básico",
      standard: "Estándar",
      pro: "Pro",
    },

    priceUnit: {
      hour: "hora",
      day: "día",
    },

    slider: {
      hours: "Número de horas",
      days: "Número de días",
    },

    totalLabel: "Total",
    recommended: "Recomendado",
    comparison: {
  privateConsulting: "Consultoría Privada",
  customItinerary: "Itinerario Personalizado",
  tokyoGuiding: "Guía en Tokio",
  nationwideGuiding: "Guía en Todo Japón",
}

  },

  it: {
    ctaShort: {
  basic: "Prenota piano Base",
  standard: "Prenota piano Standard",
  pro: "Prenota piano Pro",
},

     ctaConsultation: "Consulenza Online Gratuita",
    testimonialsLabel: "Testimonianze",
reviews: [
  {
    name: "Aimee Walters",
    country: "US",
    comment: "Stare con Sinki è stato davvero meraviglioso. È stato attento e premuroso in ogni momento. Ha ascoltato le nostre domande e ci ha aiutato a comunicare con il maestro della cerimonia del tè. Inoltre, ha capito che la nostra famiglia cercava esperienze interessanti e autentiche e ha dedicato grande cura nell’aiutarci a pianificare. Il nostro pomeriggio e la nostra serata con Sinki sono stati un’esperienza unica nella vita e rimarranno uno dei ricordi più belli della nostra famiglia."
 }
],

    moments: {
  title: "Momenti tra le destinazioni",
  description:
    "Frammenti di luoghi, luci e incontri silenziosi — catturati non come panorami, ma come emozioni lungo il cammino.",
},

    itineraryLabel: "Itinerario",

    notes: {
  points: [
    "Non è richiesto alcun impegno di guida",
    "I piani Standard e Pro includono un itinerario personalizzato omaggio",
    "Assicura la tua prenotazione con un deposito tramite Square",
  ],
  noticeTitle: "Si prega di notare:",
  noticePoints: [
    "I depositi per i piani Standard e Pro, così come tutti i pagamenti per il piano Base, non sono rimborsabili una volta confermato il contratto.",
    "La creazione dell’itinerario include suggerimenti personalizzati per voli internazionali di andata e ritorno, alloggi in ogni città e opzioni di ristorazione, ecc.",
    "Tutte le spese di viaggio effettive — inclusi voli, hotel, pasti, trasporti interni in Giappone, souvenir e acquisti personali — non sono incluse nei prezzi sopra indicati e restano a carico dell’ospite.",
  ],
},

   termsPrefix: "Ho letto e accetto",
termsLink: "i Termini e Condizioni",

    planDescriptions: {
  basic: {
    lines: [
      "Attraverso una consulenza approfondita, creo un itinerario completamente personalizzato, pensato solo per te.(La guida non è inclusa)",
    ],
  },

  standard: {
    lines: [
      "Include un Itinerario Personalizzato in omaggio, oltre a guida privata durante i tuoi giorni di visita a Tokyo.",
    ],
    note:
      "Consigliato: pacchetto da 4 giorni (40 ore) · Giorni extra disponibili a tariffa ridotta",
  },

  pro: {
    lines: [
      "Il tuo Itinerario Personalizzato è solo l’inizio.",
      "La stessa persona che ha progettato il tuo viaggio diventa la tua guida privata dall’arrivo alla partenza, valorizzando ogni momento del tuo tempo in Giappone.",
    ],
    highlight:
      "Tu devi solo rilassarti e vivere il Giappone tra le righe.",
    note:
      "Consigliato: pacchetto da 15 giorni · Giorni extra a tariffa preferenziale",
  },
} satisfies Record<PlanKey, PlanDescription>,
selectPlan: "Seleziona il tuo piano",
       reasonLabel: "Motivo",
    heroTitle1: "Viaggi privati totalmente su misura",
    heroTitle2: "Sintonizzato sulle tue preferenze sottili",
    whyTitle: "Perché Io",
    whyPoints: [
      "Il tuo viaggio è progettato e guidato dallo stesso professionista",
      "Nato e cresciuto a Tokyo con profonda conoscenza culturale",
      "Fluente in inglese, spagnolo e italiano",
      "Specializzato in viaggi privati di alto livello in Giappone",
    ],
    galleryTitle: "Galleria",
    contact: "Prenota la tua consulenza gratuita",
    itineraryTitle: "Uno sguardo al tuo viaggio",
    itineraryDesc: "Esempio di itinerario personalizzato — ogni viaggio è unico e creato appositamente per te.",
    reviewsTitle: "Riflessioni sul viaggio",
    reviewsDesc:
      "Parole condivise da chi ha vissuto il Giappone oltre la spiegazione — dove il significato rimane tra i momenti, non nei luoghi.",
   priceSimulatorEyebrow: "Simulatore di Prezzi",
      priceSimulatorTitle: "Chiarezza, Prima dell'Impegno",
    priceSimulatorDesc:
      "Un modo trasparente per esplorare le fasce di investimento — così puoi scegliere il tuo viaggio con sicurezza, senza incertezze.",
   cta: {
  basic: "Inizia con il Piano Base — Ottieni il tuo itinerario personalizzato",
  standard:
    "Piano Standard con guida garantita a Tokyo — Paga il deposito e ricevi il tuo itinerario personalizzato",
  pro:
    "Piano Pro per un viaggio completamente su misura — Paga il deposito e ricevi il tuo itinerario personalizzato",
},

      heroCtaConsult: "Consulenza online gratuita",
    heroCtaWhatsapp: "WhatsApp",
        whyHeading: "La persona dietro il viaggio",
    whyLead:
      "Non solo una guida, ma qualcuno che sa leggere ciò che resta non detto — progettando ogni momento con profondità culturale, intuito e cura.",
 profile: {
      nameLabel: "Nome",
      bornLabel: "Data di nascita",
      fromLabel: "Da",
      backgroundLabel: "Percorso",
      languagesLabel: "Lingue",
      interestsLabel: "Interessi",
      admireLabel: "Persone che ammiro",
      guideLabel: "Particolarmente esperto in",

      born: "10 febbraio 1998",
      from: "Tokyo, Giappone",

      background: [
        "Ex web marketer presso un'agenzia di viaggi.",
        "Ha viaggiato in 27 paesi con lo zaino in spalla.",
        "Attualmente lavora come interprete-guida freelance in Giappone.",
      ],

      languages: ["Giapponese", "Inglese", "Spagnolo", "Italiano"],

      interests: ["Viaggi", "Ritiri onsen", "Tango argentino"],

      admire: [
        "Yasujiro Ozu (regista)",
        "Haruki Murakami (scrittore)",
        "Ryohei Shima (cantante)",
        "JaruJaru (comici)",
        "Tsuyoshi Shinjo (manager di baseball)",
      ],

      guide: ["Cerimonia del tè", "Shakuhachi (flauto di bambù)"],
    },
    reasons: [
  {
    title: "Un’esperienza irripetibile nella vita",
    body: [
      "Riesci a immaginare il giorno in cui tornerai in Giappone?",
      "Per molti viaggiatori, il Giappone è molto lontano da casa.",
      "Se la fortuna non sorride, la prossima occasione potrebbe non arrivare presto.",
      "Quando partirai, assicurati di non lasciare nulla incompiuto.",
    ],
  },
  {
    title: "Completamente su misura e unica",
    body: [
      "Insieme creeremo un itinerario che non appartiene a nessun altro al mondo.",
      "Ogni scelta, ogni pausa e ogni deviazione è modellata intorno a te.",
      "Questo viaggio diventerà una storia che racconterai per tutta la vita.",
    ],
  },
  {
    title: "Tra le righe, oltre le guide",
    body: [
      "Comprenderai il vero significato del nome della mia azienda.",
      "Ti prometto di mostrarti un Giappone ad alto contesto, raffinato e talvolta volutamente sfuggente.",
      "Questo non è il Giappone spiegato — è il Giappone vissuto.",
    ],
  },
],

      planLabels: {
      basic: "Base",
      standard: "Standard",
      pro: "Pro",
    },

    priceUnit: {
      hour: "ora",
      day: "giorno",
    },

    slider: {
      hours: "Numero di ore",
      days: "Numero di giorni",
    },

    totalLabel: "Totale",
    recommended: "Consigliato",
    comparison: {
  privateConsulting: "Consulenza Privata",
  customItinerary: "Itinerario Personalizzato",
  tokyoGuiding: "Guida a Tokyo",
  nationwideGuiding: "Guida in Tutto il Giappone",
}

  },
  
}as const;


  const t: ContentSchema = content[lang];

const p = t.profile;
const proPrice =
  plan === "pro" ? calculateProPrice(days) : null;
  const proPerDay =
  proPrice ? Math.round(proPrice.total / days) : null;
 const standardPrice =
  plan === "standard" ? calculateStandardPrice(hours) : null;
 const standardHourly =
  standardPrice ? Math.round(standardPrice.total / hours) : null;
const getCtaText = () => {
  return t.cta[plan];
};
  /*const isActive = (p: "basic" | "standard" | "pro") =>
    plan === p
      ? "text-[#C7A24A]"
      : "text-neutral-500";*/

      
const [isPaused, setIsPaused] = useState(false);
const [activeImage, setActiveImage] = useState<string | null>(null);
const galleryTrackRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (activeImage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [activeImage]);

const itineraryImages = [
  "/Itinerary_1.jpg",
  "/Itinerary_2.jpg",
  "/Itinerary_3.jpg",
  "/Itinerary_4.jpg",
  "/Itinerary_5.jpg",
];

const [activeItineraryIndex, setActiveItineraryIndex] =
  useState<number | null>(null);
const itineraryScrollRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (activeItineraryIndex !== null && itineraryScrollRef.current) {
    const container = itineraryScrollRef.current;
    const width = container.clientWidth;

    container.scrollTo({
      left: width * activeItineraryIndex,
      behavior: "auto", // ← "instant" じゃなくてこれでOK
    });
  }
}, [activeItineraryIndex]);


/* keyboard control */
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (activeItineraryIndex === null) return;

    if (e.key === "ArrowRight") {
      setActiveItineraryIndex((i) => (i! + 1) % 5);
    }
    if (e.key === "ArrowLeft") {
      setActiveItineraryIndex((i) => (i! - 1 + 5) % 5);
    }
    if (e.key === "Escape") {
      setActiveItineraryIndex(null);
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [activeItineraryIndex]);


useEffect(() => {
  const targets = document.querySelectorAll(".keyword");

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    },
    { threshold: 0.6 }
  );

  targets.forEach(t => io.observe(t));
  return () => io.disconnect();
}, []);

    useEffect(() => {
  const el = galleryTrackRef.current;
  if (!el) return;

  const updateScrollDistance = () => {
    const halfWidth = el.scrollWidth / 2; // 画像5枚分＋gap含む実幅
    el.style.setProperty("--scroll-distance", `${halfWidth}px`);

    // スピード（お好みで変えてOK）
    el.style.setProperty("--scroll-duration", "60s");
    el.style.setProperty("--scroll-duration-mobile", "20s");
  };

  updateScrollDistance();
  window.addEventListener("resize", updateScrollDistance);
  return () => window.removeEventListener("resize", updateScrollDistance);
}, []);


  const mark = (active: boolean) =>
  `flex items-center justify-center text-sm md:text-base ${
    active ? "text-[#C7A24A]" : "text-neutral-600"
  }`;


  return (
    <main className="text-white relative overflow-hidden">

  
      
 <AnimatedBackground />










{/* HERO */}
<section className="relative h-screen w-full overflow-hidden z-10">


  <Image
    src="/Hero_PC_dark2.png"
    alt="Japan Between the Lines Hero"
    fill
    priority
    className="object-cover"
  />

 
 
</section>
{/* COSMIC BACKGROUND */}



  

{/* HERO TAGLINE */}
<section className="relative z-10 py-28 px-6 text-center">
  <h1 className={`text-4xl md:text-6xl font-light mb-4 ${serif.className}`}>
  {content[lang].heroTitle1}
</h1>
<p className="text-lg md:text-xl text-neutral-400 tracking-wide">
  {content[lang].heroTitle2}
</p>
</section>


{/* HERO CTA */}
<section className="relative z-10 py-20 flex justify-center">
 <div className="flex flex-row justify-center gap-2 md:gap-6 px-5">

    <a
      href="https://calendly.com/shinki-0210-s"
      target="_blank"
      rel="noopener noreferrer"
      className="
         px-3 py-2 text-[11px] whitespace-nowrap tracking-wide
md:px-12 md:py-4 md:text-base md:tracking-widest
        border border-[#C7A24A]
        text-[#C7A24A]
        tracking-widest
        transition
        hover:bg-[#C7A24A]/15
        hover:shadow-[0_0_12px_rgba(199,162,74,0.35)]
      "
    >
      {t.heroCtaConsult}
    </a>

    <a
      href="https://wa.me/817092356243"
      target="_blank"
      rel="noopener noreferrer"
      className="
       px-3 py-2 text-[11px] whitespace-nowrap tracking-wide
md:px-12 md:py-4 md:text-base md:tracking-widest
        border border-[#C7A24A]
        text-[#C7A24A]
        tracking-widest
        transition
        hover:bg-[#C7A24A]/15
        hover:shadow-[0_0_12px_rgba(199,162,74,0.35)]
      "
    >
      {t.heroCtaWhatsapp}
    </a>
  </div>
</section>

{/* FLOATING SECTION NAV */}
<div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/40 border-b border-neutral-800 hidden md:flex">
  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center gap-10 text-sm tracking-widest">
    {(
      [
        { id: "why" },
        { id: "price" },
        { id: "itinerary" },
        { id: "gallery" },
        { id: "reviews" },
      ] as const
    ).map(({ id }) => (
      <button
        key={id}
        onClick={() =>
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }
        className={`
          transition-all duration-300
          ${
            activeSection === id
              ? "text-[#C7A24A] scale-110"
              : "text-neutral-400 hover:text-[#C7A24A]"
          }
        `}
      >
        {navLabels[lang][id]}
      </button>
    ))}
  </div>
</div>


{/* LANGUAGE SWITCHER */}
<div className="fixed top-4 right-4 z-50 flex gap-2 bg-black/40 backdrop-blur rounded-md p-1 border border-neutral-700">
  {[
    { code: "en", label: "🇬🇧" },
    { code: "es", label: "🇦🇷" },
    { code: "it", label: "🇮🇹" },
  ].map(langOption => {
    const active = lang === langOption.code;
    return (
      <button
        key={langOption.code}
        onClick={() => changeLang(langOption.code as "en" | "es" | "it")}

        className={`
          w-10 h-10 flex items-center justify-center rounded-md
          border-2
          transition-all duration-300
          ${active 
            ? "border-[#C7A24A] text-[#C7A24A] bg-[#C7A24A]/20" 
            : "border-transparent text-neutral-300 hover:border-[#C7A24A] hover:text-[#C7A24A] hover:bg-[#C7A24A]/10"
          }
        `}
        aria-label={`Switch to ${langOption.code.toUpperCase()}`}
      >
        {langOption.label}
      </button>
    );
  })}
</div>



{/* WHY ME */}

<section id="why" data-section="why" className="relative z-10 py-32 px-6 bg-neutral-900 md:bg-transparent">
 
    <div className="max-w-6xl mx-auto px-6">

    {/* SECTION HEADER */}
 <div className="mb-20 max-w-3xl ml-2 md:ml-0">

   {/* Eyebrow */}
    <p className="text-xs tracking-widest text-neutral-500 mb-6 uppercase">
     {t.whyTitle}
    </p>

    {/* Title */}
    <h2 className={`text-3xl font-light mb-6 ${serif.className}`}>
     <span className="keyword">{t.whyHeading}</span>
    </h2>

    {/* Description */}
    <p className="text-neutral-500 max-w-2xl mb-16 leading-relaxed">
     {t.whyLead}
    </p>

   
</div>

    {/* MAIN CONTENT: 2 COLUMNS */}
    <div className="grid md:grid-cols-2 gap-16 items-start">

      {/* LEFT : TEXT */}


<div className="space-y-6 text-neutral-500 text-sm leading-relaxed order-2 md:order-1">
  <p><span className="text-neutral-300">{p.nameLabel}:</span> Shinki Suzuki</p>
  <p><span className="text-neutral-300">{p.bornLabel}:</span> {p.born}</p>
  <p><span className="text-neutral-300">{p.fromLabel}:</span> {p.from}</p>

  <div>
    <p className="text-neutral-300 mb-1">{p.backgroundLabel}:</p>
    <ul className="list-disc list-inside space-y-1">
      {p.background.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>

  <p>
    <span className="text-neutral-300">{p.languagesLabel}:</span>{" "}
    {p.languages.join(", ")}
  </p>

  <p>
    <span className="text-neutral-300">{p.interestsLabel}:</span>{" "}
    {p.interests.join(", ")}
  </p>

  <div>
    <p className="text-neutral-300 mb-1">{p.admireLabel}:</p>
    <ul className="list-disc list-inside space-y-1">
      {p.admire.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>

  <p>
    <span className="text-neutral-300">{p.guideLabel}:</span>{" "}
    {p.guide.join(", ")}
  </p>



      </div>

      {/* RIGHT : IMAGE */}
      <div className="relative w-full h-[460px] md:h-[560px] order-1 md:order-2">
        <Image
          src="/shinki.jpg"
          alt="Shinki Suzuki – Private Travel Designer"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

    </div>

    {/* REASONS : 3 BOXES */}
<div className="mt-24 space-y-6">
  {t.reasons.map((reason, i) => (
    <div
      key={i}
      className="
        group
        border border-neutral-700
        px-6 py-6 md:py-5
        transition-all duration-500
        hover:border-[#C7A24A]
        hover:shadow-[0_0_25px_rgba(199,162,74,0.35)]

        /* 🔥 SPでは高さ制限なし / PCだけ折りたたみ */
        max-h-none md:max-h-[72px]
        md:hover:max-h-[260px]
      "
    >
      {/* タイトル行 */}
      <div className="flex justify-between items-center">
        <p className={`text-base md:text-sm tracking-wide ${serif.className}`}>
          {`${t.reasonLabel} ${i + 1} — ${reason.title}`}
        </p>

        {/* ＋マークはPCだけ表示 */}
        <span className="hidden md:block text-xl text-neutral-400 transition group-hover:text-[#C7A24A]">
          ＋
        </span>
      </div>

      {/* 本文 */}
      <div
        className="
          mt-4
          text-base md:text-sm
          leading-relaxed
          text-neutral-400

          /* 🔥 SPでは常に表示 / PCではホバー時だけ */
          opacity-100 md:opacity-0
          md:group-hover:opacity-100

          transition-opacity duration-500
          space-y-2
        "
      >
        {reason.body.map((line, j) => (
          <p key={j}>{line}</p>
        ))}
      </div>
    </div>
  ))}
</div>

</div>
</section>






      {/* PRICE SIMULATOR */}
      <section id="price" data-section="price" className="relative z-10 py-32 px-6 ">
         <div className="max-w-6xl mx-auto px-6">
          {/* Eyebrow */}
    <p className="text-xs tracking-widest text-neutral-500 mb-6 uppercase">
     {t.priceSimulatorEyebrow}
    </p>

    {/* Title */}
    <h2 className={`text-3xl font-light mb-6 ${serif.className}`}>
   <span className="keyword">  {t.priceSimulatorTitle}</span>   
    </h2>

    {/* Description */}
    <p className="text-neutral-500 max-w-4xl mb-16 leading-relaxed">
 {t.priceSimulatorDesc}
    </p>

          {/* PLAN TABLE */}
{/* 📱 Mobile Plan Selector */}
<div className="md:hidden mb-10">
  <p className="text-sm text-neutral-400 mb-4 text-center">
    {t.selectPlan}
  </p>
  <div className="grid grid-cols-3 gap-3">
    {(["basic", "standard", "pro"] as const).map((p) => {
      const active = plan === p;
      return (
        <button
          key={p}
          onClick={() => setPlan(p)}
          className={`
            py-3 rounded-md border text-sm tracking-wide transition
            ${
              active
                ? "bg-[#C7A24A] text-white border-[#C7A24A]"
                : "border-neutral-600 text-neutral-400"
            }
          `}
        >
          {t.planLabels[p]}
        </button>
      );
    })}
  </div>
</div>

{/* 💻 Plan Comparison Table */}
<div className="grid grid-cols-4 gap-y-4 md:gap-y-6 mb-12 md:mb-16 text-[11px] leading-tight md:text-base">
  <div></div>

  {(["basic", "standard", "pro"] as const).map((p) => {
    const active = plan === p;
    return (
      <div key={p} className="relative group text-center">
        <button
          onClick={() => setPlan(p)}
          className={`
            w-full py-2 md:py-4 text-[12px] md:text-base transition-all duration-300
            ${active
              ? "text-[#C7A24A] md:bg-[#C7A24A]/15 md:scale-105"
              : "text-neutral-500"}
          `}
        >
          {t.planLabels[p]}
        </button>

        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 p-4 bg-[#1a1a1a] border border-[#C7A24A]/40 shadow-xl text-left opacity-0 group-hover:opacity-100 pointer-events-none transition duration-300 z-50">
          {renderPlanTooltip(p, t)}
        </div>
      </div>
    );
  })}

  {/* ROWS */}
  <div className="text-neutral-400 pr-2 leading-snug">
    {t.comparison.privateConsulting}
  </div>
  <div className={mark(plan === "basic")}>〇</div>
  <div className={mark(plan === "standard")}>〇</div>
  <div className={mark(plan === "pro")}>〇</div>

  <div className="text-neutral-400 pr-2 leading-snug">
    {t.comparison.customItinerary}
  </div>
  <div className={mark(plan === "basic")}>〇</div>
  <div className={mark(plan === "standard")}>〇</div>
  <div className={mark(plan === "pro")}>〇</div>

  <div className="text-neutral-400 pr-2 leading-snug">
    {t.comparison.tokyoGuiding}
  </div>
  <div className="flex items-center justify-center text-neutral-700">–</div>
  <div className={mark(plan === "standard")}>〇</div>
  <div className={mark(plan === "pro")}>〇</div>

  <div className="text-neutral-400 pr-2 leading-snug">
    {t.comparison.nationwideGuiding}
  </div>
  <div className="flex items-center justify-center text-neutral-700">–</div>
  <div className="flex items-center justify-center text-neutral-700">–</div>
  <div className={mark(plan === "pro")}>〇</div>
</div>

  




          {/* DAYS SLIDER */}
          {plan == "pro" && (
            <div className="mb-16">
              <p className="text-neutral-400 mb-4">
  {t.slider.days}: <span className="text-white">{days}</span>
</p>

              <input
                type="range"
                min={7}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#C7A24A]"
              />
            </div>
          )}

          {/* RESULT */}

<div className="text-center">
  {plan === "basic" && (
    <>
      <p className="text-4xl font-bold">$290</p>
      <p className="text-neutral-400 mt-2">
        One-time Consulting Fee
      </p>
    </>
  )}

 {/* STANDARD HOURS SLIDER */}
{plan === "standard" && (
  <div className="mb-16">
   <p className="text-neutral-400 mb-4">
  {t.slider.hours}: <span className="text-white">{hours}</span>
</p>


    <input
      type="range"
      min={5}
      max={60}
      step={5}
      value={hours}
      onChange={(e) => setHours(Number(e.target.value))}
      className="w-full accent-[#C7A24A]"
    />
  </div>
)}

{plan === "standard" && standardPrice && (
  <div className="mt-6 text-center">
    {/* Per Hour（上・強調） */}
    <p className="text-4xl font-bold">
      ${standardHourly}
    <span className="text-sm font-light text-neutral-300">
  / {t.priceUnit.hour}
</span>
    </p>

    {/* Total（下・薄く） */}
<p className="text-neutral-400 mt-2">
  {t.totalLabel}: ${standardPrice.total}
</p>

  </div>
)}
{plan === "standard" && hours === 40 && (
 <p className="mt-3 text-sm text-[#C7A24A] tracking-wide">
  ★ {t.recommended}: 40-hour package
</p>

)}

{plan === "pro" && proPrice && (
  <>
    {/* Per Day（上・強調） */}
    <p className="text-4xl font-bold">
      ${proPerDay}
     <span className="text-sm font-light text-neutral-300">
  / {t.priceUnit.day}
</span>
       </p>

    {/* Total（下・薄く） */}
   <p className="text-neutral-400 mt-2">
  {t.totalLabel}: ${proPrice.total}
</p>

  </>
)}

{plan === "pro" &&days === 15 && (
  <p className="mt-3 text-sm text-[#C7A24A] tracking-wide">
    ★ Recommended: 15-day package
  </p>
)}



</div>

      {/* DEPOSIT CTA */}
<div className="mt-20 max-w-xl mx-auto flex flex-col items-center gap-6">

  {/* CHECKBOX */}
  <div className="flex items-start gap-3 text-sm text-neutral-300">
    <input
      type="checkbox"
      id="agree"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
      className="accent-[#C7A24A] mt-1"
    />

 <label htmlFor="agree" className="leading-relaxed">
  {t.termsPrefix}{" "}
<a
  href={`/legal?lang=${currentLang}`}
  target="_blank"
  rel="noopener noreferrer"
  className="underline text-[#C7A24A]"
  onClick={(e) => e.stopPropagation()}
>
  {t.termsLink}
</a>

</label>


  </div>

  {/* CTA BUTTON */}
  <a
    href={agreed ? "https://square.link/u/8FcWVGwt" : undefined}
    onClick={(e) => {
      if (!agreed) {
        e.preventDefault();
        alert("Please agree to the Terms & Conditions before proceeding.");
      }
    }}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      w-full md:w-auto
  text-center
  px-6 md:px-16
  py-4 md:py-5
  tracking-widest text-sm transition
      ${
        agreed
          ? "bg-[#C7A24A] text-white hover:bg-[#b8963f]"
          : "bg-neutral-600 text-neutral-400 cursor-not-allowed"
      }
    `}
  >
  <span className="md:hidden">
  {t.ctaShort[plan]}
</span>
<span className="hidden md:inline">
  {getCtaText()}
</span>
  </a>

  {/* SUBTEXT */}
 

  {/* DISCLAIMER */}
<div className="space-y-3 text-sm text-neutral-400">
  {t.notes.points.map((point, i) => (
    <p key={i}>{point}</p>
  ))}
</div>

<div className="mt-6">
  <p className="font-semibold text-neutral-300 mb-2">
    {t.notes.noticeTitle}
  </p>
  <ul className="list-disc list-inside space-y-2 text-sm text-neutral-500">
    {t.notes.noticePoints.map((point, i) => (
      <li key={i}>{point}</li>
    ))}
  </ul>
</div>

</div>
</div>
</section>

   

{/* ITINERARY */}
<section id="itinerary" data-section="itinerary" className="relative z-10 py-32 px-6 ">
  <div className="max-w-6xl mx-auto px-6">
    <p className="text-xs tracking-widest text-neutral-500 mb-6 uppercase">
   {t.itineraryLabel}
    </p>

    <h2 className="text-3xl font-light mb-6">
     <span className="keyword">{t.itineraryTitle}</span>
    </h2>

    <p className="text-neutral-500 max-w-2xl mb-16 leading-relaxed">
     {t.itineraryDesc}
    </p>

{/* 💻 PCレイアウト */}
<div className="hidden md:grid md:grid-cols-5 gap-6">
  {itineraryImages.map((src, i) => (
    <div
      key={i}
      onClick={() => setActiveItineraryIndex(i)}
      className="relative h-[400px] cursor-pointer group overflow-hidden"
    >
      <div className="absolute inset-0 slow-pan">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition duration-700 scale-105 group-hover:scale-100"
        />
      </div>
    </div>
  ))}
</div>
{/* 📱 SPレイアウト */}
<div className="md:hidden">
  <div
    onClick={() => setActiveItineraryIndex(0)}
    className="relative h-[420px] w-full overflow-hidden rounded-lg"
  >
    <Image
      src={itineraryImages[0]}
      alt="Itinerary preview"
      fill
      className="object-cover"
    />

    {/* オーバーレイ */}
    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
      <p className="text-lg tracking-wide">View Sample Itinerary</p>
      <p className="text-sm text-neutral-200 mt-2">Swipe through the journey →</p>
    </div>
  </div>
</div>




  </div>
</section>




      {/* GALLERY */}
{/* GALLERY */}
<section id="gallery" data-section="gallery" className="relative z-10 py-32 px-6 ">
  <div className="max-w-6xl mx-auto px-6">
    {/* Header */}
    <p className="text-xs tracking-widest text-neutral-500 mb-6 uppercase">
  {t.galleryTitle}
    </p>

    <h2 className="text-3xl font-light mb-6">
      <span className="keyword">{t.moments.title}</span>
    </h2>

    <p className="text-neutral-500 max-w-3xl mb-16 leading-relaxed">
      {t.moments.description}
    </p>

    {/* Slider */}
    <div
      className="relative overflow-hidden gallery-hover-area"
      style={{ pointerEvents: activeImage ? "none" : "auto" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
  ref={galleryTrackRef}
  className={`flex gap-8 gallery-track ${!activeImage && "animate-gallery"}`}
>

         {[...images, ...images].map((img, i) => (
          <div
            key={i}
            
            className="flex-none w-[240px] aspect-[4/5] overflow-hidden cursor-pointer"
            onClick={() => setActiveImage(`/${img}`)}
          >
            <Image
              src={`/${img}`}
              alt="Gallery"
              width={600}
              height={750}
              className="
                object-cover w-full h-full
                grayscale
                transition-all duration-700
                hover:grayscale-0 hover:scale-105
              "
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
{activeImage && (
  <div
    className="fixed inset-0 flex items-center justify-center"
    style={{
      background: "rgba(0,0,0,0.92)",
      zIndex: 999999999,     // とにかく最大
      isolation: "isolate"   // ← ★ これが超重要
    }}
  >
    <div
      className="relative w-[90vw] h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={activeImage}
        alt="Gallery full view"
        fill
        className="object-contain"
        priority
      />
    </div>

    <button
      onClick={() => setActiveImage(null)}
      className="fixed top-6 right-6 text-white text-4xl hover:text-[#C7A24A]"
      style={{ zIndex: 999999999 }}
    >
      ×
    </button>
  </div>
)}








{/* REVIEWS */}
<section id="reviews" data-section="reviews" className="relative z-10 py-32 ">
  <div className="max-w-6xl mx-auto px-6 relative z-0">

          {/* Eyebrow */}
    <p className="text-xs tracking-widest text-neutral-500 mb-6 uppercase">
 {t.testimonialsLabel}
    </p>

    {/* Title */}
    <h2 className={`text-3xl font-light mb-6 ${serif.className}`}>
 <span className="keyword">{t.reviewsTitle}</span>
    </h2>

    {/* Description */}
    <p className="text-neutral-500 max-w-5xl mb-16 leading-relaxed">
{t.reviewsDesc}
    </p>
</div>


   <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
  {reviews.map((review, i) => (
    <div
      key={i}
      className="
        group
        border border-neutral-800
        p-8
         max-w-md w-full
        transition-all duration-500
        md:hover:scale-[1.03]
 md:hover:border-[#C7A24A]
md:hover:shadow-[0_0_30px_rgba(199,162,74,0.35)]
      "
    >
      {/* ⭐ Stars（常に表示） */}
      <div className="text-[#C7A24A] mb-4">
        {"★".repeat(review.rating)}
      </div>
 {/* 👤 Name / Country */}
  <div className="mb-4">
    <p className="text-sm tracking-wide text-white">
      {review.name} {countryToFlag(review.country)}
    </p>

  </div>
      {/* 💬 Comment */}
      <div>
  {/* short */}
<p className="hidden md:block text-sm text-neutral-300 md:group-hover:hidden">
  {truncateReview(t.reviews[review.commentKey].comment, 10)}
</p>

<p className="text-sm text-neutral-300 mt-2 md:hidden md:group-hover:block">
  {t.reviews[review.commentKey].comment}
</p>

</div>

    </div>
  ))}
</div>



  
</section>



      {/* CTA */}
  <section className="relative z-10 py-32 flex justify-center px-5">
 <div className="flex gap-2 md:gap-6">
    <a
      href="https://calendly.com/shinki-0210-s"
      target="_blank"
       rel="noopener noreferrer"
     className="px-3 py-2 text-[11px] whitespace-nowrap tracking-wide
 md:px-12 md:py-4 md:text-base md:tracking-widest border border-[#C7A24A] text-[#C7A24A] tracking-widest transition hover:bg-[#C7A24A]/15 hover:shadow-[0_0_12px_rgba(199,162,74,0.35)]"
>
   {t.ctaConsultation}
    </a>

    <a
      href="https://wa.me/817092356243"
      target="_blank"
      className="
       px-3 py-2 text-[11px] whitespace-nowrap tracking-wide
 md:px-12 md:py-4 md:text-base md:tracking-widest
        border border-[#C7A24A]
        text-[#C7A24A]
        tracking-widest
        transition
        hover:bg-[#C7A24A]/15
        hover:shadow-[0_0_12px_rgba(199,162,74,0.35)]
      "
    >
      WhatsApp
    
    </a>
  </div>
</section>

{activeItineraryIndex !== null && (
  <div
    className="fixed inset-0 z-[9999] bg-black/95 flex items-center"
    onClick={() => setActiveItineraryIndex(null)}
  >
    {/* ← LEFT ARROW */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        itineraryScrollRef.current?.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
      }}
      className="absolute left-4 md:left-10 text-white text-3xl z-[10001] hover:text-[#C7A24A]"
    >
      &lt;
    </button>

    {/* SCROLL AREA */}
    <div
      ref={itineraryScrollRef}
      onClick={(e) => e.stopPropagation()}
     className="flex overflow-x-auto scroll-smooth no-scrollbar w-full h-full items-center snap-x snap-mandatory"
     >
      {itineraryImages.map((src, i) => (
        <div
          key={i}
          className="relative min-w-full h-full flex items-center justify-center snap-center"

          >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={src}
              alt={`Itinerary ${i + 1}`}
              fill
              className="object-contain"
              priority={i === activeItineraryIndex}
            />
          </div>
        </div>
      ))}
    </div>

    {/* → RIGHT ARROW */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        itineraryScrollRef.current?.scrollBy({ left: window.innerWidth, behavior: "smooth" });
      }}
      className="absolute right-4 md:right-10 text-white text-3xl z-[10001] hover:text-[#C7A24A]"
    >
    &gt;
    </button>

    {/* CLOSE BUTTON */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveItineraryIndex(null);
      }}
      className="fixed top-6 right-6 z-[10001] text-white text-4xl hover:text-[#C7A24A]"
      aria-label="Close"
    >
      ×
    </button>
  </div>
)}




    </main>
  );
}
