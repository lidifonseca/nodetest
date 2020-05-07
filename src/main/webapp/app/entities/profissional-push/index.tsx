import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalPush from './profissional-push';
import ProfissionalPushDetail from './profissional-push-detail';
import ProfissionalPushRelatorioCSV from './relatorio/profissional-push.csv';
import ProfissionalPushUpdate from './profissional-push-update';
import ProfissionalPushDeleteDialog from './profissional-push-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalPushRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalPushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalPushUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalPushDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalPush} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalPushDeleteDialog} />
  </>
);

export default Routes;
