import './App.css';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import {Menu, MenuItem, SubMenu, ControlledMenu} from '@szhsin/react-menu';
import Draggable from 'react-draggable';

class Clock extends React.Component{
    constructor(props){
        super(props);
        var date = this.getTimeString();
        this.state = {
            time: date
        };
    }
    getTimeString() {
        const date = new Date(Date.now()).toLocaleTimeString();
        return date;
    }
    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var date = _this.getTimeString();
            _this.setState({
                time:date
            });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render(){
        return(
            this.state.time
        );
    }
}

function DMenu(props) {
    return (
        <Menu menuButton={props.name} align='end' offsetX={props.x} keepMounted={false} styles={{open: true}}>
            {props.list.map(c => <MenuItem className='menu-item' key={c.id}>{c.value}</MenuItem>)}
        </Menu>
    )
}
function SDMenu(props){
    return (
        <SubMenu label={props.name} offsetY={props.y} offsetX={props.x} keepMounted={false}>
            {props.list.map(c => <MenuItem className='menu-item' key={c.id}>{c.value}</MenuItem>)}
        </SubMenu>
    )
}
function RCMenu() {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    
    return (
        <div className="rightclickscreen" onContextMenu={e => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX + 0.7, y: e.clientY + 0 });
            setOpen(true);
        }}>
            
            <ControlledMenu hidden={isOpen ? false : true} anchorPoint={anchorPoint} isOpen={isOpen} onClose={() => setOpen(false)}>
                <MenuItem className='rightclick-item'>Cut</MenuItem>
                <MenuItem className='rightclick-item'>Copy</MenuItem>
                <MenuItem className='rightclick-item'>Paste</MenuItem>
            </ControlledMenu>
        </div>
    );
} 

