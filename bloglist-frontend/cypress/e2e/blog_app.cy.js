describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "matislav",
      username: "mati",
      password: "mati123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("login").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mati");
      cy.get("#password").type("mati123");
      cy.get("#login-button").click();

      cy.contains("matislav logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mati");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mati",
        password: "mati123",
      }).then((response) => {
        localStorage.setItem(
          "loggedNoteappUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });
    
  });
});
