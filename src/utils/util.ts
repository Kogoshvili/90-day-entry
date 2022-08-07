import { format } from 'date-fns';
import { Nilable } from '../models/Nil';
import { enUS, ka } from 'date-fns/locale';

const locales: { [key: string]: Locale } = {
    'ka': ka,
    'en': enUS
};

export function isDate(input: any | any[]): boolean{
    if (input instanceof Array) {
        return input.every(isDate);
    }

    return input instanceof Date;
}

export function intervalInDays(final: Nilable<Date>, start: Nilable<Date>) {
    if (!final || !start) return 0;
    const timeDifference = final.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

export function dateToString(date: Nilable<Date>): string {
    if (!date) return '';
    const lang = localStorage.getItem('lang') ?? 'en';
    return format(date, 'dd MMM yyyy', { locale: locales[lang] });
}
