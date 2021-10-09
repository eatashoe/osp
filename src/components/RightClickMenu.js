import React from "react";
import {MenuItem, ControlledMenu} from "@szhsin/react-menu";
import {useGlobalDelete, useDarkMode, useGlobalDeskItem, useGlobalFolderId, useGlobalCopy, useGlobalDirectory, useGlobalFolder} from "./GlobalStates";
import DeskItem from "./DeskItem";
import { Downgraded } from "@hookstate/core";


const RightClickMenu = (props) => {
    const globalDelete = useGlobalDelete();
    const darkMode = useDarkMode();
    const globalDeskItem = useGlobalDeskItem();
    const globalFolderId = useGlobalFolderId();
    const globalCopy = useGlobalCopy();
    const globalDirectory = useGlobalDirectory();
    const globalFolder = useGlobalFolder();

    const [isOpen, setOpen] = React.useState(false);
    const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });

    function addNewFolder(){

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

        var id = globalFolderId.get();
        globalFolderId.set(id => id + 1);
        console.log('new folders id',id);

        props.addKids(<DeskItem 
                        parent={props.id}
                        key={id}
                        id={id}
                        newFolder={true} 
                        isFolder={true} 
                        center={props.center} 
                        title={title} 
                        x={anchorPoint.x-props.x-5} 
                        y={anchorPoint.y-props.y-20} 
                        desktopRef={props.desktopRef}/>);
    
        // props.files.concat(<DeskItem isFolder={true} center={props.center} title={'Folder'} x={e.pageX} y={e.pageY} desktopRef={props.desktopRef}/>);
    }

    function copyFolder(){
        const propsCopy = globalDeskItem.attach(Downgraded).get()[props.id-1].props;
        
        var kids = [];
        var hasKids = false;
        for(let e of globalDeskItem.attach(Downgraded).get()){
            if(e.props.parent === propsCopy.id){
                hasKids = true;
                kids.push(e);
            }
        }

        var title = props.deskitem.current.innerText.split('\n')[0];
        var isFolder = undefined;
        var isFile = undefined;
        if(propsCopy.isFolder){
            isFolder = true;
        }
        else{
            isFile = true;
        }
        globalCopy.set([propsCopy.id,kids,isFolder,isFile,title,propsCopy.desktopRef,propsCopy.center,hasKids,propsCopy.link]);
        console.log('copy',globalDeskItem.attach(Downgraded).get());
    }

    function pasteFolder(){
        if(globalCopy.attach(Downgraded).get()){
            var id = globalFolderId.get();
            console.log('bruh what?',id);

            const copy = globalCopy.attach(Downgraded).get()

            var children = []
            var kids = copy[1]
            var hasKids = copy[7];

            // for(let e of globalDeskItem.attach(Downgraded).get()){
            //     if(e.props.parent === copy[0]){
            //         hasKids = true;
            //         kids.push(e);
            //     }
            // }

            if(hasKids){
                var tempId = id;
                var l = kids.length;
                kids.forEach(e => {
                    if(e.props.parent === copy[0]){
                        tempId += 1;
                        globalFolderId.set(folderId => folderId + 1);
                        children.push(copyKids(tempId, e, l, id))
                    }
                });
            }

            var t = copy[4];
            var count = 0;
            
            for(let element of props.files) {
                var tempTitle = element.props.title.toLowerCase().trim()
                if(tempTitle.length >= t.length && tempTitle.substring(0,t.length) === t.toLowerCase()){
                    count++;
                }
            }
            if(count > 1){
                t += ' (Copy) - ('+count+')'
            }
            else{
                t += ' (Copy) '
            }
            props.addKids(<DeskItem 
                parent={props.id}
                key={id}
                id={id}
                children={children}
                isFolder={copy[2]} 
                isFile={copy[3]}
                title={t} 
                x={anchorPoint.x-props.x-5} 
                y={anchorPoint.y-props.y-20} 
                desktopRef={copy[5]}
                center={copy[6]} 
                link={copy[8]}/>)

            globalFolderId.set(folderId => folderId + 1);
        }
    }

    function copyKids(folderId, kids, length, parentId){

        var id = folderId;
        var children = undefined;
        var isFolder = undefined;
        var isFile = undefined;
        var title = kids.props.title;

        if(kids.props.children){
            children = []
            var l = kids.props.children.length;
            kids.props.children.forEach(e => {
                id += 1 + length;
                children.push(copyKids(id, e, l))
            });
        }
        if(kids.props.isFolder){
            isFolder = true;
        }
        else{
            isFile = true;
        }
        return (
            <DeskItem 
                    parent={parentId}
                    key={id}
                    id={id}
                    children={children}
                    isFolder={isFolder} 
                    isFile={isFile}
                    title={title} 
                    x={kids.props.x} 
                    y={kids.props.y} 
                    desktopRef={kids.props.desktopRef}
                    center={kids.props.center}
                    link={kids.props.link} />
        );
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
                if(globalFolder.get()[siblings[x].id][1].current){
                    var children = globalFolder.attach(Downgraded).get()[siblings[x].id][1].current.children[1].children;
                    // console.log('please',children[1].id, siblings[x].id)
                    for(let i = 1; i < children.length; i++){
                        globalDelete.set(globalDeleted => ({...globalDeleted, [children[i].id]: true}));
                    }
                }
                globalDelete.set(globalDeleted => ({...globalDeleted, [siblings[x].id]: true}));
                globalDirectory.get()["update"]();
                // console.log('end',globalDelete.get())
                break;
            }
        }
    }

    let menuItems = []
    if(props.folder){
        menuItems=[<MenuItem key={1} onClick={pasteFolder} className='rightclick-item'>Paste</MenuItem>,
                    <MenuItem key={2} onClick={addNewFolder} className='rightclick-item'>New Folder</MenuItem>]
    }
    else if(props.isDeskItem){
        menuItems=[<MenuItem key={1} onClick={() => {props.setAbout(true)}} className='rightclick-item'>Info</MenuItem>,
                    <MenuItem key={2} onClick={copyFolder} className='rightclick-item'>Copy</MenuItem>,
                    <MenuItem key={3} onClick={removeFolder}className='rightclick-item'>Delete</MenuItem>,
                    <MenuItem key={4} onClick={renameFolder} className='rightclick-item'>Rename</MenuItem>]
    }
    // onMouseEnter={props.deskItem ? hoverHandler(true) : null} onMouseLeave={props.deskItem ? hoverHandler(false) : null}
    return (
        
        <div ref={props.nodeRef ? props.nodeRef : props.rc}  
            className={(darkMode.get() && props.nodeRef)? "rightclickscreen darkmode" : "rightclickscreen"}
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