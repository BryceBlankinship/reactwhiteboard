import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './cards.css';
import { createPosition, getPosition, updatePosition, deletePosition } from '../http-methods';

export default class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            positions: [],
            hasLoaded: false
        }
    }

    /**
     * Going to manage IDs for the position set via props.id
     */

    defaultPosition = async () => {
        let positions = await getPosition(1, this.props.id);
        this.setState({positions: [positions.x, positions.y]}, () => {
            this.setState({hasLoaded: true});
        })
    }

    handleStop = (event, dragElement) => {
        this.setState({positions: [dragElement.x, dragElement.y]}, () => {
            console.log(this.state.positions[0], this.state.positions[1]);
            // create http post request for positionDB
            updatePosition(1, this.props.id, this.state.positions[0], this.state.positions[1]);
        });
    }

    handleTrash = () => {
        this.setState({positions: []});
        deletePosition(1, this.props.id);
        this.setState({hasLoaded: false});
        console.log("Deleted Card with ID: " + this.props.id)
    }

    toggleMenu = () => {
        this.setState({showMenu: !this.state.showMenu});
    }


    // need to store this in database as well
    getTitle = () => {

    }

    getDesc = () => {

    }

    getOptions = () => {

    }

    async componentDidMount(){
        console.log("Mounted Card with ID: " + this.props.id)
        this.defaultPosition();

        /** 

        Couldnt figure out how to push to the state array when we want a new card created :(
        So going to just createPosition in database over in Whiteboard.jsx instead and then force re-sync of database
        Not really the declarative way of doing things but will actually result in better performance since there will be no unnecessary HTTP request (which is what the code below produces sometimes)

        // Checking if position exists and then creating a position will always result in at least 1 query, with 2 queries possible
        // So just doing a POST request to the positions API and then bouncing on a 400 error is actually a better approach for saving connections when this gets deployed
        try{
            // default position for new cards with be 50x, 50y
            await createPosition(1, this.props.id, 50, 50);
        }catch(err){
            console.log(err);
            return;
        }

        */
    }

    render(){
        return this.state.hasLoaded ? (
            /**
             * this problem is annoying af
             * so basically whats happening is the state doesnt update synchronously
             * however i cant pass an async function to defaultPosition because async functions return a promise and not the actual data after the return keyword
             * so i tried waiting for the state to update but no matter what the data in defaultPosition is going to be null
             * theres a video i saw a while back where a guy used useEffect to somehow do this, im going to rewatch that to figure it out.
             * 
             * Current workaround (which is actually working pretty well) is to use hasLoaded state boolean and not render anything until true
             */
            <Draggable handle='.move' defaultPosition={{x: this.state.positions[0], y: this.state.positions[1]}} onStop={this.handleStop}>
                <div className="center-container">
                    <div className="card-container">
                        <div className="card-icon-container">
                            <button className='icon trash' onClick={this.handleTrash}></button>
                            <button className='icon move'></button>
                            <button className='icon verticaldots' onClick={this.toggleMenu}></button>
                            <CardMenu showMenu={this.state.showMenu}/>
                        </div>
                        <textarea className='card-title' defaultValue={this.props.title}></textarea>
                        <span className='card-desc' contentEditable={true}>{this.props.desc}</span>
                    </div>
                </div>
            </Draggable>
        ) : null;
    }

}

export function CardMenu(props){
    return props.showMenu ? (
        <div className="card-menu">
            <form>
                <input type="checkbox"/> Show Description<br/>
                <input type="checkbox"/> Show State<br/>
                <input type="checkbox"/> Is Context Provider<br/>
                <input type="submit" value="Apply" onClick={(e) => {
                    e.preventDefault();
                }}/>
            </form>
        </div>
    ) : null;
}