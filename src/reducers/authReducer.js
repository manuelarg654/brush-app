import { types } from "../types/types";

const initialState = {};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.login:{


            return({
                uid: action.payload.uid,
                name: action.payload.displayName,
                userImage: action.payload.userImage
            })
        }

        case types.logout:{

            return({});
        }
    
        default:
            return state;
    }


}
