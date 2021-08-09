import React, { useEffect, useState, useMemo } from 'react';
import { CategoryItem, MyButton, MySelectGroup } from 'components/Atoms';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwnProjectData } from 'states/project/selectors';
import { getOwnProjectJobs } from 'states/project/actions';
import { isEmpty } from 'lodash';
import './styles.scss';

const Step2 = ({
  projectId,
  onNext,
  onBack,
  buttonText,
  selectedProject,
  visible,
  title,
  description,
}) => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [listJobSelected, setListJobSelected] = useState({});

  useEffect(() => {
    setListJobSelected({});
    if (projectId) dispatch(getOwnProjectJobs(projectId, setJobs));
  }, [projectId]);

  const _handleSubmit = () => {
    onNext(Object.keys(listJobSelected).map((key) => +key));
  };

  const formatJobData = useMemo(() => {
    return [
      {
        categoryName: '',
        id: null,
        skills: jobs,
      },
    ];
  }, [jobs]);

  const handleSelectJob = (jobId) => {
    const jobTemp = jobs.find((item) => item.id === jobId);
    setListJobSelected((prevData) => {
      return {
        ...prevData,
        [jobTemp.id]: jobTemp.name,
      };
    });
  };

  const renderListJobSelected = () => {
    let xhtml = null;
    xhtml = Object.keys(listJobSelected).map((key) => (
      <CategoryItem
        key={key}
        className="skill-item flex-align-center"
        id={key}
        name={listJobSelected[key]}
        onRemove={() => {
          setListJobSelected((prevData) => {
            delete prevData[+key];
            return { ...prevData };
          });
        }}
      />
    ));
    return xhtml;
  };

  if (visible)
    return (
      <>
        <div className="text-center">
          <h4 className="title">{title}</h4>
          <p className="description">{description}</p>
        </div>

        <div className="line-item">
          <div className="label">Project</div>
          <div className="value">{selectedProject?.name}</div>
        </div>

        <MySelectGroup
          showSearch
          placeholder="Select job"
          onSelect={handleSelectJob}
          options={formatJobData}
          listItemDisable={Object.keys(listJobSelected)}
          value={null}
        />

        <div className="list-skill-selected">{renderListJobSelected()}</div>

        <div className="text-center">
          <MyButton className="btn-secondary-custom my-16" onClick={onBack}>
            Back
          </MyButton>
          <MyButton
            disabled={isEmpty(listJobSelected)}
            className="btn-primary-custom my-16"
            onClick={_handleSubmit}
          >
            {buttonText}
          </MyButton>
        </div>
      </>
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  ownProjects: selectOwnProjectData(),
});

export default connect(mapStateToProps)(Step2);

Step2.propTypes = {
  visible: PropTypes.bool,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  projectId: PropTypes.number,
};

Step2.defaultProps = {
  visible: false,
  onNext: () => {},
  title: 'Choose job',
  description: 'Choose the job that you have created.',
  buttonText: 'Choose job',
};
