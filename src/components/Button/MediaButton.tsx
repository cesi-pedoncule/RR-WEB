import { Attachment, AttachmentBuilder } from "rr-apilib";
import { AttachmentDataFile } from "rr-apilib/lib/builders/AttachmentBuilder";
import ButtonFileStyles from '../../styles/Components/Button/ButtonFileStyles.module.css';
import CommonStyles from "../../styles/CommonStyles.module.css";
import { BsArrowDown } from "react-icons/bs";
import DeleteButton from "./DeleteButton";
import { saveAs } from 'file-saver';

interface Props {
    attachmentsBuilder?: AttachmentBuilder[],
    setAttachementsBuilder?: React.Dispatch<React.SetStateAction<AttachmentBuilder[]>>,
    attachementsToDelete?: Attachment[],
    setAttachementsToDelete?: React.Dispatch<React.SetStateAction<Attachment[]>>,
    attachementsToShow?: Attachment[],
    setAttachementsToShow?: React.Dispatch<React.SetStateAction<Attachment[]>>,
    attachment: AttachmentDataFile | Attachment;
    idAttachement: number;
    isDeleted:boolean;
}

export default function MediaButton({ attachment, isDeleted, attachmentsBuilder, setAttachementsBuilder, attachementsToDelete, setAttachementsToDelete, attachementsToShow, setAttachementsToShow, idAttachement }: Props) {
    const fileName = attachment instanceof Attachment ? attachment.fileName : attachment.name;

    const handleDownloadFile = async () => {
        if (attachment instanceof Attachment) {
            if(fileName){
                saveAs(
                    attachment.fileUrl,
                    fileName
                );
            }
        } else {
            console.log("cheh download file without in form");
            alert("Impossible de télécharger car le fichier n'est pas encore publié");
        }
    }

    const onDeleteFile = async () => {
        if(attachmentsBuilder && setAttachementsBuilder){
            attachmentsBuilder.splice(idAttachement,1);
            setAttachementsBuilder([...attachmentsBuilder]);
        } else if (attachementsToDelete && setAttachementsToDelete && attachementsToShow && setAttachementsToShow && attachment instanceof Attachment) {
            attachementsToDelete.push(attachment);
            attachementsToShow.splice(idAttachement, 1);
            setAttachementsToShow([...attachementsToShow]);
            setAttachementsToDelete([...attachementsToDelete]);
        }
    };
    
    return (
        <div className={ButtonFileStyles.container} onClick={handleDownloadFile}>
            <BsArrowDown />
            <div className={ButtonFileStyles.text}>
                <p className={CommonStyles.textEmptyResult}>{ fileName }</p>
            </div>
            {
                isDeleted && 
                <div className={ButtonFileStyles.buttonDeleteFile}>
                    <DeleteButton callBack={onDeleteFile}/>
                </div>
            }
        </div>
    )
}
