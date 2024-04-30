/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
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

    
})

