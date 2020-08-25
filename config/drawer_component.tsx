import * as React from "react";

import {
    Classes,
    Drawer,
    Position
} from "@blueprintjs/core";

export interface IProps {
    autoFocus: boolean;
    canEscapeKeyClose: boolean;
    canOutsideClickClose: boolean;
    enforceFocus: boolean;
    hasBackdrop: boolean;
    isOpen: boolean;
    position?: Position;
    size: string;
    usePortal: boolean;
    className: string,
    icon: string;
    innerContent: string;
}
export class DrawerComponent extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: true,
            canEscapeKeyClose: this.props.canEscapeKeyClose,
            canOutsideClickClose: this.props.canOutsideClickClose,
            enforceFocus: true,
            hasBackdrop: true,
            isOpen: this.props.isOpen,
            position: this.props.position,
            size: this.props.size,
            usePortal: true,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen != this.props.isOpen) {
            this.setState({
                isOpen:this.props.isOpen
            });
        }
    }

    handle_drawer_close = () => {
        this.setState({ isOpen: false });
        this.props.handleDrawerClose && this.props.handleDrawerClose();
    }

    render() {
        return (
            <Drawer
                key={this.props.key_id}
                isOpen={this.props.isOpen}
                className={this.props.className} 
                icon={this.props.icon}
                onClose={this.handle_drawer_close}
                title={this.props.title}
                canOutsideClickClose={this.props.canOutsideClickClose}
                {...this.state}
            >
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                        {this.props.innerContent}
                    </div>
                </div>
                </Drawer>       
        )
    }
}

export default DrawerComponent;