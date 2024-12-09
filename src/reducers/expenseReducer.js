
//step1--generate new id
const generateNewId=(state)=>{
   
    let newId=-1;
    state.forEach((ele)=>{
        newId=Math.max(ele.id,newId)

    })
    return newId+1;


}
//doubts--
//1--why we are taking newId=-1
//because even if there is no expense ,the ids will start from 0
 //what is there is state
    // [
    //     { id: 1, name: "Groceries", amount: 500, date: "2024-12-01" },
    //     { id: 2, name: "Rent", amount: 10000, date: "2024-12-05" },
    //     { id: 3, name: "Electricity Bill", amount: 1200, date: "2024-12-10" },
    //     { id: 4, name: "Internet Bill", amount: 800, date: "2024-12-15" }, // New expense added
    // ]


//step2--make reducer for dufferent cases like add, delete,fill,edit

export default function expenseReducer(state,action){
    switch(action.type){
        case 'EDIT':{

     //check for invalid state
     if(isInvalidState(state,action)) return state;


     //destructuring the payload
     const{id,expense}=action.payload;

        //copy the state
        const updatedState=[...state];

        //find index using id
        const index=updatedState.findIndex((ele)=>ele.id===id);

        //update the state
        updatedState[index]={
            ...expense,
            id,



        }
        //return the updatedState

        return updatedState;
    };





        case 'ADD':{
            //check for invalid state
          if(isInvalidState(state,action)) return true;

            //destructuring the payload
            const {expense}=action.payload;

            //return the updated state
            return [
                ...state,{
                    ...expense,
                    id:generateNewId(state),
                }
            ];

            
        }
        case 'DELETE':{
            //check for invalid state
          if(isInvalidState(state,action)) return true;


          //destructuring the payload
            const {id}=action.payload;


            //return the updated state
            return state.filter((ele)=>ele.id!==id);


            
        }
        case 'FILL':{

            if(state!==null){
                console.error(action.type,"is unsupported. Data already loaded from backend.");
                return state;
            }
            const {expenses}=action.payload;
            return expenses;
            
        }
        default:{
            return state;

        }
    }
}
//doubts--
//1--what is action.payload

//payload is the data or information that comes with the action.
//It tells the reducer what specific details need to be used to modify the state.

//2--what is action.type

//type describes the type of action being performed.
//It is like a command or name for the operation that the reducer needs to handle.

//3--what is action

// action is a JavaScript object that contains two main parts:
// type (The instruction or command)
// payload (The additional data needed for the operation)







//step3--write code to check invalid state
const isInvalidState=(state,action)=>{
    if(state==null){
        console.warn(action.type,"is unsupported. Data not loaded from backend yet!");
        return true;
    }
    if(state.reduce((isInvalid,ele)=>(isInvalid||ele.id===undefined),false)){
        console.error("State invalid, some of the expenses don't have an 'id'");
        return true;
    }
    return false;
}