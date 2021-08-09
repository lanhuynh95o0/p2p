import React, { useCallback } from 'react';
import {
  FilePreview,
  MyButton,
  NoData,
  CustomToolTips,
} from 'components/Atoms';
import 'components/Pages/JobDetail/components/Documents/styles.scss';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { Popover } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';

const Documents = ({ job }) => {
  const _renderItem = useCallback(
    (doc) => (
      <div className="doc-item" key={doc.id}>
        <FilePreview fileName={doc.slug} />
        <span className="name">
          <CustomToolTips title={doc.displayName} />
        </span>
        <Popover
          placement="topRight"
          content={
            <div className="my-popover-container">
              <a href={doc.preview} target="_blank">
                <MyButton className="my-btn-no-style my-popover-item">
                  <DownloadOutlined className="my-icon-md" />
                  Download
                </MyButton>
              </a>
            </div>
          }
          trigger="focus"
        >
          <MyButton className="my-btn-no-style btn-icon text-dark-gray">
            <Icon
              component={IconCustom.MoreHorizontal}
              className="my-icon-md-dark-gray"
            />
          </MyButton>
        </Popover>
      </div>
    ),
    []
  );

  return (
    <div className="job-documents">
      <div className="info-header">
        <h4 className="title">Attachments</h4>
      </div>
      {(job.attachments?.length && (
        <div className="body">{job.attachments.map(_renderItem)}</div>
      )) || <NoData description={COMMON_NODATA_TEXT.DOCUMENT} />}
    </div>
  );
};

export default Documents;
