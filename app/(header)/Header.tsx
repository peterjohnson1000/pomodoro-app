import { CiKeyboard, CiLogin } from "react-icons/ci";
import { GiFrog } from "react-icons/gi";
import { FaRegChartBar } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Shortcut from "../(shortcut)/Shortcut";
import Analytics from "../(analytics)/Analytics";



const Header = () => {
    return (
        <div className="w-[400px] flex justify-between mt-5 pb-2 border-b border-black">
            <div className="flex justify-center items-center">
                <GiFrog />
                <p className="ml-1">eathefrogfirst</p>
            </div>
            <div className="w-[250px] flex justify-around">
                <div className="flex justify-center items-center">
                    <FaRegChartBar className="mr-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">Report</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Analytics />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex justify-center items-center mx-3">
                    <CiKeyboard className="mr-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">Shortcuts</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Shortcut />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex justify-center items-center">
                    <CiLogin className="cursor-not-allowed" />
                    <button className="ml-1 cursor-not-allowed">login</button>
                </div>
            </div>

        </div>
    )
};

export default Header;