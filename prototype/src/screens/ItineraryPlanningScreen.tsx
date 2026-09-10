import { useMemo, useState, type DragEvent, type FormEvent } from 'react';
import { AlertTriangle, ArrowDown, ArrowUp, BedDouble, Check, Clock3, GripVertical, Map, MapPin, Plus, Route, Trash2, X } from 'lucide-react';
import { AppBar, Button, handleTabKey, Modal, Page } from '../components/ui';
import { placeOptions } from '../data/mockData';
import { createItineraryStop, durationLabel, formatTime, getDaySchedule, getTravelSegment, recommendedStopOrder } from '../lib/itinerary';
import type { DepartureOption, ItineraryDay, ItineraryStop, OvernightType, Place, TravelMode, TripDraft } from '../types';

interface ItineraryPlanningScreenProps {
  draft: TripDraft;
  mode: TravelMode;
  days: ItineraryDay[];
  confirmedPlaces: Place[];
  activeDayIndex: number;
  onActiveDayChange: (index: number) => void;
  onDaysChange: (days: ItineraryDay[]) => void;
  onBack: () => void;
  onRoutePreview: () => void;
  onPlanComplete: () => void;
  onToast: (message: string) => void;
}

function optionTime(dayNumber: number, option: DepartureOption): string {
  const base = dayNumber === 2 ? 8 * 60 : 9 * 60;
  return formatTime(base + (option === 'later' ? 30 : 0));
}

