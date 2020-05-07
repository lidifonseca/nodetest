import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalFranquia from './profissional-franquia';
import ProfissionalFranquiaDetail from './profissional-franquia-detail';
import ProfissionalFranquiaRelatorioCSV from './relatorio/profissional-franquia.csv';
import ProfissionalFranquiaUpdate from './profissional-franquia-update';
import ProfissionalFranquiaDeleteDialog from './profissional-franquia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalFranquiaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalFranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalFranquiaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalFranquiaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalFranquia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalFranquiaDeleteDialog} />
  </>
);

export default Routes;
