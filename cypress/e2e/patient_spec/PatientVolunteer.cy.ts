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
  });

  it("assigns a volunteer to a patient and checks the banner that shows the volunteer's name", () => {
    cy.visit("/patients");

    patientPage.visitPatient(patient);
    patientConsultationPage.clickPatientDetails();

    patientDetailsPage.clickAssignToAVounteer();

    patientDetailsPage.selectAndAssignVolunteer(volunteerName);

    patientDetailsPage.verifyVolunteerBannerIsUpdated(volunteerName);

    patientDetailsPage.clickAssignToAVounteer();

    patientDetailsPage.selectAndAssignVolunteer(anotherVolunteerName);

    patientDetailsPage.verifyVolunteerBannerIsUpdated(anotherVolunteerName);

    patientDetailsPage.clickAssignToAVounteer();

    patientDetailsPage.unassignVolunteer();

    patientDetailsPage.verifyBannerIsRemovedAfterUnassign();
  });
});
