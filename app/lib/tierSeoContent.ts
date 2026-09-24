export interface TierSeoData {
  seoTitle: string;
  h1: string;
  metaDescription: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Weed on Airport Rd in Malton | Green Air Cannabis",
    h1: "Exotic Weed on Airport Rd in Malton",
    metaDescription:
      "Exotic flower at Green Air Cannabis, 7060 Airport Rd in Malton on the Pearson / Derry stretch of Airport Road. Adults 19+. Compare the live Exotic menu before you travel.",
    seoIntro:
      "The Exotic lane at 7060 Airport Rd is the upper flower shelf for shoppers who already know they are stopping on the Malton stretch of Airport Road, not a downtown Mississauga mall. Open the live Exotic list, then match the jar at the plaza counter.",
    sections: [
      {
        heading: "Who the Airport Rd Exotic shelf is for",
        body: "Use Exotic when the Malton stop is about the top flower lane. Pearson shift changes and Derry Road cut-throughs both land on the same 7060 plaza door. Adults 19+ need photo ID. This page does not promise a named jar will still be on the shelf when you arrive.",
      },
      {
        heading: "How to compare posted sizes",
        body: "Read the Exotic cards for the sizes the menu actually posts. Flower copy on this site stays with 3g, 5g, 14g, and 28g when those sizes are listed. If a card is unclear, ask at the counter or call +1 (289) 514-9467 before you leave Goreway or the airport hotels.",
      },
      {
        heading: "After you pick a lane",
        body: "Parking and MiWay stay on the visit page. Overnight walk-in notes stay on the 24-hour Malton page. Delivery, when the dispatcher accepts it, is a separate Malton / Airport Rd page and is not an Exotic stock promise.",
      },
    ],
    faqs: [
      {
        q: "Where is the Exotic flower counter in Malton?",
        a: "Green Air Cannabis at 7060 Airport Rd, Mississauga, ON L4T 2G8, on Airport Road through Malton. Adults 19+ with photo ID.",
      },
      {
        q: "Does this Exotic page lock tonight's jars?",
        a: "No. Names and posted prices move. Use the live Exotic list, then confirm at the Airport Rd counter.",
      },
      {
        q: "Is Exotic the same job as the open-now page?",
        a: "No. This URL owns the Exotic lane for the Malton / Airport Rd corridor. Open-now hours stay on the 24-hour Malton page. The homepage keeps the map.",
      },
    ],
  },
  PREMIUM: {
    seoTitle: "Premium Weed on Airport Rd through Malton | Green Air Cannabis",
    h1: "Premium Weed on Airport Rd through Malton",
    metaDescription:
      "Premium flower at the Green Air Cannabis walk-in, 7060 Airport Rd, Malton. Adults 19+. Compare the current Premium list on the Pearson corridor before the trip.",
    seoIntro:
      "Premium at this Airport Road counter is the lane between the top shelf and the value jars. It is for a Malton plaza stop at 7060, south of the Derry crossing and on the same road that feeds Pearson — not a city-wide Mississauga flower index.",
    sections: [
      {
        heading: "When Premium fits an Airport Rd stop",
        body: "Choose Premium when you want a higher flower lane without starting every Malton visit in Exotic. The civic pin stays 7060 Airport Rd. Bring government photo ID. Adults 19+ only.",
      },
      {
        heading: "Posted cards, not a written menu from memory",
        body: "Compare the Premium names on the live page. Sizes that this store's flower pages discuss are 3g, 5g, 14g, and 28g when the card shows them. Staff at the plaza can answer a single-jar question faster than an old screenshot.",
      },
      {
        heading: "Keep the other Malton jobs on their own URLs",
        body: "The weed-dispensary owner, the 24-hour page, delivery, Native cigarettes, and nicotine vapes each have a corridor URL. Premium does not replace them. Plaza parking and MiWay are on /visit.",
      },
    ],
    faqs: [
      {
        q: "Which door carries the Premium flower lane?",
        a: "The Green Air Cannabis counter at 7060 Airport Rd in Malton. Call +1 (289) 514-9467 if you need the plaza bay confirmed.",
      },
      {
        q: "Can Premium listings change between shifts?",
        a: "Yes. Pearson and Derry traffic does not freeze the menu. Check the live Premium page before you commit the drive.",
      },
      {
        q: "Does Premium mean a medical product?",
        a: "No. This is an adults 19+ retail flower lane. It is not a medical shop and it does not take a prescription.",
      },
    ],
  },
  "AAA+": {
    seoTitle: "AAA+ Weed at the Malton Airport Rd counter | Green Air Cannabis",
    h1: "AAA+ Weed at the Malton Airport Rd counter",
    metaDescription:
      "AAA+ flower at Green Air Cannabis, 7060 Airport Rd, Malton, Mississauga. Adults 19+. Use the live AAA+ list for the Airport Road walk-in.",
    seoIntro:
      "AAA+ is the middle flower lane at the Malton plaza on Airport Road. Shoppers coming off Goreway or down from Derry Road use it when they want a focused list without opening every tier at 7060.",
    sections: [
      {
        heading: "A middle lane for the plaza stop",
        body: "AAA+ suits a short Airport Rd walk-in: one tier, the posted cards, then the counter. It is not a Mississauga-wide ranking and it does not speak for any other door.",
      },
      {
        heading: "Sizes to read on the card",
        body: "Look for the gram sizes the menu posts. On these flower pages that means 3g, 5g, 14g, and 28g when listed. Skip guessing from a chat screenshot. Adults 19+ with photo ID.",
      },
      {
        heading: "Hours stay on the homepage",
        body: "This tier page does not reset the clock. The homepage and the 24-hour Malton page carry open-now. Delivery eligibility stays with the dispatcher on the Malton delivery page.",
      },
    ],
    faqs: [
      {
        q: "Where do I open AAA+ flower in Malton?",
        a: "On this page for the lane, then at 7060 Airport Rd for the jar. The neighbourhood is Malton on Airport Road.",
      },
      {
        q: "Is AAA+ a complete stock list?",
        a: "No. It shows the current AAA+ tier. A name can leave the list. Confirm at the counter if one flower is the whole trip.",
      },
      {
        q: "How do I reach the AAA+ counter without a car?",
        a: "MiWay runs along Airport Road through Malton. The visit page has the plaza and transit notes. The pin is 7060 Airport Rd.",
      },
    ],
  },
  AA: {
    seoTitle: "AA Weed on Airport Rd in Malton | Green Air Cannabis",
    h1: "AA Weed on Airport Rd in Malton",
    metaDescription:
      "AA flower at Green Air Cannabis on Airport Road in Malton, 7060 Airport Rd. Adults 19+. Compare the live AA list before the plaza stop.",
    seoIntro:
      "AA is the practical flower lane at the Airport Road counter in Malton. It is for shoppers who want a straightforward list at 7060, between the Pearson employment belt and the Derry Road cross street.",
    sections: [
      {
        heading: "A straightforward Malton flower lane",
        body: "Open AA when the visit is about everyday flower at this plaza, not a city directory. The address is 7060 Airport Rd, Mississauga, ON L4T 2G8. Adults 19+ only.",
      },
      {
        heading: "Read the posted gram card",
        body: "Compare AA names against the sizes on the card. Flower pages here talk about 3g, 5g, 14g, and 28g only when those sizes are listed. Call +1 (289) 514-9467 if a single name is why you are leaving the terminal area.",
      },
      {
        heading: "Do not mix this lane with nicotine",
        body: "AA is cannabis flower. Native cigarettes and nicotine vapes have their own Airport Rd pages and their own shelves. Nicotine is addictive. This flower page does not describe those products.",
      },
    ],
    faqs: [
      {
        q: "Is AA flower sold at the Malton Airport Rd walk-in?",
        a: "Yes, as its own tier at Green Air Cannabis, 7060 Airport Rd. Check the live AA list for current names.",
      },
      {
        q: "Does AA guarantee a price?",
        a: "No. Posted prices can change. The live card and the counter are the check, not this paragraph.",
      },
      {
        q: "Where are parking notes for the AA stop?",
        a: "On /visit: the retail plaza lot at 7060 Airport Rd, plus MiWay along Airport Road through Malton.",
      },
    ],
  },
  BUDGET: {
    seoTitle: "Budget Weed on Airport Rd in Malton | Green Air Cannabis",
    h1: "Budget Weed on Airport Rd in Malton",
    metaDescription:
      "Budget flower at Green Air Cannabis, 7060 Airport Rd in Malton. Adults 19+. Compare the live Budget list on the Airport Road corridor.",
    seoIntro:
      "Budget is the value flower lane at the Malton plaza on Airport Road. Use it when price is the filter for a 7060 stop, then read the live cards before you turn into the lot.",
    sections: [
      {
        heading: "Value shopping on this corridor only",
        body: "Budget here means the value tier at Green Air Cannabis on Airport Road through Malton. It is not a Mississauga-wide cheap-weed directory and it is not a Toronto listing. Adults 19+ with photo ID.",
      },
      {
        heading: "Compare listed sizes, then the counter",
        body: "The flower sizes these pages will name are 3g, 5g, 14g, and 28g when the Budget card shows them. A deal banner on the tier is the menu's own label. This guide does not invent a second price.",
      },
      {
        heading: "Same door as the rest of the plaza",
        body: "Budget uses the same 7060 walk-in as Exotic. Hours stay on the homepage. The 24-hour Malton page owns open-now. The visit page owns plaza parking and MiWay.",
      },
    ],
    faqs: [
      {
        q: "Where is Budget flower on Airport Road?",
        a: "At Green Air Cannabis, 7060 Airport Rd, Malton, Mississauga. Open the live Budget tier, then the counter.",
      },
      {
        q: "Is Budget a promise that every value jar is in stock?",
        a: "No. The list changes. If one name is the only reason to come, call +1 (289) 514-9467 first.",
      },
      {
        q: "Does the Budget page cover delivery zones?",
        a: "No. Delivery for Malton and nearby Mississauga addresses is dispatcher-confirmed on the cannabis delivery page. This URL is the walk-in value lane.",
      },
    ],
  },
};
