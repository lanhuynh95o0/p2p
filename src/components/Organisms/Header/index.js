import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Layout, Row, Col, Menu, Avatar, Dropdown } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import * as routePath from 'routers/route-path';
import { MyButton, MyModal } from 'components/Atoms';
import { Link, useHistory } from 'react-router-dom';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import Cookies from 'js-cookie';
import { TOKEN } from 'constants/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getCurrentUserSuccess } from 'states/auth/actions';
import { selectUserInfo } from 'states/auth/selectors';
import ModalCreateProject from 'components/Pages/Projects/components/ModalCreateProject';
import { showModalConfirm } from 'utilities/modal';
import ImageLogoFull from 'assets/images/logo/logo-full.png';
import ImageLogo from 'assets/images/logo/logo.png';
import { Notification } from 'components/Organisms';
import './styles.scss';
import { SCREEN } from 'constants/config';
import { selectPartnerInfo } from 'states/partner/selectors';
import { ACCOUNT_TYPE } from 'constants/account';
import { get } from 'lodash';

const { Header } = Layout;

const MENUS = {
  PROJECT: 'project'
};
const DISABLED_MENUS_PARTNER_LITE = { [MENUS.PROJECT]: true };

const SiteHeader = ({ showLogo }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  const [modalCreateProjectVisible, setModalCreateProjectVisible] = useState(
    false
  );
  const userInfo = useSelector(selectUserInfo());
  const partnerInfo = useSelector(selectPartnerInfo());

  let disabledMenus = {};
  if (partnerInfo) {
    const accountType = get(partnerInfo, 'accountType');
    if (accountType == ACCOUNT_TYPE.PARTNER_LITE) {
      disabledMenus = DISABLED_MENUS_PARTNER_LITE;
    }
  }

  useEffect(() => {
    dispatch(getCurrentUser(() => { }));
  }, []);

  const _switchModalCreateProject = useCallback(
    (value) => () => {
      setAddMenuVisible(false);
      setModalCreateProjectVisible(value);
    },
    []
  );

  const onVisibleChange = (isOpen) => {
    setOpen(isOpen);
  };

  const onAddMenuVisibleChange = (isOpen) => {
    setAddMenuVisible(isOpen);
  };

  const handleLogout = () => {
    showModalConfirm({
      title: 'Log out',
      content: 'Do you want to log out of this account?',
      cancelText: 'Cancel',
      okText: 'Log out',
      onOk: () => {
        dispatch(getCurrentUserSuccess({}));
        Cookies.remove(TOKEN);
        Cookies.remove(TOKEN, {
          domain: `.${process.env.REACT_APP_HOST_NAME}`,
        });
        history.push(routePath.LOGIN);
      },
    });
  };

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <Link to={routePath.PARTNERS_SETTING}>Profile Setting</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={routePath.API_DOCUMENT}>Dev Docs</Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu>
    ),
    []
  );

  const menuAdd = useMemo(
    () => (
      <Menu className="header-add-menu">
        {!disabledMenus[MENUS.PROJECT] && <Menu.Item
          className="header-add-item"
          onClick={_switchModalCreateProject(true)}
        >
          <Icon component={IconCustom.FolderNew} />
          Project
        </Menu.Item>}
      </Menu>
    ),
    [disabledMenus]
  );

  const subMenuTitle = useMemo(() => {
    return (
      <div className="user-info pl-10">
        <Avatar size="large" src={userInfo?.logo} />
        <span className="username mx-10 text-1-line">
          {userInfo?.companyName ||
            [userInfo?.firstname, userInfo?.lastName].filter((_) => _).join('')}
        </span>
        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </div>
    );
  }, [userInfo]);

  const [logo, setLogo] = useState(() => {
    let screenWidth = window.innerWidth;
    let logo = ImageLogoFull;

    if (screenWidth <= SCREEN.MOBILE) {
      logo = ImageLogo;
    }
    
    return logo;
  });

  const handleResizeSidebar = () => {
    if (window.innerWidth <= SCREEN.MOBILE) {
      setLogo(ImageLogo);
    } else {
      setLogo(ImageLogoFull);
    }
  }

  window.addEventListener('resize', handleResizeSidebar)

  return (
    <Header id="site-header">
      <Row>
        <Col flex="auto">
          {showLogo && (
            <Link to="/">
              <div className="logo-wrapper">
                <img width="100" src={logo} className="logo" />
              </div>
            </Link>
          )}
          {/*<SearchInput placeholder="Search projects, contractors, clients" />*/}
        </Col>
        <Row justify="end" className="m-0 header-right">
          <Col>
            <Notification />

            <Dropdown
              overlay={menuAdd}
              onVisibleChange={onAddMenuVisibleChange}
              trigger={['click']}
              placement="bottomRight"
            >
              <MyButton
                size="large"
                type="primary"
                className="btn-primary-custom"
              >
                <span className="useless-text-mobile">Add new</span>
                <Icon
                  component={
                    addMenuVisible ? IconCustom.Close : IconCustom.Plus
                  }
                />
              </MyButton>
            </Dropdown>
          </Col>
          <Dropdown overlay={menu} onVisibleChange={onVisibleChange} trigger={["hover", "click"]}>
            {subMenuTitle}
          </Dropdown>
        </Row>
      </Row>
      <MyModal
        visible={modalCreateProjectVisible}
        onClose={_switchModalCreateProject(false)}
      >
        <ModalCreateProject onClose={_switchModalCreateProject(false)} />
      </MyModal>
    </Header>
  );
};

export default SiteHeader;
