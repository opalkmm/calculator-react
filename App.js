import * as math from "https://cdn.skypack.dev/mathjs@8.0.1";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: false
    };
  }
  //get value from click and add to state's input

  inputDisplay = (val) => {
    //if doesn't begin with 0
    let currentStr = this.state.input;
    const operators = [" + ", " - ", " * ", " / "];
  
    if (val == 0 && currentStr == "") {
      this.setState({ input: "" });
    } 
    else if (this.state.result == true && operators.indexOf(val) !== -1 ) {
      this.setState({ input: this.state.input + val, result: false });
   
    } else if(this.state.result == false){
      this.setState({ input: this.state.input + val });
    }
  };

  //use Mathjs to evaluate strings
  calculate = () => {
    
    let result = math.evaluate(
      this.state.input
        .split("")
        .filter((a) => a !== " ")
        .join("")
    );
    let formattedResult = result.toFixed(2);
    this.setState({ input: formattedResult, result: true });
  };

  render() {
    return (
      <div className="app">
        <div className="wrapper">
          <div className="row">
            <Display display={this.state.input}></Display>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>

          <div className="row">
            <Button handleClick={this.inputDisplay}> 1 </Button>
            <Button handleClick={this.inputDisplay}> 2 </Button>
            <Button handleClick={this.inputDisplay}> 3 </Button>
            <Button handleClick={this.inputDisplay}> - </Button>
          </div>

          <div className="row">
            <Button handleClick={this.inputDisplay}> 4 </Button>
            <Button handleClick={this.inputDisplay}> 5 </Button>
            <Button handleClick={this.inputDisplay}> 6 </Button>
            <Button handleClick={this.inputDisplay}> + </Button>
          </div>

          <div className="row">
            <Button handleClick={this.inputDisplay}> 7 </Button>
            <Button handleClick={this.inputDisplay}> 8 </Button>
            <Button handleClick={this.inputDisplay}> 9 </Button>
            <Button handleClick={this.inputDisplay}> * </Button>
          </div>

          <div className="row">
            <Button handleClick={this.inputDisplay}> 0 </Button>
            <Button handleClick={this.inputDisplay}> . </Button>
            <Button handleClick={() => this.calculate()}> = </Button>
            <Button handleClick={this.inputDisplay}> / </Button>
          </div>
        </div>
      </div>
    );
  }
}

//display
const Display = (props) => <div className="display">{props.display}</div>;

//function to return NaN if it's an operator - different class style
const isOperator = (val) => {
  return !isNaN(val) || val === "." || val === "=";
};

//get text to render as buttons
const Button = (props) => (
  <div
    className={`button-wrapper ${
      isOperator(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);
//logic for clear button
const ClearButton = (props) => (
  <div className="clear-button" onClick={props.handleClear}>
    {props.children}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
