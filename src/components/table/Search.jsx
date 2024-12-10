import { IoMdClose } from "react-icons/io";
const Search = ({searchQuery, setSearchQuery}) => {
    return (
        <div className="flex items-center py-4 input input-sm input-bordered">
            <input
                placeholder="Search..."
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=""
            />
            <IoMdClose onClick={() => setSearchQuery("")}/>
        </div>
    );
}
export default Search
