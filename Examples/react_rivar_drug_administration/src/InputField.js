import { RIVarComponent } from 'rivarjs/binders/react';

export class InputField extends RIVarComponent {
  
   handleChange = (event) => {
    this.change(event.target.value);
  }
 
  render() {
    return (
        <input
          type="number"
          value={this.state.value}
          onChange={this.handleChange}  />
    );
  }
}
