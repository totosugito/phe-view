import { IoMdClose } from "react-icons/io";
import {twMerge} from "tailwind-merge";
const Search = ({searchQuery, setSearchQuery, ...props}) => {
    return (
        <div className={twMerge("flex items-center py-4 input input-sm input-bordered", props?.className)}>
            <input
                placeholder={props?.placeholder || "Search..."}
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=""
            />
            <IoMdClose onClick={() => setSearchQuery("")}/>
        </div>
    );
}
export default Search
