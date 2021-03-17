Feature("Register Test");

Scenario("test register", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");
  I.waitForText("Welcome to Easy Money!", "h1");
  I.fillField("firstname", "Nimet");
  I.wait(1);
  I.fillField("lastname", "Ozakca");
  I.wait(1);
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("phoneNumber", "09876543210");
  I.wait(1);
  I.fillField("password", "12345678");
  I.wait(1);
  I.fillField("confirmPassword", "12345678");
  I.wait(1);
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Don't have an account?");
  I.wait(2);
});

Feature("Login Test");

Scenario("test login", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to Easy Money!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(2);
});

Feature("Update User Details Test");

Scenario("test update user details", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to Easy Money!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(2);
  I.click("User Profile");
  I.fillField("firstname", "Nimet");
  I.wait(1);
  I.click("Update Profile");
  I.wait(1);
  I.click("Ok");
  I.wait(1);
  I.waitForText(" Your details are successfully updated! ");
  I.wait(2);
});

Feature("Logout Test");

Scenario("test log out", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to Easy Money!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(1);
  I.click("Log out");
  I.wait(1);
});
