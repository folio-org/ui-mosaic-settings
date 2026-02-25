import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  Button,
  Col,
  Layout,
  Pane,
  PaneFooter,
  PaneHeader,
  Row,
} from '@folio/stripes/components';
import type { PaneHeaderProps } from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager,
} from '@folio/stripes/core';
import stripesFinalForm, {
  FormRenderProps,
} from '@folio/stripes/final-form';
import {
  FieldSelectionFinal,
  usePaneFocus,
} from '@folio/stripes-acq-components';

import type {
  MosaicConfiguration,
  OrderTemplate,
} from '../../types';

interface ConfigurationOptionsFormOwnProps {
  isLoading: boolean;
  isOrderTemplatesLoading: boolean;
  onGenerateTemplates: () => void;
  orderTemplates: OrderTemplate[];
}

const ConfigurationOptionsForm = (props: FormRenderProps<MosaicConfiguration> & ConfigurationOptionsFormOwnProps) => {
  const {
    form,
    handleSubmit,
    isLoading,
    isOrderTemplatesLoading,
    onGenerateTemplates,
    orderTemplates,
  } = props;

  const intl = useIntl();
  const { paneTitleRef } = usePaneFocus();

  const {
    pristine,
    submitting,
  } = form.getState();

  const isSubmitDisabled = pristine || submitting;
  const paneTitle = intl.formatMessage({ id: 'ui-mosaic-settings.sections.configuration-options' });

  const renderHeader = useCallback((headerProps: PaneHeaderProps) => (
    <PaneHeader
      {...headerProps}
      paneTitle={paneTitle}
    />
  ), [paneTitle]);

  const footerEnd = (
    <Row>
      <Col xs>
        <Button
          buttonStyle="primary"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          marginBottom0
        >
          <FormattedMessage id="stripes-acq-components.button.save" />
        </Button>
      </Col>
    </Row>
  );

  const dataOptions = useMemo(() => {
    return orderTemplates.map(({ id, templateName }) => ({
      label: templateName,
      value: id,
    }));
  }, [orderTemplates]);

  return (
    <Pane
      id="mosaic-configuration-options-settings"
      defaultWidth="fill"
      footer={<PaneFooter renderEnd={footerEnd} />}
      paneTitleRef={paneTitleRef}
      renderHeader={renderHeader}
    >
      <TitleManager record={paneTitle}>
        <Layout className="padding-bottom-gutter">
          <FormattedMessage id="ui-mosaic-settings.sections.configuration-options.description" />
        </Layout>
        <form id="exchange-rate-source-settings-form">
          <Row>
            <Col xs>
              <FieldSelectionFinal
                dataOptions={dataOptions}
                disabled={isLoading || isOrderTemplatesLoading}
                fullWidth
                label={<FormattedMessage id="ui-mosaic-settings.sections.configuration-options.field.template" />}
                name="defaultTemplateId"
                required
              />
            </Col>
          </Row>

          <IfPermission perm="mosaic.template.item.post">
            <p>
              <FormattedMessage id="ui-mosaic-settings.sections.configuration-options.action.generate-integration-templates.description" />
            </p>
            <Button
              buttonStyle="primary"
              disabled={isLoading || isOrderTemplatesLoading}
              onClick={onGenerateTemplates}
              marginBottom0
            >
              <FormattedMessage id="ui-mosaic-settings.sections.configuration-options.action.generate-integration-templates.label" />
            </Button>
          </IfPermission>
        </form>
      </TitleManager>
    </Pane>
  );
};

export default stripesFinalForm<ConfigurationOptionsFormOwnProps, MosaicConfiguration>({
  navigationCheck: true,
  subscription: { values: true },
})(ConfigurationOptionsForm);
