import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div>
      {/* Navbar */}
      <div>
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="about-hero"
        className="flex items-center justify-center w-full h-[80vh]"
      >
        <Image
          src="/images/logo-high.png"
          alt="BMBS logo"
          width={1000}
          height={1000}
          className="bmbs-logo"
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container mx-auto max-w-[52rem] mt-36 mb-24 flex flex-col items-center justify-center"
      >
        <h2 className="w-[30.5rem] mb-24 mx-4 flex items-center font-bold text-pink-600 text-3xl">
          <span className="font-bold text-[5rem] pr-1">WHAT</span>is Brahm Mauer
          Bartending Service?
        </h2>
        <p className="font-medium leading-6 px-20 text-white">
          <span className="">Brahm Mauer&apos;s</span> journey began in the
          restaurant and bar scene. After successfully completing every position
          in restaurants, he set his sights on the event industry. Realizing
          that the city needed something fresh and new, he decided to start
          Brahm Mauer Bar Services. Fast forward to today with over 25 years of
          experience and extensive training Brahm Mauer and his team have become
          Montréal&apos;s premiere event company; servicing private, corporate,
          fundraisers & festivals.
          <br />
          <br />
          In providing a perfect service from the initial contact with our
          clients until the last drink is served, we&apos;ve been able to grow
          from a couple of events a year into the monopoly that is BMBS today.
          BMBS is exclusive in some of the city&apos;s hottest venues and the
          preferred vendor to the rest of them.
        </p>
        <Image
          width={1000}
          height={1000}
          src="/images/brahm.jpg"
          alt="portrait of owner Brahm Mauer"
          className="mt-16 w-3/4 rounded"
        />

        <h2 className="w-[32rem] my-24 mx-4 flex items-center font-bold text-pink-600 text-3xl">
          <span className="font-bold text-[5rem] pr-1">LEADER</span>in
          Montréal&apos;s Service Industries
        </h2>
        <p className="font-medium leading-6 px-20 text-white">
          Brahm Mauer and his team are firm believers that with the right team &
          support staff anything and everything is possible! We are more than
          just a bar service, we are the definition of hospitality.
        </p>
        <p className="my-8 italic w-4/5 mx-auto text-white">
          &ldquo;Clients do not come first. Employees come first. If you take
          care of your employees, they will take care of the clients&rdquo;
          -&nbsp;
          <strong>Richard Branson</strong>
        </p>
        <p className="font-medium leading-6 px-20 text-white">
          Our service staff are the backbone of our business and the ambassadors
          of our brand. They are passionate, well trained, and always ensure
          that everyone around them are having the best time possible. BMBS has
          an extremely low staff turnover rate which gives us the edge over the
          competition. Other bar service and catering companies rely on staffing
          agencies, which means their staff differ from event to event. This
          eliminates the synergy and loyalties with their service team.
        </p>
        <p className="mt-8 font-medium leading-6 px-20 text-white">
          The BMBS experience cannot be spoken about without mentioning their
          market fresh Mixology program. Their in-house mixology team creates
          seasonal menus for our guests to choose from. They also provide their
          homemade purées to Montreal festivals, including Beach Club & Piknic
          Electronic. Using only the freshest ingredients and staying ahead of
          the trends, Brahm Mauer brings mixology to the next level.
        </p>
        <button>book now</button>
      </section>
      <Footer />
    </div>
  );
}
