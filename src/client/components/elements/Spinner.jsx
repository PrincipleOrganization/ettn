import React from 'react';
import Halogen from 'halogen';

import { BRAND_COLOR } from '../../constants';

const Spinner = () => (
  <div className="spinner">
    <Halogen.MoonLoader color={BRAND_COLOR} />
  </div>
);

export default Spinner;