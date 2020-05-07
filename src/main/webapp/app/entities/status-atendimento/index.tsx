import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusAtendimento from './status-atendimento';
import StatusAtendimentoDetail from './status-atendimento-detail';
import StatusAtendimentoRelatorioCSV from './relatorio/status-atendimento.csv';
import StatusAtendimentoUpdate from './status-atendimento-update';
import StatusAtendimentoDeleteDialog from './status-atendimento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={StatusAtendimentoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusAtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusAtendimentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusAtendimento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusAtendimentoDeleteDialog} />
  </>
);

export default Routes;
