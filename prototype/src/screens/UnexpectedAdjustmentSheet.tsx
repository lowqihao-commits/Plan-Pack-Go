import { AlertTriangle, Check, Clock3, CloudRain, MapPin, Route, Shuffle, X } from 'lucide-react';
import { useState } from 'react';
import { Button, Modal } from '../components/ui';
import { formatTime, getDaySchedule, parseTime } from '../lib/itinerary';
import type { AdjustmentKind, ItineraryDay, ItineraryStop } from '../types';

const replacementOptions: Record<'unavailable' | 'weather', Array<{ name: string; location: string; fit: string; extraMinutes: number; extraDistance: number }>> = {
  unavailable: [
    { name: 'Pinang Peranakan Mansion', location: 'George Town', fit: 'Indoor heritage visit · Open until 17:00', extraMinutes: 10, extraDistance: 2 },
    { name: 'Hin Bus Depot', location: 'George Town', fit: 'Flexible indoor stop · Open until 18:00', extraMinutes: 15, extraDistance: 4 },
  ],
  weather: [
    { name: 'Wonderfood Museum', location: 'George Town', fit: 'Indoor activity · Open until 18:00', extraMinutes: 12, extraDistance: 3 },
    { name: 'Penang State Museum', location: 'George Town', fit: 'Indoor cultural visit · Open until 17:00', extraMinutes: 16, extraDistance: 5 },
  ],
};

function stopForKind(days: ItineraryDay[], dayIndex: number, kind: AdjustmentKind) {
  const day = days[dayIndex];
  if (kind === 'weather') return day.stops.find((stop) => /Entopia|Beach|Market/i.test(stop.name)) || day.stops[0];
  return day.stops.find((stop) => stop.name === 'Penang Hill') || day.stops[0];
}

export function UnexpectedAdjustmentSheet({ kind, days, activeDayIndex, onClose, onApply, onResolve }: { kind: AdjustmentKind; days: ItineraryDay[]; activeDayIndex: number; onClose: () => void; onApply: (days: ItineraryDay[], message: string) => void; onResolve: (message: string) => void }) {
  const [replacementMode, setReplacementMode] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const day = days[activeDayIndex];
  const targetStop = stopForKind(days, activeDayIndex, kind);
  const currentSchedule = getDaySchedule(day, activeDayIndex === days.length - 1);
  const affectedActivities = day.stops.filter((stop) => /Entopia|Beach|Market|Hill/i.test(stop.name));
  const alternatives = kind === 'weather' ? replacementOptions.weather : replacementOptions.unavailable;
  const selected = alternatives.find((item) => item.name === selectedName);
  const affectedCount = Math.max(1, affectedActivities.length);

  const updateActiveDay = (nextDay: ItineraryDay, message: string) => onApply(days.map((item, index) => index === activeDayIndex ? nextDay : item), message);
  const skipUnavailable = () => {
    if (!targetStop) return onResolve('No affected stop remains in this day');
    updateActiveDay({ ...day, stops: day.stops.filter((stop) => stop.id !== targetStop.id), saved: true }, `${targetStop.name} skipped · downstream times recalculated`);
  };
  const applyDelay = (choice: 'continue' | 'shorten' | 'skip') => {
    if (choice === 'continue') return updateActiveDay({ ...day, departureTime: formatTime(parseTime(day.departureTime) + 40), saved: true }, 'Continued with the 40 min delay · future times recalculated');
    if (choice === 'shorten') {
      const current = day.stops[0];
      if (!current) return onResolve('No current stay needs shortening');
      return updateActiveDay({ ...day, stops: day.stops.map((stop, index) => index === 0 ? { ...stop, stayMinutes: Math.max(30, stop.stayMinutes - 30) } : stop), saved: true }, `${current.name} shortened by 30 min · future times recalculated`);
    }
    const skipIndex = day.stops.length > 1 ? 1 : 0;
    const skipped = day.stops[skipIndex];
    if (!skipped) return onResolve('No next stop needs skipping');
    return updateActiveDay({ ...day, stops: day.stops.filter((_, index) => index !== skipIndex), saved: true }, `${skipped.name} skipped · future times recalculated`);
  };
  const moveWeatherActivity = () => {
    const affected = affectedActivities[0] || day.stops[0];
    if (!affected || days.length < 2) return onResolve('No affected activity needs moving');
    const targetIndex = activeDayIndex > 0 ? activeDayIndex - 1 : Math.min(1, days.length - 1);
    onApply(days.map((item, index) => {
      if (index === activeDayIndex) return { ...item, stops: item.stops.filter((stop) => stop.id !== affected.id), saved: true };
      if (index === targetIndex) return { ...item, stops: [...item.stops, affected], saved: false };
      return item;
    }), `${affected.name} moved to Day ${targetIndex + 1} · timing recalculated`);
  };
  const confirmReplacement = () => {
    if (!selected || !targetStop) return;
    const replacement: ItineraryStop = { ...targetStop, id: `replacement-${Date.now()}`, placeId: `replacement-${selected.name.toLowerCase().replace(/\s+/g, '-')}`, name: selected.name, location: selected.location, stayMinutes: 90, openingHours: selected.fit.split('· ')[1] || 'Hours confirmed' };
    updateActiveDay({ ...day, stops: day.stops.map((stop) => stop.id === targetStop.id ? replacement : stop), saved: true }, `${selected.name} confirmed · route and timing recalculated`);
  };

  const heading = kind === 'unavailable' ? `${targetStop?.name || 'This place'} may be unavailable` : kind === 'late' ? 'Your itinerary is running 40 min late' : `Rain may affect ${affectedCount} ${affectedCount === 1 ? 'activity' : 'activities'} today`;
  const description = kind === 'unavailable' ? 'Choose to skip or replace this stop.' : kind === 'late' ? `The current finish may move from ${currentSchedule.finish} to ${formatTime(currentSchedule.finishMinutes + 40)}.` : 'Review the affected outdoor activities.';

  if (replacementMode) return <ReplacementOptions kind={kind === 'weather' ? 'weather' : 'unavailable'} targetName={targetStop?.name || 'Affected place'} alternatives={alternatives} selectedName={selectedName} currentFinish={currentSchedule.finish} onSelect={setSelectedName} onCancel={() => setReplacementMode(false)} onClose={onClose} onConfirm={confirmReplacement} />;

  return <Modal className="bottom-sheet adjustment-sheet" labelledBy="adjustment-title" onClose={onClose}><div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close trip adjustment"><X aria-hidden="true" size={20} /></button><span className={`sheet-icon ${kind === 'weather' ? '' : 'sheet-icon--teal'}`}>{kind === 'weather' ? <CloudRain aria-hidden="true" size={22} /> : kind === 'late' ? <Clock3 aria-hidden="true" size={22} /> : <AlertTriangle aria-hidden="true" size={22} />}</span><p className="eyebrow">Trip update</p><h2 id="adjustment-title">{heading}</h2><p>{description}</p>
    {kind === 'weather' ? <div className="affected-activity-list">{(affectedActivities.length ? affectedActivities : day.stops.slice(0, 1)).map((stop) => <div key={stop.id}><MapPin aria-hidden="true" size={16} /><span><strong>{stop.name}</strong><small>{stop.location}</small></span></div>)}</div> : null}
    {kind === 'unavailable' ? <div className="adjustment-actions"><Button type="button" onClick={skipUnavailable}>Go to Next Place</Button><Button type="button" variant="secondary" onClick={() => setReplacementMode(true)}>Find Replacement</Button></div> : null}
    {kind === 'late' ? <div className="adjustment-actions adjustment-actions--stack"><Button type="button" onClick={() => applyDelay('continue')}>Continue as Planned</Button><Button type="button" variant="secondary" onClick={() => applyDelay('shorten')}>Shorten Current Stay</Button><Button type="button" variant="tertiary" onClick={() => applyDelay('skip')}>Skip Next Place</Button><div className="context-warning"><AlertTriangle aria-hidden="true" size={16} /><span>A later Penang Hill visit may approach the final funicular time.</span></div></div> : null}
    {kind === 'weather' ? <div className="adjustment-actions adjustment-actions--stack"><Button type="button" onClick={() => onResolve('Weather impact reviewed · plan kept as saved')}>Keep as Planned</Button><Button type="button" variant="secondary" onClick={moveWeatherActivity}>Move to Another Day</Button><Button type="button" variant="tertiary" onClick={() => setReplacementMode(true)}>Find Indoor Alternative</Button></div> : null}
    <Button type="button" variant="tertiary" fullWidth onClick={onClose}>Cancel</Button>
  </Modal>;
}

