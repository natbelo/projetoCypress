describe('Teste CRUD de usuários', () => {
  /*beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Acessar aplicação', () => {
    cy.get('.title').should('have.text', 'ServeRest 2.27.5 ')
  })*/

  context('POST /users', ()=>{
    it('Cria um usuário', () => {
      const bodyTeste = {
        "nome": "Teste NB 12",
        "email": "testenb12@qa.com.br",
        "password": "010101",
        "administrador": "true"
      };
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/usuarios',
        body: bodyTeste,
      }).then((response)=>{
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        cy.log('Resposta da criação do usuário:', JSON.stringify(response.body, null, 2));
      });
    });
  })
  context('GET /users', ()=>{
    it('Retorna usuário', () => {
         cy.request({
         method: 'GET',
         url: 'http://localhost:3000/usuarios',        
       }).then((response)=>{
         expect(response.status).to.equal(200)
         cy.log('Usuários cadastrados:', JSON.stringify(response.body.usuarios, null, 2));
       })
       
     });
   })
   context('DELETE /users', ()=>{
    it.only('Retorna usuário', () => {
         cy.request({
         method: 'DELETE',
         url: 'http://localhost:3000/usuarios/:_DLIlbNwVcyOBWGjz',
        // path: ':_DLIlbNwVcyOBWGjz'        
       }).then((response)=>{
         expect(response.status).to.equal(200)
         //cy.log('Usuários cadastrados:', JSON.stringify(response.body.usuarios, null, 2));
       })
       
     });
   })
})