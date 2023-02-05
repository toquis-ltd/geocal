import './result.sass';

export default function Result ({children, className}) {
    if (children === undefined) return null;
    if (!Array.isArray(children)) return children;
    return(
        <div className={`result result--${className}`}>
            <div className={`result__inner result__inner--${className}`}>
                {children.map(child => child)} 
            </div>
        </div>
    )
}