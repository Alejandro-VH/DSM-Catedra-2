module.exports = { 
  "development": {
    "database": "catedra",
    "dialect": "sqlite",
    "storage": "./catedra.sqlite"
  },
  "test": {
    "database": "catedra_test",
    "dialect": "sqlite"
  },
  "production": {
    "database": "catedra_production",
    "dialect": "sqlite"
  }
}