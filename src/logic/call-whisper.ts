import { spawn } from "child_process";
import path from "path";


export async function callWhisper(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const outdata = spawn(`${path.resolve('whisper/venv/bin/python')} ${path.resolve('whisper/transcribe.py')}`, [`${path.resolve('whisper/tmp/' + fileName)}`], {shell: true});
        
        outdata.stdout.on("data", (data: Buffer) => {
            // console.log(`stdout: ${data}`);
            resolve(data.toString());
        });
        
        outdata.stderr.on("data", (data: Buffer) => {
            console.log(`stderr: ${data}`);
            reject(data.toString());
        });
        
        outdata.on('error', (error) => {
            console.log(`error: ${error.message}`);
            reject(error.message);
        })
        
        outdata.on("close", code => {
            if (code !== 0) {
                console.log(`child process exited with code ${code}`);
            }
        });
    });
}
