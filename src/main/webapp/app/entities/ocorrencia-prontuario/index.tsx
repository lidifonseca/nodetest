import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OcorrenciaProntuario from './ocorrencia-prontuario';
import OcorrenciaProntuarioDetail from './ocorrencia-prontuario-detail';
import OcorrenciaProntuarioRelatorioCSV from './relatorio/ocorrencia-prontuario.csv';
import OcorrenciaProntuarioUpdate from './ocorrencia-prontuario-update';
import OcorrenciaProntuarioDeleteDialog from './ocorrencia-prontuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={OcorrenciaProntuarioRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OcorrenciaProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OcorrenciaProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OcorrenciaProntuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={OcorrenciaProntuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OcorrenciaProntuarioDeleteDialog} />
  </>
);

export default Routes;
