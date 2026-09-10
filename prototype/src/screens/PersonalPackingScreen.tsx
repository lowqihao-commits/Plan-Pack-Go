import { Lock, Minus, Plus, Shirt, Trash2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { AppBar, Button, Modal, Page, ProgressBar } from '../components/ui';
import type { OutfitDayPlan, PackingCategory, PersonalPackingItem, TravelMode } from '../types';

const categories: PackingCategory[] = ['Essentials', 'Clothing', 'Toiletries', 'Electronics', 'Activity Gear', 'Other'];

export function PersonalPackingScreen({ mode, items, outfitPlans, onBack, onToggle, onQuantity, onRemove, onAdd, onOutfit }: { mode: TravelMode; items: PersonalPackingItem[]; outfitPlans: OutfitDayPlan[]; onBack: () => void; onToggle: (id: string) => void; onQuantity: (id: string, quantity: number) => void; onRemove: (id: string) => void; onAdd: (name: string, category: PackingCategory, quantity: number) => void; onOutfit: () => void }) {
  const [addOpen, setAddOpen] = useState(false);
  const packed = items.filter((item) => item.packed).length;
  const total = items.length;
  const progress = total ? Math.round((packed / total) * 100) : 0;
  return (
    <Page className="personal-packing-page" labelledBy="personal-packing-title">
      <AppBar title="Personal Packing" onBack={onBack} />
      <div className="personal-packing-body">
        <section className="checklist-progress" aria-labelledby="personal-packing-title"><div><div><p className="eyebrow">Your private checklist</p><h2 id="personal-packing-title">{packed} / {total} packed</h2></div><strong>{progress}%</strong></div><ProgressBar value={progress} label="Personal packing progress" /><p>{total - packed} Unchecked · Change packed status anytime.</p></section>
        {mode === 'group' ? <div className="privacy-note"><Lock aria-hidden="true" size={16} /><span>Your items stay private. The group sees only your progress.</span></div> : null}

        <div className="checklist-categories">{categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          if (!categoryItems.length) return null;
          return <section className="checklist-category" key={category} aria-labelledby={`category-${category.replace(' ', '-').toLowerCase()}`}><div className="section-heading"><h2 id={`category-${category.replace(' ', '-').toLowerCase()}`}>{category}</h2><span>{categoryItems.filter((item) => item.packed).length}/{categoryItems.length}</span></div><div className="checklist-items">{categoryItems.map((item) => <PersonalItemRow key={item.id} item={item} onToggle={onToggle} onQuantity={onQuantity} onRemove={onRemove} />)}</div></section>;
        })}</div>
        {!items.length ? <div className="empty-state"><h3>Your checklist is empty</h3><p>Add an AI suggestion or create a custom item.</p></div> : null}
        <Button type="button" variant="secondary" fullWidth onClick={() => setAddOpen(true)}><Plus aria-hidden="true" size={18} /> Add Custom Item</Button>
        <button className="settings-row outfit-entry" type="button" onClick={onOutfit}><span><Shirt aria-hidden="true" size={19} /></span><div><strong>Outfit Planning</strong><small>Optional help for clothing quantities and reuse</small></div></button>
        {outfitPlans.some((day) => day.outfits.some((outfit) => outfit.decision === 'added' || outfit.photoUrl)) ? <section className="planned-outfits" aria-label="Your private planned outfits"><h2>Planned Outfits</h2><p>Your outfit references stay private.</p>{outfitPlans.flatMap((day) => day.outfits.map((outfit, index) => outfit.decision === 'added' || outfit.photoUrl ? <article className="planned-outfit" key={outfit.id}><h3>Day {day.dayNumber} · Outfit {index + 1}</h3>{outfit.photoUrl ? <img className="outfit-photo" src={outfit.photoUrl} alt={`Day ${day.dayNumber}, Outfit ${index + 1}`} /> : null}<p>{outfit.items.join(' · ')}</p>{outfit.notes ? <p>{outfit.notes}</p> : null}</article> : null))}</section> : null}
      </div>
      {addOpen ? <AddCustomItemSheet onClose={() => setAddOpen(false)} onAdd={(name, category, quantity) => { onAdd(name, category, quantity); setAddOpen(false); }} /> : null}
    </Page>
  );
}

function PersonalItemRow({ item, onToggle, onQuantity, onRemove }: { item: PersonalPackingItem; onToggle: (id: string) => void; onQuantity: (id: string, quantity: number) => void; onRemove: (id: string) => void }) {
  return <article className={`checklist-item ${item.packed ? 'checklist-item--packed' : ''}`}><label className="checklist-item__main"><input type="checkbox" name={`packed-${item.id}`} checked={item.packed} onChange={() => onToggle(item.id)} /><span className="checkmark-box"><span aria-hidden="true">✓</span></span><span><strong>{item.name}</strong><small>{item.packed ? 'Packed' : 'Unchecked'}{item.reason ? ` · ${item.reason}` : ''}</small></span></label><div className="checklist-item__controls"><button type="button" onClick={() => onQuantity(item.id, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1} aria-label={`Decrease quantity for ${item.name}`}><Minus aria-hidden="true" size={15} /></button><strong>{item.quantity}</strong><button type="button" onClick={() => onQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`}><Plus aria-hidden="true" size={15} /></button><button className="remove-item-button" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}><Trash2 aria-hidden="true" size={16} /></button></div></article>;
}

function AddCustomItemSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (name: string, category: PackingCategory, quantity: number) => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<PackingCategory>('Other');
  const [quantity, setQuantity] = useState(1);
  const submit = (event: FormEvent) => { event.preventDefault(); if (name.trim()) onAdd(name.trim(), category, quantity); };
  return <Modal className="bottom-sheet" labelledBy="custom-item-title" onClose={onClose} closeOnBackdrop><div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close custom item"><X aria-hidden="true" size={20} /></button><p className="eyebrow">Personal checklist</p><h2 id="custom-item-title">Add Custom Item</h2><form className="custom-item-form" onSubmit={submit}><label><span>Item name</span><input name="customPackingItem" autoComplete="off" placeholder="Example: Sleep mask…" value={name} onChange={(event) => setName(event.target.value)} /></label><label><span>Category</span><select name="customPackingCategory" value={category} onChange={(event) => setCategory(event.target.value as PackingCategory)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Quantity</span><input type="number" inputMode="numeric" name="customPackingQuantity" min="1" max="20" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} /></label><div className="sheet-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" disabled={!name.trim()}>Add Item</Button></div></form></Modal>;
}
