import type { InclusionRequestState, Member, Place, RatingValues, TripSummary } from '../types';

export const trips: TripSummary[] = [
  { id: 'penang-discovery', name: 'Penang Discovery', startDate: '2026-09-06', endDate: '2026-09-09', mode: 'group', status: 'Ongoing', memberCount: 5 },
  { id: 'cameron-reset', name: 'Cameron Highlands Reset', startDate: '2026-10-18', endDate: '2026-10-20', mode: 'solo', status: 'Upcoming' },
  { id: 'melaka-weekend', name: 'Melaka Heritage Weekend', startDate: '2026-08-14', endDate: '2026-08-16', mode: 'group', status: 'Past', memberCount: 4 },
];

export const initialMembers: Member[] = [
  { id: 'alex', name: 'Alex Tan', initials: 'AT', role: 'Admin', status: 'Joined', isCurrentUser: true },
  { id: 'aisha', name: 'Aisha Rahman', initials: 'AR', role: 'Member', status: 'Pending' },
];

export const demoGroupMembers: Member[] = [
  { id: 'alex', name: 'Alex Tan', initials: 'AT', role: 'Admin', status: 'Joined', isCurrentUser: true },
  { id: 'aisha', name: 'Aisha Rahman', initials: 'AR', role: 'Member', status: 'Joined' },
  { id: 'daniel', name: 'Daniel Lee', initials: 'DL', role: 'Member', status: 'Joined' },
  { id: 'mei', name: 'Mei Wong', initials: 'MW', role: 'Member', status: 'Joined' },
  { id: 'ravi', name: 'Ravi Kumar', initials: 'RK', role: 'Member', status: 'Joined' },
];

// Prototype-only display thresholds. Product thresholds remain an open decision.
export const preferenceThresholds = { highMinimum: 85, mediumMinimum: 70 } as const;

export const ratingSeedsByPlace: Record<string, RatingValues> = {
  'Penang Hill': { alex: 9, aisha: 10, daniel: 8, mei: 9, ravi: 8 },
  'Kek Lok Si Temple': { alex: 9, aisha: 9, daniel: 8, mei: 10, ravi: 7 },
  'Chew Jetty': { alex: 8, aisha: 8, daniel: 7, mei: 9, ravi: 8 },
  'Entopia Butterfly Farm': { alex: 7, aisha: 8, daniel: 6, mei: 8, ravi: null },
  'Batu Ferringhi Beach': { alex: 4, aisha: 5, daniel: null, mei: 6, ravi: null },
};

export const requestSeedsByPlace: Record<string, InclusionRequestState> = {
  'Batu Ferringhi Beach': {
    requesterId: 'ravi',
    reason: 'This is my strongest personal preference for the trip.',
    approvals: ['aisha', 'ravi'],
    rejections: [],
  },
};

export const placeOptions: Omit<Place, 'id' | 'addedBy'>[] = [
  { name: 'Penang Hill', location: 'Air Itam' },
  { name: 'Kek Lok Si Temple', location: 'Air Itam' },
  { name: 'Chew Jetty', location: 'George Town' },
  { name: 'Entopia Butterfly Farm', location: 'Teluk Bahang' },
  { name: 'Batu Ferringhi Beach', location: 'Batu Ferringhi' },
];
