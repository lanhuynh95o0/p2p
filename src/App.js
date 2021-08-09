import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LoadingScreen, PrivateRoute } from 'components/Atoms';
import { PrivateLayout } from 'components/Templates';
import renderRoutes from 'routers/render';
import * as routeName from 'routers/route-name';
import * as Sentry from '@sentry/react';

import messages_vi from 'translations/vi.json';
import messages_en from 'translations/en.json';
import PublicProfilePartner from './components/Pages/PublicProfilePartner';
import 'react-phone-number-input/style.css';

const HOST = process.env.REACT_APP_HOST;

const messages = {
  vi: messages_vi,
  en: messages_en,
};

const languageBrowser = navigator.language.split(/[-_]/)[0];
const languageLocal = localStorage.getItem('language');

function FallbackComponent() {
  return <div>An error has occurred</div>;
}

function App() {
  // Handle subdomain
  const { hostname } = window.location;
  const subdomain = hostname.split('.')[0];
  if (subdomain !== HOST) {
    return <PublicProfilePartner subdomain={subdomain} />;
  }

  const language = languageLocal || languageBrowser;

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Sentry.ErrorBoundary fallback={FallbackComponent}>
            <Switch>
              {renderRoutes()}
              <PrivateRoute path="/" name={routeName.HOME}>
                <PrivateLayout />
              </PrivateRoute>
            </Switch>
          </Sentry.ErrorBoundary>
        </Suspense>
      </Router>
    </IntlProvider>
  );
}

export default App;
