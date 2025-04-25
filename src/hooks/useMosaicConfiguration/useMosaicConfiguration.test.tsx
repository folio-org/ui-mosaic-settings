import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useMosaicConfiguration } from './useMosaicConfiguration';

const config = { id: '1' };

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMosaicConfiguration', () => {
  beforeEach(() => {
    (useOkapiKy as jest.Mock).mockReturnValue({
      get: () => ({
        json: () => (config),
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch Mosaic configuration', async () => {
    const { result } = renderHook(() => useMosaicConfiguration(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.mosaicConfiguration).toEqual(config);
  });
});
