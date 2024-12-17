import {RiCloseLine} from "react-icons/ri";
import {useEffect, useRef} from "react";

const ModalDialog = ({modal, dismissable = true}) => {
  const ref = useRef(null); // Reference to the component
  const handleClickOutside = (event) => {
    let isClickInside = ref.current.contains(event.target);
    if (ref.current && (isClickInside === false)) {
      modal?.onCancelClick();
    }
  };

  useEffect(() => {
    if(dismissable) {
      // Add event listener when the component mounts
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Cleanup: Remove event listener when the component unmounts
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto backdrop-brightness-50">
      <div className={`rounded-lg bg-base-100 p-4 flex flex-col justify-between ${modal?.styles ?? "w-10/12 max-w-[400px]"}`} ref={ref}>
        <div className={"flex justify-between gap-y-2 items-center"}>
          <div className="sm:text-xl text-lg font-semibold truncate">
            {modal?.title}
          </div>
          <div className={"flex items-center"}>
            <div role="button" className="btn btn-sm btn-ghost btn-circle avatar" onClick={modal?.onCancelClick}>
              <RiCloseLine className={"text-2xl text-neutral-500"}/>
            </div>
          </div>
        </div>

        <div className={"flex flex-col justify-between h-full flex-1"}>
          <div className="mt-3 mb-5 sm:text-base text-sm flex flex-1">
            {modal?.content}
          </div>

          <div className="flex items-center gap-x-4 px-3 justify-end mt-2">
            {modal?.cancelText && <button className="shared-btn-cancel" onClick={modal?.onCancelClick}>{modal?.cancelText}</button>}
            {modal?.confirmText && <button className="shared-btn-confirm" onClick={modal?.onConfirmClick}>{modal?.confirmText}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalDialog
