import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Uf from './uf';
import UfDetail from './uf-detail';
import UfRelatorioCSV from './relatorio/uf.csv';
import UfUpdate from './uf-update';
import UfDeleteDialog from './uf-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={UfRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UfUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UfUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UfDetail} />
      <ErrorBoundaryRoute path={match.url} component={Uf} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UfDeleteDialog} />
  </>
);

export default Routes;