export function ItineraryPlanningScreen({ draft, mode, days, confirmedPlaces, activeDayIndex, onActiveDayChange, onDaysChange, onBack, onRoutePreview, onPlanComplete, onToast }: ItineraryPlanningScreenProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [addQuery, setAddQuery] = useState('');
  const [pendingStop, setPendingStop] = useState<ItineraryStop | null>(null);
  const [optimizeOpen, setOptimizeOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const day = days[activeDayIndex];
  const finalDay = activeDayIndex === days.length - 1;
  const lodgingPattern = /hotel|homestay|hostel|resort|campsite|accommodation|lodge|guest\s*house|campground/i;
  const overnightChoices = [...confirmedPlaces].sort((a, b) => Number(lodgingPattern.test(b.name)) - Number(lodgingPattern.test(a.name)));
  const selectOvernightPlace = (placeId: string) => {
    const place = confirmedPlaces.find((item) => item.id === placeId);
    onDaysChange(days.map((item, index) => ({
      ...item,
      // A selected stay is an endpoint, not a duplicate activity visit.
      stops: place ? item.stops.filter((stop) => stop.placeId !== place.id) : item.stops,
      ...(index === activeDayIndex ? {
        overnightPlaceId: place?.id,
        overnightLocation: place?.name || '',
        overnightType: place ? (/camp/i.test(place.name) ? 'Camping' as const : 'Accommodation' as const) : 'Not decided yet' as const,
      } : {}),
      saved: place && item.stops.some((stop) => stop.placeId === place.id) || index === activeDayIndex ? false : item.saved,
    })));
  };
  const schedule = useMemo(() => getDaySchedule(day, finalDay), [day, finalDay]);
  const allStopNames = useMemo(() => days.flatMap((item) => item.stops.map((stop) => stop.name)), [days]);
  const addSuggestions = useMemo(() => {
    const query = addQuery.trim().toLowerCase();
    if (!query) return placeOptions.filter((place) => !allStopNames.includes(place.name)).slice(0, 4);
    return placeOptions.filter((place) => place.name.toLowerCase().includes(query) && !allStopNames.includes(place.name)).slice(0, 4);
  }, [addQuery, allStopNames]);

  const updateDay = (nextDay: ItineraryDay) => onDaysChange(days.map((item, index) => index === activeDayIndex ? nextDay : item));

  const chooseDeparture = (option: DepartureOption) => {
    updateDay({ ...day, departureOption: option, departureTime: option === 'custom' ? day.departureTime : optionTime(day.dayNumber, option), saved: false });
  };

  const moveStop = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= day.stops.length) return;
    const stops = [...day.stops];
    [stops[index], stops[target]] = [stops[target], stops[index]];
    updateDay({ ...day, stops, saved: false });
  };

  const dropStop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const stops = [...day.stops];
    const [moved] = stops.splice(draggedIndex, 1);
    stops.splice(targetIndex, 0, moved);
    updateDay({ ...day, stops, saved: false });
    setDraggedIndex(null);
  };

  const moveStopToDay = (stop: ItineraryStop, targetIndex: number) => {
    if (targetIndex === activeDayIndex) return;
    onDaysChange(days.map((item, index) => {
      if (index === activeDayIndex) return { ...item, stops: item.stops.filter((candidate) => candidate.id !== stop.id), saved: false };
      if (index === targetIndex) return { ...item, stops: [...item.stops, stop], saved: false };
      return item;
    }));
    onToast(`${stop.name} moved to Day ${targetIndex + 1}`);
  };

  const removeStop = (stop: ItineraryStop) => {
    updateDay({ ...day, stops: day.stops.filter((item) => item.id !== stop.id), saved: false });
    onToast(`${stop.name} removed from Day ${day.dayNumber}`);
  };

  const previewPlace = (place: Place) => {
    setPendingStop(createItineraryStop(place));
    setAddOpen(false);
    setAddQuery('');
  };

  const submitCustomPlace = (event: FormEvent) => {
    event.preventDefault();
    const name = addQuery.trim();
    if (!name) return;
    const known = placeOptions.find((place) => place.name.toLowerCase() === name.toLowerCase());
    previewPlace({ id: `itinerary-place-${Date.now()}`, name: known?.name || name, location: known?.location || 'Location to confirm' });
  };

  const confirmAddPlace = () => {
    if (!pendingStop) return;
    updateDay({ ...day, stops: [...day.stops, pendingStop], saved: false });
    onToast(`${pendingStop.name} added to Day ${day.dayNumber}`);
    setPendingStop(null);
  };

  const updateOvernight = (type: OvernightType) => {
    const defaultLocations: Record<OvernightType, string> = {
      Accommodation: '',
      Camping: '',
      'Overnight Transport': 'Overnight transport',
      Other: 'Location to confirm',
      'Not decided yet': '',
    };
    updateDay({ ...day, overnightPlaceId: undefined, overnightType: type, overnightLocation: defaultLocations[type], saved: false });
  };

  const recommended = useMemo(() => recommendedStopOrder(day.stops), [day.stops]);
  const currentOrder = day.stops.map((stop) => stop.id).join('|');
  const recommendedOrder = recommended.map((stop) => stop.id).join('|');
  const saveDay = () => {
    const nextDays = days.map((item, index) => index === activeDayIndex ? { ...day, saved: true } : item);
    onDaysChange(nextDays);
    onToast(`Day ${day.dayNumber} saved`);
    if (finalDay) onPlanComplete();
    else onActiveDayChange(activeDayIndex + 1);
  };

  return (
    <Page className="flow-page itinerary-page" labelledBy="itinerary-title">
      <AppBar title="Plan Itinerary" onBack={onBack} />
      <div className="itinerary-body">
        <section className="itinerary-intro">
          <div><p className="eyebrow">{mode === 'group' ? 'Group trip' : 'Solo trip'} · {draft.name}</p><h2 id="itinerary-title">Shape each day</h2></div>
          <span className="recommendation-label"><Route aria-hidden="true" size={14} /> Recommended order</span>
          <p>A suggested route, ready for your changes.</p>
        </section>

        <div className="day-tabs" role="tablist" aria-label="Trip days">
          {days.map((item, index) => <button id={`itinerary-plan-tab-${item.id}`} type="button" role="tab" aria-selected={index === activeDayIndex} aria-controls={`itinerary-plan-panel-${item.id}`} tabIndex={index === activeDayIndex ? 0 : -1} className={index === activeDayIndex ? 'day-tab--active' : ''} key={item.id} onClick={() => onActiveDayChange(index)} onKeyDown={(event) => handleTabKey(event, index, days.length, onActiveDayChange)}>Day {item.dayNumber}{item.saved ? <Check aria-label="Saved" size={13} /> : null}</button>)}
        </div>

        <div className="day-tabpanel" id={`itinerary-plan-panel-${day.id}`} role="tabpanel" aria-labelledby={`itinerary-plan-tab-${day.id}`} tabIndex={0}>
        <section className="departure-card" aria-labelledby="departure-title">
          <div className="section-heading"><h3 id="departure-title">Departure</h3><strong>{day.departureTime}</strong></div>
          <div className="departure-options" role="radiogroup" aria-label="Departure time option">
            <button type="button" role="radio" aria-checked={day.departureOption === 'now'} className={day.departureOption === 'now' ? 'is-selected' : ''} onClick={() => chooseDeparture('now')}>Now</button>
            <button type="button" role="radio" aria-checked={day.departureOption === 'later'} className={day.departureOption === 'later' ? 'is-selected' : ''} onClick={() => chooseDeparture('later')}>30 min later</button>
            <button type="button" role="radio" aria-checked={day.departureOption === 'custom'} className={day.departureOption === 'custom' ? 'is-selected' : ''} onClick={() => chooseDeparture('custom')}>Custom</button>
          </div>
          {day.departureOption === 'custom' ? <label className="custom-time"><span>Custom departure time</span><input type="time" name={`departure-${day.id}`} value={day.departureTime} onInput={(event) => updateDay({ ...day, departureTime: event.currentTarget.value, saved: false })} onChange={(event) => updateDay({ ...day, departureTime: event.currentTarget.value, saved: false })} /></label> : null}
        </section>

        <section className="planned-stops" aria-labelledby="planned-stops-title">
          <div className="section-heading"><div><h3 id="planned-stops-title">Day {day.dayNumber} stops</h3><span>{day.stops.length} planned</span></div><button className="add-place-button" type="button" onClick={() => setAddOpen(true)}><Plus aria-hidden="true" size={17} /> Add Place</button></div>
          {day.stops.length ? (
            <div className="itinerary-stop-list">
              {schedule.stops.map(({ stop, arrival, leave, openingWarning }, index) => (
                <article className="itinerary-stop" key={stop.id} draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event: DragEvent) => event.preventDefault()} onDrop={() => dropStop(index)}>
                  <div className="stop-topline"><GripVertical aria-hidden="true" size={19} /><span className="stop-number">{index + 1}</span><div><h3>{stop.name}</h3><p><MapPin aria-hidden="true" size={12} /> {stop.location}</p></div></div>
                  <div className="stop-timing"><span><small>Arrive</small><strong>{arrival}</strong></span><span><small>Estimated stay</small><label><span className="visually-hidden">Estimated stay for {stop.name} in minutes</span><input type="number" inputMode="numeric" name={`stay-${stop.id}`} min="30" max="720" step="15" value={stop.stayMinutes} onChange={(event) => updateDay({ ...day, stops: day.stops.map((item) => item.id === stop.id ? { ...item, stayMinutes: Math.max(30, Math.min(720, Number(event.target.value) || 30)) } : item), saved: false })} /><small>min</small></label></span><span><small>Leave</small><strong>{leave}</strong></span></div>
                  <div className="opening-row"><Clock3 aria-hidden="true" size={14} /><span>Opening hours</span><strong>{stop.openingHours}</strong></div>
                  {openingWarning ? <div className="context-warning"><AlertTriangle aria-hidden="true" size={16} /><span>{openingWarning}</span></div> : null}
                  <div className="stop-actions">
                    <button type="button" onClick={() => moveStop(index, -1)} disabled={index === 0} aria-label={`Move ${stop.name} up`}><ArrowUp aria-hidden="true" size={17} /></button>
                    <button type="button" onClick={() => moveStop(index, 1)} disabled={index === day.stops.length - 1} aria-label={`Move ${stop.name} down`}><ArrowDown aria-hidden="true" size={17} /></button>
                    <label className="move-day-control"><span>Move to</span><select aria-label={`Move ${stop.name} to another day`} value={activeDayIndex} onChange={(event) => moveStopToDay(stop, Number(event.target.value))}>{days.map((targetDay, targetIndex) => <option key={targetDay.id} value={targetIndex}>Day {targetDay.dayNumber}</option>)}</select></label>
                    <button className="remove-stop" type="button" onClick={() => removeStop(stop)} aria-label={`Remove ${stop.name} from Day ${day.dayNumber}`}><Trash2 aria-hidden="true" size={17} /></button>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="empty-state itinerary-empty"><MapPin aria-hidden="true" size={22} /><h3>No places on this day</h3><p>Add a place or move one here from another day.</p></div>}
        </section>

        {schedule.tooPacked ? <div className="day-warning" role="status"><AlertTriangle aria-hidden="true" size={18} /><div><strong>This day may be too packed</strong><span>Shorten a stay or move a place to another day.</span></div></div> : null}

        {finalDay ? (
          <section className="end-anchor end-anchor--home"><span><Route aria-hidden="true" size={21} /></span><div><p>End of Day {day.dayNumber}</p><h3>Return home · Trip ends</h3><small>Estimated finish {schedule.finish}</small></div></section>
        ) : (
          <section className="end-anchor" aria-labelledby="overnight-title"><span><BedDouble aria-hidden="true" size={21} /></span><div className="overnight-fields"><p>End of Day {day.dayNumber}</p><h3 id="overnight-title">Overnight Stay</h3><label><span>Choose a confirmed place</span><select name={`overnight-place-${day.id}`} value={day.overnightPlaceId || ''} onChange={(event) => selectOvernightPlace(event.target.value)}><option value="">Manual location / Not decided yet</option>{overnightChoices.map((place) => <option key={place.id} value={place.id}>{place.name}</option>)}</select></label><label><span>Stay type</span><select name={`overnight-type-${day.id}`} value={day.overnightType || 'Not decided yet'} onChange={(event) => updateOvernight(event.target.value as OvernightType)}><option>Accommodation</option><option>Camping</option><option>Overnight Transport</option><option>Other</option><option>Not decided yet</option></select></label><label><span>Location</span><input name={`overnight-location-${day.id}`} autoComplete="off" placeholder="Add an end-of-day location…" value={day.overnightLocation} onChange={(event) => updateDay({ ...day, overnightPlaceId: undefined, overnightLocation: event.target.value, saved: false })} /></label><small>Finish {schedule.finish} · Back at stay {schedule.finish}</small></div></section>
        )}

        <section className="day-summary" aria-label="Day summary"><div><span>Day completion</span><strong>{schedule.finish}</strong></div><div><span>Travel time</span><strong>{durationLabel(schedule.totalTravelMinutes)}</strong></div><div><span>Distance</span><strong>{schedule.totalDistance} km</strong></div></section>

        <Button type="button" variant="secondary" fullWidth onClick={() => setOptimizeOpen(true)}><Route aria-hidden="true" size={18} /> Optimize Route</Button>
        <div className="itinerary-bottom-actions"><Button type="button" variant="secondary" onClick={onRoutePreview}><Map aria-hidden="true" size={18} /> Route Preview</Button><Button type="button" onClick={saveDay}><Check aria-hidden="true" size={18} /> {finalDay ? 'Finalize Itinerary' : 'Save Day'}</Button></div>
        </div>
      </div>

      {addOpen ? <AddPlaceSheet query={addQuery} suggestions={addSuggestions} onQueryChange={setAddQuery} onSubmit={submitCustomPlace} onSelect={(place) => previewPlace({ ...place, id: `itinerary-place-${Date.now()}` })} onClose={() => { setAddOpen(false); setAddQuery(''); }} /> : null}
      {pendingStop ? <AddPlaceImpactSheet stop={pendingStop} day={day} finalDay={finalDay} onCancel={() => setPendingStop(null)} onConfirm={confirmAddPlace} /> : null}
      {optimizeOpen ? <OptimizeRouteSheet current={day.stops} recommended={recommended} unchanged={currentOrder === recommendedOrder} onCancel={() => setOptimizeOpen(false)} onApply={() => { updateDay({ ...day, stops: recommended, saved: false }); setOptimizeOpen(false); onToast('Recommended order applied'); }} /> : null}
    </Page>
  );
}

function AddPlaceSheet({ query, suggestions, onQueryChange, onSubmit, onSelect, onClose }: { query: string; suggestions: Omit<Place, 'id' | 'addedBy'>[]; onQueryChange: (value: string) => void; onSubmit: (event: FormEvent) => void; onSelect: (place: Omit<Place, 'id' | 'addedBy'>) => void; onClose: () => void }) {
  return (
    <Modal onClose={onClose} labelledBy="add-place-title" closeOnBackdrop>
        <div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close Add Place"><X aria-hidden="true" size={20} /></button>
        <span className="sheet-icon sheet-icon--teal"><Plus aria-hidden="true" size={22} /></span><p className="eyebrow">Itinerary change</p><h2 id="add-place-title">Add Place</h2><p>Choose a place, then review its route impact.</p>
        <form className="itinerary-place-form" onSubmit={onSubmit}><label htmlFor="itinerary-place-query">Place</label><div><input id="itinerary-place-query" name="itineraryPlace" autoComplete="off" placeholder="Try “Penang Hill”…" value={query} onChange={(event) => onQueryChange(event.target.value)} /><Button type="submit" disabled={!query.trim()}>Preview</Button></div></form>
        {suggestions.length ? <div className="itinerary-place-options" aria-label="Available places">{suggestions.map((place) => <button type="button" key={place.name} onClick={() => onSelect(place)}><span><strong>{place.name}</strong><small>{place.location}</small></span><Plus aria-hidden="true" size={17} /></button>)}</div> : null}
        <Button type="button" variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
    </Modal>
  );
}

function AddPlaceImpactSheet({ stop, day, finalDay, onCancel, onConfirm }: { stop: ItineraryStop; day: ItineraryDay; finalDay: boolean; onCancel: () => void; onConfirm: () => void }) {
  const currentSchedule = getDaySchedule(day, finalDay);
  const updatedSchedule = getDaySchedule({ ...day, stops: [...day.stops, stop] }, finalDay);
  const extraSegment = getTravelSegment(day.stops.length);
  const conflict = updatedSchedule.stops.find((item) => item.stop.id === stop.id)?.openingWarning;
  return (
    <Modal onClose={onCancel} labelledBy="impact-title" className="bottom-sheet impact-sheet">
        <div className="sheet-handle" aria-hidden="true" /><span className="sheet-icon sheet-icon--teal"><Route aria-hidden="true" size={22} /></span><p className="eyebrow">Before you add</p><h2 id="impact-title">Route Impact</h2><p>{stop.name}</p>
        <div className="impact-metrics"><span><small>Extra travel time</small><strong>+{extraSegment.minutes} min</strong></span><span><small>Extra distance</small><strong>+{extraSegment.distance} km</strong></span><span><small>Updated finish</small><strong>{currentSchedule.finish} → {updatedSchedule.finish}</strong></span></div>
        {conflict ? <div className="context-warning"><AlertTriangle aria-hidden="true" size={16} /><span>{conflict}</span></div> : <div className="fit-message"><Check aria-hidden="true" size={17} /><strong>Fits your itinerary</strong></div>}
        <div className="sheet-actions"><Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button><Button type="button" onClick={onConfirm}>Add Place</Button></div>
    </Modal>
  );
}

function OptimizeRouteSheet({ current, recommended, unchanged, onCancel, onApply }: { current: ItineraryStop[]; recommended: ItineraryStop[]; unchanged: boolean; onCancel: () => void; onApply: () => void }) {
  return (
    <Modal onClose={onCancel} labelledBy="optimize-title" closeOnBackdrop>
        <div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onCancel} aria-label="Close route recommendation"><X aria-hidden="true" size={20} /></button>
        <span className="sheet-icon sheet-icon--teal"><Route aria-hidden="true" size={22} /></span><p className="eyebrow">Suggested for your trip</p><h2 id="optimize-title">Recommended Order</h2><p>{unchanged ? 'Your current order already matches this recommendation.' : 'Review the proposed order before applying it.'}</p>
        <div className="optimize-order">{(recommended.length ? recommended : current).map((stop, index) => <div key={stop.id}><span>{index + 1}</span><strong>{stop.name}</strong></div>)}</div>
        <div className="sheet-actions"><Button type="button" variant="secondary" onClick={onCancel}>Keep Current</Button><Button type="button" disabled={!recommended.length} onClick={onApply}>Apply Order</Button></div>
    </Modal>
  );
}
