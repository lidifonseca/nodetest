import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Migracao from './migracao';
import MigracaoDetail from './migracao-detail';
import MigracaoRelatorioCSV from './relatorio/migracao.csv';
import MigracaoUpdate from './migracao-update';
import MigracaoDeleteDialog from './migracao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={MigracaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MigracaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MigracaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MigracaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Migracao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MigracaoDeleteDialog} />
  </>
);

export default Routes;
