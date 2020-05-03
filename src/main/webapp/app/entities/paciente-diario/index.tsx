import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteDiario from './paciente-diario';
import PacienteDiarioDetail from './paciente-diario-detail';
import PacienteDiarioUpdate from './paciente-diario-update';
import PacienteDiarioDeleteDialog from './paciente-diario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteDiarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteDiarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteDiarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteDiario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteDiarioDeleteDialog} />
  </>
);

export default Routes;
