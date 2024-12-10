import {useState} from "react";

const FilterView = ({values, onChange}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    if(newValue === selectedOption) {
      return;
    }
    setSelectedOption(newValue);
    onChange(newValue);
  }

  return (
    <div className={"flex flex-row gap-2 items-center justify-center"}>
      <div>Well Name</div>
      <select className="select select-bordered w-full max-w-xs select-sm" value={selectedOption} onChange={handleChange}>
        {values?.map((item, index) => (
          <option key={index} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  )
}
export default FilterView