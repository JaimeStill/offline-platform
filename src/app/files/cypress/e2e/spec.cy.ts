describe('<%= classify(name) %> Tests', () => {
	const base = 'http://localhost:<%= port %>/'

    it('Test the <%= classify(name) %> module', () => {
        cy.visit(base)
        cy.contains('<%= spacify(name) %>')
		cy.contains('Home')
        cy.screenshot('<%= dasherize(name) %>', {
            capture: "fullPage"
        })
    })
})
