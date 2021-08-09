import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, MyPagination, PageNotFound } from 'components/Atoms';
import ContractGrid from './components/ContractGrid';
import ContractList from './components/ContractList';
import ContractHeader from './components/ContractHeader';
import { SORT_BY_ASSIGN, SORT_BY_TIME, VIEW_MODE } from 'constants/common';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card } from 'antd';
import Spin from 'components/Atoms/Spin';
import { getContracts } from 'states/contract/actions';
import { selectContracts } from 'states/contract/selectors';
import 'assets/css/listGrid.scss';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import { CONTRACT_DETAIL } from 'routers/route-path';

const Contracts = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, _setQuery] = useState({
    assignBy: SORT_BY_ASSIGN[0].id,
    sortBy: SORT_BY_TIME[0].id,
    skip: 0,
    take: 5,
    terms: '',
  });
  const [view, setView] = useState(VIEW_MODE.GRID);
  const [currentPage, setCurrentPage] = useState(1);
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
    dispatch(getContracts(query));
  }, [query]);

  const _changeView = useCallback((value) => () => setView(value), []);

  const _onChangePagination = useCallback((data) => {
    const { current, ...rest } = data;
    setCurrentPage(current);
    _setQuery((oldQuery) => ({ ...oldQuery, ...rest }));
  }, []);

  const _viewDetail = useCallback(
    (item) => () => {
      history.push(CONTRACT_DETAIL.replace(':id', item.id));
    },
    []
  );

  const _renderList = useMemo(() => {
    if (!props.contracts.list) {
      return (
        <Card className="my-8 text-center p-20">
          <Spin />
        </Card>
      );
    }
    if (!props.contracts.list.length) {
      return <PageNotFound extra="Whoops! Contract not found." />;
    }
    return view === VIEW_MODE.GRID ? (
      <ContractGrid data={props.contracts.list} onViewDetail={_viewDetail} />
    ) : (
      <ContractList
        data={props.contracts.list || []}
        total={props.contracts?.total || 0}
        onViewDetail={_viewDetail}
      />
    );
  }, [view, props.contracts]);

  return (
    <div id="my-grid-list" className="contract-grid-list">
      <div className="breadcrumb">
        <Breadcrumb path={[{ name: 'Contracts' }]} />
      </div>
      <ContractHeader
        view={view}
        onChangeView={_changeView}
        query={query}
        setQuery={setQuery}
      />
      {_renderList}
      {(props.contracts?.total && (
        <MyPagination
          totalItem={props.contracts?.total}
          currentPage={currentPage}
          pageSize={query.take}
          onChange={_onChangePagination}
        />
      )) ||
        null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  contracts: selectContracts(),
});

export default connect(mapStateToProps)(Contracts);
