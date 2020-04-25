import { FinancePeriod, InflationIndex } from '@/types/finance';
import db from 'better-sqlite3-helper';
import { ResultMapperFactory } from '@/backend/mapper/result-mapper-factory';
import { formatDateStringToMonthString, parseDate } from '@/utils/date-utils';
import Optional from '@/backend/utils/optional';
import Period, { toSqlArray } from '@/backend/utils/period';

export function getLastFinancePeriod(contractId: number): FinancePeriod {
    const res = db().queryFirstRow(
        `select max(period) as period
                 from finance_card
                 where id_contract = ${contractId}`,
    ) as any;

    const stringPeriod = res.period;

    const result = db().queryFirstRow(`
        select *
        from finance_card
        where period = '${stringPeriod}' and id_contract = ${contractId}`);

    return ResultMapperFactory.financePeriodMapper.map(result);
}

export function getFinancePeriod(period: Period, contractId: number): Optional<FinancePeriod> {
    const result = db().queryFirstRow(`
        select *
        from finance_card
        where period = '${period.toSqlFormat()}' and id_contract = ${contractId}
    `);

    return Optional.of(result).map((value) => ResultMapperFactory.financePeriodMapper.map(value));
}

export function getAllPeriods(contractId: number): FinancePeriod[] {
    const result = db().query(`
        select * from finance_card
        where id_contract = ${contractId}
        order by period desc
    `);

    return result.map((value) => ResultMapperFactory.financePeriodMapper.map(value));
}

export function getAvailablePeriods(contractId: number): string[] {
    const result = db().query(`
        select period from finance_card
        where id_contract = ${contractId}
        group by period
    `);

    return result.map((value) => formatDateStringToMonthString(value.period));
}

export function isCalculated(period: Period, contractId: number): boolean {
    const result = db().query(`
        select * from finance_card
        where period = '${period.toSqlFormat()}' AND id_contract = ${contractId}
    `);

    return result.length > 0;
}

export function getMonthDebt(period: Period, contractId: number): Optional<number> {
    const result = db().queryFirstRow(`
        select debt from finance_card
        where period = '${period.toSqlFormat()}' and id_contract = ${contractId}
    `);

    return Optional.of(result).map((value) => value.debt);
}

export function getContractStartDate(contractId: number): Date {
    const result = db().queryFirstRow(`
        select start_date from contracts
        where id = ${contractId}
    `);

    if (!result) {
        throw new Error(`Договор с ${contractId} отсутствует`);
    }

    return parseDate(result.start_date);
}

export function getInflationIndexes(periods: Period[]): InflationIndex[] {
    const result = db().query(`
        select *
        from inflation_index
        where period in ${toSqlArray(periods)}
    `);

    return result.map((value) => ResultMapperFactory.inflationIndexMapper.map(value));
}

export function insertFinancePeriod(contractId: number, card: FinancePeriod) {
    db().insert('finance_card', {
        id_contract: contractId,
        period: card.period,
        accruals: card.accruals.toFixed(2),
        adjustments: card.adjustments.toFixed(2),
        debt: card.debt.toFixed(2),
    });
}

export function getPeriodsPayments(periods: Period[], contractId: number): Array<{ period: Period; sum: number }> {
    const result = db().query(`
        select period, sum(sum) as sum
        from payments
        where id_contract = ${contractId} and period in ${toSqlArray(periods)}
        group by period
    `);

    return result.map((value) => ({
        period: Period.ofString(value.period),
        sum: Number.parseFloat(value.sum),
    }));
}

export function getPeriodsAdjustments(
    periods: Period[],
    contractId: number,
): Array<{ period: Period; adjustment: number }> {
    const result = db().query(`
        select period, adjustments
        from finance_card
        where id_contract = ${contractId} and period in ${toSqlArray(periods)}
        group by period
    `);

    return result.map((value) => ({
        period: Period.ofString(value.period),
        adjustment: Number.parseFloat(value.adjustments),
    }));
}
