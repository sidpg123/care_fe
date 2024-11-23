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
    cy.visit("/patients").then(() => {
      cy.log("Successfully navigated to patients page");
    });
    patientPage.visitPatient(patient);
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
});
