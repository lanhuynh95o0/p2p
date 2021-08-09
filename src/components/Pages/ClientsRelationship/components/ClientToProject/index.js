import React, { useState } from 'react';
import { MyButton, MySelect } from 'components/Atoms';
import PropTypes from 'prop-types';

const ClientToProject = ({
  listOwnProjects,
  inviteClient,
  subTitle
}) => {
  const [projectSelected, setProjectSelected] = useState(undefined);

  return (
    <div className="text-center view-content">
      <div className="title">Choose projects</div>
      <div className="description">
        {subTitle}
      </div>

      <div className="my-20">
        <MySelect
          onChange={setProjectSelected}
          value={projectSelected}
          options={listOwnProjects}
          showSearch
          allowClear
          className="select-custom-gray max-w-350"
          placeholder="Select project"
        />
      </div>
      <div className="t-center mt-30">
        <MyButton
          onClick={() => inviteClient(projectSelected)}
          className="btn-primary-custom"
          disabled={!projectSelected}
        >
          Complete
        </MyButton>
      </div>
    </div>
  );
};

ClientToProject.propTypes = {
  listOwnProjects: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inviteClient: PropTypes.func,
  subTitle: PropTypes.string
};
ClientToProject.defaultProps = {
  listOwnProjects: [],
  inviteClient: () => null,
  subTitle: 'Select the project that you’ve created to share to client'
};

export default ClientToProject;
