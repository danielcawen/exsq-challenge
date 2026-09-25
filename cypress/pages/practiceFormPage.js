import { formatDateForModal } from "../utils/helpers";

const firstNameInput = "#firstName";
const lastNameInput = "#lastName";
const emailInput = "#userEmail";
const mobileInput = "#userNumber";
const dateOfBirthInput = "#dateOfBirthInput";
const monthSelect = ".react-datepicker__month-select";
const yearSelect = ".react-datepicker__year-select";
const calendarMonth = ".react-datepicker__month";
const calendarDay = ".react-datepicker__day:not(.react-datepicker__day--outside-month)";
const subjectsInput = "#subjectsInput";
const pictureUpload = "#uploadPicture";
const currentAddressTextarea = "#currentAddress";
const stateContainer = "#state";
const cityContainer = "#city";
const cityPlaceholder = "[class*='placeholder']";
const reactSelectMenu = '[role="listbox"]';
const submitButton = "#submit";
const confirmationModal = ".modal-dialog";
const modalTitle = "#example-modal-sizes-title-lg";
const confirmationTableCell = ".table td";

const GENDER_LABELS = {
  Male: 'label[for="gender-radio-1"]',
  Female: 'label[for="gender-radio-2"]',
  Other: 'label[for="gender-radio-3"]',
};

const GENDER_INPUTS = {
  Male: "#gender-radio-1",
  Female: "#gender-radio-2",
  Other: "#gender-radio-3",
};

const HOBBY_LABELS = {
  Sports: 'label[for="hobbies-checkbox-1"]',
  Reading: 'label[for="hobbies-checkbox-2"]',
  Music: 'label[for="hobbies-checkbox-3"]',
};

const HOBBY_INPUTS = {
  Sports: "#hobbies-checkbox-1",
  Reading: "#hobbies-checkbox-2",
  Music: "#hobbies-checkbox-3",
};

export function navigate() {
  cy.visit("/automation-practice-form");
}

export function fillFirstName(value) {
  cy.get(firstNameInput).clear();
  cy.get(firstNameInput).type(value);
}

export function fillLastName(value) {
  cy.get(lastNameInput).clear();
  cy.get(lastNameInput).type(value);
}

export function fillEmail(value) {
  cy.get(emailInput).clear();
  cy.get(emailInput).type(value);
}

export function selectGender(gender) {
  cy.get(GENDER_LABELS[gender]).click();
  cy.get(GENDER_INPUTS[gender]).should("be.checked");
}

export function fillMobile(value) {
  cy.get(mobileInput).clear();
  cy.get(mobileInput).type(value);
}

export function fillDateOfBirth(date) {
  const parsedDate = date instanceof Date ? date : new Date(date);
  cy.get(dateOfBirthInput).click();
  cy.get(monthSelect).select(String(parsedDate.getMonth()));
  cy.get(yearSelect).select(String(parsedDate.getFullYear()));
  cy.get(calendarMonth).contains(calendarDay, String(parsedDate.getDate())).click();
}

export function fillSubjects(subjects) {
  subjects.forEach((subject) => {
    cy.get(subjectsInput).type(subject);
    cy.get('[role="option"]').contains(subject).click();
  });
}

export function checkHobbies(hobbies) {
  hobbies.forEach((hobby) => {
    cy.get(HOBBY_LABELS[hobby]).click();
    cy.get(HOBBY_INPUTS[hobby]).should("be.checked");
  });
}

export function uploadPicture(fileName) {
  cy.get(pictureUpload).selectFile(`cypress/fixtures/files/${fileName}`);
}

export function fillCurrentAddress(value) {
  cy.get(currentAddressTextarea).clear();
  cy.get(currentAddressTextarea).type(value);
}

export function selectState(state) {
  cy.get(stateContainer).click();
  cy.get(stateContainer).find("input").type(`${state}{enter}`);
}

export function selectCity(city) {
  cy.get(cityContainer).click();
  cy.get(cityContainer).find("input").type(`${city}{enter}`);
}

export function submit() {
  cy.get(submitButton).click();
}

export function fillAll(user, { picture } = {}) {
  fillFirstName(user.firstName);
  fillLastName(user.lastName);
  if (user.email) fillEmail(user.email);
  selectGender(user.gender);
  fillMobile(user.mobile);
  if (user.dateOfBirth) fillDateOfBirth(user.dateOfBirth);
  if (user.subjects?.length) fillSubjects(user.subjects);
  if (user.hobbies?.length) checkHobbies(user.hobbies);
  if (picture) uploadPicture(picture);
  if (user.currentAddress) fillCurrentAddress(user.currentAddress);
  if (user.state) selectState(user.state);
  if (user.city) selectCity(user.city);
}

export function assertSubmitButtonVisible() {
  cy.get(submitButton).scrollIntoView();
  cy.get(submitButton).should("be.visible");
}

export function assertModalNotExist() {
  cy.get(confirmationModal).should("not.exist");
}

export function assertRequiredFieldsInvalid() {
  cy.get(firstNameInput).should("have.prop", "validity").its("valid").should("be.false");
  cy.get(lastNameInput).should("have.prop", "validity").its("valid").should("be.false");
  cy.get(mobileInput).should("have.prop", "validity").its("valid").should("be.false");
}

export function assertCityDisabled() {
  cy.get(cityContainer).find(cityPlaceholder).should("exist");
}

export function assertCityOptionNotAvailable(city) {
  cy.get(cityContainer).click();
  cy.get(cityContainer).find("input").type(city);
  cy.get(reactSelectMenu).should("not.contain.text", city);
  cy.get(cityContainer).find("input").clear();
}

export function assertConfirmationModal(expected) {
  cy.get(confirmationModal).should("be.visible");
  cy.get(modalTitle).should("contain.text", "Thanks for submitting the form");

  const assertRow = (label, value) => {
    cy.contains(confirmationTableCell, label).siblings("td").should("contain.text", value);
  };
  const assertEmptyRow = (label) => {
    cy.contains(confirmationTableCell, label).siblings("td").should("have.text", "");
  };

  assertRow("Student Name", `${expected.firstName} ${expected.lastName}`);

  if (expected.email) {
    assertRow("Student Email", expected.email);
  } else {
    assertEmptyRow("Student Email");
  }

  assertRow("Gender", expected.gender);
  assertRow("Mobile", expected.mobile);

  if (expected.dateOfBirth) {
    assertRow("Date of Birth", formatDateForModal(expected.dateOfBirth));
  }

  if (expected.subjects?.length) {
    assertRow("Subjects", expected.subjects.join(", "));
  } else {
    assertEmptyRow("Subjects");
  }

  if (expected.hobbies?.length) {
    assertRow("Hobbies", expected.hobbies.join(", "));
  } else {
    assertEmptyRow("Hobbies");
  }

  if (expected.picture) {
    assertRow("Picture", expected.picture);
  } else {
    assertEmptyRow("Picture");
  }

  if (expected.currentAddress) {
    assertRow("Address", expected.currentAddress);
  } else {
    assertEmptyRow("Address");
  }

  if (expected.state && expected.city) {
    assertRow("State and City", `${expected.state} ${expected.city}`);
  } else {
    assertEmptyRow("State and City");
  }
}
