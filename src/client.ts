import net from 'net';

const client = net.connect({port: 60300});

if (process.argv.length !== 3) {
    console.log('Please, provde the filepath as an argument.');
} else {
    const filePath = process.argv[2];
    client.write(filePath);
}

  let wholeData = '';
  client.on('data', (dataChunk) => {
    wholeData += dataChunk;
    console.log(wholeData.toString());
    //client.end();
  });

//   client.on('data', (data) => {
//     console.log(data.toString());
//     client.end();
//   });
  
  client.on('end', () => {
    console.log('Conection closed.');
  });

