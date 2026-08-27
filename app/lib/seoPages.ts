const NATIVE_HERO_DISCLOSURE = "Brand preview only. Selection varies by store; check the current cigarette menu before visiting.";

const NATIVE_HERO_PRODUCTS = [
  { name: "BB Lights", image: "/products/1001-BB-LIGHTS-CARTONS.webp" },
  { name: "BB Full", image: "/products/1003-BB-FULL-CARTON.webp" },
  { name: "Canadian Lights", image: "/products/1005-CANADIAN-LIGHTS.webp" },
  { name: "Canadian Full", image: "/products/1006-CANADIAN-FULL.webp" },
  { name: "Canadian Classics Silver", image: "/products/1015-CANADIAN-CLASSICS-SILVER.webp" },
  { name: "Canadian Menthol", image: "/products/1013-CANADIAN-MENTHOL.webp" },
] as const;

export const NICOTINE_VAPES_MISSISSAUGA_PRODUCTS = [
  {
    slug: "geek-universe-25k-puffs",
    name: "GEEK UNIVERSE 25k PUFFS",
    image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/geek_universe_pulse_x_25k.webp",
  },
  {
    slug: "level-x-g2-pod",
    name: "Level X G2 pod",
    image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1086-Level-X-G2-pod.webp",
  },
  {
    slug: "nexa-pix-30k-puffs-many-flavors",
    name: "NEXA PIX | 30K PUFFS | MANY FLAVORS",
    image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/nexa_showcase_600x600.webp",
  },
  {
    slug: "ovns-disposable-5-8ml-many-flavors",
    name: "OVNS DISPOSABLE – 5% | 8ML | MANY FLAVORS",
    image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS500x500HQ.webp",
  },
  {
    slug: "ovns-pioneer-5-22k-puffs",
    name: "OVNS PIONEER – 5% | 22K PUFFS",
    image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS_PIONEER_5_22K_PUFFS.webp",
  },
] as const;

interface HeroPreviewProduct {
  slug?: string;
  name: string;
  image: string;
}

