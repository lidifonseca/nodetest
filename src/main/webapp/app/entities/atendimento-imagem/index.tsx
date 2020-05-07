import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoImagem from './atendimento-imagem';
import AtendimentoImagemDetail from './atendimento-imagem-detail';
import AtendimentoImagemRelatorioCSV from './relatorio/atendimento-imagem.csv';
import AtendimentoImagemUpdate from './atendimento-imagem-update';
import AtendimentoImagemDeleteDialog from './atendimento-imagem-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtendimentoImagemRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoImagemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoImagemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoImagemDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoImagem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoImagemDeleteDialog} />
  </>
);

export default Routes;
