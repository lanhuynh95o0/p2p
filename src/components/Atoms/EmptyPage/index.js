import React from 'react';
import Image from 'assets/images/empty/EmtpyPage.svg';
import './styles.scss';
import MyButton from '../Button';
import { useHistory } from 'react-router-dom';

const EmptyPage = ({ extra, ...props }) => {
  const history = useHistory();
  return (
    <div id="page-not-found" {...props}>
      <img src={Image} />
      <div className="content">
        {extra || (
          <>
            <p>Whoops! Page not found.</p>
            <MyButton
              className="btn-primary-custom"
              onClick={() => {
                history.push('/');
              }}
            >
              Back to Home
            </MyButton>
          </>
        )}
      </div>
    </div>
  );
};
export default EmptyPage;
