export interface OrderMapper {
    map(sortBy: string | null, desc: boolean | null): string | null;
}

export class ContractsOrderMapper implements OrderMapper {
    map(sortBy: string | null, desc: boolean): string | null {
        if (!sortBy) {
            return null;
        }

        if (sortBy === 'contract') {
            return `contract_number ${desc ? 'desc' : ''}`;
        }

        if (sortBy === 'tenant') {
            return `CASE t.organization_name
                        WHEN NULL THEN t.responsible_person
                        ELSE t.organization_name
                     END ${desc ? 'desc' : ''} `;
        }

        return null;
    }
}

export class TenantsOrderMapper implements OrderMapper {
    map(sortBy: string | null, desc: boolean): string | null {
        if (!sortBy) {
            return null;
        }

        if (sortBy === 'contract') {
            return `contract_number ${desc ? 'desc' : ''}`;
        }

        if (sortBy === 'tenant') {
            return `CASE t.organization_name
                        WHEN NULL THEN t.responsible_person
                        ELSE t.organization_name
                     END ${desc ? 'desc' : ''} `;
        }

        return null;
    }
}
