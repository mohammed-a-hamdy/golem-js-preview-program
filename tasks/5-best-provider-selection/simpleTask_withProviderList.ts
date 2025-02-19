
import {
  Package,
  Accounts,
  Allocation,
  Demand,
  DemandEvent,
  DemandEventType,
  Proposal,
  Agreement,
  Activity,
  Result,
  Deploy,
  Run,
  Script,
  Start,
  ConsoleLogger,
  Payments,
  PaymentEventType,
  InvoiceEvent,
  DebitNoteEvent,

} from "yajsapi";
export async function task(providerList) {

  let selectedProvider = {
    'id': '',
    'name': '',
    'amount': '',
    'time': 0
  }
  const logger = new ConsoleLogger();

  const taskPackage = await Package.create({ imageHash: "9a3b5d67b0b27746283cb5f287c13eab1beaa12d92a9f536b747c7ae" });
  const accounts = await (await Accounts.create()).list();
  const account = accounts.find((account) => account?.platform.indexOf("erc20") !== -1);
  if (!account) throw new Error("There is no available account");
  const allocation = await Allocation.create({ account });
  const demand = await Demand.create(taskPackage, [allocation], { maxOfferEvents: 100, logger });
  const offer: Proposal = await new Promise((res) =>
    demand.addEventListener(DemandEventType, async (event) => {
      const proposalEvent = event as DemandEvent;
      if (proposalEvent.proposal.isInitial())
        await proposalEvent.proposal.respond(account.platform)
          .catch((e) => { });
      else if (proposalEvent.proposal.isDraft()) res(proposalEvent.proposal);


    })
  );
  const providerExists = providerList.some(prov => prov.id === offer.issuerId);
  if (!providerExists) {
    console.log('Found this provider instead,', offer.issuerId)

    return '0';
  }
  else {
    console.log('Found a top 3 provider,', offer.issuerId)
  }
  const payments = await Payments.create({ logger });
  const processPayment = (event) => {
    if (event instanceof InvoiceEvent && event.invoice.agreementId == agreement.id)
      event.invoice.accept(event.invoice.amount, allocation.id)
        .then(() => {
          console.log('Start Timestamp: ',startTimestamp);
          console.log('Invoice Timestamp : ', event.invoice.timestamp);
          const timestamp1: Date = new Date(startTimestamp);
          const timestamp2: Date = new Date(event.invoice.timestamp);
          const differenceInMilliseconds: number = Math.abs(timestamp2.getTime() - timestamp1.getTime());
          const differenceInSeconds: number = differenceInMilliseconds / 1000;
          console.log('Consumption time in S : ',differenceInSeconds);
          console.log('provider', agreement.provider);
          console.log('Accepted amount : ', event.invoice.amount);
          console.log('Accepted provider : ', event.invoice.providerId);
          selectedProvider.id = agreement.provider.id;
          selectedProvider.name = agreement.provider.name;
          selectedProvider.amount = event.invoice.amount;
          selectedProvider.time = differenceInSeconds;
        }).catch((e) => logger.warn(e));
    if (event instanceof DebitNoteEvent)
      event.debitNote.accept(event.debitNote.totalAmountDue, allocation.id).catch((e) => logger.warn(e));
  };


  payments.addEventListener(PaymentEventType, processPayment);
  const agreement = await Agreement.create(offer.id, { logger });
  await agreement.confirm();
  const activity = await Activity.create(agreement.id, { logger, activityExecuteTimeout: 120_000 });
  const script = await Script.create([new Deploy(),
  new Start(),
  new Run(`node -e "const start = Date.now(); while (Date.now() - start < 2000) { /* Time-consuming task */ } console.log('Time consumed:', Date.now() - start, 'ms');"`)]);

  const exeScript = script.getExeScriptRequest();
  const startTimestamp = new Date().toISOString();
  await activity.execute(exeScript);

  await activity.stop();
  await agreement.terminate();
  await demand.unsubscribe();
  // waiting for payments...
  setTimeout(async () => {
    await allocation.release();
    await payments.unsubscribe();

    payments.removeEventListener(PaymentEventType, processPayment);
    
  }, 10000);

  return  selectedProvider;
  return `Task executed successfully at provider = ${agreement.provider.id}`
}

