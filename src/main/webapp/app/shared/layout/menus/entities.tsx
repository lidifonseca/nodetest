import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/pesquisa">
      Pesquisa
    </MenuItem>
    <MenuItem icon="asterisk" to="/estado">
      Estado
    </MenuItem>
    <MenuItem icon="asterisk" to="/comarca">
      Comarca
    </MenuItem>
    <MenuItem icon="asterisk" to="/processo">
      Processo
    </MenuItem>
    <MenuItem icon="asterisk" to="/parte">
      Parte
    </MenuItem>
    <MenuItem icon="asterisk" to="/movimentacao">
      Movimentacao
    </MenuItem>
    <MenuItem icon="asterisk" to="/peticao">
      Peticao
    </MenuItem>
    <MenuItem icon="asterisk" to="/incidente">
      Incidente
    </MenuItem>
    <MenuItem icon="asterisk" to="/apenso">
      Apenso
    </MenuItem>
    <MenuItem icon="asterisk" to="/audiencia">
      Audiencia
    </MenuItem>
    <MenuItem icon="asterisk" to="/historico-clase">
      Historico Clase
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
