import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoMatMed from './tipo-mat-med';
import TipoMatMedDetail from './tipo-mat-med-detail';
import TipoMatMedUpdate from './tipo-mat-med-update';
import TipoMatMedDeleteDialog from './tipo-mat-med-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoMatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoMatMedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoMatMedDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoMatMed} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoMatMedDeleteDialog} />
  </>
);

export default Routes;
