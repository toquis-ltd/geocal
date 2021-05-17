
export function getPlaceholders(unityName) {
    const deglist = ['degree', 'unknown', 'sexagesimal', ' DMS.s'];
    if (deglist.includes(unityName)) return ['Latitude', 'Longitude', 'Altitude'];
    return ['X', 'Y', 'Z'];
}

export function getInterpalatingAreaAxe(area, area1) {
    const getSmallest = data => {
        let smallest = data[0];
        data.forEach(element => {
            if (Math.abs(element) < Math.abs(smallest)) smallest = element
        });
        return smallest
    };

    const southBoundLats = [area.southBoundLat, area1.southBoundLat];
    const northBoundLats = [area.northBoundLat, area1.northBoundLat];
    const westBoundLons =  [area.westBoundLon, area1.westBoundLon];
    const eastBoundLons =  [area.eastBoundLon, area1.eastBoundLon];

    const southBoundLat = getSmallest(southBoundLats);
    const northBoundLat = getSmallest(northBoundLats);
    const westBoundLon = getSmallest(westBoundLons);
    const eastBoundLon = getSmallest(eastBoundLons);
    

    return {
            southBoundLat:southBoundLat,
            northBoundLat:northBoundLat,
            westBoundLon:westBoundLon,
            eastBoundLon:eastBoundLon,
            }
}

export function getAreaCenter(area){
    const y = (area.southBoundLats + area.northBoundLats)/2;
    const x = (area.westBoundLon + area.eastBoundLon)/2;
    return (x, y)
}