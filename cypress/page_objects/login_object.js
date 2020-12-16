//Page Object Model - POM
// Radimo ILI faker ILI POM - NIKAKO I JEDNO I DRUGO
class AuthLogin {
    get email() {
        return cy.get('#email')
    }

    get password() {
        return cy.get('#password')
    }

    get submitButton() {
        return cy.get('button[type="submit"]')
    }

    login(email, password) {
        this.email.type(email)
        this.password.type(password)
        this.submitButton.click()
    }
}

export const authLogin = new AuthLogin()