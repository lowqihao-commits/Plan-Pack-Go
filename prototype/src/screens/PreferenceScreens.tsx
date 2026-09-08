import { useMemo, useState } from 'react';
import { CalendarDays, Check, CheckCircle2, MapPin, Minus, Plus, SlidersHorizontal, UsersRound, Vote, X } from 'lucide-react';
import { AppBar, Button, Modal, Page } from '../components/ui';
import { preferenceThresholds } from '../data/mockData';
import { pluralize } from '../lib/copy';
import { formatDate, getTripLength } from '../lib/date';
import { getPreferenceCategory, getRatingSummary, majorityNeeded } from '../lib/preferences';
import type { InclusionRequestState, InclusionRequestsByPlace, Member, Place, RatingsByPlace, TripDraft } from '../types';

function CategoryBadge({ score }: { score: number | null }) {
  const category = getPreferenceCategory(score);
  return <span className={`preference-badge preference-badge--${category.toLowerCase()}`}>{category === 'Unrated' ? category : `${category} Preference`}</span>;
}

function PublicRatings({ values, members }: { values: Record<string, number | null>; members: Member[] }) {
  return (
    <div className="public-ratings" aria-label="Public member ratings">
      {members.map((member, index) => (
        <div className={`public-rating ${member.isCurrentUser ? 'public-rating--you' : ''}`} key={member.id} title={member.name}>
          <span className={`public-rating__avatar avatar--${(index % 4) + 1}`}>{member.initials}</span>
          <span>{values[member.id] ?? '—'}</span>
        </div>
      ))}
    </div>
  );
}

function TripSummaryCard({ draft }: { draft: TripDraft }) {
  const length = getTripLength(draft.startDate, draft.endDate);
  return (
    <section className="review-summary" aria-label="Trip summary">
      <div>
        <span className="mode-badge mode-badge--group">Group</span>
        <h2>{draft.name || 'New Trip'}</h2>
      </div>
      <div className="review-summary__details">
        <span><CalendarDays aria-hidden="true" size={16} /> {formatDate(draft.startDate, true)} – {formatDate(draft.endDate)}</span>
        {length?.valid ? <span>{length.days} {pluralize(length.days, 'day')} · {length.nights} {pluralize(length.nights, 'night')}</span> : null}
      </div>
    </section>
  );
}

interface GroupPreferenceScreenProps {
  places: Place[];
  ratings: RatingsByPlace;
  members: Member[];
  onRatingsChange: (ratings: RatingsByPlace) => void;
  onBack: () => void;
  onDone: () => void;
  onReview: () => void;
}

