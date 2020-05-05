import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LogPacAcesso from './log-pac-acesso';
import LogPacAcessoDetail from './log-pac-acesso-detail';
import LogPacAcessoRelatorioCSV from './relatorio/log-pac-acesso.csv';
import LogPacAcessoUpdate from './log-pac-acesso-update';
import LogPacAcessoDeleteDialog from './log-pac-acesso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={LogPacAcessoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LogPacAcessoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LogPacAcessoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LogPacAcessoDetail} />
      <ErrorBoundaryRoute path={match.url} component={LogPacAcesso} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LogPacAcessoDeleteDialog} />
  </>
);

export default Routes;
