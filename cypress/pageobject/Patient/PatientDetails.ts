export class PatientDetailsPage {
  clickAssignToVolunteer() {
    cy.verifyAndClickElement("#assign-volunteer", "Assign to a Volunteer");
  }

  clickReassignToVolunteer() {
    cy.verifyAndClickElement("#assign-volunteer", "Reassign Volunteer");
  }

  clickAssignOrReassignVolunteer() {
    cy.get("#assign-volunteer")
      .invoke("text")
      .then((text) => {
        if (text.includes("Assign to a Volunteer")) {
          this.clickAssignToVolunteer();
        } else if (text.includes("Reassign Volunteer")) {
          this.clickReassignToVolunteer();
        } else {
          throw new Error(
            `Button text must be either "Assign to a Volunteer" or "Reassign Volunteer", but found: "${text}"`,
          );
        }
      });
  }

  selectAndAssignVolunteer(volunteerName: string) {
    cy.clickAndSelectOption("#assign_volunteer", volunteerName);
    cy.clickSubmitButton("Assign");
    cy.wait(1000);
    cy.verifyContentPresence("#assigned-volunteer", [volunteerName]);
  }

  unassignVolunteer() {
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
