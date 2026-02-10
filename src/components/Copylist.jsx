import { useContext, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copyclip } from "./Copyclip.jsx";
import { UserContext } from "../UserContext.jsx";

const SortableCard = ({ item, isArrange, handleDelete, handleUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !isArrange });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Copyclip
      item={item}
      isArrange={isArrange}
      isDragging={isDragging}
      setDragRef={setNodeRef}
      dragStyle={dragStyle}
      dragAttributes={attributes}
      dragListeners={listeners}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  );
};

export default function Copylist() {
  const { items, setItems } = useContext(UserContext);
  const [isArrange, setIsArrange] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleUpdate = (itemId, updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1) {
        return prevItems;
      }
      return arrayMove(prevItems, oldIndex, newIndex);
    });
  };

  return (
    <div>
      {/* <div
        onClick={() => setIsColumn(!isColumn)}
        className="m-2 px-4 py-2 bg-blue-500 text-white rounded w-[5%]"
      >
        Toggle
      </div> */}

      <div className="flex items-center justify-end gap-2 px-2">
        <button
          type="button"
          onClick={() => setIsArrange((prev) => !prev)}
          className={`px-3 py-1 rounded text-white transition ${
            isArrange ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isArrange ? "Done" : "Arrange"}
        </button>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {isArrange ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((item) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  isArrange={isArrange}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          items.map((item) => (
            <Copyclip
              key={item.id}
              item={item}
              isArrange={isArrange}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
