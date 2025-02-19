process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';
import { task } from "./simpleTask";
import fs from 'fs';

let listOfProviders = [{ id: '', name: '', amount: '',time:0 }];
const tasks: Promise<any>[] = [];
(async () => {
  async function runTaskMultipleTimes() {

    for (let i = 0; i < 6; i++) {

      tasks.push(task().then((res) => {
        listOfProviders.push(res);
      }));
    }

    try {
      await Promise.all(tasks);
      console.log("All tasks completed successfully");
      listOfProviders = listOfProviders.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)).sort((a, b) => a.time - b.time).filter((provider)=>provider.id !== '');
      console.log("List of providers:", listOfProviders);
      await saveTopProviders(listOfProviders);
    } catch (error) {
      console.error("Error running tasks:", error);
    }
  }

  await runTaskMultipleTimes();


})();


const saveTopProviders = async (lisOfProviders) => {
  const json = JSON.stringify(lisOfProviders, null, 2);

fs.writeFileSync('topProviders.json', json);
console.log('Top providers saved as JSON file.');
process.exit(1)

}