import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "shared/components/table";
import {useMemo} from "react";
import {to_decimal_formatted} from "src/utils/MyUtils.js";
import {CardLayout} from "shared/components/base";

const TableWell = ({values}) => {
  const {t} = useTranslation();
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
      accessorKey: "area",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Area"}/>)
      },
    },
    {
      accessorKey: "well",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Well"}/>)
      },
    },
    {
      accessorKey: "count",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Count"}/>)
      },
      cell: ({row}) => {
        return <div className="text-center">{row.original.end - row.original.start + 1}</div>
      },
    },
    {
      accessorKey: "summary.3.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "summary.4.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Water (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "summary.5.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Gas (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
  ], []);

  return (
    <CardLayout title={"Wells Table"}>
      <TableData columns={columns} data={values} rowsPerPage={10} showTopToolbar={true} showBottomToolbar={true}/>
    </CardLayout>
  )
}
export default TableWell