export function GroupPreferenceScreen({ places, ratings, members, onRatingsChange, onBack, onDone, onReview }: GroupPreferenceScreenProps) {
  const currentUser = members.find((member) => member.isCurrentUser) || members[0];
  const currentUserId = currentUser?.id || 'alex';
  const ratedPlaces = places.filter((place) => typeof ratings[place.id]?.[currentUserId] === 'number').length;

  const setRating = (place: Place, value: number | null) => {
    const nextValue = value === null ? null : Math.max(0, Math.min(10, Math.round(value)));
    onRatingsChange({
      ...ratings,
      [place.id]: { ...ratings[place.id], [currentUserId]: nextValue },
    });
  };

  return (
    <Page className="flow-page preference-page" labelledBy="preference-title">
      <AppBar title="Rate the Places" onBack={onBack} />
      <div className="flow-body">
        <section className="preference-intro">
          <div><p className="eyebrow">Group preference</p><h2 id="preference-title">Share your view</h2></div>
          <span className="progress-pill">{ratedPlaces} of {places.length} rated</span>
          <p>Ratings are public to the group and can be updated later.</p>
        </section>

        <div className="rating-list">
          {places.map((place) => {
            const values = ratings[place.id] || {};
            const currentValue = values[currentUserId] ?? null;
            const summary = getRatingSummary(values, members);
            const isNew = summary.ratedCount === 0;
            return (
              <article className="rating-card" key={place.id}>
                <div className="rating-card__heading">
                  <div><h3>{place.name}</h3><p><MapPin aria-hidden="true" size={13} /> {place.location} · Added by {place.addedBy || currentUser?.name.split(' ')[0] || 'You'}</p></div>
                  {isNew ? <span className="new-badge">New · Unrated</span> : <CategoryBadge score={summary.score} />}
                </div>

                <div className="rating-control">
                  <div><span>Your rating</span><strong aria-live="polite">{currentValue ?? '—'}<small>{currentValue === null ? ' Not rated' : ' / 10'}</small></strong></div>
                  <div className="rating-stepper">
                    <button type="button" onClick={() => setRating(place, currentValue === null ? 0 : currentValue - 1)} disabled={currentValue === 0} aria-label={`Decrease rating for ${place.name}`}><Minus aria-hidden="true" size={18} /></button>
                    <input type="number" inputMode="numeric" min="0" max="10" step="1" name={`rating-${place.id}`} autoComplete="off" value={currentValue ?? ''} placeholder="—" aria-label={`Your rating for ${place.name}, from 0 to 10`} onChange={(event) => setRating(place, event.target.value === '' ? null : Number(event.target.value))} />
                    <button type="button" onClick={() => setRating(place, currentValue === null ? 5 : currentValue + 1)} disabled={currentValue === 10} aria-label={`Increase rating for ${place.name}`}><Plus aria-hidden="true" size={18} /></button>
                  </div>
                </div>

                <div className="rating-card__group">
                  <div className="rating-card__group-label"><span>Public ratings · {summary.ratedCount} of {summary.memberCount} rated</span><strong>{summary.score === null ? 'Unrated' : `${summary.score}% group score`}</strong></div>
                  <PublicRatings values={values} members={members} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="flow-spacer" />
        <div className="bottom-actions bottom-actions--split"><Button type="button" variant="secondary" onClick={onDone}>Done for now</Button><Button type="button" onClick={onReview}>Review Results</Button></div>
      </div>
    </Page>
  );
}

interface GroupResultsScreenProps {
  places: Place[];
  ratings: RatingsByPlace;
  members: Member[];
  onBack: () => void;
  onContinue: () => void;
}

export function GroupResultsScreen({ places, ratings, members, onBack, onContinue }: GroupResultsScreenProps) {
  const ranked = useMemo(() => [...places].sort((first, second) => (getRatingSummary(ratings[second.id], members).score ?? -1) - (getRatingSummary(ratings[first.id], members).score ?? -1)), [places, ratings, members]);
  return (
    <Page className="flow-page results-page" labelledBy="results-title">
      <AppBar title="Group Results" onBack={onBack} />
      <div className="flow-body">
        <section className="results-intro">
          <span className="flow-icon"><SlidersHorizontal aria-hidden="true" size={23} /></span>
          <h2 id="results-title">See the group picture</h2>
          <p>Scores use submitted public ratings only. Participation stays visible when not everyone has rated.</p>
        </section>
        <div className="results-list">
          {ranked.map((place, index) => {
            const summary = getRatingSummary(ratings[place.id], members);
            return (
              <article className="result-card" key={place.id}>
                <span className="result-card__rank">{index + 1}</span>
                <div className="result-card__main"><h3>{place.name}</h3><p>{place.location}</p><span className="participation"><UsersRound aria-hidden="true" size={14} /> {summary.ratedCount} of {summary.memberCount} rated</span></div>
                <div className="result-card__score"><strong>{summary.score === null ? '—' : `${summary.score}%`}</strong><CategoryBadge score={summary.score} /></div>
              </article>
            );
          })}
        </div>
        <aside className="threshold-note"><strong>Preference levels</strong><span>High {preferenceThresholds.highMinimum}%+ · Medium {preferenceThresholds.mediumMinimum}–{preferenceThresholds.highMinimum - 1}% · Low below {preferenceThresholds.mediumMinimum}%</span></aside>
        <div className="flow-spacer" /><div className="bottom-actions"><Button type="button" fullWidth onClick={onContinue}>Continue to Final Review</Button></div>
      </div>
    </Page>
  );
}

interface GroupFinalReviewScreenProps {
  draft: TripDraft;
  places: Place[];
  ratings: RatingsByPlace;
  members: Member[];
  selectedIds: string[];
  requests: InclusionRequestsByPlace;
  onSelectedIdsChange: (ids: string[]) => void;
  onRequestVote: (placeId: string, decision: 'approve' | 'reject') => void;
  onBack: () => void;
  onConfirm: () => void;
  confirmed: boolean;
}

export function GroupFinalReviewScreen({ draft, places, ratings, members, selectedIds, requests, onSelectedIdsChange, onRequestVote, onBack, onConfirm, confirmed }: GroupFinalReviewScreenProps) {
  const [requestPlaceId, setRequestPlaceId] = useState<string | null>(null);
  const toggle = (id: string) => onSelectedIdsChange(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  const requestPlace = places.find((place) => place.id === requestPlaceId) || null;

  return (
    <Page className="flow-page final-review-page" labelledBy="group-final-title">
      <AppBar title="Final Review" onBack={onBack} />
      <div className="flow-body">
        <TripSummaryCard draft={draft} />
        <div className="final-review-heading"><div><h2 id="group-final-title">Confirm the group shortlist</h2><p>High places start included, Medium stays open for review, and Low needs group approval.</p></div><span className="selected-count">{selectedIds.length} selected</span></div>
        <div className="group-review-list">
          {places.map((place) => {
            const summary = getRatingSummary(ratings[place.id], members);
            const category = getPreferenceCategory(summary.score);
            const request = requests[place.id];
            const approvalCount = request?.approvals.filter((memberId) => members.some((member) => member.id === memberId)).length || 0;
            const approvedByMajority = Boolean(request && approvalCount >= majorityNeeded(members.length));
            const lowLocked = category === 'Low' && !approvedByMajority;
            return (
              <article className={`group-review-card ${selectedIds.includes(place.id) ? 'group-review-card--selected' : ''}`} key={place.id}>
                <div className="group-review-card__top">
                  <button className="selection-control" type="button" disabled={lowLocked || confirmed} aria-pressed={selectedIds.includes(place.id)} aria-label={`${selectedIds.includes(place.id) ? 'Remove' : 'Include'} ${place.name}`} onClick={() => toggle(place.id)}>{selectedIds.includes(place.id) ? <Check aria-hidden="true" size={17} /> : null}</button>
                  <div><h3>{place.name}</h3><p>{place.location}</p></div>
                  <div className="group-review-card__score"><strong>{summary.score === null ? '—' : `${summary.score}%`}</strong><CategoryBadge score={summary.score} /></div>
                </div>
                <div className="group-review-card__status"><span>{summary.ratedCount} of {summary.memberCount} rated</span><span>{category === 'High' ? 'Pre-included' : category === 'Medium' ? 'Review together' : approvedByMajority ? 'Included by majority' : 'Normally excluded'}</span></div>
                {category === 'Low' ? <div className="request-row"><span>{approvalCount} of {members.length} approve · {majorityNeeded(members.length)} needed</span><Button type="button" variant="secondary" disabled={confirmed} onClick={() => setRequestPlaceId(place.id)}>Request to Include</Button></div> : null}
              </article>
            );
          })}
        </div>
        <div className="flow-spacer" /><div className="bottom-actions"><Button type="button" fullWidth disabled={selectedIds.length === 0 || confirmed} onClick={onConfirm}>{confirmed ? 'Final Places Confirmed' : 'Confirm Final Places'}</Button></div>
      </div>
      {requestPlace ? <RequestToIncludeSheet place={requestPlace} score={getRatingSummary(ratings[requestPlace.id], members).score} request={requests[requestPlace.id]} members={members} onClose={() => setRequestPlaceId(null)} onVote={(decision) => { onRequestVote(requestPlace.id, decision); setRequestPlaceId(null); }} /> : null}
    </Page>
  );
}

function RequestToIncludeSheet({ place, score, request, members, onClose, onVote }: { place: Place; score: number | null; request: InclusionRequestState; members: Member[]; onClose: () => void; onVote: (decision: 'approve' | 'reject') => void }) {
  const requester = members.find((member) => member.id === request.requesterId) || members.find((member) => member.isCurrentUser) || members[0];
  const approvals = request.approvals.filter((memberId) => members.some((member) => member.id === memberId));
  const rejections = request.rejections.filter((memberId) => members.some((member) => member.id === memberId));
  return (
    <Modal onClose={onClose} labelledBy="request-title" closeOnBackdrop>
        <div className="sheet-handle" aria-hidden="true" />
        <button className="sheet-close" type="button" onClick={onClose} aria-label="Close request"><X aria-hidden="true" size={20} /></button>
        <span className="sheet-icon"><Vote aria-hidden="true" size={22} /></span>
        <p className="eyebrow">Request to include</p><h2 id="request-title">{place.name}</h2><p>{requester?.name || 'Trip member'}: “{request.reason}”</p>
        <div className="request-metrics"><span><strong>{score ?? '—'}{score === null ? '' : '%'}</strong> group result</span><span><strong>{approvals.length} / {members.length}</strong> approve</span></div>
        <div className="vote-list" aria-label="Public vote status">
          {members.map((member) => <span key={member.id}><strong>{member.initials}</strong>{approvals.includes(member.id) ? 'Approve' : rejections.includes(member.id) ? 'Reject' : 'Waiting'}</span>)}
        </div>
        <p className="majority-copy">A simple majority needs {majorityNeeded(members.length)} approvals. The requester has one normal vote.</p>
        <div className="sheet-actions"><Button type="button" variant="secondary" onClick={() => onVote('reject')}>Reject</Button><Button type="button" onClick={() => onVote('approve')}>Approve</Button></div>
    </Modal>
  );
}

export function ConfirmationSuccess({ count, onAction, onClose, actionLabel = 'Continue' }: { count: number; onAction: () => void; onClose: () => void; actionLabel?: string }) {
  return (
    <Modal onClose={onClose} labelledBy="success-title" className="success-dialog" backdropClassName="modal-backdrop--centered">
        <span className="success-dialog__icon"><CheckCircle2 aria-hidden="true" size={36} /></span>
        <p className="eyebrow">All set</p><h2 id="success-title">Final places confirmed</h2><p>{count} {count === 1 ? 'place is' : 'places are'} confirmed for this trip.</p>
        <Button type="button" fullWidth onClick={onAction}>{actionLabel}</Button>
    </Modal>
  );
}
