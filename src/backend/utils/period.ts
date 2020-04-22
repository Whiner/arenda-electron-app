import {
    formatDateToDefaultFormat,
    formatDateToMonthString,
    formatMonthToFriendly,
    parseMonth,
} from '@/utils/date-utils';
import {
    addMonths,
    endOfMonth,
    getDaysInMonth,
    isAfter,
    isBefore,
    isSameMonth,
    startOfMonth,
    subMonths,
} from 'date-fns';

export default class Period {
    static ofDate(date: Date): Period {
        return new Period(date);
    }

    static ofString(value: string): Period {
        return new Period(parseMonth(value));
    }

    static ofMonthYear(month: number, year: number) {
        return new Period(new Date(year, month - 1));
    }

    private readonly date!: Date;

    private constructor(date: Date) {
        this.date = startOfMonth(date);
    }

    public toDefaultFormat(): string {
        return formatDateToMonthString(this.date);
    }

    public toFriendlyFormat(): string {
        return formatMonthToFriendly(this.date);
    }

    public toSqlFormat(): string {
        return formatDateToDefaultFormat(this.date);
    }

    public getDate(): Date {
        return this.date;
    }

    public startOfMonth(): Date {
        return this.date;
    }

    public endOfMonth(): Date {
        return endOfMonth(this.date);
    }

    public getDaysInMonth(): number {
        return getDaysInMonth(this.date);
    }

    public isSamePeriod(period: Period): boolean {
        // todo: проверить если месяц тот же а год разный
        return isSameMonth(this.date, period.getDate());
    }

    public isAfter(period: Period): boolean {
        return isAfter(this.date, period.getDate());
    }

    public isBefore(period: Period): boolean {
        return isBefore(this.date, period.getDate());
    }

    public addMonths(amount: number): Period {
        return Period.ofDate(addMonths(this.date, amount));
    }

    public subMonths(amount: number): Period {
        return Period.ofDate(subMonths(this.date, amount));
    }
}

export function toSqlArray(array: Period[]): string {
    return `(${array.map((value) => `'${value.toSqlFormat()}'`).join(', ')})`;
}
