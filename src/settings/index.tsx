import React from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import {
  CommandList,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';
import {
  Settings,
  SettingsProps,
} from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

type SettingsPages = SettingsProps['pages'];
type MosaicIntegrationSettingsProps = {
  location: Location;
};

const pages: SettingsPages = [
  {
    route: 'configuration-options',
    label: <FormattedMessage id="ui-mosaic-settings.sections.configuration-options" />,
    component: React.lazy(() => import('./ConfigurationOptions')),
    perm: 'ui-mosaic-settings.settings.view',
  },
];

export const MosaicIntegrationSettings: React.FC<MosaicIntegrationSettingsProps> = (props) => {
  const intl = useIntl();

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <TitleManager page={intl.formatMessage({ id: 'ui-mosaic-settings.document.settings.title' })}>
        <Settings
          {...props}
          navPaneWidth="25%"
          paneTitle={<FormattedMessage id="ui-mosaic-settings.meta.title" />}
          pages={pages}
          forceRender={0}
        />
      </TitleManager>
    </CommandList>
  );
};
