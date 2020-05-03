import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './profissional-complexidade-atual.reducer';

export interface IProfissionalComplexidadeAtualDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalComplexidadeAtualDeleteDialog extends React.Component<IProfissionalComplexidadeAtualDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.profissionalComplexidadeAtualEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { profissionalComplexidadeAtualEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.profissionalComplexidadeAtual.delete.question">
          <Translate
            contentKey="generadorApp.profissionalComplexidadeAtual.delete.question"
            interpolate={{ id: profissionalComplexidadeAtualEntity.id }}
          >
            Are you sure you want to delete this ProfissionalComplexidadeAtual?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-profissionalComplexidadeAtual" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ profissionalComplexidadeAtual }: IRootState) => ({
  profissionalComplexidadeAtualEntity: profissionalComplexidadeAtual.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalComplexidadeAtualDeleteDialog);
