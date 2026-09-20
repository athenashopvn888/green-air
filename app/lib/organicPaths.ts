/** Five-pillar neighbourhood paths for Green Air Cannabis (GAC01). */
export const PATHS = {
  home: "/",
  visit: "/visit",
  weedDispensaryLp: "/weed-dispensary-malton",
  twentyFour: "/24-hour-malton-dispensary",
  deliveryLp: "/cannabis-delivery-malton",
  nativeCigarettesLp: "/native-cigarettes-malton",
  nicotineVapeLp: "/nicotine-vape-malton",
  deliveryCatalog: "/delivery",
  itemsVapes: "/items/vapes",
  itemsCigarettes: "/items/cigarettes",
  maltonNeighbourhood: "/info/weed-store-near-malton-airport",
} as const;

export const TWENTY_FOUR_HOUR_HREF = PATHS.twentyFour;

export const ORGANIC_HUB_CARDS = [
  {
    href: PATHS.weedDispensaryLp,
    title: "Weed Dispensary",
    body: "Walk-in weed dispensary at 7060 Airport Rd in Malton. Adults 19+. Not a city-wide Mississauga list.",
    cta: "Malton / Airport Rd dispensary",
  },
  {
    href: PATHS.twentyFour,
    title: "24-Hour Dispensary",
    body: "Open now / 24h walk-in at 7060 Airport Rd in Malton. Adults 19+ with photo ID.",
    cta: "Open now on Airport Rd",
  },
  {
    href: PATHS.deliveryLp,
    title: "Weed Delivery",
    body: "Dispatcher-confirmed delivery for Malton, Airport Road, and nearby Mississauga addresses.",
    cta: "Malton / Airport Rd delivery",
  },
  {
    href: PATHS.nativeCigarettesLp,
    title: "Native Cigarettes",
    body: "Listed cigarette category at the Airport Rd counter. Confirm the current shelf before you travel.",
    cta: "Native cigarettes on Airport Rd",
  },
  {
    href: PATHS.nicotineVapeLp,
    title: "Nicotine Vape",
    body: "Nicotine vape lane for adults 19+. Current cards live on /items/vapes. Nicotine is addictive.",
    cta: "Nicotine vapes on Airport Rd",
  },
] as const;
