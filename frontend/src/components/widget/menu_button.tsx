interface ActionBar {
  onClick: () => void;
}

const MenuButton: React.FC<ActionBar> = ({ onClick }) => {
  return (
    <div
      className="group h-6 mx-2 xl:hidden flex flex-col justify-between items-start cursor-pointer"
      onClick={onClick}
    >
      <span className="bg-white w-7 group-hover:w-7 h-1 duration-300 rounded-full" />
      <span className="bg-white w-4 h-1 group-hover:w-7 duration-300 rounded-full" />
      <span className="bg-white w-7 group-hover:w-4 h-1 duration-300 rounded-full" />
    </div>
  );
};

export default MenuButton;
