import { Resource } from "rr-apilib";
import { BsCheckCircle, BsClock, BsXCircle } from "react-icons/bs"

interface Props {
	resource: Resource;
}

export default function DeleteButton({ resource }: Props) {
    return (
        <div>
            {
                resource.validations.getLastValidationState()?.state.toString() == "validated" &&
                    <BsCheckCircle />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() == "pending" &&
                    <BsClock />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() == "rejected" &&
                    <BsXCircle />
            }
        </div>
    )
}