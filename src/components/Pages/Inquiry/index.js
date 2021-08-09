import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import {
  Breadcrumb,
  MyPagination,
  PageNotFound,
  MyModal,
} from 'components/Atoms';

import Table from './components/Table';
import Header from './components/Header';
import { FILLTER_BY_STATUS, SORT_BY_TIME } from 'constants/common';
import { useDispatch, useSelector } from 'react-redux';

import { selectInquiry } from 'states/inquiry/selectors';
import { getInquiry, changeInquiryStatus } from 'states/inquiry/actions';
import { createClient } from 'states/client/actions';

import { Card } from 'antd';
import Spin from 'components/Atoms/Spin';

import { ClientRelationshipForm } from 'components/Pages/ClientsRelationship/components';
import { messageSuccess } from 'utilities/message';

const Inquiry = () => {
  const dispatch = useDispatch();

  const inquiries = useSelector(selectInquiry());

  const [query, _setQuery] = useState({
    sortBy: SORT_BY_TIME[0].id,
    filterBy: FILLTER_BY_STATUS[0].id,
    skip: 0,
    take: 5,
    terms: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalClientForm, setModalClientForm] = useState(false);
  const [initClient, setInitClient] = useState(null);
  const setQuery = (value) => {
    if (typeof value === 'function') {
      const valueFunc = (oldValue) => {
        oldValue = value(oldValue);
        oldValue.skip = 0;
        return oldValue;
      };
      setCurrentPage(1);
      return _setQuery(valueFunc);
    } else {
      value.skip = 0;
    }
    _setQuery(value);
  };

  useEffect(() => {
    dispatch(getInquiry(query));
  }, [query]);

  const changeStatus = (s) => () => {
    dispatch(changeInquiryStatus({ ...s, query }));
  };

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _switchModalClientForm = useCallback(
    (value) => () => {
      setModalClientForm(value);
    },
    []
  );

  const clickAddClient = (data) => () => {
    setInitClient({
      name: data.name,
      email: data.email,
      inquiryId: data.id,
      phone: data.phone,
      phoneCode: data.phoneCode,
    });
    setModalClientForm(true);
  };

  const _renderList = useMemo(() => {
    if (!inquiries.list) {
      return (
        <Card className="m-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!inquiries.list.length) {
      return <PageNotFound extra="Whoops! Inquiry not found." />;
    }

    return (
      <Table
        data={inquiries.list || []}
        total={inquiries?.total || 0}
        changeStatus={changeStatus}
        clickAddClient={clickAddClient}
      />
    );
  }, [inquiries]);

  const onCreateClient = (payload) => {
    dispatch(
      createClient({ ...payload, inquiryId: initClient.inquiryId }, () => {
        dispatch(getInquiry(query));

        messageSuccess({
          content: 'Create client success',
        });
      })
    );
    _switchModalClientForm(false)();
  };

  return (
    <div className="partners-employee-list mx-n8">
      <div className="px-8 pb-16 d-table w-100p">
        <Breadcrumb
          className="d-table-cell va-m"
          path={[{ name: 'Inquiry' }]}
        />

        <br style={{ clear: 'both' }} />
      </div>

      <MyModal
        visible={modalClientForm}
        onClose={_switchModalClientForm(false)}
      >
        <ClientRelationshipForm
          onSave={onCreateClient}
          initClient={initClient}
        />
      </MyModal>

      <Header query={query} setQuery={setQuery} />
      {_renderList}
      {(inquiries?.total && (
        <div className="px-8">
          <MyPagination
            totalItem={inquiries?.total}
            currentPage={currentPage}
            pageSize={query.take}
            onChange={_onChangePagination}
          />
        </div>
      )) ||
        null}
    </div>
  );
};

export default Inquiry;
