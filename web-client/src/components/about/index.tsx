import { RootState } from 'reducers';
import { useSelector } from 'react-redux';
import { useMobileOnly } from 'hooks/useMobileOnly';

import CrsDecription from './crs'

import './index.sass';

export default function About() {
    const isMobile = useMobileOnly()
    const [source, target] = useSelector(({settings}:RootState)=>[settings.source, settings.target]);

    return (
        (!isMobile) ? 
        <div className='converter__about-transformation about'>
            <div className="about__inner">
                <CrsDecription name='source'/>
                <div className='about__info about__intersection'>intersection</div>
                <CrsDecription name='target'/>
            </div>
        </div> : null
    )
}