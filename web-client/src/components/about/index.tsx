import CrsDecription from './crs'
import CrsIntersection from './intersection'

import './index.sass';

export default function About() {

    return (
        <div className='converter__about-transformation about'>
            <div className="about__inner">
                <CrsDecription name='source' key={1}/>
                <CrsIntersection />
                <CrsDecription name='target' key={5}/>
            </div>
        </div>
    )
}