import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EspecialidadeOperadora from './especialidade-operadora';
import EspecialidadeOperadoraDetail from './especialidade-operadora-detail';
import EspecialidadeOperadoraRelatorioCSV from './relatorio/especialidade-operadora.csv';
import EspecialidadeOperadoraUpdate from './especialidade-operadora-update';
import EspecialidadeOperadoraDeleteDialog from './especialidade-operadora-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={EspecialidadeOperadoraRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspecialidadeOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspecialidadeOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspecialidadeOperadoraDetail} />
      <ErrorBoundaryRoute path={match.url} component={EspecialidadeOperadora} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EspecialidadeOperadoraDeleteDialog} />
  </>
);

export default Routes;
