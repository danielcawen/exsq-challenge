import { faker } from "@faker-js/faker";

const GENDERS = ["Male", "Female", "Other"];
const HOBBIES = ["Sports", "Reading", "Music"];
const STATES_CITIES = {
  NCR: ["Delhi", "Gurgaon", "Noida"],
  "Uttar Pradesh": ["Agra", "Lucknow", "Merrut"],
  Haryana: ["Karnal", "Panipat"],
  Rajasthan: ["Jaipur", "Jaiselmer"],
};

export function buildUser(overrides = {}) {
  const state = faker.helpers.arrayElement(Object.keys(STATES_CITIES));
  const city = faker.helpers.arrayElement(STATES_CITIES[state]);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(GENDERS),
    mobile: faker.string.numeric(10),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
    subjects: [
      faker.helpers.arrayElement(["Maths", "Physics", "Chemistry", "English", "Computer Science"]),
    ],
    hobbies: [faker.helpers.arrayElement(HOBBIES)],
    currentAddress: faker.location.streetAddress(),
    state,
    city,
    ...overrides,
  };
}

export function buildEmployee(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 30000, max: 200000 }),
    department: faker.helpers.arrayElement([
      "Insurance",
      "Compliance",
      "Legal",
      "Engineering",
      "Support",
    ]),
    ...overrides,
  };
}

export function buildApiAccount(overrides = {}) {
  return {
    userName: `test_${faker.string.alphanumeric(12)}`,
    password: `Qa!1${faker.string.alphanumeric(8)}`,
    ...overrides,
  };
}

export function buildTextBoxData(overrides = {}) {
  return {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    currentAddress: faker.location.streetAddress(),
    permanentAddress: faker.location.streetAddress(),
    ...overrides,
  };
}
