import Popup  from './Popups';
import {Classic} from './Interfaces';

export function ErrorMessage({isOpen, onClose, title, children}) {
  return (
    <Popup className='error-message' isOpen={isOpen} interface={()=>Classic(onClose, onClose, 'Ok')} >
      <div className='error'>
        <div className='error__header'>
          <h2>{title}!!!</h2>
        </div>
        <div className='error__container'>
            {children}
        </div>
      </div>
    </Popup>
  );
}

export function TransformationError({isOpen, onClose}) {
  return (
    <ErrorMessage isOpen={isOpen} onClose={onClose} title='Error'>
            <p>
                text du message d'erreur <br/>
                text of error message
            </p>
    </ErrorMessage>
  );
}

export function IncompatibilityCRSError({isOpen, onClose}) {
  return (
    <ErrorMessage isOpen={isOpen} onClose={onClose} title='Incompatibility error'>
            <p>
                Your are trying to converte coordinate referance system point to other coordinate system but they don't interpolate between. <br/>
                Plaese verify and retry again
            </p>
    </ErrorMessage>
  );
}

export function NotSelectError({isOpen, onClose}) {
  return (
    <ErrorMessage isOpen={isOpen} onClose={onClose} title="Please select source and target CRS">
            <p>
                Blabla Blabla
            </p>
    </ErrorMessage>
  );
}

export function PointCoordinateError({isOpen, onClose}) {
  return (
    <ErrorMessage isOpen={isOpen} onClose={onClose} title='Point not determinate'>
            <p>
              Please enter point coordinates
            </p>
    </ErrorMessage>
  );
}