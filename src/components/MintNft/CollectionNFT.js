import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import nftsImage from "../../assets/images/mint_nfts.png";
import hart from "../../assets/images/hart.png";
import share from "../../assets/images/share.png";
import scrollreveal from "scrollreveal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
// import { toast } from 'react-toastify'
import axios from 'axios'
import {
  BUSD_Token,
  BUSD_Token_ABI,
  GLABA_NFT,
  GLABA_NFT_1000,
  GLABA_NFT_2500,
  GLABA_NFT_500,
  GLABA_NFT_5000,
  GLABA_NFT_ABI,
  GLABA_NFT_ABI_1000,
  GLABA_NFT_ABI_20_5000,
  GLABA_NFT_ABI_2500,
  GLABA_NFT_ABI_500,
  GLABA_NFT_ABI_5000,
  GLABA_NFT_Icome_5000,
  GLABA_NFT_Income,
  GLABA_NFT_Income_1000,
  GLABA_NFT_Income_2500,
  GLABA_NFT_Income_500,
  GLABA_NFT_Income_ABI,
  GLABA_NFT_Income_ABI_1000,
  GLABA_NFT_Income_ABI_2500,
  GLABA_NFT_Income_ABI_500,
  GLABA_NFT_Income_ABI_5000,
  LaRace_Governance_Token,
  LaRace_Governance_Token_ABI,
  WIRE_Token,
  WIRE_Token_ABI,
  tokenAbi2, tokenAddress2, tokenAbi, tokenAddress, BUSDTokenAbi, BUSDTokenAddress
} from '../../utilies/constant'
import { loadWeb3 } from '../../apis/api'
import { toast } from "react-hot-toast";

