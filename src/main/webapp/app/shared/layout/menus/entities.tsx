import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="" name="Estados" id="entity-menu" style={{ width: 100 }}>
    <MenuItem icon="asterisk" to="/paciente">
      <Translate contentKey="global.menu.entities.paciente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cidade">
      <Translate contentKey="global.menu.entities.cidade" />
    </MenuItem>
    {/*   jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
