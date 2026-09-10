import { Camera, ImagePlus, Plus, Repeat2, Shirt } from 'lucide-react';
import { AppBar, Button, handleTabKey, Page } from '../components/ui';
import type { OutfitDayPlan, OutfitEntry } from '../types';

export function OutfitPlanningScreen({ plans, activeDayIndex, onActiveDayChange, onPlanChange, onAddOutfit, onBack, onSkip, onToast }: { plans: OutfitDayPlan[]; activeDayIndex: number; onActiveDayChange: (index: number) => void; onPlanChange: (plan: OutfitDayPlan) => void; onAddOutfit: (dayNumber: number, outfitId: string) => void; onBack: () => void; onSkip: () => void; onToast: (message: string) => void }) {
  const plan = plans[activeDayIndex];
  const clothing = [...new Set(plans.flatMap((day) => day.outfits.filter((outfit) => outfit.decision === 'added').flatMap((outfit) => outfit.items)))];
  const update = (id: string, patch: Partial<OutfitEntry>) => onPlanChange({ ...plan, outfits: plan.outfits.map((outfit) => outfit.id === id ? { ...outfit, ...patch } : outfit) });
  const attach = (id: string, file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { onToast('Choose an image file'); return; }
    if (file.size > 10 * 1024 * 1024) { onToast('Choose an image smaller than 10 MB'); return; }
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === 'string') update(id, { photoUrl: reader.result }); };
    reader.onerror = () => onToast('Could not read this photo. Please try again.');
    reader.readAsDataURL(file);
  };
  const addAnother = () => onPlanChange({ ...plan, outfits: [...plan.outfits, { id: crypto.randomUUID(), items: [...(plan.outfits[0]?.items || ['Breathable top', 'Comfortable bottoms', 'Walking shoes'])], decision: 'pending', notes: '', reuseItem: '' }] });
  return <Page className="outfit-page" labelledBy="outfit-title"><AppBar title="Outfit Planning" onBack={onBack} /><div className="outfit-body">
    <section className="outfit-heading"><span><Shirt aria-hidden="true" size={24} /></span><div><p className="eyebrow">Optional helper</p><h2 id="outfit-title">Plan enough, not extra</h2><p>Plan outfits and reuse clothing. Always optional.</p></div></section>
    <div className="day-tabs" role="tablist" aria-label="Outfit days">{plans.map((item, index) => <button id={`outfit-tab-${item.dayNumber}`} type="button" role="tab" aria-selected={index === activeDayIndex} aria-controls={`outfit-panel-${item.dayNumber}`} tabIndex={index === activeDayIndex ? 0 : -1} className={index === activeDayIndex ? 'day-tab--active' : ''} key={item.dayNumber} onClick={() => onActiveDayChange(index)} onKeyDown={(event) => handleTabKey(event, index, plans.length, onActiveDayChange)}>Day {item.dayNumber}</button>)}</div>
    <div className="day-tabpanel" id={`outfit-panel-${plan.dayNumber}`} role="tabpanel" aria-labelledby={`outfit-tab-${plan.dayNumber}`} tabIndex={0}>
      {plan.outfits.map((outfit, index) => <section className="outfit-card" key={outfit.id} aria-label={`Outfit ${index + 1}`}>
        <div className="outfit-card__heading"><div><small>Day {plan.dayNumber} · Outfit {index + 1}</small><h3>{plan.activityContext}</h3></div><span className={`outfit-status outfit-status--${outfit.decision}`}>{outfit.decision === 'added' ? 'Added' : outfit.decision === 'skipped' ? 'Skipped' : 'Suggested'}</span></div>
        <div className="outfit-suggestion"><span>Suggested outfit</span>{outfit.items.map((item) => <strong key={item}>{item}</strong>)}</div>
        {outfit.decision !== 'added' ? <div className="outfit-decision"><Button type="button" onClick={() => onAddOutfit(plan.dayNumber, outfit.id)}>Add Outfit</Button><Button type="button" variant="tertiary" onClick={() => update(outfit.id, { decision: 'skipped' })}>Skip</Button></div> : null}
        <div className="photo-actions"><label><Camera aria-hidden="true" size={17} /> Take Photo<input aria-label={`Take photo for Outfit ${index + 1}`} type="file" accept="image/*" capture="environment" onChange={(event) => attach(outfit.id, event.target.files?.[0])} /></label><label><ImagePlus aria-hidden="true" size={17} /> Upload Photo<input aria-label={`Upload photo for Outfit ${index + 1}`} type="file" accept="image/*" onChange={(event) => attach(outfit.id, event.target.files?.[0])} /></label></div>
        {outfit.photoUrl ? <img className="outfit-photo" src={outfit.photoUrl} alt={`Day ${plan.dayNumber}, Outfit ${index + 1}`} /> : null}
        <label className="outfit-field"><span>Short notes</span><textarea name={`outfit-notes-${outfit.id}`} autoComplete="off" placeholder="Example: Pack a light layer…" value={outfit.notes} onChange={(event) => update(outfit.id, { notes: event.target.value })} /></label>
        <label className="outfit-field"><span><Repeat2 aria-hidden="true" size={16} /> Reuse clothing</span><select name={`outfit-reuse-${outfit.id}`} value={outfit.reuseItem} onChange={(event) => update(outfit.id, { reuseItem: event.target.value })}><option value="">No reuse selected</option>{clothing.map((item) => <option key={item}>{item}</option>)}{outfit.reuseItem && !clothing.includes(outfit.reuseItem) ? <option>{outfit.reuseItem}</option> : null}</select></label>
        {outfit.reuseItem ? <div className="reuse-note"><Repeat2 aria-hidden="true" size={16} /><span>{outfit.reuseItem} counts once in the final clothing quantity.</span></div> : null}
      </section>)}
      <Button type="button" variant="secondary" fullWidth onClick={addAnother}><Plus size={18} aria-hidden="true" /> Add another outfit</Button>
      {clothing.length ? <section className="clothing-summary"><div className="section-heading"><h2>Final Clothing Packing</h2><span>Reuse consolidated</span></div>{clothing.map((item) => <div key={item}><span>{item}</span><strong>×1</strong></div>)}</section> : null}
    </div><Button type="button" variant="secondary" fullWidth onClick={onSkip}>Skip Outfit Planning</Button>
  </div></Page>;
}
