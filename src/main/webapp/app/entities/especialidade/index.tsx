import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Especialidade from './especialidade';
import EspecialidadeDetail from './especialidade-detail';
import EspecialidadeRelatorioCSV from './relatorio/especialidade.csv';
import EspecialidadeUpdate from './especialidade-update';
import EspecialidadeDeleteDialog from './especialidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={EspecialidadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspecialidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Especialidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EspecialidadeDeleteDialog} />
  </>
);

export default Routes;
