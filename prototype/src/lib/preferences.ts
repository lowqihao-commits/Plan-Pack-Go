import { preferenceThresholds, ratingSeedsByPlace, requestSeedsByPlace } from '../data/mockData';
import type { InclusionRequestsByPlace, Member, Place, PreferenceCategory, RatingsByPlace } from '../types';

export function ensureRatings(places: Place[], current: RatingsByPlace, members: Member[]): RatingsByPlace {
  const next = { ...current };
  places.forEach((place) => {
    const seed = ratingSeedsByPlace[place.name];
    const values = { ...(next[place.id] || {}) };
    members.forEach((member) => {
      if (!(member.id in values)) values[member.id] = seed?.[member.id] ?? null;
    });
    next[place.id] = values;
  });
  return next;
}

export function ensureInclusionRequests(places: Place[], current: InclusionRequestsByPlace): InclusionRequestsByPlace {
  const next = { ...current };
  places.forEach((place) => {
    if (next[place.id]) return;
    const seed = requestSeedsByPlace[place.name];
    next[place.id] = seed
      ? { ...seed, approvals: [...seed.approvals], rejections: [...seed.rejections] }
      : {
          requesterId: 'alex',
          reason: 'I would like the group to consider including this place.',
          approvals: ['alex'],
          rejections: [],
        };
  });
  return next;
}

export function getRatingSummary(values: Record<string, number | null> = {}, members: Member[]) {
  const submitted = members.map((member) => values[member.id]).filter((value): value is number => typeof value === 'number');
  const score = submitted.length
    ? Math.round((submitted.reduce((sum, value) => sum + value, 0) / submitted.length) * 10)
    : null;
  return { score, ratedCount: submitted.length, memberCount: members.length };
}

export function getPreferenceCategory(score: number | null): PreferenceCategory {
  if (score === null) return 'Unrated';
  if (score >= preferenceThresholds.highMinimum) return 'High';
  if (score >= preferenceThresholds.mediumMinimum) return 'Medium';
  return 'Low';
}

export function defaultIncludedPlaceIds(places: Place[], ratings: RatingsByPlace, members: Member[]): string[] {
  return places
    .filter((place) => ['High', 'Medium'].includes(getPreferenceCategory(getRatingSummary(ratings[place.id], members).score)))
    .map((place) => place.id);
}

export function majorityNeeded(memberCount: number): number {
  return Math.floor(memberCount / 2) + 1;
}
