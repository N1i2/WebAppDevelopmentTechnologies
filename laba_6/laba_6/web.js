import fs from 'fs';
import { createClient } from 'webdav';

const client = createClient('https://webdav.yandex.ru/', {
    username: 'nikolasselicky@ya.ru',
    password: 'doxvvgwjsbkcpyda',
});

async function createFolder(folderName) {
    try {
        await client.createDirectory(folderName);
        console.log(`Folder "${folderName}" created successfully.`);
    } catch (err) {
        console.error('Error creating folder:', err.message);
    }
}

async function uploadFile(localPath, remotePath) {
    try {
        const fileContent = fs.createReadStream(localPath);
        await client.putFileContents(remotePath, fileContent);
        console.log(`File "${localPath}" uploaded to "${remotePath}".`);
    } catch (err) {
        console.error('Error uploading file:', err.message);
    }
}

async function downloadFile(remotePath, localPath) {
    try {
        const fileContent = await client.getFileContents(remotePath);
        fs.writeFileSync(localPath, fileContent);
        console.log(`File "${remotePath}" downloaded to "${localPath}".`);
    } catch (err) {
        console.error('Error downloading file:', err.message);
    }
}

async function copyFile(sourcePath, destinationPath) {
    try {
        await client.copyFile(sourcePath, destinationPath);
        console.log(`File "${sourcePath}" copied to "${destinationPath}".`);
    } catch (err) {
        console.error('Error copying file:', err.message);
    }
}

async function deleteFile(filePath) {
    try {
        await client.deleteFile(filePath);
        console.log(`File "${filePath}" deleted.`);
    } catch (err) {
        console.error('Error deleting file:', err.message);
    }
}

async function deleteFolder(folderName) {
    try {
        await client.deleteFile(folderName);
        console.log(`Folder "${folderName}" deleted.`);
    } catch (err) {
        console.error('Error deleting folder:', err.message);
    }
}

(async function () {
    const folderName = '/test-folder';
    const localFilePath = './example.txt';
    const remoteFilePath = `${folderName}/example.txt`;
    const copiedFilePath = `${folderName}/example-copy.txt`;

    await createFolder(folderName);
    // await uploadFile(localFilePath, remoteFilePath);
    // await downloadFile(remoteFilePath, './downloaded-example.txt');
    // await copyFile(remoteFilePath, copiedFilePath);
    // await deleteFile(remoteFilePath);
    // await deleteFolder(folderName);
})();
