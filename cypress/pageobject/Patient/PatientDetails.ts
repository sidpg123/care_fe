export class PatientDetailsPage {
  clickAssignToVolunteer() {
    cy.verifyAndClickElement("#assign-volunteer", "Assign to a Volunteer");
  }

  clickReassignToVolunteer() {
    cy.verifyAndClickElement("#assign-volunteer", "Reassign Volunteer");
  }

  clickAssignOrReassignVolunteer() {
    cy.get("#assign-volunteer")
      .scrollIntoView()
      .should("be.visible")
      .should("be.enabled")
      .invoke("text")
      .then((text) => {
        if (text.includes("Assign to a Volunteer")) {
          cy.verifyAndClickElement(
            "#assign-volunteer",
            "Assign to a Volunteer",
          );
        } else if (text.includes("Reassign Volunteer")) {
          cy.verifyAndClickElement("#assign-volunteer", "Reassign Volunteer");
        } else {
          throw new Error("Expected button text not found.");
        }
      });
  }

  selectAndAssignVolunteer(volunteerName: string) {
    cy.clickAndSelectOption("#assign_volunteer", volunteerName);
    cy.clickSubmitButton("Assign");
    cy.wait(1000);
    cy.verifyContentPresence("#assigned-volunteer", [volunteerName]);
  }

  unassignAndPrepareForReassignment() {
    cy.get("#clear-button").should("be.visible").click();
    cy.get("#dropdown-toggle").should("be.visible").click();
    cy.clickSubmitButton("Unassign");
  }

  verifyBannerIsRemovedAfterUnassign() {
    cy.get("#assigned-volunteer", { timeout: 10000 }).should("not.exist");
  }

  searchVolunteer(volunteerName: string) {
    cy.get("#assign_volunteer")
      .should("be.visible")
      .click()
      .type(volunteerName);

    cy.get("[data-testid='volunteer-search-results']", {
      timeout: 10000,
    }).should("be.visible");
  }
}
