import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { EntitiesMenu } from './entities';

const accountMenuItemsAuthenticated = (
  <>
  
    <EntitiesMenu /> 
    <MenuItem icon="wrench" to="/account/settings">
      Conta
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      Senha
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      Sair
    </MenuItem>
  </>
);

const accountMenuItems = (
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      Entrar
    </MenuItem>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="" name="Conta">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
