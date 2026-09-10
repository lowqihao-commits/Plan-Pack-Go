import { BedDouble, Bus, Check, ChevronDown, Plus, ReceiptText, Sparkles, Tag, Ticket, UsersRound } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { AppBar, Avatar, Button, Page, TextField } from '../components/ui';
import { activeTripMembers, expenseCategories, formatRinggit } from '../data/supportingData';
import { pluralize } from '../lib/copy';
import type { Expense, ExpenseCategory, ExpenseType, Member, TravelMode } from '../types';

const categoryIcons = {
  Transportation: Bus,
  Accommodation: BedDouble,
  'Tickets / Activities': Ticket,
  Other: Tag,
} satisfies Record<ExpenseCategory, typeof Bus>;

export function BudgetOverviewScreen({ mode, expenses, members, onBack, onAdd }: { mode: TravelMode; expenses: Expense[]; members: Member[]; onBack: () => void; onAdd: () => void }) {
  const [filter, setFilter] = useState<'All' | 'Shared'>('All');
  const visibleExpenses = filter === 'Shared' ? expenses.filter((expense) => expense.type === 'Shared') : expenses;
  const total = visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const memberById = new Map(members.map((member) => [member.id, member]));

  return <Page className="budget-page" labelledBy="budget-title">
    <AppBar title="Trip Cost" onBack={onBack} />
    <div className="budget-body">
      <section className="cost-total-card" aria-labelledby="budget-title">
        <span className="cost-total-card__icon"><ReceiptText aria-hidden="true" size={23} /></span>
        <div><p>{filter === 'Shared' ? 'Recorded Shared Expenses' : 'Recorded Trip Cost'}</p><h2 id="budget-title">{formatRinggit(total)}</h2><small>{visibleExpenses.length} recorded {visibleExpenses.length === 1 ? 'expense' : 'expenses'}</small></div>
      </section>

      {mode === 'group' ? <div className="cost-filter" role="radiogroup" aria-label="Expense view"><button type="button" role="radio" aria-checked={filter === 'All'} className={filter === 'All' ? 'is-selected' : ''} onClick={() => setFilter('All')}>All Expenses</button><button type="button" role="radio" aria-checked={filter === 'Shared'} className={filter === 'Shared' ? 'is-selected' : ''} onClick={() => setFilter('Shared')}>Shared Expenses</button></div> : null}

      <section aria-labelledby="cost-categories-title">
        <div className="section-heading"><h2 id="cost-categories-title">By Category</h2><span>Recorded amounts</span></div>
        <div className="cost-category-list">{expenseCategories.map((category) => {
          const Icon = categoryIcons[category];
          const subtotal = visibleExpenses.filter((expense) => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0);
          return <div className="cost-category-row" key={category}><span><Icon aria-hidden="true" size={18} /></span><strong>{category}</strong><b>{formatRinggit(subtotal)}</b></div>;
        })}</div>
      </section>

      <section aria-labelledby="recent-expenses-title">
        <div className="section-heading"><h2 id="recent-expenses-title">Recent Expenses</h2><span>{visibleExpenses.length}</span></div>
        {visibleExpenses.length ? <div className="expense-list">{[...visibleExpenses].reverse().map((expense) => <article className="expense-row" key={expense.id}><span className={`expense-type-icon expense-type-icon--${expense.type.toLowerCase()}`}>{expense.type === 'Shared' ? <UsersRound aria-hidden="true" size={17} /> : <ReceiptText aria-hidden="true" size={17} />}</span><div><h3>{expense.name}</h3><p>{expense.category}{expense.type === 'Shared' ? ` · Paid by ${memberById.get(expense.payerId)?.name.split(' ')[0] || 'Member'}` : ' · Personal'}</p></div><strong>{formatRinggit(expense.amount)}</strong></article>)}</div> : <div className="empty-state cost-empty"><ReceiptText aria-hidden="true" size={24} /><h3>No expenses recorded</h3><p>Add a trip cost when you are ready.</p></div>}
      </section>

      <div className="sticky-action"><Button type="button" fullWidth onClick={onAdd}><Plus aria-hidden="true" size={18} /> Add Expense</Button></div>
    </div>
  </Page>;
}

