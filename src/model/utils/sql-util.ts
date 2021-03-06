import { OrderMapper } from '@/model/mapper/order-mapper';
import { Pagination } from '@/types/common';

export function toOrderBy(pagination: Pagination, mapper: OrderMapper): string {
    const sort = pagination.sort ? pagination.sort[0] : null;
    const desc = pagination.desc ? pagination.desc[0] : null;
    const sortBy = mapper.map(sort, desc);
    return sortBy && sortBy.length > 0 ? `ORDER BY ${sortBy}` : '';
}

export function toLimit(page: number, size: number): string {
    return `LIMIT ${(page - 1) * size}, ${size}`;
}

export function toArrayString(array: any[], inQuotes = false): string {
    if (inQuotes) {
        array = array.map((value) => `'${value}'`);
    }
    return `(${array.join(', ')})`;
}
