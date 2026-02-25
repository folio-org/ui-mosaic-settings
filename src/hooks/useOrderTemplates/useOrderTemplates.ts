import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';
import {
  ALL_RECORDS_CQL,
  LIMIT_MAX,
} from '@folio/stripes-acq-components';

import { ORDER_TEMPLATES_API } from '../../constants';
import type { OrderTemplate } from '../../types';

interface OrderTemplatesResult {
  orderTemplates: OrderTemplate[];
  totalRecords: number;
}

type UseOrderTemplatesResult = OrderTemplatesResult & Omit<UseQueryResult, 'data'>;

const DEFAULT_DATA: OrderTemplate[] = [];

export const useOrderTemplates = (): UseOrderTemplatesResult => {
  const ky = useOkapiKy();
  const namespace = useNamespace({ key: 'order-templates' });

  const searchParams = {
    query: ALL_RECORDS_CQL,
    limit: LIMIT_MAX,
  };

  const { data, ...rest } = useQuery({
    queryKey: [namespace],
    queryFn: ({ signal }) => ky.get(ORDER_TEMPLATES_API, { searchParams, signal }).json<OrderTemplatesResult>(),
  });

  return {
    orderTemplates: data?.orderTemplates ?? DEFAULT_DATA,
    totalRecords: data?.totalRecords ?? 0,
    ...rest,
  };
};
