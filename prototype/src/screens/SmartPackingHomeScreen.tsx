import { Bell, ChevronRight, ClipboardCheck, CloudRain, Luggage, RefreshCw, Shirt, Sparkles, UsersRound } from 'lucide-react';
import { AppBar, Page, ProgressBar } from '../components/ui';
import { memberPackingProgress } from '../data/packingData';
import { activeTripMembers } from '../data/supportingData';
import { countLabel } from '../lib/copy';
import type { Member, PackingDeltaState, PackingSuggestion, PersonalPackingItem, SharedPackingItem, TravelMode, TripDraft } from '../types';

interface SmartPackingHomeProps {
  draft: TripDraft;
  mode: TravelMode;
  members: Member[];
  suggestions: PackingSuggestion[];
  personalItems: PersonalPackingItem[];
  sharedItems: SharedPackingItem[];
  delta: PackingDeltaState;
  onBack: () => void;
  onSuggestions: () => void;
  onPersonal: () => void;
  onShared: () => void;
  onOutfits: () => void;
  onReminders: () => void;
  onUpdates: () => void;
}

export function SmartPackingHomeScreen({ draft, mode, members, suggestions, personalItems, sharedItems, delta, onBack, onSuggestions, onPersonal, onShared, onOutfits, onReminders, onUpdates }: SmartPackingHomeProps) {
  const packed = personalItems.filter((item) => item.packed).length;
  const total = personalItems.length;
  const progress = total ? Math.round((packed / total) * 100) : 0;
  const pending = suggestions.filter((item) => item.decision === 'pending' || item.decision === 'selected').length;
  const unresolved = sharedItems.filter((item) => item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0) < item.suggestedQuantity).length;
  const joinedMembers = activeTripMembers(members);
  const planStatus = !delta.reviewed || pending || (mode === 'group' && unresolved) ? 'Review needed' : 'Up to date';

  return (
    <Page className="packing-home-page" labelledBy="packing-home-title">
      <AppBar title="Smart Packing" onBack={onBack} />
      <div className="packing-home-body">
        <section className="packing-hero" aria-labelledby="packing-home-title">
          <div><p className="eyebrow">{draft.name}</p><h2 id="packing-home-title">Pack from your actual plan</h2><p>Your itinerary, activities and weather shape these recommendations. You choose what is added.</p></div>
          <img src="/assets/mascot-map-transparent.png" width="92" height="92" alt="" />
          <div className="analysis-basis"><span><Luggage aria-hidden="true" size={15} /> {countLabel(personalItems.length, 'checklist item')}</span><span><CloudRain aria-hidden="true" size={15} /> Rain considered</span><span>Plan status · {planStatus}</span></div>
        </section>

        <section className="packing-progress-card" aria-label="Overall packing progress">
          <div><span>Overall Packing Progress</span><strong>{progress}%</strong></div>
          <ProgressBar value={progress} label={`${packed} of ${total} personal items packed`} />
          <p>{packed} / {total} packed · {total - packed} Unchecked</p>
        </section>

        <section aria-labelledby="packing-sections-title">
          <div className="section-heading"><h2 id="packing-sections-title">Packing Plan</h2><span>Updated now</span></div>
          <div className={`packing-module-grid packing-module-grid--${mode}`}>
            <button className="packing-module packing-module--ai" type="button" onClick={onSuggestions}><span className="packing-module__icon"><Sparkles aria-hidden="true" size={22} /></span><span><strong>AI Suggestions</strong><small>{pending ? `${pending} waiting for review` : 'All suggestions reviewed'}</small></span><ChevronRight aria-hidden="true" size={18} /></button>
            <button className="packing-module" type="button" onClick={onPersonal}><span className="packing-module__icon"><ClipboardCheck aria-hidden="true" size={22} /></span><span><strong>Personal Packing</strong><small>Private checklist · {packed}/{total}</small></span><ChevronRight aria-hidden="true" size={18} /></button>
            {mode === 'group' ? <button className="packing-module packing-module--shared" type="button" onClick={onShared}><span className="packing-module__icon"><UsersRound aria-hidden="true" size={22} /></span><span><strong>Shared Packing</strong><small>{unresolved ? `${unresolved} unresolved` : 'Coverage complete'}</small></span><ChevronRight aria-hidden="true" size={18} /></button> : null}
            <button className="packing-module" type="button" onClick={onOutfits}><span className="packing-module__icon"><Shirt aria-hidden="true" size={22} /></span><span><strong>Outfit Planning</strong><small>Optional day-by-day helper</small></span><ChevronRight aria-hidden="true" size={18} /></button>
          </div>
        </section>

        {!delta.reviewed ? <button className="packing-update-card" type="button" onClick={onUpdates}><span><RefreshCw aria-hidden="true" size={19} /></span><div><strong>Review Updates</strong><small>Itinerary updated — 2 packing changes to review.</small></div><ChevronRight aria-hidden="true" size={18} /></button> : null}

        {mode === 'group' ? <section className="group-progress-card" aria-labelledby="group-progress-title"><div className="section-heading"><h2 id="group-progress-title">Group Packing Progress</h2><span>Personal details stay private</span></div><div className="group-progress-list">{joinedMembers.map((member, index) => {
          const fallback = memberPackingProgress[member.id] || { packed: Math.max(2, 8 - index), total: 10 };
          const memberPacked = member.isCurrentUser ? packed : fallback.packed;
          const memberTotal = member.isCurrentUser ? total : fallback.total;
          const memberPercent = memberTotal ? Math.round((memberPacked / memberTotal) * 100) : 0;
          return <div className="group-progress-row" key={member.id}><span className={`avatar avatar--${(index % 4) + 1}`} aria-hidden="true">{member.initials}</span><div><strong>{member.name}{member.isCurrentUser ? ' (You)' : ''}</strong><ProgressBar value={memberPercent} label={`${member.name} packing progress`} /></div><span><strong>{memberPercent}%</strong><small>{memberPacked} / {memberTotal}</small></span></div>;
        })}</div><p>Only packed counts and percentages are shared. Personal item names remain private.</p></section> : null}

        <button className="settings-row" type="button" onClick={onReminders}><span><Bell aria-hidden="true" size={19} /></span><div><strong>Packing Reminder Settings</strong><small>3 days, 1 day and departure milestones</small></div><ChevronRight aria-hidden="true" size={18} /></button>
      </div>
    </Page>
  );
}
