export type TravelMode = 'solo' | 'group';

export type ScreenName =
  | 'splash'
  | 'login'
  | 'signup'
  | 'trips'
  | 'trip-name'
  | 'trip-type'
  | 'group-invite'
  | 'trip-dates'
  | 'solo-waiting'
  | 'group-waiting'
  | 'group-preference'
  | 'group-results'
  | 'group-final-review'
  | 'solo-final-review'
  | 'itinerary-planning'
  | 'route-preview'
  | 'solo-dashboard'
  | 'group-dashboard'
  | 'itinerary-detail'
  | 'smart-packing-solo'
  | 'smart-packing-group'
  | 'packing-suggestions'
  | 'personal-packing'
  | 'shared-packing'
  | 'outfit-planning'
  | 'packing-reminders'
  | 'packing-delta'
  | 'budget-overview'
  | 'add-expense-solo'
  | 'add-expense-group'
  | 'group-overview'
  | 'manage-members'
  | 'update-participation'
  | 'reassign-shared'
  | 'profile-settings'
  | 'edit-profile';

export interface TripDraft {
  name: string;
  mode: TravelMode | null;
  startDate: string;
  endDate: string;
}

export interface TripSummary {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  mode: TravelMode;
  status: 'Ongoing' | 'Upcoming' | 'Past';
  memberCount?: number;
  progressLabel?: string;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  role: 'Admin' | 'Member';
  status: MemberStatus;
  isCurrentUser?: boolean;
}

export type MemberStatus = 'Joined' | 'Pending' | 'Joining' | 'Not Joining Today' | 'Skip Activity' | 'Left Trip';

export interface InviteActivity {
  copied: boolean;
  sent: boolean;
}

export interface Place {
  id: string;
  name: string;
  location: string;
  addedBy?: string;
}

export type PreferenceCategory = 'High' | 'Medium' | 'Low' | 'Unrated';

export type RatingValues = Record<string, number | null>;
export type RatingsByPlace = Record<string, RatingValues>;

export interface InclusionRequestState {
  requesterId: string;
  reason: string;
  approvals: string[];
  rejections: string[];
}

export type InclusionRequestsByPlace = Record<string, InclusionRequestState>;

export type DepartureOption = 'now' | 'later' | 'custom';
export type OvernightType = 'Accommodation' | 'Camping' | 'Overnight Transport' | 'Other' | 'Not decided yet';

export interface ItineraryStop {
  id: string;
  placeId: string;
  name: string;
  location: string;
  stayMinutes: number;
  openingHours?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  departureOption: DepartureOption;
  departureTime: string;
  stops: ItineraryStop[];
  overnightType: OvernightType | null;
  overnightLocation: string;
  overnightPlaceId?: string;
  saved: boolean;
}

export type TripStatus = 'Planning' | 'Ready to Go' | 'Ongoing' | 'Completed';

export type PackingSuggestionGroup = 'Needed' | 'Possibly Useful';
export type PackingSuggestionType = 'Personal' | 'Potentially Shared';
export type PackingSuggestionDecision = 'pending' | 'selected' | 'added' | 'skipped';

export interface PackingSuggestion {
  id: string;
  name: string;
  group: PackingSuggestionGroup;
  quantity: number;
  unit?: string;
  reason: string;
  type: PackingSuggestionType;
  decision: PackingSuggestionDecision;
}

export type PackingCategory = 'Essentials' | 'Clothing' | 'Toiletries' | 'Electronics' | 'Activity Gear' | 'Other';

export interface PersonalPackingItem {
  id: string;
  name: string;
  category: PackingCategory;
  quantity: number;
  packed: boolean;
  reason?: string;
  source: 'AI suggestion' | 'Custom item' | 'Outfit plan';
}

export interface SharedPackingAssignment {
  memberId: string;
  quantity: number;
  packed: boolean;
  method: 'Claimed' | 'Assigned';
}

export interface SharedPackingItem {
  id: string;
  name: string;
  suggestedQuantity: number;
  assignments: SharedPackingAssignment[];
  reason?: string;
}

export interface ReminderSettings {
  threeDays: boolean;
  oneDay: boolean;
  departureDay: boolean;
  sharedAlerts: boolean;
}

export interface OutfitDayPlan {
  dayNumber: number;
  activityContext: string;
  outfits: OutfitEntry[];
}

export interface OutfitEntry {
  id: string;
  items: string[];
  decision: 'pending' | 'added' | 'skipped';
  photoUrl?: string;
  notes: string;
  reuseItem: string;
}

export interface PackingDeltaState {
  newItemDecision: 'pending' | 'add' | 'skip';
  oldItemDecision: 'pending' | 'keep' | 'remove';
  reviewed: boolean;
}

export type ExpenseCategory = 'Transportation' | 'Accommodation' | 'Tickets / Activities' | 'Other';
export type ExpenseType = 'Personal' | 'Shared';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  type: ExpenseType;
  payerId: string;
  participantIds: string[];
  note?: string;
}

export interface ProfileState {
  name: string;
  email: string;
  initials: string;
  avatarVariant: number;
}

export interface NotificationPreferences {
  packingReminders: boolean;
  groupUpdates: boolean;
  tripAlerts: boolean;
}

export type ThemePreference = 'Light' | 'System' | 'Dark';
export type LanguagePreference = 'English' | 'Bahasa Melayu' | '中文';
export type AdjustmentKind = 'unavailable' | 'late' | 'weather';
