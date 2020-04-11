import { Contract, FullContractDetails } from '@/types/contracts';
import { ResultMapperFactory } from '@/backend/mapper/result-mapper';
import { InputItem, Page, Pagination } from '@/types/common';
import { queryWithPagination } from '@/backend/repository/repository';
import { ContractOrderMapper } from '@/backend/mapper/order-mapper';
import { contractFilterToWhereClause, ContractsFilterInfo } from '@/backend/filter/filter';
import db from 'better-sqlite3-helper';
import { getContactsByTenantId } from '@/backend/repository/contact-repository';
import { getShortObjectDetailsByContractId } from '@/backend/repository/objects-repository';

export function getAllContracts(pagination: Pagination, filter: ContractsFilterInfo | null): Page<Contract> {
    const query = `
        select c.id,
               c.contract_number,
               c.start_date,
               c.validity,
               t.organization_name,
               t.responsible_person,
               t.legal_address,
               t.inn,
               tt.name as tenant_type,
               cs.name as status
        from contracts c
                 inner join tenants t on t.id = c.id_tenant
                 inner join tenant_types tt on tt.id = t.id_tenant_type
                 inner join contract_statuses cs on cs.id = c.id_status
        ${contractFilterToWhereClause(filter)}
        group by c.id`;
    return queryWithPagination(query, pagination, ResultMapperFactory.contractMapper, new ContractOrderMapper());
}

export function getContractDetails(id: number): FullContractDetails {
    const query = `
        select c.id,
               c.contract_number,
               c.start_date,
               c.validity,
               c.end_date,
               c.end_reason,
               cs.name as status,
               ct.name as contract_type,
               ext.last_contract_extension_from,
               ext.last_contract_extension_to,
               T.id    as tenant_id,
               T.organization_name,
               T.responsible_person,
               T.inn,
               T.legal_address,
               tt.name as tenant_type
        from contracts c
                 left join tenants t on c.id_tenant = t.id
                 left join tenant_types tt on t.id_tenant_type = tt.id
                 left join contract_statuses cs on c.id_status = cs.id
                 left join contract_type ct on c.id_type = ct.id
                 left join
             (
                 select ce.start_date as last_contract_extension_from, to_date as last_contract_extension_to
                 from contract_extensions ce
                 where ce.id_contract = ${id}
                 order by ce.start_date desc
                 limit 1
             ) as ext
        where c.id = ${id}
    `;

    const contractInfo = db().queryFirstRow(query) as any;
    const contacts = getContactsByTenantId(contractInfo.tenant_id);
    const objectsInfo = getShortObjectDetailsByContractId(id);

    return ResultMapperFactory.fullContractDetailsMapper.map(
        {
            ...contractInfo,
            contacts,
            objectsInfo,
        },
    );
}

export function getContractTypes(): InputItem[] {
    const result = db().query(`select *
                               from contract_type`);

    return result.map((value) => ({
        text: value.name,
        value: value.id,
    }));
}

/*export function createNewContract(): number {
    return db().insert('contracts', {});
}

export function deleteContract(id: number) {
    const result = db().query(`select id from objects where id_contract = ${id}`);
    result.forEach((v) => db().query(`delete from objects_information where id_object = ${v.id}`));

    db().query(`delete from objects where id_contract = ${id}`);
    db().query(`delete from contracts where id = ${id}`);
}*/
