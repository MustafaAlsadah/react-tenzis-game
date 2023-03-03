import Die from "./Die"

export default function Board(){

    const generateDiecesValues = ()=>{
        let array = []
        for(let i=0; i<10; i++){
            const value = Math.ceil(Math.random()*6)
            array[i] = value
        }
        return array
    }

    return(
        <div className="bg-slate-200 h-5/6 w-5/6 max-w-xl rounded-xl">
            <div className="flex justify-center items-center h-full w-full">
                <div className="grid grid-cols-5 gap-3">
                    {
                        generateDiecesValues().map(value => <Die value={value} />)
                    }
                </div>
            </div>
        </div>
    )
}