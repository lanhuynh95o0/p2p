import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, InputNumber } from 'antd';
import { EditableContext } from 'components/Pages/ProjectDetail/components/ModalFinanceReport/EditableRow';
import { separateCost } from 'utilities/stringHelper';

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);

  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      const data = isNaN(values[dataIndex])
        ? { [dataIndex]: record[dataIndex] }
        : { ...values };
      toggleEdit();
      handleSave({
        ...record,
        ...data,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {separateCost(children[1] || 0)}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default React.memo(EditableCell);