const CollectionNFT = () => {
  const singlenft = useSelector((state) => state.nft.SingleNFT);
  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);

  // let user

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "10px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `.CollectionMain .col-md-3,.CollectionMain .col-md-9
      `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  const [value, setCount] = useState(1);
  const [selectedValue, setSelectedValue] = useState({
    name: "LAR And WIRE",
    price: "100",
  });
  const [PriceArray, setPriceArray] = useState([
    {
      name: "LAR And WIRE",
      price: "100",
    },
    {
      name: "Mint With BUSD",
      price: "2220.22",
    },

    {
      name: "Mint With LAR",
      price: "12550",
    },
    {
      name: "BUSD And WIRE",
      price: "12870",
    },
  ]);


  const incrementCount = useMemo(
    () => () => setCount((prev) => prev + 1),
    [value]
  );
  const decrementCount = useMemo(() => {
    if (value === 0) {
      return;
    }
    return () => setCount((prev) => prev - 1);
  }, [value]);

  const handleChange = (e) => {
    e.preventDefault();
    let obj = JSON.parse(e.target.value);
    setSelectedValue(obj);
  };

  const mint = async () => {
    let acc = await loadWeb3()
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {

      if (selectedValue?.name == PriceArray[4].name) {
        // await MintwithBUSD()
        await BUSDAndIncome()

      }
      else if (selectedValue?.name == PriceArray[3].name) {
        BUSDANDWIRE()
      }
      else if (selectedValue?.name == PriceArray[2].name) {
        MINTWITHLAR()
      }
      else if (selectedValue?.name == PriceArray[0].name) {
        MINTWITHLARANDWIRE()
      }
      else if (selectedValue?.name == PriceArray[1].name) {
        MINTWITHBUSD()
      }


    }
  }
  const MINTWITHLARANDWIRE = async () => {
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        // let own_Address = userDetail.address
        let own_Address = true


        console.log('res_Mint', own_Address == acc)
        if (own_Address == '') {
          // toast.error('Please Update Your Profile')
          // navigate('/dashboard/Profile')
        } else if (own_Address == true) {
          try {
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3
            let approvetoken1 = new web3.eth.Contract(tokenAbi, tokenAddress)
            let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)

            let nftContractOf
            let increment_each_data
            if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
              increment_each_data = 0.00365946
            } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
              increment_each_data = 0.0109232
            } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
              increment_each_data = 0.0182093
            } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
              increment_each_data = 0
            } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
              increment_each_data = 0.0910139
            }

            let totalnft = await nftContractOf.methods.MaxLimitPerTransaction().call()
            if (value > totalnft) {

              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.ValueinToken().call()
              token1 = token1 + 1000
              let token2 = await nftContractOf.methods.ValueinToken1().call()
              token2 = token2 + 1000

              let maxSupply = await nftContractOf.methods.maxsupply().call()
              let ttlSupply = await nftContractOf.methods.totalSupply().call()
              let paused = await nftContractOf.methods.paused().call()
              let maxLimitprTransaction = await nftContractOf.methods.MaxLimitPerTransaction().call()
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods.MinitngPricein_busd_single().call()
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1)
              let totalMintingPriceToken_1 = Number(value * mintingbnbPrice_Toke_1)
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log('Change_price', totalMintingPriceToken_1)
              if (singlenft.minting_counter == 1) {

                // token1 = await BigInt(value * token1)
                // token2 = await BigInt(value * token2)

              } else if (singlenft.minting_counter == 2) {
                // token1 = await BigInt(value * token1 * 2)
                // token2 = await BigInt(value * token2 * 2)


              }
              // if (minting_counter == 1) {

              //     totalMintingPriceToken_1 = value * mintingbnbPrice_Toke_1
              // } else if (minting_counter == 2) {
              //     totalMintingPriceToken_1 = value * mintingbnbPrice_Toke_1 * 2

              // }
              totalMintingPriceToken_1 = web3.utils.toWei(totalMintingPriceToken_1.toString())

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_500, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })

                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_2500, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_5000, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_5000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    }

                    toast.success('Approve')

                    let hash = await nftContractOf.methods.mint_with_BUSD_100(value).send({
                      from: acc,
                    })
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let postapi = await axios.post('https://nftxpress-1.nakshtech.info/activation', {
                      uid: user,
                      sid: '0',
                      transaction: hash,
                      amount: singlenft.count,
                      useraddress: acc,
                      tokenamount: '0',
                      type: 'Without Referral ID',
                      quantity: value,
                      horseType: singlenft.minting_counter == 1 ? 'SINGLE' : 'DUAL',
                    })
                    toast.success('Transaction Confirmed')

                    console.log('postapi', postapi)
                    toast.success(postapi.data.data)
                    // setinputdatahere(' ')
                  } else {
                    toast.error('No of Minting is Greater than maximum limit Per Transaction')
                    // setbtnFour('Mint With BUSD')
                  }
                } else {
                  // toast.error('Paused is True')
                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error('Max Supply is Greater than total Supply')
                // setbtnFour('Mint With BUSD')
              }
            }
          } catch (e) {
            console.log('Error while minting ', e)
            toast.error('Transaction failed')
            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error('Wrong Metamask Address')
          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log('Error ', e)

        // setinputdatahere(' ')
      }
    }
  }
  const MINTWITHBUSD = async () => {
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        // let own_Address = userDetail.address
        let own_Address = true


        console.log('res_Mint', own_Address == acc)
        if (own_Address == '') {
          // toast.error('Please Update Your Profile')
          // navigate('/dashboard/Profile')
        } else if (own_Address == true) {
          try {
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3
            let approvetoken1 = new web3.eth.Contract(BUSDTokenAbi, BUSDTokenAddress)
            // let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)
            let nftContractOf
            let increment_each_data
            if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
              increment_each_data = 0.00365946
            } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
              increment_each_data = 0.0109232
            } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
              increment_each_data = 0.0182093
            } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
              increment_each_data = 0
            } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
              increment_each_data = 0.0910139
            }

            let totalnft = await nftContractOf.methods.MaxLimitPerTransaction().call()
            if (value > totalnft) {

              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.BUSDtobnb().call()
              token1 = token1 + 1000


              let maxSupply = await nftContractOf.methods.maxsupply().call()
              let ttlSupply = await nftContractOf.methods.totalSupply().call()
              let paused = await nftContractOf.methods.paused().call()
              let maxLimitprTransaction = await nftContractOf.methods.MaxLimitPerTransaction().call()
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods.MinitngPricein_busd_single().call()
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1)
              let totalMintingPriceToken_1 = Number(value * mintingbnbPrice_Toke_1)
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log('Change_price', totalMintingPriceToken_1)

              if (singlenft.minting_counter == 1) {

                // token1 = await BigInt(value * token1)
                // console.log()
              } else if (singlenft.minting_counter == 2) {
                // token1 = await BigInt(value * token1 * 2)


              }
              totalMintingPriceToken_1 = web3.utils.toWei(totalMintingPriceToken_1.toString())

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })

                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_5000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    }

                    toast.success('Approve')

                    let hash = await nftContractOf.methods.mint_with_BUSD_100(value).send({
                      from: acc,
                    })
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let postapi = await axios.post('https://nftxpress-1.nakshtech.info/activation', {
                      uid: user,
                      sid: '0',
                      transaction: hash,
                      amount: singlenft.count,
                      useraddress: acc,
                      tokenamount: '0',
                      type: 'Without Referral ID',
                      quantity: value,
                      horseType: singlenft.minting_counter == 1 ? 'SINGLE' : 'DUAL',
                    })
                    toast.success('Transaction Confirmed')

                    console.log('postapi', postapi)
                    toast.success(postapi.data.data)
                    // setinputdatahere(' ')
                  } else {
                    toast.error('No of Minting is Greater than maximum limit Per Transaction')
                    // setbtnFour('Mint With BUSD')
                  }
                } else {
                  // toast.error('Paused is True')
                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error('Max Supply is Greater than total Supply')
                // setbtnFour('Mint With BUSD')
              }
            }
          } catch (e) {
            console.log('Error while minting ', e)
            toast.error('Transaction failed')
            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error('Wrong Metamask Address')
          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log('Error ', e)

        // setinputdatahere(' ')
      }
    }
  }
  const MINTWITHLAR = async () => {
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        // let own_Address = userDetail.address
        let own_Address = true


        console.log('res_Mint', own_Address == acc)
        if (own_Address == '') {
          // toast.error('Please Update Your Profile')
          // navigate('/dashboard/Profile')
        } else if (own_Address == true) {
          try {
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3
            let approvetoken1 = new web3.eth.Contract(tokenAbi, tokenAddress)
            // let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)
            let nftContractOf
            let increment_each_data
            if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
              increment_each_data = 0.00365946
            } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
              increment_each_data = 0.0109232
            } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
              increment_each_data = 0.0182093
            } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
              increment_each_data = 0
            } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
              increment_each_data = 0.0910139
            }

            let totalnft = await nftContractOf.methods.MaxLimitPerTransaction().call()
            if (value > totalnft) {

              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.ValueinToken_single().call()
              token1 = token1 + 1000
              let token2 = await nftContractOf.methods.ValueinToken1().call()
              token2 = token2 + 1000

              let maxSupply = await nftContractOf.methods.maxsupply().call()
              let ttlSupply = await nftContractOf.methods.totalSupply().call()
              let paused = await nftContractOf.methods.paused().call()
              let maxLimitprTransaction = await nftContractOf.methods.MaxLimitPerTransaction().call()
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods.MinitngPricein_busd_single().call()
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1)
              let totalMintingPriceToken_1 = Number(value * mintingbnbPrice_Toke_1)
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log('Change_price', totalMintingPriceToken_1)

              if (singlenft.minting_counter == 1) {

                // token1 = await BigInt(value * token1)


              } else if (singlenft.minting_counter == 2) {
                // token1 = await BigInt(value * token1 * 2)



              }
              totalMintingPriceToken_1 = web3.utils.toWei(totalMintingPriceToken_1.toString())

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })

                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                        from: acc,
                      })



                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_BUSD_100(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_5000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    }

                    toast.success('Approve')

                    let hash = await nftContractOf.methods.mint_with_single(value).send({
                      from: acc,
                    })
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let postapi = await axios.post('https://nftxpress-1.nakshtech.info/activation', {
                      uid: user,
                      sid: '0',
                      transaction: hash,
                      amount: singlenft.count,
                      useraddress: acc,
                      tokenamount: '0',
                      type: 'Without Referral ID',
                      quantity: value,
                      horseType: singlenft.minting_counter == 1 ? 'SINGLE' : 'DUAL',
                    })
                    toast.success('Transaction Confirmed')

                    console.log('postapi', postapi)
                    toast.success(postapi.data.data)
                    // setinputdatahere(' ')
                  } else {
                    toast.error('No of Minting is Greater than maximum limit Per Transaction')
                    // setbtnFour('Mint With BUSD')
                  }
                } else {
                  // toast.error('Paused is True')
                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error('Max Supply is Greater than total Supply')
                // setbtnFour('Mint With BUSD')
              }
            }
          } catch (e) {
            console.log('Error while minting ', e)
            toast.error('Transaction failed')
            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error('Wrong Metamask Address')
          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log('Error ', e)

        // setinputdatahere(' ')
      }
    }
  }
  const BUSDANDWIRE = async () => {
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        // let own_Address = userDetail.address
        let own_Address = true


        console.log('res_Mint', own_Address == acc)
        if (own_Address == '') {
          // toast.error('Please Update Your Profile')
          // navigate('/dashboard/Profile')
        } else if (own_Address == true) {
          try {
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3
            let approvetoken1 = new web3.eth.Contract(BUSDTokenAbi, BUSDTokenAddress)
            let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)
            let nftContractOf
            let increment_each_data
            if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
              increment_each_data = 0.00365946
            } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
              increment_each_data = 0.0109232
            } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
              increment_each_data = 0.0182093
            } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
              increment_each_data = 0
            } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
              increment_each_data = 0.0910139
            }

            let totalnft = await nftContractOf.methods.MaxLimitPerTransaction().call()
            if (value > totalnft) {

              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.BUSDtobnb().call()
              token1 = token1 + 1000
              let token2 = await nftContractOf.methods.ValueinToken1().call()
              token2 = token2 + 1000

              let maxSupply = await nftContractOf.methods.maxsupply().call()
              let ttlSupply = await nftContractOf.methods.totalSupply().call()
              let paused = await nftContractOf.methods.paused().call()
              let maxLimitprTransaction = await nftContractOf.methods.MaxLimitPerTransaction().call()
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods.MinitngPricein_busd_single().call()
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1)
              let totalMintingPriceToken_1 = Number(value * mintingbnbPrice_Toke_1)
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log('Change_price', totalMintingPriceToken_1)

              if (singlenft.minting_counter == 1) {

                // token1 = await BigInt(value * token1)
                // token2 = await BigInt(value * token2)

              } else if (singlenft.minting_counter == 2) {
                // token1 = await BigInt(value * token1 * 2)
                // token2 = await BigInt(value * token2 * 2)


              }
              totalMintingPriceToken_1 = web3.utils.toWei(totalMintingPriceToken_1.toString())

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT, token2).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_80_20(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_500, token2).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_token(value).send({ from: acc })

                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_2500, token2).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_5000, token2).send({
                        from: acc,
                      })


                      // await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_5000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    }

                    toast.success('Approve')

                    let hash = await nftContractOf.methods.mint_with_80_20_BUSD(value).send({
                      from: acc,
                    })
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let postapi = await axios.post('https://nftxpress-1.nakshtech.info/activation', {
                      uid: user,
                      sid: '0',
                      transaction: hash,
                      amount: singlenft.count,
                      useraddress: acc,
                      tokenamount: '0',
                      type: 'Without Referral ID',
                      quantity: value,
                      horseType: singlenft.minting_counter == 1 ? 'SINGLE' : 'DUAL',
                    })
                    toast.success('Transaction Confirmed')

                    console.log('postapi', postapi)
                    toast.success(postapi.data.data)
                    // setinputdatahere(' ')
                  } else {
                    toast.error('No of Minting is Greater than maximum limit Per Transaction')
                    // setbtnFour('Mint With BUSD')
                  }
                } else {
                  // toast.error('Paused is True')
                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error('Max Supply is Greater than total Supply')
                // setbtnFour('Mint With BUSD')
              }
            }
          } catch (e) {
            console.log('Error while minting ', e)
            toast.error('Transaction failed')
            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error('Wrong Metamask Address')
          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log('Error ', e)

        // setinputdatahere(' ')
      }
    }
  }
  const BUSDAndIncome = async () => {
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        // let own_Address = userDetail.address
        let own_Address = true


        console.log('res_Mint', own_Address == acc)
        if (own_Address == '') {
          // toast.error('Please Update Your Profile')
          // navigate('/dashboard/Profile')
        } else if (own_Address == true) {
          try {
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3
            let approvetoken1 = new web3.eth.Contract(tokenAbi, tokenAddress)
            let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)
            let nftContractOf
            let increment_each_data
            if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
              increment_each_data = 0.00365946
            } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
              increment_each_data = 0.0109232
            } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
              increment_each_data = 0.0182093
            } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
              increment_each_data = 0
            } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
              increment_each_data = 0.0910139
            }

            let totalnft = await nftContractOf.methods.MaxLimitPerTransaction().call()
            if (value > totalnft) {

              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.ValueinToken().call()
              token1 = token1 + 1000
              let token2 = await nftContractOf.methods.ValueinToken1().call()
              token2 = token2 + 1000

              let maxSupply = await nftContractOf.methods.maxsupply().call()
              let ttlSupply = await nftContractOf.methods.totalSupply().call()
              let paused = await nftContractOf.methods.paused().call()
              let maxLimitprTransaction = await nftContractOf.methods.MaxLimitPerTransaction().call()
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods.MinitngPricein_busd_single().call()
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1)
              let totalMintingPriceToken_1 = Number(value * mintingbnbPrice_Toke_1)
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log('Change_price', totalMintingPriceToken_1)

              if (singlenft.minting_counter == 1) {

                // token1 = await BigInt(value * token1)
                // token2 = await BigInt(value * token2)

              } else if (singlenft.minting_counter == 2) {
                // token1 = await BigInt(value * token1 * 2)
                // token2 = await BigInt(value * token2 * 2)


              }
              totalMintingPriceToken_1 = web3.utils.toWei(totalMintingPriceToken_1.toString())

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_500, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })

                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_1000, token1).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_2500, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
                      await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                        from: acc,
                      })
                      await approvetoken2.methods.approve(GLABA_NFT_5000, token2).send({
                        from: acc,
                      })


                      await nftContractOf.methods.mint_with_token(value).send({ from: acc })
                      // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_5000, totalMintingPriceToken_1).send({
                      //   from: acc,
                      // })
                    }

                    toast.success('Approve')

                    let hash = await nftContractOf.methods.mint_with_BUSD_100(value).send({
                      from: acc,
                    })
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let postapi = await axios.post('https://nftxpress-1.nakshtech.info/activation', {
                      uid: user,
                      sid: '0',
                      transaction: hash,
                      amount: singlenft.count,
                      useraddress: acc,
                      tokenamount: '0',
                      type: 'Without Referral ID',
                      quantity: value,
                      horseType: singlenft.minting_counter == 1 ? 'SINGLE' : 'DUAL',
                    })
                    toast.success('Transaction Confirmed')

                    console.log('postapi', postapi)
                    toast.success(postapi.data.data)
                    // setinputdatahere(' ')
                  } else {
                    toast.error('No of Minting is Greater than maximum limit Per Transaction')
                    // setbtnFour('Mint With BUSD')
                  }
                } else {
                  // toast.error('Paused is True')
                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error('Max Supply is Greater than total Supply')
                // setbtnFour('Mint With BUSD')
              }
            }
          } catch (e) {
            console.log('Error while minting ', e)
            toast.error('Transaction failed')
            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error('Wrong Metamask Address')
          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log('Error ', e)

        // setinputdatahere(' ')
      }
    }
  }



  const getVAlues = async () => {

    // console.log("res",inputValue)
    // setShowModal(false)
    let acc = await loadWeb3()
    // console.log("ACC=",acc)
    if (acc == 'No Wallet') {
      toast.error('No Wallet Connected')
    } else if (acc == 'Wrong Network') {
      toast.error('Wrong Newtwork please connect to Binance smart chain network')
    } else {
      try {

        const web3 = window.web3
        let nftContractOf
        let increment_each_data

        if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {

          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
          increment_each_data = 0.00365946

        } else if ((singlenft.count == 500 && singlenft.minting_counter == 1) || (singlenft.count == 1000 && singlenft.minting_counter == 2)) {
          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
          increment_each_data = 0.0109232
        } else if ((singlenft.count == 1000 && singlenft.minting_counter == 1) || (singlenft.count == 2000 && singlenft.minting_counter == 2)) {
          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
          increment_each_data = 0.0182093
        } else if ((singlenft.count == 2500 && singlenft.minting_counter == 1) || (singlenft.count == 5000 && singlenft.minting_counter == 2)) {
          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
          increment_each_data = 0
        } else if ((singlenft.count == 5000 && singlenft.minting_counter == 1) || (singlenft.count == 10000 && singlenft.minting_counter == 2)) {
          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
          increment_each_data = 0.0910139
        }
        let wirePrice
        let mintingbnbPrice_Toke_1 = await nftContractOf.methods.ValueinToken().call()
        wirePrice = await nftContractOf.methods.ValueinToken1().call()
        wirePrice = web3.utils.fromWei(wirePrice)


        // mintingbnbPrice_Toke_1 = web3.utils.toWei(mintingbnbPrice_Toke_1);

        mintingbnbPrice_Toke_1 = web3.utils.fromWei(mintingbnbPrice_Toke_1)


        // mintingbnbPrice_Toke_1=mintingbnbPrice_Toke_1.Fixed(3)
        mintingbnbPrice_Toke_1 = Number(mintingbnbPrice_Toke_1) + increment_each_data
        mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1).toFixed(4)

        let arr = []
        if (singlenft.minting_counter == 1) {
          mintingbnbPrice_Toke_1 = ` ${mintingbnbPrice_Toke_1 * value} wire ${parseFloat(wirePrice * value).toFixed(4)}`
          // wirePrice = wirePrice * value




          arr.push({
            name: "LAR And WIRE",
            price: mintingbnbPrice_Toke_1,
          })
          setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 })

          // setPriceArray(arr)

        }
        else if (singlenft.minting_counter == 2) {

          mintingbnbPrice_Toke_1 = ` ${mintingbnbPrice_Toke_1 * 2 * value} wire ${parseFloat(wirePrice * 2 * value).toFixed(4)}`
          // arr = [...PriceArray]
          arr.push({
            name: "LAR And WIRE",
            price: mintingbnbPrice_Toke_1,
          })
          setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 })

          // setPriceArray(arr)

        }

        let mintingbnbPrice_Toke_2 = await nftContractOf.methods.MinitngPrice_with_single().call()
        // mintingbnbPrice_Toke_2 = web3.utils.fromWei(mintingbnbPrice_Toke_2)
        console.log('mintingbnbPrice_Toke_2', mintingbnbPrice_Toke_2)

        mintingbnbPrice_Toke_2 = Number(mintingbnbPrice_Toke_2)

        mintingbnbPrice_Toke_2 = parseFloat(mintingbnbPrice_Toke_2).toFixed(4)
        if (singlenft.minting_counter == 1) {
          console.log('mintingbnbPrice_Toke_2.inner', mintingbnbPrice_Toke_2)

          mintingbnbPrice_Toke_2 = mintingbnbPrice_Toke_2 * value
          // arr = [...PriceArray]
          // arr[1].price = mintingbnbPrice_Toke_2
          arr.push({
            name: "Mint With BUSD",
            price: mintingbnbPrice_Toke_2,
          })
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_2 })


          // setPriceArray(arr)
          // setToken_Value_2(mintingbnbPrice_Toke_2)
        } else if (singlenft.minting_counter == 2) {
          mintingbnbPrice_Toke_2 = mintingbnbPrice_Toke_2 * 2 * value
          // arr = [...PriceArray]
          arr.push({
            name: "Mint With BUSD",
            price: mintingbnbPrice_Toke_2,
          })
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_2 })


          // setPriceArray(arr)
          // setToken_Value_2(mintingbnbPrice_Toke_2 * 2)
        }

        let mintingbnbPrice_Toke_3 = await nftContractOf.methods.ValueinToken_single().call()

        mintingbnbPrice_Toke_3 = web3.utils.fromWei(mintingbnbPrice_Toke_3)
        mintingbnbPrice_Toke_3 = Number(mintingbnbPrice_Toke_3)
        // console.log("value1", mintingbnbPrice_Toke_3);
        mintingbnbPrice_Toke_3 = parseFloat(mintingbnbPrice_Toke_3).toFixed(4)
        if (singlenft.minting_counter == 1) {
          mintingbnbPrice_Toke_3 = mintingbnbPrice_Toke_3 * value
          // arr = [...PriceArray]
          arr.push({
            name: "Mint With LAR",
            price: mintingbnbPrice_Toke_3,
          })
          // arr[2].price = mintingbnbPrice_Toke_3
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_3 })

          // setPriceArray(arr)
          // setToken_Value_3(mintingbnbPrice_Toke_3)
        }
        else if (singlenft.minting_counter == 2) {
          mintingbnbPrice_Toke_3 = mintingbnbPrice_Toke_3 * 2 * value
          // arr = [...PriceArray]
          arr.push({
            name: "Mint With LAR",
            price: mintingbnbPrice_Toke_3,
          })
          // arr[2].price = mintingbnbPrice_Toke_3
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_3 })

          // setPriceArray(arr)
          // setToken_Value_3(mintingbnbPrice_Toke_3 * 2)
        }
        let wirePrices = await nftContractOf.methods.ValueinToken1().call()
        wirePrices = web3.utils.fromWei(wirePrices)
        let mintingPriceBNB = await nftContractOf.methods.MinitngPricein_busd().call()
        let add_Value_in_BNB = await nftContractOf.methods.Valueinbnb_single().call()

        let add_Value_in = web3.utils.fromWei(add_Value_in_BNB.toString())
        mintingPriceBNB = web3.utils.fromWei(mintingPriceBNB)
        mintingPriceBNB = Number(mintingPriceBNB)
        mintingPriceBNB = parseFloat(mintingPriceBNB).toFixed(4)

        let Mint_Value_WithOut_Wire = Number(add_Value_in) + Number(increment_each_data)
        Mint_Value_WithOut_Wire = parseFloat(Mint_Value_WithOut_Wire).toFixed(4)

        if (singlenft.minting_counter == 1) {
          mintingPriceBNB = ` ${mintingPriceBNB * value} wire ${parseFloat(wirePrices * value).toFixed(4)}`
          // arr = [...PriceArray]
          // arr[3].price = mintingPriceBNB
          arr.push({
            name: "BUSD And WIRE",
            price: mintingPriceBNB,
          })
          Mint_Value_WithOut_Wire = Mint_Value_WithOut_Wire * value
          // setSelectedValue({ ...selectedValue, price: mintingPriceBNB })

          // setPriceArray(arr)
          //    console.log("Mint_Value_WithOut_Wire", Mint_Value_WithOut_Wire);

          // setToken_Value_BNB_Without_wire(Mint_Value_WithOut_Wire)
          // setToken_Value_BNB(mintingPriceBNB)
        } else if (singlenft.minting_counter == 2) {

          mintingPriceBNB = ` ${mintingPriceBNB * 2 * value} wire ${parseFloat(wirePrices * 2 * value).toFixed(4)}`
          // arr = [...PriceArray]
          // arr[3].price = mintingPriceBNB
          arr.push(
            {
              name: "BUSD And WIRE",
              price: mintingPriceBNB,
            }
          )
          // setSelectedValue({ ...selectedValue, price: mintingPriceBNB })

          // setPriceArray(arr)
          // setToken_Value_BNB(mintingPriceBNB * 2)
          // setToken_Value_BNB_Without_wire(Mint_Value_WithOut_Wire * 2)
        }

        let mintingPriceBUSD = await nftContractOf.methods.MinitngPricein_busd().call()

        mintingPriceBUSD = web3.utils.fromWei(mintingPriceBUSD)

        let Value_IN_BUSD = value == 1 ? 20 : parseFloat(value) * 20




        mintingPriceBUSD = parseFloat(mintingPriceBUSD).toFixed(4)
        if ((singlenft.count == 100 && singlenft.minting_counter == 1) || (singlenft.count == 200 && singlenft.minting_counter == 2)) {
          if (singlenft.minting_counter == 1) {
            mintingPriceBUSD = ` ${mintingPriceBUSD * value} Income ${Value_IN_BUSD}`
            // arr = [...PriceArray]
            arr.push(
              {
                name: "BUSD And Income",
                price: mintingPriceBUSD,
              }
            )

            // setSelectedValue({ ...selectedValue, price: mintingPriceBUSD })

            setPriceArray(arr)
            // Value_IN_BUSD = Value_IN_BUSD * value

            // setToken_Value_BUSD_Without_wire(Value_IN_BUSD)
            // setToken_Value_BUSD(mintingPriceBUSD)
          } else if (singlenft.minting_counter == 2) {
            mintingPriceBUSD = ` ${mintingPriceBUSD * value * 2} Income ${Value_IN_BUSD * 2}`
            // console.log("mintingPriceBUSD", mintingPriceBUSD*2);
            // setToken_Value_BUSD_Without_wire(Value_IN_BUSD * 2)
            // arr = [...PriceArray]
            // arr[4].price = mintingPriceBUSD
            arr.push(
              {
                name: "BUSD And Income",
                price: mintingPriceBUSD,
              }
            )
            // setSelectedValue({ ...selectedValue, price: mintingPriceBUSD })

            setPriceArray(arr)
            // setToken_Value_BUSD(mintingPriceBUSD * 2)
          }
        }
        setPriceArray(arr)
      } catch (e) {
        console.log('Error while Get Vale ', e)
      }
    }
  }


  useEffect(() => {
    getVAlues()

  }, [singlenft, value])
  console.log('selected value', selectedValue)
  return (
    <>
      <div className="NftMain CollectionMain">
        <Row>
          <Col xs={12} sm={12} md={3}>
            <div className="Nft_cardMain ">
              {singlenft && singlenft?.imageUrl ? (
                <Image
                  src={singlenft?.imageUrl}
                  alt="Image description"
                  fluid={true}
                  className="CollectionCrdImg"
                />
              ) : singlenft.videoUrl ? (
                <video controls className="CollectionCrdvid">
                  <source src={singlenft?.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={nftsImage}
                  alt="Image description"
                  fluid={true}
                  className="CollectionCrdImg"
                />
              )}

              {/* <h6>
                {singlenft && singlenft?.title ? singlenft?.title : "Ring"}
              </h6>
              <p>
                {singlenft && singlenft?.dec ? singlenft?.dec : "Ring #GLEBA"}
              </p> */}
              <div className="nftsPrice">
                <span>
                  {singlenft && singlenft?.price
                    ? `${singlenft?.title}`
                    : "$0.10"}
                </span>
                <span>
                  <Image src={hart} alt="Image description" fluid={true} />
                  {singlenft && singlenft?.count ? <>${singlenft?.count}</> : "200"}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={9}>
            <div className="NftArt">
              <div className="NftArt_Count">
                <button onClick={decrementCount}>-</button>
                <div className="NftArt_CountOutout">{value}</div>
                <button onClick={incrementCount}>+</button>
              </div>
              <div className="BUSD_Mian">
                {selectedValue && (
                  <button onClick={mint}>
                    {selectedValue?.name} - {selectedValue?.price}
                  </button>
                )}

                <div className="BUSD_text">
                  <Form.Select onChange={handleChange}>
                    {PriceArray?.map((value) => (
                      <>
                        <option value={JSON.stringify(value)} key={value?.name}>
                          {value?.name} - {value?.price}
                        </option>
                      </>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="NftArt_text">
                <h6>NFT Name</h6>
                <h6>{singlenft.title}</h6>
              </div>
              {/* <Button>
                Buy NFT
              </Button> */}
              {/* <div className="NftArt_sharebtn">
                <button>
                  <Image src={share} alt="Image description" fluid={true} />
                  Share this NFT
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CollectionNFT;
