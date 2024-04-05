import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

const Connect: FC = () => {
  return (
    <div className=" bg-white/70 h-[calc(100vh-100px)] flex items-center justify-center ">
      <Card>
        <CardContent className=" bg-white hover:bg-white w-[300px] h-[300px] shadow-2xl shadow-black flex items-center justify-center">
          <w3m-button />
        </CardContent>
      </Card>
    </div>
  );
};

export default Connect;
