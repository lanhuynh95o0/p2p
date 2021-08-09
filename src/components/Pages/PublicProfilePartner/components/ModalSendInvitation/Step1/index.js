import React, { useEffect, useMemo, useState } from 'react';
import { MyButton, MySelect } from 'components/Atoms';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwnProjectData } from 'states/project/selectors';
import { getOwnProject } from 'states/project/actions';
import { PROJECT_OWN_FILTER_TYPE } from 'constants/project';

const Step1 = (props) => {
  const dispatch = useDispatch();
  const listProject = useMemo(
    () => (props.ownProjects?.length && props.ownProjects) || [],
    [props.ownProjects]
  );

  const [selectedProject, setSelectedProject] = useState(null);
  // const [selectedProject, setSelectedProject] = useState(listProject[0]?.id);

  useEffect(() => {
    dispatch(getOwnProject(PROJECT_OWN_FILTER_TYPE.JOB));
  }, []);

  const _handleSubmit = () => {
    props.onNext(listProject.find(item => item.id === selectedProject));
  };

  if (props.visible)
    return (
      <>
        <div className="text-center">
          <h4 className="title">{props.title}</h4>
          <p className="description">{props.description}</p>
        </div>
        <MySelect
          placeholder='Select project'
          className="select-custom-gray"
          value={selectedProject}
          onChange={setSelectedProject}
          options={listProject}
        />
        <div className="text-center">
          <MyButton
            disabled={!selectedProject}
            type="primary"
            htmlType="submit"
            className="btn-primary-custom my-16"
            onClick={_handleSubmit}
          >
            {props.buttonText}
          </MyButton>
        </div>
      </>
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  ownProjects: selectOwnProjectData(),
});

export default connect(mapStateToProps)(Step1);

Step1.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
};

Step1.defaultProps = {
  visible: false,
  onNext: () => {},
  title: 'Choose project',
  description: 'Choose the project that you have created.',
  buttonText: 'Choose project',
};
