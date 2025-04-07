import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  CommandList,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';
import {
  Settings,
  SettingsProps,
} from '@folio/stripes/smart-components';
import { usePaneFocus } from '@folio/stripes-acq-components';

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
  const { paneTitleRef } = usePaneFocus();

  return (
    <CommandList commands={defaultKeyboardShortcuts}>
      <Settings
        {...props}
        navPaneWidth="25%"
        paneTitle={<FormattedMessage id="ui-mosaic-settings.meta.title" />}
        paneTitleRef={paneTitleRef}
        pages={pages}
        forceRender={0}
      />
    </CommandList>
  );
};
