import { Coins } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface DataCardProps {
  name: string;
  amount: number;
  type: "supply" | "borrow";
}
const DataCard: FC<DataCardProps> = ({ name, amount, type }) => {
  const [value, setValue] = useState<number>(0);
  return (
    <div className="flex items-center justify-between">
      <Coins className="w-8 h-8 text-dark_green" />
      <p className=" font-Jakarta text-dark_green text-base">{name}</p>
      <p className=" font-Jakarta text-dark_green/70 text-base">{amount}</p>
      <Dialog>
        <DialogTrigger>
          <Button className=" bg-primary_blue/70 hover:bg-primary_blue  text-white text-sm">
            {type === "supply" ? "Withdraw" : "Repay"}
          </Button>
        </DialogTrigger>
        <DialogContent className=" flex flex-col gap-10">
          <p className="text-dark_green font-Jakarta font-semibold text-xl">
            {type === "supply"
              ? " Withdraw collateral"
              : "Repay borrowed asset"}
          </p>
          <div className=" bg-white border border-dark_green flex gap-2 justify-between w-full rounded-lg p-2 items-center">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.valueAsNumber)}
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
          {
            type === "borrow" && (

                <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
              Repay with collateral
            </Label>
          </div>
              )
            }
          <Button className="w-full bg-primary_blue hover:bg-primary_blue text-white font-Jakarta font-bold text-lg py-2 rounded-lg">
            {type === "supply" ? "Withdraw" : "Repay"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataCard;
