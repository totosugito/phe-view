import MsgReader from "@kenjiuno/msgreader";
import {decompressRTF} from "@kenjiuno/decompressrtf";
import {deEncapsulateSync} from "rtf-stream-parser";
import * as iconvLite from "iconv-lite";
import {Buffer} from "buffer";

window.Buffer = Buffer; // Ensure Buffer is available globally
export async function msgFileReader(fileBuffer) {
    let msgInfo = null;
    let msgReader = null;
    try {
        msgReader = new MsgReader(fileBuffer);
        msgInfo = msgReader.getFileData();
    } catch (error) {
        console.error("Error creating a MsgReader instance:", error);
    }

    let emailBodyContent = msgInfo.bodyHTML || msgInfo.body;
    let emailBodyContentHTML = '';

    let decompressedRtf = decompressRTF(Uint8Array.from(Object.values(msgInfo.compressedRtf)));
    let deEncapsulate_ = deEncapsulateSync(decompressedRtf, {decode: iconvLite.decode});
    emailBodyContentHTML = deEncapsulate_.text;

    // Extract images and attachments
    if (msgInfo.attachments && msgInfo.attachments.length > 0) {
        msgInfo.attachments.forEach((attachment, index) => {

            const contentUint8Array = msgReader.getAttachment(attachment).content;
            const contentBuffer = Buffer.from(contentUint8Array);
            const contentBase64 = contentBuffer.toString('base64');

            const base64String = `data:${attachment.attachMimeTag};base64,${contentBase64}`;

            if (attachment.attachMimeTag && attachment.attachMimeTag.startsWith('image/')) {
                emailBodyContentHTML = emailBodyContentHTML.replace(`cid:${attachment.pidContentId}`, base64String);
            } else {
                emailBodyContentHTML = emailBodyContentHTML.replace(`href="cid:${attachment.pidContentId}"`, `href="${base64String}"`);
            }

            msgInfo.attachments[index].contentBase64 = base64String;
        });
    }

    return {
        ...msgInfo,
        bodyContent: emailBodyContent,
        bodyContentHTML: emailBodyContentHTML
    };
}

export function msgInfoToHtml(msgInfo) {
    const toRecipients = msgInfo?.recipients.filter(recipient => recipient.recipType === 'to').map(recipient =>
        `${recipient.name} &lt;<a href="mailto:${recipient.smtpAddress}">${recipient.smtpAddress}</a>&gt;`).join(', ');
    const ccRecipients = msgInfo?.recipients.filter(recipient => recipient.recipType === 'cc').map(recipient =>
        `${recipient.name} &lt;<a href="mailto:${recipient.smtpAddress}">${recipient.smtpAddress}</a>&gt;`).join(', ');
    const emailHeader = `<div class="flex flex-col mb-4 gap-y-3">
					<div class="text-neutral-800"><strong>From:</strong> ${msgInfo.senderName} &lt;<a href="mailto:${msgInfo.senderEmail}">${msgInfo.senderEmail}</a>&gt;</div>
					${toRecipients ? `<div class="text-neutral-800"><strong>To:</strong> ${toRecipients}</div>` : ''}
					${ccRecipients ? `<div class="text-neutral-800"><strong>CC:</strong> ${ccRecipients}</div>` : ''}
					<div class="text-neutral-800"><strong>Subject:</strong> ${msgInfo.subject}</div>
					<div class="text-neutral-800"><strong>Date:</strong> ${new Date(msgInfo.messageDeliveryTime).toLocaleString()}</div>
				</div>`;
    const emailBody = `<div class="prose max-w-none">${msgInfo.bodyContentHTML || msgInfo.bodyContent || '<p>(No content)</p>'}</div>`;

    let emailAttachments = '';
    if (msgInfo.attachments && msgInfo.attachments.length > 0) {
        emailAttachments = '<div class="mt-6"><strong>Attachments:</strong><div class="mt-2 space-y-2">';
        msgInfo.attachments.forEach((attachment, index) => {
            if (attachment.attachMimeTag && attachment.attachMimeTag.startsWith('image/')) {
                emailAttachments += `
							<div class="flex items-center space-x-2">
								<a href="${attachment.contentBase64}" download="${attachment.fileName}" style="text-decoration:none;">
									<div class="flex items-center space-x-2 rounded border p-1">
										<div class="border rounded w-12 h-12 flex-shrink-0">
											<img src="${attachment.contentBase64}" alt="Attachment ${index + 1}" class="w-12 h-12 object-cover">
										</div>
										<div class="no-underline">
											<p class="no-underline text-sm text-neutral-900">${attachment.fileName}</p>
											<p class="no-underline text-xs text-neutral-700">${attachment.attachMimeTag} - ${attachment.contentLength} bytes</p>
										</div>
									</div>
								</a>
							</div>
						`;
            } else {
                emailAttachments += `
						<a href="${attachment.contentBase64}" download="${attachment.fileName}" class="text-sm text-gray-600 no-underline">${attachment.fileName}</a>
							<div class="rounded border">
								<p class="text-xs text-gray-500">${attachment.attachMimeTag} - ${attachment.contentLength} bytes</p>
							</div>
						</a>
						`;
            }
        });
        emailAttachments += '</div></div>';
    }

    return (emailHeader + emailBody + emailAttachments);
}