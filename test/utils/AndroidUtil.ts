import * as fs from 'fs';
import * as path from 'path';

import HomePage from '../../test/pageobjects/HomePage.ts';

class AndroidUtil {
    
    appPackage = 'com.energyaustralia.codingtestsample';
    appActivity = 'com.energyaustralia.codingtestsample.MainActivity';
    
    // Function to parse JSON and return bandArr and venueArr
    async getBandAndVenueArrays(): Promise<{ bandArr: string[], venueArr: string[] }> {
        const bandArr: string[] = [];
        const venueArr: string[] = [];

        try{
            console.log("inside bandarr");
            const jsonFilePath = path.join(process.cwd(), 'banddata.json');
            const jsonData = this.readJsonFile(jsonFilePath);
         
            jsonData.forEach((item: { band: string, event: string }) => {
                
                bandArr.push(item.band);
                venueArr.push(item.event);
            })
        } catch(error) {
            console.error(`Error reading JSON file :`, error);
        }
        
    
  
    return { bandArr, venueArr };
  }
  
  readJsonFile(filePath: string): any {
        try {
            const jsonContent: string = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(jsonContent);
        } catch (error) {
            console.error(`Error reading JSON file ${filePath}:`, error);
            return null; // or handle the error as needed
        }
    }

    //Function to restart app join(process.cwd(),'appTest/apps/app.apk'
    async restartApp() {
        await driver.execute('mobile: terminateApp', this.appPackage);
        await driver.execute('mobile: activateApp', this.appPackage);
  }

  async compareJSONandUI() {
    try {
        console.log("inside Compare");
        // getting the band data from json file
        const { bandArr, venueArr } = await this.getBandAndVenueArrays();
               
        // Example of finding elements and getting text
        const bandsText = await $$(HomePage.getBandXpath()).map(async (element) => {
            return await element.getText();
        });

        const venuesText = await $$(HomePage.getVenueXpath()).map(async (element) => {
            return await element.getText();
        });

        // Compare bandsText with bandArr
        bandsText.forEach((text, index) => {
            if (!bandArr.includes(text)) {
                console.log(`Mismatch found in bandsText[${index}]. Expected: ${bandArr[index]}, Actual: ${text}`);
            }
        });

        // Compare venuesText with venueArr
        venuesText.forEach((text, index) => {
            if (!venueArr.includes(text)) {
                console.log(`Mismatch found in venuesText[${index}]. Expected: ${venueArr[index]}, Actual: ${text}`);
            }
        });
    }
        catch (error) {
            console.log(error)
        }
    } 
    
  }

export default new AndroidUtil();