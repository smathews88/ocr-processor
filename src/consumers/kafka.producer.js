const { Kafka } = require('kafkajs');
const path = require('path');

const kafka = new Kafka({
  clientId: 'ocr-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendTestMessage = async () => {
  await producer.connect();

  const payload = {
    contractId: 'test123',
    filePath: path.resolve('uploads/sample.pdf'),
    mimetype: 'application/pdf',
    type: 'pdf'
  };

  await producer.send({
    topic: 'ocr.jobs',
    messages: [
      { value: JSON.stringify(payload) }
    ]
  });

  console.log('✅ Test message sent to Kafka topic: ocr.jobs');
  await producer.disconnect();
};

sendTestMessage().catch(console.error);
