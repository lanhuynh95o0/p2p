import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Input, MyButton } from 'components/Atoms';
import { ACCOUNT_TYPE } from 'constants/account';
import { useHistory, useLocation } from 'react-router-dom';
import { debounced } from 'utilities/common';
import useActions from 'hooks/useActions';
import { generateAPIKey } from 'states/common/actions';

const APIManagement = ({ form, partnerInfo, profile }) => {
  const history = useHistory();
  const location = useLocation();

  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateAPIKeyAction = useActions(generateAPIKey);

  useEffect(() => {
    if (location.hash === '#api-key') {
      if (partnerInfo?.accountType === ACCOUNT_TYPE.PARTNER_PREMIUM) {
        debounced(() => {
          document
            .getElementById(location.hash.replace('#', ''))
            .scrollIntoView();
          history.replace(location.pathname);
        });
      } else if (partnerInfo.accountType) {
        history.replace(location.pathname);
      }
    }
  }, [partnerInfo]);

  const handleGenerateApiKey = () => {
    setGenerating(true);
    generateAPIKeyAction(
      (data) => {
        form.setFieldsValue({
          apiKey: data,
        });
        setGenerating(false);
        setGenerated(true);
      },
      () => {
        setGenerating(false);
      }
    );
  };

  const revert = () => {
    form.setFieldsValue({
      apiKey: profile.apiKey,
    });
    setGenerated(false);
  };

  if (
    !partnerInfo ||
    !partnerInfo.accountType ||
    partnerInfo.accountType !== ACCOUNT_TYPE.PARTNER_PREMIUM
  ) {
    return null;
  }

  return (
    <div id="api-key" className="block p-10">
      <h2 className="title">API Management</h2>
      <Row className="m-n8" align="middle">
        <Col flex="auto" className="pl-8 pr-4">
          {/* First name */}
          <Form.Item name="apiKey" label="API key" className="form-item-custom">
            <Input
              type="textarea"
              name="API key"
              className="input-custom info-input"
              readOnly
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col className="pr-8 pl-4">
          <MyButton
            style={{ minWidth: '110px' }}
            loading={generating}
            onClick={!generated ? handleGenerateApiKey : revert}
          >
            {!generated ? 'Regenerate' : 'Revert'}
          </MyButton>
        </Col>
      </Row>
    </div>
  );
};

export default APIManagement;
