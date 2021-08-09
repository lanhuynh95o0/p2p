import React, { useCallback, useState } from 'react';
import { Collapse } from 'antd';
import './styles.scss';
import { CheckShare, FilePreview } from 'components/Atoms/index';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const FileCollapse = ({ data, onChange }) => {
  const [list, setList] = useState(data || []);

  const _renderExpandIcon = useCallback(({ isActive }) => {
    return isActive ? (
      <CaretUpOutlined className="my-icon-md icon-expand" />
    ) : (
      <CaretDownOutlined className="my-icon-md icon-expand" />
    );
  }, []);

  const _onChange = useCallback(
    (index) => (option) => onChange(option, index),
    []
  );

  const _renderItem = (item, index) => (
    <Panel
      header={
        <FilePreview
          file={item}
          fileName={`${item.name}${item.extension}`}
          showName={true}
        />
      }
      key={item.id}
    >
      <CheckShare onChange={_onChange(index)} value={item.privacy} />
    </Panel>
  );

  return (
    <div id="my-file-collapse">
      <Collapse
        defaultActiveKey={[data[0]?.id]}
        bordered={false}
        expandIcon={_renderExpandIcon}
        expandIconPosition="right"
      >
        {list.map(_renderItem)}
      </Collapse>
    </div>
  );
};

export default FileCollapse;
