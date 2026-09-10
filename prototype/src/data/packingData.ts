import type { ItineraryDay, Member, OutfitDayPlan, PackingSuggestion, PersonalPackingItem, SharedPackingItem, TravelMode } from '../types';

const personalSeed: Array<Omit<PersonalPackingItem, 'id'>> = [
  { name: 'Phone', category: 'Essentials', quantity: 1, packed: true, source: 'Custom item' },
  { name: 'Wallet', category: 'Essentials', quantity: 1, packed: true, source: 'Custom item' },
  { name: 'Travel documents', category: 'Essentials', quantity: 1, packed: true, source: 'Custom item' },
  { name: 'Tops', category: 'Clothing', quantity: 4, packed: true, source: 'Custom item' },
  { name: 'Bottoms', category: 'Clothing', quantity: 2, packed: true, source: 'Custom item' },
  { name: 'Sleepwear', category: 'Clothing', quantity: 1, packed: true, source: 'Custom item' },
  { name: 'Underwear', category: 'Clothing', quantity: 4, packed: true, source: 'Custom item' },
  { name: 'Toothbrush', category: 'Toiletries', quantity: 1, packed: true, source: 'Custom item' },
  { name: 'Hand sanitiser', category: 'Toiletries', quantity: 1, packed: false, source: 'Custom item' },
  { name: 'Earbuds', category: 'Electronics', quantity: 1, packed: false, source: 'Custom item' },
  { name: 'Socks', category: 'Clothing', quantity: 4, packed: false, source: 'Custom item' },
  { name: 'Laundry bag', category: 'Other', quantity: 1, packed: false, source: 'Custom item' },
];

export function createInitialPersonalItems(): PersonalPackingItem[] {
  return personalSeed.map((item, index) => ({ ...item, id: `personal-${index + 1}` }));
}

function suggestion(id: string, name: string, group: PackingSuggestion['group'], quantity: number, reason: string, type: PackingSuggestion['type'] = 'Personal', unit?: string): PackingSuggestion {
  return { id, name, group, quantity, reason, type, unit, decision: 'pending' };
}

export function createPackingSuggestions(days: ItineraryDay[], mode: TravelMode): PackingSuggestion[] {
  const placeNames = days.flatMap((day) => day.stops.map((stop) => stop.name));
  const hasHillWalk = placeNames.some((name) => name.includes('Hill') || name.includes('Temple'));
  const hasBeach = placeNames.some((name) => name.toLowerCase().includes('beach'));
  const hasGarden = placeNames.some((name) => name.includes('Entopia'));
  const walkingDays = days.filter((day) => day.stops.some((stop) => /Hill|Temple/i.test(stop.name))).map((day) => `Day ${day.dayNumber}`).join(', ');
  const gardenDays = days.filter((day) => day.stops.some((stop) => /Entopia/i.test(stop.name))).map((day) => `Day ${day.dayNumber}`).join(', ');
  const sharedType = mode === 'group' ? 'Potentially Shared' : 'Personal';
  const items = [
    suggestion('passport', 'Passport', 'Needed', 1, 'Fixed travel essential'),
    suggestion('charger', 'Charger', 'Needed', 1, 'Needed across the trip'),
    suggestion('toiletries', 'Travel toiletries', 'Needed', 1, `${Math.max(1, days.length)}-day trip essential`),
    suggestion('medication', 'Personal medication', 'Needed', 1, 'Keep essential medication accessible'),
  ];

  if (hasHillWalk) {
    items.push(
      suggestion('walking-shoes', 'Comfortable walking shoes', 'Needed', 1, `${walkingDays} — Hill and temple walking`, 'Personal', 'pair'),
      suggestion('water-bottle', 'Refillable water bottle', 'Needed', 1, `${walkingDays} — Hill and temple walking`),
      suggestion('daypack', 'Small daypack', 'Possibly Useful', 1, `${walkingDays} — Walking itinerary`),
    );
  }
  if (hasBeach) {
    items.push(
      suggestion('sunscreen', 'Sunscreen', 'Needed', 1, 'Beach activity'),
      suggestion('swimwear', 'Swimwear', 'Needed', 1, 'Beach activity'),
      suggestion('slippers', 'Slippers', 'Needed', 1, 'Beach activity', 'Personal', 'pair'),
      suggestion('sunglasses', 'Sunglasses', 'Possibly Useful', 1, 'Outdoor beach time'),
      suggestion('sunhat', 'Sunhat', 'Possibly Useful', 1, 'Outdoor beach time'),
      suggestion('waterproof-pouch', 'Waterproof phone pouch', 'Possibly Useful', 1, 'Beach activity'),
    );
  }
  if (hasGarden) items.push(suggestion('repellent', 'Insect repellent', 'Possibly Useful', mode === 'group' ? 2 : 1, `${gardenDays} — Outdoor garden`, sharedType));
  items.push(
    suggestion('rain-jacket', 'Lightweight rain jacket', 'Needed', 1, 'Rain may affect outdoor activities'),
    suggestion('umbrellas', 'Compact umbrellas', 'Needed', mode === 'group' ? 3 : 1, 'Rain forecast during the trip', sharedType),
    suggestion('portable-fan', 'Portable fan', 'Possibly Useful', 1, 'Warm outdoor queues'),
  );
  return items;
}

