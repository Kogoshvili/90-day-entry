export default interface Intl {
    CollatorOptions: {
        usage?: string | undefined;
        localeMatcher?: string | undefined;
        numeric?: boolean | undefined;
        caseFirst?: string | undefined;
        sensitivity?: string | undefined;
        ignorePunctuation?: boolean | undefined;
    }

    ResolvedCollatorOptions: {
        locale: string;
        usage: string;
        sensitivity: string;
        ignorePunctuation: boolean;
        collation: string;
        caseFirst: string;
        numeric: boolean;
    }

    Collator: {
        compare(x: string, y: string): number;
        resolvedOptions(): Intl.ResolvedCollatorOptions;
        new(locales?: string | string[], options?: Intl.CollatorOptions): Intl.Collator;
        (locales?: string | string[], options?: Intl.CollatorOptions): Intl.Collator;
        supportedLocalesOf(locales: string | string[], options?: Intl.CollatorOptions): string[];
    };

    NumberFormatOptions: {
        localeMatcher?: string | undefined;
        style?: string | undefined;
        currency?: string | undefined;
        currencySign?: string | undefined;
        useGrouping?: boolean | undefined;
        minimumIntegerDigits?: number | undefined;
        minimumFractionDigits?: number | undefined;
        maximumFractionDigits?: number | undefined;
        minimumSignificantDigits?: number | undefined;
        maximumSignificantDigits?: number | undefined;
    }

    ResolvedNumberFormatOptions: {
        locale: string;
        numberingSystem: string;
        style: string;
        currency?: string;
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: boolean;
    }

    NumberFormat: {
        format(value: number): string;
        resolvedOptions(): Intl.ResolvedNumberFormatOptions;
        new(locales?: string | string[], options?: Intl.NumberFormatOptions): Intl.NumberFormat;
        (locales?: string | string[], options?: Intl.NumberFormatOptions): Intl.NumberFormat;
        supportedLocalesOf(locales: string | string[], options?: Intl.NumberFormatOptions): string[];
        readonly prototype: Intl.NumberFormat;
    }

    DateTimeFormatOptions: {
        localeMatcher?: 'best fit' | 'lookup' | undefined;
        weekday?: 'long' | 'short' | 'narrow' | undefined;
        era?: 'long' | 'short' | 'narrow' | undefined;
        year?: 'numeric' | '2-digit' | undefined;
        month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
        day?: 'numeric' | '2-digit' | undefined;
        hour?: 'numeric' | '2-digit' | undefined;
        minute?: 'numeric' | '2-digit' | undefined;
        second?: 'numeric' | '2-digit' | undefined;
        timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric' | undefined;
        formatMatcher?: 'best fit' | 'basic' | undefined;
        hour12?: boolean | undefined;
        timeZone?: string | undefined;
    }

    ResolvedDateTimeFormatOptions: {
        locale: string;
        calendar: string;
        numberingSystem: string;
        timeZone: string;
        hour12?: boolean;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
    }

    DateTimeFormat: {
        format(date?: Date | number): string;
        resolvedOptions(): Intl.ResolvedDateTimeFormatOptions;
        new(locales?: string | string[], options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
        (locales?: string | string[], options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
        supportedLocalesOf(locales: string | string[], options?: Intl.DateTimeFormatOptions): string[];
        readonly prototype: Intl.DateTimeFormat;
    }
// eslint-disable-next-line semi
}
