import React from 'react';
import SiteHeaderPublic from '../PublicHeader';
import './style.scss';

const SitePublic = ({ component }) => {
  return (
    <div id="my-public-site">
      <SiteHeaderPublic />
      <div className="p-16 bg-primary site-content">{component}</div>
    </div>
  );
};

export default SitePublic;
