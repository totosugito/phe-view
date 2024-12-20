import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "shared/components/table/index.js";
import {date_to_string, to_decimal_formatted} from "src/utils/MyUtils.js";
import {CardLayout} from "shared/components/base/index.js";
import {useMemo} from "react";

const TableView = ({title, values, actualKey = "", potentialKey = "", isActiveKey = ""}) => {
  const {t} = useTranslation();

  const colPrefix = "";
  const reformatHeader = (header) => {
    return header.replace(colPrefix, "").replace(/_/g, " "); // Replace underscores with spaces
  };
  const columns = useMemo(() => [
    {
      accessorKey: "#",
      size: 50,
      enableSorting: false,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"#"}/>)
      },
      cell: ({row}) => {
        return <div className="text-center">{row.index + 1}</div>
      },
    },
    {
      accessorKey: "region",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Name"}/>)
      },
    },
    {
      accessorKey: "total_platform",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Platform"}/>)
      },
    },
    {
      accessorKey: "total_wells",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Wells Active/Inactive"}/>)
      },
      cell: ({cell, row}) => {
        return <div className=""><span
          className={"text-success"}>{row.original[isActiveKey]}</span> / <span
          className={"text-error"}>{cell.getValue() - row.original[isActiveKey]}</span></div>
      },
    },
    {
      accessorKey: `total.${actualKey}`,
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Total " + actualKey)}/>)
      },
      cell: ({cell}) => {
        return <div className="">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: `total.${potentialKey}`,
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Total " + potentialKey)}/>)
      },
      cell: ({cell}) => {
        return <div className="">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
  ], []);

  return (
    <CardLayout title={title}>
      <TableData columns={columns} data={values} rowsPerPage={10} showTopToolbar={true} showBottomToolbar={true}/>
    </CardLayout>
  )
}
export default TableView