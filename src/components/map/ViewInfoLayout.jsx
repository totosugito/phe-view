import { IoMdClose } from "react-icons/io";

const ViewInfoLayout = ({title, visible, setVisible, children}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className={"flex flex-row justify-between sm:text-2xl text-xl"}>
        <div className={"font-bold"}>{title}</div>
        <button className={"btn btn-sm btn-ghost px-2 py-0 sm:text-2xl text-xl"} onClick={() => setVisible(!visible)}><IoMdClose /></button>
      </div>
      <div className={"flex flex-col mt-2 gap-2 h-fit overflow-y-auto"}>
        {children}
      </div>
    </div>
  );
};
export default ViewInfoLayout;
