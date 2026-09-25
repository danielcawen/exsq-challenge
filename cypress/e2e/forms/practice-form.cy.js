import * as practiceFormPage from "../../pages/practiceFormPage";
import { buildUser } from "../../utils/dataFactory";

const PICTURE_FILE = "github.png";

describe("Practice Form", () => {
  beforeEach(() => {
    practiceFormPage.navigate();
  });

  it("fills every field and asserts the confirmation modal row by row", () => {
    const user = buildUser();

    practiceFormPage.fillAll(user, { picture: PICTURE_FILE });
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({ ...user, picture: PICTURE_FILE });
  });

  it("does not submit and marks required fields invalid when all fields are blank", () => {
    practiceFormPage.submit();

    practiceFormPage.assertModalNotExist();
    practiceFormPage.assertRequiredFieldsInvalid();
  });

  it("shows required fields in the modal and omits unfilled optional fields", () => {
    const user = buildUser({
      email: undefined,
      dateOfBirth: undefined,
      subjects: [],
      hobbies: [],
      currentAddress: undefined,
      state: undefined,
      city: undefined,
    });

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal(user);
  });

  it("confirms subjects via keyboard without clicking the dropdown option directly", () => {
    const user = buildUser({ subjects: ["Maths", "Physics"] });

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);
    practiceFormPage.fillSubjects(user.subjects);
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      mobile: user.mobile,
      subjects: user.subjects,
    });
  });

  it("checks hobbies via label click and asserts the hidden input's checked state", () => {
    const user = buildUser({ hobbies: ["Sports", "Music"] });

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);
    practiceFormPage.checkHobbies(user.hobbies);
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      mobile: user.mobile,
      hobbies: user.hobbies,
    });
  });

  it("selects date of birth via month/year dropdowns then day click", () => {
    const user = buildUser();

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);
    practiceFormPage.fillDateOfBirth(user.dateOfBirth);
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      mobile: user.mobile,
      dateOfBirth: user.dateOfBirth,
    });
  });

  it("uploads a picture and shows the filename in the confirmation modal", () => {
    const user = buildUser();

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);
    practiceFormPage.uploadPicture(PICTURE_FILE);
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      mobile: user.mobile,
      picture: PICTURE_FILE,
    });
  });

  it("city options depend on the selected state and reset when state changes", () => {
    const user = buildUser({ state: "NCR", city: "Delhi" });

    practiceFormPage.fillFirstName(user.firstName);
    practiceFormPage.fillLastName(user.lastName);
    practiceFormPage.selectGender(user.gender);
    practiceFormPage.fillMobile(user.mobile);

    practiceFormPage.assertCityDisabled();

    practiceFormPage.selectState("NCR");

    practiceFormPage.assertCityOptionNotAvailable("Jaipur");

    practiceFormPage.selectCity("Delhi");
    practiceFormPage.submit();

    practiceFormPage.assertConfirmationModal({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      mobile: user.mobile,
      state: "NCR",
      city: "Delhi",
    });
  });
});
