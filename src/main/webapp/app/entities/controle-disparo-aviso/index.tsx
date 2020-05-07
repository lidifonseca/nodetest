import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ControleDisparoAviso from './controle-disparo-aviso';
import ControleDisparoAvisoDetail from './controle-disparo-aviso-detail';
import ControleDisparoAvisoRelatorioCSV from './relatorio/controle-disparo-aviso.csv';
import ControleDisparoAvisoUpdate from './controle-disparo-aviso-update';
import ControleDisparoAvisoDeleteDialog from './controle-disparo-aviso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ControleDisparoAvisoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ControleDisparoAvisoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ControleDisparoAvisoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ControleDisparoAvisoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ControleDisparoAviso} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ControleDisparoAvisoDeleteDialog} />
  </>
);

export default Routes;
