import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MyButton, PageNotFound, SuccessfulScreen } from 'components/Atoms';
import { clientReject } from 'states/client/actions';
import SiteHeaderPublic from 'components/Organisms/PublicHeader';

const ClientReject = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const { token } = props.match.params;
    dispatch(
      clientReject(
        token,
        () => setIsSuccess(true),
        () => setIsSuccess(false)
      )
    );
  }, []);

  const _backHome = useCallback(() => {
    history.push('/');
  }, []);

  if (isSuccess === null) return null;

  return (
    <>
      <SiteHeaderPublic />
      <div className="client-reject">
        {isSuccess ? (
          <SuccessfulScreen
            description="You have rejected this project!"
            buttonPrimaryText="Back to Home"
            onClickButtonPrimary={_backHome}
          />
        ) : (
          <PageNotFound
            extra={
              <>
                <p>Whoops! Page not found.</p>
                <MyButton className="btn-primary-custom" onClick={_backHome}>
                  Back to Home
                </MyButton>
              </>
            }
          />
        )}
      </div>
    </>
  );
};

export default withRouter(ClientReject);
