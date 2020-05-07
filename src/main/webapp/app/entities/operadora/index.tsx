import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Operadora from './operadora';
import OperadoraDetail from './operadora-detail';
import OperadoraRelatorioCSV from './relatorio/operadora.csv';
import OperadoraUpdate from './operadora-update';
import OperadoraDeleteDialog from './operadora-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={OperadoraRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OperadoraUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OperadoraDetail} />
      <ErrorBoundaryRoute path={match.url} component={Operadora} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OperadoraDeleteDialog} />
  </>
);

export default Routes;
