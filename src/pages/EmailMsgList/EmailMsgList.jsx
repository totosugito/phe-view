import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {msgFileReader, msgInfoToHtml} from "src/utils/file-reader.js";
import {toast} from "react-hot-toast";
import {http_msg_list} from "src/services/api/msg-files.js";
import axios from "axios";
import {APP_BASE_URL} from "src/services/api.js";
import TableMsg from "src/pages/EmailMsgList/view/TableMsg.jsx";
import {NavBar} from "src/components/app/index.js";
import {BodyContents, CardLayout, WebLoading} from "shared/components/base/index.js";
import {AppRoutes} from "src/routers/router.js";

const EmailMsgList = ({}) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState(null);
    const [msgList, setMsgList] = useState(null);

    const http_email_list = async () => {
        const response = await http_msg_list();
        if (response) {
            setMsgList(response);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                http_email_list(),
            ]);
            setLoading(false);
        }
        fetchData().then(r => {
        });
    }, []);


    const downloadAndOpenFile = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(APP_BASE_URL + url, {responseType: 'blob'}); // Fetch the file as a Blob
            const reader = new FileReader();

            reader.onload = async function (e) {
                const arrayBuffer = e.target.result;
                const msgHtml = msgInfoToHtml(await msgFileReader(arrayBuffer));
                setHtmlContent(msgHtml);
            }
            reader.readAsArrayBuffer(response.data);
        } catch (error) {
            console.error("Error loading msg file:", error);
            toast.error("Error loading msg file: " + error);
        }
        setLoading(false);
    }

    return (
        <div className={"h-screen flex flex-col"}>
            <NavBar title={<div className={"text-lg"}><span className={"mr-2"}>{AppRoutes.emailMsgList.name}</span>
            </div>}/>
            {loading ? <WebLoading/> :
                <BodyContents>
                    <div className={"flex flex-row flex-grow h-full w-full gap-2"}>
                        {msgList && <TableMsg title={"Email Message List"} values={msgList} onClickItem={(url) => downloadAndOpenFile(url)}/>}

                        {htmlContent &&
                            <CardLayout title={"Email Message"} height={"calc(100vh - 100px)"} className={"overflow-auto"}>
                                <div
                                    dangerouslySetInnerHTML={{__html: htmlContent}}
                                    style={{marginTop: "20px", border: "1px solid #ccc", padding: "10px"}}
                                ></div>
                            </CardLayout>
                        }
                    </div>
                </BodyContents>
            }
        </div>
    )
}
export default EmailMsgList
