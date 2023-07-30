describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "matislav",
      username: "mati",
      password: "mati123",
    };
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("logineiro").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("logineiro").click();
      cy.contains("enter username").type("mati");
      cy.contains("enter password").type("mati123");
    });
  });

  it("fails with wrong credentials", function () {});
});
