'use strict';

class NumericButton extends React.Component {
    render() {
        return (
            <button>
                {this.props.caption}
            </button>
        );

        // return React.createElement(
        //     'button',
        //     {},
        //     this.props.caption
        // );
    }
}

/*
class Keyboard extends React.Component {
    render() {
        return Array.from(
            { length: 10 },
            ( _, i ) => {
                return React.createElement(
                    NumericButton,
                    {
                        key: i,
                        caption: i
                    }
                );
            }
        );
    }
}
*/

class Keyboard extends React.Component {
    render() {
        return Array.from(
            { length: 10 },
            ( _, i ) => {
                return (
                    <NumericButton key={i} caption={i} />
                );
            }
        );
    }
}

const domContainer = document.querySelector( '.main' );

ReactDOM.render( React.createElement( Keyboard ), domContainer );