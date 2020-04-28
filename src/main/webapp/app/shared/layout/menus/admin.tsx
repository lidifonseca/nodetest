import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';

const adminMenuItems = (
  <>
    <MenuItem icon="user" to="/admin/user-management">
      Usuários
    </MenuItem>
    <MenuItem icon="tachometer-alt" to="/admin/metrics">
      Metrics
    </MenuItem>
    {/*  <MenuItem icon="heart" to="/admin/health"> */}
    {/*    Health*/}
    {/*  </MenuItem> */}
    {/*  <MenuItem icon="list" to="/admin/configuration"> */}
    {/*    Configurações*/}
    {/*  </MenuItem> */}
    {/*  <MenuItem icon="bell" to="/admin/audits"> */}
    {/*    Audits*/}
    {/*  </MenuItem> */}
    {/*   jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    {/*  <MenuItem icon="tasks" to="/admin/logs"> */}
    {/*    Logs*/}
    {/*  </MenuItem> */}
  </>
);

const swaggerItem = (
  <MenuItem icon="book" to="/admin/docs">
    <Translate contentKey="global.menu.admin.apidocs">API</Translate>
  </MenuItem>
);

export const AdminMenu = ({ showSwagger }) => (
  <NavDropdown icon="" name="Administração" style={{ width: '127px' }}>
    {adminMenuItems}
    {showSwagger && swaggerItem}
  </NavDropdown>
);

export default AdminMenu;
