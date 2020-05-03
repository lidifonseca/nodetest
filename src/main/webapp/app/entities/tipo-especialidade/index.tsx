import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoEspecialidade from './tipo-especialidade';
import TipoEspecialidadeDetail from './tipo-especialidade-detail';
import TipoEspecialidadeUpdate from './tipo-especialidade-update';
import TipoEspecialidadeDeleteDialog from './tipo-especialidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoEspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoEspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoEspecialidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoEspecialidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TipoEspecialidadeDeleteDialog} />
  </>
);

export default Routes;
