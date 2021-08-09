import React, { useState, useEffect } from 'react';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { FilePreview, MyUploadSingle, MyButton } from 'components/Atoms';
import { showModalConfirm } from 'utilities/modal';
import { cloneDeep } from 'lodash';
import { getTimeFormatNormal } from 'utilities/time';
import { SKILL_STATUS } from 'constants/common';
import './styles.scss';

const UpdateSkill = ({ skill, onCloseModal, onSave }) => {
  const [fileUploaded, setFileUploaded] = useState([]);
  const [skillTemp, setSkillTemp] = useState(null);

  useEffect(() => {
    if (!skill) {
      return;
    }

    const skillNew = cloneDeep(skill);
    if (!Array.isArray(skillNew.documents)) {
      skillNew.documents = [];
    } else {
      skillNew.documents = skillNew.documents.map((document) => ({
        ...document.attachment,
        expireDate: document.expireDate,
        status: document.status,
      }));
    }

    setSkillTemp(skillNew);
  }, [skill]);

  const onUpload = (data) => {
    setFileUploaded((prevValue) => {
      prevValue.push(data);
      return prevValue;
    });
  };

  const onRemove = (data) => {
    setFileUploaded((prevValue) => {
      const index = prevValue.findIndex((_) => _.id === data.id);
      if (index >= 0) {
        prevValue.splice(index, 1);
      }
      return prevValue;
    });
  };

  const deleteSkill = () => {
    showModalConfirm({
      title: 'Remove skill',
      content: 'Are you sure you want remove this skill?',
      cancelText: 'Cancel',
      okText: 'Accept',
      onOk: () => {
        setSkillTemp(null);
      },
    });
  };

  const deleteDocument = (document) => {
    showModalConfirm({
      title: 'Remove document',
      content: 'Are you sure you want remove this document?',
      cancelText: 'Cancel',
      okText: 'Accept',
      onOk: () => {
        setSkillTemp((prevSkill) => {
          return {
            ...prevSkill,
            documents: prevSkill.documents.filter(
              (item) => item.id !== document.id
            ),
          };
        });
      },
    });
  };

  const handleSave = () => {
    const payload = skillTemp
      ? {
        ...skillTemp,
        documents: [...skillTemp.documents, ...fileUploaded],
      }
      : null;
    onSave(payload);
  };

  return (
    <div className="update-skill-page">
      <div className="header">Update skill</div>
      {skillTemp?.rejectReason && (
        <div className="sub-header">
          Your skill has been rejected with the reason “
          {skillTemp?.rejectReason || ''}”. Please replace by other documents or
          add other skills
        </div>
      )}

      <div className="content">
        {skillTemp && (
          <>
            <div className="title">General Information</div>
            <div className="line-item">
              <div className="info">
                <div className="name">{skillTemp?.name}</div>
                <div className="sub-name">{skillTemp?.categoryName}</div>
              </div>
              <div className="action">
                <Icon
                  onClick={deleteSkill}
                  component={IconCustom.Trash}
                  className="my-icon-md icon-delete"
                />
              </div>
            </div>

            <div className="title">Documents</div>
            {(skillTemp?.documents || []).map((document) => (
              <div key={document.id} className="line-item">
                <FilePreview fileName={document.extension} />
                <div className="info">
                  <div className="name">{document.displayName}</div>
                  <div className={skillTemp?.status}>
                    {skillTemp?.status}
                    {skillTemp?.status === SKILL_STATUS.VERIFIED &&
                      document.expireDate && (
                        <span>
                          {' '}
                          - {getTimeFormatNormal(document.expireDate)}
                        </span>
                      )}
                  </div>
                </div>
                <div className="action">
                  <Icon
                    onClick={() => deleteDocument(document)}
                    component={IconCustom.Trash}
                    className="my-icon-md icon-delete"
                  />
                </div>
              </div>
            ))}

            <div className="mt-20">
              <MyUploadSingle
                accept=".pdf"
                onChange={onUpload}
                onRemove={onRemove}
                multiple={true}
              />
            </div>
          </>
        )}

        <div className="t-center mt-30">
          <MyButton
            size="large"
            className="btn-outline-custom mr-10"
            onClick={onCloseModal}
          >
            Back
          </MyButton>
          <MyButton
            size="large"
            className="btn-primary-custom"
            onClick={handleSave}
          >
            Save
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkill;
