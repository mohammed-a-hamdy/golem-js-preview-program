import { TaskExecutor } from "yajsapi";
import {getFilenamesInDirectory} from "./getFileNames.js"
process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';

(async function main() {
  const fileNames = getFilenamesInDirectory('./input')
  const executor = await TaskExecutor.create("e685ff0538005c9116f12f6e1d6d403860f9f6c81d1711ffcd16c0f5");
  const data = fileNames;
  await executor.forEach(data, async (ctx, item) => {
     await ctx
       .beginBatch()
       .uploadFile(`./input/${item}.jpg`, `/golem/input/${item}.jpg`)
       .downloadFile(`/golem/input/${item}.jpg`, `./output/${item}.png`)
       .end();
  });

  await executor.end();
})();
