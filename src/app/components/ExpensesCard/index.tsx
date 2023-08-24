import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@/app/components/material-tailwind-wrapper";
import { getTotalExpenses } from "@/utils/fetchUtils";

export const TotalExpenses = async () => {
  const total = await getTotalExpenses();
  if (!total) return <div>Error</div>;
  return (
    <Card color="transparent" className="w-96">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="ml-8 flex items-center gap-4 pt-auto pb-8"
      >
        <Typography variant="h4" color="blue-gray">
          <div>{"収支：¥" + total}</div>
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
};
