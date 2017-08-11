#! /usr/bin/env node
const fs = require('fs');
const Web3 = require('web3');
const chalk = require('chalk');
const HDWalletProvider = require("truffle-hdwallet-provider");

const pkg = require("./package.json");
const serveHeaders = require('./serveHeaders')

const args = process.argv.slice(2);
const command = args[0];
const option1 = args[1];
const option2 = args[2];
const hex = /0x[a-f0-9]/i;

renderTitle()
switch(command) {
  case "version":
    console.log(pkg.version);
    break;
  case "start":
    var relayProvider = getWalletProvider(option1)
    serveHeaders(relayProvider)
    break;
  case "tx":
    if(!checkOptions(option1, option2, 0)) {
      break;
    }
    relayTx(option1, option2);
    break;
  case "receipt":
    if(!checkOptions(option1, option2, 1)) {
      break;
    }
    relayReceipt(option1, option2);
    break;
  default:
    console.log("Usage: rbrelay <command> <options>");
}

function checkOptions(option1, option2, id) {
  if(!hex.test(option1) || option1.length != 66 ||
     !hex.test(option2) || option2.length != 42) {
    console.log("Usage: rbrelay " + (id==0?"tx":"receipt") + " [txHash] [targetAddr]");
    return false;
  }
  return true;
}

function getWalletProvider(network = "ropsten"){
  var secrets;
  var mnemonic;
  if(fs.existsSync("secrets.json")) {
    secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));
    mnemonic = secrets.mnemonic;
    // console.log("mnumonic: ", mnemonic);
  } else {
    console.log("no secrets.json found. You can only deploy to the testrpc.");
    mnemonic = "" ;
  }
  return new HDWalletProvider(mnemonic, "https://"+network+".infura.io/");
}

// function renderTitle(){
//   var str = ""
//   str +=" ____  ____      ____  ____  __     __   _  _ \n"
//   str +="(  _ \\(  _ \\ ___(  _ \\(  __)(  )   / _\\ ( \\/ )\n"
//   str +=" )   / ) _ ((___))   / ) _) / (_/\\/    \\ )  / \n"
//   str +="(__\\_)(____/    (__\\_)(____)\\____/\\_/\\_/(__/  \n"
//   console.log(str)
// }

function renderTitle(){
  var str = ""
  
  str += "\n   __     ___           __         _                \n"
  str += "  /__\\   / __\\         /__\\   ___ | |  __ _  _   _  \n"
  str += " / \\//  /__\\//  ___   / \\//  / _ \\| | / _` || | | | \n"
  str += "/ _  \\ / \\/  \\ |___| / _  \\ |  __/| || (_| || |_| | \n"
  str += "\\/ \\_/ \\_____/       \\/ \\_/  \\___||_| \\__,_| \\__, | \n"
  str += "                                             |___/    \n"


  console.log(chalk.green(str))
}
  // var web3ify = (input) => {
  //   output = {}
  //   output.value = '0x' + rlp.encode(input.value).toString('hex')
  //   output.header = '0x' + rlp.encode(input.header).toString('hex')
  //   output.path = '0x00' + input.path.toString('hex')
  //   output.parentNodes = '0x' + rlp.encode(input.parentNodes).toString('hex')
  //   output.txRoot = '0x' + input.header[4].toString('hex')
  //   output.blockHash = '0x' + input.blockHash.toString('hex')
  //   return output
  // }

  // const ep = new EthProof(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));

  // function relayTx(txHash, targetAddr) {
  //   var proof, rb;
  //   ep.getTransactionProof(txHash).then(function(result) {
  //     proof = web3ify(result);
  //   }).then(function() {
  //     return Rbrelay.deployed();
  //   }).then(function(instance) {
  //     rb = instance;
  //     return rb.head.call();
  //   }).then(function(result) {
  //     return rb.rbchain.call(result);
  //   }).then(function(result) {
  //     if(proof.header.blockNumber > result) {
  //       console.log("tx is too recent");
  //     }
  //   }).then(function() {
  //     console.log("You are being charged 0.1 ether!!!");
  //     return rb.relayTx(proof.value, proof.path, proof.parentNodes, proof.header, targetAddr, {gas: 2000000, gasPrice: 25000000000, value: relayWeb3.toWei(0.1,'ether'), from: relayProvider.getAddress()});
  //   }).then(function(result) {
  //     console.log(JSON.stringify(result));
  //   });
  // }

  // function relayReceipt(txHash, targetAddr) {
  //   var proof, rb;
  //   ep.getReceiptProof(txHash).then(function(result) {
  //     proof = web3ify(result);
  //   }).then(function() {
  //     return Rbrelay.deployed();
  //   }).then(function(instance) {
  //     rb = instance;
  //     return rb.head.call();
  //   }).then(function(result) {
  //     return rb.rbchain.call(result);
  //   }).then(function(result) {
  //     if(proof.header.blockNumber > result) {
  //       console.log("tx is too recent");
  //     }
  //   }).then(function() {
  //     console.log("You are being charged 0.1 ether!!!");
  //     return rb.relayReceipt(proof.value, proof.path, proof.parentNodes, proof.header, targetAddr, {gas: 200000, gasPrice: 25000000000, value: relayWeb3.toWei(0.1,'ether'), from: relayProvider.getAddress()});
  //   }).then(function(result) {
  //     console.log(JSON.stringify(result));
  //   });
  // }
