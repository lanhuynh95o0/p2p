import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MyTab, MyButton, Breadcrumb, MyFilterColumn } from 'components/Atoms';
import {
  TYPE_REPORT,
  COL_PARTNER,
  COL_PROJECT,
  COL_JOB,
  SEARCH_PARAM,
} from './constants';
import { ReportItem } from './components';
import { useDispatch, connect, useSelector } from 'react-redux';
import { getDynamicReports, exportToCsv } from 'states/dynamic-report/actions';
import { createStructuredSelector } from 'reselect';
import { selectReportData } from 'states/dynamic-report/selectors';
import { selectPartnerInfo } from 'states/partner/selectors';
import { downloadCsvBase64 } from 'utilities/file';

const DynamicReport = ({ reportData }) => {
  const dispatch = useDispatch();

  const [tabCurrent, setTabCurrent] = useState('participants');
  const [columnCurrent, setColumnCurrent] = useState(COL_PARTNER);
  const [searchParams, setSearchParams] = useState(SEARCH_PARAM);

  const info = useSelector(selectPartnerInfo());

  useEffect(() => {
    dispatch(getDynamicReports(searchParams, tabCurrent));
  }, [searchParams, tabCurrent]);

  const onSwitchStab = (tab) => {
    switch (tab) {
      case 'participants':
        setColumnCurrent(COL_PARTNER);
        break;
      case 'projects':
        setColumnCurrent(COL_PROJECT);
        break;
      case 'jobs':
        setColumnCurrent(COL_JOB);
        break;
      default:
        break;
    }
    setSearchParams(SEARCH_PARAM);
    setTabCurrent(tab);
  };

  const checkShowColumn = useMemo(() => {
    return columnCurrent.filter((column) => column.selected);
  }, [columnCurrent]);

  const onExportCsv = () => {
    const columns = columnCurrent
      .filter((col) => col.selected)
      .map((col) => col.key);
    const payload = {
      type: tabCurrent,
      properties: columns.join(','),
    };
    dispatch(
      exportToCsv(payload, (str) => {
        downloadCsvBase64(str, tabCurrent);
      })
    );
  };

  const renderContent = () => {
    if (!info?.accountType) return null;

    if (info.accountType === 'PartnerLite') {
      return (
        <>
          <div className="px-8 pb-16 d-table w-100p">
            <Breadcrumb
              className="d-table-cell va-m"
              path={[{ name: 'Dynamic reports' }]}
            />
          </div>
          <div style={{ fontWeight: 500, textAlign: 'center', fontSize: 16 }}>
            This function is not available for current subscription package.
          </div>
        </>
      );
    }

    return (
      <>
        <div className="px-8 pb-16 d-table w-100p">
          <Breadcrumb
            className="d-table-cell va-m"
            path={[{ name: 'Dynamic reports' }]}
          />

          <div className="ml-40 f-right">
            <MyFilterColumn
              options={columnCurrent}
              onChange={(data) => setColumnCurrent(data)}
              className="f-right"
            />
          </div>

          <MyButton
            className="btn-primary-custom f-right"
            onClick={onExportCsv}
          >
            Export to CSV
          </MyButton>
        </div>

        <MyTab
          value={tabCurrent}
          tabs={TYPE_REPORT}
          onSwitchTab={onSwitchStab}
        />
        <ReportItem
          reportData={reportData}
          columns={checkShowColumn}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  };

  return renderContent();
};

const mapStateToProps = createStructuredSelector({
  reportData: selectReportData(),
});

export default connect(mapStateToProps, null)(DynamicReport);
