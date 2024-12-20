import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "shared/components/table/index.js";
import {CardLayout} from "shared/components/base/index.js";
import {useMemo} from "react";

const TableMsg = ({title="", values, ...props}) => {
  const {t} = useTranslation();

  const columns = useMemo(() => [
    {
      accessorKey: "filename",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Filename"}/>)
      },
      cell: ({row, cell}) => {
        return <div className="" onClick={() => props?.onClickItem(row?.original?.url ?? "")}>{cell.getValue()}</div>
      }
    },
    // {
    //   accessorKey: "size",
    //   enableSorting: true,
    //   header: ({column}) => {
    //     return (<ColumnHeader column={column} title={"Size"}/>)
    //   },
    // },
  ], []);

  return (
    <CardLayout title={title}>
      <TableData columns={columns} data={values} rowsPerPage={100} showTopToolbar={true} showBottomToolbar={true} styleBodyRow={"cursor-pointer"}/>
    </CardLayout>
  )
}
export default TableMsg