import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NotificacaoConfig from './notificacao-config';
import NotificacaoConfigDetail from './notificacao-config-detail';
import NotificacaoConfigRelatorioCSV from './relatorio/notificacao-config.csv';
import NotificacaoConfigUpdate from './notificacao-config-update';
import NotificacaoConfigDeleteDialog from './notificacao-config-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={NotificacaoConfigRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NotificacaoConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NotificacaoConfigUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NotificacaoConfigDetail} />
      <ErrorBoundaryRoute path={match.url} component={NotificacaoConfig} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NotificacaoConfigDeleteDialog} />
  </>
);

export default Routes;
