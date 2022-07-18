import * as core from '@actions/core';
import * as fs from 'fs';

const run = async (): Promise<void> => {
  try {
    const envVars = core.getInput('env_vars');
    const configurationFilePath = core.getInput('configuration-file');
    const outFilePath = core.getInput('out-file');
    const delimiter = core.getInput('delimiter');

    const envVarsMap = envVars.split(delimiter || '|,|').map(item => {
      const firstEqualIndex = item.indexOf('=');

      return {
        key: item.substring(0, firstEqualIndex),
        value: item.substring(firstEqualIndex + 1),
      };
    });

    let configurationFile = await fs.promises.readFile(configurationFilePath, {
      encoding: 'utf-8',
    });
    envVarsMap.forEach(envVar => {
      configurationFile = configurationFile.replace(
        `\${${envVar.key}}`,
        `'${envVar.value}'`,
      );
    });

    await fs.promises.writeFile(outFilePath, configurationFile);

    core.debug(`envVarsMap ${JSON.stringify(envVarsMap)}`);
    core.debug(`configurationFile: ${configurationFile}`);
    core.debug(`outFile: ${outFilePath}`);

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
