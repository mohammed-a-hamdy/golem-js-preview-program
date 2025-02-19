process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';
import fs from 'fs';
import { task } from "./simpleTask_withProviderList";
const jsonString = fs.readFileSync('topProviders.json', 'utf-8');
const arrayOfProviders = JSON.parse(jsonString);
let max = 100;
const saveFoundProvider = async (foundProvider) => {
   const json = JSON.stringify(foundProvider, null, 2);
 
 fs.writeFileSync('selectedProviders.json', json);
 console.log('Found provider saved as JSON file.');
 process.exit(1)
 
 }
(async () => {

   for (let i = 0; i <= max; i++) {

      let res = await task(arrayOfProviders.slice(0, 3));

      // Exit the loop conditionally if necessary
      if (res !== '0') {
         console.log(res)
         saveFoundProvider(res)
         break;
      }
      else if (res === '0') {
         console.log("Can't find desired provider, retrying", i);
      }
      i === max && process.exit(1)
   }

})();
