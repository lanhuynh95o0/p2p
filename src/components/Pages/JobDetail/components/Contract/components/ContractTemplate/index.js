import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { MyInput, MyRadio, MyButton } from 'components/Atoms';
import { checkFormAntInvalid } from 'utilities/common';
export const OPTIONS_EXPENSE = [
  { title: 'Yes', value: 'Yes' },
  { title: 'No', value: 'No' },
];

const numberProps = {
  preventNumberKeyCode: ['-'],
  min: 0,
};

const ContractTemplate = ({ onClose, onSubmit, loading, dataInit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...dataInit });
  }, [dataInit]);

  const onFinish = (values) => {
    onSubmit({
      ...values,
      paymentStage: +values.paymentStage,
      paymentAmount: +values.paymentAmount,
      contractRate: +values.contractRate,
      estimatedContractAmount: +values.estimatedContractAmount,
      invoiceInterval: +values.invoiceInterval,
      paymentPeriod: +values.paymentPeriod,
    });
  };

  return (
    <div>
      <h2 className="t-center">
        <b>Contract template</b>
      </h2>

      <Form
        className="form mt-30"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Payment stage"
              name="paymentStage"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter payment stage' },
              ]}
            >
              <MyInput
                name="paymentStage"
                placeholder="Payment stage"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Payment amount"
              name="paymentAmount"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter payment amount' },
              ]}
            >
              <MyInput
                name="paymentAmount"
                placeholder="Payment amount"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Contract rate"
              name="contractRate"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter contract rate' },
              ]}
            >
              <MyInput
                name="contractRate"
                placeholder="Contract rate"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Estimated contract amount"
              name="estimatedContractAmount"
              className="form-item-custom"
              rules={[
                {
                  required: true,
                  message: 'Please enter estimated contract amount',
                },
              ]}
            >
              <MyInput
                name="estimatedContractAmount"
                placeholder="Estimated contract amount"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Expense reimbursed"
              name="expenseReimbursed"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter expense reimbursed' },
              ]}
              initialValue="Yes"
            >
              <MyRadio radioClassName="fw-400" options={OPTIONS_EXPENSE} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Kpi"
              name="kpi"
              className="form-item-custom"
              rules={[{ required: true, message: 'Please enter kpi' }]}
            >
              <MyInput
                name="estimatedContractAmount"
                placeholder="Estimated contract amount"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Required contract material"
              name="requiredContractMaterial"
              className="form-item-custom"
              rules={[
                {
                  required: true,
                  message: 'Please enter required contract material',
                },
              ]}
            >
              <MyInput
                name="requiredContractMaterial"
                placeholder="Required contract material"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Principle material"
              name="principleMaterial"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter principle material' },
              ]}
            >
              <MyInput
                name="principleMaterial"
                placeholder="Principle material"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Principle representative"
              name="principleRepresentative"
              className="form-item-custom"
              rules={[
                {
                  required: true,
                  message: 'Please enter principle representative',
                },
              ]}
            >
              <MyInput
                name="principleRepresentative"
                placeholder="Principle representative"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Invoice interval"
              name="invoiceInterval"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter invoice interval' },
              ]}
            >
              <MyInput
                name="invoiceInterval"
                placeholder="Invoice interval"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Payment period"
              name="paymentPeriod"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter payment period' },
              ]}
            >
              <MyInput
                name="paymentPeriod"
                placeholder="Payment period"
                type="number"
                {...numberProps}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Governing law"
              name="governingLaw"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter governing law' },
              ]}
            >
              <MyInput name="governingLaw" placeholder="Governing law" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Defects liability period"
              name="defectsLiabilityPeriod"
              className="form-item-custom"
              rules={[
                {
                  required: true,
                  message: 'Please enter defects liability period',
                },
              ]}
            >
              <MyInput
                name="defectsLiabilityPeriod"
                placeholder="Defects liability period"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Assignee"
              name="assignedEmail"
              className="form-item-custom"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter the correct format' },
              ]}
            >
              <MyInput
                name="assignedEmail"
                placeholder="Enter Assignee Email"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item className="t-center mt-10" shouldUpdate={true}>
              {() => (
                <>
                  <MyButton
                    onClick={onClose}
                    size="large"
                    className="btn-outline-custom mr-10"
                  >
                    Back
                  </MyButton>
                  <MyButton
                    htmlType="submit"
                    size="large"
                    className="btn-primary-custom"
                    disabled={checkFormAntInvalid(form) || loading}
                  >
                    Save
                  </MyButton>
                </>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContractTemplate;
