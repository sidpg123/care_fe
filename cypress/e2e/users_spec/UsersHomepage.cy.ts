import { advanceFilters } from "pageobject/utils/advanceFilterHelpers";
import { pageNavigation } from "pageobject/utils/paginationHelpers";

import LoginPage from "../../pageobject/Login/LoginPage";
import { UserPage } from "../../pageobject/Users/UserSearch";

describe("User Homepage", () => {
  const userPage = new UserPage();
  const loginPage = new LoginPage();
  const currentuser = "devdistrictadmin";
  const firstName = "Dummy";
  const lastName = "Nurse";
  const role = "Nurse";
  const state = "Kerala";
  const district = "Ernakulam";
  const phoneNumber = "8878825662";
  const altPhoneNumber = "8878825662";
  const homeFacility = "Dummy Facility 40";
  const nurseUserName = "dummynurse1";
  const doctorUserName = "dev-doctor2";

  before(() => {
    loginPage.loginByRole("districtAdmin");
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.clearLocalStorage(/filters--.+/);
    cy.awaitUrl("/users");
  });

  it("User advance filter functionality", () => {
    advanceFilters.clickAdvancedFiltersButton();
    userPage.typeInFirstName(firstName);
    userPage.typeInLastName(lastName);
    userPage.selectRole(role);
    userPage.selectState(state);
    userPage.selectDistrict(district);
    userPage.typeInPhoneNumber(phoneNumber);
    userPage.typeInAltPhoneNumber(altPhoneNumber);
    userPage.selectHomeFacility(homeFacility);
    advanceFilters.applySelectedFilter();
    userPage.checkUsernameText(nurseUserName);
    // Verify the badges related to the data
    advanceFilters.verifyFilterBadgePresence("First Name", firstName, true);
    advanceFilters.verifyFilterBadgePresence("Last Name", lastName, true);
    advanceFilters.verifyFilterBadgePresence("Phone Number", phoneNumber, true);
    advanceFilters.verifyFilterBadgePresence(
      "WhatsApp no.",
      altPhoneNumber,
      true,
    );
    advanceFilters.verifyFilterBadgePresence("Role", role, true);
    advanceFilters.verifyFilterBadgePresence(
      "Home Facility",
      homeFacility,
      true,
    );
    advanceFilters.clickAdvancedFiltersButton();
    advanceFilters.clickClearAdvanceFilters();
    advanceFilters.verifyFilterBadgePresence("First Name", "", false);
    advanceFilters.verifyFilterBadgePresence("Last Name", "", false);
    advanceFilters.verifyFilterBadgePresence("Phone Number", "", false);
    advanceFilters.verifyFilterBadgePresence("WhatsApp no.", "", false);
    advanceFilters.verifyFilterBadgePresence("Role", "", false);
    advanceFilters.verifyFilterBadgePresence("Home Facility", "", false);
  });

  it("Search by username", () => {
    userPage.checkSearchInputVisibility();
    userPage.typeInSearchInput(doctorUserName);
    userPage.checkUrlForUsername(doctorUserName);
    userPage.checkUsernameText(doctorUserName);
    userPage.checkUsernameBadgeVisibility(true);
    userPage.clearSearchInput();
    userPage.checkUsernameBadgeVisibility(false);
    userPage.typeInSearchInput(doctorUserName);
    userPage.checkUsernameText(doctorUserName);
    userPage.clickRemoveIcon();
    userPage.checkUsernameBadgeVisibility(false);
    userPage.checkUsernameText(currentuser);
  });

  it("Next/Previous Page Navigation", () => {
    pageNavigation.navigateToNextPage();
    pageNavigation.verifyCurrentPageNumber(2);
    pageNavigation.navigateToPreviousPage();
    pageNavigation.verifyCurrentPageNumber(1);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
