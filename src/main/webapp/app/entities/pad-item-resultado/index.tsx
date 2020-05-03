import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemResultado from './pad-item-resultado';
import PadItemResultadoDetail from './pad-item-resultado-detail';
import PadItemResultadoUpdate from './pad-item-resultado-update';
import PadItemResultadoDeleteDialog from './pad-item-resultado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemResultadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemResultadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemResultadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemResultado} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemResultadoDeleteDialog} />
  </>
);

export default Routes;
