describe("Appointments", () => {
  beforeEach(() => {
    cy.wait(3000).then(() => {
      cy.request("GET", "/api/debug/reset");
    }); // Wait for WebSocket api server response before retting
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()
      .should("have.class", "day-list__item--selected");

    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()
      .should("have.class", "day-list__item--selected");

    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[alt='Tori Malcolm']").click();

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.contains("Save").click();
    cy.contains("Saving").should("exist");
    cy.contains("Saving").should("not.exist");

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it('should cancel an interview', () => {
    cy.contains("[data-testid=day]", "Monday")
    .click()
    .should("have.class", "day-list__item--selected");

    cy.get("[alt=Delete]").first().click({ force: true });

    cy.contains('Confirm').click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

      cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");



  });
});