function FolderButtons(props){
    const close = React.useRef(null);
    const minimize = React.useRef(null);
    const expand = React.useRef(null);
    const compress = React.useRef(null);
    const [visible, setVisible] = useState(false);
    
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
            {transform: 'translate('+(props.tab.current.getBoundingClientRect().left - props.mx)+'px,'+(-props.tab.current.getBoundingClientRect().top - props.my)+'px)',
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
//            setExpand(false);
            props.setExpand(false);
        }
        else{
            props.node.current.style.left = props.ex;
            props.node.current.style.top = props.ey;
            props.node.current.style.width = props.width;
            props.node.current.style.height = props.height;
            expand.current.style.display = '';
            props.node.current.style.transform = 'translate(' + props.t;
//            setExpand(true);
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

function DeskItem(props){
    const deskitem = React.useRef(null);
    const icon = React.useRef(null);
    const name = React.useRef(null);
    let folder = React.useRef(null);
    const [clicked,setClick] = useState(true);
    const [isClose, setClose] = useState(false);
    
    function openFolder(){
        if(!isClose){
            folder.current.style.opacity = '1';
            folder.current.style.pointerEvents = 'auto';
            setClose(true);
        }
    }
    
    function clickFilter(){
        if(clicked){
            icon.current.style.filter= 'sepia(100%) hue-rotate(190deg) saturate(500%)';
            name.current.style.filter= 'sepia(100%) hue-rotate(190deg) saturate(500%)';
            name.current.style.border= 'dotted 1px black';
            name.current.style.background= '#0080cb';
            deskitem.current.style.zIndex= '2';
            setClick(false);
        }
        else{
            icon.current.style.filter= '';
            name.current.style.filter= '';
            name.current.style.border= '';
            name.current.style.background= '';
            deskitem.current.style.zIndex= '';
            setClick(true);
            
        }
    }
    return(
        <React.Fragment>
            <Draggable defaultPosition={{x: props.x, y: props.y}}>
                <div tabIndex="0" ref={deskitem} onFocus={clickFilter} onBlur={clickFilter} onDoubleClick={openFolder} className='desk-item'>
                   <div ref={icon} className="item-icon">
                        <i className="fas fa-folder"></i>
                   </div>
                    <div ref={name} className="item-name">
                        <span>{props.title}</span>
                    </div>
                </div>
            </Draggable>
            <Folder center={props.center} nodeRef={folder} isClose={isClose} setClose={setClose} title={props.title}/>
        </React.Fragment>
    );
}

function Folder(props) {
    //resizer refs
    const nodeRef = props.nodeRef;
    const TLR = React.useRef(null);
    const TRR = React.useRef(null);
    const BLR = React.useRef(null);
    const BRR = React.useRef(null);
    const LR = React.useRef(null);
    const RR = React.useRef(null);
    const BR = React.useRef(null);
    const TR = React.useRef(null);
    
    //tab stuff
    let tab = React.useRef(null);
    const titleRef = React.useRef(null);
    const [focus, setFocus] = useState(true);
    const [mx, setMx] = useState(0);
    const [my, setMy] = useState(0);
    
    
    //deltas when dragging
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    
    //preserve states when expanded
    const [ex, setEX] = useState(0);
    const [ey, setEY] = useState(0);
    const [t, setT] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isExpanded, setExpand] = useState(true);
    const [isMinimized, setMinimize] = useState(false);
    
    
    function focusHandler(){
        if(props.isClose){
            if(focus){
                tab.current.style.background="black";
                tab.current.style.color="white";
                titleRef.current.style.color="black";
                setFocus(false);
            }
            else{
                tab.current.style.background="";
                tab.current.style.color="";
                titleRef.current.style.color="";
                setFocus(true);
            }
        }
    }
    
    function down(element){
        setX(element.getBoundingClientRect().left);
        setY(element.getBoundingClientRect().top);
        
    }
    
    function up(element){
        setDx(dx + (element.getBoundingClientRect().left - x));
        setDy(dy +(element.getBoundingClientRect().top - y));
    }
    
    function handleMouseDown(currentResizer, element, e, x, y) {

        e.preventDefault();
        const minimum_size = 20;
        let original_width = element.clientWidth;
        let original_height = element.clientHeight;
        let original_x = element.getBoundingClientRect().left;
        let original_y = element.getBoundingClientRect().top;
        let original_mouse_x = e.pageX;
        let original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
        
        function resize(cursor) {
          if (currentResizer.current.classList.contains('bottom-right')) {
            const width = original_width + (cursor.pageX - original_mouse_x);
            const height = original_height + (cursor.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          }
          else if (currentResizer.current.classList.contains('bottom-left')) {
            const height = original_height + (cursor.pageY - original_mouse_y)
            const width = original_width - (cursor.pageX - original_mouse_x)
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x) + 'px'
              setMx(mx + (cursor.pageX - original_mouse_x));
            }
          }
          else if (currentResizer.current.classList.contains('top-right')) {
            const width = original_width + (cursor.pageX - original_mouse_x)
            const height = original_height - (cursor.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y) + 'px'
              setMy(my + (cursor.pageY - original_mouse_y));
            }
          }
          else if(currentResizer.current.classList.contains('top-left')){
            const width = original_width - (cursor.pageX - original_mouse_x)
            const height = original_height - (cursor.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x) + 'px'
              setMx(mx + (cursor.pageX - original_mouse_x));
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y) + 'px'
              setMy(my + (cursor.pageY - original_mouse_y));
            }
          }
          else if(currentResizer.current.classList.contains('left')){
              const width = original_width - (cursor.pageX - original_mouse_x)
              if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x) + 'px'
              setMx(mx + (cursor.pageX - original_mouse_x));
            }
          }
          else if(currentResizer.current.classList.contains('right')){
              const width = original_width + (cursor.pageX - original_mouse_x);
              if (width > minimum_size) {
              element.style.width = width + 'px'
            }
          }
          else if(currentResizer.current.classList.contains('top')){
              const height = original_height - (cursor.pageY - original_mouse_y)
              if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y) + 'px'
              setMy(my + (cursor.pageY - original_mouse_y));
            }
          }
          else{
              const height = original_height + (cursor.pageY - original_mouse_y)
              if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          }
        }
        function stopResize() {
          window.removeEventListener('mousemove', resize)
        }
    }
    return(
        <React.Fragment>
            <Draggable disabled={!isExpanded} handle=".handle" nodeRef={nodeRef} defaultPosition={{x: 0, y: 0}}>
                <div tabIndex='0' className='folder' ref={nodeRef} onFocus={focusHandler} onBlur={focusHandler}>
                    <div ref={nodeRef} className='handle' 
                        onMouseDown={() => {down(nodeRef.current)}}
                        onMouseUp={() => {up(nodeRef.current)}}>
                        <div className='titleBox'>
                            <FolderButtons node={nodeRef} setExpand={setExpand} isExpanded={isExpanded} isMinimized={isMinimized} setMinimize={setMinimize} isClose={props.isClose} setClose={props.setClose} ex={ex} ey={ey} t={t} setEX={setEX} setEY={setEY} setT={setT} width={width} height={height} setWidth={setWidth} setHeight={setHeight} setFocus={setFocus} tab={tab} mx={mx} my={my}/>
                            <div ref={titleRef} className='title'>{props.title}</div>
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
                    <div className='resizers'>
                        <div ref={TLR} onMouseDown={(e) => handleMouseDown(TLR,nodeRef.current,e,dx,dy)} className='resizer top-left'></div>
                        <div ref={TRR} onMouseDown={(e) => handleMouseDown(TRR,nodeRef.current,e,dx,dy)} className='resizer top-right'></div>
                        <div ref={BLR} onMouseDown={(e) => handleMouseDown(BLR,nodeRef.current,e,dx,dy)} className='resizer bottom-left'></div>
                        <div ref={BRR} onMouseDown={(e) => handleMouseDown(BRR,nodeRef.current,e,dx,dy)} className='resizer bottom-right'></div>
                        <div ref={LR} onMouseDown={(e) => handleMouseDown(LR,nodeRef.current,e,dx,dy)}className='resizer left'></div>
                        <div ref={RR} onMouseDown={(e) => handleMouseDown(RR,nodeRef.current,e,dx,dy)}className='resizer right'></div>
                        <div ref={BR} onMouseDown={(e) => handleMouseDown(BR,nodeRef.current,e,dx,dy)}className='resizer bottom'></div>
                        <div ref={TR} onMouseDown={(e) => handleMouseDown(TR,nodeRef.current,e,dx,dy)}className='resizer top'></div>
                    </div>
                </div>
            </Draggable>

            <Tabs tab={tab} center={props.center} isClose={props.isClose} title={props.title} isMinimized={isMinimized} setMinimize={setMinimize} folder={nodeRef} focusHandler={focusHandler} mx={mx} my={my} titleRef={titleRef}/>
        </React.Fragment>
    );
}

