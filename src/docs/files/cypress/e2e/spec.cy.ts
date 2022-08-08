describe('<%= classify(name) %> Tests', () => {
	const base = 'http://localhost:<%= port %>/'

    it('Test the <%= classify(name) %> module', () => {
        cy.visit(base)
        cy.contains('Directory')
		cy.contains('readme.md')
        cy.screenshot('<%= dasherize(name) %>', {
            capture: "fullPage"
        })
    })
})
