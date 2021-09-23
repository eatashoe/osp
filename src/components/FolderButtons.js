import React from "react";

const FolderButtons = (props) =>{
    const close = React.useRef(null);
    const minimize = React.useRef(null);
    const expand = React.useRef(null);
    const compress = React.useRef(null);
    const [visible, setVisible] = React.useState(false);
    
    function stopTransition(){
        props.node.current.style.transition = '';
        props.node.current.removeEventListener('transitionend', stopTransition)
    }
    function closeFolder(){
        props.node.current.style.opacity = '0';
        props.node.current.style.pointerEvents = 'none';
        props.setFocus(true);
        props.setClose(false);
    }
    function minimizeFolder(){
        props.node.current.style.opacity = '0';
        props.node.current.style.pointerEvents = 'none';
        props.setMinimize(true)
        props.node.current.animate([
            {transform: 'translate('+(-props.tab.current.getBoundingClientRect().left - props.mx)+'px,'+(props.tab.current.getBoundingClientRect().top - props.my)+'px)',
             width: props.tab.current.getBoundingClientRect().width+'px',
             height: props.tab.current.getBoundingClientRect().height+'px'
             },
        ], {
            duration: 500
        });
    }
    function expandFolder(){
        if(props.isExpanded){
            props.node.current.style.transition = 'width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s'
            props.setEX(props.node.current.style.left);
            props.setEY(props.node.current.style.top);
            props.setT(props.node.current.style.transform.split('(')[1]);
            props.setWidth(props.node.current.style.width);
            props.setHeight(props.node.current.style.height);

            props.node.current.style.left = 0 + 'px';
            props.node.current.style.transform = 'translateX(0px)';
            props.node.current.style.top = 1.5 + 'em';
            props.node.current.style.transform = 'translateY(0px)';
            props.node.current.style.width = '100%';
            props.node.current.style.height = '96.5vh';
            
            expand.current.style.display = 'none';
            props.setExpand(false);
        }
        else{
            props.node.current.style.left = props.ex;
            props.node.current.style.top = props.ey;
            props.node.current.style.width = props.width;
            props.node.current.style.height = props.height;
            expand.current.style.display = '';
            props.node.current.style.transform = 'translate(' + props.t;
            props.setExpand(true);
            props.node.current.addEventListener('transitionend', stopTransition)
        }
    }
    
    return (
        <div className='btns' onMouseOver={() => setVisible(true)} onMouseOut={() => setVisible(false)}>
            <div className='btn red'>
                <i ref={close} style={{visibility: `${visible ? 'visible' : 'hidden'}`}} className="fas fa-times fa-xs close" onClick={closeFolder}></i>
            </div>
            <div className='btn yellow'>
                <i ref={minimize} style={{visibility: `${visible ? 'visible' : 'hidden'}`}} className="fas fa-minus fa-xs minimize" onClick={minimizeFolder}></i>
            </div>
            <div className='btn green'>
                <i ref={expand} style={{visibility: `${visible ? 'visible' : 'hidden'}`}} className="fas fa-expand-alt fa-xs expand" onClick={expandFolder}></i>
                <i ref={compress} style={{visibility: `${visible ? 'visible' : 'hidden'}`}} className="fas fa-compress-alt fa-xs compress" onClick={expandFolder}></i>
            </div>
        </div>
    );
}

export default FolderButtons;