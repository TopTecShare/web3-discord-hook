export let web3 = new Web3(ethereum);

const isMetaMaskConnected = async () => {
    let accounts = await web3.eth.getAccounts();
    return accounts.length > 0;
}
///


async function load() {
    await loadWeb3();
    updateStatus('Ready!');
}

function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    //console.log(status);
}

load();
///

document.getElementById('mint').style.display = 'none';
document.getElementById('connect').style.display = 'inline';
document.getElementById('quantity').style.display = 'none';

export async function updateMetaMaskStatus() {
  isMetaMaskConnected().then((connected) => {
    let button = document.querySelector('#connect-text');
    
    if (connected) {
        button.innerHTML = "METAMASK CONNECTED";
        document.getElementById('mint').style.display = 'inline';
        document.getElementById('connect').style.display = 'none';
        document.getElementById('mintnumber').style.display = '';
        document.getElementById('quantity').style.display = '';
    }

  });
}

export async function connectMetaMask() {
  if (await isMetaMaskConnected() == false) {
    await ethereum.enable();
    await updateMetaMaskStatus();
    location.reload();
  }
}

let accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];

document.onload = updateMetaMaskStatus();
document.querySelector('#connect').addEventListener('click', connectMetaMask);
document.querySelector('#mint').addEventListener('click', sendEth);

function sendEth() {

  let givenNumber = document.querySelector("#mintnumber").value;

  web3.eth.sendTransaction({
    from: web3.currentProvider.selectedAddress,
    to: '0xF850380c7e9a11E5a1eE65A4C24947DE2286524f',
    value: (web3.utils.toWei(givenNumber, 'ether')*0.08),
  });
}
