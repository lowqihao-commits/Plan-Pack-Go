import { AlertTriangle, ChevronRight, ClipboardCheck, PackageCheck, ReceiptText, Send, UserMinus, UserPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AppBar, Avatar, Button, Modal, Page } from '../components/ui';
import { activeTripMembers, formatRinggit } from '../data/supportingData';
import { countLabel } from '../lib/copy';
import type { Expense, Member, MemberStatus, SharedPackingItem, TripDraft } from '../types';

function statusClass(status: MemberStatus) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function responsibilityCount(memberId: string, items: SharedPackingItem[]) {
  return items.reduce((sum, item) => sum + item.assignments.filter((assignment) => assignment.memberId === memberId).length, 0);
}

export function GroupOverviewScreen({ draft, members, sharedItems, expenses, preferenceSummary, onBack, onInvite, onManage, onPreferences, onSharedPacking, onSharedExpenses }: { draft: TripDraft; members: Member[]; sharedItems: SharedPackingItem[]; expenses: Expense[]; preferenceSummary: string; onBack: () => void; onInvite: () => void; onManage: () => void; onPreferences: () => void; onSharedPacking: () => void; onSharedExpenses: () => void }) {
  const unresolved = sharedItems.filter((item) => item.assignments.reduce((sum, assignment) => sum + assignment.quantity, 0) < item.suggestedQuantity).length;
  const sharedTotal = expenses.filter((expense) => expense.type === 'Shared').reduce((sum, expense) => sum + expense.amount, 0);
  return <Page className="group-overview-page" labelledBy="group-overview-title">
    <AppBar title="Travel Group" onBack={onBack} />
    <div className="group-overview-body">
      <section className="group-identity-card" aria-labelledby="group-overview-title"><span className="group-identity-card__icon"><UsersRound aria-hidden="true" size={25} /></span><div><p className="eyebrow">Travel group</p><h2 id="group-overview-title">{draft.name}</h2><span>{countLabel(members.length, 'member')} · You are Admin</span></div></section>

      <section aria-labelledby="group-members-title"><div className="section-heading"><h2 id="group-members-title">Members</h2><span>{members.length}</span></div><div className="overview-member-list">{members.map((member, index) => <div className="overview-member-row" key={member.id}><Avatar initials={member.initials} label={member.name} index={index} /><div><strong>{member.name}{member.isCurrentUser ? ' (You)' : ''}</strong><small>{member.role}</small></div><span className={`member-status member-status--${statusClass(member.status)}`}>{member.status}</span></div>)}</div></section>

      <div className="group-primary-actions"><Button type="button" variant="secondary" onClick={onInvite}><UserPlus aria-hidden="true" size={17} /> Invite Member</Button><Button type="button" onClick={onManage}>Manage Members</Button></div>

      <section aria-labelledby="collaboration-title"><div className="section-heading"><h2 id="collaboration-title">Collaboration</h2><span>Quick summaries</span></div><div className="collaboration-links">
        <button type="button" onClick={onPreferences}><span><ClipboardCheck aria-hidden="true" size={19} /></span><div><strong>Group Preferences</strong><small>{preferenceSummary}</small></div><ChevronRight aria-hidden="true" size={18} /></button>
        <button type="button" onClick={onSharedPacking}><span><PackageCheck aria-hidden="true" size={19} /></span><div><strong>Shared Packing</strong><small>{unresolved ? `${unresolved} ${unresolved === 1 ? 'item' : 'items'} unassigned or uncovered` : 'All quantities covered'}</small></div><ChevronRight aria-hidden="true" size={18} /></button>
        <button type="button" onClick={onSharedExpenses}><span><ReceiptText aria-hidden="true" size={19} /></span><div><strong>Shared Expenses</strong><small>{formatRinggit(sharedTotal)} recorded</small></div><ChevronRight aria-hidden="true" size={18} /></button>
      </div></section>
    </div>
  </Page>;
}

export function ManageMembersScreen({ members, sharedItems, onBack, onInvite, onMarkJoined, onRemove, onResend, onCancelInvite, onParticipation }: { members: Member[]; sharedItems: SharedPackingItem[]; onBack: () => void; onInvite: () => void; onMarkJoined: (memberId: string) => void; onRemove: (memberId: string) => void; onResend: (member: Member) => void; onCancelInvite: (memberId: string) => void; onParticipation: (memberId: string) => void }) {
  const [removeTarget, setRemoveTarget] = useState<Member | null>(null);
  const targetResponsibilities = removeTarget ? responsibilityCount(removeTarget.id, sharedItems) : 0;
  return <Page className="manage-members-page" labelledBy="manage-members-title">
    <AppBar title="Manage Members" onBack={onBack} />
    <div className="manage-members-body"><section className="manage-heading"><div><p className="eyebrow">Admin controls</p><h2 id="manage-members-title">Keep participation current</h2><p>Update only what the group needs for this trip.</p></div><Button type="button" variant="secondary" onClick={onInvite}><UserPlus aria-hidden="true" size={17} /> Invite</Button></section>
      <div className="manage-member-list">{members.map((member, index) => {
        const responsibilities = responsibilityCount(member.id, sharedItems);
        return <article className="manage-member-card" key={member.id}><div className="manage-member-card__top"><Avatar initials={member.initials} label={member.name} index={index} /><div><h3>{member.name}{member.isCurrentUser ? ' (You)' : ''}</h3><p>{member.role} · {member.status}</p></div><span>{responsibilities} shared</span></div>{member.isCurrentUser ? <p className="admin-protection">Current Admin cannot be removed.</p> : member.status === 'Pending' ? <div className="member-card-actions"><Button type="button" onClick={() => onMarkJoined(member.id)}>Mark as Joined</Button><Button type="button" variant="secondary" onClick={() => onResend(member)}><Send aria-hidden="true" size={15} /> Resend</Button><Button type="button" variant="tertiary" onClick={() => onCancelInvite(member.id)}>Cancel Invite</Button></div> : <div className="member-card-actions"><Button type="button" variant="secondary" onClick={() => onParticipation(member.id)}>Update Participation</Button><Button type="button" variant="tertiary" onClick={() => setRemoveTarget(member)}><UserMinus aria-hidden="true" size={15} /> Remove</Button></div>}</article>;
      })}</div>
    </div>
    {removeTarget ? <Modal onClose={() => setRemoveTarget(null)} labelledBy="manage-remove-title" className="confirm-dialog" backdropClassName="modal-backdrop--centered" role="alertdialog"><span className="sheet-icon"><UserMinus aria-hidden="true" size={22} /></span><h2 id="manage-remove-title">Remove {removeTarget.name.split(' ')[0]} from this trip?</h2><p>{targetResponsibilities ? `${removeTarget.name.split(' ')[0]} is responsible for ${targetResponsibilities} shared ${targetResponsibilities === 1 ? 'item' : 'items'}. Those responsibilities will become Unassigned.` : 'They will disappear from the active trip member list.'}</p><div className="sheet-actions"><Button type="button" variant="secondary" onClick={() => setRemoveTarget(null)}>Cancel</Button><Button type="button" variant="danger" onClick={() => { onRemove(removeTarget.id); setRemoveTarget(null); }}>Remove Member</Button></div></Modal> : null}
  </Page>;
}