export function AddExpenseScreen({ mode, members, onCancel, onSave }: { mode: TravelMode; members: Member[]; onCancel: () => void; onSave: (expense: Omit<Expense, 'id'>) => void }) {
  const activeMembers = useMemo(() => activeTripMembers(members), [members]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Transportation');
  const [type, setType] = useState<ExpenseType>('Personal');
  const [payerId, setPayerId] = useState(activeMembers.find((member) => member.isCurrentUser)?.id || activeMembers[0]?.id || 'alex');
  const [participantIds, setParticipantIds] = useState<string[]>(activeMembers.map((member) => member.id));
  const numericAmount = Number(amount);
  const shared = mode === 'group' && type === 'Shared';
  const splitAmount = participantIds.length && numericAmount > 0 ? numericAmount / participantIds.length : 0;
  const valid = Boolean(name.trim() && numericAmount > 0 && category && (!shared || (payerId && participantIds.length)));
  const toggleParticipant = (memberId: string) => setParticipantIds((current) => current.includes(memberId) ? current.filter((id) => id !== memberId) : [...current, memberId]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) return;
    onSave({ name: name.trim(), amount: numericAmount, category, type: shared ? 'Shared' : 'Personal', payerId: shared ? payerId : 'alex', participantIds: shared ? participantIds : ['alex'] });
  };

  return <Page className="add-expense-page" labelledBy="add-expense-title">
    <AppBar title="Add Expense" onBack={onCancel} />
    <form className="add-expense-body" onSubmit={submit}>
      <section className="expense-form-heading"><span><Sparkles aria-hidden="true" size={22} /></span><div><p className="eyebrow">Trip cost</p><h2 id="add-expense-title">Record one expense</h2></div></section>

      <TextField id="expense-name" name="expenseName" label="Expense Name" autoComplete="off" placeholder="Example: Penang Hill ticket…" value={name} onChange={(event) => setName(event.target.value)} />
      <label className="cost-field"><span>Amount</span><div className="amount-input"><b>RM</b><input aria-label="Amount in RM" name="expenseAmount" type="number" min="0.01" step="0.01" inputMode="decimal" autoComplete="off" placeholder="0.00" value={amount} onChange={(event) => setAmount(event.target.value)} /></div></label>
      <label className="cost-field"><span>Category</span><div className="select-wrap"><select name="expenseCategory" value={category} onChange={(event) => setCategory(event.target.value as ExpenseCategory)}>{expenseCategories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown aria-hidden="true" size={17} /></div></label>

      {mode === 'group' ? <section className="expense-sharing" aria-labelledby="expense-type-title"><h3 id="expense-type-title">Who is this for?</h3><div className="cost-filter" role="radiogroup" aria-label="Expense type"><button type="button" role="radio" aria-checked={type === 'Personal'} className={type === 'Personal' ? 'is-selected' : ''} onClick={() => setType('Personal')}>Personal</button><button type="button" role="radio" aria-checked={type === 'Shared'} className={type === 'Shared' ? 'is-selected' : ''} onClick={() => setType('Shared')}>Shared</button></div></section> : null}

      {shared ? <section className="shared-expense-fields" aria-label="Shared expense details">
        <label className="cost-field"><span>Paid by</span><div className="select-wrap"><select name="expensePayer" value={payerId} onChange={(event) => setPayerId(event.target.value)}>{activeMembers.map((member) => <option value={member.id} key={member.id}>{member.name}{member.isCurrentUser ? ' (You)' : ''}</option>)}</select><ChevronDown aria-hidden="true" size={17} /></div></label>
        <fieldset className="participant-fieldset"><legend>Split between</legend><div className="participant-list">{activeMembers.map((member, index) => <label key={member.id}><input type="checkbox" name="expenseParticipants" value={member.id} checked={participantIds.includes(member.id)} onChange={() => toggleParticipant(member.id)} /><Avatar initials={member.initials} label={member.name} index={index} /><span><strong>{member.name}{member.isCurrentUser ? ' (You)' : ''}</strong><small>{participantIds.includes(member.id) ? 'Included' : 'Not included'}</small></span><i aria-hidden="true">{participantIds.includes(member.id) ? <Check size={15} /> : null}</i></label>)}</div></fieldset>
        <div className="equal-split-card"><span><UsersRound aria-hidden="true" size={20} /></span><div><strong>Equal split only</strong><small>{participantIds.length ? `${formatRinggit(splitAmount)} each · ${participantIds.length} ${pluralize(participantIds.length, 'member')}` : 'Select at least one member'}</small></div></div>
      </section> : null}

      <div className="form-spacer" /><div className="bottom-actions bottom-actions--split"><Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={!valid}>Save Expense</Button></div>
    </form>
  </Page>;
}
