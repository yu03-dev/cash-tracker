import { PostForm } from "@/app/(pages)/(contents)/add/components";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-y-6 items-center px-1 py-8 sm:px-4 md:px-8 md:py-12 lg:px-12">
      <PostForm />
    </div>
  );
}
