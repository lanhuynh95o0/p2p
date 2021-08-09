import React, { useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ImageLogoFull from 'assets/images/logo/logo-full.png';
import ImageLogo from 'assets/images/logo/logo.png';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import menu from './menu';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { selectPartnerInfo } from 'states/partner/selectors';
import { get } from 'lodash';
import './styles.scss';
import { ACCOUNT_TYPE } from 'constants/account.js';
import { DISABLED_FOR_PARTNER_LITE } from 'routers/route-path';
import { SCREEN } from 'constants/config';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const history = useHistory();
  const location = useLocation();
  const partnerInfo = useSelector(selectPartnerInfo());

  const menuSelected = useMemo(() => {
    const { pathname } = location;
    for (const item of menu) {
      if (
        item.matchPath &&
        pathname.indexOf(item.matchPath) > -1 &&
        item.parentPath
      ) {
        const findMenu = menu.find((el) => el.path === item.parentPath);
        if (findMenu) {
          return {
            selectKey: [findMenu.name],
            openKey: [findMenu.name],
          };
        }
      }
      if (item.path === pathname) {
        return {
          selectKey: [item.name],
          openKey: [item.name],
        };
      }
      if (item.children?.length) {
        for (const itemSub of item.children) {
          if (itemSub.path === pathname) {
            return {
              selectKey: [`${item.name}-${itemSub.name}`],
              openKey: [item.name],
            };
          }
        }
      }
    }

    return {
      selectKey: [''],
      openKey: [''],
    };
  }, [location]);

  const [collapsed, setCollapse] = useState(() => {
    let screenWidth = window.innerWidth;
    let status = false;

    if (screenWidth <= SCREEN.MOBILE) {
      status = true;
    }
    
    return status;
  });

  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };

  const onCollapseMobile = () => {
    let screenWidth = window.innerWidth;
    if (screenWidth <= SCREEN.MOBILE && collapsed == false) {
      setCollapse(true);
    }
  }

  const onClickMenuItem = (path) => () => {
    history.push(path);
  };

  let disabledPaths = [];
  if (partnerInfo) {
    const accountType = get(partnerInfo, 'accountType');
    if (accountType == ACCOUNT_TYPE.PARTNER_LITE) {
      disabledPaths = DISABLED_FOR_PARTNER_LITE;
    }
  }

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    let screenWidth = window.innerWidth;
    let screenWeb = 200;

    if (screenWidth <= SCREEN.MOBILE) {
      screenWeb = "100%";
    }
    
    return screenWeb;
  });

  const renderMenu = () => {
    return (
      <Menu
        selectedKeys={menuSelected.selectKey}
        defaultOpenKeys={menuSelected.openKey}
        mode="inline"
        id="sidebar-menu-custom"
        expandIcon={({ isOpen }) => {
          return (
            <div className="d-inline-block f-right">
              {isOpen ? (
                <CaretUpOutlined className="icon-expand" />
              ) : (
                <CaretDownOutlined className="icon-expand" />
              )}
            </div>
          );
        }}
      >
        {menu.filter(m => !disabledPaths.includes(m.path)).map((m) => {
          if (m.children) {
            return renderSubMenu(m);
          }
          return renderMenuItem(m);
        })}
      </Menu>
    );
  };

  const renderSubMenu = (data) => {
    return (
      <SubMenu
        key={data.name}
        icon={<Icon component={data.icon} className="my-menu-icon" />}
        title={data.name}
      >
        {data.children.map((d) => renderMenuItem(d, true, data))}
      </SubMenu>
    );
  };

  const renderMenuItem = (data, isSub, parent) => {
    if (!data.showMenu) {
      return null;
    }

    if (
      data.roles &&
      !data.roles.find((role) => role === get(partnerInfo, 'role'))
    ) {
      return null;
    }
    return (
      <Menu.Item
        key={!isSub ? data.name : `${parent.name}-${data.name}`}
        icon={
          <Icon
            component={isSub ? IconCustom.ChervonRight : data.icon}
            className="my-menu-icon"
          />
        }
        onClick={onClickMenuItem(data.path)}
      >
        {data.name.split('_')[0]}
      </Menu.Item>
    );
  };

  const handleResizeSidebar = () => {
    if (window.innerWidth <= SCREEN.MOBILE) {
      setSidebarWidth("100%");
    } else {
      setSidebarWidth(200);
    }
  }

  window.addEventListener('resize', handleResizeSidebar)

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsedWidth={56}
      width={sidebarWidth}
      id="site-sidebar"
      onClick={onCollapseMobile}
      trigger={
        <Icon
          component={
            collapsed ? IconCustom.ChervonRight : IconCustom.ChervonLeft
          }
          className="my-menu-icon"
        />
      }
    >
      <Link to="/">
        <div className="logo-wrapper">
          <img src={collapsed ? ImageLogo : ImageLogoFull} className="logo" />
        </div>
      </Link>
      {renderMenu()}
    </Sider>
  );
};

export default SideBar;
