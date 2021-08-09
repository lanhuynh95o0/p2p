import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME as STATE_NAME_APP } from 'states/app/constants';
import TableFinanceReport from 'components/Pages/ProjectDetail/components/ModalFinanceReport/TableFinanceReport';
import { selectTotalSold } from 'states/project/selectors';
import { separateCost } from 'utilities/stringHelper';

const FinanceReportStep2 = () => {
  const currentStep = useSelector(
    commonSelector(STATE_NAME_APP, 'currentStep')
  );
  const totalSell = useSelector(selectTotalSold());

  const renderTotal = (record) => {
    let totalSold = 0;
    if (!record) return totalSold;

    Object.entries(record).forEach(([key, value]) => {
      if (key.includes('Sold')) totalSold += value;
    });

    return separateCost(totalSold);
  };

  const valuesColumns = [
    {
      title: 'Material',
      key: 'materialSold',
      className: 'text-center participant-name',
      dataIndex: 'materialSold',
      editable: true,
    },
    {
      title: 'Labour',
      key: 'labourSold',
      className: 'text-center participant-name',
      dataIndex: 'labourSold',
      editable: true,
    },
    {
      title: 'Variation',
      key: 'variationSold',
      className: 'text-center participant-name',
      dataIndex: 'variationSold',
      editable: true,
    },
    {
      title: 'Commission',
      key: 'commissionSold',
      className: 'text-center participant-name',
      dataIndex: 'commissionSold',
      editable: true,
    },
    {
      title: 'Total',
      className: 'text-center participant-name',
      render: renderTotal,
    },
  ];

  if (currentStep !== 2) return null;

  return (
    <div className="step-1-info">
      <h3 className="text-center fz-18 mb-16">
        <strong>Sell (${separateCost(totalSell)})</strong>
      </h3>

      <TableFinanceReport valuesColumns={valuesColumns} />
    </div>
  );
};

export default React.memo(FinanceReportStep2);
