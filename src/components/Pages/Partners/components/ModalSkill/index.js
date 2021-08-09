import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {
  CategoryItem,
  MyButton,
  MySelectGroup,
  MyUploadSingle,
} from 'components/Atoms';
import { getCategoriesSkills } from 'states/common/actions';
import { createStructuredSelector } from 'reselect';
import { selectCategoriesSkills } from 'states/common/selectors';
import { connect, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';

const ModalSkill = (props) => {
  const dispatch = useDispatch();
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);

  console.log('props.categorySkills: ', props.categorySkills);

  useEffect(() => {
    dispatch(getCategoriesSkills());
  }, []);

  useEffect(() => {
    if (props.skills) {
      setSkillsSelected(
        props.skills.map((item) => ({
          ...item,
          category: item.categoryName,
          id: item.id,
        }))
      );
    }
  }, [props.skills]);

  const _removeSkill = (id) => () => {
    setSkillsSelected((oldSkills) => {
      const index = oldSkills.findIndex((_) => _.id === id);
      if (index >= 0) {
        oldSkills.splice(index, 1);
      }
      return [...oldSkills];
    });
  };

  const _selectSkill = (value) => {
    for (const category of props.categorySkills) {
      const skill = category.skills.find((skill) => skill.id === value);
      if (skill) {
        setSkillsSelected((oldSkills) => [
          ...oldSkills,
          {
            ...skill,
            category: category.categoryName,
            id: null,
            skillId: skill.id,
          },
        ]);
        break;
      }
    }
    setShowModalUpload(true);
  };

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

  const onCloseModalUploadSkill = () => {
    setShowModalUpload(false);
    setFileUploaded([]);
  };

  const onSaveAttachToSkill = () => {
    setSkillsSelected((value) => {
      value[value.length - 1].documents = fileUploaded;
      return value;
    });
    onCloseModalUploadSkill();
  };

  const handleChangeUpload = (file) => {
    setFileUploaded([file, ...fileUploaded]);
  };

  const onRemoveFile = useCallback((file) => {
    setFileUploaded(fileUploaded.filter((item) => item.id !== file.id));
  }, []);

  const _submit = () => props.onSubmit(skillsSelected);

  return (
    <div className="d-table h-100p w-100pc">
      <div className="d-table-cell va-m">
        <div className="text-center">
          <h4 className="title">Requirement skills</h4>
          <p className="description">Select skills of your company</p>
          <div className="p-8 mx-n25">
            <MySelectGroup
              dropdownClassName="dropdown-group-skill"
              showSearch={true}
              placeholder="Select skill"
              onSelect={_selectSkill}
              value={null}
              options={props.categorySkills}
              listItemDisable={skillsSelected.map((_) => _.skillId)}
            />
          </div>
          {_renderSkills}
        </div>
        {/* Modal upload attachment*/}
        <Modal
          visible={showModalUpload}
          onCancel={onCloseModalUploadSkill}
          destroyOnClose
          footer={null}
        >
          <div className="verify-skill-container">
            <div className="header">Verify skill</div>
            <div className="sub-header">
              Upload relevant documents to verify your skill
            </div>
            <MyUploadSingle
              accept=".pdf"
              height="110px"
              onChange={handleChangeUpload}
              onRemove={onRemoveFile}
            />

            <div className="mt-20 t-center">
              <Button
                onClick={onCloseModalUploadSkill}
                size="large"
                className="btn-outline-custom mr-10"
              >
                Skip
              </Button>
              <Button
                size="large"
                className="btn-primary-custom"
                onClick={onSaveAttachToSkill}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal>
        <div className="text-center pt-20">
          <MyButton
            onClick={props.onClose}
            className="btn-secondary-custom mx-10"
          >
            Back
          </MyButton>
          <MyButton onClick={_submit} className="btn-primary-custom mx-10">
            {props.buttonText}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categorySkills: selectCategoriesSkills(),
});

export default connect(mapStateToProps)(ModalSkill);

ModalSkill.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  skills: PropTypes.array,
  buttonText: PropTypes.string,
};

ModalSkill.defaultProps = {
  buttonText: 'Submit',
};
