import React from "react";
import {MenuItem, ControlledMenu} from "@szhsin/react-menu";
import {useGlobalDelete, useGlobalDeskItem, useGlobalFolder, useGlobalFolderId} from "./GlobalStates";
import DeskItem from "./DeskItem";

const RightClickMenu = (props) => {
    const globalDelete = useGlobalDelete();
    const globalDeskItem = useGlobalDeskItem();
    const globalFolders = useGlobalFolder();
    const [isOpen, setOpen] = React.useState(false);
    const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });

    function addNewFolder(folder){
        // console.log(anchorPoint);
        // console.log("FOLDER"+props.x+","+props.y);
        // console.log('how', props.files)

        var count = 0;
        var title = 'New Folder'
        var items = props.files;
        items.forEach(element => {
            var tempTitle = element.props.title.toLowerCase().trim()
            if(tempTitle.length >= title.length && tempTitle.substring(0,10) === title.toLowerCase()){
                count++;
            }
        });
        if(count > 0){
            title += ' ('+count+')'
        }

        props.addKids(<DeskItem newFolder={true} isFolder={true} center={props.center} title={title} x={anchorPoint.x-props.x-5} y={anchorPoint.y-props.y-20} desktopRef={props.desktopRef}/>);
    
        // props.files.concat(<DeskItem isFolder={true} center={props.center} title={'Folder'} x={e.pageX} y={e.pageY} desktopRef={props.desktopRef}/>);
    }

    function copyFolder(){
        console.log(globalDeskItem.get()[0]);
    }

    function pasteFolder(){
        addNewFolder(globalDeskItem.get()[0]);
    }
    
    function renameFolder(){
        props.setRename(true)
        props.rc.current.style.pointerEvents = 'none';        
    }

    function removeFolder(){
        var siblings = props.rc.current.parentElement.parentElement.children;
        for(let x = 1; x < siblings.length; x++){
            
            if(siblings[x].innerText.split(/\r?\n/)[0] === props.title){
                // console.log(siblings,x)
                // console.log('start',globalDelete.get(), siblings[x].id)
                globalDelete.set(globalDeleted => ({...globalDeleted, [siblings[x].id]: true}));
                // console.log('end',globalDelete.get())
                break;
            }
        }
    }

    let menuItems = []
    if(props.folder){
        menuItems=[<MenuItem className='rightclick-item'>Paste</MenuItem>,
                    <MenuItem onClick={addNewFolder} className='rightclick-item'>New Folder</MenuItem>]
    }
    else if(props.deskItem){
        menuItems=[<MenuItem className='rightclick-item'>Copy</MenuItem>,
                    <MenuItem onClick={removeFolder}className='rightclick-item'>Delete</MenuItem>,
                    <MenuItem onClick={renameFolder} className='rightclick-item'>Rename</MenuItem>]
    }
    // onMouseEnter={props.deskItem ? hoverHandler(true) : null} onMouseLeave={props.deskItem ? hoverHandler(false) : null}
    return (
        <div ref={props.nodeRef ? props.nodeRef : props.rc}  className="rightclickscreen"
        onContextMenu={e => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX + 0.7, y: e.clientY + 0 });
            setOpen(true);
        }}>
            
            <ControlledMenu hidden={isOpen ? false : true} anchorPoint={anchorPoint} isOpen={isOpen} onClose={() => setOpen(false)}>
                {menuItems}
            </ControlledMenu>
        </div>
    );
} 

export default RightClickMenu;