import AppAreaChart from "@/components/Dashboard/AppAreaChart"
import AppPieChart from "@/components/Dashboard/AppPieChart"
import AppBarChart from "@/components/Dashboard/BarChart"
import BarChart from "@/components/Dashboard/BarChart"
import CardList from "@/components/Dashboard/CardList"
import { Todolist } from "@/components/Dashboard/Todolist"


const DashBoard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <h1 className="text-lg ">Total Revenue </h1><AppBarChart></AppBarChart></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Latest Transaction"></CardList></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart></AppPieChart></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><Todolist></Todolist></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><AppAreaChart></AppAreaChart></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><CardList title="Popular Content"></CardList></div>


    </div>
  )
}

export default DashBoard