import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VwApiAtendimentosAceite from './vw-api-atendimentos-aceite';
import VwApiAtendimentosAceiteDetail from './vw-api-atendimentos-aceite-detail';
import VwApiAtendimentosAceiteRelatorioCSV from './relatorio/vw-api-atendimentos-aceite.csv';
import VwApiAtendimentosAceiteUpdate from './vw-api-atendimentos-aceite-update';
import VwApiAtendimentosAceiteDeleteDialog from './vw-api-atendimentos-aceite-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={VwApiAtendimentosAceiteRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VwApiAtendimentosAceiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VwApiAtendimentosAceiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VwApiAtendimentosAceiteDetail} />
      <ErrorBoundaryRoute path={match.url} component={VwApiAtendimentosAceite} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VwApiAtendimentosAceiteDeleteDialog} />
  </>
);

export default Routes;
