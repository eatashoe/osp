import React from "react";
import Desktop from "./Desktop";
import {useDarkMode} from "./GlobalStates";

const Startup = () => {
    const powerBtn = React.useRef(null);
    const screenOn = React.useRef(null);
    const screen = React.useRef(null);
    const filter = React.useRef(null);
    const desktop = React.useRef(null);
    const [on, setOn] = React.useState(false);

    const darkMode = useDarkMode();

    React.useEffect(() => {
        if(localStorage.getItem("darkmode") !== null){
            darkMode.set(localStorage.getItem("darkmode"));
        }
    }, [])

    function turnOn(){
        if(!on){
            desktop.current.style.transition= "opacity 1s";
            powerBtn.current.style.color = "#00ff00";
            powerBtn.current.style.textShadow= "0px 0em 4px #38ff38";
            screenOn.current.style.animation= "turn-on 3s linear";
            screenOn.current.style.opacity= "1";
            setOn(true);
        }
        else{
            desktop.current.style.transition= "opacity 0.1s";
            desktop.current.style.opacity= '0';
            desktop.current.style.pointerEvents= 'none';
            powerBtn.current.style.color = "";
            powerBtn.current.style.textShadow= "";
            screenOn.current.style.animation= "turn-off 0.55s cubic-bezier(0.755, 0.050, 0.855, 0.060)";
            screenOn.current.style.opacity= "0";
            setOn(false);
        }
    }

    function setFullscreen(){
        if(on){
            screen.current.style.top= screen.current.getBoundingClientRect().top*-1 + 'px';
            screen.current.style.left= screen.current.getBoundingClientRect().left*-1 + 'px';
            screen.current.style.width= "105vw";
            screen.current.style.height= "105vh";
            filter.current.style.width= "105vw";
            filter.current.style.height= "105vh";
            filter.current.style.top= "0em";
            filter.current.style.left= "0em";
            filter.current.style.visibility= 'hidden';
            desktop.current.style.opacity= '1';
            desktop.current.style.pointerEvents= 'auto';
        }
        else{
            screen.current.style.top= '';
            screen.current.style.left= '';
            screen.current.style.width= "95%";
            screen.current.style.height= "90%";
            filter.current.style.visibility= '';
            filter.current.style.width= "95%";
            filter.current.style.height= "85%";
            filter.current.style.top= "2em";
            filter.current.style.left= "1em";
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', () => {if(on){turnOn();}});
        return () => {
        window.removeEventListener('resize', () => {if(on){turnOn();}});
        }
    }, [on]);

    return(
        <div className='startup'>
            <div className='computer'>
                <div className="monitor">
                    <div className="screen-hole">
                        <div className="screen" ref={screen}>
                            <div className="screen-on" ref={screenOn} onAnimationEnd={setFullscreen}></div>
                            <Desktop desktop={desktop} turnOn={turnOn}></Desktop>
                            <div ref={filter} className="filter"></div>
                        </div>
                    </div>
                    <div className="logo">
                        <i className="fas fa-lemon fa-3x"></i>
                    </div>
                    <div className="cd">
                        <div className="cd-long"></div>
                        <div className="cd-dot"></div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="power-btn" onClick={turnOn} ref={powerBtn}>
                        <i className="fas fa-power-off fa-2x"></i>
                    </div>
                </div>
            </div>
            <div className="floor"></div>
        </div>
    );
}

export default Startup;