export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: readonly HeroPreviewProduct[];
    disclosure: string;
    menuHref?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    stageLabel?: string;
    warning?: string;
  };
  showTierGrid?: boolean;
  showVisitSection?: boolean;
  relatedLink?: { href: string; label: string; intro: string };
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "nicotine-vapes-mississauga",
    title: "Nicotine Vapes Mississauga",
    metaDescription: "Adults 19+: review five live-checked nicotine vape product pages from Green Air Cannabis in Mississauga, then use /items/vapes for category information. Nicotine is addictive.",
    h1: "Nicotine Vapes in Mississauga",
    icon: "",
    heroTagline: "",
    heroPreview: {
      eyebrow: "GREEN AIR CANNABIS • MISSISSAUGA • MALTON / AIRPORT ROAD • ADULTS 19+",
      intro: "This Green Air Cannabis guide highlights five live-checked product pages from the VAPE PENS category. Use /items/vapes for category information; these cards are a limited evidence set, not a complete selection. Nicotine is addictive.",
      products: NICOTINE_VAPES_MISSISSAUGA_PRODUCTS,
      disclosure: "Five live-checked product pages only. The cards are not a complete selection or a claim about current stock, price, or availability.",
      menuHref: "/items/vapes",
      primaryLabel: "Browse Nicotine Vapes",
      secondaryLabel: "Review the Five Vape Cards",
      stageLabel: "Five live-checked Green Air Cannabis nicotine vape product pages",
      warning: "Adults 19+. Nicotine is addictive.",
    },
    sections: [
      {
        heading: "Five Live-Checked Nicotine Vape Pages",
        body: "The verified Green Air Cannabis set includes Geek Universe, Level X, NEXA PIX and two OVNS pages. Use each card for its supported name and image, then use /items/vapes for category information. These cards do not describe a complete selection.",
      },
      {
        heading: "Read Product Formats Carefully",
        body: "The Level X page identifies a G2 pod, while the OVNS Disposable page explicitly identifies a disposable. Keep those format descriptions attached to the correct product and do not apply them to another card by assumption.",
      },
      {
        heading: "Mississauga, Malton and Airport Road Context",
        body: "This Green Air Cannabis guide uses the store's verified Mississauga, Malton and Airport Road context. Product details belong to the individual live-checked pages and the nicotine category, not to a broad local claim.",
      },
      {
        heading: "Keep Nicotine and THC Vape Routes Separate",
        body: "This page uses VAPE PENS products and links to /items/vapes. The separate /items/vape-disposables route contains THC or cannabis vape products and is intentionally omitted from this nicotine guide.",
      },
    ],
    faqs: [
      {
        q: "Where should I review Green Air Cannabis nicotine vape information?",
        a: "Use /items/vapes. The five featured cards are live-checked product pages, but they are not a complete selection or a claim about stock, price, or availability.",
      },
      {
        q: "Do all five featured products use the same format?",
        a: "No format should be assumed. The verified names identify a Level X G2 pod and an OVNS disposable; read each product page for its own supported details.",
      },
      {
        q: "Does this Green Air Cannabis page include THC vapes?",
        a: "No. This page covers nicotine products from the VAPE PENS category for adults 19+. THC and cannabis vape products under /items/vape-disposables are excluded.",
      },
    ],
    showTierGrid: false,
    showVisitSection: false,
    relatedLink: {
      href: "/info/native-cigarettes-mississauga",
      label: "Read the Green Air Cannabis Native Cigarettes guide",
      intro: "For the separate cigarette category, use the exact Mississauga guide:",
    },
  },
  {
    "slug": "mississauga-weed-dispensary",
    "title": "Green Air Cannabis Weed Dispensary in Mississauga",
    "metaDescription": "Green Air Cannabis is a weed dispensary in Mississauga with flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and shopper resources.",
    "h1": "Green Air Cannabis Weed Dispensary in Mississauga",
    "icon": "*",
    "heroTagline": "Menu shopping around Malton / Airport",
    "sections": [
      {
        "heading": "Shop Green Air Cannabis With A Plan",
        "body": "Green Air Cannabis helps adults compare the menu without overcomplicating the visit. Start with the store page, then choose the category that matches the visit: flower, pre-rolls, edibles, THC vapes, concentrates, accessories, or cigarettes where listed."
      },
      {
        "heading": "Local Menu Notes For Malton / Airport",
        "body": "If you searched for a weed dispensary in Malton / Airport or a cannabis dispensary in Mississauga, use this page to get oriented. Malton / Airport, Airport Road, Malton, Mississauga are useful local cues, but the current menu and staff are the right place for details that change."
      },
      {
        "heading": "What To Check Before Visiting",
        "body": "Confirm the store page, directions, contact options, listed hours, and menu category first. For current products, prices, or listings, use the menu or ask staff before leaving."
      }
    ],
    "faqs": [
      {
        "q": "Is Green Air Cannabis a cannabis dispensary in Mississauga?",
        "a": "Yes. Green Air Cannabis serves shoppers looking for a cannabis dispensary in Mississauga. Use the store page for directions, contact options, and listed hours."
      },
      {
        "q": "What should I check before visiting Green Air Cannabis?",
        "a": "Start with the store page, then use the current menu to compare product names, formats, prices, and item notes."
      },
      {
        "q": "Does Green Air Cannabis carry flower and pre-rolls?",
        "a": "The site has menu categories for flower tiers and pre-rolls. Check the current menu or ask staff for current details."
      }
    ]
  },
  {
    "slug": "york-weed-dispensary",
    "title": "Green Air Cannabis Weed Dispensary in Mississauga",
    "metaDescription": "Green Air Cannabis is a weed dispensary in Mississauga with flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and shopper resources.",
    "h1": "Green Air Cannabis Weed Dispensary in Mississauga",
    "icon": "*",
    "heroTagline": "Menu shopping around Malton / Airport",
    "sections": [
      {
        "heading": "Shop Green Air Cannabis With A Plan",
        "body": "Green Air Cannabis helps adults compare the menu without overcomplicating the visit. Start with the store page, then choose the category that matches the visit: flower, pre-rolls, edibles, THC vapes, concentrates, accessories, or cigarettes where listed."
      },
      {
        "heading": "Local Menu Notes For Malton / Airport",
        "body": "If you searched for a weed dispensary in Malton / Airport or a cannabis dispensary in Mississauga, use this page to get oriented. Malton / Airport, Airport Road, Malton, Mississauga are useful local cues, but the current menu and staff are the right place for details that change."
      },
      {
        "heading": "What To Check Before Visiting",
        "body": "Confirm the store page, directions, contact options, listed hours, and menu category first. For current products, prices, or listings, use the menu or ask staff before leaving."
      }
    ],
    "faqs": [
      {
        "q": "Is Green Air Cannabis a cannabis dispensary in Mississauga?",
        "a": "Yes. Green Air Cannabis serves shoppers looking for a cannabis dispensary in Mississauga. Use the store page for directions, contact options, and listed hours."
      },
      {
        "q": "What should I check before visiting Green Air Cannabis?",
        "a": "Start with the store page, then use the current menu to compare product names, formats, prices, and item notes."
      },
      {
        "q": "Does Green Air Cannabis carry flower and pre-rolls?",
        "a": "The site has menu categories for flower tiers and pre-rolls. Check the current menu or ask staff for current details."
      }
    ]
  },
  {
    "slug": "cheap-weed-mississauga",
    "title": "Green Air Cannabis Cheap Weed and Budget Weed Guide",
    "metaDescription": "A value-minded Green Air Cannabis guide for cheap weed, budget weed, affordable weed, and flower tier shopping in Mississauga.",
    "h1": "Green Air Cannabis Cheap Weed and Budget Weed Guide",
    "icon": "$",
    "heroTagline": "Value shopping with clearer category choices",
    "sections": [
      {
        "heading": "Start With Budget And AA",
        "body": "If cheap weed or affordable weed is the mission, start with the Budget and AA flower lanes before jumping around the rest of the menu. That keeps the comparison clean."
      },
      {
        "heading": "Compare The Current Menu",
        "body": "Look at product name, format, weight, posted price, and item notes. Menus change, so use this page for the shopping method and the live menu or staff for current details."
      },
      {
        "heading": "Know When To Move Up",
        "body": "If Budget or AA does not fit the visit, compare AAA+, Premium, or Exotic flower next. A better tier choice starts with the category, then the current product details."
      }
    ],
    "faqs": [
      {
        "q": "Where should value shoppers start at Green Air Cannabis?",
        "a": "Start with Budget and AA flower, then compare current menu details before choosing."
      },
      {
        "q": "Does affordable weed mean guessing?",
        "a": "No. Compare the category, product name, format, size, posted price, and item notes. Ask staff if anything is unclear."
      },
      {
        "q": "Where can shoppers confirm current prices?",
        "a": "Use the current menu or ask staff. A guide should not pretend prices and listings never move."
      }
    ]
  },
  {
    "slug": "cheap-weed-york",
    "title": "Green Air Cannabis Cheap Weed and Budget Weed Guide",
    "metaDescription": "A value-minded Green Air Cannabis guide for cheap weed, budget weed, affordable weed, and flower tier shopping in Mississauga.",
    "h1": "Green Air Cannabis Cheap Weed and Budget Weed Guide",
    "icon": "$",
    "heroTagline": "Value shopping with clearer category choices",
    "sections": [
      {
        "heading": "Start With Budget And AA",
        "body": "If cheap weed or affordable weed is the mission, start with the Budget and AA flower lanes before jumping around the rest of the menu. That keeps the comparison clean."
      },
      {
        "heading": "Compare The Current Menu",
        "body": "Look at product name, format, weight, posted price, and item notes. Menus change, so use this page for the shopping method and the live menu or staff for current details."
      },
      {
        "heading": "Know When To Move Up",
        "body": "If Budget or AA does not fit the visit, compare AAA+, Premium, or Exotic flower next. A better tier choice starts with the category, then the current product details."
      }
    ],
    "faqs": [
      {
        "q": "Where should value shoppers start at Green Air Cannabis?",
        "a": "Start with Budget and AA flower, then compare current menu details before choosing."
      },
      {
        "q": "Does affordable weed mean guessing?",
        "a": "No. Compare the category, product name, format, size, posted price, and item notes. Ask staff if anything is unclear."
      },
      {
        "q": "Where can shoppers confirm current prices?",
        "a": "Use the current menu or ask staff. A guide should not pretend prices and listings never move."
      }
    ]
  },
  {
    "slug": "native-cigarettes-mississauga",
    "title": "Green Air Cannabis Native Cigarettes Resource",
    "metaDescription": "Green Air Cannabis Native cigarettes resource with brand names shown on the menu and $25 carton notes where listed.",
    "h1": "Green Air Cannabis Native Cigarettes Resource",
    "icon": "#",
    "heroTagline": "$25 carton notes and brand names where listed",
    "heroPreview": {
      "eyebrow": "Green Air Cannabis · 7060 Airport Rd, Mississauga",
      "intro": "Cigarette category and visit information for Airport Road",
      "products": NATIVE_HERO_PRODUCTS,
      "disclosure": NATIVE_HERO_DISCLOSURE
    },
    "sections": [
      {
        "heading": "Start With The Cigarette Category",
        "body": "The cigarette menu may show carton-style Native smoke options around $25, with brand names such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, Canadian Menthol, Canadian Classics Original, and Canadian Classics Silver. Check the current menu or ask staff before making the trip."
      },
      {
        "heading": "Keep Cannabis And Smokes Separate",
        "body": "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, compare those categories separately. It keeps the visit cleaner."
      },
      {
        "heading": "Confirm What Matters Today",
        "body": "Specific brands, carton options, and prices can change. Use this resource for the shopping path, then confirm current details with the menu or staff."
      }
    ],
    "faqs": [
      {
        "q": "Does Green Air Cannabis list Native cigarette options?",
        "a": "The menu may show Native smoke brands such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, and Canadian Menthol. Confirm current options before visiting."
      },
      {
        "q": "Are $25 cartons guaranteed?",
        "a": "No. This page points shoppers toward menu listings where $25 carton-style options are shown. Confirm current price and listings before choosing."
      },
      {
        "q": "Where should shoppers start?",
        "a": "Open the cigarette category, then use the store page for directions, contact options, and listed hours."
      }
    ]
  },
  {
    "slug": "native-cigarettes-york",
    "title": "Green Air Cannabis Native Cigarettes Resource",
    "metaDescription": "Green Air Cannabis Native cigarettes resource with brand names shown on the menu and $25 carton notes where listed.",
    "h1": "Green Air Cannabis Native Cigarettes Resource",
    "icon": "#",
    "heroTagline": "$25 carton notes and brand names where listed",
    "sections": [
      {
        "heading": "Start With The Cigarette Category",
        "body": "The cigarette menu may show carton-style Native smoke options around $25, with brand names such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, Canadian Menthol, Canadian Classics Original, and Canadian Classics Silver. Check the current menu or ask staff before making the trip."
      },
      {
        "heading": "Keep Cannabis And Smokes Separate",
        "body": "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, compare those categories separately. It keeps the visit cleaner."
      },
      {
        "heading": "Confirm What Matters Today",
        "body": "Specific brands, carton options, and prices can change. Use this resource for the shopping path, then confirm current details with the menu or staff."
      }
    ],
    "faqs": [
      {
        "q": "Does Green Air Cannabis list Native cigarette options?",
        "a": "The menu may show Native smoke brands such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, and Canadian Menthol. Confirm current options before visiting."
      },
      {
        "q": "Are $25 cartons guaranteed?",
        "a": "No. This page points shoppers toward menu listings where $25 carton-style options are shown. Confirm current price and listings before choosing."
      },
      {
        "q": "Where should shoppers start?",
        "a": "Open the cigarette category, then use the store page for directions, contact options, and listed hours."
      }
    ]
  },
  {
    "slug": "weed-store-near-malton-airport",
    "title": "Weed Store Near Malton / Airport | Green Air Cannabis",
    "metaDescription": "Looking for a weed store near Malton / Airport? Use Green Air Cannabis for store-page checks, menu categories, and local visit planning in Mississauga.",
    "h1": "Weed Store Near Malton / Airport",
    "icon": ">",
    "heroTagline": "Local visit notes for Malton / Airport, Airport Road, Malton, Mississauga",
    "sections": [
      {
        "heading": "Confirm The Right Store Page",
        "body": "When you search for a weed store near Malton / Airport, open the Green Air Cannabis store page first. Confirm directions, contact options, listed hours, and the menu category before visiting."
      },
      {
        "heading": "Choose The Product Category",
        "body": "Flower, pre-rolls, edibles, THC vapes, concentrates, and accessories all shop differently. Pick the category first, then compare current product details."
      },
      {
        "heading": "Use Staff For The Close Call",
        "body": "If one detail decides the visit, ask staff. That is the cleanest way to handle current product questions."
      }
    ],
    "faqs": [
      {
        "q": "What is the best first step for a Malton / Airport visit?",
        "a": "Open the Green Air Cannabis store page, then use the current menu category that matches the visit."
      },
      {
        "q": "Should shoppers rely on old blog prices?",
        "a": "No. Use the current menu or staff for details that change."
      },
      {
        "q": "What categories can shoppers compare?",
        "a": "Use the menu categories for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed."
      }
    ]
  },
  {
    "slug": "weed-store-near-brampton",
    "title": "Weed Store Near Malton / Airport | Green Air Cannabis",
    "metaDescription": "Looking for a weed store near Malton / Airport? Use Green Air Cannabis for store-page checks, menu categories, and local visit planning in Mississauga.",
    "h1": "Weed Store Near Malton / Airport",
    "icon": ">",
    "heroTagline": "Local visit notes for Malton / Airport, Airport Road, Malton, Mississauga",
    "sections": [
      {
        "heading": "Confirm The Right Store Page",
        "body": "When you search for a weed store near Malton / Airport, open the Green Air Cannabis store page first. Confirm directions, contact options, listed hours, and the menu category before visiting."
      },
      {
        "heading": "Choose The Product Category",
        "body": "Flower, pre-rolls, edibles, THC vapes, concentrates, and accessories all shop differently. Pick the category first, then compare current product details."
      },
      {
        "heading": "Use Staff For The Close Call",
        "body": "If one detail decides the visit, ask staff. That is the cleanest way to handle current product questions."
      }
    ],
    "faqs": [
      {
        "q": "What is the best first step for a Malton / Airport visit?",
        "a": "Open the Green Air Cannabis store page, then use the current menu category that matches the visit."
      },
      {
        "q": "Should shoppers rely on old blog prices?",
        "a": "No. Use the current menu or staff for details that change."
      },
      {
        "q": "What categories can shoppers compare?",
        "a": "Use the menu categories for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed."
      }
    ]
  },
  {
    "slug": "dispensary-near-me-mississauga",
    "title": "Cannabis Dispensary Near Me in Mississauga | Green Air Cannabis",
    "metaDescription": "Use Green Air Cannabis when searching for a cannabis dispensary near me in Mississauga; compare menu categories and confirm current details before visiting.",
    "h1": "Cannabis Dispensary Near Me in Mississauga",
    "icon": "o",
    "heroTagline": "Store page first, menu category second",
    "sections": [
      {
        "heading": "Make The Search Useful",
        "body": "Green Air Cannabis gives nearby shoppers a clear path to the store page, menu categories, and resources."
      },
      {
        "heading": "Compare Categories Naturally",
        "body": "Use normal shopping language: cannabis dispensary in Mississauga, weed dispensary in Malton / Airport, cheap weed, budget weed, premium flower, pre-rolls, edibles, THC vapes, and concentrates. The point is to help the shopper, not stuff a sentence."
      },
      {
        "heading": "Check Current Details",
        "body": "For product names, prices, and listings, use the current menu or ask staff. This page is for orientation and visit planning."
      }
    ],
    "faqs": [
      {
        "q": "Is Green Air Cannabis useful for a near-me cannabis search?",
        "a": "Yes. Use the store page to confirm Green Air Cannabis, then open the menu category that matches your visit."
      },
      {
        "q": "Can shoppers browse before visiting?",
        "a": "Yes. Use the current menu and resources section before heading over."
      },
      {
        "q": "What should shoppers avoid?",
        "a": "Avoid guessing from old examples. Confirm current details with the menu or staff."
      }
    ]
  },
  {
    "slug": "dispensary-near-me-york",
    "title": "Cannabis Dispensary Near Me in Mississauga | Green Air Cannabis",
    "metaDescription": "Use Green Air Cannabis when searching for a cannabis dispensary near me in Mississauga; compare menu categories and confirm current details before visiting.",
    "h1": "Cannabis Dispensary Near Me in Mississauga",
    "icon": "o",
    "heroTagline": "Store page first, menu category second",
    "sections": [
      {
        "heading": "Make The Search Useful",
        "body": "Green Air Cannabis gives nearby shoppers a clear path to the store page, menu categories, and resources."
      },
      {
        "heading": "Compare Categories Naturally",
        "body": "Use normal shopping language: cannabis dispensary in Mississauga, weed dispensary in Malton / Airport, cheap weed, budget weed, premium flower, pre-rolls, edibles, THC vapes, and concentrates. The point is to help the shopper, not stuff a sentence."
      },
      {
        "heading": "Check Current Details",
        "body": "For product names, prices, and listings, use the current menu or ask staff. This page is for orientation and visit planning."
      }
    ],
    "faqs": [
      {
        "q": "Is Green Air Cannabis useful for a near-me cannabis search?",
        "a": "Yes. Use the store page to confirm Green Air Cannabis, then open the menu category that matches your visit."
      },
      {
        "q": "Can shoppers browse before visiting?",
        "a": "Yes. Use the current menu and resources section before heading over."
      },
      {
        "q": "What should shoppers avoid?",
        "a": "Avoid guessing from old examples. Confirm current details with the menu or staff."
      }
    ]
  }
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
