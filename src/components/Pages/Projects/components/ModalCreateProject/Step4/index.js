import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MyButton, MyModal, MySelect } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createClient, getClients } from 'states/client/actions';
import { createStructuredSelector } from 'reselect';
import { selectClientData } from 'states/client/selectors';
import { ClientRelationshipForm } from 'components/Pages/ClientsRelationship/components';

const Step4 = (props) => {
  const dispatch = useDispatch();
  const isCreateNewClientSuccessful = useRef(false);
  const [clients, setClients] = useState([]);
  const [clientSelected, setClientSelected] = useState(
    props.clientId || undefined
  );
  const [showAddClient, setShowAddClient] = useState(false);

  useEffect(() => {
    _fetchClients();
  }, []);

  useEffect(() => {
    if (props.clients?.result?.length) {
      const list = props.clients.result.map((_) => ({
        id: _.id,
        name: _.name,
        icon: _.logoUrl,
      }));
      if (isCreateNewClientSuccessful.current) setClientSelected(list[0].id);
      setClients(list);
    }
  }, [props.clients]);

  const _fetchClients = useCallback(() => dispatch(getClients({})), []);

  const _switchAddClient = useCallback(
    (value) => () => {
      setShowAddClient(value);
    },
    []
  );

  const _onCreateClient = (values) => {
    isCreateNewClientSuccessful.current = true;
    dispatch(createClient(values, () => _fetchClients()));
    _switchAddClient(false)();
  };

  const _onSubmit = () => {
    props.onNext(clientSelected);
  };

  if (props.visible)
    return (
      <>
        <div className="text-center">
          <h4 className="title">Share to client</h4>
          <p className="description">
            Select clients in your lists or create a new one or you can skip for
            later
          </p>
          <div className="pb-20">
            <MySelect
              value={clientSelected}
              onChange={setClientSelected}
              placeholder="Select client to share"
              className="select-custom-gray max-w-400"
              showSearch
              allowClear
              options={clients}
            />
            <div className="py-20 line-text max-w-400">
              <div className="line" />
              <span className="label">or</span>
            </div>
            <MyButton
              className="btn-secondary-custom my-btn-sm"
              onClick={_switchAddClient(true)}
            >
              <Icon component={IconCustom.Plus} />
              Add new client
            </MyButton>
          </div>
        </div>
        <div className="text-center">
          <MyButton
            onClick={props.onBack}
            className="btn-secondary-custom mx-10"
          >
            Back
          </MyButton>
          <MyButton onClick={_onSubmit} className="btn-primary-custom mx-10">
            Complete
          </MyButton>
        </div>
        <MyModal visible={showAddClient} onClose={_switchAddClient(false)}>
          <ClientRelationshipForm onSave={_onCreateClient} />
        </MyModal>
      </>
    );
  return null;
};

const mapStateToProps = createStructuredSelector({
  clients: selectClientData(),
});

export default connect(mapStateToProps)(Step4);

Step4.propTypes = {
  visible: PropTypes.bool,
  onNext: PropTypes.func,
  clientId: PropTypes.number,
};

Step4.defaultProps = {
  visible: false,
  onNext: () => {},
};