function ReplacementOptions({ kind, targetName, alternatives, selectedName, currentFinish, onSelect, onCancel, onClose, onConfirm }: { kind: 'unavailable' | 'weather'; targetName: string; alternatives: Array<{ name: string; location: string; fit: string; extraMinutes: number; extraDistance: number }>; selectedName: string; currentFinish: string; onSelect: (name: string) => void; onCancel: () => void; onClose: () => void; onConfirm: () => void }) {
  const selected = alternatives.find((item) => item.name === selectedName);
  const updatedFinish = selected ? formatTime(parseTime(currentFinish) + selected.extraMinutes) : currentFinish;
  return <Modal className="bottom-sheet replacement-sheet" labelledBy="replacement-title" onClose={onClose}><div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close replacement suggestions"><X aria-hidden="true" size={20} /></button><span className="sheet-icon sheet-icon--teal"><Shuffle aria-hidden="true" size={22} /></span><p className="eyebrow">{kind === 'weather' ? 'Indoor alternatives' : 'Replacement suggestions'}</p><h2 id="replacement-title">Replace {targetName}</h2><p>Choose a replacement, review its impact, then confirm.</p><div className="replacement-options" role="radiogroup" aria-label="Replacement options">{alternatives.map((item) => <button type="button" role="radio" aria-checked={selectedName === item.name} className={selectedName === item.name ? 'is-selected' : ''} key={item.name} onClick={() => onSelect(item.name)}><span><strong>{item.name}</strong><small><MapPin aria-hidden="true" size={12} /> {item.location}</small><small>{item.fit}</small></span>{selectedName === item.name ? <Check aria-hidden="true" size={18} /> : null}</button>)}</div>{selected ? <div className="replacement-impact"><div><small>Extra travel</small><strong>+{selected.extraMinutes} min</strong></div><div><small>Extra distance</small><strong>+{selected.extraDistance} km</strong></div><div><small>Updated finish</small><strong>{updatedFinish}</strong></div><p><Route aria-hidden="true" size={15} /> Fits the revised itinerary and opening hours.</p></div> : null}<div className="sheet-actions"><Button type="button" variant="secondary" onClick={onCancel}>Back</Button><Button type="button" disabled={!selected} onClick={onConfirm}>Confirm Replacement</Button></div></Modal>;
}
