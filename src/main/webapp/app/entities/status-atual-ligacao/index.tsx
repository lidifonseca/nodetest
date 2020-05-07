import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusAtualLigacao from './status-atual-ligacao';
import StatusAtualLigacaoDetail from './status-atual-ligacao-detail';
import StatusAtualLigacaoRelatorioCSV from './relatorio/status-atual-ligacao.csv';
import StatusAtualLigacaoUpdate from './status-atual-ligacao-update';
import StatusAtualLigacaoDeleteDialog from './status-atual-ligacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={StatusAtualLigacaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusAtualLigacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusAtualLigacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusAtualLigacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusAtualLigacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusAtualLigacaoDeleteDialog} />
  </>
);

export default Routes;
