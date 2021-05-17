import {NotSelectError, PointCoordinateError} from '../popups/ErrorMessages'

export function ShowErrorMessage({error, onClose}) {
    switch (error.code) {
        case 0:
            return <NotSelectError isOpen={error.isShow} onClose={onClose}/>
        case 1:
            return <PointCoordinateError isOpen={error.isShow} onClose={onClose}/>
        case 2:
            break;

        default:
            return null;
    }
}