import React from "react";
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import FolderButtons from './FolderButtons';
import {useDarkMode} from "./GlobalStates";

const About = (props) => {

    var darkMode = useDarkMode();
    const aboutRef = React.useRef(null);
    const titleRef = React.useRef(null);

    function focus(){
        aboutRef.current.style.zIndex= '4';
        titleRef.current.style.color="black";
    }

    function blur(){
        aboutRef.current.style.zIndex= '3';
        titleRef.current.style.color="";
    }

    function handleStart(e, ui){ 
        e.stopPropagation();
     }

    if(props.about){
        return(
            ReactDOM.createPortal(
                <Draggable
                    handle=".handle" 
                    nodeRef={aboutRef}
                    onStart={handleStart}
                    defaultPosition={{x: (window.innerWidth/2 - 90)+(Math.floor(Math.random() * 201) - 100), y: (window.innerHeight/2 - 180) + (Math.floor(Math.random() * 201) - 100)}}>
                    <div ref={aboutRef} tabIndex='0' className={darkMode.get() ? "about darkmode" : "about"} onFocus={focus} onBlur={blur}>
                        <div ref={aboutRef} className={"handle"}>
                            <div className={"titleBox"}>
                                <FolderButtons about={true} showAbout={props.showAbout} />
                                <div ref={titleRef} className={"title"}>
                                    {props.isInfo ? "Info" : "About"}
                                </div>
                            </div>
                            <div className='lines'>
                                            <div className='line'></div>
                                            <div className='line'></div>
                                            <div className='line'></div>
                                            <div className='line'></div>
                                            <div className='line'></div>
                                            <div className='line'></div>
                                            <div className='line'></div>
                            </div>
                        </div>
                        <div className={darkMode.get() ? "aboutInfo darkmode" : "aboutInfo"}>
                            {
                            props.info 
                            ? 
                            props.info 
                            : 
                            <span style={{textAlign: "center"}}>
                                <br></br><br></br><br></br>
                                &emsp;&emsp;&emsp;
                                <span>*dust*</span>
                            </span>
                            }
                        </div>
                    </div>
                </Draggable>, props.desktopRef.current)
        );
    }
    else{
        return null;
    }
}

export default About;