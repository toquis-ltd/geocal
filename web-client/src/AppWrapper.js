export function UrlParser() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const source = params.get("s_crs");
    const target = params.get("t_crs");

    const point = {x:'', y:'', z:''};
    point.x = params.get("x") || '';
    point.y = params.get("y") || '';
    point.z = params.get("z") || '';

    return [source, target, point]
}