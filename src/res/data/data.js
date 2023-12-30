import { Avatar } from "@rneui/base/dist/Avatar/Avatar";

export const homeData = [
    {
        id: "0309887867",
        jobTitle: "painting",
        jobDiscreption: "string ",
        jobLocation: "jeursalem",
        isemployerPickup: false,
        pickupLocation: "armon hantsef",
        payment: 0,
        isContentious: false,  // all the time 
        dayesNeeded: 10,
    },
    {
        employer: {
            avatar: "",
            rating: 0,
            compnayName: "fidex",
            contactName: "",
            phoneNumber: "0522700443",
        },
        jobTitle: "blet",
        jobDiscreption: "",
        jobLocation: "ber-shev",
        isemployerPickup: false,
        pickupLocation: "",
        payment: 0,
        isContentious: false,  // all the time 
        dayesNeeded: 10,
        jobLocation:'tel aviv'
        
    }
]

export const users = {
    "1": {
        id:'0998948994',
        compnayName: "aaw",
        employerID: "01762",
        userName: "Fadi",
        avatar: null,
        jobLocation:'tel aviv'
    },
    "2": {
        employerID: "0264676",
        userName: "Rappd",
        avatar: null,
        compnayName: "skkil",
        jobLocation:'tel aviv'
    }, 
    "3": {
        employerID: "035646",
        userName: "Rasmi",
        avatar: null,
        compnayName: "space3",
        phoneNumber: "09988665",
        jobLocation:'tel aviv'
    }, 
    "4": {
        avatar:<Avatar
        size={100}
        rounded
        icon={{ name: "pencil", type: "font-awesome" }}
        containerStyle={{ backgroundColor: "#9700b9" }}
      />,

       employerID: "000965",
       userName: "rajed",
        rating: 10,
        compnayName: "Adhd",
        phoneNumber: "05835245664",
        Joptype:'Painter',
        nots:'good painter with high skills ',
        jobLocation: "jeursalem",
        Experience:'2012,2023',
        skill:(['builder','painter','smith'])

    }
}



export const JobAplicant =[
    
   {
    id:'7893892',
    avatar: "",
    phoneNumber: "98789278",
    profiledata:"",
    name:'ali',
    },
    {
    id:'37373682',
    avatar: "",
    phoneNumber: "09098978",
    profiledata:"",
    name:'fadi',
    },

    {

    id:'787372',
    avatar: "",
    phoneNumber: "87228989",
    profiledata:"",
    name:'mahmad',
    }


]
 export const searchData = [
    'John Smith',
    'Alice Johnson',
    'Michael Brown',
    'Emma Davis',
    'David Wilson',
    'Olivia Taylor',
    // ... more search data
  ];


  export const chatData = [
    {
        userId: "1",
        conversation: [
            {
                text: "abc",
                time: "20:20",
                type: 'out'
            },
            {
                text: "yes",
                time: "20:21",
                type: 'in'
            }
        ]
    },
    {
        userId: "2",
        conversation: [
            {
                text: "abc",
                time: "20:20",
                type: 'out'
            },
            {
                text: "no",
                time: "20:21",
                type: 'in'
            }
        ]
    },
    {
        userId: "3",
        conversation: [
            {
                text: "abc",
                time: "20:20",
                type: 'out'
            },
            {
                text: "ok",
                time: "20:21",
                type: 'in'
            }
        ]
    }
    
]