import { useMobileOnly } from 'hooks/useMobileOnly';

import CrsDecription from './crs'
import CrsIntersection from './intersection'

import './index.sass';

export default function About() {
    const isMobile = useMobileOnly()

    return (
        (!isMobile) ? 
        <div className='converter__about-transformation about'>
            <div className="about__inner">
                <CrsDecription name='source'/>
                <CrsIntersection />
                <CrsDecription name='target'/>
            </div>
        </div> : null
    )
}