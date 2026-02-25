import { useMutation } from 'react-query';
import type { UseMutationResult } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { MOSAIC_TEMPLATE_API } from '../../constants';

export const useGenerateTemplatesMutation = (): UseMutationResult => {
  const ky = useOkapiKy();

  const mutation = useMutation({
    mutationFn: () => {
      return ky.post(MOSAIC_TEMPLATE_API);
    },
  });

  return { ...mutation };
};
