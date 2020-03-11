var azure = require('azure');
const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint = sb://celebaltest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=nO/fiEv0x1IhXi3JeQidpXTfnX75H+l+DrbFCPAQr3o=";
const queueName = "taskqueue";
const deadLetterQueueName = queueName + "/$DeadLetterQueue";


async function main() {
    const sbClient = ServiceBusClient.createFromConnectionString(connectionString);
    const queueClient = sbClient.createQueueClient(deadLetterQueueName);
    const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);
    try {
        //queueClient.
        const messages = await receiver.receiveMessages(1)
        console.log("Received messages:");
        buff=messages.map(message => message.body).toString();
        console.log(buff.toString())

        await queueClient.close();
    } finally {
        await sbClient.close();
    }
}
/*public static void ProcessSBDeadLetterQueueMessage(
    [ServiceBusTrigger("taskqueue/$DeadLetterQueue")].BrokeredMessage.inputText)
{
    Console.WriteLine(inputText);
}*/
main().catch((err) => {
    console.log("Error occurred: ", err);
});

