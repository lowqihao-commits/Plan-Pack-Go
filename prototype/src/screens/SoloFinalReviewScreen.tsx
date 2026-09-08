import { useMemo } from 'react';
import { CalendarDays, Check } from 'lucide-react';
import { AppBar, Button, Page } from '../components/ui';
import { pluralize } from '../lib/copy';
import { formatDate, getTripLength } from '../lib/date';
import type { Place, TripDraft } from '../types';

interface SoloFinalReviewScreenProps {
  draft: TripDraft;
  places: Place[];
  selectedIds: string[];
  confirmed: boolean;
  onSelectedIdsChange: (ids: string[]) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export function SoloFinalReviewScreen({ draft, places, selectedIds, confirmed, onSelectedIdsChange, onBack, onConfirm }: SoloFinalReviewScreenProps) {
  const groupedPlaces = useMemo(() => places.reduce<Record<string, Place[]>>((groups, place) => ({
    ...groups,
    [place.location]: [...(groups[place.location] || []), place],
  }), {}), [places]);
  const tripLength = getTripLength(draft.startDate, draft.endDate);
  const togglePlace = (id: string) => onSelectedIdsChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);

  return (
    <Page className="flow-page final-review-page solo-final-review-page" labelledBy="solo-final-title">
      <AppBar title="Final Review" onBack={onBack} />
      <div className="flow-body">
        <section className="review-summary" aria-label="Trip summary">
          <div><span className="mode-badge mode-badge--solo">Solo</span><h2>{draft.name || 'New Trip'}</h2></div>
          <div className="review-summary__details"><span><CalendarDays aria-hidden="true" size={16} /> {formatDate(draft.startDate, true)} – {formatDate(draft.endDate)}</span>{tripLength?.valid ? <span>{tripLength.days} {pluralize(tripLength.days, 'day')} · {tripLength.nights} {pluralize(tripLength.nights, 'night')}</span> : null}</div>
        </section>

        <div className="final-review-heading">
          <div><h2 id="solo-final-title">Choose your final places</h2><p>Include the places you want available when planning each day.</p></div>
          <span className="selected-count">{selectedIds.length} selected</span>
        </div>

        <div className="solo-city-list">
          {Object.entries(groupedPlaces).map(([location, locationPlaces]) => (
            <section className="solo-city-group" key={location} aria-labelledby={`solo-city-${location.replace(/\s+/g, '-').toLowerCase()}`}>
              <h3 id={`solo-city-${location.replace(/\s+/g, '-').toLowerCase()}`}>{location}</h3>
              <div className="solo-place-list">
                {locationPlaces.map((place) => {
                  const selected = selectedIds.includes(place.id);
                  return (
                    <label className={`solo-review-place ${selected ? 'solo-review-place--selected' : ''}`} key={place.id}>
                      <input type="checkbox" checked={selected} disabled={confirmed} onChange={() => togglePlace(place.id)} />
                      <span className="solo-review-place__check" aria-hidden="true">{selected ? <Check size={17} /> : null}</span>
                      <span><strong>{place.name}</strong><small>{selected ? 'Included' : 'Excluded'}</small></span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="flow-spacer" />
        <div className="bottom-actions"><Button type="button" fullWidth disabled={selectedIds.length === 0 || confirmed} onClick={onConfirm}>{confirmed ? 'Final Places Confirmed' : 'Confirm Final Places'}</Button></div>
      </div>
    </Page>
  );
}
