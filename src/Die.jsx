
export default function Die(props){
    return(
        <div className="bg-white shadow-md text-black h-20 w-20 rounded justify-center items-center text-center flex items-center font-medium text-3xl hover:scale-110 transition-all">
            {props.value}
        </div>
    )
}