import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusAtual from './status-atual';
import StatusAtualDetail from './status-atual-detail';
import StatusAtualRelatorioCSV from './relatorio/status-atual.csv';
import StatusAtualUpdate from './status-atual-update';
import StatusAtualDeleteDialog from './status-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={StatusAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusAtualDeleteDialog} />
  </>
);

export default Routes;
