import { AlertTriangle, BedDouble, Clock3, CloudRain, Edit3, Map, MapPin, Route } from 'lucide-react';
import { AppBar, Button, handleTabKey, Page } from '../components/ui';
import { durationLabel, getDaySchedule } from '../lib/itinerary';
import type { AdjustmentKind, ItineraryDay } from '../types';

export function ItineraryDetailScreen({ days, activeDayIndex, onActiveDayChange, onBack, onViewRoute, onEditDay, onAdjustment }: { days: ItineraryDay[]; activeDayIndex: number; onActiveDayChange: (index: number) => void; onBack: () => void; onViewRoute: () => void; onEditDay: () => void; onAdjustment: (kind: AdjustmentKind) => void }) {
  const day = days[activeDayIndex];
  const finalDay = activeDayIndex === days.length - 1;
  const schedule = getDaySchedule(day, finalDay);
  return (
    <Page className="itinerary-detail-page" labelledBy="itinerary-detail-title">
      <AppBar title="Itinerary" onBack={onBack} />
      <div className="itinerary-detail-body">
        <section className="detail-heading"><p className="eyebrow">Finalized plan</p><h2 id="itinerary-detail-title">Day {day.dayNumber}</h2><p>Review the saved order and timing for this day.</p></section>
        <div className="day-tabs" role="tablist" aria-label="Itinerary days">{days.map((item, index) => <button id={`itinerary-detail-tab-${item.id}`} type="button" role="tab" aria-selected={index === activeDayIndex} aria-controls={`itinerary-detail-panel-${item.id}`} tabIndex={index === activeDayIndex ? 0 : -1} className={index === activeDayIndex ? 'day-tab--active' : ''} key={item.id} onClick={() => onActiveDayChange(index)} onKeyDown={(event) => handleTabKey(event, index, days.length, onActiveDayChange)}>Day {item.dayNumber}</button>)}</div>

        <div className="day-tabpanel" id={`itinerary-detail-panel-${day.id}`} role="tabpanel" aria-labelledby={`itinerary-detail-tab-${day.id}`} tabIndex={0}>
        <section className="day-adjustments" aria-labelledby="day-adjustments-title"><div className="section-heading"><h2 id="day-adjustments-title">Today’s Trip Updates</h2><span>Lightweight actions</span></div><div><button type="button" onClick={() => onAdjustment('unavailable')}><AlertTriangle aria-hidden="true" size={17} /><span>Place unavailable</span></button><button type="button" onClick={() => onAdjustment('late')}><Clock3 aria-hidden="true" size={17} /><span>Running late</span></button><button type="button" onClick={() => onAdjustment('weather')}><CloudRain aria-hidden="true" size={17} /><span>Weather impact</span></button></div></section>

        <section className="timeline" aria-label={`Day ${day.dayNumber} timeline`}>
          <div className="timeline-row timeline-row--start"><span className="timeline-marker"><Clock3 aria-hidden="true" size={17} /></span><div><small>{day.departureTime}</small><h3>Departure</h3><p>{day.dayNumber === 1 ? 'Start the planned route' : 'Leave the overnight stay'}</p></div></div>
          {schedule.stops.map(({ stop, arrival, leave, segment, openingWarning }, index) => <div className="timeline-row" key={stop.id}><span className="timeline-marker">{index + 1}</span><div className="timeline-content"><div className="timeline-content__title"><div><small>Arrive {arrival}</small><h3>{stop.name}</h3><p><MapPin aria-hidden="true" size={12} /> {stop.location}</p></div><strong>{durationLabel(stop.stayMinutes)}</strong></div><div className="timeline-meta"><span>Leave {leave}</span><span>{segment.minutes} min · {segment.distance} km from previous</span></div>{openingWarning ? <div className="context-warning"><AlertTriangle aria-hidden="true" size={16} /><span>{openingWarning}</span></div> : null}</div></div>)}
          <div className="timeline-row timeline-row--end"><span className="timeline-marker">{finalDay ? <Route aria-hidden="true" size={17} /> : <BedDouble aria-hidden="true" size={17} />}</span><div><small>{schedule.finish}</small><h3>{finalDay ? 'Return home · Trip ends' : 'Overnight Stay'}</h3><p>{finalDay ? 'End of the finalized trip plan' : `${day.overnightType || 'Not decided yet'} · ${day.overnightLocation || 'Location not decided'}`}</p></div></div>
        </section>

        <section className="day-summary" aria-label="Day totals"><div><span>Finish</span><strong>{schedule.finish}</strong></div><div><span>Travel</span><strong>{durationLabel(schedule.totalTravelMinutes)}</strong></div><div><span>Distance</span><strong>{schedule.totalDistance} km</strong></div></section>
        <div className="detail-actions"><Button type="button" variant="secondary" onClick={onViewRoute}><Map aria-hidden="true" size={18} /> View Route</Button><Button type="button" variant="secondary" onClick={onEditDay}><Edit3 aria-hidden="true" size={18} /> Edit Day</Button></div>
        <Button type="button" fullWidth onClick={onViewRoute}><Route aria-hidden="true" size={18} /> Optimize Route</Button>
        </div>
      </div>
    </Page>
  );
}
