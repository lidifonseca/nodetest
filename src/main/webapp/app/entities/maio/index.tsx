import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Maio from './maio';
import MaioDetail from './maio-detail';
import MaioRelatorioCSV from './relatorio/maio.csv';
import MaioUpdate from './maio-update';
import MaioDeleteDialog from './maio-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={MaioRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MaioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MaioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MaioDetail} />
      <ErrorBoundaryRoute path={match.url} component={Maio} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MaioDeleteDialog} />
  </>
);

export default Routes;
