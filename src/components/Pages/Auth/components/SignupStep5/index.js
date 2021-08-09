import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Modal } from 'antd';
import { CategoryItem, MySelectGroup, MyUploadSingle } from 'components/Atoms';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectCategoriesSkills } from 'states/common/selectors';
import { getCategoriesSkills } from 'states/common/actions';
import { cloneDeep, isEmpty } from 'lodash';
import './styles.scss';

const SignupStep5 = ({
  listCategorySkill,
  onContinue,
  onGoBack,
  readOnlyStep,
  values,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [showModalUpload, setShowModalUpload] = useState(false);
  const [skillSelected, setSkillSelected] = useState(null);

  const [fileUploaded, setFileUploaded] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getCategoriesSkills());
  }, []);

  useEffect(() => {
    if (isEmpty(values) || (values.skills && !values.skills.length)) {
      return;
    }
    let obj = {};
    (values.skills || []).forEach((skill) => {
      const key = skill.skillId;
      let skillTemp = {};
      listCategorySkill.map((category) => {
        const skill = category.skills.find((skill) => skill.id === key);
        if (skill) {
          skillTemp = skill;
        }
      });
      obj = {
        ...obj,
        [key]: {
          name: skillTemp.name,
          attachments: skill.attachments,
        },
      };
    });
    setData(obj);
  }, [values]);

  const onSelectSkill = (value) => {
    for (const category of listCategorySkill) {
      const skillTemp = category.skills.find((skill) => skill.id === value);
      if (skillTemp) {
        form.setFieldsValue({
          skills: null,
        });
        setData({
          ...data,
          [value]: {
            name: skillTemp.name,
            categoryName: category.categoryName,
            attachments: [],
          },
        });
        setSkillSelected(value);
        setShowModalUpload(true);
        break;
      }
    }
  };

  const onCloseModalUploadSkill = () => {
    setShowModalUpload(false);
    setSkillSelected(null);
    setFileUploaded([]);
  };

  const handleChangeUpload = (file) => {
    setFileUploaded([file, ...fileUploaded]);
  };

  const onRemoveFile = useCallback((file) => {
    setFileUploaded(fileUploaded.filter((item) => item.id !== file.id));
  }, []);

  const onSaveAttachToSkill = () => {
    setData({
      ...data,
      [skillSelected]: {
        ...data[skillSelected],
        attachments: fileUploaded,
      },
    });
    onCloseModalUploadSkill();
  };

  const handleContinue = () => {
    let payload = [];
    Object.keys(data).map((key) => {
      payload = [
        ...payload,
        {
          skillId: +key,
          status: 'Pending',
          attachments: data[key].attachments.map((attach) => ({
            id: attach.id,
            slug: attach.slug,
            name: attach.name,
          })),
        },
      ];
    });
    onContinue({ skills: payload });
  };

  const renderListSkillSelected = () => {
    let xhtml = null;
    xhtml = Object.entries(data).map(([key, item]) => (
      <CategoryItem
        className="skill-item"
        id={key}
        name={item.name}
        category={item.categoryName}
        onRemove={() => {
          const dataNew = cloneDeep(data);
          delete dataNew[key];
          setData(dataNew);
        }}
      />
    ));
    return xhtml;
  };

  return (
    <div className="wrapper-step-5">
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
            multiple
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
      <div className="header-step">What are you good at?</div>
      <div className="sub-header">
        Choose your strengths to attract partners
      </div>
      <Form className="mt-20" layout="vertical" form={form}>
        <Form.Item
          name="skills"
          className="form-item-custom"
          rules={[{ required: true, message: 'Required' }]}
        >
          <MySelectGroup
            showSearch
            placeholder="Select skill"
            disabled={readOnlyStep}
            onSelect={onSelectSkill}
            options={listCategorySkill}
            listItemDisable={Object.keys(data)}
          />
        </Form.Item>
        <div className="list-skill-selected">{renderListSkillSelected()}</div>

        <Form.Item className="t-center mt-20" shouldUpdate>
          {() => (
            <>
              <Button
                size="large"
                className="btn-outline-custom mr-10"
                onClick={onGoBack}
              >
                Back
              </Button>
              {!readOnlyStep && (
                <Button
                  disabled={isEmpty(data)}
                  size="large"
                  className="btn-primary-custom"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              )}
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  listCategorySkill: selectCategoriesSkills(),
});

export default connect(mapStateToProps, null)(SignupStep5);
