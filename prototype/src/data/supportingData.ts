import type { Expense, ExpenseCategory, Member, NotificationPreferences, ProfileState } from '../types';

export const initialProfile: ProfileState = {
  name: 'Alex Tan',
  email: 'alex.tan@example.com',
  initials: 'AT',
  avatarVariant: 0,
};

export const initialNotificationPreferences: NotificationPreferences = {
  packingReminders: true,
  groupUpdates: true,
  tripAlerts: true,
};

export function createPenangExpenses(): Expense[] {
  return [
    { id: 'expense-transport', name: 'Intercity transport', amount: 240, category: 'Transportation', type: 'Shared', payerId: 'alex', participantIds: ['alex', 'aisha', 'daniel', 'mei', 'ravi'] },
    { id: 'expense-hotel', name: 'Harbour View Hotel', amount: 900, category: 'Accommodation', type: 'Shared', payerId: 'mei', participantIds: ['alex', 'aisha', 'daniel', 'mei', 'ravi'] },
    { id: 'expense-hill', name: 'Penang Hill tickets', amount: 150, category: 'Tickets / Activities', type: 'Shared', payerId: 'daniel', participantIds: ['alex', 'aisha', 'daniel', 'mei', 'ravi'] },
    { id: 'expense-entopia', name: 'Entopia tickets', amount: 325, category: 'Tickets / Activities', type: 'Shared', payerId: 'alex', participantIds: ['alex', 'aisha', 'daniel', 'mei', 'ravi'] },
    { id: 'expense-other', name: 'Parking and tolls', amount: 80, category: 'Other', type: 'Shared', payerId: 'ravi', participantIds: ['alex', 'aisha', 'daniel', 'mei', 'ravi'] },
  ];
}

export const expenseCategories: ExpenseCategory[] = ['Transportation', 'Accommodation', 'Tickets / Activities', 'Other'];

export function activeTripMembers(members: Member[]): Member[] {
  return members.filter((member) => member.status === 'Joined' || member.status === 'Joining');
}

export function eligiblePreferenceMembers(members: Member[]): Member[] {
  return members.filter((member) => member.status !== 'Pending' && member.status !== 'Left Trip');
}

export function initialsForName(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('') || 'AT';
}

export function formatRinggit(amount: number): string {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(amount).replace('MYR', 'RM');
}
