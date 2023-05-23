import { TaskExecutor } from "yajsapi";
import {getFilenamesInDirectory} from "./getFileNames.js"
process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';

(async function main() {
  const fileNames = getFilenamesInDirectory('./input')
  const executor = await TaskExecutor.create("529f7fdaf1cf46ce3126eb6bbcd3b213c314fe8fe884914f5d1106d4");
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
