import { MyChart } from "@/app/(pages)/chart/components";
import { FlexContainer } from "@/app/common/components/FlexContainer";
import { Card, CardBody, Typography } from "@/app/common/lib/material-tailwind";

export default function Page() {
  return (
    <FlexContainer>
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
    </FlexContainer>
  );
}
