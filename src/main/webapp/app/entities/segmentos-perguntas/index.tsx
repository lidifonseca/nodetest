import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SegmentosPerguntas from './segmentos-perguntas';
import SegmentosPerguntasDetail from './segmentos-perguntas-detail';
import SegmentosPerguntasRelatorioCSV from './relatorio/segmentos-perguntas.csv';
import SegmentosPerguntasUpdate from './segmentos-perguntas-update';
import SegmentosPerguntasDeleteDialog from './segmentos-perguntas-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={SegmentosPerguntasRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SegmentosPerguntasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SegmentosPerguntasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SegmentosPerguntasDetail} />
      <ErrorBoundaryRoute path={match.url} component={SegmentosPerguntas} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SegmentosPerguntasDeleteDialog} />
  </>
);

export default Routes;
