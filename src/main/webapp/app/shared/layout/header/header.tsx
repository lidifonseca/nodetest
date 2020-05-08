import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, Collapse } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { EntitiesMenu } from '../menus/entities';

import { LocaleMenu } from 'app/shared/layout/menus';
import { Brand, Account, Logout, SwaggerMenu } from './header-components';
import {connect} from "react-redux";
import {toggleSidebarMobileOpen} from "app/shared/reducers/sidebar";

export interface IMyHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderProps extends StateProps, DispatchProps, IMyHeaderProps {}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
  {/* renderDevRibbon() */}
      <LoadingBar className="loading-bar" />
      <div id="header" className="header navbar-inverse" style={{ boxShadow: "0 0 16px rgba(0,0,0,.15)" }}>
        <div className={"navbar-header"}>
          <Brand />
          <div className={"navbar-nav navbar-right d-block d-md-none"}>
            <Collapse isOpen={menuOpen} navbar>
              <Nav id="header-tabs" className="ml-auto navbar-nav navbar-right pull-right" navbar>
                {props.isAuthenticated && props.isAdmin && props.isSwaggerEnabled && <SwaggerMenu />}
                {props.isAuthenticated && <EntitiesMenu />}
                {props.isAuthenticated && <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />}
                {props.isAuthenticated && <Account />}
                {props.isAuthenticated && <Logout />}

                <button type="button" className="navbar-toggle" onClick={props.toggleSidebarMobileOpen}>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </Nav>
            </Collapse>
          </div>
        </div>
        <div className={"navbar-nav navbar-right d-none d-md-block"}>
          <Nav id="header-tabs" style={{height: 40}} className="ml-auto navbar-nav navbar-right pull-right mr-4" navbar>
            {props.isAuthenticated && props.isAdmin && props.isSwaggerEnabled && <SwaggerMenu />}
            {props.isAuthenticated && <EntitiesMenu />}
            {props.isAuthenticated && <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />}
            {props.isAuthenticated && <Account />}
            {props.isAuthenticated && <Logout />}
          </Nav>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (storeState) => ({

});


const mapDispatchToProps = { toggleSidebarMobileOpen };

type StateProps = ReturnType <typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

