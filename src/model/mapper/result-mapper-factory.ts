import {
    Contact,
    ContractExtension,
    ContractNumberWithTenantName,
    ContractPageMainInfo,
    ContractWithTenant,
    FullContractDetails,
    FullContractExtension,
} from '@/model/types/contract-types';
import { FullObjectDetailsWithSubtenants, ObjectInformation, ShortObjectDetails } from '@/model/types/objects-types';
import {
    FinancePeriod,
    IndexingSign,
    InflationIndex,
    Payment,
    PaymentContractInfo,
} from '@/model/types/finance-types';
import {
    ContactMapper,
    ContractExtensionMapper,
    ContractMapper,
    ContractNumberWithTenantNameMapper,
    ContractPageMainInfoMapper,
    DirectoryMapper,
    FinancePeriodMapper,
    FullContractDetailsMapper,
    FullContractExtensionMapper,
    FullObjectDetailsWithSubtenantsMapper,
    IndexingSignMapper,
    InflationIndexMapper,
    ObjectInformationMapper,
    PaymentContractInfoMapper,
    PaymentMapper,
    ResultMapper,
    ShortObjectDetailsMapper,
    SubtenantWithObjectIdMapper,
    TenantMapper,
} from '@/model/mapper/result-mapper';
import { SubtenantWithObjectId, Tenant } from '@/model/types/tenants-types';
import { Directory } from '@/model/types/common-types';

export class ResultMapperFactory {
    static readonly contactMapper: ResultMapper<Contact> = new ContactMapper();
    static readonly fullContractDetailsMapper: ResultMapper<FullContractDetails> = new FullContractDetailsMapper();
    static readonly contractMapper: ResultMapper<ContractWithTenant> = new ContractMapper();
    static readonly shortObjectDetailsMapper: ResultMapper<ShortObjectDetails> = new ShortObjectDetailsMapper();
    static readonly fullObjectDetailsWithSubtenantsMapper: ResultMapper<FullObjectDetailsWithSubtenants>
        = new FullObjectDetailsWithSubtenantsMapper();
    static readonly contractPageMainInfoMapper: ResultMapper<ContractPageMainInfo> = new ContractPageMainInfoMapper();
    static readonly financePeriodMapper: ResultMapper<FinancePeriod> = new FinancePeriodMapper();
    static readonly inflationIndexMapper: ResultMapper<InflationIndex> = new InflationIndexMapper();
    static readonly contractExtensionMapper: ResultMapper<ContractExtension> = new ContractExtensionMapper();
    static readonly paymentContractInfoMapper: ResultMapper<PaymentContractInfo> = new PaymentContractInfoMapper();
    static readonly paymentMapper: ResultMapper<Payment> = new PaymentMapper();
    static readonly indexingSignMapper: ResultMapper<IndexingSign> = new IndexingSignMapper();
    static readonly objectInformationMapper: ResultMapper<ObjectInformation> = new ObjectInformationMapper();
    static readonly subtenantWithObjectIdResultMapper: ResultMapper<SubtenantWithObjectId>
        = new SubtenantWithObjectIdMapper();
    static readonly directoryMapper: ResultMapper<Directory> = new DirectoryMapper();
    static readonly fullContractExtensionMapper: ResultMapper<FullContractExtension>
        = new FullContractExtensionMapper();
    static readonly tenantMapper: ResultMapper<Tenant>
        = new TenantMapper();
    static readonly contractNumberWithTenantNameMapper: ResultMapper<ContractNumberWithTenantName>
        = new ContractNumberWithTenantNameMapper();
}
