import React from 'react';

import { useShowCallout } from '@folio/stripes-acq-components';

import {
  useMosaicConfiguration,
  useMosaicConfigurationMutation,
} from '../../hooks';
import type { MosaicConfiguration } from '../../types';
import ConfigurationOptionsForm from './ConfigurationOptionsForm';

const DEFAULT_INITIAL_VALUES = {};

const ConfigurationOptions: React.FC = () => {
  const showCallout = useShowCallout();

  const {
    isLoading,
    mosaicConfiguration,
    refetch,
  } = useMosaicConfiguration();

  const {
    isLoading: isMutationLoading,
    mutateAsync: mutateMosaicConfiguration,
  } = useMosaicConfigurationMutation();

  const onSubmit = (config: MosaicConfiguration) => {
    return mutateMosaicConfiguration({ config })
      .then(async () => {
        showCallout({ messageId: 'ui-mosaic-settings.sections.configuration-options.submit.success' });
        await refetch();
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-mosaic-settings.sections.configuration-options.submit.error',
          type: 'error',
        });
      });
  };

  return (
    <ConfigurationOptionsForm
      onSubmit={onSubmit}
      initialValues={mosaicConfiguration || DEFAULT_INITIAL_VALUES}
      isLoading={Boolean(isLoading || isMutationLoading)}
    />
  );
};

export default ConfigurationOptions;
