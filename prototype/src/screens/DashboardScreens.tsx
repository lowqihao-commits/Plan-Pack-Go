import { AlertTriangle, CalendarDays, CloudRain, Luggage, Map, Sparkles, UsersRound, WalletCards } from 'lucide-react';
import { AppBar, Page } from '../components/ui';
import { countLabel, pluralize } from '../lib/copy';
import { formatDate, getTripLength } from '../lib/date';
import type { AdjustmentKind, Member, TravelMode, TripDraft, TripStatus } from '../types';

interface DashboardScreenProps {
  draft: TripDraft;
  mode: TravelMode;
  status: TripStatus;
  members: Member[];
  suggestionCount: number;
  unresolvedSharedCount: number;
  onBack: () => void;
  onItinerary: () => void;
  onSmartPacking: () => void;
  onBudget: () => void;
  onGroup: () => void;
  onAdjustment: (kind: AdjustmentKind) => void;
}

export function DashboardScreen({ draft, mode, status, members, suggestionCount, unresolvedSharedCount, onBack, onItinerary, onSmartPacking, onBudget, onGroup, onAdjustment }: DashboardScreenProps) {
  const length = getTripLength(draft.startDate, draft.endDate);
  const modeLabel = mode === 'group' ? `Group · ${countLabel(members.length, 'member')}` : 'Solo';
  return (
    <Page className="dashboard-page" labelledBy="dashboard-title">
      <AppBar title={draft.name || 'Trip Dashboard'} onBack={onBack} />
      <div className="dashboard-body">
        <section className="trip-summary-card" aria-labelledby="dashboard-title">
          <div className="trip-summary-card__top"><span className="trip-status-label">{status}</span><span className="trip-mode-label">{mode === 'group' ? <UsersRound aria-hidden="true" size={15} /> : null}{modeLabel}</span></div>
          <h2 id="dashboard-title">{draft.name}</h2>
          <p><CalendarDays aria-hidden="true" size={16} /> {formatDate(draft.startDate, true)} – {formatDate(draft.endDate)}</p>
          {length?.valid ? <strong>{length.days} {pluralize(length.days, 'day')} · {length.nights} {pluralize(length.nights, 'night')}</strong> : null}
        </section>

        <section aria-labelledby="modules-title">
          <div className="section-heading"><h2 id="modules-title">Your Trip</h2><span>Choose a module</span></div>
          <div className={`module-grid module-grid--${mode}`}>
            <button className="module-card" type="button" onClick={onItinerary}><span className="module-card__icon"><Map aria-hidden="true" size={22} /></span><span><strong>Itinerary</strong><small>Review your day plans</small></span></button>
            <button className="module-card module-card--packing" type="button" onClick={onSmartPacking}><span className="module-card__icon"><Luggage aria-hidden="true" size={23} /></span><span><strong>Smart Packing</strong><small>{suggestionCount ? `${countLabel(suggestionCount, 'suggestion')} to review` : 'Packing plan ready'}</small></span><Sparkles className="module-card__spark" aria-hidden="true" size={16} /></button>
            <button className="module-card" type="button" onClick={onBudget}><span className="module-card__icon"><WalletCards aria-hidden="true" size={22} /></span><span><strong>Budget</strong><small>Recorded trip costs</small></span></button>
            {mode === 'group' ? <button className="module-card" type="button" onClick={onGroup}><span className="module-card__icon"><UsersRound aria-hidden="true" size={22} /></span><span><strong>Group</strong><small>Members and collaboration</small></span></button> : null}
          </div>
        </section>

        <section className="trip-updates" aria-labelledby="trip-updates-title">
          <div className="section-heading"><h2 id="trip-updates-title">Trip Updates</h2><span>{2 + (mode === 'group' && unresolvedSharedCount ? 1 : 0)}</span></div>
          <button className="trip-update-row trip-update-row--action" type="button" onClick={() => onAdjustment('weather')}><span><CloudRain aria-hidden="true" size={18} /></span><div><strong>Review weather impact</strong><small>Review affected outdoor activities.</small></div></button>
          {suggestionCount ? <div className="trip-update-row"><span><Sparkles aria-hidden="true" size={18} /></span><div><strong>{countLabel(suggestionCount, 'packing suggestion')} {suggestionCount === 1 ? 'is' : 'are'} waiting</strong><small>Nothing is added until you approve it.</small></div></div> : <div className="trip-update-row"><span><Sparkles aria-hidden="true" size={18} /></span><div><strong>No packing issues detected</strong><small>Your reviewed choices are preserved.</small></div></div>}
          {mode === 'group' && unresolvedSharedCount ? <div className="trip-update-row trip-update-row--warning"><span><AlertTriangle aria-hidden="true" size={18} /></span><div><strong>{unresolvedSharedCount} shared {unresolvedSharedCount === 1 ? 'item is' : 'items are'} unresolved</strong><small>Claim or assign responsibility before departure.</small></div></div> : null}
        </section>
      </div>
    </Page>
  );
}
