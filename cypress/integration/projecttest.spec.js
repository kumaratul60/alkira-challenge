 <reference types="cypress" />

describe("Project Test", ()=>{
    beforeEach(()=>{
        cy.visit("/")
    });

    it("Project test search1",()=>{
        // cy.reload()
        cy.wait(2000)
        cy.get("[type='text']").type("ha").parent()
        cy.wait(2000)
        // cy.go("back")
        
    })
    it("Project test search2",()=>{
        // cy.reload()
        cy.wait(2000)
        cy.get("[type='text']").type("h").parent()
        cy.wait(2000)
        
    })
    it("Project test search3",()=>{
        // cy.reload()
        cy.wait(2000)
        cy.get("[type='text']").type("c").parent()
        cy.wait(2000)
        
    })
    it("Project test sidebar",()=>{
        cy.wait(2000)
        cy.contains("Hawks",).click()
        cy.wait(4000)
        cy.get(".btn-close").click()

    })

    it("project pagination test",()=>{
        cy.wait(2000)
        cy.get("[aria-label='Go to page 2']").click();
        cy.wait(1000)
        cy.get("[aria-label='Go to page 4']").click();
        cy.wait(1000)
        cy.get("[aria-label='Go to page 1']").click().should("be.visible")
    })
})