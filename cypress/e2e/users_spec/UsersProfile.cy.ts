import FacilityHome from "pageobject/Facility/FacilityHome";

import LoginPage from "../../pageobject/Login/LoginPage";
import ManageUserPage from "../../pageobject/Users/ManageUserPage";
import UserProfilePage from "../../pageobject/Users/UserProfilePage";

describe("Manage User Profile", () => {
  const loginPage = new LoginPage();
  const userProfilePage = new UserProfilePage();
  const manageUserPage = new ManageUserPage();
  const facilityHome = new FacilityHome();

  const date_of_birth = "01011999";
  const gender = "Male";
  const email = "test@example.com";
  const phone = "8899887788";
  const workinghours = "8";
  const qualification = "MBBS";
  const doctorYoE = "10";
  const medicalCouncilRegistration = "1234567890";

  const facilitySearch = "Dummy Facility 40";

  before(() => {
    loginPage.loginByRole("devDoctor");
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.clearLocalStorage(/filters--.+/);
    cy.awaitUrl("/user/profile");
  });

  it("Set Dob, Gender, Email, Phone and Working Hours for a user and verify its reflection in user profile", () => {
    userProfilePage.clickEditProfileButton();

    userProfilePage.typeDateOfBirth(date_of_birth);
    userProfilePage.selectGender(gender);
    userProfilePage.typeEmail(email);
    userProfilePage.typePhoneNumber(phone);
    userProfilePage.typeWhatsappNumber(phone);
    userProfilePage.typeWorkingHours(workinghours);
    userProfilePage.typeQualification(qualification);
    userProfilePage.typeDoctorYoE(doctorYoE);
    userProfilePage.typeMedicalCouncilRegistration(medicalCouncilRegistration);
    userProfilePage.clickUpdateButton();
    cy.verifyNotification("Details updated successfully");
    userProfilePage.assertDateOfBirth("01/01/1999");
    userProfilePage.assertGender(gender);
    userProfilePage.assertEmail(email);
    userProfilePage.assertPhoneNumber(phone);
    userProfilePage.assertAltPhoneNumber(phone);
    userProfilePage.assertWorkingHours(workinghours);
  });

  it("Adding video connect link for a user and verify its reflection in user profile and doctor connect", () => {
    // verify the user doesn't have any video connect link
    userProfilePage.assertVideoConnectLink("-");
    //  Link a new video connect link and ensure it is under video connect link
    userProfilePage.clickEditProfileButton();
    userProfilePage.typeVideoConnectLink("https://www.example.com");
    userProfilePage.clickUpdateButton();
    userProfilePage.assertVideoConnectLink("https://www.example.com");
    // Edit the video connect link and ensure it is updated
    userProfilePage.clickEditProfileButton();
    userProfilePage.typeVideoConnectLink("https://www.test.com");
    userProfilePage.clickUpdateButton();
    userProfilePage.assertVideoConnectLink("https://www.test.com");
    //  Go to particular facility doctor connect and verify the video connect link is present
    facilityHome.navigateToFacilityHomepage();
    facilityHome.typeFacilitySearch(facilitySearch);
    facilityHome.assertFacilityInCard(facilitySearch);
    manageUserPage.clickFacilityPatients();
    manageUserPage.clickDoctorConnectButton();
    manageUserPage.assertVideoConnectLink("Dev Doctor", "https://www.test.com");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
