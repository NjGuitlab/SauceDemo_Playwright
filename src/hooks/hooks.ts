import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import config from "../../playwright.config";

export const globalTimeOut : number = config.expect?.timeout || 10000;
setDefaultTimeout(globalTimeOut);

let browser: Browser;
let page: Page;
let context:BrowserContext;

BeforeAll(async function() {
 
    browser = await chromium.launch({headless:false});

})

Before(async function() {

    context = await browser.newContext();
    page = await browser.newPage();
    pageFixture.page = page;
    
})

After(async function({result, pickle}) {
    
    console.log(result?.status);
   if(result?.status == Status.FAILED){
       const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`,type:"png"});
       await this.attach(img, "image/png");
   }
    await pageFixture.page.close();
    await context.close();
})

AfterAll(async function(){

    await browser.close();
    
})


