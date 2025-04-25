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

import { useOrderTemplates } from './useOrderTemplates';

const orderTemplates = [{ id: '1', name: 'Template 1' }];

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useOrderTemplates', () => {
  beforeEach(() => {
    (useOkapiKy as jest.Mock).mockReturnValue({
      get: () => ({
        json: () => ({ orderTemplates, totalRecords: orderTemplates.length }),
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch purchase order templates', async () => {
    const { result } = renderHook(() => useOrderTemplates(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.orderTemplates).toEqual(orderTemplates);
  });
});
