import { Button, Card, Typography } from "@/lib/material-tailwind";
import Image from "next/image";
import { CurrencyYenIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-8 lg:px-14 lg:py-12 w-full">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-6 items-center">
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-fit px-4 py-2 mx-auto md:m-0 flex items-center border rounded-full bg-yellow-200 shadow-sm">
            <CurrencyYenIcon className="w-8 h-8" />
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-md md:text-xl ml-1"
            >
              Manage your Expense
            </Typography>
          </div>
          <Typography
            variant="h1"
            color="blue-gray"
            className="text-5xl lg:text-6xl xl:text-7xl text-center leading-tight md:text-left"
          >
            Your Financial Footprint,
            <br />
            At a Glance!
          </Typography>
          <Typography
            variant="h5"
            className="text-gray-500 text-lg lg:text-2xl text-center md:text-left"
          >
            This app makes you free from managing your expenses by yourself.
          </Typography>
        </div>
        <Card className="w-full h-fit overflow-hidden shadow-xl">
          <Image
            alt="picture"
            src="/Home.jpg"
            priority
            width={500}
            height={500}
            className="w-full bg-transparent hover:scale-110 duration-300"
          />
        </Card>
      </div>
      <div className="flex flex-col items-center mt-16 lg:mt-32">
        <Link href="signup" className="w-full flex justify-center">
          <Button
            color="blue"
            size="lg"
            className="h-fit max-w-lg hover:bg-blue-600 duration-300 mb-4"
            fullWidth
          >
            Sign up
          </Button>
        </Link>
        <Typography className="text-center">
          If you already have your account,
          <br />
          <Link href="/login" className="underline text-blue-600">
            click here
          </Link>
        </Typography>
      </div>
    </div>
  );
}
