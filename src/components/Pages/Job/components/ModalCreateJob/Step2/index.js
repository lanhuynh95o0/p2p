import React, { useEffect, useMemo, useState } from 'react';
import { CategoryItem, MyButton, MySelectGroup } from 'components/Atoms';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getCategoriesSkills } from 'states/common/actions';
import { createStructuredSelector } from 'reselect';
import { selectCategoriesSkills } from 'states/common/selectors';

const Step2 = (props) => {
  const [skillsSelected, setSkillsSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.categorySkills.length) return;
    dispatch(getCategoriesSkills());
  }, []);

  useEffect(() => {
    if (props.skills?.length) {
      setSkillsSelected(
        props.skills.map((skill) => ({
          id: skill.id,
          name: skill.name,
          category: skill.categoryName,
        }))
      );
    }
  }, [props.skills]);

  const _selectSkill = (value) => {
    for (const category of props.categorySkills) {
      const skill = category.skills.find((skill) => skill.id === value);
      if (skill) {
        setSkillsSelected((oldSkills) => [
          ...oldSkills,
          { ...skill, category: category.categoryName },
        ]);
        break;
      }
    }
  };

  const _removeSkill = (id) => () => {
    setSkillsSelected((oldSkills) => {
      const index = oldSkills.findIndex((_) => _.id === id);
      if (index >= 0) {
        oldSkills.splice(index, 1);
      }
      return [...oldSkills];
    });
  };

  const _onContinue = () => props.onNext(skillsSelected);

  const _renderSkills = useMemo(() => {
    if (skillsSelected?.length) {
      return skillsSelected.map((skill) => (
        <CategoryItem
          key={skill.id}
          id={skill.id}
          name={skill.name}
          category={skill.category}
          onRemove={_removeSkill(skill.id)}
        />
      ));
    }

    return null;
  }, [skillsSelected]);

  return (
    <div style={{ display: !props.visible && 'none' }}>
      <div className="text-center">
        <h4 className="title">Requirement skills</h4>
        <p className="description">Select skills that you need for this job</p>
        <div className="p-8">
          <MySelectGroup
            dropdownClassName="dropdown-group-skill"
            showSearch={true}
            placeholder="Select skill"
            onSelect={_selectSkill}
            value={null}
            options={props.categorySkills}
            listItemDisable={skillsSelected.map((_) => _.id)}
          />
        </div>
        {_renderSkills}
      </div>
      <div className="text-center pt-20">
        <MyButton onClick={props.onBack} className="btn-secondary-custom mx-10">
          Back
        </MyButton>
        <MyButton
          disabled={!skillsSelected.length}
          onClick={_onContinue}
          className="btn-primary-custom mx-10"
        >
          {props.buttonText}
        </MyButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categorySkills: selectCategoriesSkills(),
});

export default connect(mapStateToProps)(Step2);

Step2.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  skills: PropTypes.array,
  buttonText: PropTypes.string,
};

Step2.defaultProps = {
  visible: false,
  onNext: () => {},
  onBack: () => {},
  skill: [],
  buttonText: 'Continue',
};
