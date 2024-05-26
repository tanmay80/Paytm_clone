import { AppBar } from "../components/AppBar";
import { Users } from "../components/Users";

export const Dashboard = ()=>{
    return <div >
            <div><AppBar/></div>
            <div className="p-1 pl-6 font-bold">Your Balance $10000</div>
            <div className="p-1 pl-6 font-bold">Users</div>
            <div><Users/></div>
        </div>
};