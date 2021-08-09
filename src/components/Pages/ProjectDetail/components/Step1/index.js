import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME as STATE_NAME_APP } from 'states/app/constants';
import useActions from 'hooks/useActions';
import { getAllFinanceReport } from 'states/project/actions';
import { useParams } from 'react-router-dom';
import TableFinanceReport from 'components/Pages/ProjectDetail/components/ModalFinanceReport/TableFinanceReport';
import { selectTotalCost } from 'states/project/selectors';
import { separateCost } from 'utilities/stringHelper';

const FinanceReportStep1 = () => {
  const { id: projectId } = useParams();

  const currentStep = useSelector(
    commonSelector(STATE_NAME_APP, 'currentStep')
  );
  const totalCost = useSelector(selectTotalCost());

  const [getAllFinanceReportAction] = useActions([getAllFinanceReport]);

  useEffect(() => {
    getAllFinanceReportAction({ id: projectId });
  }, []);

  const renderTotal = (record) => {
    let totalCost = 0;
    if (!record) return totalCost;

    Object.entries(record).forEach(([key, value]) => {
      if (key.includes('Cost')) totalCost += value;
    });

    return separateCost(totalCost);
  };

  const valuesColumns = [
    {
      title: 'Material',
      key: 'materialCost',
      className: 'text-center participant-name',
      dataIndex: 'materialCost',
      editable: true,
    },
    {
      title: 'Labour',
      key: 'labourCost',
      className: 'text-center participant-name',
      dataIndex: 'labourCost',
      editable: true,
    },
    {
      title: 'Variation',
      key: 'variationCost',
      className: 'text-center participant-name',
      dataIndex: 'variationCost',
      editable: true,
    },
    {
      title: 'Commission',
      key: 'commissionCost',
      className: 'text-center participant-name',
      dataIndex: 'commissionCost',
      editable: true,
    },
    {
      title: 'Total',
      className: 'text-center participant-name',
      render: renderTotal,
    },
  ];

  if (currentStep !== 1) return null;

  return (
    <div className="step-1-info">
      <h3 className="text-center fz-18 mb-16">
        <strong>Cost (${separateCost(totalCost)})</strong>
      </h3>
      <TableFinanceReport valuesColumns={valuesColumns} />
    </div>
  );
};

export default React.memo(FinanceReportStep1);
