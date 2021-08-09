import React from 'react';
import { Input } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';

import './styles.scss';

const SearchInput = (props) => {
  return (
    <Input
      {...props}
      prefix={<Icon component={IconCustom.Search} className="my-search-icon" />}
      className="search-input"
    />
  );
};

export default SearchInput;
