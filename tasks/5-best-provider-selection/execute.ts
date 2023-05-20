import fs from 'fs';
import { task } from "./simpleTask_withProviderList";
const jsonString = fs.readFileSync('topProviders.json', 'utf-8');
const arrayOfProviders = JSON.parse(jsonString);

(async () => {
   task(arrayOfProviders).then((res)=>console.log({res}))
  
  
  })();
