import { useMutation } from 'react-query';
import type { UseMutationResult } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { MOSAIC_CONFIGURATION_API } from '../../constants';
import type { MosaicConfiguration } from '../../types';

interface CreateMosaicConfigurationParams {
  config: MosaicConfiguration;
}

type UseMosaicConfigurationMutationResult = Pick<UseMutationResult<MosaicConfiguration, unknown, CreateMosaicConfigurationParams>, 'isLoading' | 'mutateAsync'>;

export const useMosaicConfigurationMutation = (): UseMosaicConfigurationMutationResult => {
  const ky = useOkapiKy();

  const {
    mutateAsync,
    isLoading,
  } = useMutation({
    mutationFn: ({ config }: CreateMosaicConfigurationParams) => {
      return config.id
        ? ky.put(MOSAIC_CONFIGURATION_API, { json: config }).json<MosaicConfiguration>()
        : ky.post(MOSAIC_CONFIGURATION_API, { json: config }).json<MosaicConfiguration>();
    },
  });

  return {
    isLoading,
    mutateAsync,
  };
};
