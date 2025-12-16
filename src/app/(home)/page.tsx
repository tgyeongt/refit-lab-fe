"use client";

import Community from "./(component)/Community";
import Exchange from "./(component)/Exchange";
import Section from "./(component)/Section";
import Sponser from "./(component)/Sponser";
import Event from "./(component)/Event";
import Footer from "./(component)/Footer";
import MainSection from "./(component)/MainSection";
// import Navigation from "./(component)/Navigation";
import useHeader from "@/shared/hooks/useHeader";

export default function HomePage() {
  useHeader({
    showBack: false,
    showMenu: true,
  });

  return (
    <main>
      <MainSection />
      {/* <Navigation
        sections={[
          { label: "교환", targetId: "exchange" },
          { label: "행사", targetId: "event" },
          { label: "커뮤니티", targetId: "community" },
        ]}
      /> */}

      {/* <Section
        id="exchange"
        title={"지금 교환 중인 옷"}
        content={<Exchange />}
        detailUrl="exchange"
      /> */}
      <Exchange />
      <Section
        id="event"
        title={"예정된 행사"}
        content={<Event />}
        detailUrl="event"
      />
      <Section
        id="community"
        title={"커뮤니티"}
        content={<Community />}
        detailUrl="community"
      />
      <Sponser />
      <Footer />
    </main>
  );
}
