import { TRANSLATE } from './accesses.constants';

export default class NashaDashboardPartitionAccessesController {
  /* @ngInject */
  constructor($q, $http, $translate, iceberg, OvhApiDedicatedNasha) {
    this.$q = $q;
    this.$http = $http;
    this.$translate = $translate;
    this.iceberg = iceberg;
    this.nashaPartitionAccessAapi = OvhApiDedicatedNasha.Partition()
      .Access()
      .Aapi();

    this.isAccessFormShown = false;
    this.isCreatingAccess = false;
    this.isLoadingAccessForm = false;
    this.isLoadingAccesses = false;
    this.accesses = [];
    this.authorizedIps = null;
    this.model = { ip: null, type: null };
    this.typeOptions = [];
  }

  $onInit() {
    this.typeOptions = this.aclTypeEnum
      .filter((type) =>
        type === 'readonly' ? this.partition.protocol === 'NFS' : true,
      )
      .map((type) => ({
        label: this.translate(`list_type_${type}`),
        value: type,
      }));
  }

  get datagridTypeOptions() {
    return {
      hideOperators: true,
      values: this.typeOptions.reduce(
        (result, { label, value }) => ({
          ...result,
          [value]: label,
        }),
        {},
      ),
    };
  }

  get canCreateAccess() {
    return (
      this.accessForm?.$valid &&
      !this.isCreatingAccess &&
      !this.isLoadingAccessForm
    );
  }

  get canShowAccessForm() {
    return (
      !this.isAccessFormShown &&
      !this.isLoadingAccesses &&
      !this.isLoadingAccessForm
    );
  }

  loadAccesses($config) {
    const { criteria, pageSize, offset, sort } = $config;

    let accessesQuery = this.iceberg(`${this.partitionApiUrl}/access`)
      .query()
      .expand('CachedObjectList-Pages')
      .limit(pageSize)
      .offset(offset)
      .sort(sort.property, sort.dir > 0 ? 'ASC' : 'DESC');

    criteria.forEach(({ property, value, operator }) => {
      accessesQuery = accessesQuery.addFilter(
        property,
        ...{
          bigger: ['gt', value],
          contains: ['like', `%${value}%`],
          containsNot: ['nlike', `%${value}%`],
          endsWith: ['like', `%${value}`],
          is: ['eq', value],
          isAfter: ['gt', value],
          isBefore: ['lt', value],
          isNot: ['nq', value],
          smaller: ['lt', value],
          startsWith: ['like', `${value}%`],
        }[operator],
      );
    });

    this.isLoadingAccesses = true;
    this.hideAccessForm();

    return accessesQuery
      .execute(null, true)
      .$promise.then(({ data }) => ({
        data,
        meta: { totalCount: data.length },
      }))
      .catch((error) => {
        this.alertError(error);
        this.accesses = [{ ip: '1.1.1.1/1', type: 'readwrite' }];
        return {
          data: this.accesses,
          meta: { totalCount: this.accesses.length },
        };
      })
      .finally(() => {
        this.isLoadingAccesses = false;
      });
  }

  showAccessForm() {
    const doShowAccessForm = () => {
      const access = { ip: null, type: null };
      this.accesses.unshift({ ...access, isForm: true });
      this.isAccessFormShown = true;
      this.model = access;
    };

    if (this.authorizedIps) {
      doShowAccessForm();
      return;
    }

    const { serviceName } = this.nasha;
    const { partitionName } = this.partition;

    this.isLoadingAccessForm = true;

    this.nashaPartitionAccessAapi
      .authorizableIps({ serviceName, partitionName })
      .$promise.then((authorizedIps) => {
        this.authorizedIps = authorizedIps
          .filter(({ ip }) => !this.accesses.find((access) => access.ip === ip))
          .map(({ description, ...ip }) => ({
            ...ip,
            // ng-options groupby won't group items with null description
            // We have to set undefined explicitely
            description: description || undefined,
          }));
        doShowAccessForm();
      })
      .catch(this.alertError)
      .finally(() => {
        this.isLoadingAccessForm = false;
      });
  }

  hideAccessForm() {
    this.accesses.shift();
    this.isAccessFormShown = false;
  }

  createAccess() {
    const {
      ip: { ip },
      type: { value: type },
    } = this.model;

    this.isCreatingAccess = true;

    this.$http
      .post(`${this.partitionApiUrl}/access`, { ip, type })
      .then(() => this.reload({ success: this.translate('access_created') }))
      .catch((error) => {
        this.alertError(error);
        this.isCreatingAccess = false;
      });
  }

  translate(key, values) {
    return this.$translate.instant(`${TRANSLATE}_${key}`, values);
  }
}
