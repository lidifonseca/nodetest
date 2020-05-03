import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PacienteProntuario from './paciente-prontuario';
import PacienteProntuarioDetail from './paciente-prontuario-detail';
import PacienteProntuarioUpdate from './paciente-prontuario-update';
import PacienteProntuarioDeleteDialog from './paciente-prontuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PacienteProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PacienteProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PacienteProntuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={PacienteProntuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PacienteProntuarioDeleteDialog} />
  </>
);

export default Routes;
