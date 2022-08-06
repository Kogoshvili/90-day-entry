import { Nilable } from '../models/Nil';

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
    return date.toLocaleDateString(
        'en-UK',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    );
}
