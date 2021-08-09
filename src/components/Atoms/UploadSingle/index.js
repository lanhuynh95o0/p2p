import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Upload } from 'antd';
import PropTypes from 'prop-types';
import axios, { CancelToken } from 'utilities/axios';
import { getFileExtension } from 'utilities/common';
import { CloseOutlined } from '@ant-design/icons';
import './styles.scss';
import Icon, { IconCustom } from '../Icon';
import { API } from 'constants/api';
import FilePreview from '../FilePreview';
import { MyProgress } from '../index';
import { showModalError } from 'utilities/modal';
import { getReadableFileSizeString } from 'utilities/stringHelper';
import { uploadFile } from 'states/common/actions';
import { ModalUpdateAttachment } from 'components/Atoms';

const { Dragger } = Upload;
const MyUploadSingle = ({
  height,
  accept,
  onChange,
  onRemove,
  onUploading,
  onUploadDone,
  listFile,
  folder,
  multiple,
  maxFileSize,
  willDeleteWhenUnmount,
}) => {
  const dragging = useRef(0);
  const [isDrag, setIsDrag] = useState(false);
  const bulkDelete = useRef(false);
  const [updatingDocument, setUpdatingDocument] = useState(null);
  const [fileUploading, setFileUploading] = useState({});
  const cancelUpload = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnDrag = () => {
      dragging.current++;
      setIsDrag(true);
    };
    const handleOnDragLeave = () => {
      dragging.current--;
      if (dragging.current === 0) setIsDrag(false);
    };
    const handleOnDragOver = (e) => {
      e.preventDefault();
    };
    const handleOnDrop = (e) => {
      setIsDrag(false);
    };
    window.addEventListener('dragenter', handleOnDrag);
    window.addEventListener('dragover', handleOnDragOver);
    window.addEventListener('dragleave', handleOnDragLeave);
    window.addEventListener('drop', handleOnDrop);
    return () => {
      window.removeEventListener('dragenter', handleOnDrag);
      window.removeEventListener('dragleave', handleOnDragLeave);
      window.removeEventListener('dragover', handleOnDragOver);
      window.removeEventListener('drop', handleOnDrop);
    };
  }, []);

  useEffect(() => {
    bulkDelete.current = willDeleteWhenUnmount;
  }, [willDeleteWhenUnmount]);

  useEffect(() => {
    return () => {
      if (bulkDelete?.current === true) {
        setFileUploading((value) => {
          const slugs = Object.values(value)
            .map((file) => file?.data?.slug)
            .filter((_) => _);
          if (slugs?.length > 0)
            axios.post(`${API.FILE}/bulk`, { slugs, physical: true });
          return value;
        });
      }
    };
  }, []);

  const handleUploadFile = async (file) => {
    const { uid, name, size, type } = file;
    const fileExtension = type?.toLowerCase();

    if (accept?.includes('pdf') && !fileExtension.includes('pdf')) {
      showModalError({
        content: 'Please upload the PDF file.',
      });
      return;
    }
    if (size > maxFileSize) {
      showModalError({
        content: `File must be less than ${getReadableFileSizeString(
          maxFileSize
        )}`,
      });
      return;
    }

    const listFileUploaded = Object.keys(fileUploading);
    if (!multiple && listFileUploaded?.length) {
      listFileUploaded.map((item) => _cancelUpload(item)());
    }

    onUploading();
    setFileUploading((value) => ({ ...value, [uid]: { name } }));

    const config = {
      cancelToken: new CancelToken(function executor(c) {
        cancelUpload.current[uid] = c;
      }),
      onUploadProgress: (event) => {
        const { loaded, total } = event;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setFileUploading((value) => ({
            ...value,
            [uid]: { ...value[uid], percent },
          }));
        }
      },
    };

    dispatch(
      uploadFile(
        file,
        config,
        (data) => {
          onChange(data);
          // Handle loading
          setFileUploading((value) => ({
            ...value,
            [uid]: { ...value[uid], percent: 100, data },
          }));

          delete cancelUpload.current[uid];
          _checkIsUploadDone();
        },
        folder
      )
    );
  };

  const _checkIsUploadDone = () => {
    const isDone = Object.keys(cancelUpload.current).length === 0;
    if (isDone) {
      onUploadDone();
    }
  };

  const _cancelUpload = useCallback(
    (id) => () => {
      if (cancelUpload.current?.[id] !== undefined) {
        cancelUpload.current[id]();
        delete cancelUpload.current[id];
      } else {
        setFileUploading((value) => {
          onRemove(value[id].data);
          axios.delete(`${API.FILE}?slug=${value[id].data.slug}&physical=true`);
          return value;
        });
      }
      setFileUploading((value) => {
        delete value[id];
        return { ...value };
      });
      _checkIsUploadDone();
    },
    [onRemove]
  );

  const _onUpdateAttachment = useCallback((uid) => () => {
    setUpdatingDocument(fileUploading[uid].data);
  }, [fileUploading]);

  const _onUpdateAttachmentModalClosed = () => {
    setUpdatingDocument(null);
  };

  const _onUpdateAttachmentSuccess = (updatedAttachment, originalAttachment) => {
    setUpdatingDocument(null);
    originalAttachment.displayName = updatedAttachment.displayName;
    setFileUploading({ ...fileUploading });
    return true;
  };

  const _renderUploaded = useMemo(() => {
    return Object.entries(fileUploading).map(([uid, file]) => {
      if (file) {
        const fileName = file.name;
        // const { name } = getFileExtension(fileName);
        const displayName = file.data ? file.data.displayName : fileName;
        return (
          <div className="list-file-uploaded" key={uid}>
            <div className="file-item">
              <div className="icon">
                <FilePreview fileName={fileName} />
              </div>
              <div className="content-uploading">
                <div className="file-info">
                  <span className="file-name">{displayName}</span>
                  {
                    file.percent === 100 &&
                    <Icon component={IconCustom.Edit}
                      className="file-edit"
                      onClick={_onUpdateAttachment(uid)}
                    />
                  }
                  <Icon component={IconCustom.Close}
                    className="file-close"
                    onClick={_cancelUpload(uid)}
                  />
                </div>
                <MyProgress
                  isProgressUpload
                  percent={file.percent || 0}
                  showText={false}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    });
  }, [fileUploading, _cancelUpload]);

  const props = {
    name: 'file',
    multiple,
    accept,
    showUploadList: false,
    data: handleUploadFile,
  };

  return (
    <div id="my-dragger">
      <div
        className={`my-dragger-background ${isDrag && 'my-dragger-background-active'}`}
      />
      <div style={{ height: height }} className="upload-single-custom">
        <Dragger className="dragger-custom" {...props}>
          <span className="action-upload">
            Drag and drop, or <span className="link">browse</span>
          </span>
        </Dragger>
      </div>

      {_renderUploaded}
      <div className="list-file-uploaded">
        {listFile.map((file) => (
          <div className="file-item" key={file.id}>
            <div className="icon">
              <img src={require('assets/images/file/Pdf.svg')} alt="logo" />
            </div>
            <div className="content">
              <span className="file-name">{file.name}</span>
              <span>
                <CloseOutlined onClick={() => null} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <ModalUpdateAttachment visible={!!updatingDocument} attachment={updatingDocument} onClose={_onUpdateAttachmentModalClosed}
        onSuccess={_onUpdateAttachmentSuccess} />
    </div>
  );
};

MyUploadSingle.propTypes = {
  height: PropTypes.string,
  folder: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onUploading: PropTypes.func,
  onUploadDone: PropTypes.func,
  multiple: PropTypes.bool,
  listFile: PropTypes.array,
  maxFileSize: PropTypes.number,
  willDeleteWhenUnmount: PropTypes.bool,
};

MyUploadSingle.defaultProps = {
  folder: 'skill',
  listFile: [],
  multiple: false,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  onChange: () => null,
  onUploading: () => null,
  onUploadDone: () => null,
  onRemove: () => null,
  willDeleteWhenUnmount: false,
};

export default MyUploadSingle;
