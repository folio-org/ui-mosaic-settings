import React from 'react';

import { MosaicIntegrationSettings } from './settings';

type MosaicIntegrationProps = {
  location: Location;
};

export const MosaicIntegration: React.FC<MosaicIntegrationProps> = (props) => {
  return <MosaicIntegrationSettings {...props} />;
};
