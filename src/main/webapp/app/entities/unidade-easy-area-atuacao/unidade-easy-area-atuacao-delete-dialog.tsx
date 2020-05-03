import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './unidade-easy-area-atuacao.reducer';

export interface IUnidadeEasyAreaAtuacaoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UnidadeEasyAreaAtuacaoDeleteDialog extends React.Component<IUnidadeEasyAreaAtuacaoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.unidadeEasyAreaAtuacaoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { unidadeEasyAreaAtuacaoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.unidadeEasyAreaAtuacao.delete.question">
          <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.delete.question" interpolate={{ id: unidadeEasyAreaAtuacaoEntity.id }}>
            Are you sure you want to delete this UnidadeEasyAreaAtuacao?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-unidadeEasyAreaAtuacao" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ unidadeEasyAreaAtuacao }: IRootState) => ({
  unidadeEasyAreaAtuacaoEntity: unidadeEasyAreaAtuacao.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyAreaAtuacaoDeleteDialog);
