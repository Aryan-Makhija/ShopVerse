import { columns } from "./columns"
import { DataTable } from "./data-table"



const Orders = () => {
  return (
    <div>

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">

        <h1 className="font-semibold text-2xl "> All Orders</h1>
      </div>
      <DataTable columns={columns} ></DataTable>
    </div>
  )
}

export default Orders