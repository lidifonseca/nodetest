import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoOperadora from './tipo-operadora';
import TipoOperadoraDetail from './tipo-operadora-detail';
import TipoOperadoraRelatorioCSV from './relatorio/tipo-operadora.csv';
import TipoOperadoraUpdate from './tipo-operadora-update';
import TipoOperadoraDeleteDialog from './tipo-operadora-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={TipoOperadoraRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoOperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoOperadoraDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoOperadora} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoOperadoraDeleteDialog} />
  </>
);

export default Routes;
