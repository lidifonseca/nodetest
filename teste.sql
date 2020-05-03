





entity pad_item_meta                   DATA_LIMITE timestamp;
entity pad_item_meta                   UNIDADE_MEDIDA_ID int(11);
pad_item_resultado              USUARIO_ID int(11);
pad_item_meta                   ATENDIMENTO_ID int(11);
pad_item                        CATEGORIA_ID int(11);
licao_casa                      HORA_INICIO timestamp;




/* UNIDADES */

INSERT INTO nodetest_novo.unidade_easy 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, razao_social, nome_fantasia, cnpj, ie, telefone_1, telefone_2, endereco, numero, complemento, bairro, cidade, uf, cep, regans, regcnes, tissresponsavel, tissconselho, tissinscricao, tisscbo, tisscoduf, ativo)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
razao_social, nome_fantasia, cnpj, ie, telefone1 as telefone_1, telefone2 as telefone_2, endereco, numero, complemento, bairro, cidade, uf, cep, regans, regcnes, tissresponsavel, tissconselho, tissinscricao, tisscbo, tisscoduf, ativo
FROM concierge_db.unidade_easy;



/* PACIENTE */

INSERT INTO nodetest_novo.paciente 
(id,createdBy,createdDate,lastModifiedBy,lastModifiedDate,id_unidade,id_franquia,id_cidade,id_cidade_familiar,id_grau_parentesco,senha,nome,email,cpf,rg,registro,nascimento,sexo,telefone,telefone_2,celular,celular_1,cep,endereco,numero,complemento,bairro,cidade,uf,latitude,longitude,responsavel_familiar,email_familiar,cpf_familiar,rg_familiar,nascimento_familiar,sexo_familiar,telefone_familiar,telefone_2_familiar,celular_familiar,celular_2_familiar,cep_familiar,endereco_familiar,numero_familiar,complemento_familiar,bairro_familiar,cidade_familiar,uf_familiar,latitude_familiar,longitude_familiar,observacao,aph,nivel_complexidade,passagem_ps,obs_ps,passagem_internacao,obs_internacao,custo_total,observacao_familiar,mesmo_endereco,acesso_familiar,com_responsavel,cadastro_completo,ativo,detalhes,tipohospital,liminar,expo_token,profissional_pref,senha_chat)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
id_unidade, id_franquia, id_cidade, id_cidade_familiar, id_grau_parentesco, senha, nome, email, cpf, rg, registro, nascimento, sexo, telefone, telefone2 as telefone_2, celular, celular1 as celular_1, cep, endereco, numero, complemento, bairro, cidade, uf, latitude, longitude, responsavel_familiar, email_familiar, cpf_familiar, rg_familiar, nascimento_familiar, sexo_familiar, telefone_familiar, 
telefone2_familiar as telefone_2_familiar, celular_familiar, celular2_familiar as celular_2_familiar, cep_familiar, endereco_familiar, numero_familiar, complemento_familiar, bairro_familiar, cidade_familiar, uf_familiar, latitude_familiar, longitude_familiar, observacao, aph, nivel_complexidade, passagem_ps, obs_ps, passagem_internacao, obs_internacao, custo_total, observacao_familiar, mesmo_endereco, acesso_familiar, com_responsavel, cadastro_completo, ativo, detalhes, tipohospital, liminar, expo_token, profissional_pref, senha_chat
FROM concierge_db.paciente;


INSERT INTO nodetest_novo.paciente_arquivo 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, id_paciente, arquivo, ativo)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
id_paciente, arquivo, ativo
FROM concierge_db.paciente_arquivo;






/* OPERADORA */

INSERT INTO nodetest_novo.tipo_operadora 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, tipo, ativo)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
tipo, ativo
FROM concierge_db.tipo_operadora;


INSERT INTO nodetest_novo.operadora 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, nome_fantasia, razao_social, cnpj, ie, site, ativo, id_unidade, endereco, contato_central_atendimento, email_central_atendimento, nome_contato_comercial, contato_comercial, email_comercial, nome_contato_financeiro, contato_financeiro, email_financeiro, id_tipo_operadora)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
nome_fantasia, razao_social, cnpj, ie, site, ativo, id_unidade, endereco, contato_central_atendimento, email_central_atendimento, nome_contato_comercial, contato_comercial, email_comercial, nome_contato_financeiro, contato_financeiro, email_financeiro, id_tipo_operadora
FROM concierge_db.operadora;