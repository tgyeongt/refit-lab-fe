import Exchange from "./(component)/Exchange";
import Section from "./(component)/Section";

export default function HomePage() {
  return (
    <main>
      <Section
        title={"지금 교환 중인 옷"}
        content={<Exchange />}
        detailUrl="null"
      />
      <Section title={"예정된 행사"} content={"hello"} detailUrl="event" />
      <Section title={"커뮤니티"} content={"hello"} detailUrl="community" />
    </main>
  );
}
