import * as core from '@actions/core';
import * as fs from 'fs';

const run = async (): Promise<void> => {
  try {
    const envVars = core.getInput('env_vars');
    const configurationFilePath = core.getInput('configuration-file');
    const outFile = core.getInput('out-file');

    const envVarsMap = envVars.split(',').map(item => {
      const [key, value] = item.split('=');
      return { key, value };
    });

    const configurationFile = fs.promises.readFile(configurationFilePath, {
      encoding: 'utf-8',
    });

    core.debug(`envVarsMap ${JSON.stringify(envVarsMap)}`);
    core.debug(`configurationFile: ${configurationFile}`);
    core.debug(`outFile: ${outFile}`);

    // if (envFile) {
    //     dotenv.config({path: path.resolve(process.cwd(), envFile)})
    // }
    //
    // await envsub({
    //     outputFile: outFile,
    //     templateFile: inFile,
    // })

    core.setOutput('out-file-created', 'true');
  } catch (error) {
    core.error(error as Error);
    core.setOutput('out-file-created', 'false');
  }
};

// Don't auto-execute in the test environment
if (process.env['NODE_ENV'] !== 'test') {
  run();
}

export default run;
