import { MyChart } from "@/app/components/MyChart";
import {
  Card,
  CardBody,
  Typography,
} from "@/app/components/material-tailwind-wrapper";

export default function Page() {
  return (
    <div>
      <Card className="mx-auto w-96 rounded-xl mt-8">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2 underline">
            使用額の内訳
          </Typography>
          <div className="w-full flex justify-center mx-auto mt-4">
            <MyChart />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
