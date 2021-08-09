import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';
const MyTab = ({
  tabs,
  value,
  onSwitchTab
}) => {
  return (
    <Row className='tab-custom'>
      <Col span={24} className='tab-group'>
        <Row>
          {tabs.map(pane => {
            return (
              <Col
                key={pane.key}
                span={3}
                lg={4}
                md={4}
                xs={4}
                className={`tab-item ${value === pane.key && 'tab-item-selected'}`}
                onClick={() => pane.key !== value && onSwitchTab(pane.key)}
              >
                {pane.name}
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  )
};

MyTab.propTypes = {
  tabs: PropTypes.array,
  value:  PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSwitchTab: PropTypes.func
};

MyTab.defaultProps = {
  tabs: [
    { name: 'My partners', key: 1 },
    { name: 'Projects', key: 2 },
    { name: 'Jobs', key: 3 }
  ],
  value: 1,
  onSwitchTab: () => null
};

export default MyTab;