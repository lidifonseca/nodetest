import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {hot} from 'react-hot-loader';

import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {getProfile} from 'app/shared/reducers/application-profile';
import {setLocale} from 'app/shared/reducers/locale';
import {hasAnyAuthority} from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import {AUTHORITIES} from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Login from 'app/modules/login/login';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div className="app-loading">
    <div className="lds-css ng-scope">
      <i className="fas fa-spinner fa-spin fa-7x" style={{marginTop:"58px"}}></i>
    </div>
  </div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div className="app-loading">
    <div className="lds-css ng-scope">
      <i className="fas fa-spinner fa-spin fa-7x" style={{marginTop:"58px"}}></i>
    </div>
  </div>
});

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {
}

export const Loading = () => {

  return <div className="app-loading">
          <div className="lds-css ng-scope">
            <i className="fas fa-spinner fa-spin fa-7x" style={{marginTop:"58px"}}></i>
          </div>
        </div>
};

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);
  return (
    <Router basename={baseHref}>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
        bodyClassName="toastify-body"
      />
      <ErrorBoundary>
        <Switch>
          <ErrorBoundaryRoute path="/logout" component={Logout} />
          {/* <ErrorBoundaryRoute path="/account/register" component={Register} /> */}
          <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
          <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
          <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
          <ErrorBoundaryRoute path="/" component={props.isAuthenticated === null ? Loading : (props.isAuthenticated === true ? AppRoutes : Login)} />
        </Switch>
      </ErrorBoundary>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale}: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = {setLocale, getSession, getProfile};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
