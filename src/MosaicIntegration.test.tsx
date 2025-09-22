import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { MosaicIntegration } from './MosaicIntegration';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  TitleManager: jest.fn(({ children }) => children),
}));

const defaultProps = {
  location: {} as unknown as Location,
};

const renderComponent = (props = {}) => render(
  <MosaicIntegration
    {...defaultProps}
    {...props}
  />,
  { wrapper: MemoryRouter },
);

describe('MosaicIntegration', () => {
  it('should render settings', () => {
    renderComponent();

    expect(screen.getByText('ui-mosaic-settings.sections.configuration-options')).toBeInTheDocument();
  });
});
