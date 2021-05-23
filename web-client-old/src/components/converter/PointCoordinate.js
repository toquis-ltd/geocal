import PointField from "../fields/PointField";

export function PointCoordinate({ source, target }) {
  const handleSourceChange = (evt) => {
    source.handler(prevState => ({
      ...prevState,
      [evt.target.name.charAt(7)]: evt.target.value,
    }));
  };
  return (
    <div className="coordinate__fields">
      <PointField
        className="source__coordinate"
        title="Source coordinates"
        id="source"
        placeholder={source.unityOfMeasure}
        point={source.point}
        onChange={(event) => handleSourceChange(event)} />

      <PointField
        className="target__coordinate"
        title="Target coordinates"
        id="target"
        placeholder={target.unityOfMeasure}
        point={target.point}
        onChange={() => false} />
    </div>
  );
}
