import LoginPage from "../../pageobject/Login/LoginPage";
import { PatientConsultationPage } from "../../pageobject/Patient/PatientConsultation";
import { PatientPage } from "../../pageobject/Patient/PatientCreation";
import { PatientDetailsPage } from "../../pageobject/Patient/PatientDetails";

describe("Assign a volunteer to a patient", () => {
  const loginPage = new LoginPage();
  const patientPage = new PatientPage();
  const patientConsultationPage = new PatientConsultationPage();
  const patientDetailsPage = new PatientDetailsPage();
  const patient = "Dummy Patient 16";
  const volunteerName = "dummy volunteer";
  const anotherVolunteerName = "Abhi Patil";

  before(() => {
    cy.log("Logging in as district admin");
    loginPage.loginAsDistrictAdmin();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.clearLocalStorage(/filters--.+/);
    cy.request("/patients").its("status").should("eq", 200);

    cy.visit("/patients").then(() => {
      cy.log("Successfully navigated to patients page");
    });

    // Add timeout and retry strategy for patient search
    cy.wrap(null, { timeout: 10000 }).then(() => {
      patientPage.visitPatient(patient);
    });

    // Verify patient details page is accessible
    cy.get("#patient-details").should("exist");
    patientConsultationPage.clickPatientDetails();
  });

  describe("volunteer assignment workflow", () => {
    it("should assign a new volunteer successfully", () => {
      patientDetailsPage.clickAssignToVolunteer();
      patientDetailsPage.selectAndAssignVolunteer(volunteerName);
      patientDetailsPage.verifyVolunteerBannerIsUpdated(volunteerName);
    });

    it("should replace existing volunteer successfully", () => {
      patientDetailsPage.clickAssignToVolunteer();
      patientDetailsPage.selectAndAssignVolunteer(anotherVolunteerName);
      patientDetailsPage.verifyVolunteerBannerIsUpdated(anotherVolunteerName);
    });

    it("should unassign volunteer successfully", () => {
      patientDetailsPage.clickAssignToVolunteer();
      patientDetailsPage.unassignAndPrepareForReassignment();
      patientDetailsPage.verifyBannerIsRemovedAfterUnassign();
    });
  });

  describe("error states and edge cases", () => {
    it("should handle volunteer not found in dropdown", () => {
      patientDetailsPage.clickAssignToVolunteer();
      patientDetailsPage.searchVolunteer("Non-existent Volunteer");
      cy.get('[data-testid="no-results"]').should("be.visible");
    });
  });
});
