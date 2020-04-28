import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import MenuItem from "app/shared/layout/menus/menu-item";

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img className="d-none d-sm-block" src="content/images/logo-confianca-prime.png" alt="Logo" />
    <img className="d-block d-sm-none" src="content/images/logo-prime.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    {/* <span className="brand-title"> */}
    {/*  <Translate contentKey="global.title">Tjscrapper</Translate> */}
    {/* </span> */}
    {/* <span className="navbar-version">{appConfig.VERSION}</span> */}
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const SwaggerMenu = props =>(
  <NavItem>
    <NavLink tag={Link} to="/admin/docs" className="d-flex align-items-center f-s-13">
      <FontAwesomeIcon icon="book" /> &nbsp;
      <Translate contentKey="global.menu.admin.apidocs">API</Translate>
    </NavLink>
  </NavItem>
);

export const Account = props => (
  <NavItem>
    <NavLink tag={Link} to="/account/settings" className="d-flex align-items-center f-s-13">
      <FontAwesomeIcon icon="user" />&nbsp;
      <Translate contentKey="global.menu.account.main">Account</Translate>
    </NavLink>
  </NavItem>
);

export const Logout = props => (
  <NavItem>
    <NavLink tag={Link} to="/logout" className="d-flex align-items-center f-s-13">
      <FontAwesomeIcon icon="sign-out-alt" />&nbsp;
      <Translate contentKey="global.menu.account.logout">Sair</Translate>
    </NavLink>
  </NavItem>
);
