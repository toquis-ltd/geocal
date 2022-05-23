import useSearchBar from 'hooks/useSearchBar';
import useCurrentSize from 'hooks/useCurrentSize';

import Globe from 'components/common/globe/globe';

import './view.sass';

export default function GlobeView() {
    
    const [, qweryChange, handleResult] = useSearchBar();
    const handleSelect = (value) => {
        qweryChange(value);
        handleResult(value);
    }

    const [ref, container] = useCurrentSize();
    
    return (
        <div className="view__globe" ref={ref}>
            {container.isRenderFinnished && <Globe width={container.width*0.8} height={container.height} onSelect={handleSelect}/>}
        </div>
    )
}