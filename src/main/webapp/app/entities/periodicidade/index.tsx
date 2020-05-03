import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Periodicidade from './periodicidade';
import PeriodicidadeDetail from './periodicidade-detail';
import PeriodicidadeUpdate from './periodicidade-update';
import PeriodicidadeDeleteDialog from './periodicidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PeriodicidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PeriodicidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PeriodicidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Periodicidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PeriodicidadeDeleteDialog} />
  </>
);

export default Routes;
