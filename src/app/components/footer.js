import Image from "next/image";
import Link from "next/link";
export default function footer() {
  return (
    <div className="bg-[#fee042] drop-shadow-[0_1px_3px_rgba(0,0,0,0.20)]">
      <div className="container mx-auto flex max-md:flex-col-reverse items-center justify-between p-8 gap-y-4">
        <p className="font-athitiMedium text-base text-[#984333] leading-[20px] ">
          © 2024 9singhabroker. All rights reserved.
        </p>
        <div className="flex gap-x-6">
          <Link href="https://www.9singhabroker.com/">
            <Image
                src="/www.svg"
                width={24}
                height={24}
                alt="9singhabroker.com"
                priority={true}
              />
          </Link>

          <Link href="https://www.facebook.com/SinghaBroker">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 14.991 3.657 19.128 8.438 19.878V12.891H5.898V10H8.438V7.797C8.438 5.291 9.93 3.907 12.215 3.907C13.309 3.907 14.453 4.102 14.453 4.102V6.562H13.193C11.95 6.562 11.563 7.333 11.563 8.124V10H14.336L13.893 12.89H11.563V19.878C16.343 19.128 20 14.991 20 10Z"
                fill="#984333"
              />
            </svg>
          </Link>
          

          <Link href="https://lin.ee/QYJ54jO">
            <Image
                src="/line.svg"
                width={24}
                height={24}
                alt="line"
                priority={true}
              />
          </Link>

          <Link href="https://vt.tiktok.com/ZSda8gvaH/">
            <Image
                src="/tiktok.svg"
                width={24}
                height={24}
                alt="tiktok"
                priority={true}
              />
          </Link>

          

          
        </div>
      </div>
    </div>
  );
}
