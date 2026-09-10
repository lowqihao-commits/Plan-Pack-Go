import { useMemo, useState } from 'react';
import { BedDouble, Check, MapPin, Route, X } from 'lucide-react';
import { AppBar, Button, Modal, Page } from '../components/ui';
import { durationLabel, getDaySchedule, recommendedStopOrder } from '../lib/itinerary';
import type { ItineraryDay } from '../types';

interface RoutePreviewScreenProps {
  days: ItineraryDay[];
  activeDayIndex: number;
  onDaysChange: (days: ItineraryDay[]) => void;
  onBack: () => void;
  onToast: (message: string) => void;
}

export function RoutePreviewScreen({ days, activeDayIndex, onDaysChange, onBack, onToast }: RoutePreviewScreenProps) {
  const [optimizeOpen, setOptimizeOpen] = useState(false);
  const day = days[activeDayIndex];
  const finalDay = activeDayIndex === days.length - 1;
  const hasEndpointSegment = day.stops.length > 0 || (!finalDay && Boolean(day.overnightPlaceId));
  const schedule = useMemo(() => getDaySchedule(day, finalDay), [day, finalDay]);
  const recommended = useMemo(() => recommendedStopOrder(day.stops), [day.stops]);
  const endpoint = finalDay ? 'Return home · Trip ends' : `Overnight Stay · ${day.overnightLocation || day.overnightType || 'Not decided yet'}`;
  const routePoints = [
    { left: '13%', top: '72%' },
    { left: '31%', top: '35%' },
    { left: '58%', top: '57%' },
    { left: '77%', top: '25%' },
    { left: '85%', top: '68%' },
  ];
  const endpointPoint = routePoints[Math.min(day.stops.length + 1, routePoints.length - 1)];
  const applyRecommended = () => {
    onDaysChange(days.map((item, index) => index === activeDayIndex ? { ...item, stops: recommended, saved: false } : item));
    setOptimizeOpen(false);
    onToast('Recommended order applied');
  };

  return (
    <Page className="flow-page route-preview-page" labelledBy="route-preview-title">
      <AppBar title={`Day ${day.dayNumber} Route`} onBack={onBack} />
      <div className="route-preview-body">
        <section className="route-preview-heading"><div><p className="eyebrow">Day {day.dayNumber} route</p><h2 id="route-preview-title">Route Preview</h2></div><span>{day.stops.length} {day.stops.length === 1 ? 'stop' : 'stops'}</span><p>Review your route, travel time and endpoint.</p></section>

        <section className="mock-map" aria-label={`Map-like route for Day ${day.dayNumber}`}>
          <span className="mock-road mock-road--one" aria-hidden="true" /><span className="mock-road mock-road--two" aria-hidden="true" /><span className="mock-road mock-road--three" aria-hidden="true" />
          <svg className="route-line-svg" viewBox="0 0 340 220" preserveAspectRatio="none" aria-hidden="true"><polyline points="42,158 105,77 197,126 266,55 292,150" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 11" /></svg>
          <span className="map-departure" style={routePoints[0]}><Route aria-hidden="true" size={16} /></span>
          {day.stops.map((stop, index) => <span className="map-stop" style={routePoints[Math.min(index + 1, routePoints.length - 2)]} key={stop.id} title={stop.name}>{index + 1}</span>)}
          <span className={`map-endpoint ${finalDay ? 'map-endpoint--home' : ''}`} style={endpointPoint}>{finalDay ? <Route aria-hidden="true" size={16} /> : <BedDouble aria-hidden="true" size={16} />}</span>
          <span className="map-label map-label--start">Start</span><span className="map-label map-label--end">{finalDay ? 'Home' : 'Stay'}</span>
        </section>

        <section className="route-overview" aria-label="Route totals"><div><span>Total travel time</span><strong>{durationLabel(schedule.totalTravelMinutes)}</strong></div><div><span>Total distance</span><strong>{schedule.totalDistance} km</strong></div><div><span>{finalDay ? 'Estimated finish' : 'Estimated return'}</span><strong>{schedule.finish}</strong></div></section>

        <section className="route-segments" aria-labelledby="segments-title">
          <div className="section-heading"><h3 id="segments-title">Route segments</h3><span>{schedule.stops.length + (hasEndpointSegment ? 1 : 0)}</span></div>
          {schedule.stops.map(({ stop, segment }, index) => <article className="segment-card" key={stop.id}><span className="segment-number">{index + 1}</span><div><strong>{index === 0 ? 'Departure' : day.stops[index - 1].name}</strong><small>to {stop.name}</small></div><div><strong>{segment.minutes} min</strong><small>{segment.distance} km</small></div></article>)}
          {hasEndpointSegment ? <article className="segment-card segment-card--endpoint"><span className="segment-number"><MapPin aria-hidden="true" size={15} /></span><div><strong>{day.stops.at(-1)?.name || 'Departure'}</strong><small>to {endpoint}</small></div><div><strong>{schedule.returnSegment.minutes} min</strong><small>{schedule.returnSegment.distance} km</small></div></article> : <div className="empty-state"><MapPin aria-hidden="true" size={22} /><h3>No route segments yet</h3><p>Add a place in Itinerary Planning first.</p></div>}
        </section>

        <div className="route-preview-actions"><Button type="button" variant="secondary" onClick={onBack}>Reorder Stops</Button><Button type="button" onClick={() => setOptimizeOpen(true)}><Route aria-hidden="true" size={17} /> Optimize Route</Button></div>
      </div>
      {optimizeOpen ? <RouteOptimizationSheet stops={recommended} onCancel={() => setOptimizeOpen(false)} onApply={applyRecommended} /> : null}
    </Page>
  );
}

function RouteOptimizationSheet({ stops, onCancel, onApply }: { stops: ItineraryDay['stops']; onCancel: () => void; onApply: () => void }) {
  return (
    <Modal className="bottom-sheet" labelledBy="route-optimize-title" onClose={onCancel} closeOnBackdrop>
        <div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onCancel} aria-label="Close route recommendation"><X aria-hidden="true" size={20} /></button>
        <span className="sheet-icon sheet-icon--teal"><Route aria-hidden="true" size={22} /></span><p className="eyebrow">Suggested for your trip</p><h2 id="route-optimize-title">Recommended Order</h2><p>Nothing changes until you apply this order.</p>
        <div className="optimize-order">{stops.map((stop, index) => <div key={stop.id}><span>{index + 1}</span><strong>{stop.name}</strong></div>)}</div>
        <div className="sheet-actions"><Button type="button" variant="secondary" onClick={onCancel}>Keep Current</Button><Button type="button" disabled={!stops.length} onClick={onApply}><Check aria-hidden="true" size={17} /> Apply Order</Button></div>
    </Modal>
  );
}
