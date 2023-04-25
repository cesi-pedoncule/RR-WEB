import { saveAs } from 'file-saver';
import { BsArrowDown } from "react-icons/bs";
import { Attachment, AttachmentBuilder, AttachmentDataFile } from "rr-apilib";

import ButtonFileStyles from '../../styles/Components/Button/ButtonFileStyles.module.css';
import CommonStyles from "../../styles/CommonStyles.module.css";
import DeleteButton from "../Button/DeleteButton";

interface Props {
    attachment: AttachmentBuilder | Attachment;
    displayDeleteButton: boolean;
    deleteCallback: () => void;
}

export default function AttachmentCard({ attachment, displayDeleteButton, deleteCallback }: Props) {

    const fileName = attachment instanceof Attachment ? attachment.fileName : attachment.file?.name;

    const handleDownloadFile = async () => {
        if (attachment instanceof Attachment) {
            saveAs(
                attachment.fileUrl,
                attachment.fileName
            );
        } else {
            if(attachment.file && attachment.file instanceof Blob) {
                saveAs(
                    attachment.file,
                    attachment.file.name
                );
            }
        }
    }
    
    return (
        <div className={ButtonFileStyles.container}>
            <BsArrowDown />
            <div className={ButtonFileStyles.text} onClick={handleDownloadFile}>
                <p className={CommonStyles.textEmptyResult}>{ fileName }</p>
            </div>
            {
                displayDeleteButton && 
                <div className={ButtonFileStyles.buttonDeleteFile}>
                    <DeleteButton callBack={deleteCallback}/>
                </div>
            }
        </div>
    )
}
