
export const homeData = [
    {
        employer: {
            employerID: "0309887867",
            avatar: "",
            rating: 0,
            compnayName: "plo",
            contactName: "ali",
            phoneNumber: "05835245664",
        },
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
            compnayName: "",
            contactName: "",
            phoneNumber: "",
        },
        jobTitle: "",
        jobDiscreption: "",
        jobLocation: "",
        isemployerPickup: false,
        pickupLocation: "",
        payment: 0,
        isContentious: false,  // all the time 
        dayesNeeded: 10,
    }
]

export const users = {
    "1": {
        userID: "1",
        userName: "Fadi",
        avatar: null
    },
    "2": {
        userID: "2",
        userName: "Rami",
        avatar: null
    }
}

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
    }
]