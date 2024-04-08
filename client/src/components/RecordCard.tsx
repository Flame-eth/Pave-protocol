import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, PlusSquare } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import DataCard from "./DataCard";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import {
  LendingPollAddress,
  LendingPoolAbi,
  TokenAbi,
  TokenAddress,
  UsdcAbi,
  UsdcAddress,
  UserAccountDataAbi,
  UserAccountDataAddress,
} from "@/abi";
import { formatEther, parseEther } from "viem";
import Loading from "./Loading";

interface AccountData {
  borrowedAmount: bigint;
  collateralBalance: bigint;
  tokenBalance: bigint;
}

interface RecordCardProps {
  title: string;
  type: "supply" | "borrow";
}
const RecordCard: FC<RecordCardProps> = ({
  title,
  type,
}) => {
  const [amount, setAmount] = useState<number | string>("");

  const [coin, setCoin] = useState<string>("PAPCoin");

  const [userData, setUserData] = useState<{
    borrowedAmount: string;
    collateralBalance: string;
    tokenBalance: string;
  }>();

  const { toast } = useToast();
  const { address } = useAccount();
  const { error, isPending, writeContract } = useWriteContract();

  const web3Data = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: TokenAddress,
        abi: TokenAbi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: UsdcAddress,
        abi: UsdcAbi,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });

  const user = useReadContract({
    abi: UserAccountDataAbi,
    address: UserAccountDataAddress,
    functionName: "getAccount",
    args: [address],
  });

  function handleRegister() {
    writeContract(
      {
        abi: UserAccountDataAbi,
        address: UserAccountDataAddress,
        functionName: "registerUser",
        args: [address],
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description:
              "You have been registered successfully and received 1000 PAPCoin",
          });
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  }

  function handleSupply() {
    writeContract(
      {
        abi: TokenAbi,
        address: TokenAddress,
        functionName: "approve",
        args: [LendingPollAddress, parseEther(`${amount}`)],
      },
      {
        onSuccess: (data) => {
          console.log(data);
          writeContract(
            {
              abi: LendingPoolAbi,
              address: LendingPollAddress,
              functionName: "deposit",
              args: [parseEther(`${amount}`)],
            },
            {
              onSuccess: (data) => {
                console.log(data);
                toast({
                  title: "Success",
                  description:
                    `You deposoit of ${amount} was successful`,
                });

              },
              onError: (err) => {
                console.log(err.message);
                toast({
                  title: "Error",
                  description: err.message,
                });
              },
            }
          );
        },
        onError: (err) => {
          console.log(err.message);
          toast({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  }

  function handleBorrow() {
    writeContract({
      abi: LendingPoolAbi,
      address: LendingPollAddress,
      functionName: "borrow",
      args: [parseEther(`${amount}`)],
    });
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    // console.log(user.data);
    const account = user.data as AccountData;
    // console.log(account)
    const data = {
      borrowedAmount: formatEther(account?.borrowedAmount),
      collateralBalance: formatEther(account?.collateralBalance),
      tokenBalance: formatEther(account?.tokenBalance),
    };

    // console.log(data);
    setUserData(data);
  }, [user]);

  if (isPending) return <Loading loading={isPending} />;

  // console.log(web3Data.data, web3Data.error);
  return (
    <Card>
      <CardHeader className=" flex flex-row justify-between items-center">
        <CardTitle className=" font-Jakarta font-semibold leading-10 tracking-wider text-2xl text-dark_green ">
          {title}
        </CardTitle>
        <Dialog>
          <DialogTrigger>
            <PlusSquare className="w-8 h-8 text-dark_green hover:text-primary_blue cursor-pointer" />
          </DialogTrigger>
          <DialogContent className=" flex flex-col gap-10">
            <p className="text-dark_green font-Jakarta font-semibold text-xl">
              {type === "supply"
                ? " Add a new collateral"
                : "Borrow a new asset"}
            </p>
            <p className=" font-Jakarta font-medium text-base text-dark_green">
              New to Pave Protocol? <br /> Click{" "}
              <span
                onClick={handleRegister}
                className=" text-primary_blue hover:underline cursor-pointer font-semibold"
              >
                here
              </span>{" "}
              to claim 1000 PAVECoin for free.
            </p>
            <div className=" bg-white border border-dark_green flex gap-2 justify-between w-full rounded-lg p-2 items-center">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.valueAsNumber)}
                placeholder="0.00"
                className=" flex-1 text-lg leading-10 border-none focus-visible:ring-transparent text-dark_green font-Jakarta font-medium ring-transparent no-spinners"
              />
              <div className="flex gap-1 flex-col">
                <Select
                  value={coin}
                  onValueChange={(e) => {
                    setCoin(e);
                  }}
                >
                  <SelectTrigger className="w-fit border-none text-primary_blue outline-none focus:ring-transparent focus-visible:ring-transparent focus-visible:outline-none font-Jakarta font-bold text-lg">
                    <Coins className="w-6 h-6 text-dark_gree text-primary_blue" />
                    <SelectValue
                      defaultChecked={true}
                      defaultValue="PAPCoin"
                      placeholder="PAPCoin"
                      className=" font-Jakarta font-bold text-xl"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAPCoin">PAPCoin</SelectItem>
                    <SelectItem value="PAPUSDC">PAPUSDC</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 justify-between items-center">
                  <p className="text-dark_green text-sm">
                    Balance:{" "}
                    {coin === "PAPCoin"
                      ? web3Data?.data?.length &&
                        formatEther(web3Data?.data[0] as bigint)
                      : web3Data?.data?.length &&
                        formatEther(web3Data?.data[1] as bigint)}{" "}
                  </p>
                  <p
                    onClick={() => {
                      if (coin === "PAPCoin" && web3Data?.data?.length) {
                        setAmount(formatEther(web3Data?.data[0] as bigint));
                      } else if (coin === "PAPUSDC" && web3Data?.data?.length) {
                        setAmount(formatEther(web3Data?.data[0] as bigint));
                      }
                    }}
                    className="text-dark_green/50 hover:text-dark_green hover:font- text-sm cursor-pointer"
                  >
                    MAX
                  </p>
                </div>
              </div>
            </div>
            <Button
              disabled={amount === 0 || amount === "0" || amount === ""}
              onClick={() => {
                type === "supply" ? handleSupply() : handleBorrow();
              }}
              className="w-full bg-primary_blue hover:bg-primary_blue text-white font-Jakarta font-bold text-lg py-2 rounded-lg"
            >
              {type === "supply" ? "Supply" : "Borrow"}
            </Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-2">
        {
          {
            supply: (
              <div className="">
                { userData?.collateralBalance !== "0" ? (
                  <DataCard type="supply" name="PAPCoin" amount={userData?.collateralBalance as string} />
                ) : (
                  <p className=" text-dark_green/70 font-normal text-base">
                    Nothing supplied yet
                  </p>
                )}
              </div>
            ),
            borrow: (
              <div className="">
                {userData?.borrowedAmount !== "0"  ? (
                  <DataCard type="borrow" name="PAPUSDCd" amount={userData?.borrowedAmount as string} />
                ) : (
                  <p className=" text-dark_green/70 font-normal text-base">
                    Nothing borrowed yet
                  </p>
                )}
              </div>
            ),
          }[type]
        }
      </CardContent>
      <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
    </Card>
  );
};

export default RecordCard;
