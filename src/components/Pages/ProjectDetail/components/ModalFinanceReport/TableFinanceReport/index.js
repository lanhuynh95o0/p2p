import React from 'react';
import { Avatar, Table as MyTable } from 'antd';
import EditableRow from 'components/Pages/ProjectDetail/components/ModalFinanceReport/EditableRow';
import EditableCell from 'components/Pages/ProjectDetail/components/ModalFinanceReport/EditableCell';
import { useSelector } from 'react-redux';
import { commonSelector } from 'hooks/helperSelector';
import { STATE_NAME } from 'states/project/constants';
import useActions from 'hooks/useActions';
import { getAllFinanceReportSuccess } from 'states/project/actions';
import PropTypes from 'prop-types';

const TableFinanceReport = ({ valuesColumns }) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const projectsFinanceReport = useSelector(
    commonSelector(STATE_NAME, 'projectsFinanceReport')
  );
  const isLoading = useSelector(commonSelector(STATE_NAME, 'isLoading'));

  const [getAllFinanceReportSuccessAction] = useActions([
    getAllFinanceReportSuccess,
  ]);

  const handleSave = (row) => {
    const updateProjectsFinanceReport = [...projectsFinanceReport];
    const updateIndex = updateProjectsFinanceReport.findIndex(
      ({ jobId }) => jobId === row.jobId
    );
    updateProjectsFinanceReport[updateIndex] = row;
    getAllFinanceReportSuccessAction(updateProjectsFinanceReport);
  };

  const columns = [
    {
      title: '',
      key: 'participants-info',
      render: ({ participantLogo, participantName, ...report }) => (
        <div className="d-flex pl-2 align-items-center">
          <Avatar
            size={40}
            shape="circle"
            alt={participantName}
            src={participantLogo}
          />
          <div className="info ml-8">
            <p className="participant-name">{participantName}</p>
            <p className="job-name">{report?.jobName}</p>
          </div>
        </div>
      ),
    },

    ...valuesColumns,
  ];

  const mergeColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  
  return (
    <MyTable
      bordered
      components={components}
      pagination={false}
      loading={isLoading}
      columns={mergeColumns}
      dataSource={projectsFinanceReport}
      scroll={{ y: 340, x: 800 }}
    />
  );
};

TableFinanceReport.propTypes = {
  valuesColumns: PropTypes.array,
};

export default React.memo(TableFinanceReport);
