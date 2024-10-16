import { Given, When, Then } from "@cucumber/cucumber";
import { loginPage } from "../../pages/loginPageObject";
import { pageFixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

// Déclaration de la classe loginPage
let LoginPage: loginPage;

Given(`I go to SauceDemo`, async function () {
    LoginPage = new loginPage(pageFixture.page);
    await LoginPage.ouvrirApplication();
});

When(`I put my {string} and {string}`, async function (username: string, password: string) {
    await LoginPage.saisirUsername(username);
    await LoginPage.saisirPassword(password);
    await LoginPage.cliquerLogin();
});

Then(`I am connected to SauceDemo`, async function () {
    const textAttendu = "Swag Labs";
    const textOtenu = await LoginPage.recupererTextAcceuil(); // Ajout de await ici
    expect(textOtenu.trim()).toEqual(textAttendu); // Comparaison avec toEqual
});

Then(`I get an error message`, async function () {
    const errorAttendu = "Username and password do not match any user in this service";
    const errorObtenu = await LoginPage.getErrorMessage(); // Ajout de await ici
    expect(errorObtenu.trim()).toContain(errorAttendu); // Comparaison avec toContain
    console.log(errorObtenu);
    
});

When(`I click on Logout`, async function ()  {

    await LoginPage.cliquerLogout();

});

Then(`I should be logout`, async () => {
    await expect(pageFixture.page).toHaveURL('https://www.saucedemo.com'); // Vérification de l'URL

});