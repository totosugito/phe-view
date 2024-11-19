import { to_formatted_money } from "src/utils/MyUtils";

const BigInfoLabel = ({ title, value, style, asMoney=false, prefix="", precision=2 }) => {

  const getValue = () => {
    if (asMoney) {
      return (to_formatted_money(value, prefix, precision));
    } else {
      return (value);
    }
  };
  return (
    <>
      <div className={"my-card-container flex flex-col w-full items-center justify-items-center"}>
        <div className={"md:text-sm text-xs text-center truncate"}>{title}</div>
        <div className={`sm:text-4xl text-3xl font-bold py-2 ${style}`}>
          {getValue()}
        </div>
      </div>
    </>
  );
};
export default BigInfoLabel;
