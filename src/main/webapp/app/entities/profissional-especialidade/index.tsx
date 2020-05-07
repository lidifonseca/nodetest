import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalEspecialidade from './profissional-especialidade';
import ProfissionalEspecialidadeDetail from './profissional-especialidade-detail';
import ProfissionalEspecialidadeRelatorioCSV from './relatorio/profissional-especialidade.csv';
import ProfissionalEspecialidadeUpdate from './profissional-especialidade-update';
import ProfissionalEspecialidadeDeleteDialog from './profissional-especialidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalEspecialidadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalEspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalEspecialidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalEspecialidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalEspecialidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalEspecialidadeDeleteDialog} />
  </>
);

export default Routes;
