import * as core from '@actions/core';
import * as path from 'path'
import * as dotenv from 'dotenv'

const run = async (): Promise<void> => {
    try {
        const envVars = core.getInput('env_vars')
        const configurationFile = core.getInput('configuration-file')
        const outFile = core.getInput('out-file')

        core.debug(`envVars ${envVars}`)
        core.debug(`configurationFile: ${configurationFile}`)
        core.debug(`outFile: ${outFile}`)

        // if (envFile) {
        //     dotenv.config({path: path.resolve(process.cwd(), envFile)})
        // }
        //
        // await envsub({
        //     outputFile: outFile,
        //     templateFile: inFile,
        // })

        core.setOutput('out-file-created', 'true')
    } catch (error) {
        // @ts-ignore
        core.error(error)
        core.setOutput('out-file-created', 'false')
    }
}

// Don't auto-execute in the test environment
if (process.env['NODE_ENV'] !== 'test') {
    run()
}

export default run