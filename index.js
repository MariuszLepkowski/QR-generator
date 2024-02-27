import inquirer from "inquirer";
import { createWriteStream, writeFile } from 'fs'; // Corrected import statement
import qr from "qr-image"; // Imported qr-image module and assigned it to qr

const question = {
    type: 'input',
    name: 'inputValue',
    message: 'Please enter URL:'
};

inquirer.prompt(question)
    .then(answer => {
        const userInput = answer.inputValue;

        // Write user input to 'userURL.txt'
        writeFile('userURL.txt', userInput, (err) => {
            if (err) throw err;
            console.log('The URL has been saved!');
        });

        // Generate QR code image
        const qrImage = qr.image(userInput, { type: 'png' });
        qrImage.pipe(createWriteStream('qrIMAGE.png'));
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });