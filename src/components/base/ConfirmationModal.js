import {RiCloseLine} from "react-icons/ri";

export default function ConfirmationModal({modal}) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto backdrop-brightness-50">
      <div className={`rounded-lg bg-base-100 ${modal?.styles ?? "w-10/12 max-w-[350px]"}`}>
        <div className={"flex justify-between gap-y-2 items-center pl-4 pr-2 py-1"}>
          <div className="my-dialog-title">
            {modal?.title}
          </div>
          <div>
            <div role="button" className="btn btn-sm btn-ghost btn-circle avatar" onClick={modal?.onCancelClick}>
              <RiCloseLine className={"text-3xl"}/>
            </div>
          </div>
        </div>

        <div className="my-dialog-desc">
          {modal?.content}
        </div>

        <div className="flex items-center gap-x-4 px-3 pb-3 justify-end mt-2">
          {modal?.cancelText && <button className="my-btn-cancel" onClick={modal?.onCancelClick}>{modal?.cancelText}</button>}
          {modal?.confirmText && <button className="my-btn-confirm" onClick={modal?.onConfirmClick}>{modal?.confirmText}</button>}
        </div>

      </div>
    </div>
  )
}
