import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, UncontrolledTooltip, Label, DropdownItem} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AvForm, AvInput} from 'availity-reactstrap-validation';


const ModalEditarPesquisa = (props) => {
  const {
    buttonLabel,
    className
  } = props;


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (

    <span>
      <Button onClick={()=>toggle()} className="btn btn-sm btn-warning">
        <FontAwesomeIcon icon="pencil-alt"/>
      </Button>


      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className={"modal-header-dark"}>Editar dados da pesquisa</ModalHeader>
        <AvForm className="" onSubmit={props.insertObservacaoPesquisa} model={''}>
          <ModalBody>
            <div>
              <Label for="pesquisa-nome">Nome</Label>
              <AvInput id="pesquisa-nome" type="text" name="nome" value={props.nomePesquisa}/>
            </div>

            <div>
              <Label for="pesquisa-observacao">Observação</Label>
              <AvInput id="pesquisa-observacao" type="textarea" name="observacao" value={props.observacaoPesquisa}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={toggle} type="submit" >Salvar</Button>{' '}
            <Button color="dark" onClick={toggle}>Cancelar</Button>
          </ModalFooter>
        </AvForm>

      </Modal>
    </span>
  );
};

export default ModalEditarPesquisa;
