import React from "react";
import ReactDOM from 'react-dom';
import FolderButtons from "./FolderButtons";
import RightClickMenu from "./RightClickMenu";
import Draggable from 'react-draggable';
import Tabs from "./Tabs";

const Folder = (props) => {
    //resizer refs
    // const [id, setId] = React.useState(0)
    const nodeRef = props.nodeRef;
    const TLR = React.useRef(null);
    const TRR = React.useRef(null);
    const BLR = React.useRef(null);
    const BRR = React.useRef(null);
    const LR = React.useRef(null);
    const RR = React.useRef(null);
    const BR = React.useRef(null);
    const TR = React.useRef(null);

    const deskspace = React.useRef(null);
    const defaultPositions = {x: window.innerWidth/2 - 90, y: window.innerHeight/2 - 180}

    // React.useEffect(() => {
    //     setId(globalFolderId.get())
    //     globalFolders.set(globalFolders => ({...globalFolders, [globalFolderId.get()]: nodeRef}))
    //     globalDelete.set(globalDelete => ({...globalDelete, [globalFolderId.get()]: props.removeKid}))
    //     globalFolderId.set(globalFolderId => globalFolderId + 1)
    // },[])

    React.useEffect(() => {
        if(props.isClose){
            nodeRef.current.style.opacity = '1';
            nodeRef.current.style.pointerEvents = 'auto';
        }
    }, [props.isClose])
 
    //deltas when dragging
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [dx, setDx] = React.useState(0);
    const [dy, setDy] = React.useState(0);
    
    //preserve states when expanded
    const [ex, setEX] = React.useState(0);
    const [ey, setEY] = React.useState(0);
    const [t, setT] = React.useState(null);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [isExpanded, setExpand] = React.useState(true);

    function focusHandler(e){
        // if(props.isClose && e.target.innerText.split(/\r?\n/)[0] === props.title){
        if(props.isClose && e.target === nodeRef.current){
            // console.log(e.target.innerText);
            if(props.focus){
                props.tab.current.style.background="black";
                props.tab.current.style.color="white";
                props.titleRef.current.style.color="black";
                nodeRef.current.style.zIndex= '4';
                props.setFocus(false);
            }
            else{
                props.tab.current.style.background="";
                props.tab.current.style.color="";
                props.titleRef.current.style.color="";
                nodeRef.current.style.zIndex= '3';
                props.setFocus(true);
            }
        }
    }
    
    function down(element){
        // console.log(x,y)
        setX(element.getBoundingClientRect().left);
        setY(element.getBoundingClientRect().top);
    }
    
    function up(element){
        setDx(dx + (element.getBoundingClientRect().left - x));
        setDy(dy +(element.getBoundingClientRect().top - y));
    }
    
    React.useEffect(() => {
        if(!props.isDesk && nodeRef.current ){
            setX(nodeRef.current.getBoundingClientRect().left);
            setY(nodeRef.current.getBoundingClientRect().top);
        }
    }, [down]);

    function handleMouseDown(currentResizer, element, e, x, y) {

        e.preventDefault();
        const minimum_size = 180;
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
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x - defaultPositions.x) + 'px'
              props.setMx(props.mx + (cursor.pageX - original_mouse_x));
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
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y - defaultPositions.y) + 'px'
              props.setMy(props.my + (cursor.pageY - original_mouse_y));
            }
          }
          else if(currentResizer.current.classList.contains('top-left')){
            const width = original_width - (cursor.pageX - original_mouse_x)
            const height = original_height - (cursor.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x - defaultPositions.x) + 'px'
              props.setMx(props.mx + (cursor.pageX - original_mouse_x));
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y - defaultPositions.y) + 'px'
            //   (window.innerHeight/2 - 155.570312)
              props.setMy(props.my + (cursor.pageY - original_mouse_y));
            }
          }
          else if(currentResizer.current.classList.contains('left')){
              const width = original_width - (cursor.pageX - original_mouse_x)
              if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = (original_x + (cursor.pageX - original_mouse_x) - x - defaultPositions.x) + 'px'
              props.setMx(props.mx + (cursor.pageX - original_mouse_x));
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
              element.style.top = (original_y + (cursor.pageY - original_mouse_y) - y - defaultPositions.y) + 'px'
              props.setMy(props.my + (cursor.pageY - original_mouse_y));
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
    function handleStart(e, ui){ e.stopPropagation(); }

    function copyFolder(e){

        // var n;
        // if(props.desktopSpace){
        //     n = props.desktopSpace.current.children;
        // }
        // else{
        //     n = nodeRef.current.children[1].children;
        // }
        // // console.log(e)
        // // console.log(e.target,nodeRef.current.children[1].children[0])
        // // e.target.offsetParent.outerText == nodeRef.current.children[1].children[0] &&
        // // console.log(e)
        // // console.log('deskshit: ',props.desktopRef);
        // // console.log('this is the copy: ', globalCopy.get())
        // // console.log('all the folders nicely :) ', globalFolders.get()[0])
        // if((e.target === n[0] || 
        //     (e.target.clientHeight === 80 && e.target.clientWidth === 80)) 
        //     && props.children.length !== 0){
        //     // console.log(props.children,nodeRef);
        //     var x;
        //     for(x = 0; x < n.length; x++){
        //         if(n[x].outerText === e.target.offsetParent.outerText){
        //             props.globalCopy.set(props.children[x-1])
        //             // console.log(props.globalCopy.get());
        //         }
        //     }
        //     // nodeRef.current.children[1].children.forEach(element => {
        //     //     if(element.outerText == e.target.offsetParent.outerText){
        //     //         props.setCopy(props.children[x-1])
        //     //     }
        //     //     x++
        //     // });
        // }
        // // window.addEventListener('ondrag',console.log('cockcock'))
        // // console.log(document.elementsFromPoint(e.pageX,e.pageY)[4]);
        // e.stopPropagation()
    }

    if(props.desktopRef && props.isOpen){
        var dom;
        if(props.isFolder){
            dom = ReactDOM.createPortal(  
                <React.Fragment>
                    <Draggable disabled={!isExpanded} handle=".handle" onStart={handleStart} nodeRef={nodeRef} defaultPosition={{x: window.innerWidth/2 - 90, y: window.innerHeight/2 - 180}}>
                        <div id={props.id} tabIndex='0' className='folder' ref={nodeRef} onFocus={focusHandler} onBlur={focusHandler}>
                            <div ref={nodeRef} className='handle' 
                                onMouseDown={() => {down(nodeRef.current)}}
                                onMouseUp={() => {up(nodeRef.current)}}>
                                <div className='titleBox'>
                                    <FolderButtons node={nodeRef} setExpand={setExpand} isExpanded={isExpanded} isMinimized={props.isMinimized} setMinimize={props.setMinimize} isClose={props.isClose} setClose={props.setClose} ex={ex} ey={ey} t={t} setEX={setEX} setEY={setEY} setT={setT} width={width} height={height} setWidth={setWidth} setHeight={setHeight} setFocus={props.setFocus} tab={props.tab} mx={props.mx} my={props.my}/>
                                    <div ref={props.titleRef} className='title'>{props.title}</div>
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
                            <div id={props.id} ref={deskspace} className='folderSpace' onMouseDown={copyFolder}>
                                <RightClickMenu deskspace={deskspace} folder={true} center={props.center} desktopRef={props.desktopRef} files={props.children} addKids={props.addKids} x={x} y={y} key={x,y}></RightClickMenu>
                                {props.children}
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
                    
                    <Tabs tab={props.tab} center={props.center} isClose={props.isClose} title={props.title} isMinimized={props.isMinimized} setMinimize={props.setMinimize} folder={nodeRef} focusHandler={focusHandler} mx={props.mx} my={props.my} titleRef={props.titleRef}/>
                </React.Fragment>, props.desktopRef.current);
                
            return(dom);
        }
        else if(props.isFile){
            dom = ReactDOM.createPortal(  
                <React.Fragment>
                    <Draggable disabled={!isExpanded} handle=".handle" onStart={handleStart} nodeRef={nodeRef} defaultPosition={defaultPositions}>
                        <div id={props.id} tabIndex='0' className='folder' ref={nodeRef} onFocus={focusHandler} onBlur={focusHandler}>
                            <div ref={nodeRef} className='handle' 
                                onMouseDown={() => {down(nodeRef.current)}}
                                onMouseUp={() => {up(nodeRef.current)}}>
                                <div className='titleBox'>
                                    <FolderButtons node={nodeRef} setExpand={setExpand} isExpanded={isExpanded} isMinimized={props.isMinimized} setMinimize={props.setMinimize} isClose={props.isClose} setClose={props.setClose} ex={ex} ey={ey} t={t} setEX={setEX} setEY={setEY} setT={setT} width={width} height={height} setWidth={setWidth} setHeight={setHeight} setFocus={props.setFocus} tab={props.tab} mx={props.mx} my={props.my}/>
                                    <div ref={props.titleRef} className='title'>{props.title}</div>
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
                            <div className='folderSpace'>
                                <iframe height={180} width={180} src="https://winstongong.netlify.app/" title="description"></iframe>
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
                    
                    <Tabs tab={props.tab} center={props.center} isClose={props.isClose} title={props.title} isMinimized={props.isMinimized} setMinimize={props.setMinimize} folder={nodeRef} focusHandler={focusHandler} mx={props.mx} my={props.my} titleRef={props.titleRef}/>
                </React.Fragment>, props.desktopRef.current);
                
            return(dom);
        }
    }
    else if(props.isDesk){
        return(
            <div id="0" ref={props.desktopSpace} className="desktopSpace">
                <RightClickMenu folder={true} nodeRef={nodeRef} center={props.center} desktopRef={props.desktopRef} files={props.children} addKids={props.addKids} x={x} y={y} key={x,y}></RightClickMenu>
                {props.children}
            </div>
        );
    }
    else{
        return(null)
    }
}

export default Folder;