Feature("Register Test");

Scenario("test register", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("firstname", "test");
  I.wait(1);
  I.fillField("lastname", "test");
  I.wait(1);
  I.fillField("email", "test@gmail.com");
  I.wait(1);
  I.fillField("phoneNumber", "+449876543210");
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
  I.waitForText("Welcome to QuickLook!", "h1");
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
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(2);
  I.click("User Profile");
  I.fillField("firstname", "Nimett");
  I.wait(1);
  I.click("Update Profile");
  I.wait(1);
  I.click("Ok");
  I.waitForText("Nimett");
  I.wait(2);
});

Feature("Logout Test");

Scenario("test log out", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(1);
  I.click("Log out");
  I.wait(1);
});

Feature("Dashboard View");

Scenario("test dashboard view", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/dashboard");
  I.wait(2);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
  I.waitForText("Profile");
  I.wait(5);
  I.amOnPage("http://localhost:3000/dashboard");
  I.wait(5);
  I.waitForText("Statistics");
  I.wait(1);
});

Feature("View Profile");

Scenario("test view profile", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
  I.waitForText("Profile");
});

Feature("Update Profile");

Scenario("test update profile", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
  I.fillField("firstname", "Nimet");
  I.click({ xpath: "//button[@class='btn-fill pull-right btn btn-primary']" });
  I.wait(5);
  I.click({ xpath: "//button[@class='ok-btn btn btn-primary']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
});

Feature("Add Bank Account");

Scenario("test add bank account", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
  I.fillField("sortCode", "123456");
  I.fillField("accountNo", "123456");
  I.fillField("description", "test");
  I.wait(13);
  I.click("Save Bank Account");
  I.wait(5);
  I.click({ xpath: "//button[@class='ok-btn btn btn-primary']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
});

Feature("Delete Bank Account");

Scenario("test delete bank account", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
  I.click("Delete");
  I.wait(3);
  I.click({ xpath: "//button[@class='ok-btn btn btn-primary']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/user");
  I.wait(5);
});

Feature("Manage Users");

Scenario("test manage users", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/users");
  I.wait(5);
  I.waitForText("Profile");
  I.wait(5);
  I.click("Log out");
  I.wait(5);
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/users");
  I.wait(5);
  I.waitForText("Profile");
  I.wait(5);
  I.click("Log out");
  I.wait(5);
});

Feature("Add New User");

Scenario("test add new user", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/users");
  I.wait(3);
  I.click("Add New User");
  I.fillField("firstname", "test new account");
  I.fillField("lastname", "12345678");
  I.fillField("email", "testnewuser@gmail.com");
  I.fillField("phoneNumber", "+449087654321");
  I.fillField("password", "12345678");
  I.wait(3);
  I.click("Save User");
  I.wait(5);
  I.click("Ok");
  I.wait(2);
  I.amOnPage("http://localhost:3000/users");
  I.wait(5);
  I.waitForText("testnewuser@gmail.com");
});

Feature("Edit User");

Scenario("test edit user", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/users");
  I.wait(3);
  I.click("Edit");
  I.fillField("firstname", "admin update");
  I.wait(3);
  I.click("Save User");
  I.wait(5);
  I.click("Ok");
  I.wait(2);
  I.amOnPage("http://localhost:3000/users");
  I.wait(5);
  I.waitForText("test new account update");
});

Feature("Delete User");

Scenario("test delete user", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/users");
  I.wait(3);
  I.click("Delete");
  I.wait(5);
  I.click("Cancel");
  I.wait(2);
  I.amOnPage("http://localhost:3000/users");
  I.wait(5);
  I.waitForText("admin");
});

Feature("View Banks");

Scenario("test view banks", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/banks");
  I.wait(5);
  I.waitForText("Banks");
  I.wait(5);
  I.click("Log out");
  I.wait(5);
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(10);
  I.amOnPage("http://localhost:3000/banks");
  I.wait(5);
  I.waitForText("Banks");
  I.wait(5);
  I.click("Log out");
  I.wait(5);
});

Feature("Add New Bank");

Scenario("test add new bank", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/banks");
  I.wait(3);
  I.waitForText("Banks");
  I.wait(3);
  I.click("Add New Bank");
  I.fillField("name", "Test Bank");
  I.wait(3);
  I.click("Save Bank");
  I.wait(3);
  I.click("Ok");
  I.wait(2);
  I.waitForText("Test Bank");
});

Feature("Edit Bank");

Scenario("test edit bank", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "admin@money.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/banks");
  I.wait(3);
  I.waitForText("Banks");
  I.wait(3);
  I.click("Edit");
  I.fillField("name", "LLoyds Bank");
  I.wait(3);
  I.click("Save Bank");
  I.wait(3);
  I.click("Ok");
  I.wait(2);
  I.waitForText("LLoyds Bank");
});

Feature("View Tasks");

Scenario("test view task", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/tasks");
  I.wait(3);
  I.waitForText("Tasks");
});

Feature("Add New Task");

Scenario("test add new task", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Add New Task");
  I.wait(3);
  I.fillField("name", "new test task");
  I.wait(3);
  I.click("Save Task");
  I.wait(3);
  I.click("Ok");
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.wait(3);
  I.waitForText("new test task");
});

Feature("Edit Task");

Scenario("test edit task", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.amOnPage("http://localhost:3000/tasks");
  I.wait(3);
  I.click("Edit");
  I.wait(5);
});

Feature("Change Category");

Scenario("test change category", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(5);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(10); // i select a different option from the dropdown to change the category.
  I.amOnPage("http://localhost:3000/tasks");
  I.wait(3);
  I.click("Edit");
  I.wait(5);
});

Feature("Add Location");

Scenario("test add location", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.click("Add");
  I.wait(3);
  I.fillField("place", "12345678");
  I.wait(3);
  I.click("Ok");
  I.wait(3);
});

Feature("Delete Location");

Scenario("test delete location", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.click("Delete");
  I.wait(3);
});

Feature("Save Place Label");

Scenario("test save place label", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.click("Add");
  I.wait(3);
  I.fillField("place", "12345678");
  I.wait(3);
  I.click("Save Place Label");
  I.wait(3);
  I.click("Ok");
  I.wait(3);
});

Feature("Delete Place Label");

Scenario("test delete place label", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.click("Add");
  I.wait(6);
  I.click("Delete Place Label");
  I.wait(3);
});

Feature("Update Place Label");

Scenario("test update place label", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.wait(3);
  I.amOnPage("http://localhost:3000/tasks");
  I.click("Edit");
  I.wait(5);
  I.click("Add");
  I.wait(3);
  I.fillField("place", "12345678 update");
  I.wait(5);
  I.click("Save Place Label");
  I.wait(3);
});

Feature("Confirmation Test");

Scenario("test confirmation", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
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
  I.click("Cancel");
  I.waitForText("Nimet");
  I.wait(1);
  I.click("Update Profile");
  I.wait(1);
  I.click("Ok");
  I.waitForText("Nimet");
  I.wait(2);
});

Feature("Apply filter Test");

Scenario("test filters", ({ I }) => {
  I.amOnPage("http://localhost:3000/login");
  I.waitForText("Welcome to QuickLook!", "h1");
  I.fillField("email", "nimetozakca@gmail.com");
  I.wait(1);
  I.fillField("password", "12345678");
  I.click({ xpath: "//button[@class='btn btn-black']" });
  I.waitForText("Statistics");
  I.wait(10);
  I.click("Filter");
  I.wait(2);
});
