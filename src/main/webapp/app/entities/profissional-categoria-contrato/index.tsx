import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalCategoriaContrato from './profissional-categoria-contrato';
import ProfissionalCategoriaContratoDetail from './profissional-categoria-contrato-detail';
import ProfissionalCategoriaContratoUpdate from './profissional-categoria-contrato-update';
import ProfissionalCategoriaContratoDeleteDialog from './profissional-categoria-contrato-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalCategoriaContratoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalCategoriaContratoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalCategoriaContratoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalCategoriaContrato} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalCategoriaContratoDeleteDialog} />
  </>
);

export default Routes;
