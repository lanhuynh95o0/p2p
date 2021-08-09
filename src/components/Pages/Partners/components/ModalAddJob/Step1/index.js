import React, { useEffect, useState } from 'react';
import { MyButton, MySelect } from 'components/Atoms';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getPartnerAssignedProjects } from 'states/partner/actions';
import { createStructuredSelector } from 'reselect';
import { selectPartnerAssignedProjects } from 'states/partner/selectors';
import { findById } from 'utilities/common';

const Step1 = (props) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnerAssignedProjects());
  }, []);

  const _next = () =>
    props.onNext(findById(selectedProject, props.assignedProjects));

  if (props.visible)
    return (
      <>
        <div className="text-center">
          <h4 className="title">Choose project</h4>
          <p className="description">Select the project that you've assigned</p>
        </div>
        <div className="py-20">
          <MySelect
            options={props.assignedProjects}
            onChange={setSelectedProject}
            placeholder="Select project"
            className="select-custom-gray"
          />
        </div>
        <div className="text-center">
          <MyButton
            disabled={!selectedProject}
            className="btn-primary-custom my-16"
            onClick={_next}
          >
            Continue
          </MyButton>
        </div>
      </>
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  assignedProjects: selectPartnerAssignedProjects(),
});

export default connect(mapStateToProps)(Step1);

Step1.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
};

Step1.defaultProps = {
  visible: false,
  onNext: () => {},
};
