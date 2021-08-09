import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { MyProgress, MyTable, TimeLeft } from 'components/Atoms';
import { SORT_BY_ASSIGN } from 'constants/common';
import Action from '../Action';
import * as routePath from 'routers/route-path';

const ProjectListView = ({ data, onDeleteProject, type }) => {
  const history = useHistory();
  return (
    <MyTable
      data={data}
      className="pt-8 pt-sm-16"
      columns={[
        {
          title: 'Project name',
          key: 'name',
          render: (value, row) => (
            <Button
              type="link"
              onClick={() =>
                history.push(routePath.PROJECT_DETAIL.replace(':id', row.id))
              }
            >
              {value}
            </Button>
          ),
        },
        { title: 'Code', key: 'code', align: 'center' },
        type === SORT_BY_ASSIGN[1].id && {
          title: 'Owner',
          key: 'partner',
          align: 'center',
          render: (item) => item.companyName,
        },
        {
          title: 'Timeline',
          key: 'endDate',
          render: (item, project) => <TimeLeft time={item} isComplete={project.process === 100} />,
          align: 'center',
        },
        {
          title: 'Process',
          key: 'process',
          render: (text) => <MyProgress percent={text} />,
          align: 'center',
        },
        {
          title: 'Contractors',
          key: 'participantPartnerLogo',
          render: (value) => value?.length || 0,
          align: 'center',
        },
        {
          title: 'Actions',
          key: 'action',
          align: 'center',
          render: (value, item) => (
            <Action item={item} onDeleteProject={onDeleteProject} />
          ),
        },
      ]}
    />
  );
};

export default ProjectListView;
