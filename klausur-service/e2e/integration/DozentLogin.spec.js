describe("Scenario: Dozen logs in", () => {
    before(() => {
        // GIVEN I am on the details page of a child
        cy.visit("/");
    });

    //WHEN I am at index.html page, I can choose "I am Dozent" button
    it('Click "I am Dozent" button', function (){
        //We see button
        cy.contains("button", "I am Dozent").should("be.visible");
        //We click button
        cy.get('#dozentBtn').click();
    })

    //WHEN I log in with wrong data - I see warning "Mail oder Password sind falsh!"
    it('input with wrong data', function (){
        //We see input Mail
        cy.get('#dozentMailInput').should("be.visible");
        //We click Password
        cy.get('#dozentPasswordInput').should("be.visible");
        //We see button Submit
        cy.contains("input", "Submit").should("be.visible");
        //We type to Mail input wrong Email
        cy.get('#dozentMailInput').type("WrongMail@mail.com");
        //We type to Password input wrong password
        cy.get('#dozentPasswordInput').type("123456");
        //We click on Submit
        cy.contains("input", "Submit").click();
        //We see alert
        cy.get('#LoginStatus').should("be.visible").should("contain", "Mail oder Password sind falsh!")
    })
});
