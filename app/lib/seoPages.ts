/* ── Geo-targeted SEO landing pages for Mississauga/Weston keywords ── */

export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "Mississauga Weed Dispensary — Green Air Cannabis | Open Daily: 10:00 AM - 02:00 AM | 7060 Airport Rd & Nearby Expressway",
    metaDescription: "Green Air Cannabis is Mississauga's premier weed dispensary at 7060 Airport Rd near Weston. 200+ strains, THC up to 39%, edibles, vapes, concentrates & more. We are open daily from 10:00 AM to 02:00 AM.",
    h1: "Mississauga Weed Dispensary — Green Air Cannabis",
    icon: "✨",
    heroTagline: "Premium Cannabis on 7060 Airport Rd & Nearby Expressway · Open Daily: 10:00 AM - 02:00 AM · Walk-In Welcome",
    banner: "",
    sections: [
      {
        heading: "Mississauga's Premier Cannabis Destination",
        body: "Green Air Cannabis is a premium cannabis dispensary located at 7060 Airport Rd in the heart of Mississauga's vibrant 7060 Airport Rd & Nearby Expressway area. We carry over 200 hand-picked cannabis strains across five quality tiers — from ultra-rare Exotic genetics with THC up to 39% to affordable Budget flower starting at just $3/g. Whether you're a connoisseur seeking the rarest strains or a daily smoker looking for reliable value, Green Air Cannabis has the perfect flower for you. We're proud to be one of Mississauga's most trusted dispensaries, and we are Open Daily: 10:00 AM - 02:00 AM.",
      },
      {
        heading: "Five Tiers of Quality Cannabis — Transparent Pricing",
        body: "Our unique tier system ensures transparent pricing and quality grading so you always know what you're getting. Exotic ($10-$12/g) features top-shelf, ultra-rare genetics with THC levels reaching 35-39% — these are the strains connoisseurs travel across Mississauga to find. Premium ($7-$10/g) offers connoisseur-grade strains at THC 32-34%, balancing quality and value. AAA+ ($5-$6/g) delivers heavy hitters at THC 30-32% — our most popular tier for experienced users. AA ($4/g) provides quality daily drivers at THC 27-29%, perfect for regular consumption. Budget ($3/g) offers value ounces from $40 without sacrificing reliability. Every tier is lab-tested, properly cured, and freshly rotated.",
      },
      {
        heading: "Beyond Flower — Edibles, Vapes, Concentrates & More",
        body: "Green Air Cannabis is more than just a flower shop. We carry a comprehensive selection of cannabis edibles (gummies, chocolates, baked goods), vape pens and disposable vapes, concentrates (shatter, wax, hash, diamonds, live resin), pre-rolled joints, magic mushrooms, native cigarettes, rolling papers, and accessories. Our live digital menu at greenaircannabis.com updates in real time so you always know exactly what's in stock before you make the trip.",
      },
      {
        heading: "Open Daily: 10:00 AM - 02:00 AM on 7060 Airport Rd & Nearby Expressway",
        body: "At Green Air Cannabis, we make it convenient for you. We are Open Daily: 10:00 AM - 02:00 AM, 365 days a year. Whether you're finishing a late shift, heading out for the night, or need an early morning pickup, we are ready to serve you. We're centrally located at 7060 Airport Rd, near major transit bus routes, close to major highways and central stations. Free street parking is available near the dispensary.",
      },
      {
        heading: "Unbeatable Promotions on Every Purchase",
        body: "Every purchase at Green Air Cannabis comes with our signature promotions. Our Buy 2g Get 1g FREE deal applies to every single tier — you always get a bonus gram. Our top three tiers (Exotic, Premium, and AAA+) also qualify for Buy 3g Get 3g FREE, effectively doubling your order. Combined with our already competitive pricing, Green Air Cannabis offers some of the best cannabis value in Mississauga, Toronto, and the surrounding area.",
      },
      {
        heading: "Serving Mississauga, Toronto & Mississauga",
        body: "Green Air Cannabis proudly serves customers from across the Greater Toronto Area. Whether you're coming from Weston, Mount Dennis, North Mississauga, Etobicoke, Mississauga, Brampton, or downtown Toronto, we welcome you. Call us at (437) 707-1207 or visit us at 7060 Airport Rd, Mississauga, ON L4T 2G8.",
      },
    ],
    faqs: [
      { q: "Where is Green Air Cannabis located?", a: "We are located at 7060 Airport Rd, Mississauga, ON L4T 2G8 — in the heart of 7060 Airport Rd & Nearby Expressway area — one of Mississauga's most accessible areas. We're near major transit bus routes and close to major highways." },
      { q: "What are the hours for Green Air Cannabis?", a: "We are open daily from 10:00 AM to 02:00 AM. Walk in anytime — no appointment needed. Whether it's day or night, our staff is here to help." },
      { q: "What cannabis products does Green Air Cannabis carry?", a: "We carry 200+ strains of cannabis flower across 5 quality tiers (Exotic, Premium, AAA+, AA, Budget), plus edibles, vapes, concentrates, pre-rolls, magic mushrooms, native cigarettes, and accessories. Our menu updates in real time online." },
      { q: "What is the cheapest weed at Green Air Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. Our AA tier is $4/g. Every tier includes our Buy 2g Get 1g FREE promotion, making our prices even more competitive." },
      { q: "Does Green Air Cannabis have a live menu?", a: "Yes! Our online menu at greenaircannabis.com updates in real time with current stock, prices, and availability. You can see exactly what we have before you visit." },
      { q: "What makes Green Air Cannabis different from other Mississauga dispensaries?", a: "Three things set us apart: (1) we are open daily from 10:00 AM to 02:00 AM, (2) our transparent 5-tier pricing system means no confusing markups, and (3) every purchase includes our Buy 2g Get 1g FREE promotion. Plus we carry one of Mississauga's largest selections with over 200 strains." },
      { q: "Can I check stock before visiting?", a: "Absolutely. Visit greenaircannabis.com to see our live menu. All flower, edibles, vapes, and accessories are listed with real-time stock status, THC levels, and pricing." },
      { q: "Is there parking near Green Air Cannabis?", a: "Yes. Free street parking is available nearby and surrounding residential streets. We're also easily accessible via local transit." },
    ],
  },

  {
    slug: "cheap-weed-york",
    title: "Cheap Weed Mississauga — Budget Cannabis Deals From $3/g | Green Air Cannabis",
    metaDescription: "Looking for cheap weed in Mississauga? Green Air Cannabis has budget flower from $3/g, ounces from $40, and Buy 2g Get 1g FREE promos. We are Open Daily: 10:00 AM - 02:00 AM at 7060 Airport Rd.",
    h1: "Cheap Weed Mississauga — Budget Cannabis Deals",
    icon: "💰",
    heroTagline: "Budget Flower From $3/g · Ounces From $40 · Open Daily: 10:00 AM - 02:00 AM",
    banner: "",
    sections: [
      {
        heading: "Mississauga's Best Prices on Quality Cannabis",
        body: "Looking for cheap weed in Mississauga without sacrificing quality? Green Air Cannabis offers some of the most competitive cannabis prices in the city. Our Budget tier starts at just $3/g with value ounces from $40. Our AA tier ($4/g) and AAA+ tier ($5-$6/g) also deliver incredible value with THC levels from 27% to 32%. We believe great cannabis shouldn't break the bank, and our transparent tier-based pricing ensures you always get exactly what you pay for — no hidden markups, no gimmicks.",
      },
      {
        heading: "Unbeatable Promotions That Stack",
        body: "Every tier at Green Air Cannabis comes with our signature Buy 2g Get 1g FREE promotion — meaning you always get a free gram with every purchase. Our top three tiers (Exotic, Premium, AAA+) also offer Buy 3g Get 3g FREE, effectively doubling your order. When you combine our already low prices with these promos, Green Air Cannabis delivers the best cannabis value in Mississauga. A $15 AAA+ 3g purchase actually gets you 3g of flower — that's just $5/g for THC 30%+ cannabis.",
      },
      {
        heading: "Budget Doesn't Mean Low Quality",
        body: "At Green Air Cannabis, cheap doesn't mean low quality. Every strain in our Budget and AA tiers delivers reliable potency (THC 24-29%) from trusted Canadian growers. We rotate our inventory frequently to ensure freshness and maintain our quality standards across all price points. Our Budget strains are perfect for rolling, sessions, or anyone who prefers value over premium aesthetics. Our AA tier is a step up — solid daily drivers with consistent effects.",
      },
      {
        heading: "Compare Our Prices",
        body: "Budget: $3/g — $40/oz. AA: $4/g — $90/oz. AAA+: $5-$6/g — $100/oz. Premium: $7-$10/g. Exotic: $10-$12/g. Every tier includes Buy 2g Get 1g FREE. Top tiers include Buy 3g Get 3g FREE. These are some of the lowest prices you'll find at any dispensary in Mississauga, 7060 Airport Rd & Nearby Expressway and surrounding areas.",
      },
    ],
    faqs: [
      { q: "What is the cheapest weed at Green Air Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. These are quality, properly-cured strains at Mississauga's most competitive prices." },
      { q: "Do you have ounce deals?", a: "Yes! Budget ounces from $40, AA ounces from $90, AAA+ ounces from $100. All with excellent quality, freshness guaranteed, and Buy 2g Get 1g FREE promotions on top." },
      { q: "Is cheap weed still good quality?", a: "Absolutely. Our Budget flower delivers THC 24-27% from trusted Canadian growers. We never sell old, dry, or improperly stored flower. Every product meets our quality standards regardless of price point." },
      { q: "Where can I buy cheap weed in Mississauga?", a: "Green Air Cannabis at 7060 Airport Rd, Mississauga. We are open daily from 10:00 AM to 02:00 AM, walk in anytime, no appointment needed. We're in the heart of 7060 Airport Rd & Nearby Expressway area." },
      { q: "What promotions do you offer?", a: "Every tier includes Buy 2g Get 1g FREE (pay for 2g, get 3g). Our Exotic, Premium, and AAA+ tiers also offer Buy 3g Get 3g FREE (pay for 3g, get 6g). These promos apply on every visit." },
      { q: "Do you offer bulk discounts?", a: "Yes — our ounce pricing is deeply discounted compared to per-gram rates. Budget ounces are $40, AA ounces $90, and AAA+ ounces $100. The more you buy, the more you save." },
    ],
  },

  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes Mississauga — Discount Tobacco | Green Air Cannabis",
    metaDescription: "Buy native cigarettes in Mississauga at Green Air Cannabis. Wide selection of premium and value tobacco brands at the best prices. 7060 Airport Rd, 7060 Airport Rd & Nearby Expressway. We are Open Daily: 10:00 AM - 02:00 AM.",
    h1: "Native Cigarettes Mississauga — Discount Tobacco",
    icon: "🏷️",
    heroTagline: "Premium & Value Brands · Best Prices in Mississauga · Open Daily: 10:00 AM - 02:00 AM",
    banner: "",
    sections: [
      {
        heading: "Mississauga's Best Selection of Native Cigarettes",
        body: "Green Air Cannabis carries one of the widest selections of native cigarettes in Mississauga. Located at 7060 Airport Rd near 7060 Airport Rd & Nearby Expressway, we stock a comprehensive range of both premium and value native cigarette brands at competitive prices. Whether you prefer full-flavour, light, menthol, or specialty blends, our tobacco selection has something for every smoker. We're proud to be one of the few stores in Mississauga that combines a full cannabis dispensary with a comprehensive tobacco counter — one stop for everything you need.",
      },
      {
        heading: "Why Mississauga Smokers Choose Green Air Cannabis",
        body: "There are three reasons Mississauga smokers keep coming back to Green Air Cannabis for their cigarettes. First, our prices are among the lowest in the 7060 Airport Rd & Nearby Expressway area — we buy in volume and pass the savings to our customers. Second, our selection is comprehensive — we carry brands and varieties that many other shops simply don't stock. Third, we are open daily from 10:00 AM to 02:00 AM. Need cigarettes? Stop by during our hours: Open Daily: 10:00 AM - 02:00 AM. No other tobacco shop in Mississauga offers this level of convenience.",
      },
      {
        heading: "Convenient 7060 Airport Rd & Nearby Expressway Location",
        body: "Our shop at 7060 Airport Rd is centrally located in Mississauga — easily accessible from Weston Rd, Lawrence Ave W, Highway 401, and all major Peel/Toronto routes. Whether you're walking, driving, or taking the bus, Green Air Cannabis is easy to reach. Free evening street parking is available nearby. We serve customers from across Mississauga including 7060 Airport Rd & Nearby Expressway and surrounding areas.",
      },
      {
        heading: "More Than Just Cigarettes",
        body: "While you're picking up your cigarettes, browse our full cannabis menu — over 200 strains of flower, plus edibles, vapes, concentrates, pre-rolls, and accessories. Many of our customers appreciate the convenience of getting their cigarettes and cannabis in one trip. Our knowledgeable staff can help you with both sides of our inventory.",
      },
    ],
    faqs: [
      { q: "Does Green Air Cannabis sell native cigarettes?", a: "Yes! We carry one of the widest selections of native cigarettes in Mississauga, including premium brands, value brands, full-flavour, light, and menthol varieties." },
      { q: "What cigarette brands do you carry?", a: "We stock a comprehensive range of native cigarette brands in multiple varieties. Our selection rotates regularly. Visit us at 7060 Airport Rd to see our full current inventory and pricing." },
      { q: "Where can I buy cheap cigarettes in Mississauga?", a: "Green Air Cannabis at 7060 Airport Rd offers some of the best cigarette prices in Mississauga's Weston area. We are open daily from 10:00 AM to 02:00 AM so you can shop on your own schedule." },
      { q: "Are you open late for cigarette purchases?", a: "We are open daily from 10:00 AM to 02:00 AM. Whether you need cigarettes at noon or late at night, our doors are open." },
      { q: "Can I buy cigarettes and cannabis at Green Air Cannabis?", a: "Absolutely. Green Air Cannabis is both a fully-licensed cannabis dispensary and a tobacco retailer. Many customers appreciate the convenience of one stop for both products." },
      { q: "Where is Green Air Cannabis located?", a: "7060 Airport Rd, Mississauga, ON L4T 2G8 — in 7060 Airport Rd & Nearby Expressway area. Near transit routes with free street parking available." },
    ],
  },

  {
    slug: "weed-store-near-toronto",
    title: "Weed Store Near Toronto — Green Air Cannabis",
    metaDescription: "Looking for a weed store near Toronto? Green Air Cannabis at 7060 Airport Rd, Mississauga is just minutes away via major highways. 200+ strains, we are Open Daily: 10:00 AM - 02:00 AM.",
    h1: "Weed Store Near Toronto — Green Air Cannabis",
    icon: "🚗",
    heroTagline: "Just Minutes From Mississauga via major highways · Open Daily: 10:00 AM - 02:00 AM",
    banner: "",
    sections: [
      {
        heading: "The Closest Quality Dispensary to Mississauga",
        body: "Green Air Cannabis is one of the closest premium cannabis dispensaries to Toronto. Located at 7060 Airport Rd in Mississauga — just minutes up Highway 410 and East on 401 — we're the easiest dispensary to reach when you're coming from the surrounding area. Whether you're driving from Toronto and surrounding areas, Green Air Cannabis is the fastest, most convenient option for top-tier cannabis.",
      },
      {
        heading: "Why Make the Drive to Green Air Cannabis?",
        body: "Green Air Cannabis offers a wider selection and more competitive pricing than most local Peel options. You'll find over 200 strains across five quality tiers — from ultra-rare Exotic genetics (THC 35-39%) to affordable Budget flower at just $3/g. Our Buy 2g Get 1g FREE promotion applies to every tier, and our top three tiers offer Buy 3g Get 3g FREE. With prices starting at $3/g and ounces from $40, Green Air Cannabis delivers value that's worth the short drive from Toronto.",
      },
      {
        heading: "Open Daily: 10:00 AM - 02:00 AM — Perfect for Late Night Visits",
        body: "Unlike most dispensaries in Peel Region with limited hours, Green Air Cannabis is open daily from 10:00 AM to 02:00 AM. Whether you're heading home from a late shift, going out for the night, or just need a quick pickup, you can stop by Green Air Cannabis during our hours: Open Daily: 10:00 AM - 02:00 AM. Early morning, late night, weekends, holidays — we are always here.",
      },
      {
        heading: "Directions From Toronto",
        body: "We are located centrally at 7060 Airport Rd, Mississauga, making it easy to drive or take transit from Toronto. Total drive time is just a few minutes. Free street parking is available.",
      },
      {
        heading: "Full Menu — Cannabis, Edibles, Vapes & More",
        body: "When you make the trip up to Mississauga, make it count. Green Air Cannabis carries a full selection including 200+ flower strains, edibles, vape pens, disposable vapes, concentrates (shatter, wax, hash, live resin), pre-rolled joints, magic mushrooms, native cigarettes, and accessories. Check our live online menu at greenaircannabis.com before you visit to see exactly what's in stock.",
      },
    ],
    faqs: [
      { q: "How far is Green Air Cannabis from Mississauga?", a: "We're located at 7060 Airport Rd in Mississauga — just a 15-20 minute drive from central Mississauga via Highway 401 East." },
      { q: "Is it worth driving from Mississauga for cannabis?", a: "Absolutely. Green Air Cannabis offers 200+ strains, prices starting at $3/g, and promotions like Buy 2g Get 1g FREE that make the short drive incredibly worthwhile." },
      { q: "Is Green Air Cannabis open late?", a: "We are open daily from 10:00 AM to 02:00 AM. Whether you're driving up at noon or late at night, we are open and ready to serve you." },
      { q: "What's the cheapest weed near Toronto?", a: "Green Air Cannabis has Budget flower from $3/g and value ounces from $40. With our Buy 2g Get 1g FREE promo, these are some of the best prices in the Greater Toronto Area." },
      { q: "Is there parking at Green Air Cannabis?", a: "Yes. Free evening street parking is available near the store and surrounding residential streets." },
      { q: "Can I take transit from Toronto to Green Air Cannabis?", a: "Yes! Local transit connects directly subway and bus routes that will drop you off right near our location." },
      { q: "Do you carry products besides cannabis?", a: "Yes — we also carry native cigarettes, rolling papers, grinders, and other accessories. Many Mississauga customers appreciate the one-stop convenience." },
    ],
  },

  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me Mississauga — Green Air Cannabis | Open Daily: 10:00 AM - 02:00 AM",
    metaDescription: "Find a cannabis dispensary near you in Mississauga. Green Air Cannabis at 7060 Airport Rd has 200+ strains from $3/g. We are Open Daily: 10:00 AM - 02:00 AM. Walk in anytime, no appointment needed.",
    h1: "Cannabis Dispensary Near Me — Mississauga",
    icon: "🗺️",
    heroTagline: "Walk-In Welcome · Open Daily: 10:00 AM - 02:00 AM · 200+ Strains In Stock",
    banner: "",
    sections: [
      {
        heading: "Find Premium Cannabis Near You in Mississauga",
        body: "If you're searching for a cannabis dispensary near you in Mississauga, Green Air Cannabis is conveniently located at 7060 Airport Rd — in the heart of 7060 Airport Rd & Nearby Expressway area. We serve customers from across Mississauga, North Mississauga, Etobicoke, Mississauga, and Toronto.",
      },
      {
        heading: "Why Choose Green Air Cannabis Over Other Dispensaries?",
        body: "What sets Green Air Cannabis apart from other Mississauga dispensaries is our combination of selection, pricing, and convenience. We carry 200+ strains across five clear quality tiers — no confusing markups, no inconsistent pricing. Our Buy 2g Get 1g FREE promotion applies to every tier, every purchase. And unlike most dispensaries that close early, we are open daily from 10:00 AM to 02:00 AM. Whether you need flower, edibles, vapes, or concentrates, Green Air Cannabis is here.",
      },
      {
        heading: "Areas We Serve in Greater Toronto Area",
        body: "Green Air Cannabis is centrally located and easily accessible from anywhere in Mississauga and West Toronto. We regularly serve customers from: 7060 Airport Rd & Nearby Expressway and surrounding areas including Mississauga, Toronto, and nearby neighbourhoods."
      },
    ],
    faqs: [
      { q: "Where is the closest dispensary in 7060 Airport Rd & Nearby Expressway?", a: "Green Air Cannabis at 7060 Airport Rd is conveniently located in the heart of Mississauga — easily accessible from 7060 Airport Rd & Nearby Expressway." },
      { q: "Is Green Air Cannabis walk-in friendly?", a: "Absolutely! No appointment needed. Walk in anytime during our hours — we are open daily from 10:00 AM to 02:00 AM. Our friendly staff is always ready to help." },
      { q: "What neighbourhoods does Green Air Cannabis serve?", a: "We serve all of Mississauga and surrounding areas, including 7060 Airport Rd & Nearby Expressway and surrounding areas." },
      { q: "How do I check what's in stock?", a: "Visit greenaircannabis.com for our live menu with real-time stock, pricing, and THC levels for all products." },
      { q: "Do you sell edibles and vapes?", a: "Yes! In addition to 200+ flower strains, we carry edibles (gummies, chocolates), vape pens, disposable vapes, concentrates, pre-rolls, and accessories." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
