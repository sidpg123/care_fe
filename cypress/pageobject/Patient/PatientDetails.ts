export class PatientDetailsPage {
  clickAssignToVolunteer() {
    cy.contains("button", "Assign to a volunteer")
      .scrollIntoView()
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  selectAndAssignVolunteer(volunteerName: string) {
    cy.clickAndSelectOption("#assign_volunteer", volunteerName);
    cy.clickSubmitButton("Assign");
    cy.get("#assigned-volunteer", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .should("contain.text", volunteerName);
  }

  verifyVolunteerBannerIsUpdated(volunteerName: string) {
    cy.get("#assigned-volunteer").should(
      "contain.text",
      `Assigned Volunteer:${volunteerName}`,
    );
  }

  unassignAndPrepareForReassignment() {
    cy.get("#clear-button").should("be.visible").click();
    cy.get("#dropdown-toggle").should("be.visible").click();
    cy.clickSubmitButton("Assign");
  }

  verifyBannerIsRemovedAfterUnassign() {
    cy.get("#assigned-volunteer", { timeout: 10000 }).should("not.exist");
  }

  searchVolunteer(volunteerName: string) {
    cy.get("#assign_volunteer").click().type(volunteerName);
  }
}
