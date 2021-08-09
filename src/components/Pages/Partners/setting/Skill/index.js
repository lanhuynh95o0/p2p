import { CategoryItem, MyButton, MyModal } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import React, { useCallback, useEffect, useState } from 'react';
import ModalSkill from '../../components/ModalSkill';
import { Form } from 'antd';
import UpdateSkill from '../UpdateSkill';
import './styles.scss';

const Skill = (props) => {
  const [skills, setSkills] = useState(
    props.form.getFieldValue('skills') || props.skills
  );
  const [modalSkill, setModalSkill] = useState(false);

  const [showUpdateSkill, setShowUpdateSkill] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);

  useEffect(() => {
    setSkills(props.skills);
  }, [props.skills]);

  const _updateSkills = useCallback((skills) => {
    props.form.setFieldsValue({ skills });
  }, []);

  const _switchModalSkill = useCallback(
    (value) => () => setModalSkill(value),
    []
  );

  const _removeSkill = useCallback(
    (index) => () => {
      setSkills((value) => {
        value.splice(index, 1);
        _updateSkills(value);
        return [...value];
      });
    },
    [skills]
  );

  const _changeSkills = useCallback((value) => {
    setSkills(value);
    _updateSkills(value);
    setModalSkill(false);
  }, []);

  const toggleUpdateSkill = (skill = null) => {
    setShowUpdateSkill((prevSkill) => !prevSkill);

    if (skill) {
      setSkillSelected(skill);
      return;
    }
  };

  const _itemSkill = useCallback(
    (item, index) => (
      <CategoryItem
        key={item.id || item.skillId}
        name={item.name}
        category={item.categoryName || item.category}
        id={item.id || item.skillId}
        onRemove={_removeSkill(index)}
        // isCheck={item.status === SKILL_STATUS.VERIFY}
        status={item.status}
        onEdit={() => toggleUpdateSkill(item)}
      />
    ),
    []
  );

  // Id skill is not exist, using skillId instead

  const onUpdateSkill = (payload) => {
    toggleUpdateSkill();
    setSkills((skills) => {
      let skillsNew = [];
      if (payload) {
        skillsNew = skills.map((skill) => {
          if (skill.skillId === payload.skillId) {
            return payload;
          }
          return skill;
        });
      } else {
        skillsNew = skills.filter(
          (skill) => skill.skillId !== skillSelected.skillId
        );
      }

      _updateSkills(skillsNew);
      return [...skillsNew];
    });
  };

  return (
    <Form.Item name="skills" className="block p-10">
      <div>
        <h2 className="title skill-header">Skills</h2>
        <MyButton
          className="new-skill-button"
          onClick={_switchModalSkill(true)}
        >
          <Icon component={IconCustom.Plus} />
          New skill
        </MyButton>
      </div>
      {(skills || []).map(_itemSkill)}

      <MyModal visible={showUpdateSkill} onClose={toggleUpdateSkill}>
        <UpdateSkill
          skill={skillSelected}
          onCloseModal={toggleUpdateSkill}
          onSave={onUpdateSkill}
        />
      </MyModal>

      <MyModal visible={modalSkill} onClose={_switchModalSkill(false)}>
        <ModalSkill
          skills={skills || []}
          onClose={_switchModalSkill(false)}
          onSubmit={_changeSkills}
        />
      </MyModal>
    </Form.Item>
  );
};

export default Skill;
