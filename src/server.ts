import net from 'net';
import {spawn} from 'child_process'
import { existsSync } from 'fs';

net.createServer((connection) => {
    console.log('A client has connected.');

    connection.on('data', (data) => {
        const filePath = data.toString().trim();
    
        if (!existsSync(filePath)){
            connection.write('The file does not exists.\n');
            connection.end();
        }

        const cat = spawn('cat', [filePath]);
        const wc = spawn('wc', ['-l', '-w', '-c']);
    
        cat.stdout.pipe(wc.stdin);
        
        let wcOutput = '';

        wc.stdout.on('data', (piece) => {
            wcOutput += piece.toString();
        });
      
        wc.on('close', () => {
            const wcOutputAsArray = wcOutput.split(/\s+/);
            connection.write(`File ${filePath} has ${wcOutputAsArray[1]} lines \n`);
            connection.write(`File ${filePath} has ${wcOutputAsArray[2]} words \n`);
            connection.write(`File ${filePath} has ${wcOutputAsArray[3]} characters \n`);
            connection.end();
        });
    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });

  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});
