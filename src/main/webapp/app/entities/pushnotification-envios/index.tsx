import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PushnotificationEnvios from './pushnotification-envios';
import PushnotificationEnviosDetail from './pushnotification-envios-detail';
import PushnotificationEnviosUpdate from './pushnotification-envios-update';
import PushnotificationEnviosDeleteDialog from './pushnotification-envios-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PushnotificationEnviosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PushnotificationEnviosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PushnotificationEnviosDetail} />
      <ErrorBoundaryRoute path={match.url} component={PushnotificationEnvios} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PushnotificationEnviosDeleteDialog} />
  </>
);

export default Routes;
