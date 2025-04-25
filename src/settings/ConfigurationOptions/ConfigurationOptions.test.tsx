import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { useShowCallout } from '@folio/stripes-acq-components';

import ConfigurationOptions from './ConfigurationOptions';

import {
  useMosaicConfiguration,
  useMosaicConfigurationMutation,
  useOrderTemplates,
} from '../../hooks';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useShowCallout: jest.fn(),
}));
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useMosaicConfiguration: jest.fn(),
  useMosaicConfigurationMutation: jest.fn(),
  useOrderTemplates: jest.fn(),
}));

const mosaicConfiguration = {
  id: '1',
};
const orderTemplates = [
  { id: '1', templateName: 'Template 1' },
  { id: '2', templateName: 'Template 2' },
];
const defaultProps = {};

const renderComponent = (props = {}) => render(
  <ConfigurationOptions
    {...defaultProps}
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('ConfigurationOptions', () => {
  const mutateAsyncMock = jest.fn(() => Promise.resolve());
  const showCalloutMock = jest.fn();

  beforeEach(() => {
    (useMosaicConfiguration as jest.Mock).mockReturnValue({ mosaicConfiguration });
    (useMosaicConfigurationMutation as jest.Mock).mockReturnValue({ mutateAsync: mutateAsyncMock });
    (useOrderTemplates as jest.Mock).mockReturnValue({ orderTemplates });
    (useShowCallout as jest.Mock).mockReturnValue(showCalloutMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Mosaic configuration settings', () => {
    renderComponent();

    expect(screen.getByText('ui-mosaic-settings.sections.configuration-options')).toBeInTheDocument();
  });

  it('should handle Mosaic configuration update', async () => {
    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: 'ui-mosaic-settings.sections.configuration-options.field.template' }));
    await userEvent.click(screen.getByText(orderTemplates[0].templateName));
    await userEvent.click(screen.getByRole('button', { name: 'stripes-acq-components.button.save' }));

    expect(mutateAsyncMock).toHaveBeenCalled();
    expect(showCalloutMock).toHaveBeenCalled();
  });

  it('should show error callout on mutation failure', async () => {
    mutateAsyncMock.mockRejectedValueOnce(new Error('Mutation failed'));

    renderComponent();

    await userEvent.click(screen.getByRole('button', { name: 'ui-mosaic-settings.sections.configuration-options.field.template' }));
    await userEvent.click(screen.getByText(orderTemplates[0].templateName));
    await userEvent.click(screen.getByRole('button', { name: 'stripes-acq-components.button.save' }));

    expect(showCalloutMock).toHaveBeenCalledWith({
      messageId: 'ui-mosaic-settings.sections.configuration-options.submit.error',
      type: 'error',
    });
  });
});
