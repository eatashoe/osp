import React from "react"
import Draggable from 'react-draggable';
import InputBox from "./InputBox";
import Folder from "./Folder";
import RightClickMenu from "./RightClickMenu";
import {useGlobalDelete,useGlobalFolder,useGlobalFolderId, useDarkMode, useGlobalDeskItem} from "./GlobalStates"

const DeskItem = (props) =>{
    // const [desktopRef, setDesktopRef] = React.useState(null);
    const deskitem = React.useRef(null);
    const icon = React.useRef(null);
    const name = React.useRef(null);
    const folder = React.useRef(null);
    const rcRef = React.useRef(null);
    const input = React.useRef(null);
    const [id,setId] = React.useState(0);

    const globalDeleted = useGlobalDelete();
    const globalFolders = useGlobalFolder();
    const globalFolderId = useGlobalFolderId();
    const darkMode = useDarkMode();
    const globalDeskItem = useGlobalDeskItem();
    
    const [isClose, setClose] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [isMinimized, setMinimize] = React.useState(false);
    const [title, setTitle] = React.useState(props.title);
    const [rename, setRename] = React.useState(false);

    const [children, addChildren] = React.useState([]);

    function addKids(kid){
        // console.log(children,props.children);
        addChildren(children => children.concat(kid));
        // console.log(globalFolderId.get());
        if(kid.length !== undefined){
            globalDeskItem.set(deskItem => ([...deskItem, ...kid]));
        }
        else{
            globalDeskItem.set(deskItem => ([...deskItem,kid]));
        }   
    }

    React.useEffect(() => {
        if(props.children && props.desktopRef && props.desktopRef.current){
            console.log(props.children)
            addKids(props.children);
        }

    }, [props.desktopRef])

    React.useEffect(() => {
        if(props.newFolder){
            setRename(true);
        }
        if(props.id === undefined){
            setId(globalFolderId.get());
            globalFolderId.set(globalFolderId => globalFolderId + 1)

            globalFolders.set(globalFolders => ({...globalFolders, [id]: folder}))
            globalDeleted.set(globalDeleted => ({...globalDeleted, [id]: false}))
        }
        else{
            setId(props.id);
            globalFolders.set(globalFolders => ({...globalFolders, [id]: folder}))
            globalDeleted.set(globalDeleted => ({...globalDeleted, [id]: false}))
        }
    }, [])

    //tab stuff
    let tab = React.useRef(null);
    const titleRef = React.useRef(null);
    const [focus, setFocus] = React.useState(true);
    const [mx, setMx] = React.useState(0);
    const [my, setMy] = React.useState(0);

    // function location(e){
    //     // console.log(deskitem.current.getBoundingClientRect().left,deskitem.current.getBoundingClientRect().top);
    //     // console.log(deskitem.current.parentElement.offsetHeight,deskitem.current.parentElement.getBoundingClientRect());
    //     // console.log(document.elementsFromPoint(e.pageX,e.pageY)[4].parentElement);
    //     // console.log(deskitem);
    //     if(e.pageX < deskitem.current.parentElement.getBoundingClientRect().left ||
    //        e.pageX > deskitem.current.parentElement.getBoundingClientRect().right ||
    //        e.pageY < deskitem.current.parentElement.getBoundingClientRect().top ||
    //        e.pageY > deskitem.current.parentElement.getBoundingClientRect().bottom){
    //         setBounds('')
    //         // if(e.path[0].parentElement !== deskitem.current.parentElement){
    //         //     e.path[0].parentElement.style.width= '98%';
    //         //     e.path[0].parentElement.style.border= 'red 2px dashed';
    //         //     console.log(e.path[0].parentElement)
    //         // }
    //         // e.path[0].parentElement.style.width= '98%';
    //         // e.path[0].parentElement.style.border= 'red 2px dashed';
    //         // console.log(e.path[0].parentElement)
    //         // console.log(globalFolders.get())
    //     }
    //     else{
    //         // e.path[0].parentElement.style.width= '100%';
    //         // e.path[0].parentElement.style.border= '';
    //         setBounds('parent')
    //     }
    // }
    // function dropped(){
    //     globalCopy.set(null);
    // }

    function hoverIn(){
        if(darkMode.get()){
            deskitem.current.style.border = "rgb(255,255,255) 1px dotted";
        }
        else{
            deskitem.current.style.border = "rgb(0,0,0,0.5) 1px dotted";
        }
    }
    function hoverOut(){
        deskitem.current.style.border = "transparent 1px dotted";
    }

    function renameFolder(e){
        var count = 0;
        var tempTitle = e.target.value.toLowerCase().trim();
        var actualTitle = e.target.value.trim()

        var nodes = deskitem.current.parentElement.children;
        for(let x = 0; x < nodes.length; x++){
            var title = nodes[x].innerText.toLowerCase().trim();
            if(title === tempTitle){
                count++;
                break;
            }
        }
        if(count === 0){
            setTitle(actualTitle)
            setRename(false)
            rcRef.current.style.pointerEvents = 'auto';
            icon.current.style.filter= '';
        }
        else{
            input.current.style.animation = 'none';
            input.current.focus()
            input.current.style.animation = 'borderStop 0.5s';
        }
    }

    function openFolder(){
        if(!isClose){
            setOpen(true);
            setClose(true);
            // folder.current.style.opacity = '1';
            // folder.current.style.pointerEvents = 'auto';
        }
        else if(isMinimized){
            folder.current.animate([
                {transform: 'translate('+(-tab.current.getBoundingClientRect().left - mx)+'px,'+(tab.current.getBoundingClientRect().top - my)+'px)',
                width: tab.current.getBoundingClientRect().width+'px',
                 height: tab.current.getBoundingClientRect().height+'px'
                 },
                {transform: 'translate('+(folder.current.getBoundingClientRect().left - mx)+'px,'+(folder.current.getBoundingClientRect().top - my)+'px)'
                }
            ], {
                duration: 500
            });
            folder.current.style.opacity = '1';
            folder.current.style.pointerEvents = 'auto';
            setMinimize(false);
        }
    }

    function clickEnter(){
        if(!rename){
            icon.current.style.filter= 'sepia(100%) hue-rotate(190deg) saturate(500%)';
            name.current.style.transform= 'translateX(-1px)'
            name.current.style.filter= 'sepia(100%) hue-rotate(190deg) saturate(500%)';
            if(darkMode.get()){
                name.current.style.border= 'dotted 1px white';
            }
            else{
                name.current.style.border= 'dotted 1px black';
            }
            name.current.style.background= '#0080cb';
            name.current.style.display='block';

            deskitem.current.style.zIndex= '4';
            deskitem.current.parentElement.parentElement.style.zIndex= '4';

            // if(folder.current){
            //     folder.current.style.zIndex= '4';
            // }
        }
    }
    function clickLeave(){
        if(!rename){
            icon.current.style.filter= '';
            name.current.style.filter= '';
            name.current.style.border= '';
            name.current.style.background= '';
            name.current.style.display='-webkit-box';

            deskitem.current.style.zIndex= '2';
            deskitem.current.parentElement.parentElement.style.zIndex= '3';

            // if(folder.current){
            //     folder.current.style.zIndex= '3';
            // }
        }
    }
    if(props.isDesk){
        return(
            <Folder 
                desktopSpace={props.desktopSpace} 
                id={id} 
                addKids={addKids} 
                center={props.center} 
                desktopRef={props.desktopRef} 
                children={children} 
                isDesk={props.isDesk} 
                nodeRef={folder}></Folder>
        )
    }
    else if(!globalDeleted.get()[id]){
        return(
            <React.Fragment>
                <Draggable bounds={'parent'} defaultPosition={{x: props.x, y: props.y}}>
                    <div id={id} tabIndex="0" ref={deskitem} onFocus={clickEnter} onBlur={clickLeave} onDoubleClick={openFolder} onMouseOver={hoverIn} onMouseLeave={hoverOut} className='desk-item'>
                    <div ref={icon} className="item-icon">
                            <i className={props.isFolder ? "fas fa-folder" : "fas fa-file"}></i>
                    </div>
                        {!rename ? 
                        <div ref={name} className={darkMode.get() ? "item-name darkmode" : "item-name"} onDoubleClick={e => {console.log('yo')}}>
                            <span>{title}</span>
                        </div> 
                        :
                        <InputBox 
                            deskitem={deskitem} 
                            input={input} 
                            title={title} 
                            renameFolder={renameFolder}>
                        </InputBox>}
                        <RightClickMenu 
                            id={props.id ? props.id : id} 
                            title={title} 
                            deskitem={deskitem}
                            isDeskItem={true} 
                            rc={rcRef} 
                            setRename={setRename} 
                            files={children}>
                        </RightClickMenu>
                    </div>
                    
                </Draggable>

                <Folder 
                    id={props.id ? props.id : id} 
                    rcRef={rcRef} 
                    isOpen={isOpen}  
                    addKids={addKids} 
                    isFile={props.isFile} 
                    isFolder={props.isFolder} 
                    center={props.center} 
                    nodeRef={folder} 
                    isClose={isClose} 
                    setClose={setClose} 
                    isMinimized={isMinimized} 
                    setMinimize={setMinimize} 
                    title={title} 
                    tab={tab} 
                    titleRef={titleRef} 
                    focus={focus} 
                    setFocus={setFocus} 
                    mx={mx} 
                    setMx={setMx} 
                    my={my} 
                    setMy={setMy} 
                    children={children} 
                    desktopRef={props.desktopRef}/>

            </React.Fragment>
        );
    }
    else{
        return null
    }
}

export default DeskItem;