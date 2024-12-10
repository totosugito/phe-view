import {useTranslation} from "react-i18next";

const RowsPerPage = ({table, rowsPerPage, setRowsPerPage, pageList=[5,10,15,20]}) => {
    const {t} = useTranslation();
    return (
        <div className={"flex gap-2 items-center"}>
            <label className="text-neutral-600 text-sm">{t("components.rowsPerPage")}</label>
            <select
                className="select select-bordered select-sm"
                value={rowsPerPage}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    setRowsPerPage(value);
                    table.setPageSize(value); // Update the page size in TanStack Table
                }}
            >
                {pageList.map(size => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default RowsPerPage
