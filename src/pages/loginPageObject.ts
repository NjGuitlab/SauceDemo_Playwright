import { Page, expect } from "@playwright/test";
import config from "../../playwright.config";

const selecteursLogin = {
    usernameXpath : "//input[@id='user-name']",
    passwordXpath : "//input[@id='password']", 
    btnLoginXpath : "//input[@id='login-button']",
    textAcceuil : "//div[@class='app_logo']",
    errorLogin :"//h3[@data-test='error']",
    openMenu : "//button[normalize-space()='Open Menu']",
    btnLogout : "//a[@id='logout_sidebar_link']"
};

export class loginPage {
    page: Page;
    url: string = "https://www.saucedemo.com/";
    timeout: number;

    constructor(page: Page) {
        this.page = page;
        this.timeout = config.expect?.timeout || 10000;
    }

    async ouvrirApplication() {
        await this.page.goto(this.url);
        await expect(this.page.locator(selecteursLogin.usernameXpath)).toBeVisible({ timeout: this.timeout });
    }

    async saisirUsername(username: string): Promise<void> {
        await expect(this.page.locator(selecteursLogin.usernameXpath)).toBeVisible({ timeout: this.timeout });
        await this.page.locator(selecteursLogin.usernameXpath).fill(username);
    }

    async saisirPassword(password: string): Promise<void> {
        await expect(this.page.locator(selecteursLogin.passwordXpath)).toBeVisible({ timeout: this.timeout });
        await this.page.locator(selecteursLogin.passwordXpath).fill(password);
    }

    async cliquerLogin() {
        await expect(this.page.locator(selecteursLogin.btnLoginXpath)).toBeVisible({ timeout: this.timeout });
        await this.page.click(selecteursLogin.btnLoginXpath);
    }

    async recupererTextAcceuil(): Promise<string> {
        await expect(this.page.locator(selecteursLogin.textAcceuil)).toBeVisible({ timeout: this.timeout });
        const msgAcceuil = await this.page.textContent(selecteursLogin.textAcceuil);

        if (msgAcceuil === null) {
            throw new Error("Le message d'accueil est vide");
        }
        return msgAcceuil.trim();
    }

    async getErrorMessage(): Promise<string> {
        await expect(this.page.locator(selecteursLogin.errorLogin)).toBeVisible({ timeout: this.timeout });
        const errorMessage = await this.page.textContent(selecteursLogin.errorLogin);

        if (errorMessage === null) {
            throw new Error("Le message d'erreur est vide");
        }
        return errorMessage.trim();
    }
    
    async cliquerLogout(): Promise<void>{
        await expect(this.page.locator(selecteursLogin.openMenu)).toBeVisible({ timeout: this.timeout });
        await this.page.click(selecteursLogin.openMenu);

        await expect(this.page.locator(selecteursLogin.btnLogout)).toBeVisible({timeout: this.timeout});
        await this.page.click(selecteursLogin.btnLogout);

    }



}
