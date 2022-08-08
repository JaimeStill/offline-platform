# Testing

## running cypress tests in isolation

If cypress is setup at the workspace root, separate module tests into sub-directories of `cypress/e2e` and execute as follows:

```bash
cypress run --spec "cypress/e2e/{module}/**/*.cy.ts"
```
