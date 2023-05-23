import { TaskExecutor } from "yajsapi";
process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';
(async function main() {
  const executor = await TaskExecutor.create({
    package: "529f7fdaf1cf46ce3126eb6bbcd3b213c314fe8fe884914f5d1106d4",
    logLevel: "debug"
  });
  await executor.run(async (ctx) => {
    await ctx.uploadFile("./input/test1.jpg", "/golem/input/test1.jpg");
    /* await ctx.run(`node -e "const fs=require('fs');
    const filePath='golem/input/test1.jpg';
    fs.rename(filePath,filePath.replace('.jpg','.png'),(err)=>{if(err)console.error('Error renaming file:',err);});"`); */
    const res = await ctx.downloadFile("/golem/input/test1.jpg", "./output/test1.png")
    console.log(`Result=${res.result}`);

  });
  await executor.end();
})();
