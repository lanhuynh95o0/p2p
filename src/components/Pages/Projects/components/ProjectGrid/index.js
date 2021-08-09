import React from 'react';
import { Row } from 'antd';
import ProjectCard from 'components/Organisms/ProjectCard';

const ProjectGridView = ({ data, type, onDeleteProject }) => {
  return (
    <Row className="mt-8" gutter={[16, 16]}>
      {data.map((item, key) => (
        <ProjectCard
          {...{ item, key, type, onDeleteProject, isDelete: true }}
        />
      ))}
    </Row>
  );
};

export default ProjectGridView;
