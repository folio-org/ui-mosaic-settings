import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';

import { MOSAIC_CONFIGURATION_API } from '../../constants';
import type { MosaicConfiguration } from '../../types';

interface UseOrderTemplatesResult extends Pick<UseQueryResult, 'isFetching' | 'isLoading' | 'refetch'> {
  mosaicConfiguration?: MosaicConfiguration;
}

export const useMosaicConfiguration = (): UseOrderTemplatesResult => {
  const ky = useOkapiKy();
  const namespace = useNamespace({ key: 'mosaic-configuration' });

  const {
    data,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [namespace],
    queryFn: ({ signal }) => ky.get(MOSAIC_CONFIGURATION_API, { signal }).json<MosaicConfiguration>(),
  });

  return {
    isFetching,
    isLoading,
    mosaicConfiguration: data,
    refetch,
  };
};
