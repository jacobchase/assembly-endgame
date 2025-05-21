export default function Keyboard(props){
return(
    <>
    <button onClick={props.onClick}className="keyboard-element">{props.letter}</button>
    </>
)
}