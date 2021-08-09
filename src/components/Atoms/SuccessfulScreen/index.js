import React from 'react';
import './styles.scss';
import { MyButton } from '../index';
import PropTypes from 'prop-types';
import SuccessfulImage from 'assets/images/Successful.svg';

const SuccessfulScreen = ({
  image,
  title,
  description,
  buttonSecondaryText,
  buttonPrimaryText,
  onClickButtonSecondary,
  onClickButtonPrimary,
}) => {
  return (
    <div className="screen-successful view-center">
      <div className="text-center">
        <img src={image} />
        <h4 className="title">{title}</h4>
        <p className="description">{description}</p>
      </div>
      <div className="text-center">
        {buttonSecondaryText && (
          <MyButton
            onClick={onClickButtonSecondary}
            className="btn-secondary-custom mx-10"
          >
            {buttonSecondaryText}
          </MyButton>
        )}
        <MyButton
          onClick={onClickButtonPrimary}
          className="btn-primary-custom mx-10"
        >
          {buttonPrimaryText}
        </MyButton>
      </div>
    </div>
  );
};

SuccessfulScreen.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonSecondaryText: PropTypes.string,
  buttonPrimaryText: PropTypes.string,
  onClickButtonSecondary: PropTypes.func,
  onClickButtonPrimary: PropTypes.func,
};

SuccessfulScreen.defaultProps = {
  image: SuccessfulImage,
  title: 'Successful',
  buttonPrimaryText: 'Complete',
  onClickButtonSecondary: () => {},
  onClickButtonPrimary: () => {},
};

export default SuccessfulScreen;
