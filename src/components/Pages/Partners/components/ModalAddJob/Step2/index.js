import React, { useEffect, useState } from 'react';
import { MyButton, MySelect } from 'components/Atoms';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getPartnerAssignedJobs } from 'states/partner/actions';

const Step2 = (props) => {
  const dispatch = useDispatch();
  const [jobSelected, setJobSelected] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (props.project?.id)
      dispatch(getPartnerAssignedJobs(props.project.id, setJobs));
  }, [props.project?.id]);

  const _onContinue = () => props.onNext(jobSelected);

  return (
    <div style={{ display: !props.visible && 'none' }}>
      <div className="text-center">
        <h4 className="title">Choose jobs</h4>
        <p className="description">
          Select the jobs that you want to display in profile
        </p>
      </div>
      <div className="py-20">
        <div className="my-project">
          <span>Project: </span>
          <span>{props.project?.name}</span>
        </div>
        <MySelect
          placeholder="Select jobs"
          options={jobs}
          onChange={setJobSelected}
          className="select-custom-gray"
        />
      </div>
      <div className="text-center">
        <MyButton
          disabled={!jobSelected}
          onClick={_onContinue}
          className="btn-primary-custom mx-10"
        >
          Complete
        </MyButton>
      </div>
    </div>
  );
};

export default Step2;

Step2.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  project: PropTypes.object,
};

Step2.defaultProps = {
  visible: false,
  onNext: () => {},
  onBack: () => {},
};
