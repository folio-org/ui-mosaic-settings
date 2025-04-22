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

import { MOSAIC_CONFIGURATION_API } from '../../constants';
import type { MosaicConfiguration } from '../../types';
import { useMosaicConfigurationMutation } from './useMosaicConfigurationMutation';

const config: Partial<MosaicConfiguration> = {
  defaultTemplateId: 'defaultTemplateId',
};
const postMock = jest.fn(() => ({ json: jest.fn() }));
const putMock = jest.fn(() => ({ json: jest.fn() }));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMosaicConfigurationMutation', () => {
  beforeEach(() => {
    (useOkapiKy as jest.Mock).mockReturnValue({ post: postMock, put: putMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new Mosaic configuration', async () => {
    const { result } = renderHook(() => useMosaicConfigurationMutation(), { wrapper });

    await result.current.mutateAsync({ config });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(postMock).toHaveBeenCalledWith(MOSAIC_CONFIGURATION_API, { json: config });
  });

  it('should update existing Mosaic configuration', async () => {
    const _config = { ...config, id: '123' };
    const { result } = renderHook(() => useMosaicConfigurationMutation(), { wrapper });

    await result.current.mutateAsync({ config: _config });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(putMock).toHaveBeenCalledWith(MOSAIC_CONFIGURATION_API, { json: _config });
  });
});
