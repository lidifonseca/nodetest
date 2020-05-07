import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacientePush from './paciente-push';
import PacientePushDetail from './paciente-push-detail';
import PacientePushRelatorioCSV from './relatorio/paciente-push.csv';
import PacientePushUpdate from './paciente-push-update';
import PacientePushDeleteDialog from './paciente-push-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PacientePushRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacientePushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacientePushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacientePushDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacientePush} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacientePushDeleteDialog} />
  </>
);

export default Routes;
