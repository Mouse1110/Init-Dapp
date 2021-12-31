
$(document).ready(function(){
    const abi = [];
    const addressSM = '';

    var addressIndex = "";
    
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    // Tao contract cho MetaMask
    var contract_MM = web3.eth.Contract(abi,addressSM);
    console.log(contract_MM);

    checkMM();
    // Tao contract cho Infura
    var provider = new Web3.providers.WebsocketProvider('<link ws rinkeby>');
    
    var web3_infura = new Web3(provider);
    var contract_Infura = web3_infura.eth.Contract(abi,addressSM);
    console.log(contract_Infura);
    contract_Infura.events.eInit({filter:{},fromBlock:"latest"},function(error,data){
        if(error){
            console.log(error);
        } else {
            
            if (data.returnValues[0].toString().toLocaleLowerCase() === addressIndex){
                   $.post('./create',{
                    task:data.returnValues[1],
                    address:data.returnValues[0],
                    maxvalue:data.returnValues[2].toString(),
                    tokenId:data.returnValues[3].toString(),
                },function(value){
                    if (value.err==0){
                        alert("Khởi tạo thành công");
                    }
                });
            }
        }
    });

    $('#btnConnectMM').click(function(){
        connectMM().then((data)=>{
           addressIndex = data[0];
           console.log(addressIndex);
           document.getElementById('idMM').innerHTML = addressIndex;
        }).catch((err)=>{
            console.log('Connect MM failer!');
        });
    });

   
    // Init Bid
    $('#btnCreateArtifact').click(function(){
        if (addressIndex.length == 0){
           alert('Chưa kết nối MM');
        } else {
        contract_MM.methods.initAuctionArtifact($('#txtTask').val(),$('#txtMaxValue').val()).send({from:addressIndex});    
        }
    });

});

async function connectMM(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined') {
        alert('MetaMask is installed!');
      } else {
          alert('MM isn\'t installed!');
      }
}