const participationChoices: MemberStatus[] = ['Joining', 'Not Joining Today', 'Skip Activity', 'Left Trip'];

export function UpdateParticipationScreen({ member, affectedItems, onBack, onUpdate }: { member: Member; affectedItems: SharedPackingItem[]; onBack: () => void; onUpdate: (status: MemberStatus) => void }) {
  const initial = member.status === 'Joined' || member.status === 'Pending' ? 'Joining' : member.status;
  const [selected, setSelected] = useState<MemberStatus>(initial);
  const releasesResponsibilities = selected !== 'Joining' && affectedItems.length > 0;
  return <Page className="participation-page" labelledBy="participation-title"><AppBar title="Update Participation" onBack={onBack} /><div className="participation-body"><section className="participation-person"><Avatar initials={member.initials} label={member.name} /><div><p className="eyebrow">Trip participation</p><h2 id="participation-title">{member.name}</h2><p>Choose the status that best describes this trip day.</p></div></section><div className="participation-choices" role="radiogroup" aria-label={`Participation for ${member.name}`}>{participationChoices.map((choice) => <button type="button" role="radio" aria-checked={selected === choice} className={selected === choice ? 'is-selected' : ''} key={choice} onClick={() => setSelected(choice)}><span>{choice}</span>{selected === choice ? <ClipboardCheck aria-hidden="true" size={18} /> : null}</button>)}</div>{releasesResponsibilities ? <div className="participation-warning"><AlertTriangle aria-hidden="true" size={18} /><div><strong>{member.name.split(' ')[0]} has {affectedItems.length} shared {affectedItems.length === 1 ? 'responsibility' : 'responsibilities'}.</strong><span>Updating will release them to Unassigned. You can reassign now or leave them for later.</span></div></div> : null}<div className="sticky-action"><Button type="button" fullWidth onClick={() => onUpdate(selected)}>Update Participation</Button></div></div></Page>;
}

export function ReassignSharedItemsScreen({ items, members, affectedMemberName, onBack, onLater, onReassign }: { items: SharedPackingItem[]; members: Member[]; affectedMemberName: string; onBack: () => void; onLater: () => void; onReassign: (assignments: Record<string, string>) => void }) {
  const availableMembers = useMemo(() => activeTripMembers(members), [members]);
  const [assignments, setAssignments] = useState<Record<string, string>>(() => Object.fromEntries(items.map((item) => [item.id, availableMembers[0]?.id || ''])));
  const valid = items.length > 0 && items.every((item) => assignments[item.id]);
  return <Page className="reassign-page" labelledBy="reassign-title"><AppBar title="Reassign Shared Items" onBack={onBack} /><div className="reassign-body"><section className="reassign-heading"><span><PackageCheck aria-hidden="true" size={23} /></span><div><p className="eyebrow">Shared Packing follow-up</p><h2 id="reassign-title">Cover released items</h2><p>{affectedMemberName || 'A member'} is no longer responsible. Reassign now or leave items Unassigned.</p></div></section>{items.length ? <div className="reassign-list">{items.map((item) => <article key={item.id}><div><h3>{item.name}</h3><p>Suggested quantity {item.suggestedQuantity}</p></div><label><span>New member</span><select name={`reassign-${item.id}`} value={assignments[item.id] || ''} onChange={(event) => setAssignments((current) => ({ ...current, [item.id]: event.target.value }))}>{availableMembers.map((member) => <option key={member.id} value={member.id}>{member.name}{member.isCurrentUser ? ' (You)' : ''}</option>)}</select></label></article>)}</div> : <div className="empty-state"><PackageCheck aria-hidden="true" size={24} /><h3>No items need reassignment</h3><p>Shared Packing remains covered.</p></div>}<div className="sticky-action sticky-action--split"><Button type="button" variant="secondary" onClick={onLater}>Later</Button><Button type="button" disabled={!valid} onClick={() => onReassign(assignments)}>Reassign</Button></div></div></Page>;
}
