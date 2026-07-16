export interface ResourceCard {
  title: string;
  href: string;
  text: string;
}

export interface ResourceSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ResourcePage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  cards: ResourceCard[];
  sections: ResourceSection[];
}

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    "slug": "",
    "title": "Green Air Cannabis Resources",
    "seoTitle": "Green Air Cannabis Resources | Menu and Shopping Guides",
    "description": "Resource guides for shopping the Green Air Cannabis menu in Mississauga, including flower, value, pre-rolls, and Native smokes where listed.",
    "eyebrow": "Resource Centre",
    "intro": "Green Air shoppers can use this hub to prepare a Malton-area visit without reading the entire site. Each guide answers one planning question, then sends the shopper to the current category for the final check.",
    "cards": [
      {
        "title": "Menu Guide",
        "href": "/resources/menu-guide",
        "text": "Pick the category first, then compare the details that matter."
      },
      {
        "title": "Flower Guide",
        "href": "/resources/flower-guide",
        "text": "Compare Exotic, Premium, AAA+, AA, and Budget with clearer category notes."
      },
      {
        "title": "Value Guide",
        "href": "/resources/value-guide",
        "text": "A cleaner way to think about cheap weed, budget weed, and affordable weed."
      },
      {
        "title": "Pre-Roll Guide",
        "href": "/resources/pre-roll-guide",
        "text": "Keep pre-roll shopping separate from flower, edibles, vapes, and concentrates."
      },
      {
        "title": "Native Smokes",
        "href": "/resources/native-smokes",
        "text": "Brand names and carton notes for the cigarette menu where listed."
      }
    ],
    "sections": [
      {
        "heading": "Build The Visit Around One Menu Section",
        "body": "Decide what brings you to Green Air, open the matching guide, and continue to that category. This avoids comparing flower tiers against formats such as vapes, edibles, pre-rolls, or concentrates.",
        "bullets": [
          "Keep trip information on the Mississauga store page.",
          "Use a Resource guide to narrow the shopping route.",
          "Use the current category to confirm changing item details."
        ]
      },
      {
        "heading": "Local Notes For Malton / Airport",
        "body": "For searches around Malton, Airport Road, and the airport side of Mississauga, this section keeps location planning separate from menu research. Confirm the store visit first, then open only the category relevant to the stop."
      }
    ]
  },
  {
    "slug": "menu-guide",
    "title": "How To Shop The Green Air Cannabis Menu",
    "seoTitle": "Green Air Cannabis Menu Guide | Mississauga Weed Dispensary Tips",
    "description": "How to shop the Green Air Cannabis menu by category, with natural tips for flower, pre-rolls, edibles, THC vapes, concentrates, and value shopping.",
    "eyebrow": "Menu Guide",
    "intro": "The Green Air menu works best as a sequence: purpose, category, listing. Choosing the section before reading individual products turns a broad Malton menu search into a manageable shortlist.",
    "cards": [
      {
        "title": "Flower Guide",
        "href": "/resources/flower-guide",
        "text": "Compare Exotic, Premium, AAA+, AA, and Budget with clearer category notes."
      },
      {
        "title": "Value Guide",
        "href": "/resources/value-guide",
        "text": "A cleaner way to think about cheap weed, budget weed, and affordable weed."
      },
      {
        "title": "Pre-Roll Guide",
        "href": "/resources/pre-roll-guide",
        "text": "Keep pre-roll shopping separate from flower, edibles, vapes, and concentrates."
      },
      {
        "title": "Native Smokes",
        "href": "/resources/native-smokes",
        "text": "Brand names and carton notes for the cigarette menu where listed."
      }
    ],
    "sections": [
      {
        "heading": "Use The Menu Like A Directory",
        "body": "A shopper looking for flower should enter through a flower tier. A shopper looking for another format should go directly to its category. The menu becomes clearer when unrelated sections stay out of the first comparison.",
        "bullets": [
          "Flower begins with the shelf links.",
          "Pre-rolls begin with the listed package style.",
          "Edibles, vapes, and concentrates each keep their own item details."
        ]
      },
      {
        "heading": "Let The Live Listing Make The Final Call",
        "body": "Resource copy explains navigation, while the Green Air category page carries the public listing. Reopen it when a specific name, size, format, or posted price matters."
      }
    ]
  },
  {
    "slug": "flower-guide",
    "title": "Green Air Cannabis Flower Guide",
    "seoTitle": "Green Air Cannabis Flower Guide | Exotic, Premium, Budget",
    "description": "Compare exotic flower, premium flower, budget weed, cheap weed, and affordable weed at Green Air Cannabis with clearer category notes.",
    "eyebrow": "Flower Guide",
    "intro": "Green Air presents flower through Exotic, Premium, AAA+, AA, and Budget links. Think of them as five doors into the same department and choose the door that matches the purpose of the Malton visit.",
    "cards": [
      {
        "title": "Exotic Flower",
        "href": "/exotic",
        "text": "Start here when you want the higher shelf flower lane."
      },
      {
        "title": "Premium Flower",
        "href": "/premium",
        "text": "A strong lane for shoppers comparing quality and value."
      },
      {
        "title": "AAA+ Flower",
        "href": "/aaa",
        "text": "A clear middle lane for flower comparison."
      },
      {
        "title": "AA Flower",
        "href": "/aa",
        "text": "A straight value-minded flower lane."
      },
      {
        "title": "Budget Flower",
        "href": "/budget",
        "text": "Start here when cheap weed or affordable weed is the goal."
      }
    ],
    "sections": [
      {
        "heading": "Choose A Shelf Before A Strain",
        "body": "After selecting the tier, compare only the names currently shown inside it. Read the displayed size, format, price, and product notes together instead of carrying assumptions from another shelf."
      },
      {
        "heading": "Move Between Tiers Deliberately",
        "body": "If one Green Air shelf does not suit the visit, step to the next tier and begin a fresh comparison. That is easier to follow than mixing all five pages into a single price list."
      }
    ]
  },
  {
    "slug": "value-guide",
    "title": "Green Air Cannabis Value Guide",
    "seoTitle": "Green Air Cannabis Value Guide | Cheap Weed and Budget Weed",
    "description": "A practical value guide for shoppers comparing cheap weed, budget weed, affordable weed, and menu categories at Green Air Cannabis.",
    "eyebrow": "Value Guide",
    "intro": "A useful value plan for Green Air starts with the product type and a clear spending boundary. For flower, Budget and AA provide the shortest starting route before other shelves enter the picture.",
    "cards": [
      {
        "title": "Budget Flower",
        "href": "/budget",
        "text": "The first stop for cheap weed and affordable weed comparisons."
      },
      {
        "title": "AA Flower",
        "href": "/aa",
        "text": "A simple value lane for flower shoppers."
      },
      {
        "title": "Menu Guide",
        "href": "/resources/menu-guide",
        "text": "Use this when you are comparing more than flower."
      }
    ],
    "sections": [
      {
        "heading": "Start Low And Expand Only When Needed",
        "body": "Review the current Budget listings first, followed by AA if the first shelf does not answer the visit. This keeps a price-led Malton search from drifting across unrelated tiers."
      },
      {
        "heading": "Compare The Whole Listing",
        "body": "A posted price makes sense beside its product name, size, and format. Use all of those current fields together and ask the store when an important listing detail is unclear."
      }
    ]
  },
  {
    "slug": "pre-roll-guide",
    "title": "Green Air Cannabis Pre-Roll Guide",
    "seoTitle": "Green Air Cannabis Pre-Roll Guide | Mississauga Cannabis Menu Tips",
    "description": "How to compare pre-rolls at Green Air Cannabis without mixing them up with flower, edibles, THC vapes, and concentrates.",
    "eyebrow": "Pre-Roll Guide",
    "intro": "On Green Air's site, the pre-roll category deserves its own read. Begin with whether a listing is presented as a single, pack, infused option, or another format, then compare like formats.",
    "cards": [
      {
        "title": "Pre-Rolls",
        "href": "/items/prerolls",
        "text": "Open the current pre-roll category."
      },
      {
        "title": "Menu Guide",
        "href": "/resources/menu-guide",
        "text": "Use this if you are still choosing between categories."
      }
    ],
    "sections": [
      {
        "heading": "Make Format The First Filter",
        "body": "Group current Green Air listings by the package style displayed on the page. Once the formats match, the remaining public notes and posted prices are easier to compare."
      },
      {
        "heading": "Restart When The Category Changes",
        "body": "A switch to flower, edibles, vapes, or concentrates creates a different shopping question. Move to that section rather than using a pre-roll comparison to judge it."
      }
    ]
  },
  {
    "slug": "resource-centre-launch",
    "title": "Green Air Cannabis Resource Centre Launch",
    "seoTitle": "Green Air Cannabis Resource Centre Launch",
    "description": "The Green Air Cannabis resource centre gives shoppers cleaner menu guides for flower, value, pre-rolls, and store visits.",
    "eyebrow": "Resource Update",
    "intro": "Green Air's Resource Centre collects Malton-area visit planning and menu-navigation notes in one place, with a direct handoff from each guide to its relevant current category.",
    "cards": [
      {
        "title": "Menu Guide",
        "href": "/resources/menu-guide",
        "text": "Pick the category first, then compare the details that matter."
      },
      {
        "title": "Flower Guide",
        "href": "/resources/flower-guide",
        "text": "Compare Exotic, Premium, AAA+, AA, and Budget with clearer category notes."
      },
      {
        "title": "Value Guide",
        "href": "/resources/value-guide",
        "text": "A cleaner way to think about cheap weed, budget weed, and affordable weed."
      },
      {
        "title": "Pre-Roll Guide",
        "href": "/resources/pre-roll-guide",
        "text": "Keep pre-roll shopping separate from flower, edibles, vapes, and concentrates."
      },
      {
        "title": "Native Smokes",
        "href": "/resources/native-smokes",
        "text": "Brand names and carton notes for the cigarette menu where listed."
      }
    ],
    "sections": [
      {
        "heading": "Why Green Air Has A Resource Hub",
        "body": "The hub separates lasting shopping guidance from changing menu listings. Visitors can understand the page structure here and still use the live category for the final product check."
      },
      {
        "heading": "Choose, Narrow, Confirm",
        "body": "Choose a guide, narrow the section, and confirm the result on Green Air's current menu. Use the store page separately for visit details around Malton and Airport Road."
      }
    ]
  },
  {
    "slug": "native-smokes",
    "title": "Green Air Cannabis Native Smokes Resource",
    "seoTitle": "Green Air Cannabis Native Smokes | $25 Carton Notes",
    "description": "Green Air Cannabis Native smokes resource with cigarette brand names shown on the menu and $25 carton notes where listed.",
    "eyebrow": "Native Smokes",
    "intro": "Green Air keeps Native smokes in the cigarette category. This overview explains how to scan its brand families, variants, and carton-style notes while leaving today's exact listings to the live menu.",
    "cards": [
      {
        "title": "Cigarette Menu",
        "href": "/items/cigarettes",
        "text": "Open the current cigarette category before making the trip."
      },
      {
        "title": "Native Cigarettes Guide",
        "href": "/resources/native-smokes/native-cigarettes-guide",
        "text": "Brand notes and a cleaner shopping checklist."
      },
      {
        "title": "Store Page",
        "href": "/weed-dispensary-mississauga",
        "text": "Use the store page for directions, contact options, and listed hours."
      }
    ],
    "sections": [
      {
        "heading": "Separate Brand Family From Variant",
        "body": "Past Green Air listings have used Canadian, Putters, Canadian Goose, Canadian Classics, Rolled Gold, Nexus, and Time labels. Read the rest of each current title because full, light, silver, and menthol variants are distinct entries.",
        "bullets": [
          "Canadian Lights",
          "Canadian Full",
          "Putters",
          "Canadian Goose Full",
          "Canadian Goose Lights",
          "Canadian Menthol",
          "Canadian Classics Original",
          "Canadian Classics Silver",
          "* Rolled Gold Lights",
          "Nexus Full",
          "Nexus Lights",
          "Time Full"
        ]
      },
      {
        "heading": "Verify Any Carton Note On The Menu",
        "body": "Some carton-style listings have displayed a $25 note. Confirm that detail beside the current brand and variant instead of carrying it over to every cigarette entry."
      },
      {
        "heading": "Keep Cigarettes Outside The Cannabis Browse",
        "body": "Finish the Native smokes check within the cigarette section. If the same visit includes cannabis, return to the main Green Air menu and start with that product category."
      }
    ]
  },
  {
    "slug": "native-smokes/native-cigarettes-guide",
    "title": "Green Air Cannabis Native Cigarettes Guide",
    "seoTitle": "Green Air Cannabis Native Cigarettes Guide | Brands and Carton Notes",
    "description": "A shopper-friendly Native cigarettes guide for Green Air Cannabis, including brand names shown on the menu and $25 carton notes where listed.",
    "eyebrow": "Native Cigarettes Guide",
    "intro": "Read Green Air cigarette listings from left to right: brand family, variant, carton information, then posted price. That order helps distinguish similarly named full, light, silver, and menthol entries.",
    "cards": [
      {
        "title": "Cigarette Menu",
        "href": "/items/cigarettes",
        "text": "Open the current cigarette category before making the trip."
      },
      {
        "title": "Native Cigarettes Guide",
        "href": "/resources/native-smokes/native-cigarettes-guide",
        "text": "Brand notes and a cleaner shopping checklist."
      },
      {
        "title": "Store Page",
        "href": "/weed-dispensary-mississauga",
        "text": "Use the store page for directions, contact options, and listed hours."
      }
    ],
    "sections": [
      {
        "heading": "Read Beyond The First Brand Word",
        "body": "Green Air has shown Canadian, Putters, Canadian Goose, Canadian Classics, Rolled Gold, Nexus, and Time families. The words that follow identify the variant, so two titles beginning alike may not represent the same cigarette entry.",
        "bullets": [
          "Canadian Lights",
          "Canadian Full",
          "Putters",
          "Canadian Goose Full",
          "Canadian Goose Lights",
          "Canadian Menthol",
          "Canadian Classics Original",
          "Canadian Classics Silver",
          "* Rolled Gold Lights",
          "Nexus Full",
          "Nexus Lights",
          "Time Full"
        ]
      },
      {
        "heading": "Confirm A Must-Have Label",
        "body": "When the visit depends on one exact full, light, silver, or menthol label, use the current listing and contact the store if the public details need clarification."
      },
      {
        "heading": "Use This Guide As A Reading Key",
        "body": "This page explains how to interpret the list; the live cigarette category remains the public source for what Green Air currently presents."
      }
    ]
  }
];

export const RESOURCE_HOME = RESOURCE_PAGES[0];

export function getResourcePage(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  return RESOURCE_PAGES.find((page) => page.slug === cleanSlug);
}
