import { RootState } from 'reducers';
import { useSelector } from 'react-redux';
import { useMobileOnly } from 'hooks/useMobileOnly';

import './index.sass';

export default function About() {
    const isMobile = useMobileOnly()
    const [source, target] = useSelector(({settings}:RootState)=>[settings.source, settings.target]);

    return (
        (!isMobile) ? 
        <div className='converter__about-transformation about'>
            <div className="about__inner">
                <div className='about__info about__source'>About source coordinate referance system</div>
                <div className='about__info about__intersection'>intersection</div>
                <div className='about__info about__target'>About target coordinate referance system</div>
            </div>
        </div> : null
    )
}