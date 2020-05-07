import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoExame from './tipo-exame';
import TipoExameDetail from './tipo-exame-detail';
import TipoExameRelatorioCSV from './relatorio/tipo-exame.csv';
import TipoExameUpdate from './tipo-exame-update';
import TipoExameDeleteDialog from './tipo-exame-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={TipoExameRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoExameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoExameUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoExameDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoExame} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoExameDeleteDialog} />
  </>
);

export default Routes;
