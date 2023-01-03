import type { EventfulYear } from "../types";

function Annal ({year, events}: EventfulYear) {
    let annal_records: string= events.join(' ');

    return (
        <div>
            <strong> { year } </strong>: { annal_records }
        </div>
    )

}

export default Annal;