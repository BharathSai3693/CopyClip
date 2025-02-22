import { useContext, useState } from "react";
import { Copyclip } from "./Copyclip";
import { UserContext } from "../UserContext";

export default function Copylist() {
  const { items, setItems } = useContext(UserContext);
  const [isColumn, setIsColumn] = useState(false);

  const handleDelete = (name) => {
    setItems(items.filter((item) => item.name !== name));
  };

  return (
    <div>
      {/* <div
        onClick={() => setIsColumn(!isColumn)}
        className="m-2 px-4 py-2 bg-blue-500 text-white rounded w-[5%]"
      >
        Toggle
      </div> */}

      <ul
        className={`flex ${isColumn ? "flex-col" : ""}  flex-wrap items-start`}
      >
        {items.map((item, index) => {
          {
            console.log(item);
          }
          return (
            <>
              <li key={item.name} className="w-[24%]">
                <Copyclip
                  item={item}
                  handleDelete={handleDelete}
                  key={item.name}
                />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
