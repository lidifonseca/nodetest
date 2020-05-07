import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UsuarioPainelGerencial from './usuario-painel-gerencial';
import UsuarioPainelGerencialDetail from './usuario-painel-gerencial-detail';
import UsuarioPainelGerencialRelatorioCSV from './relatorio/usuario-painel-gerencial.csv';
import UsuarioPainelGerencialUpdate from './usuario-painel-gerencial-update';
import UsuarioPainelGerencialDeleteDialog from './usuario-painel-gerencial-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={UsuarioPainelGerencialRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsuarioPainelGerencialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsuarioPainelGerencialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsuarioPainelGerencialDetail} />
      <ErrorBoundaryRoute path={match.url} component={UsuarioPainelGerencial} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UsuarioPainelGerencialDeleteDialog} />
  </>
);

export default Routes;
