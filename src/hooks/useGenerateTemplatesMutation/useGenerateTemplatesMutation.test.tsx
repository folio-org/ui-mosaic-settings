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

import { MOSAIC_TEMPLATE_API } from '../../constants';
import { useGenerateTemplatesMutation } from './useGenerateTemplatesMutation';

const postMock = jest.fn(() => ({ json: jest.fn() }));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMosaicConfigurationMutation', () => {
  beforeEach(() => {
    (useOkapiKy as jest.Mock).mockReturnValue({ post: postMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send requests to generate default templates', async () => {
    const { result } = renderHook(() => useGenerateTemplatesMutation(), { wrapper });

    await result.current.mutateAsync();
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(postMock).toHaveBeenCalledWith(MOSAIC_TEMPLATE_API);
  });
});
