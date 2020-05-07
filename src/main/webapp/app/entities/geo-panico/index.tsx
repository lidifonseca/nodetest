import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GeoPanico from './geo-panico';
import GeoPanicoDetail from './geo-panico-detail';
import GeoPanicoRelatorioCSV from './relatorio/geo-panico.csv';
import GeoPanicoUpdate from './geo-panico-update';
import GeoPanicoDeleteDialog from './geo-panico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={GeoPanicoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GeoPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GeoPanicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GeoPanicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={GeoPanico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GeoPanicoDeleteDialog} />
  </>
);

export default Routes;
