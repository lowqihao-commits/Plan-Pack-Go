import { Check, Minus, Plus, Sparkles, UserRound, UsersRound } from 'lucide-react';
import { AppBar, Button, Page } from '../components/ui';
import type { PackingSuggestion, PackingSuggestionDecision, PackingSuggestionType, TravelMode } from '../types';

export function PackingSuggestionsScreen({ mode, suggestions, onBack, onDecision, onType, onQuantity, onAddSelected }: { mode: TravelMode; suggestions: PackingSuggestion[]; onBack: () => void; onDecision: (id: string, decision: PackingSuggestionDecision) => void; onType: (id: string, type: PackingSuggestionType) => void; onQuantity: (id: string, quantity: number) => void; onAddSelected: () => void }) {
  const active = suggestions.filter((item) => item.decision === 'pending' || item.decision === 'selected');
  const selectedCount = suggestions.filter((item) => item.decision === 'selected').length;
  return (
    <Page className="suggestions-page" labelledBy="suggestions-title">
      <AppBar title="AI Packing Suggestions" onBack={onBack} />
      <div className="suggestions-body">
        <section className="suggestions-heading"><span className="suggestions-heading__icon"><Sparkles aria-hidden="true" size={22} /></span><div><p className="eyebrow">Itinerary-aware</p><h2 id="suggestions-title">Review before anything is added</h2><p>AI recommends, user decides.</p></div></section>
        {(['Needed', 'Possibly Useful'] as const).map((group) => {
          const groupItems = active.filter((item) => item.group === group);
          if (!groupItems.length) return null;
          return <section className="suggestion-group" key={group} aria-labelledby={`suggestion-${group.replace(' ', '-').toLowerCase()}`}><div className="suggestion-group__heading"><h2 id={`suggestion-${group.replace(' ', '-').toLowerCase()}`}>{group}</h2><span>{groupItems.length}</span></div><p>{group === 'Needed' ? 'Strong essentials and activity-related recommendations.' : 'Relevant options that may make the trip easier.'}</p><div className="suggestion-list">{groupItems.map((item) => <SuggestionCard key={item.id} item={item} mode={mode} onDecision={onDecision} onType={onType} onQuantity={onQuantity} />)}</div></section>;
        })}
        {!active.length ? <section className="packing-complete-state"><img src="/assets/mascot-packing-complete-transparent.png" width="132" height="132" alt="" /><h2>All suggestions reviewed</h2><p>Your accepted choices are in the right packing lists. Skipped items stay suppressed.</p></section> : null}
        <div className="sticky-action"><Button type="button" fullWidth disabled={!selectedCount} onClick={onAddSelected}><Check aria-hidden="true" size={18} /> Add Selected{selectedCount ? ` (${selectedCount})` : ''}</Button></div>
      </div>
    </Page>
  );
}

function SuggestionCard({ item, mode, onDecision, onType, onQuantity }: { item: PackingSuggestion; mode: TravelMode; onDecision: (id: string, decision: PackingSuggestionDecision) => void; onType: (id: string, type: PackingSuggestionType) => void; onQuantity: (id: string, quantity: number) => void }) {
  const selected = item.decision === 'selected';
  return <article className={`suggestion-card ${selected ? 'suggestion-card--selected' : ''}`}>
    <div className="suggestion-card__top"><div><h3>{item.name}</h3><span>Qty {item.quantity}{item.unit ? ` ${item.unit}` : ''}</span></div><span className={`packing-kind packing-kind--${item.group === 'Needed' ? 'needed' : 'useful'}`}>{item.group}</span></div>
    <div className="suggestion-reason"><small>Why suggested?</small><p>{item.reason}</p></div>
    {mode === 'group' ? <div className="suggestion-classification"><span>Pack as</span><div role="radiogroup" aria-label={`Packing type for ${item.name}`}><button type="button" role="radio" aria-checked={item.type === 'Personal'} className={item.type === 'Personal' ? 'is-selected' : ''} onClick={() => onType(item.id, 'Personal')}><UserRound aria-hidden="true" size={15} /> Personal</button><button type="button" role="radio" aria-checked={item.type === 'Potentially Shared'} className={item.type === 'Potentially Shared' ? 'is-selected' : ''} onClick={() => onType(item.id, 'Potentially Shared')}><UsersRound aria-hidden="true" size={15} /> Potentially Shared</button></div></div> : null}
    {mode === 'group' && item.type === 'Potentially Shared' ? <div className="shared-quantity"><span>Suggested Quantity</span><div><button type="button" onClick={() => onQuantity(item.id, Math.max(1, item.quantity - 1))} aria-label={`Decrease quantity for ${item.name}`}><Minus aria-hidden="true" size={16} /></button><strong>{item.quantity}</strong><button type="button" onClick={() => onQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`}><Plus aria-hidden="true" size={16} /></button></div></div> : null}
    <div className="suggestion-actions"><Button type="button" variant={selected ? 'secondary' : 'primary'} onClick={() => onDecision(item.id, selected ? 'pending' : 'selected')}>{selected ? 'Selected' : 'Add'}</Button><Button type="button" variant="tertiary" onClick={() => onDecision(item.id, 'skipped')}>Skip</Button></div>
  </article>;
}
