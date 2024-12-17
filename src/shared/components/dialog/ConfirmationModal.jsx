export default function ConfirmationModal({modalData}) {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto backdrop-blur-sm">
            <div className="w-10/12 max-w-[350px] rounded-lg border border-app-border p-6 bg-secondary-content">
                <p className="shared-dialog-title">
                    {modalData?.text1}
                </p>

                <p className="shared-dialog-desc">
                    {modalData?.text2}
                </p>

                <div className="flex items-center gap-x-4">
                    <button className="shared-btn-confirm" onClick={modalData?.btn1Handler}>{modalData?.btn1Text}</button>
                    <button className="shared-btn-cancel" onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
                </div>

            </div>
        </div>
    )
}
