import { getTripLength } from './date';
import type { ItineraryDay, ItineraryStop, Place, TripDraft } from '../types';

const preferredDayByPlace: Record<string, number> = {
  'Chew Jetty': 1,
  'Kek Lok Si Temple': 2,
  'Penang Hill': 2,
  'Entopia Butterfly Farm': 3,
  'Batu Ferringhi Beach': 3,
};

const stayMinutesByPlace: Record<string, number> = {
  'Chew Jetty': 60,
  'Kek Lok Si Temple': 120,
  'Penang Hill': 195,
  'Entopia Butterfly Farm': 150,
  'Batu Ferringhi Beach': 120,
};

const openingHoursByPlace: Record<string, string> = {
  'Chew Jetty': '09:00–18:00',
  'Kek Lok Si Temple': '08:30–17:30',
  'Penang Hill': '06:30–19:00',
  'Entopia Butterfly Farm': '09:00–17:00',
  'Batu Ferringhi Beach': 'Open access',
};

const closingMinutesByPlace: Record<string, number> = {
  'Chew Jetty': 18 * 60,
  'Kek Lok Si Temple': 17 * 60 + 30,
  'Penang Hill': 19 * 60,
  'Entopia Butterfly Farm': 17 * 60,
};

const openingMinutesByPlace: Record<string, number> = {
  'Chew Jetty': 9 * 60,
  'Kek Lok Si Temple': 8 * 60 + 30,
  'Penang Hill': 6 * 60 + 30,
  'Entopia Butterfly Farm': 9 * 60,
};

export function createItineraryStop(place: Place): ItineraryStop {
  return {
    id: `${place.id}-stop-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    placeId: place.id,
    name: place.name,
    location: place.location,
    stayMinutes: stayMinutesByPlace[place.name] || 90,
    openingHours: openingHoursByPlace[place.name] || 'Hours to confirm',
  };
}

export function createRecommendedItinerary(places: Place[], draft: TripDraft): ItineraryDay[] {
  const tripLength = getTripLength(draft.startDate, draft.endDate);
  const dayCount = tripLength?.valid ? tripLength.days : 1;
  const activePlanningDays = dayCount > 1 ? dayCount - 1 : 1;
  const stopsByDay = Array.from({ length: dayCount }, () => [] as ItineraryStop[]);

  places.forEach((place, index) => {
    const preferred = preferredDayByPlace[place.name];
    const targetIndex = preferred
      ? Math.min(activePlanningDays - 1, preferred - 1)
      : index % activePlanningDays;
    stopsByDay[targetIndex].push(createItineraryStop(place));
  });

  return stopsByDay.map((stops, index) => ({
    id: `day-${index + 1}`,
    dayNumber: index + 1,
    departureOption: 'now',
    departureTime: index === 1 ? '08:00' : index === dayCount - 1 ? '10:00' : '09:00',
    stops,
    overnightType: index < dayCount - 1 ? 'Not decided yet' : null,
    overnightLocation: '',
    saved: false,
  }));
}

export function parseTime(value: string): number {
  const [hours, minutes] = value.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function formatTime(totalMinutes: number): string {
  const wrapped = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours = Math.floor(wrapped / 60);
  const minutes = wrapped % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function getTravelSegment(index: number) {
  const minutes = index === 0 ? 20 : 15 + ((index - 1) % 2) * 5;
  const distance = index === 0 ? 6 : 3 + ((index - 1) % 3);
  return { minutes, distance };
}

export function getDaySchedule(day: ItineraryDay, finalDay: boolean) {
  const departureMinutes = parseTime(day.departureTime);
  let cursor = departureMinutes;
  let totalTravelMinutes = 0;
  let totalDistance = 0;
  const stops = day.stops.map((stop, index) => {
    const segment = getTravelSegment(index);
    cursor += segment.minutes;
    totalTravelMinutes += segment.minutes;
    totalDistance += segment.distance;
    const arrivalMinutes = cursor;
    const leaveMinutes = arrivalMinutes + stop.stayMinutes;
    cursor = leaveMinutes;
    const openingMinutes = openingMinutesByPlace[stop.name];
    const closingMinutes = closingMinutesByPlace[stop.name];
    const openingWarning = openingMinutes && arrivalMinutes < openingMinutes
      ? `${stop.name} opens at ${formatTime(openingMinutes)}, after the estimated ${formatTime(arrivalMinutes)} arrival.`
      : closingMinutes && leaveMinutes > closingMinutes - 30
        ? `${stop.name} may close before this visit finishes at ${formatTime(leaveMinutes)}.`
        : null;
    return {
      stop,
      arrivalMinutes,
      leaveMinutes,
      arrival: formatTime(arrivalMinutes),
      leave: formatTime(leaveMinutes),
      segment,
      openingWarning,
    };
  });

  const returnSegment = day.stops.length || (!finalDay && day.overnightPlaceId) ? (finalDay ? { minutes: 25, distance: 8 } : { minutes: 20, distance: 6 }) : { minutes: 0, distance: 0 };
  cursor += returnSegment.minutes;
  totalTravelMinutes += returnSegment.minutes;
  totalDistance += returnSegment.distance;
  const plannedMinutes = cursor - departureMinutes;
  return {
    departureMinutes,
    stops,
    finishMinutes: cursor,
    finish: formatTime(cursor),
    totalTravelMinutes,
    totalDistance,
    returnSegment,
    tooPacked: plannedMinutes > 9 * 60 || day.stops.length > 3,
  };
}

export function recommendedStopOrder(stops: ItineraryStop[]): ItineraryStop[] {
  const priorities: Record<string, number> = {
    'Chew Jetty': 1,
    'Kek Lok Si Temple': 2,
    'Penang Hill': 3,
    'Entopia Butterfly Farm': 4,
    'Batu Ferringhi Beach': 5,
  };
  return [...stops].sort((first, second) => (priorities[first.name] || 99) - (priorities[second.name] || 99));
}

export function durationLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder} min`;
  if (!remainder) return `${hours} hr`;
  return `${hours} hr ${remainder} min`;
}
