process.env['YAGNA_APPKEY'] = 'd1684ca3106340e689b1f9e38613ceae';
import { TaskExecutor } from "yajsapi";

(async () => {
  const executor = await TaskExecutor.create({package:"529f7fdaf1cf46ce3126eb6bbcd3b213c314fe8fe884914f5d1106d4"});
  const result = await executor.run(async (ctx) => {
      await ctx.uploadFile("./simpleTask.js", "/golem/work/task.js");
      const result = await ctx.run("node", ["/golem/work/task.js"]);
  });
  await executor.end();

  console.log("Task result:", result);
})();
