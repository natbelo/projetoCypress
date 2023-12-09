import { createUserBody, updateUserBody } from '/cypress/fixtures/userTestData.js';

  context('CRUD /users', () => {
    let userId; 
  
    it('Cria um usuário', () => {
        
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: createUserBody,
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
  
        userId = response.body._id;
        expect(userId).to.be.a('string');
  
        cy.log('ID do usuário criado:', userId);
        cy.log('Resposta da criação do usuário:', JSON.stringify(response.body, null, 2));
      });
    });
  
    it('Edita um usuário', () => {
      
      cy.request({
        method: 'PUT',
        url: `/usuarios/${userId}`,
        body: updateUserBody,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
  
        cy.log('Resposta da edição do usuário:', JSON.stringify(response.body, null, 2));
      });
    });
  
    it('Retorna o usuário', () => {
      cy.request({
        method: 'GET',
        url: `/usuarios/${userId}`,        
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.body).to.have.property('nome', 'POC Cypress Editado');
        expect(response.body).to.have.property('email', 'poccypress@qa.com.br');
  
        cy.log('Usuários cadastrados:', JSON.stringify(response.body.usuarios, null, 2));
        
      });
    });
  
    it('Apaga o usuário', () => {
      cy.request({
        method: 'DELETE',
        url: `/usuarios/${userId}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
      });
    });
  })
  
