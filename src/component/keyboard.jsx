export default function Keyboard(props){
return(
    <>
    <button onClick={props.onClick}className={props.className} style={props.style} disabled={props.disabled}>{props.letter}</button>
    </>
)
}