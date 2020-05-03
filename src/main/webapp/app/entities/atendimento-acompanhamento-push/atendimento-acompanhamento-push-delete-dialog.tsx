import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAtendimentoAcompanhamentoPush } from 'app/shared/model/atendimento-acompanhamento-push.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './atendimento-acompanhamento-push.reducer';

export interface IAtendimentoAcompanhamentoPushDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAcompanhamentoPushDeleteDialog extends React.Component<IAtendimentoAcompanhamentoPushDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.atendimentoAcompanhamentoPushEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { atendimentoAcompanhamentoPushEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.atendimentoAcompanhamentoPush.delete.question">
          <Translate
            contentKey="generadorApp.atendimentoAcompanhamentoPush.delete.question"
            interpolate={{ id: atendimentoAcompanhamentoPushEntity.id }}
          >
            Are you sure you want to delete this AtendimentoAcompanhamentoPush?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-atendimentoAcompanhamentoPush" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ atendimentoAcompanhamentoPush }: IRootState) => ({
  atendimentoAcompanhamentoPushEntity: atendimentoAcompanhamentoPush.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAcompanhamentoPushDeleteDialog);
