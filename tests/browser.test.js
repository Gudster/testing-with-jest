const { Builder, By, until } = require('selenium-webdriver');
require('chromium');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Poppa från stacken" on an empty stack', () => {
	it('should display "Stacken är tom"', async () => {
		let pop = await driver.findElement(By.id('pop'));
		await pop.click();
		let alert = await driver.switchTo().alert();
		expect(await alert.getText()).toEqual("Tog bort undefined");
		await alert.accept();
		let stack = await driver.findElement(By.id('top_of_stack')).getText();
		expect(stack).toEqual("n/a");
	});
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});
