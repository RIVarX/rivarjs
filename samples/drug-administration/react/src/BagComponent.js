import RIVarView from "rivarjs/integration/react/RIVarView";

export default function BagComponent({ bag }) {
  return (
    <>
      <tr>
        <td>Drug</td>
        <td>Concentration</td>
        <td>Volume</td>
      </tr>
      <tr>
        <td>
          <RIVarView rivar={bag.amount}>
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
          <RIVarView rivar={bag.concentration}>
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
          <RIVarView rivar={bag.volume}>
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