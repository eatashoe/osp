import React from 'react';
import ReactDOM from 'react-dom';

const Tabs = (props) => {

    const tab = props.tab;

    const focus = () => {
        tab.current.style.background='black';
        tab.current.style.color='white';
        props.titleRef.current.style.color='black';
        props.folder.current.style.zIndex= '4';
    }
    const blur = () => {
        tab.current.style.background='';
        tab.current.style.color='';
        props.titleRef.current.style.color='';
        props.folder.current.style.zIndex= '3';
    }

    function unMinimize(){
        if(props.isMinimized){
            props.folder.current.animate([
                {transform: 'translate('+(-props.tab.current.getBoundingClientRect().left - props.mx)+'px,'+(props.tab.current.getBoundingClientRect().top - props.my)+'px)',
                width: props.tab.current.getBoundingClientRect().width+'px',
                 height: props.tab.current.getBoundingClientRect().height+'px'
                 },
                {transform: 'translate('+(props.folder.current.getBoundingClientRect().left - props.mx)+'px,'+(props.folder.current.getBoundingClientRect().top - props.my)+'px)'
                }
            ], {
                duration: 500
            });
            props.folder.current.style.opacity = '1';
            props.folder.current.style.pointerEvents = 'auto';
            props.setMinimize(false);
        }
    }
    if(props.center && props.isClose){
        var dom = ReactDOM.createPortal(   
            <React.Fragment>
                <div tabIndex="0" ref={tab} className='tab' onFocus={focus} onBlur={blur} onClick={unMinimize}>
                {props.title}
                </div>
            </React.Fragment>, props.center.current)
        return(dom);
    }
    else{
        return(null);
    }
}
export default Tabs;