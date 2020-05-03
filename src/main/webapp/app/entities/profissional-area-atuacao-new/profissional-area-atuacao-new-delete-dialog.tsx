import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalAreaAtuacaoNew } from 'app/shared/model/profissional-area-atuacao-new.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './profissional-area-atuacao-new.reducer';

export interface IProfissionalAreaAtuacaoNewDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalAreaAtuacaoNewDeleteDialog extends React.Component<IProfissionalAreaAtuacaoNewDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.profissionalAreaAtuacaoNewEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { profissionalAreaAtuacaoNewEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.profissionalAreaAtuacaoNew.delete.question">
          <Translate
            contentKey="generadorApp.profissionalAreaAtuacaoNew.delete.question"
            interpolate={{ id: profissionalAreaAtuacaoNewEntity.id }}
          >
            Are you sure you want to delete this ProfissionalAreaAtuacaoNew?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-profissionalAreaAtuacaoNew" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ profissionalAreaAtuacaoNew }: IRootState) => ({
  profissionalAreaAtuacaoNewEntity: profissionalAreaAtuacaoNew.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalAreaAtuacaoNewDeleteDialog);
