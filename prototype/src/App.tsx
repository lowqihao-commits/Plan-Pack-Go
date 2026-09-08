import { useEffect, useState } from 'react';
import { AppShell, Toast } from './components/ui';
import { LoginScreen, SignUpScreen, SplashScreen } from './screens/AuthScreens';
import { GroupInviteScreen, MyTripsScreen, TripDatesScreen, TripNameScreen, TripTypeScreen } from './screens/TripScreens';
import { WaitingListScreen } from './screens/WaitingListScreen';
import { ConfirmationSuccess, GroupFinalReviewScreen, GroupPreferenceScreen, GroupResultsScreen } from './screens/PreferenceScreens';
import { SoloFinalReviewScreen } from './screens/SoloFinalReviewScreen';
import { ItineraryPlanningScreen } from './screens/ItineraryPlanningScreen';
import { RoutePreviewScreen } from './screens/RoutePreviewScreen';
import { DashboardScreen } from './screens/DashboardScreens';
import { ItineraryDetailScreen } from './screens/ItineraryDetailScreen';
import { SmartPackingHomeScreen } from './screens/SmartPackingHomeScreen';
import { PackingSuggestionsScreen } from './screens/PackingSuggestionsScreen';
import { PersonalPackingScreen } from './screens/PersonalPackingScreen';
import { SharedPackingScreen } from './screens/SharedPackingScreen';
import { OutfitPlanningScreen } from './screens/OutfitPlanningScreen';
import { PackingRemindersScreen } from './screens/PackingRemindersScreen';
import { PackingDeltaScreen } from './screens/PackingDeltaScreen';
import { AddExpenseScreen, BudgetOverviewScreen } from './screens/BudgetScreens';
import { GroupOverviewScreen, ManageMembersScreen, ReassignSharedItemsScreen, UpdateParticipationScreen } from './screens/GroupScreens';
import { EditProfileScreen, ProfileSettingsScreen } from './screens/ProfileScreens';
import { UnexpectedAdjustmentSheet } from './screens/UnexpectedAdjustmentSheet';
import { demoGroupMembers, initialMembers, placeOptions, trips } from './data/mockData';
import { createInitialPersonalItems, createInitialSharedItems, createOutfitPlans, createPackingSuggestions } from './data/packingData';
import { activeTripMembers, createPenangExpenses, eligiblePreferenceMembers, initialNotificationPreferences, initialProfile } from './data/supportingData';
import { defaultIncludedPlaceIds, ensureInclusionRequests, ensureRatings, majorityNeeded } from './lib/preferences';
import { createRecommendedItinerary } from './lib/itinerary';
import type { AdjustmentKind, Expense, InclusionRequestsByPlace, InviteActivity, ItineraryDay, LanguagePreference, Member, MemberStatus, NotificationPreferences, OutfitDayPlan, PackingCategory, PackingDeltaState, PackingSuggestion, PersonalPackingItem, Place, ProfileState, RatingsByPlace, ReminderSettings, ScreenName, SharedPackingItem, ThemePreference, TravelMode, TripDraft, TripStatus, TripSummary } from './types';

const routes: Record<ScreenName, string> = {
  splash: '/',
  login: '/login',
  signup: '/signup',
  trips: '/trips',
  'trip-name': '/create/name',
  'trip-type': '/create/type',
  'group-invite': '/create/invite',
  'trip-dates': '/create/dates',
  'solo-waiting': '/create/places/solo',
  'group-waiting': '/create/places/group',
  'group-preference': '/trip/preferences/rate',
  'group-results': '/trip/preferences/results',
  'group-final-review': '/trip/final/group',
  'solo-final-review': '/trip/final/solo',
  'itinerary-planning': '/trip/itinerary/plan',
  'route-preview': '/trip/itinerary/route',
  'solo-dashboard': '/trip/dashboard/solo',
  'group-dashboard': '/trip/dashboard/group',
  'itinerary-detail': '/trip/itinerary',
  'smart-packing-solo': '/trip/packing/solo',
  'smart-packing-group': '/trip/packing/group',
  'packing-suggestions': '/trip/packing/suggestions',
  'personal-packing': '/trip/packing/personal',
  'shared-packing': '/trip/packing/shared',
  'outfit-planning': '/trip/packing/outfits',
  'packing-reminders': '/trip/packing/reminders',
  'packing-delta': '/trip/packing/updates',
  'budget-overview': '/trip/cost',
  'add-expense-solo': '/trip/cost/add/solo',
  'add-expense-group': '/trip/cost/add/group',
  'group-overview': '/trip/group',
  'manage-members': '/trip/group/members',
  'update-participation': '/trip/group/participation',
  'reassign-shared': '/trip/group/reassign',
  'profile-settings': '/profile',
  'edit-profile': '/profile/edit',
};

function screenFromLocation(): ScreenName {
  const path = window.location.hash.replace(/^#/, '') || '/';
  const match = (Object.entries(routes) as [ScreenName, string][]).find(([, route]) => route === path);
  return match?.[0] || 'splash';
}

const emptyDraft: TripDraft = { name: '', mode: null, startDate: '', endDate: '' };
const initialInviteActivity: InviteActivity = { copied: false, sent: false };
const initialReminderSettings: ReminderSettings = { threeDays: true, oneDay: true, departureDay: true, sharedAlerts: true };
const initialDeltaState: PackingDeltaState = { newItemDecision: 'pending', oldItemDecision: 'pending', reviewed: false };
const noPendingDeltaState: PackingDeltaState = { ...initialDeltaState, reviewed: true };

function categoryForPackingItem(name: string): PackingCategory {
  const value = name.toLowerCase();
  if (value.includes('passport') || value.includes('medication') || value.includes('water bottle')) return 'Essentials';
  if (value.includes('shoe') || value.includes('swimwear') || value.includes('slipper') || value.includes('jacket') || value.includes('top') || value.includes('trouser')) return 'Clothing';
  if (value.includes('toiletr') || value.includes('sunscreen') || value.includes('repellent')) return 'Toiletries';
  if (value.includes('charger') || value.includes('fan') || value.includes('phone')) return 'Electronics';
  if (value.includes('daypack') || value.includes('hat') || value.includes('sunglasses')) return 'Activity Gear';
  return 'Other';
}

export default function App() {
  const [screen, setScreen] = useState<ScreenName>(screenFromLocation);
  const [tripCollection, setTripCollection] = useState<TripSummary[]>(trips);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [inviteContext, setInviteContext] = useState<'creation' | 'management'>('creation');
  const [inviteReturnScreen, setInviteReturnScreen] = useState<'group-overview' | 'manage-members'>('group-overview');
  const [draft, setDraft] = useState<TripDraft>(emptyDraft);
  const [soloPlaces, setSoloPlaces] = useState<Place[]>([]);
  const [groupPlaces, setGroupPlaces] = useState<Place[]>([]);
  const [groupMembers, setGroupMembers] = useState<Member[]>(initialMembers);
  const [removedMemberIds, setRemovedMemberIds] = useState<string[]>([]);
  const [inviteActivity, setInviteActivity] = useState<InviteActivity>(initialInviteActivity);
  const [groupRatings, setGroupRatings] = useState<RatingsByPlace>({});
  const [groupSelectedIds, setGroupSelectedIds] = useState<string[]>([]);
  const [soloSelectedIds, setSoloSelectedIds] = useState<string[]>([]);
  const [inclusionRequests, setInclusionRequests] = useState<InclusionRequestsByPlace>({});
  const [finalReviewInitialized, setFinalReviewInitialized] = useState(false);
  const [soloFinalReviewInitialized, setSoloFinalReviewInitialized] = useState(false);
  const [finalPlacesConfirmed, setFinalPlacesConfirmed] = useState(false);
  const [soloFinalPlacesConfirmed, setSoloFinalPlacesConfirmed] = useState(false);
  const [confirmedPlaces, setConfirmedPlaces] = useState<Place[]>([]);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [tripStatus, setTripStatus] = useState<TripStatus>('Planning');
  const [packingSuggestions, setPackingSuggestions] = useState<PackingSuggestion[]>([]);
  const [personalPackingItems, setPersonalPackingItems] = useState<PersonalPackingItem[]>([]);
  const [sharedPackingItems, setSharedPackingItems] = useState<SharedPackingItem[]>([]);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(initialReminderSettings);
  const [outfitPlans, setOutfitPlans] = useState<OutfitDayPlan[]>([]);
  const [activeOutfitDayIndex, setActiveOutfitDayIndex] = useState(0);
  const [packingDelta, setPackingDelta] = useState<PackingDeltaState>(noPendingDeltaState);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [profile, setProfile] = useState<ProfileState>(initialProfile);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(initialNotificationPreferences);
  const [languagePreference, setLanguagePreference] = useState<LanguagePreference>('English');
  const [themePreference, setThemePreference] = useState<ThemePreference>('System');
  const [participationMemberId, setParticipationMemberId] = useState<string | null>(null);
  const [reassignItemIds, setReassignItemIds] = useState<string[]>([]);
  const [affectedMemberName, setAffectedMemberName] = useState('');
  const [activeAdjustment, setActiveAdjustment] = useState<AdjustmentKind | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [toast, setToast] = useState('');

  const replace = (next: ScreenName) => {
    window.history.replaceState(null, '', `#${routes[next]}`);
    setScreen(next);
  };

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', `#${routes[screen]}`);
    const handlePopState = () => setScreen(screenFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (screen !== 'splash') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => replace('login'), reducedMotion ? 1500 : 2100);
    return () => window.clearTimeout(timer);
  }, [screen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const isGroupCreationOnly = ['group-invite', 'group-waiting', 'group-preference', 'group-results', 'group-final-review'].includes(screen);
    const isSoloCreationOnly = ['solo-waiting', 'solo-final-review'].includes(screen);
    const isGroupTripOnly = ['group-dashboard', 'smart-packing-group', 'shared-packing', 'add-expense-group', 'group-overview', 'manage-members', 'update-participation', 'reassign-shared'].includes(screen);
    const isSoloTripOnly = ['solo-dashboard', 'smart-packing-solo', 'add-expense-solo'].includes(screen);
    if (isGroupCreationOnly && draft.mode !== 'group') {
      replace(draft.name ? 'trip-type' : 'trips');
      return;
    }
    if (isSoloCreationOnly && draft.mode !== 'solo') {
      replace(draft.name ? 'trip-type' : 'trips');
      return;
    }
    if (isGroupTripOnly && draft.mode !== 'group') {
      replace(draft.mode === 'solo' && itineraryDays.length ? 'solo-dashboard' : draft.name ? 'trip-type' : 'trips');
      return;
    }
    if (isSoloTripOnly && draft.mode !== 'solo') {
      replace(draft.mode === 'group' && itineraryDays.length ? 'group-dashboard' : draft.name ? 'trip-type' : 'trips');
      return;
    }
    const requiresItinerary = ['itinerary-planning', 'route-preview', 'itinerary-detail', 'solo-dashboard', 'group-dashboard', 'smart-packing-solo', 'smart-packing-group', 'packing-suggestions', 'personal-packing', 'shared-packing', 'outfit-planning', 'packing-reminders', 'packing-delta', 'budget-overview', 'add-expense-solo', 'add-expense-group', 'group-overview', 'manage-members', 'update-participation', 'reassign-shared'].includes(screen);
    if (requiresItinerary && (!draft.mode || itineraryDays.length === 0)) {
      if (draft.mode === 'group' && groupSelectedIds.length) replace('group-final-review');
      else if (draft.mode === 'solo' && soloSelectedIds.length) replace('solo-final-review');
      else replace(draft.name ? 'trip-type' : 'trips');
    }
  }, [screen, draft.mode, draft.name, itineraryDays.length, groupSelectedIds.length, soloSelectedIds.length]);

  const navigate = (next: ScreenName) => {
    window.history.pushState(null, '', `#${routes[next]}`);
    setScreen(next);
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else replace('trips');
  };

  const startTrip = () => {
    setActiveTripId(`trip-${Date.now()}`);
    setInviteContext('creation');
    setDraft(emptyDraft);
    setSoloPlaces([]);
    setGroupPlaces([]);
    setGroupMembers(initialMembers.map((member) => member.isCurrentUser ? { ...member, name: profile.name, initials: profile.initials } : member));
    setRemovedMemberIds([]);
    setInviteActivity(initialInviteActivity);
    setGroupRatings({});
    setGroupSelectedIds([]);
    setSoloSelectedIds([]);
    setInclusionRequests({});
    setFinalReviewInitialized(false);
    setSoloFinalReviewInitialized(false);
    setFinalPlacesConfirmed(false);
    setSoloFinalPlacesConfirmed(false);
    setConfirmedPlaces([]);
    setItineraryDays([]);
    setActiveDayIndex(0);
    setTripStatus('Planning');
    setPackingSuggestions([]);
    setPersonalPackingItems([]);
    setSharedPackingItems([]);
    setReminderSettings(initialReminderSettings);
    setOutfitPlans([]);
    setActiveOutfitDayIndex(0);
    setPackingDelta(noPendingDeltaState);
    setExpenses([]);
    setParticipationMemberId(null);
    setReassignItemIds([]);
    setAffectedMemberName('');
    setActiveAdjustment(null);
    setConfirmationOpen(false);
    navigate('trip-name');
  };

  const chooseMode = (mode: TravelMode) => setDraft((current) => ({ ...current, mode }));

  const updateSoloPlaces = (places: Place[]) => {
    setSoloPlaces(places);
    setSoloFinalReviewInitialized(false);
    setSoloFinalPlacesConfirmed(false);
    setItineraryDays([]);
    setPackingSuggestions([]);
    setOutfitPlans([]);
  };

  const updateGroupPlaces = (places: Place[]) => {
    setGroupPlaces(places);
    setFinalReviewInitialized(false);
    setFinalPlacesConfirmed(false);
    setItineraryDays([]);
    setPackingSuggestions([]);
    setOutfitPlans([]);
  };

  const openGroupPreference = () => {
    setGroupRatings((current) => ensureRatings(groupPlaces, current, eligiblePreferenceMembers(groupMembers)));
    navigate('group-preference');
  };

  const updateGroupRatings = (ratings: RatingsByPlace) => {
    setGroupRatings(ratings);
    setFinalReviewInitialized(false);
    setFinalPlacesConfirmed(false);
  };

  const openGroupFinalReview = () => {
    const eligibleMembers = eligiblePreferenceMembers(groupMembers);
    const readyRatings = ensureRatings(groupPlaces, groupRatings, eligibleMembers);
    setGroupRatings(readyRatings);
    if (!finalReviewInitialized) {
      setGroupSelectedIds(defaultIncludedPlaceIds(groupPlaces, readyRatings, eligibleMembers));
      setFinalReviewInitialized(true);
    }
    setInclusionRequests((current) => ensureInclusionRequests(groupPlaces, current));
    setFinalPlacesConfirmed(false);
    navigate('group-final-review');
  };

  const openSoloFinalReview = () => {
    if (!soloFinalReviewInitialized) {
      setSoloSelectedIds(soloPlaces.map((place) => place.id));
      setSoloFinalReviewInitialized(true);
    }
    setSoloFinalPlacesConfirmed(false);
    navigate('solo-final-review');
  };

  const handleRequestVote = (placeId: string, decision: 'approve' | 'reject') => {
    const current = inclusionRequests[placeId];
    if (!current) return;
    const eligibleMembers = eligiblePreferenceMembers(groupMembers);
    const eligibleIds = new Set(eligibleMembers.map((member) => member.id));
    const currentUserId = eligibleMembers.find((member) => member.isCurrentUser)?.id || 'alex';
    const approvals = current.approvals.filter((id) => id !== currentUserId && eligibleIds.has(id));
    const rejections = current.rejections.filter((id) => id !== currentUserId && eligibleIds.has(id));
    if (decision === 'approve') approvals.push(currentUserId);
    else rejections.push(currentUserId);
    setInclusionRequests({ ...inclusionRequests, [placeId]: { ...current, approvals, rejections } });
    if (approvals.length >= majorityNeeded(eligibleMembers.length)) setGroupSelectedIds((ids) => ids.includes(placeId) ? ids : [...ids, placeId]);
    setToast(decision === 'approve' ? 'Your approval is public to the group' : 'Your response is public to the group');
  };

  const confirmGroupFinalPlaces = () => {
    setConfirmedPlaces(groupPlaces.filter((place) => groupSelectedIds.includes(place.id)));
    setFinalPlacesConfirmed(true);
    setConfirmationOpen(true);
  };

  const confirmSoloFinalPlaces = () => {
    setConfirmedPlaces(soloPlaces.filter((place) => soloSelectedIds.includes(place.id)));
    setSoloFinalPlacesConfirmed(true);
    setConfirmationOpen(true);
  };

  const continueToItinerary = () => {
    const nextDays = itineraryDays.length ? itineraryDays : createRecommendedItinerary(confirmedPlaces, draft);
    setItineraryDays(nextDays);
    if (!packingSuggestions.length) setPackingSuggestions(createPackingSuggestions(nextDays, draft.mode || 'solo'));
    if (!outfitPlans.length) setOutfitPlans(createOutfitPlans(nextDays));
    setActiveDayIndex(0);
    setConfirmationOpen(false);
    navigate('itinerary-planning');
  };

  const dismissConfirmation = () => {
    setConfirmationOpen(false);
    if (draft.mode === 'group') setFinalPlacesConfirmed(false);
    else setSoloFinalPlacesConfirmed(false);
  };

  const removeGroupMember = (memberId: string) => {
    const member = groupMembers.find((candidate) => candidate.id === memberId);
    setGroupMembers((current) => current.filter((candidate) => candidate.id !== memberId));
    setRemovedMemberIds((current) => current.includes(memberId) ? current : [...current, memberId]);
    setSharedPackingItems((current) => current.map((item) => ({ ...item, assignments: item.assignments.filter((assignment) => assignment.memberId !== memberId) })));
    if (member) setToast(`${member.name} removed · Shared responsibilities updated`);
  };
  const updateGroupMembers = (members: Member[]) => setGroupMembers(members.filter((member) => !removedMemberIds.includes(member.id)));
  const markMemberJoined = (memberId: string) => {
    const member = groupMembers.find((candidate) => candidate.id === memberId);
    setGroupMembers((current) => current.map((candidate) => candidate.id === memberId ? { ...candidate, status: 'Joined' } : candidate));
    if (member) setToast(`${member.name} joined the trip`);
  };

  const openDemoTrip = (trip: TripSummary) => {
    const nextDraft: TripDraft = { name: trip.name, mode: trip.mode, startDate: trip.startDate, endDate: trip.endDate };
    const demoPlaces: Place[] = trip.mode === 'group'
      ? placeOptions.slice(0, 4).map((place, index) => ({ ...place, id: `demo-group-${index + 1}`, addedBy: [profile.name.split(' ')[0], 'Mei', 'Daniel', 'Aisha'][index] }))
      : [
        { id: 'demo-solo-1', name: 'Mossy Forest', location: 'Gunung Brinchang' },
        { id: 'demo-solo-2', name: 'BOH Tea Centre', location: 'Brinchang' },
        { id: 'demo-solo-3', name: 'Kea Farm', location: 'Brinchang' },
      ];
    const memberSeed = trip.mode === 'group' ? demoGroupMembers : initialMembers;
    const nextMembers = memberSeed.map((member) => member.isCurrentUser ? { ...member, name: profile.name, initials: profile.initials } : member);
    const nextDays = createRecommendedItinerary(demoPlaces, nextDraft).map((day) => ({ ...day, saved: true }));
    setDraft(nextDraft);
    setActiveTripId(trip.id);
    setTripStatus(trip.status === 'Ongoing' ? 'Ongoing' : trip.status === 'Past' ? 'Completed' : 'Planning');
    setGroupMembers(nextMembers);
    setRemovedMemberIds([]);
    setInviteActivity(trip.mode === 'group' ? { copied: true, sent: true } : initialInviteActivity);
    setSoloPlaces(trip.mode === 'solo' ? demoPlaces : []);
    setGroupPlaces(trip.mode === 'group' ? demoPlaces : []);
    setConfirmedPlaces(demoPlaces);
    setGroupRatings(trip.mode === 'group' ? ensureRatings(demoPlaces, {}, eligiblePreferenceMembers(nextMembers)) : {});
    setGroupSelectedIds(trip.mode === 'group' ? demoPlaces.map((place) => place.id) : []);
    setSoloSelectedIds(trip.mode === 'solo' ? demoPlaces.map((place) => place.id) : []);
    setFinalReviewInitialized(trip.mode === 'group');
    setSoloFinalReviewInitialized(trip.mode === 'solo');
    setFinalPlacesConfirmed(trip.mode === 'group');
    setSoloFinalPlacesConfirmed(trip.mode === 'solo');
    setItineraryDays(nextDays);
    setActiveDayIndex(0);
    setPackingSuggestions(createPackingSuggestions(nextDays, trip.mode));
    setPersonalPackingItems(createInitialPersonalItems());
    setSharedPackingItems(createInitialSharedItems(nextMembers));
    setReminderSettings(initialReminderSettings);
    setOutfitPlans(createOutfitPlans(nextDays));
    setActiveOutfitDayIndex(0);
    setPackingDelta(initialDeltaState);
    setExpenses(trip.id === 'penang-discovery' ? createPenangExpenses() : []);
    setParticipationMemberId(null);
    setReassignItemIds([]);
    setAffectedMemberName('');
    setActiveAdjustment(null);
    navigate(trip.mode === 'group' ? 'group-dashboard' : 'solo-dashboard');
  };

  const openDashboard = () => {
    const tripId = activeTripId || `trip-${Date.now()}`;
    if (!activeTripId) setActiveTripId(tripId);
    if (draft.mode && draft.name && draft.startDate && draft.endDate) {
      const summary: TripSummary = {
        id: tripId,
        name: draft.name,
        startDate: draft.startDate,
        endDate: draft.endDate,
        mode: draft.mode,
        status: tripStatus === 'Ongoing' ? 'Ongoing' : tripStatus === 'Completed' ? 'Past' : 'Upcoming',
        memberCount: draft.mode === 'group' ? groupMembers.length : undefined,
        progressLabel: 'Itinerary ready',
      };
      setTripCollection((current) => [...current.filter((trip) => trip.id !== tripId), summary]);
    }
    setTripStatus((current) => current === 'Planning' ? 'Ready to Go' : current);
    navigate(draft.mode === 'group' ? 'group-dashboard' : 'solo-dashboard');
  };

  const openSmartPacking = () => {
    if (!packingSuggestions.length) setPackingSuggestions(createPackingSuggestions(itineraryDays, draft.mode || 'solo'));
    if (!outfitPlans.length) setOutfitPlans(createOutfitPlans(itineraryDays));
    navigate(draft.mode === 'group' ? 'smart-packing-group' : 'smart-packing-solo');
  };

  const updateItineraryDays = (days: ItineraryDay[]) => {
    setItineraryDays(days);
    if (tripStatus !== 'Planning') setPackingDelta(initialDeltaState);
  };

  const saveExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses((current) => [...current, { ...expense, id: `expense-${Date.now()}` }]);
    setToast('Expense saved · Trip cost updated');
    replace('budget-overview');
  };

  const openParticipation = (memberId: string) => {
    setParticipationMemberId(memberId);
    navigate('update-participation');
  };

  const updateParticipation = (status: MemberStatus) => {
    if (!participationMemberId) return;
    const member = groupMembers.find((candidate) => candidate.id === participationMemberId);
    if (!member) return;
    const affectedIds = status === 'Joining' ? [] : sharedPackingItems.filter((item) => item.assignments.some((assignment) => assignment.memberId === member.id)).map((item) => item.id);
    setGroupMembers((current) => current.map((candidate) => candidate.id === member.id ? { ...candidate, status } : candidate));
    if (affectedIds.length) setSharedPackingItems((current) => current.map((item) => ({ ...item, assignments: item.assignments.filter((assignment) => assignment.memberId !== member.id) })));
    setReassignItemIds(affectedIds);
    setAffectedMemberName(member.name);
    setToast(`${member.name.split(' ')[0]} marked ${status}`);
    if (affectedIds.length) navigate('reassign-shared');
    else replace('group-overview');
  };

  const reassignSharedItems = (assignments: Record<string, string>) => {
    setSharedPackingItems((current) => current.map((item) => {
      const memberId = assignments[item.id];
      if (!memberId) return item;
      const covered = item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0);
      const quantity = Math.max(1, item.suggestedQuantity - covered);
      const existing = item.assignments.find((assignment) => assignment.memberId === memberId);
      return { ...item, assignments: existing ? item.assignments.map((assignment) => assignment.memberId === memberId ? { ...assignment, quantity: assignment.quantity + quantity, method: 'Assigned' } : assignment) : [...item.assignments, { memberId, quantity, packed: false, method: 'Assigned' }] };
    }));
    setReassignItemIds([]);
    setToast('Shared responsibilities reassigned');
    replace('group-overview');
  };

  const openDashboardAdjustment = (kind: AdjustmentKind) => {
    const pattern = kind === 'weather' ? /Entopia|Beach|Market/i : /Penang Hill/i;
    const matchingIndex = itineraryDays.findIndex((day) => day.stops.some((stop) => pattern.test(stop.name)));
    if (matchingIndex >= 0) setActiveDayIndex(matchingIndex);
    setActiveAdjustment(kind);
    navigate('itinerary-detail');
  };

  const applyUnexpectedAdjustment = (nextDays: ItineraryDay[], message: string) => {
    updateItineraryDays(nextDays);
    setActiveAdjustment(null);
    setToast(message);
  };

  const saveProfile = (nextProfile: ProfileState) => {
    const previousFirstName = profile.name.split(' ')[0];
    const nextFirstName = nextProfile.name.split(' ')[0];
    setProfile(nextProfile);
    setGroupMembers((current) => current.map((member) => member.isCurrentUser ? { ...member, name: nextProfile.name, initials: nextProfile.initials } : member));
    setGroupPlaces((current) => current.map((place) => place.addedBy === previousFirstName ? { ...place, addedBy: nextFirstName } : place));
    setToast('Profile changes saved');
    replace('profile-settings');
  };

  const logout = () => {
    setDraft(emptyDraft);
    setSoloPlaces([]);
    setGroupPlaces([]);
    setGroupMembers(initialMembers);
    setItineraryDays([]);
    setExpenses([]);
    setActiveAdjustment(null);
    setParticipationMemberId(null);
    setReassignItemIds([]);
    setProfile(initialProfile);
    setNotificationPreferences(initialNotificationPreferences);
    setLanguagePreference('English');
    setThemePreference('System');
    replace('login');
  };

  const updateSuggestion = (id: string, patch: Partial<PackingSuggestion>) => setPackingSuggestions((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));

  const addSelectedSuggestions = () => {
    const selected = packingSuggestions.filter((item) => item.decision === 'selected');
    const personal = selected.filter((item) => item.type === 'Personal');
    const shared = selected.filter((item) => item.type === 'Potentially Shared' && draft.mode === 'group');
    setPersonalPackingItems((current) => [...current, ...personal.filter((suggestion) => !current.some((item) => item.name.toLowerCase() === suggestion.name.toLowerCase())).map((suggestion) => ({ id: `personal-ai-${suggestion.id}`, name: suggestion.name, category: categoryForPackingItem(suggestion.name), quantity: suggestion.quantity, packed: false, reason: suggestion.reason, source: 'AI suggestion' as const }))]);
    setSharedPackingItems((current) => [...current, ...shared.filter((suggestion) => !current.some((item) => item.name.toLowerCase() === suggestion.name.toLowerCase())).map((suggestion) => ({ id: `shared-ai-${suggestion.id}`, name: suggestion.name, suggestedQuantity: suggestion.quantity, assignments: [], reason: suggestion.reason }))]);
    setPackingSuggestions((current) => current.map((item) => item.decision === 'selected' ? { ...item, decision: 'added' } : item));
    setToast(`${selected.length} ${selected.length === 1 ? 'item' : 'items'} added by your choice`);
    replace(personal.length || draft.mode === 'solo' ? 'personal-packing' : 'shared-packing');
  };

  const claimSharedItem = (itemId: string) => setSharedPackingItems((current) => current.map((item) => {
    if (item.id !== itemId || item.assignments.some((assignment) => assignment.memberId === 'alex')) return item;
    const covered = item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0);
    return { ...item, assignments: [...item.assignments, { memberId: 'alex', quantity: Math.max(1, item.suggestedQuantity - covered), packed: false, method: 'Claimed' }] };
  }));

  const assignSharedItem = (itemId: string, memberId: string) => setSharedPackingItems((current) => current.map((item) => {
    if (item.id !== itemId) return item;
    const existing = item.assignments.find((assignment) => assignment.memberId === memberId);
    return { ...item, assignments: existing ? item.assignments.map((assignment) => assignment.memberId === memberId ? { ...assignment, quantity: assignment.quantity + 1, method: 'Assigned' } : assignment) : [...item.assignments, { memberId, quantity: 1, packed: false, method: 'Assigned' }] };
  }));

  const markSharedItemPacked = (itemId: string) => setSharedPackingItems((current) => current.map((item) => {
    if (item.id !== itemId) return item;
    const target = item.assignments.find((assignment) => assignment.memberId === 'alex' && !assignment.packed) || item.assignments.find((assignment) => !assignment.packed);
    return target ? { ...item, assignments: item.assignments.map((assignment) => assignment === target ? { ...assignment, packed: true } : assignment) } : item;
  }));

  const updateOutfitPlan = (plan: OutfitDayPlan) => setOutfitPlans((current) => current.map((item) => item.dayNumber === plan.dayNumber ? plan : item));
  const addOutfit = (dayNumber: number) => {
    const plan = outfitPlans.find((item) => item.dayNumber === dayNumber);
    if (!plan) return;
    updateOutfitPlan({ ...plan, decision: 'added' });
    setPersonalPackingItems((current) => [...current, ...plan.items.filter((name) => !current.some((item) => item.name.toLowerCase() === name.toLowerCase())).map((name) => ({ id: `outfit-${dayNumber}-${name.toLowerCase().replace(/\s+/g, '-')}`, name, category: 'Clothing' as const, quantity: 1, packed: false, reason: `Day ${dayNumber} outfit`, source: 'Outfit plan' as const }))]);
    setToast(`Day ${dayNumber} outfit added · Reused clothing counts once`);
  };

  const applyPackingDelta = () => {
    if (packingDelta.newItemDecision === 'add') setPersonalPackingItems((current) => current.some((item) => item.name === 'Waterproof phone pouch') ? current : [...current, { id: 'delta-waterproof-pouch', name: 'Waterproof phone pouch', category: 'Electronics', quantity: 1, packed: false, reason: 'Rain update for Day 3', source: 'AI suggestion' }]);
    if (packingDelta.oldItemDecision === 'remove') setPersonalPackingItems((current) => current.filter((item) => !['Sports shoes', 'Comfortable walking shoes'].includes(item.name)));
    setPackingDelta((current) => ({ ...current, reviewed: true }));
    setToast('Packing updates applied without resetting your checklist');
    replace(draft.mode === 'group' ? 'smart-packing-group' : 'smart-packing-solo');
  };

  const pendingSuggestionCount = packingSuggestions.filter((item) => item.decision === 'pending' || item.decision === 'selected').length;
  const unresolvedSharedCount = sharedPackingItems.filter((item) => item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0) < item.suggestedQuantity).length;
  const activeMembers = activeTripMembers(groupMembers);
  const preferenceEligibleMembers = eligiblePreferenceMembers(groupMembers);
  const completedPreferenceMembers = preferenceEligibleMembers.filter((member) => groupPlaces.length > 0 && groupPlaces.every((place) => groupRatings[place.id]?.[member.id] !== null && groupRatings[place.id]?.[member.id] !== undefined)).length;
  const participationMember = groupMembers.find((member) => member.id === participationMemberId) || null;
  const reassignItems = sharedPackingItems.filter((item) => reassignItemIds.includes(item.id));

  let content;
  switch (screen) {
    case 'splash':
      content = <SplashScreen />;
      break;
    case 'login':
      content = <LoginScreen onLogin={() => navigate('trips')} onSignUp={() => navigate('signup')} />;
      break;
    case 'signup':
      content = <SignUpScreen onBack={goBack} onComplete={() => navigate('trips')} />;
      break;
    case 'trips':
      content = <MyTripsScreen profile={profile} trips={tripCollection} onAddTrip={startTrip} onOpenTrip={(trip) => { if (trip.id === activeTripId && draft.name === trip.name && itineraryDays.length) navigate(trip.mode === 'group' ? 'group-dashboard' : 'solo-dashboard'); else openDemoTrip(trip); }} onProfile={() => navigate('profile-settings')} />;
      break;
    case 'trip-name':
      content = <TripNameScreen draft={draft} onChange={(name) => setDraft((current) => ({ ...current, name }))} onBack={goBack} onContinue={() => navigate('trip-type')} />;
      break;
    case 'trip-type':
      content = <TripTypeScreen selected={draft.mode} onSelect={chooseMode} onBack={goBack} onContinue={() => { if (draft.mode === 'group') { setInviteContext('creation'); navigate('group-invite'); } else navigate('trip-dates'); }} />;
      break;
    case 'group-invite':
      content = <GroupInviteScreen members={groupMembers} context={inviteContext} inviteActivity={inviteActivity} onInviteActivityChange={setInviteActivity} onMembersChange={updateGroupMembers} onMarkJoined={markMemberJoined} onRemoveMember={removeGroupMember} onBack={goBack} onContinue={() => inviteContext === 'creation' ? navigate('trip-dates') : replace(inviteReturnScreen)} onToast={setToast} />;
      break;
    case 'trip-dates':
      content = <TripDatesScreen draft={draft} onChange={(dates) => setDraft((current) => ({ ...current, ...dates }))} onBack={goBack} onCreate={() => navigate(draft.mode === 'group' ? 'group-waiting' : 'solo-waiting')} />;
      break;
    case 'group-waiting':
      content = <WaitingListScreen mode="group" tripName={draft.name} places={groupPlaces} members={groupMembers} onChange={updateGroupPlaces} onBack={goBack} onContinue={openGroupPreference} />;
      break;
    case 'group-preference':
      content = <GroupPreferenceScreen places={groupPlaces} ratings={groupRatings} members={preferenceEligibleMembers} onRatingsChange={updateGroupRatings} onBack={goBack} onDone={() => { setToast('Ratings saved — you can return anytime'); navigate('group-waiting'); }} onReview={() => navigate('group-results')} />;
      break;
    case 'group-results':
      content = <GroupResultsScreen places={groupPlaces} ratings={groupRatings} members={preferenceEligibleMembers} onBack={goBack} onContinue={openGroupFinalReview} />;
      break;
    case 'group-final-review':
      content = <GroupFinalReviewScreen draft={draft} places={groupPlaces} ratings={groupRatings} members={preferenceEligibleMembers} selectedIds={groupSelectedIds} requests={inclusionRequests} onSelectedIdsChange={setGroupSelectedIds} onRequestVote={handleRequestVote} onBack={goBack} onConfirm={confirmGroupFinalPlaces} confirmed={finalPlacesConfirmed} />;
      break;
    case 'solo-final-review':
      content = <SoloFinalReviewScreen draft={draft} places={soloPlaces} selectedIds={soloSelectedIds} confirmed={soloFinalPlacesConfirmed} onSelectedIdsChange={setSoloSelectedIds} onBack={goBack} onConfirm={confirmSoloFinalPlaces} />;
      break;
    case 'itinerary-planning':
      content = itineraryDays.length ? <ItineraryPlanningScreen draft={draft} mode={draft.mode || 'solo'} days={itineraryDays} activeDayIndex={activeDayIndex} onActiveDayChange={setActiveDayIndex} onDaysChange={updateItineraryDays} onBack={goBack} onRoutePreview={() => navigate('route-preview')} onPlanComplete={openDashboard} onToast={setToast} /> : null;
      break;
    case 'route-preview':
      content = itineraryDays.length ? <RoutePreviewScreen days={itineraryDays} activeDayIndex={activeDayIndex} onDaysChange={updateItineraryDays} onBack={goBack} onToast={setToast} /> : null;
      break;
    case 'solo-dashboard':
    case 'group-dashboard':
      content = draft.mode ? <DashboardScreen draft={draft} mode={draft.mode} status={tripStatus} members={groupMembers} suggestionCount={pendingSuggestionCount} unresolvedSharedCount={unresolvedSharedCount} onBack={() => replace('trips')} onItinerary={() => navigate('itinerary-detail')} onSmartPacking={openSmartPacking} onBudget={() => navigate('budget-overview')} onGroup={() => navigate('group-overview')} onAdjustment={openDashboardAdjustment} /> : null;
      break;
    case 'itinerary-detail':
      content = itineraryDays.length ? <ItineraryDetailScreen days={itineraryDays} activeDayIndex={activeDayIndex} onActiveDayChange={setActiveDayIndex} onBack={goBack} onViewRoute={() => navigate('route-preview')} onEditDay={() => navigate('itinerary-planning')} onAdjustment={setActiveAdjustment} /> : null;
      break;
    case 'smart-packing-solo':
    case 'smart-packing-group':
      content = draft.mode ? <SmartPackingHomeScreen draft={draft} mode={draft.mode} members={groupMembers} suggestions={packingSuggestions} personalItems={personalPackingItems} sharedItems={sharedPackingItems} delta={packingDelta} onBack={goBack} onSuggestions={() => navigate('packing-suggestions')} onPersonal={() => navigate('personal-packing')} onShared={() => navigate('shared-packing')} onOutfits={() => navigate('outfit-planning')} onReminders={() => navigate('packing-reminders')} onUpdates={() => navigate('packing-delta')} /> : null;
      break;
    case 'packing-suggestions':
      content = draft.mode ? <PackingSuggestionsScreen mode={draft.mode} suggestions={packingSuggestions} onBack={goBack} onDecision={(id, decision) => updateSuggestion(id, { decision })} onType={(id, type) => updateSuggestion(id, { type, quantity: type === 'Personal' ? 1 : packingSuggestions.find((item) => item.id === id)?.quantity || 1 })} onQuantity={(id, quantity) => updateSuggestion(id, { quantity: Math.max(1, quantity) })} onAddSelected={addSelectedSuggestions} /> : null;
      break;
    case 'personal-packing':
      content = draft.mode ? <PersonalPackingScreen mode={draft.mode} items={personalPackingItems} onBack={goBack} onToggle={(id) => setPersonalPackingItems((current) => current.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))} onQuantity={(id, quantity) => setPersonalPackingItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item))} onRemove={(id) => { const item = personalPackingItems.find((candidate) => candidate.id === id); setPersonalPackingItems((current) => current.filter((candidate) => candidate.id !== id)); if (item) setToast(`${item.name} removed`); }} onAdd={(name, category, quantity) => { setPersonalPackingItems((current) => [...current, { id: `custom-${Date.now()}`, name, category, quantity, packed: false, source: 'Custom item' }]); setToast(`${name} added as Unchecked`); }} onOutfit={() => navigate('outfit-planning')} /> : null;
      break;
    case 'shared-packing':
      content = draft.mode === 'group' ? <SharedPackingScreen items={sharedPackingItems} members={groupMembers} onBack={goBack} onClaim={(id) => { claimSharedItem(id); setToast("Claimed — you'll bring it"); }} onAssign={(itemId, memberId) => { assignSharedItem(itemId, memberId); setToast('Shared item assigned'); }} onMarkPacked={(id) => { markSharedItemPacked(id); setToast('Shared item marked packed'); }} onAdd={(name, quantity) => { setSharedPackingItems((current) => [...current, { id: `shared-custom-${Date.now()}`, name, suggestedQuantity: quantity, assignments: [] }]); setToast(`${name} added as Unassigned`); }} /> : null;
      break;
    case 'outfit-planning':
      content = outfitPlans.length ? <OutfitPlanningScreen plans={outfitPlans} activeDayIndex={activeOutfitDayIndex} onActiveDayChange={setActiveOutfitDayIndex} onPlanChange={updateOutfitPlan} onAddOutfit={addOutfit} onBack={() => replace('personal-packing')} onSkip={() => replace('personal-packing')} onToast={setToast} /> : null;
      break;
    case 'packing-reminders':
      content = draft.mode ? <PackingRemindersScreen mode={draft.mode} settings={reminderSettings} onChange={setReminderSettings} onBack={goBack} onSave={() => { setToast('Packing reminders saved'); replace(draft.mode === 'group' ? 'smart-packing-group' : 'smart-packing-solo'); }} /> : null;
      break;
    case 'packing-delta':
      content = <PackingDeltaScreen delta={packingDelta} onChange={setPackingDelta} onApply={applyPackingDelta} onBack={goBack} />;
      break;
    case 'budget-overview':
      content = draft.mode ? <BudgetOverviewScreen mode={draft.mode} expenses={expenses} members={groupMembers} onBack={goBack} onAdd={() => navigate(draft.mode === 'group' ? 'add-expense-group' : 'add-expense-solo')} /> : null;
      break;
    case 'add-expense-solo':
    case 'add-expense-group':
      content = draft.mode ? <AddExpenseScreen mode={draft.mode} members={groupMembers} onCancel={goBack} onSave={saveExpense} /> : null;
      break;
    case 'group-overview':
      content = draft.mode === 'group' ? <GroupOverviewScreen draft={draft} members={groupMembers} sharedItems={sharedPackingItems} expenses={expenses} preferenceSummary={`${completedPreferenceMembers} / ${preferenceEligibleMembers.length} completed`} onBack={() => replace('group-dashboard')} onInvite={() => { setInviteContext('management'); setInviteReturnScreen('group-overview'); navigate('group-invite'); }} onManage={() => navigate('manage-members')} onPreferences={openGroupPreference} onSharedPacking={() => navigate('shared-packing')} onSharedExpenses={() => navigate('budget-overview')} /> : null;
      break;
    case 'manage-members':
      content = draft.mode === 'group' ? <ManageMembersScreen members={groupMembers} sharedItems={sharedPackingItems} onBack={goBack} onInvite={() => { setInviteContext('management'); setInviteReturnScreen('manage-members'); navigate('group-invite'); }} onMarkJoined={markMemberJoined} onRemove={removeGroupMember} onResend={(member) => { setInviteActivity((current) => ({ ...current, sent: true })); setToast(`Invite link resent to ${member.name.split(' ')[0]}`); }} onCancelInvite={(memberId) => { const member = groupMembers.find((candidate) => candidate.id === memberId); setGroupMembers((current) => current.filter((candidate) => candidate.id !== memberId)); if (member) setToast(`Invitation for ${member.name.split(' ')[0]} cancelled`); }} onParticipation={openParticipation} /> : null;
      break;
    case 'update-participation':
      content = draft.mode === 'group' && participationMember ? <UpdateParticipationScreen member={participationMember} affectedItems={sharedPackingItems.filter((item) => item.assignments.some((assignment) => assignment.memberId === participationMember.id))} onBack={goBack} onUpdate={updateParticipation} /> : null;
      break;
    case 'reassign-shared':
      content = draft.mode === 'group' ? <ReassignSharedItemsScreen items={reassignItems} members={groupMembers} affectedMemberName={affectedMemberName} onBack={goBack} onLater={() => { setReassignItemIds([]); setToast('Shared items left Unassigned'); replace('group-overview'); }} onReassign={reassignSharedItems} /> : null;
      break;
    case 'profile-settings':
      content = <ProfileSettingsScreen profile={profile} notifications={notificationPreferences} language={languagePreference} theme={themePreference} onBack={goBack} onEdit={() => navigate('edit-profile')} onNotificationsChange={setNotificationPreferences} onLanguageChange={setLanguagePreference} onThemeChange={setThemePreference} onLogout={logout} />;
      break;
    case 'edit-profile':
      content = <EditProfileScreen profile={profile} onCancel={goBack} onSave={saveProfile} />;
      break;
    case 'solo-waiting':
    default:
      content = <WaitingListScreen mode="solo" tripName={draft.name} places={soloPlaces} onChange={updateSoloPlaces} onBack={goBack} onContinue={openSoloFinalReview} />;
  }

  return <AppShell tone={screen === 'splash' ? 'cream' : 'surface'}>{content}{confirmationOpen ? <ConfirmationSuccess count={confirmedPlaces.length} onAction={continueToItinerary} onClose={dismissConfirmation} /> : null}{activeAdjustment && screen === 'itinerary-detail' && itineraryDays.length ? <UnexpectedAdjustmentSheet kind={activeAdjustment} days={itineraryDays} activeDayIndex={activeDayIndex} onClose={() => setActiveAdjustment(null)} onApply={applyUnexpectedAdjustment} onResolve={(message) => { setActiveAdjustment(null); setToast(message); }} /> : null}{toast ? <Toast message={toast} /> : null}</AppShell>;
}
