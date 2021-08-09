import React from 'react';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss';
import { ImgCrop } from '..';
import { COLORS } from 'constants/config';
import { uploadFile } from 'states/common/actions';
import { useDispatch } from 'react-redux';

const MyUploadAvatar = ({ height, onChange, disabled, imageSelected }) => {
  const dispatch = useDispatch();
  const triggerUpload = () => {
    const el = document.querySelector('.upload-avatar-custom input');
    el && el.click();
  };

  const _uploadImage = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
    }
    file.preview = src;
    dispatch(uploadFile(file, {}, (data) => {
      onChange(data);
    }));
    return false;
  };

  return (
    <>
      <div style={{ width: height, height: height }} className="wrapper-upload-avatar">
        <ImgCrop fillColor={COLORS.WHITE}
          cropperProps={{ restrictPosition: false }}
          minZoom={0.1} maxZoom={5} grid
        >
          <Upload
            disabled={disabled}
            name="avatar"
            listType="picture-card"
            className="upload-avatar-custom"
            showUploadList={false}
            beforeUpload={_uploadImage}
          >
            {imageSelected ? (
              <img
                src={imageSelected}
                alt="avatar"
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <></>
            )}
          </Upload>
        </ImgCrop>
      </div>

      <div className="action-upload t-center">
        Drag and drop, or{' '}
        <span onClick={triggerUpload} className="link">
          browse
        </span>
      </div>
    </>
  );
};

MyUploadAvatar.propTypes = {
  height: PropTypes.string,
  disabled: PropTypes.bool,
};

MyUploadAvatar.defaultProps = {
  height: '200px',
  disabled: false,
};

export default MyUploadAvatar;
