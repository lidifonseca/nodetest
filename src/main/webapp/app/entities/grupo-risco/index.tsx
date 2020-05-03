import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GrupoRisco from './grupo-risco';
import GrupoRiscoDetail from './grupo-risco-detail';
import GrupoRiscoUpdate from './grupo-risco-update';
import GrupoRiscoDeleteDialog from './grupo-risco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GrupoRiscoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GrupoRiscoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GrupoRiscoDetail} />
      <ErrorBoundaryRoute path={match.url} component={GrupoRisco} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GrupoRiscoDeleteDialog} />
  </>
);

export default Routes;