function Tabs(props){
    const tab = props.tab;
    const focus = () => {
        tab.current.style.background='black';
        tab.current.style.color='white';
        props.titleRef.current.style.color='black';
    }
    const blur = () => {
        tab.current.style.background='';
        tab.current.style.color='';
        props.titleRef.current.style.color='';
    }

    function unMinimize(){
        if(props.isMinimized){
            props.folder.current.animate([
                {transform: 'translate('+(props.tab.current.getBoundingClientRect().left - props.mx)+'px,'+(-props.tab.current.getBoundingClientRect().top - props.my)+'px)',
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
                <Transition timeout={10000} className="tab">
                    <div tabIndex="0" ref={tab} className='tab' onFocus={focus} onBlur={blur} onClick={unMinimize}>
                    {props.title}
                    </div>
                </Transition>
            </React.Fragment>, props.center.current)
        return(dom);
    }
    else{
        return(null);
    }
}

function Startup(props){
    return(
        <div className='startup'>
            <div className='computer'>
                <div className="monitor">
                    <div className="screen-hole">
                        <div className="screen" ref={props.screen}>
                            <div className="screen-on" ref={props.screenOn} onAnimationEnd={props.fullscreen}></div>
                            {props.div}
                            <div ref={props.filter} className="filter"></div>
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
                    <div className="power-btn" onClick={props.turnOn} ref={props.powerBtn}>
                        <i className="fas fa-power-off fa-2x"></i>
                    </div>
                </div>
            </div>
            <div className="floor"></div>
        </div>
    );
}

const sub = [
    {id:1, value: 'hw.txt'},
    {id:2, value: 'text.txt'}
]
const file = [
    {id:1, value: 'random.mp4'},
    {id:2, value: 'dog.png'},
    {id:3, value: 'pepe.jpeg'},
    {id:4, value: <SDMenu className='submenu' name='folder' list={sub} y={72} x={22}/>},
    {id:5, value: <SDMenu className='submenu' name='folder' list={sub} y={96} x={22}/>}
]


function App() {
    const desktop = React.useRef(null);
    const ref = React.useRef(null);
    const [tabs, setTabs] = useState(null);

    
    React.useEffect(() => {
        setTabs(ref);
    },[]);
    
    const powerBtn = React.useRef(null);
    const screenOn = React.useRef(null);
    const screen = React.useRef(null);
    const filter = React.useRef(null);
    const [on, turnedOn] = useState(false);

    function turnOn(){
        if(!on){
            desktop.current.style.transition= "opacity 1s";
            powerBtn.current.style.color = "#00ff00";
            powerBtn.current.style.textShadow= "0px 0em 4px #38ff38";
            screenOn.current.style.animation= "turn-on 3s linear";
            screenOn.current.style.opacity= "1";
            turnedOn(true);
        }
        else{
            desktop.current.style.transition= "opacity 0.1s";
            desktop.current.style.opacity= '0';
            desktop.current.style.pointerEvents= 'none';
            powerBtn.current.style.color = "";
            powerBtn.current.style.textShadow= "";
            screenOn.current.style.animation= "turn-off 0.55s cubic-bezier(0.755, 0.050, 0.855, 0.060)";
            screenOn.current.style.opacity= "0";
            turnedOn(false);
        }
    }
    
    function fullscreen(){
        if(on){
            screen.current.style.top= screen.current.getBoundingClientRect().top*-1 + 'px';
            screen.current.style.left= screen.current.getBoundingClientRect().left*-1 + 'px';
            screen.current.style.width= "105vw";
            screen.current.style.height= "105vh";
            filter.current.style.width= "105vw";
            filter.current.style.height= "105vh";
            filter.current.style.top= "0em";
            filter.current.style.left= "0em";
            desktop.current.style.opacity= '1';
            desktop.current.style.pointerEvents= 'auto';
//            console.log(props.div.ref.current);
        }
        else{
            screen.current.style.top= '';
            screen.current.style.left= '';
            screen.current.style.width= "95%";
            screen.current.style.height= "90%";
            filter.current.style.width= "95%";
            filter.current.style.height= "85%";
            filter.current.style.top= "2em";
            filter.current.style.left= "1em";
        }
    }
    
    function handler(){
        if(on){
            turnOn();
        }
    }
    React.useEffect(() => {
    window.addEventListener('resize', handler);
    return () => {
       window.removeEventListener('resize', handler);
    }
}, [on]);
    
    return (
        <React.Fragment>
            <Startup on={on} turnedOn={turnedOn} node={desktop} screen={screen} filter={filter} screenOn={screenOn} powerBtn={powerBtn} fullscreen={fullscreen} turnOn={turnOn}
            div={<div ref={desktop} className="desktop">
                <nav className="nav">
                    <div className="left">
                        <Menu menuButton={
                            <div className="nav-item">
                               <i className="fas fa-lemon"></i>
                            </div>} align='end' offsetX={97} keepMounted={false} styles={{open: true}}>
                            <MenuItem className='menu-item'>About</MenuItem>
                            <MenuItem onClick={turnOn}className='menu-item'>Shutdown</MenuItem>
                        </Menu>
                        <DMenu name={                  
                            <div className="nav-item">File</div>
                            } list={file} x={154}>
                        </DMenu>
                        <div className="nav-item">
                            View
                        </div>
                    </div>
                    <div ref={ref} className="center">
                        
                    </div>
                    <div className="right">
                        <li className="nav-item">
                            <i className="fas fa-search"></i><span>Search</span>
                        </li>
                        <li className="nav-item">
                            <Clock />
                        </li>
                        <li className="nav-item">
                            <i className="fas fa-sun"></i>
                        </li>
                    </div>
                </nav>
                <RCMenu></RCMenu>
                <DeskItem center={tabs} title={'Folder'} x={300} y={0}/>
            </div>}>
            </Startup>
        </React.Fragment>
    );
}

export default App;
//<Folder getCenter={ref}></Folder>