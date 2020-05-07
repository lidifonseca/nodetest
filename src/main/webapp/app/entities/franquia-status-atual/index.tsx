import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FranquiaStatusAtual from './franquia-status-atual';
import FranquiaStatusAtualDetail from './franquia-status-atual-detail';
import FranquiaStatusAtualRelatorioCSV from './relatorio/franquia-status-atual.csv';
import FranquiaStatusAtualUpdate from './franquia-status-atual-update';
import FranquiaStatusAtualDeleteDialog from './franquia-status-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={FranquiaStatusAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FranquiaStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FranquiaStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FranquiaStatusAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={FranquiaStatusAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FranquiaStatusAtualDeleteDialog} />
  </>
);

export default Routes;
