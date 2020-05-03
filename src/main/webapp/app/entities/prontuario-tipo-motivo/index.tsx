import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProntuarioTipoMotivo from './prontuario-tipo-motivo';
import ProntuarioTipoMotivoDetail from './prontuario-tipo-motivo-detail';
import ProntuarioTipoMotivoUpdate from './prontuario-tipo-motivo-update';
import ProntuarioTipoMotivoDeleteDialog from './prontuario-tipo-motivo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProntuarioTipoMotivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProntuarioTipoMotivoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProntuarioTipoMotivoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProntuarioTipoMotivo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProntuarioTipoMotivoDeleteDialog} />
  </>
);

export default Routes;
