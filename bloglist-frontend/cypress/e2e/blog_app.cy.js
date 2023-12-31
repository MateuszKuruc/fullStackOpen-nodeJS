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
      cy.login({ username: "mati", password: "mati123" });
    });

    it("a blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("blog1");
      cy.get("#author").type("author1");
      cy.get("#url").type("url1");
      cy.get("#save-button").click();
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createNote({
          title: "blog1",
          author: "author1",
          url: "url1",
        });
      });

      it("user can like a blog", function () {
        cy.contains("view").click();
        cy.get("#like-button").click();
        cy.contains("likes: 1");
      });

      it("user can delete a blog", function () {
        cy.contains("view").click();
        cy.get("#delete-button").click();
      });

      it.only("blogs are ordered by likes number", function () {
        cy.createNote({
          title: "number2",
          author: "runner up",
          url: "2nd",
        });
        cy.createNote({
          title: "blog with most likes",
          author: "matislav",
          url: "twitter.com",
        });

        cy.contains("blog with most likes")
          .contains("view")
          .click()
          .parent()
          .parent()
          .find("button")
          .contains("like")
          .as("winner")
          .click();

        cy.contains("number2")
          .contains("view")
          .click()
          .parent()
          .parent()
          .find("button")
          .contains("like")
          .as("second")
          .click();

        cy.get("@winner").click();

        cy.get(".completeBlog").eq(0).should("contain", "blog with most likes");
        cy.get(".completeBlog").eq(1).should("contain", "number2");
      });
    });
  });
});
