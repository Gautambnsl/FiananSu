import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";


const PK = '84a239ff5b2917efd3feaa57dbfcb3e05be804c91fcbae6cff5f1124811f78c2'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const sendNotification = async(address) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `FiananSu : Bridge Used`,
          body: `Your Assets are on their way✈️`
        },
        payload: {
          title: `FiananSu : Bridge Used`,
          body: `You have successfully used FiananSu Bridge`,
          cta: '',
          img: ''
        },
        recipients: `eip155:5:${address}`, // recipient address
        channel: 'eip155:5:0xfBe844eFb7a4E1724cA81BBf305A03890ed0C606', // your channel address
        env: 'staging'
      });
    
    // apiResponse?.status === 204, if sent successfully!
    console.log('API repsonse: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}

sendNotification();