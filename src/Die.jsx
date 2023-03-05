
export default function Die(props){
    const styles = {backgroundColor: props.isHeld ? '#59E391' : 'white'}
    
    return(
        <div className="shadow-md text-black h-20 w-20 rounded justify-center items-center text-center flex items-center font-medium text-3xl hover:scale-110 transition-all"
        style={styles}
        onClick={props.holdDice}>
            {props.value}
        </div>
    )
}