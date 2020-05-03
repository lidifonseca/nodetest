import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoProntuario from './tipo-prontuario';
import TipoProntuarioDetail from './tipo-prontuario-detail';
import TipoProntuarioUpdate from './tipo-prontuario-update';
import TipoProntuarioDeleteDialog from './tipo-prontuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoProntuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoProntuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoProntuarioDeleteDialog} />
  </>
);

export default Routes;
