import { CONTRACT_STATUS_CLASS } from 'constants/contract';
import React from 'react';

const ContractInfo = ({ info, latestStatus }) => {
  return (
    <div
      className={`${
        latestStatus !== CONTRACT_STATUS_CLASS.Signed.name &&
        'max-h-100vh scroll-y'
      }`}
    >
      {(info || []).map((image) => (
        <img key={image} src={image} className="w-100p" />
      ))}
    </div>
  );
};

export default ContractInfo;
