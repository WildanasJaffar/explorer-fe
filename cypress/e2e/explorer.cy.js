describe('Explorer App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173') 
  })

  it('displays root folder and childrens at sidebar', () => {
    cy.get('aside ul li div').contains('Home').should('exist')
    cy.get('aside ul li ul li').contains('📁').should('exist')
  })

  it('can select a folder from sidebar', () => {
    cy.get('aside ul li ul li').contains('📁').click()
  })

  it('can open a folder from main content', () => {
    cy.get('main ul li').contains('📁').dblclick()
    cy.get('main ul li').contains('📁').dblclick()
    cy.get('main ul li').contains('📁').dblclick()
  })

  it('can open a folder from navbar', () => {
    cy.get('main ul li').contains('📁').dblclick()
    cy.get('main ul li').contains('📁').dblclick()
    cy.get('main ul li').contains('📁').dblclick()
    cy.get('nav div .cursor-pointer').contains('L1').click()
  })

  it('can search folder or files', () => {
    cy.get('nav input').type('L1')
    cy.get('main ul li').each(($el) => {
      cy.wrap($el).should('contain.text', 'L1')
    })
  })
})
