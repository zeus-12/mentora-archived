import Image from "next/image";

export default function Home() {
  return (
    <div className="m-8">
      <p className="text-4xl font-bold md:text-5xl text-gray-100 lg:text-7xl block">
        👋 Hello there,
      </p>
      <p className="md:text-4xl md:max-w-[55rem] text-2xl font-semibold text-gray-400 mt-4">
        Here&apos;s the Perfect solution to achieve your dream{" "}
        <span className="text-green-400">CG</span>
      </p>

      <p className="mt-8 text-3xl">Mentora provides you with</p>

      <div className="flex-col gap-6 sm:flex-row flex justify-evenly items-center">
        <div className="w-full sm:w-3/4 md:w-1/2">
          <p className="sm:text-5xl text-3xl font-semibold">Resources</p>
          <p className="font-medium text-gray-400 mt-2 text-xl">
            Mentora is a platform that let you share resources with others.Hence
            providing you with the best resources to ace the exams. It contains
            previous year QP&apos;s, Textbooks, etc.
          </p>
        </div>
        <div className="w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw]">
          <Image
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src="/about-us.png"
            alt="about-us"
          />
        </div>
      </div>
    </div>
  );
}
