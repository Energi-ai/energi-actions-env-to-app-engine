# energi-actions-env-to-app-engine

This action is used to pass env variables to file

## Usage

```yaml
jobs:
  job_id:
    runs-on: ubuntu-latest
    permissions:
      contents: 'read'
      id-token: 'write'

    steps:
        - uses: actions/checkout@v4
    
        - name: Add env
            uses: Energi-ai/energi-actions-env-to-app-engine@main
            with:
              env_vars: SECRET=${{ secrets.gcp_credentials_stg }}|,|TEST=test
              configuration-file: app.stg.yaml
              out-file: app.yaml
              delimiter: '|,|'
```

In app.stg.yaml

```yaml
env_variables:
  SECRET: ${SECRET}
  TEST: ${TEST}
```
## Inputs
- `env_vars`: List of key-value pairs to set as environment variables in the format: `KEY1=VALUE1,KEY2=VALUE2`.
- `configuration-file`: app engine configuration file.
- `out-file`: The output file with putted env variables.
- `delimiter`: Using the delimiter you can split your env variables.
