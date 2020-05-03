import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalEspecialidadeNew from './profissional-especialidade-new';
import ProfissionalEspecialidadeNewDetail from './profissional-especialidade-new-detail';
import ProfissionalEspecialidadeNewUpdate from './profissional-especialidade-new-update';
import ProfissionalEspecialidadeNewDeleteDialog from './profissional-especialidade-new-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalEspecialidadeNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalEspecialidadeNewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalEspecialidadeNewDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalEspecialidadeNew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalEspecialidadeNewDeleteDialog} />
  </>
);

export default Routes;
