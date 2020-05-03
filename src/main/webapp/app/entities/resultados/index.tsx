import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Resultados from './resultados';
import ResultadosDetail from './resultados-detail';
import ResultadosUpdate from './resultados-update';
import ResultadosDeleteDialog from './resultados-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResultadosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResultadosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResultadosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Resultados} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ResultadosDeleteDialog} />
  </>
);

export default Routes;
