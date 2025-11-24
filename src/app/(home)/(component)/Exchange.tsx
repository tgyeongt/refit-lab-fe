import ExchangeCard from "./ExchangeCard";
import { exchangeList } from "../(dummy)/exchangeList";

export default function Exchange() {
  return (
    <div className="px-4 py-6">
      <div
        className="
          flex gap-4 overflow-x-auto 
          scrollbar-hide 
          snap-x snap-mandatory
        "
      >
        {exchangeList.map((item) => (
          <div key={item.id} className="snap-start">
            <ExchangeCard
              id={item.id}
              title={item.title}
              location={item.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
