import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Franquia from './franquia';
import FranquiaDetail from './franquia-detail';
import FranquiaRelatorioCSV from './relatorio/franquia.csv';
import FranquiaUpdate from './franquia-update';
import FranquiaDeleteDialog from './franquia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={FranquiaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FranquiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Franquia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FranquiaDeleteDialog} />
  </>
);

export default Routes;
