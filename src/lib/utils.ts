import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum DateString {
  full = 'eeee dd MMMM yyyy HH:mm',
  short = 'dd/MM/yyyy',
  day = 'eeee',
  date = 'dd MMMM yyyy',
  lDate = 'dd MMMM',
  month = 'MMMM yyyy',
  year = 'yyyy',
  time = 'HH:mm',
}

export const getDateAsString = (date: Date, type: DateString = DateString.full) => {
  return format(date, type, { locale: fr });
};
