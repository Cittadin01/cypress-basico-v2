/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        const longText = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Cittadin')
        cy.get('#email').type('teste@hotmail.com')
        cy.get('#phone') .type('123456789')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
        const longText = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
       
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Cittadin')
        cy.get('#email').type('teste@hotmail,com')
        cy.get('#phone') .type('123456789')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio quando preenchido errado', function(){

        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
       
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Cittadin')
        cy.get('#email').type('teste@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('TESTE')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName')
            .type('Lula')
            .should('have.value', 'Lula')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Bolsonaro')
            .should('have.value', 'Bolsonaro')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

        cy.contains('button', 'Enviar').click() 
        
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.fillall()

        cy.get('.success').should('be.visible')
    })

    

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('Mentoria')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select('Blog')
            .select('Blog')
            .should('have.value', 'blog')
    })
    
    it('seleciona um produto (Cursos) por seu indice', function(){

        cy.get('#product').select('Cursos')
            .select('Cursos')
            .should('have.value', 'cursos')
    })

    it('marca todos os tipos de atendimentos', function(){

        cy.get('input[type="radio"]').check()
            .should('be.checked')   
    })    

    it('marca o tipo de atendimento "Feedback"', function(){

        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
            .should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){

        cy.get('input[type="checkbox"]').check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Cittadin')
        cy.get('#email').type('teste@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('TESTE')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){

        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/exemplo.json')
            .should(function($input){
               expect($input[0].files[0].name).to.equal('exemplo.json') 
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){

        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/exemplo.json'), {action: 'drag-drop'}
           
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){

        cy.fixture('exemplo').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

        cy.get('#privacy a').should('have.attr', 'target', '_blank').click()
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('faz uma requisição HTTP', function(){

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })

})
