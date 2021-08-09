import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MyModal, MyButton, MyInput } from 'components/Atoms';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { updateFile } from 'states/common/actions';
import { messageSuccess } from 'utilities/message';

const ModalUpdateAttachment = (props) => {
    const dispatch = useDispatch();
    const {
        attachment,
        visible,
        onClose,
        onSuccess
    } = props;
    const [form] = Form.useForm();
    const [formValid, setFormValid] = useState(false);
    console.log(attachment);

    useEffect(() => {
        if (!attachment) return;
        form.setFieldsValue({
            displayName: attachment.displayName,
        });
        setFormValid(true);
    }, [form, attachment]);

    const onSubmit = () => {
        const updatedAttachment = form.getFieldsValue();
        dispatch(updateFile(
            attachment.id,
            updatedAttachment,
            () => {
                const isContinue = !onSuccess || onSuccess(updatedAttachment, attachment);
                if (!isContinue) return;
                messageSuccess({
                    content: 'Successfully updated attachment'
                });
            },
        ));
    };

    const checkFormValid = () => {
        const { displayName } = form.getFieldsValue();
        const isFormValid = !!displayName;
        setFormValid(isFormValid);
    };

    const onDisplayNameChanged = (value) => {
        checkFormValid();
    };

    return (attachment &&
        <MyModal width={'40%'} height={'60vh'} visible={visible} onClose={onClose}>
            <div className={`h-100p`}>
                <div className="view-content">
                    <div className="text-center">
                        <h4 className="title">Update attachment</h4>
                    </div>
                    <Form layout="vertical" form={form}>
                        <Form.Item
                            required
                            label="Display name"
                            name="displayName"
                            className="form-item-custom"
                            rules={[
                                { type: 'required', message: 'Please enter the display name', required: true },
                            ]}
                        >
                            <MyInput placeholder="Enter display name" onChange={onDisplayNameChanged} />
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        <MyButton
                            disabled={!formValid}
                            onClick={onSubmit}
                            className="btn-primary-custom mt-10"
                        >
                            Submit
                        </MyButton>
                    </div>
                </div>
            </div>
        </MyModal>
    ) || null;
};

export default ModalUpdateAttachment;

ModalUpdateAttachment.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
    attachment: PropTypes.object,
};

ModalUpdateAttachment.defaultProps = {
    visible: false
};