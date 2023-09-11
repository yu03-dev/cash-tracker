import { MyChart } from "@/app/(pages)/(contents)/chart/components";
import { Card, CardBody, Typography } from "@/app/common/lib/material-tailwind";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-8 sm:px-4 md:px-8 md:py-12 lg:px-12">
      <Card className="w-96 rounded-xl">
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
