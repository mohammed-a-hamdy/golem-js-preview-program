import fs from 'fs';
import { task } from "./simpleTask_withProviderList";
const jsonString = fs.readFileSync('topProviders.json', 'utf-8');
const arrayOfProviders = JSON.parse(jsonString);

(async () => {
   let isTerminated = false;

   // Set the termination flag to true after 30 seconds
   setTimeout(() => {
      isTerminated = true;
   }, 30000);


   while (!isTerminated) {

      let res = await task(arrayOfProviders.slice(0, 3));

      
      // Exit the loop conditionally if necessary
      if (res !== 0) {
         console.log(res)
         break;
      }
      console.log("Can't find desired provider, retrying");
   }

})();
