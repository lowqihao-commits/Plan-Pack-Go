import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, Check, ChevronDown, Clock3, Copy, Link2, MapPin, Plus, Search, Send, UserMinus, UserRound, UsersRound, X } from 'lucide-react';
import { AppBar, Avatar, BrandMark, Button, Modal, Page, TextField } from '../components/ui';
import { countLabel, pluralize } from '../lib/copy';
import { formatDate, getTripLength, toIsoDate } from '../lib/date';
import type { InviteActivity, Member, ProfileState, TravelMode, TripDraft, TripSummary } from '../types';

const statusOrder: Record<TripSummary['status'], number> = { Ongoing: 0, Upcoming: 1, Past: 2 };

export function MyTripsScreen({ profile, trips, onAddTrip, onOpenTrip, onProfile }: { profile: ProfileState; trips: TripSummary[]; onAddTrip: () => void; onOpenTrip: (trip: TripSummary) => void; onProfile: () => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const visibleTrips = useMemo(() => [...trips]
    .filter((trip) => (filter === 'All' || trip.status === filter) && trip.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((first, second) => statusOrder[first.status] - statusOrder[second.status]
      || (first.status === 'Past' ? second.endDate.localeCompare(first.endDate) : first.startDate.localeCompare(second.startDate))), [filter, query, trips]);

  return (
    <Page className="content-page trips-page" labelledBy="trips-title">
      <header className="home-bar"><BrandMark compact /><button className={`avatar avatar--${(profile.avatarVariant % 4) + 1} profile-avatar`} type="button" onClick={onProfile} aria-label={`Open ${profile.name} profile`}>{profile.initials}</button></header>
      <section className="welcome-row"><p className="eyebrow">Welcome back, {profile.name.split(' ')[0]}</p><h1 id="trips-title">Where to next?</h1></section>
      <button className="new-trip-card" type="button" onClick={onAddTrip}>
        <span className="new-trip-card__icon"><Plus aria-hidden="true" size={24} /></span>
        <span><strong>Add New Trip</strong><small>Name it, then plan your trip</small></span>
      </button>
      <section className="trip-section" aria-labelledby="existing-trips-title">
        <div className="section-heading"><h2 id="existing-trips-title">My Trips</h2><span>{countLabel(visibleTrips.length, 'trip')}</span></div>
        <div className="trip-tools">
          <label className="search-control"><span className="visually-hidden">Search trips</span><Search aria-hidden="true" size={18} /><input name="tripSearch" type="search" autoComplete="off" placeholder="Search trips…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label className="filter-control"><span className="visually-hidden">Filter trips by status</span><select name="tripStatus" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Ongoing</option><option>Upcoming</option><option>Past</option></select><ChevronDown aria-hidden="true" size={16} /></label>
        </div>
        <div className="trip-list">
          {visibleTrips.map((trip) => (
            <button className="trip-card" type="button" key={trip.id} onClick={() => onOpenTrip(trip)}>
              <div className="trip-card__topline"><span className={`status status--${trip.status.toLowerCase()}`}>{trip.status}</span><span className="trip-type">{trip.mode === 'group' ? <UsersRound aria-hidden="true" size={15} /> : <UserRound aria-hidden="true" size={15} />}{trip.mode === 'group' ? `Group · ${countLabel(trip.memberCount || 0, 'member')}` : 'Solo'}</span></div>
              <h3>{trip.name}</h3>
              <p><CalendarDays aria-hidden="true" size={16} /> {formatDate(trip.startDate, true)} – {formatDate(trip.endDate)}</p>
              {trip.progressLabel ? <small className="trip-card__progress">{trip.progressLabel}</small> : null}
            </button>
          ))}
          {visibleTrips.length === 0 ? <div className="empty-state"><Search aria-hidden="true" size={24} /><h3>No matching trips</h3><p>Try a different name or clear the status filter.</p><Button type="button" variant="secondary" onClick={() => { setQuery(''); setFilter('All'); }}>Clear search</Button></div> : null}
        </div>
      </section>
    </Page>
  );
}

export function TripNameScreen({ draft, onChange, onBack, onContinue }: { draft: TripDraft; onChange: (value: string) => void; onBack: () => void; onContinue: () => void }) {
  const submit = (event: FormEvent) => { event.preventDefault(); if (draft.name.trim()) onContinue(); };
  return (
    <Page className="flow-page" labelledBy="trip-name-title">
      <AppBar title="Create a Trip" meta="1 of 3" onBack={onBack} />
      <form className="flow-body" onSubmit={submit}>
        <section className="flow-heading"><span className="flow-icon"><MapPin aria-hidden="true" size={24} /></span><h2 id="trip-name-title">Give your trip a name</h2><p>Use something you will recognise at a glance.</p></section>
        <TextField id="trip-name" name="tripName" label="Trip name" autoComplete="off" placeholder="Penang Weekend" value={draft.name} onChange={(event) => onChange(event.target.value)} />
        <div className="flow-spacer" /><div className="bottom-actions"><Button type="submit" fullWidth disabled={!draft.name.trim()}>Continue</Button></div>
      </form>
    </Page>
  );
}

export function TripTypeScreen({ selected, onSelect, onBack, onContinue }: { selected: TravelMode | null; onSelect: (mode: TravelMode) => void; onBack: () => void; onContinue: () => void }) {
  return (
    <Page className="flow-page" labelledBy="trip-type-title">
      <AppBar title="Create a Trip" meta="2 of 3" onBack={onBack} />
      <div className="flow-body">
        <section className="flow-heading"><h2 id="trip-type-title">Who is travelling?</h2></section>
        <div className="choice-list" role="radiogroup" aria-label="Trip type">
          <button className={`choice-card ${selected === 'solo' ? 'choice-card--selected' : ''}`} type="button" role="radio" aria-checked={selected === 'solo'} onClick={() => onSelect('solo')}><span className="choice-card__icon"><UserRound aria-hidden="true" size={27} /></span><span className="choice-card__copy"><strong>Solo Travel</strong><small>Plan and pack just for yourself.</small></span><span className="choice-card__check">{selected === 'solo' ? <Check aria-hidden="true" size={17} /> : null}</span></button>
          <button className={`choice-card ${selected === 'group' ? 'choice-card--selected' : ''}`} type="button" role="radio" aria-checked={selected === 'group'} onClick={() => onSelect('group')}><span className="choice-card__icon choice-card__icon--group"><UsersRound aria-hidden="true" size={27} /></span><span className="choice-card__copy"><strong>Group Travel</strong><small>Plan together and share responsibilities.</small></span><span className="choice-card__check">{selected === 'group' ? <Check aria-hidden="true" size={17} /> : null}</span></button>
        </div>
        <div className="flow-spacer" /><div className="bottom-actions"><Button type="button" fullWidth disabled={!selected} onClick={onContinue}>Continue</Button></div>
      </div>
    </Page>
  );
}

export function GroupInviteScreen({ members, context, inviteActivity, onInviteActivityChange, onMembersChange, onMarkJoined, onRemoveMember, onBack, onContinue, onToast }: { members: Member[]; context: 'creation' | 'management'; inviteActivity: InviteActivity; onInviteActivityChange: (activity: InviteActivity) => void; onMembersChange: (members: Member[]) => void; onMarkJoined: (memberId: string) => void; onRemoveMember: (memberId: string) => void; onBack: () => void; onContinue: () => void; onToast: (message: string) => void }) {
  const inviteLink = 'planpackgo.app/join/ABC123';
  const [shareOpen, setShareOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Member | null>(null);

  const copyInvite = async () => {
    try { await navigator.clipboard.writeText(`https://${inviteLink}`); }
    catch { /* The visible link remains selectable when clipboard access is unavailable. */ }
    onInviteActivityChange({ ...inviteActivity, copied: true });
    onToast('Invite link copied');
  };
  const sendInvite = () => {
    if (!members.some((member) => member.id === 'sarah')) onMembersChange([...members, { id: 'sarah', name: 'Sarah Lim', initials: 'SL', role: 'Member', status: 'Pending' }]);
    onInviteActivityChange({ ...inviteActivity, sent: true });
    setShareOpen(false);
    onToast('Invite link sent — Sarah is pending');
  };

  return (
    <Page className="flow-page" labelledBy="invite-title">
      <AppBar title="Invite Members" meta="Group Trip" onBack={onBack} />
      <div className="flow-body">
        <section className="flow-heading flow-heading--tight"><h2 id="invite-title">Invite Members</h2><p>Share the link. Members can join while you plan.</p></section>
        <section className="invite-card" aria-labelledby="invite-link-title">
          <div className="card-title-row"><span className="mini-icon"><Link2 aria-hidden="true" size={18} /></span><h3 id="invite-link-title">Invite link</h3></div>
          <div className="copy-row"><input name="inviteLink" aria-label="Invite link" value={inviteLink} readOnly /></div>
          <div className="invite-actions"><Button type="button" variant="secondary" onClick={() => setShareOpen(true)}><Send aria-hidden="true" size={17} /> Send Invite Link</Button><Button type="button" variant="secondary" onClick={copyInvite}><Copy aria-hidden="true" size={17} /> Copy Link</Button></div>
          {inviteActivity.sent || inviteActivity.copied ? <p className="invite-activity" role="status">{inviteActivity.sent ? 'Invite link sent' : 'Invite link copied'}</p> : null}
        </section>
        <section className="members-section" aria-labelledby="member-list-title">
          <div className="section-heading"><h2 id="member-list-title">Members</h2><span>{members.length}</span></div>
          <div className="member-list">{members.map((member, index) => <div className={`member-row ${member.status === 'Pending' ? 'member-row--pending' : ''}`} key={member.id}><Avatar initials={member.initials} label={member.name} index={index} /><span className="member-row__copy"><strong>{member.name}{member.isCurrentUser ? ' (You)' : ''}</strong><small>{member.role}</small></span><span className={`member-status member-status--${member.status.toLowerCase().replace(/\s+/g, '-')}`}>{member.status}</span>{!member.isCurrentUser ? <div className="member-row__actions">{member.status === 'Pending' ? <Button type="button" variant="secondary" onClick={() => onMarkJoined(member.id)}>Mark as Joined</Button> : null}<button className="remove-member-button" type="button" onClick={() => setRemoveTarget(member)} aria-label={`Remove ${member.name}`}><UserMinus aria-hidden="true" size={17} /></button></div> : null}</div>)}</div>
        </section>
        <div className="flow-spacer" />{context === 'creation' ? <div className="bottom-actions bottom-actions--split"><Button type="button" variant="tertiary" onClick={onContinue}>Skip for now</Button><Button type="button" onClick={onContinue}>Continue</Button></div> : <div className="bottom-actions"><Button type="button" fullWidth onClick={onContinue}>Done</Button></div>}
      </div>
      {shareOpen ? (
        <Modal onClose={() => setShareOpen(false)} labelledBy="send-invite-title" closeOnBackdrop>
          <div className="sheet-handle" aria-hidden="true" /><button className="sheet-close" type="button" onClick={() => setShareOpen(false)} aria-label="Close invite sharing"><X aria-hidden="true" size={20} /></button><span className="sheet-icon"><Send aria-hidden="true" size={22} /></span><p className="eyebrow">Share trip invite</p><h2 id="send-invite-title">Send Invite Link</h2><p>Sarah Lim will appear as Pending until she joins.</p><div className="share-link-preview"><Link2 aria-hidden="true" size={17} /><span>{inviteLink}</span></div><div className="sheet-actions"><Button type="button" variant="secondary" onClick={() => setShareOpen(false)}>Cancel</Button><Button type="button" onClick={sendInvite}>Send Link</Button></div>
        </Modal>
      ) : null}
      {removeTarget ? <Modal onClose={() => setRemoveTarget(null)} labelledBy="remove-member-title" className="confirm-dialog" backdropClassName="modal-backdrop--centered" role="alertdialog"><span className="sheet-icon"><UserMinus aria-hidden="true" size={22} /></span><h2 id="remove-member-title">Remove {removeTarget.name.split(' ')[0]} from this trip?</h2><p>The member will disappear from the active group. Any Shared Packing responsibility they own becomes unresolved.</p><div className="sheet-actions"><Button type="button" variant="secondary" onClick={() => setRemoveTarget(null)}>Cancel</Button><Button type="button" variant="danger" onClick={() => { onRemoveMember(removeTarget.id); setRemoveTarget(null); }}>Remove Member</Button></div></Modal> : null}
    </Page>
  );
}

function CompactCalendar({ startDate, endDate, onSelect }: { startDate: string; endDate: string; onSelect: (value: string) => void }) {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <section className="calendar-card" aria-labelledby="calendar-title">
      <div className="calendar-card__heading"><h3 id="calendar-title">September 2026</h3><CalendarDays aria-hidden="true" size={18} /></div>
      <div className="calendar-grid calendar-grid--labels" aria-hidden="true">{labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div>
      <div className="calendar-grid">{[0, 1].map((value) => <span key={`blank-${value}`} />)}{Array.from({ length: 30 }, (_, index) => index + 1).map((day) => { const value = toIsoDate(2026, 9, day); const isEdge = value === startDate || value === endDate; const isRange = Boolean(startDate && endDate && value > startDate && value < endDate); return <button key={day} type="button" className={`${isEdge ? 'calendar-day--selected' : ''} ${isRange ? 'calendar-day--range' : ''}`.trim()} aria-pressed={isEdge} aria-label={`${day} September 2026`} onClick={() => onSelect(value)}>{day}</button>; })}</div>
    </section>
  );
}

export function TripDatesScreen({ draft, onChange, onBack, onCreate }: { draft: TripDraft; onChange: (dates: Pick<TripDraft, 'startDate' | 'endDate'>) => void; onBack: () => void; onCreate: () => void }) {
  const length = getTripLength(draft.startDate, draft.endDate);
  const valid = Boolean(length?.valid);
  const selectCalendarDate = (value: string) => {
    if (!draft.startDate || draft.endDate) onChange({ startDate: value, endDate: '' });
    else if (value < draft.startDate) onChange({ startDate: value, endDate: '' });
    else onChange({ startDate: draft.startDate, endDate: value });
  };
  return (
    <Page className="flow-page" labelledBy="trip-dates-title">
      <AppBar title="Create a Trip" meta="3 of 3" onBack={onBack} />
      <div className="flow-body">
        <section className="flow-heading flow-heading--tight"><h2 id="trip-dates-title">When are you going?</h2><p>Choose your start and end dates.</p></section>
        <div className="date-fields"><TextField id="start-date" name="startDate" label="Start Date" type="date" autoComplete="off" value={draft.startDate} onChange={(event) => onChange({ startDate: event.target.value, endDate: draft.endDate })} /><TextField id="end-date" name="endDate" label="End Date" type="date" autoComplete="off" min={draft.startDate || undefined} value={draft.endDate} error={length && !length.valid ? 'End Date must be on or after Start Date.' : undefined} onChange={(event) => onChange({ startDate: draft.startDate, endDate: event.target.value })} /></div>
        <CompactCalendar startDate={draft.startDate} endDate={draft.endDate} onSelect={selectCalendarDate} />
        {valid && length ? <div className="duration-card" role="status" aria-live="polite"><span className="duration-card__icon"><Clock3 aria-hidden="true" size={20} /></span><span><strong>{length.days} {pluralize(length.days, 'day')} / {length.nights} {pluralize(length.nights, 'night')}</strong><small>{formatDate(draft.startDate, true)} – {formatDate(draft.endDate)}</small></span></div> : null}
        <div className="flow-spacer" /><div className="bottom-actions"><Button type="button" fullWidth disabled={!valid} onClick={onCreate}>Create Trip</Button></div>
      </div>
    </Page>
  );
}
