import Image from "next/image";
import {
  ConnectWallet,
  useContract,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useContractWrite,
  useContractRead,
  useUnclaimedNFTSupply,
  useTokenSupply,
} from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { BigNumber, utils } from "ethers";
import Link from "next/link";
import contract_abi from "../components/contract";
type ChainProps = {
  activeChainId: number;
};
const contractAdress = "0x1D5331f20FeCE5DDC4A3Cb03677e395b7148C827";

const Home = (props: ChainProps) => {
  // contract initialization.
  const {
    contract: nftDrop,
    isLoading: loaz,
    error: errod,
  } = useContract(contractAdress, contract_abi);
  // contract metadata and supply.
  // the variable gets populated with the wallet address if connected
  const address = useAddress();

  // checks if the user is on an wrong network
  const isWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // sucess and error messages
  const [succes, setSucces] = useState("");
  const [supply, setSupply] = useState(0);

  const [errormsg, setError] = useState("");

  const [isMinting, setIsMinting] = useState(false);

  // the qty variable gets populated with the qty which user enters
  const [qty, setQty] = useState(1);
  const { mutateAsync, isLoading, error } = useContractWrite(nftDrop, "mint");
  // const { mutateAsync: callIsMintingOn } = useContractRead(nftDrop, "totalSupply");
  useMemo(() => {
    if (nftDrop) {
      const supply = async () => {
        const x = await nftDrop?.erc1155.totalSupply(BigNumber.from(1)._hex);
        setSupply(BigNumber.from(x).toNumber());
      };
      supply();
    }
  }, [nftDrop, succes]);
  // mint function

  const textColor = useMemo(() => {
    if (supply / 420 > 0.9) return "text-red-900";
    else if (supply / 420 > 0.75) return "text-red-700";
    else if (supply / 420 > 0.5) return "text-orange-400";
    else if (supply / 420 > 0.25) return "text-amber-400";
    else return "text-green-400";
  }, [supply]);
  const mint = async () => {
    setError("");
    setSucces("");

    if (!address) {
      setError("Please connect your wallet.");
      return;
    }

    if (isWrongNetwork) {
      switchNetwork && switchNetwork(props.activeChainId);
      return;
    }

    if (qty < 1) {
      setError(`Min 1 required.`);
      return;
    }

    if (qty > Number(21)) {
      setError(`Max ${21} allowed`);
      return;
    }

    //  useMemo(() => callIsMintingOn(), [])

    setIsMinting(true);
    try {
      // ts-ignore
      await mutateAsync(
        // @ts-ignore
        [
          ...[BigNumber.from(1)._hex, BigNumber.from(qty)._hex],
          {
            value: utils.parseEther((qty * 0.0069).toPrecision(3)),
          },
        ]

        // send 0.1 native token with the contract call
      );
      setIsMinting(false);
      setSucces("Mint successful 🥳");
      setQty(qty);
    } catch (error: any) {
      // console.log(qty);
      setIsMinting(false);
      setQty(qty);
      setError(error.reason);
    }
  };

  // to display the loader until the data is fetched
  if (!nftDrop) {
    return (
      <div className="pre__loader w-full min-h-screen flex items-center justify-center">
        <div className="p-4 rounded-lg bg-[#ffffffd6]">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="about__content mint__card p-4 rounded-lg w-4/5 md:w-4/12">
          <div className="card__top flex justify-between items-center">
            <h3 className="heading text-xl w-full text-center text-slate-800">
              {" "}
              OG -{" "}
              <Link
                href="https://twitter.com/elonmusk/status/1678098028849143809?s=20"
                target={"_blank"}
              >
                &apos;Zuck is a Cuck&apos;
              </Link>
            </h3>
          </div>

          <div className="card__img mt-3 ">
            <Image
              src="/melon_musk_zuck_the_cuck.gif"
              alt="cuteastros"
              className="rounded-lg"
              layout="responsive"
              width="100%"
              height="80%"
              priority={true}
            />
          </div>
          <div className="card__btn mt-3">
            {address ? (
              <div className="mint__options flex justify-centre items-centre gap-x-2">
                <input
                  type="number"
                  placeholder="QTY"
                  name="qty"
                  className="border text-sm rounded-md block w-[30%] h-full p-2.5 focus:outline-none focus:border-[#0ea4e9] focus:ring-1 focus:ring-[#0ea4e9]"
                  disabled={isMinting}
                  min={1}
                  max={21}
                  value={qty}
                  onChange={(e) => {
                    if (Number(e.target.value) > 21) {
                      setQty(21);
                    }
                    setQty(Number(e.target.value));
                  }}
                />

                <button
                  onClick={mint}
                  disabled={isMinting}
                  className={`p-2 ${
                    isMinting
                      ? "bg-green-400"
                      : isWrongNetwork
                      ? "bg-slate-400"
                      : "bg-sky-700"
                  } rounded-md w-[70%] text-white heading`}
                >
                  {isMinting
                    ? "Minting"
                    : isWrongNetwork
                    ? "Change network"
                    : `Mint ${qty} for ${(qty * 0.0069).toPrecision(4)}`}
                </button>
              </div>
            ) : (
              <ConnectWallet accentColor="#0ea4e9" colorMode="light" />
            )}

            {/* {!address && (
                
              )} */}
            <span className="loader-mint"></span>
            <div className={` ${textColor} text-center text-3xl mt-4`}>
              {" "}
              <b>{420 - supply > 0 ? 420 - supply : "None"}</b>&nbsp;left
            </div>
          </div>
        </div>
      </div>
      {succes ? (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg fixed bottom-0 right-4"
          role="alert"
        >
          <span className="font-medium">{succes}</span>
        </div>
      ) : errormsg ? (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg fixed bottom-0 right-4"
          role="alert"
        >
          <span className="font-medium"> {errormsg} </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
