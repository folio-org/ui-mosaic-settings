import { useQuery } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';

import { ORDER_TEMPLATES_API } from '../../constants';
import type { OrderTemplate } from '../../types';

interface OrderTemplatesResult {
  orderTemplates: OrderTemplate[];
  totalRecords: number;
}

interface UseOrderTemplatesResult extends OrderTemplatesResult {
  isFetching: boolean,
  isLoading: boolean,
}

const DEFAULT_DATA: OrderTemplate[] = [];

export const useOrderTemplates = (): UseOrderTemplatesResult => {
  const ky = useOkapiKy();
  const namespace = useNamespace({ key: 'order-templates' });

  const {
    data,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [namespace],
    queryFn: ({ signal }) => ky.get(ORDER_TEMPLATES_API, { signal }).json<OrderTemplatesResult>(),
  });

  return ({
    isFetching,
    isLoading,
    orderTemplates: data?.orderTemplates || DEFAULT_DATA,
    totalRecords: data?.totalRecords || 0,
  });
};
