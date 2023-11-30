import RIVarView from "rivarjs/integration/react/RIVarView";

export default function PumpComponent({ pump }) {
    return (
        <>
            <tr>
                <td>Dose</td>
                <td>Duration</td>
                <td>Rate</td>
            </tr>
            <tr>
                <td>
                    <RIVarView rivar={pump.dose}>
                        {({ value, change }) => {
                            return <input
                                type="number"
                                value={value}
                                onChange={(event) => change(event.target.value)}
                            />;
                        }}
                    </RIVarView>
                </td>
                <td>
                    <RIVarView rivar={pump.duration}>
                        {({ value, change }) => {
                            return <input
                                type="number"
                                value={value}
                                onChange={(event) => change(event.target.value)}
                            />;
                        }}
                    </RIVarView>
                </td>
                <td>
                    <RIVarView rivar={pump.rate}>
                        {({ value, change }) => {
                            return <input
                                type="number"
                                value={value}
                                onChange={(event) => change(event.target.value)}
                            />;
                        }}
                    </RIVarView>
                </td>
            </tr>
        </>
    )

}