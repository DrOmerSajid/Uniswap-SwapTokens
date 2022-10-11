module.exports = {
  networks: {
    development: {
      host: "https://eth-goerli.g.alchemy.com/v2/qTwnH2mq5rbz6cfdLNi_1hA7NNmeJQsr",
      port: 8545,
      network_id: 5 // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
