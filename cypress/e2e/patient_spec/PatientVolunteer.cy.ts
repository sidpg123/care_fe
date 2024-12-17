import LoginPage from "../../pageobject/Login/LoginPage";
import { PatientConsultationPage } from "../../pageobject/Patient/PatientConsultation";
import { PatientPage } from "../../pageobject/Patient/PatientCreation";
import { PatientDetailsPage } from "../../pageobject/Patient/PatientDetails";

describe("Assign a volunteer to a patient - Multiple Tests", () => {
  const loginPage = new LoginPage();
  const patientPage = new PatientPage();
  const patientConsultationPage = new PatientConsultationPage();
  const patientDetailsPage = new PatientDetailsPage();
  const patient = "Dummy Patient 16";
  const volunteerName = "dummy volunteer";
  const anotherVolunteerName = "Abhi Patil";

  before(() => {
    loginPage.loginByRole("districtAdmin");
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.clearLocalStorage(/filters--.+/);
    cy.request("/patients").its("status").should("eq", 200);

    cy.visit("/patients");
    cy.wrap(null, { timeout: 10000 }).then(() => {
      patientPage.visitPatient(patient);
    });

    cy.get("#patient-details").should("exist");
    patientConsultationPage.clickPatientDetails();
  });

  it("should assign a new volunteer successfully", () => {
    patientDetailsPage.clickAssignOrReassignVolunteer();
    patientDetailsPage.selectAndAssignVolunteer(volunteerName);
  });

  it("should replace existing volunteer successfully", () => {
    patientDetailsPage.clickAssignOrReassignVolunteer();
    patientDetailsPage.selectAndAssignVolunteer(anotherVolunteerName);
  });

  it("should unassign volunteer successfully", () => {
    patientDetailsPage.clickAssignOrReassignVolunteer();
    patientDetailsPage.unassignVolunteer();
    patientDetailsPage.verifyBannerIsRemovedAfterUnassign();
  });

  it("should handle volunteer not found in dropdown", () => {
    patientDetailsPage.clickAssignOrReassignVolunteer();
    patientDetailsPage.searchNonExistingVolunteer(
      "Non-existent Volunteer",
      false,
    );
  });
});
