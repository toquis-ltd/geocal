function About({code}) {
    return (
        
        <a href={code && `${process.env.REACT_APP_HOST}/about/crs/${code}`}>
            More information        
        </a>
    )
}

export default About;