export function createInitialSharedItems(members: Member[]): SharedPackingItem[] {
  const activeIds = new Set(members.filter((member) => member.status === 'Joined').map((member) => member.id));
  const keepActive = (item: SharedPackingItem): SharedPackingItem => ({ ...item, assignments: item.assignments.filter((assignment) => activeIds.has(assignment.memberId)) });
  return [
    keepActive({ id: 'shared-umbrellas', name: 'Compact umbrellas', suggestedQuantity: 3, reason: 'Rain forecast; coverage for the group', assignments: [
      { memberId: 'alex', quantity: 1, packed: true, method: 'Claimed' },
      { memberId: 'mei', quantity: 1, packed: false, method: 'Claimed' },
    ] }),
    keepActive({ id: 'shared-repellent', name: 'Insect repellent', suggestedQuantity: 2, reason: 'Outdoor garden on Day 3', assignments: [
      { memberId: 'daniel', quantity: 1, packed: true, method: 'Assigned' },
      { memberId: 'aisha', quantity: 1, packed: true, method: 'Assigned' },
    ] }),
    keepActive({ id: 'shared-first-aid', name: 'Portable first-aid kit', suggestedQuantity: 1, reason: 'Shared trip essential', assignments: [
      { memberId: 'ravi', quantity: 1, packed: false, method: 'Assigned' },
    ] }),
    keepActive({ id: 'shared-adapter', name: 'Extension adapter', suggestedQuantity: 1, reason: 'Shared charging at the stay', assignments: [
      { memberId: 'alex', quantity: 1, packed: true, method: 'Assigned' },
      { memberId: 'mei', quantity: 1, packed: false, method: 'Assigned' },
    ] }),
  ];
}

export const memberPackingProgress: Record<string, { packed: number; total: number }> = {
  alex: { packed: 18, total: 22 },
  aisha: { packed: 16, total: 20 },
  daniel: { packed: 14, total: 19 },
  mei: { packed: 21, total: 23 },
  ravi: { packed: 12, total: 18 },
};

export function createOutfitPlans(days: ItineraryDay[]): OutfitDayPlan[] {
  return days.map((day) => {
    const activityContext = day.stops.length ? day.stops.map((stop) => stop.name).join(' & ') : 'Travel and flexible time';
    const walking = day.stops.some((stop) => stop.name.includes('Hill') || stop.name.includes('Temple'));
    return {
      dayNumber: day.dayNumber,
      activityContext,
      outfits: [{
      id: `outfit-day-${day.dayNumber}-1`,
      items: walking ? ['Breathable top', 'Lightweight trousers', 'Walking shoes', 'Rain jacket'] : ['Breathable top', 'Comfortable bottoms', 'Walking shoes'],
      decision: 'pending',
      notes: '',
      reuseItem: day.dayNumber > 1 ? 'Walking shoes — Day 1' : '',
      }],
    };
  });
}
