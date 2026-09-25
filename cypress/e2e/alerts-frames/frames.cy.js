import * as framesPage from "../../pages/framesPage";

describe("Frames", () => {
  beforeEach(() => {
    framesPage.navigate();
  });

  it("shows the correct heading inside the large frame", () => {
    framesPage.assertFrameHeading("#frame1", "This is a sample page");
  });

  it("shows the correct heading inside the small frame", () => {
    framesPage.assertFrameHeading("#frame2", "This is a sample page");
  });

  it("scopes content correctly — frame A elements are not reachable from inside frame B", () => {
    framesPage.assertSelectorAbsentInFrame("#frame1", "#frame2");
    framesPage.assertSelectorAbsentInFrame("#frame2", "#frame1");
  });
});
