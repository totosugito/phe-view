const ContainerGroup = ({ title, children, height }) => {
  return (
    <>
      <div className={""}  style={{height: height ?? ""}}>
        <div className={"flex flex-row justify-between w-full"}>
          <div className="text-md font-bold truncate text-center w-full">{title}</div>
        </div>
        <div className={"h-full"}>
          {children}
        </div>
      </div>
    </>
  );
};
export default ContainerGroup;
