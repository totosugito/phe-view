import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "src/components/table/index.jsx";
import {useMemo} from "react";
import {date_to_string, to_decimal_formatted} from "src/utils/MyUtils.js";
import {CardLayout} from "src/components/base/index.js";

const TableWell = ({well, values}) => {
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
      accessorKey: "1",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Date"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{date_to_string(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "3",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "4",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Water (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "5",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Gas (MCF)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "6",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"BSW (%)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "7",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"GOR (MCF/bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "8",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Potential Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "9",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Potential Water (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "10",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Potential Gas (MCF)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "11",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"PBHP (psi)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
  ], []);

  return (
    <CardLayout title={`Well : ${well?.well}`}>
      <TableData columns={columns} data={values} rowsPerPage={10} showTopToolbar={true} showBottomToolbar={true}/>
    </CardLayout>
  )
}
export default TableWell