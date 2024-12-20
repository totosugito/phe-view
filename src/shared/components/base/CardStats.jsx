import {twMerge} from "tailwind-merge";

const CardStats = ({ label, title, ...props }) => {
  return (
    <>
      <div className={"shared-card-container flex flex-col w-full items-center justify-items-center"}>
        <div className={twMerge("md:text-sm text-xs text-center truncate", props?.styleLabel)}>{label}</div>
        <div className={twMerge("sm:text-4xl text-3xl font-bold py-1", props?.styleTitle)}>
          {title}
        </div>
      </div>
    </>
  );
};
export default CardStats;
