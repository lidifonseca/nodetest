import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PerguntasQuestionario from './perguntas-questionario';
import PerguntasQuestionarioDetail from './perguntas-questionario-detail';
import PerguntasQuestionarioRelatorioCSV from './relatorio/perguntas-questionario.csv';
import PerguntasQuestionarioUpdate from './perguntas-questionario-update';
import PerguntasQuestionarioDeleteDialog from './perguntas-questionario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PerguntasQuestionarioRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PerguntasQuestionarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PerguntasQuestionarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PerguntasQuestionarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={PerguntasQuestionario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PerguntasQuestionarioDeleteDialog} />
  </>
);

export default Routes;
