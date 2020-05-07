import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RespostasQuestionarios from './respostas-questionarios';
import RespostasQuestionariosDetail from './respostas-questionarios-detail';
import RespostasQuestionariosRelatorioCSV from './relatorio/respostas-questionarios.csv';
import RespostasQuestionariosUpdate from './respostas-questionarios-update';
import RespostasQuestionariosDeleteDialog from './respostas-questionarios-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={RespostasQuestionariosRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RespostasQuestionariosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RespostasQuestionariosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RespostasQuestionariosDetail} />
      <ErrorBoundaryRoute path={match.url} component={RespostasQuestionarios} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RespostasQuestionariosDeleteDialog} />
  </>
);

export default Routes;
