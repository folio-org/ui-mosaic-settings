import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  Settings: jest.fn(({ pages }) => (
    pages?.map(({ label }) => <p key={label}>{label}</p>)
  )),
}));
