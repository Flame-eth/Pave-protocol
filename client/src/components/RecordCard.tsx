import { FC, useState } from "react";
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
import { Button } from "./ui/button";
import DataCard from "./DataCard";

interface RecordCardProps {
  title: string;
  type: "supply" | "borrow";
  supplyData?: [];
  borrowData?: [];
}
const RecordCard: FC<RecordCardProps> = ({
  title,
  type,
  supplyData,
  borrowData,
}) => {
  const [amount, setAmount] = useState<number>(0);
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
              New to Pave Protocol? <br/> Click{" "}
              <span className=" text-primary_blue hover:underline cursor-pointer font-semibold">
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
                <Select>
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
                <div className="flex gap-1 justify-between items-center">
                  <p className="text-dark_green text-sm">Balance: {0}</p>
                  <p className="text-dark_green/50 hover:text-dark_green hover:font- text-sm cursor-pointer">
                    MAX
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-primary_blue hover:bg-primary_blue text-white font-Jakarta font-bold text-lg py-2 rounded-lg">
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
                {supplyData?.length ? (
                  <DataCard type="supply" name="PAPCoin" amount={480} />
                ) : (
                  <p className=" text-dark_green/70 font-normal text-base">
                    Nothing supplied yet
                  </p>
                )}
              </div>
            ),
            borrow: (
              <div className="">
                {borrowData?.length ? (
                 <DataCard type="borrow" name="PAPCoin" amount={480} />
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
