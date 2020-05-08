
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';

import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {getProfile} from 'app/shared/reducers/application-profile';
import {setLocale} from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';
import {hasAnyAuthority} from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import {AUTHORITIES} from 'app/config/constants';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from 'app/modules/home/home';
import {toggleSidebarMinify, toggleMobileSidebar} from 'app/shared/reducers/sidebar.ts';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';


const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div className="app-loading">
    <div className="lds-css ng-scope">
      <i className="fas fa-spinner fa-spin fa-7x" style={{marginTop:"58px"}}> </i>
    </div>
  </div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div className="app-loading">
    <div className="lds-css ng-scope">
      <i className="fas fa-spinner fa-spin fa-7x" style={{marginTop:"58px"}}> </i>
    </div>
  </div>
});

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IRoutesProps extends StateProps, DispatchProps {
}

export const Routes = (props: IRoutesProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const paddingTop = '60px';
  return (
      <div className={

        'fade page-sidebar-fixed show page-container page-header-fixed ' +
        (props.pageSidebarMinified ? 'page-sidebar-minified' : '') +
        (props.pageSidebarMovilOpen ? 'page-sidebar-toggled' : '')

      } style={{paddingTop}}>
          <ErrorBoundary>
            <Header
              isAuthenticated={props.isAuthenticated}
              isAdmin={props.isAdmin}
              currentLocale={props.currentLocale}
              toggleSidebarMinify={props.toggleSidebarMinify}
              toggleMobileSidebar={props.toggleMobileSidebar}
              pageSidebarMinified={props.pageSidebarMinified}
              pageSidebarTransparent={props.pageSidebarTransparent}
              onLocaleChange={props.setLocale}
              ribbonEnv={props.ribbonEnv}
              isInProduction={props.isInProduction}
              isSwaggerEnabled={props.isSwaggerEnabled}
            />
          </ErrorBoundary>

          <div className={"content"}>
          <ErrorBoundary>
          <Sidebar
            pageSidebarMinified={props.pageSidebarMinified}
            pageSidebarTransparent={props.pageSidebarTransparent}
            toggleSidebarMinify={props.toggleSidebarMinify}
            toggleMobileSidebar={props.toggleMobileSidebar}
            userAccount={props.userAccount}
          />
        </ErrorBoundary>

            <ErrorBoundary>
              <Switch>
                <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
                <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
                <ErrorBoundaryRoute path="/" exact component={Home} />
                <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER, AUTHORITIES.COLLECTOR]} />
              </Switch>
            </ErrorBoundary>

      </div>
    </div>
  );
};

const mapStateToProps = ({authentication, applicationProfile, locale, sidebar}: IRootState) => ({
  pageSidebarMovilOpen: sidebar.pageSidebarMovilOpen,
  pageSidebarMinified: sidebar.pageSidebarMinified,
	pageSidebarTransparent: sidebar.pageSidebarTransparent,
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  userAccount: authentication.account,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = {setLocale, getSession, getProfile, toggleSidebarMinify, toggleMobileSidebar};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(Routes));

