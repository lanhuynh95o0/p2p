import React, { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { saveFinanceReport } from 'states/project/actions';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME as STATE_NAME_APP } from 'states/app/constants';
import { FINANCE_REPORT_STEP_VALUE } from 'components/Pages/ProjectDetail/constants/finance-report';
import { STATE_NAME } from 'states/project/constants';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { selectTotalCost, selectTotalSold } from 'states/project/selectors';
import { separateCost } from 'utilities/stringHelper';

const FinanceReportStep3 = ({}) => {
  const [saveFinanceReportAction] = useActions([saveFinanceReport]);
  const currentStep = useSelector(
    commonSelector(STATE_NAME_APP, 'currentStep')
  );

  const totalSell = useSelector(selectTotalSold());
  const totalCost = useSelector(selectTotalCost());
  const projectsFinanceReport = useSelector(
    commonSelector(STATE_NAME, 'projectsFinanceReport')
  );
  const { id: projectId } = useParams();

  const info = [
    {
      name: 'Sell',
      value: `$${separateCost(totalSell)}`,
    },
    {
      name: 'Cost',
      value: `$${separateCost(totalCost)}`,
      showHr: true
    },
    {
      name: 'Gross profit',
      value: `$${separateCost(totalSell - totalCost)}`,
    },
  ];

  useEffect(() => {
    if (currentStep === FINANCE_REPORT_STEP_VALUE.LAST) {
      const payload = {
        projectId: Number(projectId),
        reports: projectsFinanceReport,
      };
      saveFinanceReportAction(payload);
    }
  }, [currentStep]);

  if (currentStep !== FINANCE_REPORT_STEP_VALUE.LAST) return null;

  return (
    <div className="financial-report">
      {info.map((item) => (
        <div key={item.name} className="info-row">
          <div className={`info-price mx-25 mx-sm-50`}>
            <Row className="py-16" key={item.name}>
              <Col span={12} className="info-name text-left">
                {item.name}
              </Col>
              <Col
                span={12}
                className={`info-${
                  item.name === 'Gross profit' ? 'total' : 'content'
                } text-right`}
              >
                {item.value}
              </Col>
            </Row>
            {item.showHr && <hr />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(FinanceReportStep3);
