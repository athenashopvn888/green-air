/**
 * GAC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "GAC01",
  "fullName": "Green Air Cannabis Dispensary Weed Delivery",
  "street": "7060 Airport Rd",
  "city": "Mississauga",
  "region": "ON",
  "postal": "L4T 2G8",
  "phoneDisplay": "(289) 514-9467",
  "phoneTel": "tel:+12895149467",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJReKzU-k7K4gRQzYTXurx5aQ",
  "placeId": "ChIJReKzU-k7K4gRQzYTXurx5aQ",
  "neighbourhood": "Malton / Airport Road",
  "intersection": "",
  "transit": "Accessible by MiWay routes serving the surrounding Mississauga area.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
