import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FilesPanico from './files-panico';
import FilesPanicoDetail from './files-panico-detail';
import FilesPanicoRelatorioCSV from './relatorio/files-panico.csv';
import FilesPanicoUpdate from './files-panico-update';
import FilesPanicoDeleteDialog from './files-panico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={FilesPanicoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FilesPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FilesPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FilesPanicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={FilesPanico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FilesPanicoDeleteDialog} />
  </>
);

export default Routes;
