Cypress.Commands.add('fillall', function(){
    const longText = 'TESTETESTETESTETESTE, TESTETESTETESTETESTE, TESTETESTETESTETESTE, TESTETESTETESTETESTE, TESTETESTETESTETESTE'

    cy.get('#firstName').type('Lebron')
    cy.get('#lastName').type('James')
    cy.get('#email').type('papailebron@exemplo.com')
    cy.get('#phone').type('123456789')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
})