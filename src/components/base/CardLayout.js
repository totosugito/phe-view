const CardLayout = ({ title, rightTitle, children, height }) => {
  return (
    <>
      <div className={"my-card-container"}  style={{height: height ?? ""}}>
        <div className={"flex flex-row justify-between w-full pb-3"}>
          <div className="text-lg font-bold truncate">{title}</div>
          {rightTitle && <div className={"text-end"}>{rightTitle}</div>}
        </div>
        <div className={"h-full"}>
          {children}
        </div>
      </div>
    </>
  );
};
export default CardLayout;
