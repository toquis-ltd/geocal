import useCurrentSize from '../../../../../../../hooks/useCurrentSize';

import Globe from '../../../../../../common/globe/globe';

import './view.sass';

export default function GlobeView() {
    
    const [ref, container] = useCurrentSize();
    
    return (
        <div className="view__globe" ref={ref}>
            {container.isRenderFinnished && <Globe width={container.width*0.8} height={container.height} />}
        </div>
    )
}