import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Servico from './servico';
import ServicoDetail from './servico-detail';
import ServicoRelatorioCSV from './relatorio/servico.csv';
import ServicoUpdate from './servico-update';
import ServicoDeleteDialog from './servico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ServicoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ServicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Servico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ServicoDeleteDialog} />
  </>
);

export default Routes;
