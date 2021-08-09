import React from 'react';
import PropTypes from 'prop-types';
import { getFileExtension } from 'utilities/common';
import './styles.scss';

const fileDoc = require('assets/images/file/Doc.svg');
const fileXls = require('assets/images/file/Xls.svg');
const fileImg = require('assets/images/file/Img.svg');
const fileDefault = require('assets/images/file/File.svg');

const fileLogo = {
  pdf: require('assets/images/file/Pdf.svg'),
  doc: fileDoc,
  docx: fileDoc,
  xls: fileXls,
  xlsx: fileXls,
  png: fileImg,
  jpg: fileImg,
  jpeg: fileImg,
  gif: fileImg,
};

const FilePreview = ({ fileName, showName, file, extra }) => {
  if (!file && !fileName) return null;
  const { name, extension } = getFileExtension(fileName || `${file.name}${file.extension}`);
  const displayName = (file && file.displayName) || name;
  return (
    <div id="my-file-preview">
      <img src={fileLogo[extension] || fileDefault} alt="logo" />
      {showName && (
        <div className="file-preview-info">
          <span className="file-name">{displayName}</span>
          {extra || null}
        </div>
      )}
    </div>
  );
};

FilePreview.propTypes = {
  fileName: PropTypes.string,
  showName: PropTypes.bool,
};
FilePreview.defaultProps = {
  showName: false,
};

export default FilePreview;
