import AndroidUtil from '../utils/AndroidUtil.ts';
import HomePage from '../pageobjects/HomePage.ts';

describe('My Application', () => {

beforeAll(() =>{

  driver.startActivity(AndroidUtil.appPackage,AndroidUtil.appActivity);
  
},

afterAll(() => {
  driver.execute('mobile: terminateApp', AndroidUtil.appPackage);
}))

//)

  it('is displaying the list', async () => {
    
    //if the app shows error message on screen then restart and try for 10 times
    const listElement = await $(HomePage.getListXpath());
    
    for (let index = 0; index < 10; index++) {
      if(!(await listElement.isExisting())){
        AndroidUtil.restartApp();
      } else {
        console.log('List found contining...')
        break;
      } 
    }
    await browser.takeScreenshot();

  })

  it('should compare values from JSON with elements from Android app', async () => {
    const listElement = await $(HomePage.getListXpath());
    
    //if the List is present on the app then compare values
    if((await listElement.isExisting())){
      await browser.takeScreenshot();
      AndroidUtil.compareJSONandUI();
    }
  })

  

})
