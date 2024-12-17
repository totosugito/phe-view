import { IoMdClose } from "react-icons/io";

const ViewInfoLayout = ({title, visible, setVisible, children}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={"flex flex-row justify-between text-lg"}>
        <div className={"font-bold"}>{title}</div>
        <button className={"btn btn-sm btn-ghost rounded-full text-lg text-neutral-500"} onClick={() => setVisible(!visible)}><IoMdClose /></button>
      </div>
      <div className={"flex flex-col gap-1 h-fit overflow-y-auto"}>
        {children}
      </div>
    </div>
  );
};
export default ViewInfoLayout;
