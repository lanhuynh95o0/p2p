import React, { useState, useCallback } from 'react';
import { Button, Modal, Checkbox } from 'antd';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { ClientRelationshipForm } from 'components/Pages/ClientsRelationship/components';
import './styles.scss';
import * as routePath from 'routers/route-path';

const SignupStep6 = ({ onGoBack, onContinue }) => {
  const [showAddClient, setShowAddClient] = useState(false);
  const [listClient, setListClient] = useState([]);
  const [isAccept, setIsAccept] = useState(false);

  const switchAddClient = useCallback(
    (value) => () => {
      setShowAddClient(value);
    },
    []
  );

  const onCreateClient = (values) => {
    setListClient([values, ...listClient]);
    switchAddClient(false)();
  };

  const deleteClient = (item) => {
    setListClient(
      listClient.filter(
        (client) =>
          client.name !== item.name &&
          client.email !== item.email &&
          client.logoUrl !== item.logoUrl
      )
    );
  };

  return (
    <div className="wrapper-step-6">
      <Modal
        width="50vw"
        visible={showAddClient}
        footer={null}
        destroyOnClose
        onCancel={switchAddClient(false)}
        className="my-modal"
      >
        <ClientRelationshipForm onSave={onCreateClient} />
      </Modal>

      <div className="header-step">Terms and Conditions</div>

      <div className="list-client-selected">
        {listClient.map((item) => (
          <div key={item.email} className="client-item">
            <span className="name">{item.name}</span>
            <Icon
              component={IconCustom.Close}
              className="icon-close"
              onClick={() => deleteClient(item)}
            />
          </div>
        ))}
      </div>

      <br />
      <div className="help-text">
        <Checkbox
          className="mr-10 check-box-custom"
          onChange={(e) => setIsAccept(e.target.checked)}
          checked={isAccept}
        />
        I accept EdgeB2B’s{' '}
        <a className="link" href={routePath.TERM_AND_CONDITION} target="_blank">
          Terms of Service
        </a>{' '}
        and{' '}
        <a className="link" href={routePath.POLICY} target="_blank">
          Privacy Policy
        </a>
      </div>

      <div className="t-center mt-20">
        <Button
          onClick={onGoBack}
          size="large"
          className="btn-outline-custom mr-10"
        >
          Back
        </Button>
        <Button
          onClick={() => onContinue({ clients: listClient })}
          size="large"
          className="btn-primary-custom"
          disabled={!isAccept}
        >
          Complete
        </Button>
      </div>
    </div>
  );
};
export default SignupStep6;
