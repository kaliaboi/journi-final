import Title from "../components/ui/Title";
import Paragraph from "../components/ui/Paragraph";
import { Button } from "./ui/button";
import MainAnimation from "../components/MainAnimation";
import { LockClosedIcon } from "@radix-ui/react-icons";
import google from "../public/google.png";
import Image from "next/image";

export default function Landing({ google, discord }: any) {
  return (
    <main className="flex w-full justify-center h-screen">
      <div className="px-6 py-12 flex flex-col justify-between lg:justify-center max-w-md">
        <div className="top">
          <MainAnimation />
          <Title intent="title" alignment="centered">
            Welcome to Journi!
          </Title>
          <Paragraph className="pt-4" alignment="centered">
            Journi is a tiny AI powered everyday journal that helps you build a
            journaling habit by asking you 3 questions on how you are feeling.
          </Paragraph>
        </div>
        <div className="bottom lg:mt-24 flex flex-col gap-2">
          <Button
            variant="outline"
            className="lg:mt-12 w-full"
            size="lg"
            onClick={() => google()}
          >
            <div className="w-full flex justify-around">
              <div className="flex gap-4">
                <Image src="/google.png" alt="" width={20} height={20} />
                Login with Google
              </div>
            </div>
          </Button>

          <Button
            variant="default"
            className="w-full bg-[#7289d9] hover:bg-[#485b9f]"
            size="lg"
            onClick={() => discord()}
          >
            <div className="w-full flex justify-around">
              <div className="flex gap-4">
                <Image src="/discord.png" alt="" width={25} height={20} />
                Continue with Discord
              </div>
            </div>
          </Button>
          <div className="disclaimer flex flex-row items-center justify-center gap-1 mt-4">
            <LockClosedIcon className="text-[#6b7280]" />
            <Paragraph className="" alignment="centered" size="tiny">
              All data stored privately and not collected.
            </Paragraph>
          </div>
        </div>
      </div>
    </main>
  );
}
