import { APIValidationState, Resource } from "rr-apilib";
import { BsCheckCircle, BsClock, BsXCircle } from "react-icons/bs"

interface Props {
	resource: Resource;
}

export default function DeleteButton({ resource }: Props) {
    return (
        <div>
            {
                resource.validations.getLastValidationState()?.state.toString() === APIValidationState.Validated &&
                    <BsCheckCircle color='#03989E' />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() === APIValidationState.Pending &&
                    <BsClock color='#cc973b' />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() === APIValidationState.Rejected &&
                    <BsXCircle color='#cc3b3b' />
            }
        </div>
    )
}