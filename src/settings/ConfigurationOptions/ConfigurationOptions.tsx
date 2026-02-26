import React from 'react';

import { useShowCallout } from '@folio/stripes-acq-components';

import {
  useGenerateTemplatesMutation,
  useMosaicConfiguration,
  useMosaicConfigurationMutation,
  useOrderTemplates,
} from '../../hooks';
import type { MosaicConfiguration } from '../../types';
import ConfigurationOptionsForm from './ConfigurationOptionsForm';

const DEFAULT_INITIAL_VALUES = {};

const ConfigurationOptions: React.FC = () => {
  const showCallout = useShowCallout();

  const {
    isLoading: isConfigurationLoading,
    mosaicConfiguration,
    refetch: refetchConfiguration,
  } = useMosaicConfiguration();

  const {
    isLoading: isMutationLoading,
    mutateAsync: mutateMosaicConfiguration,
  } = useMosaicConfigurationMutation();

  const {
    isLoading: isDefaultTemplateGenerating,
    mutateAsync: generateDefaultTemplate,
  } = useGenerateTemplatesMutation();

  const {
    isLoading: isOrderTemplatesLoading,
    orderTemplates,
    refetch: refetchOrderTemplates,
  } = useOrderTemplates();

  const onSubmit = (config: MosaicConfiguration) => {
    return mutateMosaicConfiguration({ config })
      .then(async () => {
        showCallout({ messageId: 'ui-mosaic-settings.sections.configuration-options.submit.success' });
        await refetchConfiguration();
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-mosaic-settings.sections.configuration-options.submit.error',
          type: 'error',
        });
      });
  };

  const onGenerateTemplates = async () => {
    generateDefaultTemplate(null)
      .then(() => {
        showCallout({ messageId: 'ui-mosaic-settings.sections.configuration-options.action.generate-integration-templates.success' });
        refetchOrderTemplates();
      })
      .catch(() => {
        showCallout({
          messageId: 'ui-mosaic-settings.sections.configuration-options.action.generate-integration-templates.error',
          type: 'error',
        });
      });
  };

  const isLoading = isConfigurationLoading || isMutationLoading || isDefaultTemplateGenerating;

  return (
    <ConfigurationOptionsForm
      initialValues={mosaicConfiguration || DEFAULT_INITIAL_VALUES}
      isLoading={isLoading}
      isOrderTemplatesLoading={isOrderTemplatesLoading}
      onGenerateTemplates={onGenerateTemplates}
      onSubmit={onSubmit}
      orderTemplates={orderTemplates}
    />
  );
};

export default ConfigurationOptions;
