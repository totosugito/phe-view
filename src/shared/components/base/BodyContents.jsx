import {twMerge} from "tailwind-merge";

const BodyContents = ({children, ...props}) => {
  return(
    <div className={twMerge("shared-body-contents", props?.className)}>
      {children}
    </div>
  )
}
export default BodyContents