export default function Language(props){
    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color
    }
    return(
        <section className="block" style={styles}>{props.name}</section>
    )
}