import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalHorario from './profissional-horario';
import ProfissionalHorarioDetail from './profissional-horario-detail';
import ProfissionalHorarioUpdate from './profissional-horario-update';
import ProfissionalHorarioDeleteDialog from './profissional-horario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalHorarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalHorarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalHorarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalHorario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalHorarioDeleteDialog} />
  </>
);

export default Routes;
