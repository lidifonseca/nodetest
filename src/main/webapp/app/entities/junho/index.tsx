import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Junho from './junho';
import JunhoDetail from './junho-detail';
import JunhoRelatorioCSV from './relatorio/junho.csv';
import JunhoUpdate from './junho-update';
import JunhoDeleteDialog from './junho-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={JunhoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JunhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JunhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JunhoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Junho} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JunhoDeleteDialog} />
  </>
);

export default Routes;
