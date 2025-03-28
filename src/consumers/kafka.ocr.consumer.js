const { Kafka } = require('kafkajs');
const { performOCR } = require('../services/tesseract.service');

const kafka = new Kafka({
  clientId: 'ocr-processor',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'ocr-processor-group' });

async function startOCRConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'ocr.jobs', fromBeginning: false });

  console.log('🟢 OCR Processor listening to Kafka topic: ocr.jobs');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value.toString());
      console.log('📩 Received message:', payload);

      if (['image', 'pdf', 'docx'].includes(payload.type)) {
        try {
          const result = await performOCR(payload.filePath, payload.mimetype);
          console.log(`✅ OCR for contract ${payload.contractId}:`, result.text);
	} catch (err) {
	  console.error(`❌ OCR failed for ${payload.contractId}:`, err.message);
        
}
      } else {
        console.log();
      }
    }
  });
}

startOCRConsumer().catch(console.error);
