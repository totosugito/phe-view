import ViewInfoLayout from "./ViewInfoLayout.jsx";

const ViewCustomLegend = ({title, legends, visible, setVisible}) => {
    return(
        <ViewInfoLayout title={title} visible={visible} setVisible={setVisible}>
            {legends.map((item, index) => (
                <div key={index} className={"flex flex-row items-center justify-items-center"}>
                    <div className={`w-[32px] h-[32px] border-2 ${item.view === "circle" ? "rounded-full" : "rounded-none"} rounded-full`}
                         style={{backgroundColor: item.bgColor, borderColor: item.borderColor}}/>
                    <div className={"ml-2 text-base"}>{item.name}</div>
                </div>
            ))}
        </ViewInfoLayout>
    )
}
export default ViewCustomLegend