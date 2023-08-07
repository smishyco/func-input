# Smishy Functions

# Attacks function
A scheduled function to launch attacks and follow-up.

Alternatively, WebJobs could be used but it isn't supported for Linux runtime yet.
https://learn.microsoft.com/en-us/azure/app-service/webjobs-create

# Victim Inputs function
A function to process events (clicks, submits) comming from the EventGrid.

# Setup
## Quickstart: Create a TypeScript function in Azure from the command line
https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?tabs=azure-cli%2Cbrowser&pivots=nodejs-model-v3

# Dev
Create a new function
```
func init AttackStarter
func new

# Make sure that Azurite is running
npm run prestart 
func start
```

## Azurite
For local development, Azurite is used to emulate Azure Storage. The easiest way to run Azurite is to install VS Code extension "Azurite" and run it from the command palette (ctrl+shift+p) and type "Azurite".

You will need to configure Azurite location setting in VS Code: ctrl+shift+p, type "azurite.location" and enter: ./azurite
