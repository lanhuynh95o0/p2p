import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import './styles.scss';

import * as routePath from 'routers/route-path';

import { capitalizeFirstLetter } from 'utilities/stringHelper';

const listIgnore = ['relationship', 'subscriptions'];

const MyBreadcrumb = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const checkCanClick = (routes, r, idx) => {
    if (routes.length === idx || listIgnore.includes(r)) {
      return null;
    }
    return true;
  };

  const onClick = (routes, r, idx) => () => {
    const isClick = checkCanClick(routes, r, idx);

    if (!isClick) {
      return null;
    }

    const path = `/${routes.slice(0, idx).join('/')}`;

    history.push(path);
  };

  if (pathname === routePath.HOME) {
    return null;
  }

  const handleClickPath = (path) => () => {
    if (path) history.push(path);
  };

  const routes = pathname.split('/').slice(1);

  return (
    <Breadcrumb
      className={`mb-20 my-breadcrumb ${props.className || ''}`}
      separator=">"
    >
      {props.path
        ? props.path.map((item, idx) => {
            const isLastChild = idx + 1 === props.path.length;
            if (item)
              return (
                <Breadcrumb.Item
                  key={idx}
                  onClick={handleClickPath(props.path.link)}
                >
                  <a
                    href={item?.link}
                    className={`my-breadcrumb-item ${isLastChild && 'active'}`}
                  >
                    {item.name}
                  </a>
                </Breadcrumb.Item>
              );
          })
        : routes.map((r, idx) => {
            const isClick =
              checkCanClick(routes, r, idx) && idx < routes.length - 1;
            const name = capitalizeFirstLetter(r);

            return (
              <Breadcrumb.Item key={idx} onClick={onClick(routes, r, idx + 1)}>
                {isClick ? <a>{name}</a> : name}
              </Breadcrumb.Item>
            );
          })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;

MyBreadcrumb.propTypes = {
  path: PropTypes.array,
};
