import { AlertTriangle, Check, Minus, Plus, UserPlus, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { AppBar, Avatar, Button, Modal, Page } from '../components/ui';
import { activeTripMembers } from '../data/supportingData';
import type { Member, SharedPackingItem } from '../types';

function quantities(item: SharedPackingItem) {
  const covered = item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0);
  const packed = item.assignments.filter((assignment) => assignment.packed).reduce((sum, assignment) => sum + assignment.quantity, 0);
  return { covered, packed };
}

function itemState(item: SharedPackingItem): 'Unassigned' | 'Assigned' | 'Claimed' | 'Packed' {
  const { covered, packed } = quantities(item);
  if (!item.assignments.length) return 'Unassigned';
  if (covered > 0 && packed >= covered) return 'Packed';
  if (item.assignments.some((assignment) => assignment.method === 'Claimed')) return 'Claimed';
  return 'Assigned';
}

export function SharedPackingScreen({ items, members, onBack, onClaim, onAssign, onMarkPacked, onAdd }: { items: SharedPackingItem[]; members: Member[]; onBack: () => void; onClaim: (itemId: string) => void; onAssign: (itemId: string, memberId: string) => void; onMarkPacked: (itemId: string) => void; onAdd: (name: string, quantity: number) => void }) {
  const [assignItemId, setAssignItemId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const joinedMembers = activeTripMembers(members);
  const unresolved = items.filter((item) => quantities(item).covered < item.suggestedQuantity).length;
  return <Page className="shared-packing-page" labelledBy="shared-packing-title"><AppBar title="Shared Packing" onBack={onBack} /><div className="shared-packing-body">
    <section className="shared-heading"><div><p className="eyebrow">Group packing</p><h2 id="shared-packing-title">Coordinate what the group brings</h2><p>Claim an item or let the Admin assign it. Extras stay visible and are never removed automatically.</p></div>{unresolved ? <img src="/assets/mascot-warning-transparent.png" width="84" height="84" alt="" /> : null}</section>
    {unresolved ? <div className="shared-alert" role="status"><AlertTriangle aria-hidden="true" size={17} /><span>{unresolved} shared {unresolved === 1 ? 'item needs' : 'items need'} more coverage.</span></div> : null}
    <div className="shared-item-list">{items.map((item) => <SharedItemCard key={item.id} item={item} members={members} onClaim={onClaim} onAssign={() => setAssignItemId(item.id)} onMarkPacked={onMarkPacked} />)}</div>
    <Button type="button" variant="secondary" fullWidth onClick={() => setAddOpen(true)}><Plus aria-hidden="true" size={18} /> Add Shared Item</Button>
  </div>{assignItemId ? <AssignMemberSheet item={items.find((item) => item.id === assignItemId)!} members={joinedMembers} onClose={() => setAssignItemId(null)} onAssign={(memberId) => { onAssign(assignItemId, memberId); setAssignItemId(null); }} /> : null}{addOpen ? <AddSharedItemSheet items={items} members={members} onClose={() => setAddOpen(false)} onAdd={(name, quantity) => { onAdd(name, quantity); setAddOpen(false); }} /> : null}</Page>;
}

function SharedItemCard({ item, members, onClaim, onAssign, onMarkPacked }: { item: SharedPackingItem; members: Member[]; onClaim: (itemId: string) => void; onAssign: () => void; onMarkPacked: (itemId: string) => void }) {
  const { covered, packed } = quantities(item);
  const state = itemState(item);
  const shortage = Math.max(0, item.suggestedQuantity - covered);
  const extra = Math.max(0, covered - item.suggestedQuantity);
  const currentAssigned = item.assignments.some((assignment) => assignment.memberId === 'alex');
  return <article className={`shared-item shared-item--${state.toLowerCase()}`}><div className="shared-item__top"><div><h3>{item.name}</h3>{item.reason ? <p>{item.reason}</p> : null}</div><span className="shared-state">{state}</span></div><div className="coverage-grid"><span><small>Suggested</small><strong>{item.suggestedQuantity}</strong></span><span><small>Covered</small><strong>{covered}</strong></span><span><small>Packed</small><strong>{packed}</strong></span></div>{shortage ? <div className="coverage-message coverage-message--warning"><AlertTriangle aria-hidden="true" size={15} /><strong>{shortage} more recommended</strong></div> : extra ? <div className="coverage-message"><Plus aria-hidden="true" size={15} /><strong>{extra} extra</strong></div> : <div className="coverage-message"><Check aria-hidden="true" size={15} /><strong>Quantity covered</strong></div>}<div className="assignee-list">{item.assignments.length ? item.assignments.map((assignment, index) => {
    const member = members.find((candidate) => candidate.id === assignment.memberId);
    if (!member) return null;
    return <span key={assignment.memberId}><Avatar initials={member.initials} label={member.name} index={index} /><small>{member.name.split(' ')[0]} · {assignment.quantity}{assignment.packed ? ' packed' : ''}</small></span>;
  }) : <span className="unassigned-copy">No member assigned</span>}</div><div className="shared-actions"><Button type="button" variant="secondary" disabled={currentAssigned || covered >= item.suggestedQuantity} onClick={() => onClaim(item.id)}>{currentAssigned ? 'Claimed by You' : 'Claim'}</Button><Button type="button" variant="secondary" onClick={onAssign}><UserPlus aria-hidden="true" size={16} /> Assign</Button><Button type="button" disabled={!item.assignments.length || packed >= covered} onClick={() => onMarkPacked(item.id)}>Mark Packed</Button></div></article>;
}

function AssignMemberSheet({ item, members, onClose, onAssign }: { item: SharedPackingItem; members: Member[]; onClose: () => void; onAssign: (memberId: string) => void }) {
  return <Modal className="bottom-sheet" labelledBy="assign-member-title" onClose={onClose} closeOnBackdrop><div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close member assignment"><X aria-hidden="true" size={20} /></button><p className="eyebrow">Admin assignment</p><h2 id="assign-member-title">Assign {item.name}</h2><p>Choose a joined member. This adds one covered quantity.</p><div className="assign-member-list">{members.map((member, index) => <button type="button" key={member.id} onClick={() => onAssign(member.id)}><Avatar initials={member.initials} label={member.name} index={index} /><span><strong>{member.name}{member.isCurrentUser ? ' (You)' : ''}</strong><small>Joined</small></span><UserPlus aria-hidden="true" size={17} /></button>)}</div><Button type="button" variant="secondary" fullWidth onClick={onClose}>Cancel</Button></Modal>;
}

function AddSharedItemSheet({ items, members, onClose, onAdd }: { items: SharedPackingItem[]; members: Member[]; onClose: () => void; onAdd: (name: string, quantity: number) => void }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [duplicate, setDuplicate] = useState<SharedPackingItem | null>(null);
  const submit = (event: FormEvent) => { event.preventDefault(); const match = items.find((item) => item.name.toLowerCase() === name.trim().toLowerCase()); if (match) setDuplicate(match); else if (name.trim()) onAdd(name.trim(), quantity); };
  const duplicateOwner = duplicate?.assignments.length ? members.find((member) => member.id === duplicate.assignments[0].memberId)?.name.split(' ')[0] : null;
  return <Modal className="bottom-sheet" labelledBy="add-shared-title" onClose={onClose}><div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={onClose} aria-label="Close shared item form"><X aria-hidden="true" size={20} /></button><p className="eyebrow">Group packing</p><h2 id="add-shared-title">Add Shared Item</h2>{duplicate ? <div className="duplicate-warning"><AlertTriangle aria-hidden="true" size={17} /><div><strong>{duplicate.name} is already {duplicateOwner ? `covered by ${duplicateOwner}` : 'on the shared list'}.</strong><span>You may still add another if the group wants an extra.</span></div></div> : null}<form className="custom-item-form" onSubmit={submit}><label><span>Item name</span><input name="sharedItemName" autoComplete="off" placeholder="Example: Hair dryer…" value={name} onChange={(event) => { setName(event.target.value); setDuplicate(null); }} /></label><label><span>Suggested Quantity</span><div className="form-quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease suggested quantity"><Minus aria-hidden="true" size={16} /></button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase suggested quantity"><Plus aria-hidden="true" size={16} /></button></div></label><div className="sheet-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>{duplicate ? <Button type="button" onClick={() => onAdd(name.trim(), quantity)}>Add Another Anyway</Button> : <Button type="submit" disabled={!name.trim()}>Add Item</Button>}</div></form></Modal>;
}
