import Community from "./(component)/Community";
import Exchange from "./(component)/Exchange";
import Section from "./(component)/Section";
import Sponser from "./(component)/Sponser";
import Event from "./(component)/Event";

export default function HomePage() {
  return (
    <main>
      <Section
        title={"지금 교환 중인 옷"}
        content={<Exchange />}
        detailUrl="exchange"
      />
      <Section title={"예정된 행사"} content={<Event />} detailUrl="event" />
      <Section
        title={"커뮤니티"}
        content={<Community />}
        detailUrl="community"
      />
      <Sponser />
    </main>
  );
}
