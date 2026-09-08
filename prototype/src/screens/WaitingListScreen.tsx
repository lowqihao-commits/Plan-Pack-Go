import { useMemo, useState, type DragEvent, type FormEvent } from 'react';
import { Check, ChevronDown, ChevronUp, GripVertical, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { AppBar, Avatar, Button, Page } from '../components/ui';
import { placeOptions } from '../data/mockData';
import type { Member, Place, TravelMode } from '../types';

interface WaitingListScreenProps {
  mode: TravelMode;
  tripName: string;
  places: Place[];
  members?: Member[];
  onChange: (places: Place[]) => void;
  onBack: () => void;
  onContinue?: () => void;
}

export function WaitingListScreen({ mode, tripName, places, members = [], onChange, onBack, onContinue }: WaitingListScreenProps) {
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(mode === 'group' ? 'All changes saved' : '');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const group = mode === 'group';
  const currentUserName = members.find((member) => member.isCurrentUser)?.name.split(' ')[0] || 'You';

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized || editingId) return [];
    return placeOptions.filter((place) => place.name.toLowerCase().includes(normalized) && !places.some((item) => item.name === place.name)).slice(0, 3);
  }, [editingId, places, query]);

  const sync = (next: Place[]) => {
    onChange(next);
    if (group) {
      setSavedMessage('Saving…');
      window.setTimeout(() => setSavedMessage('All changes saved'), 450);
    }
  };

  const addPlace = (event: FormEvent) => {
    event.preventDefault();
    const name = query.trim();
    if (!name) return;
    if (editingId) {
      sync(places.map((place) => place.id === editingId ? { ...place, name } : place));
      setEditingId(null);
      setQuery('');
      return;
    }
    const known = placeOptions.find((place) => place.name.toLowerCase() === name.toLowerCase());
    sync([...places, { id: `${Date.now()}`, name: known?.name || name, location: known?.location || 'Location to confirm', addedBy: group ? currentUserName : undefined }]);
    setQuery('');
  };

  const chooseSuggestion = (name: string) => {
    const selected = placeOptions.find((place) => place.name === name)!;
    sync([...places, { id: `${Date.now()}`, ...selected, addedBy: group ? currentUserName : undefined }]);
    setQuery('');
  };

  const startEdit = (place: Place) => {
    setEditingId(place.id);
    setQuery(place.name);
    window.setTimeout(() => document.getElementById('place-search')?.focus(), 0);
  };

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= places.length) return;
    const next = [...places];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    sync(next);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    const fromIndex = places.findIndex((place) => place.id === draggedId);
    const targetIndex = places.findIndex((place) => place.id === targetId);
    const next = [...places];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(targetIndex, 0, moved);
    sync(next);
    setDraggedId(null);
  };

  return (
    <Page className="flow-page waiting-page" labelledBy="waiting-title">
      <AppBar title={group ? 'Shared Places to Visit' : 'Places to Visit'} onBack={onBack} />
      <div className="flow-body">
        <section className="waiting-context">
          <div><span className={`mode-badge mode-badge--${mode}`}>{group ? <><span aria-hidden="true">●●</span> Group</> : 'Solo'}</span><h2 id="waiting-title">{tripName || 'New Trip'}</h2></div>
          {group ? <div className="avatar-stack" aria-label="Group members">{members.map((member, index) => <Avatar key={member.id} initials={member.initials} label={member.name} index={index} />)}</div> : null}
        </section>
        <form className="place-search" onSubmit={addPlace}>
          <label htmlFor="place-search">Search or enter a place</label>
          <div className="place-search__row">
            <div className="place-search__input"><Search aria-hidden="true" size={19} /><input id="place-search" name="placeSearch" autoComplete="off" placeholder="Try “Penang Hill”…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <Button type="submit" disabled={!query.trim()} aria-label={editingId ? 'Save place name' : 'Add place'}>{editingId ? <Check aria-hidden="true" size={20} /> : <Plus aria-hidden="true" size={20} />}<span className="button-label-wide">{editingId ? 'Save' : 'Add'}</span></Button>
          </div>
          {editingId ? <button className="cancel-edit" type="button" onClick={() => { setEditingId(null); setQuery(''); }}><X aria-hidden="true" size={16} /> Cancel edit</button> : null}
          {suggestions.length ? <div className="place-suggestions" aria-label="Place suggestions">{suggestions.map((place) => <button key={place.name} type="button" onClick={() => chooseSuggestion(place.name)}><span><strong>{place.name}</strong><small>{place.location}</small></span><Plus aria-hidden="true" size={18} /></button>)}</div> : null}
        </form>
        <section className="waiting-list" aria-labelledby="waiting-list-title">
          <div className="section-heading">
            <div><h3 id="waiting-list-title">Waiting List</h3>{group && savedMessage ? <span className="sync-state"><Check aria-hidden="true" size={13} /> {savedMessage}</span> : null}</div>
            {places.length ? <button className="clear-button" type="button" onClick={() => { if (window.confirm('Clear every place from this Waiting List?')) sync([]); }}>Clear list</button> : null}
          </div>
          {places.length === 0 ? (
            <div className="empty-state empty-state--places"><span className="empty-state__icon"><Search aria-hidden="true" size={23} /></span><h3>Your list is ready for ideas</h3><p>Search for a place above or enter one you already have in mind.</p></div>
          ) : (
            <div className="place-list">
              {places.map((place, index) => (
                <article className="place-row" key={place.id} draggable onDragStart={() => setDraggedId(place.id)} onDragOver={(event: DragEvent) => event.preventDefault()} onDrop={() => handleDrop(place.id)}>
                  <GripVertical className="drag-handle" aria-hidden="true" size={20} />
                  <span className="place-row__order">{index + 1}</span>
                  <div className="place-row__copy"><h4>{place.name}</h4><p>{place.location}</p>{group ? <small>Added by {place.addedBy}</small> : null}</div>
                  <div className="place-row__actions">
                    <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${place.name} up`}><ChevronUp aria-hidden="true" size={17} /></button>
                    <button type="button" onClick={() => move(index, 1)} disabled={index === places.length - 1} aria-label={`Move ${place.name} down`}><ChevronDown aria-hidden="true" size={17} /></button>
                    <button type="button" onClick={() => startEdit(place)} aria-label={`Edit ${place.name}`}><Pencil aria-hidden="true" size={17} /></button>
                    <button type="button" className="place-row__remove" onClick={() => sync(places.filter((item) => item.id !== place.id))} aria-label={`Remove ${place.name}`}><Trash2 aria-hidden="true" size={17} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <div className="flow-spacer" />
        <div className="bottom-actions"><Button type="button" fullWidth disabled={places.length === 0 || !onContinue} onClick={onContinue}>{group ? 'Rate Places' : 'Review Trip'}</Button></div>
      </div>
    </Page>
  );
}
