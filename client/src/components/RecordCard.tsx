import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

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
          <DialogContent>
            <p className="text-dark_green">Add a new record</p>
          </DialogContent>

        </Dialog>
      </CardHeader>
      <CardContent className="space-y-2">
        {
          {
            supply: (
              <div className="">
                {supplyData?.length ? (
                  supplyData?.length
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
                  supplyData?.length
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
      <CardFooter>
        {/* <Button>Save password</Button> */}
      </CardFooter>
    </Card>
  );
};

export default RecordCard;
