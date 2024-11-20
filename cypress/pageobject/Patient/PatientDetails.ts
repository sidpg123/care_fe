export class PatientDetailsPage {
  clickAssignToAVounteer() {
    cy.get('button:contains("Assign to a volunteer")').click({ force: true });
  }

  selectAndAssignVolunteer(volunteerName: string) {
    cy.clickAndSelectOption("#assign_volunteer", volunteerName);
    cy.clickSubmitButton("Assign");
    cy.wait(2000);
  }

  verifyVolunteerBannerIsUpdated(volunteerName: string) {
    cy.get("#assigned-volunteer")
      .scrollIntoView()
      .should("contain.text", `Assigned Volunteer:${volunteerName}`);
  }

  unassignVolunteer() {
    cy.get("#clear-button").should("be.visible").find("svg").click();
    // Close the dropdown
    cy.get('button[id^="headlessui-combobox-button-"]').click(); // Click the dropdown close button

    cy.clickSubmitButton("Assign");
  }

  verifyBannerIsRemovedAfterUnassign() {
    cy.get("#assigned-volunteer").should("not.exist"); // Ensure the banner does not exist
  }
}
