import * as React from 'react';
var chat_init = require('./config/chat_init');
import { Position, Drawer } from '@blueprintjs/core';
import DrawerComponent from './config/drawer_component';
/*
  1) Login Page of the application
  2) Show popup if the password is going to expire
  */
export class LoginComponent extends React.Component<any, any> {
    [x: string]: any;

    componentDidMount() {
        chat_init(true)
    }

    render() {
        return ( <div>Hello, sir

            <DrawerComponent
                key={this.props.key_id}
                canOutsideClickClose={false}
                canEscapeKeyClose={false}
                isOpen={false}
                className="ext-bp-drawer"
                handleDrawerClose={{}}
                position={Position.RIGHT}
                title=""
                isCloseButtonShown={true}
                innerContent={null}
                size={Drawer.SIZE_STANDARD}
            />
        </div>
        );
    }
}


/* - Connect component to redux
  - Used to map the redux store state and dispatch it to the props of a component
  - 2 input parameters:-
      1) mapStateToProps- The component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called [output]
      2) mapDispatchToProps- Map dispatched data from the action creater to props of a component [action creater]
*/
export default LoginComponent


