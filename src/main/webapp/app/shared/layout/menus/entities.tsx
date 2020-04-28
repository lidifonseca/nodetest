import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="" name="Estados" id="entity-menu">
    <MenuItem icon="angle-right" to="/processo">
      TJ-SC
    </MenuItem>
    <MenuItem icon="asterisk" to="/pesquisa">
      <Translate contentKey="global.menu.entities.pesquisa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/processo">
      <Translate contentKey="global.menu.entities.processo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/apenso">
      <Translate contentKey="global.menu.entities.apenso" />
    </MenuItem>
    {/*   jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
