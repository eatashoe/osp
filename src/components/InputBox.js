import React from "react";

const InputBox = (props) => {
    const input = props.input
    const inputBox = React.useRef(null);
    const [text, setText] = React.useState(false);

    function inputHandler(e){
        if(input.current && inputBox.current){
            input.current.style.height = 'auto'
            inputBox.current.style.height = inputBox.current.scrollHeight + 'px'
            setText(e.target.value)
        }     
    }

    React.useEffect(() => {
        if(input.current && inputBox.current){
            inputBox.current.style.height = inputBox.current.scrollHeight + 'px'
            input.current.style.height = input.current.scrollHeight + 'px'
        }     
    }, [text])

    return(                        
            <div ref={inputBox} className="item-inputBox">
                <textarea 
                    ref={input} 
                    spellCheck="false" 
                    autoFocus 
                    onFocus={e => e.target.select()} 
                    onBlur={props.renameFolder} 
                    onKeyDown={e => (e.key === "Enter") ? props.renameFolder(e) : null} 
                    defaultValue={props.title} 
                    onChange={inputHandler} 
                    className="item-textarea"></textarea>
            </div>);
}

export default InputBox;