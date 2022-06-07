import profileReducer, {addPost} from "./profile-reducer";

const state  = {
    posts: [
        {
            id: 1,
            likesCount: 121,
            minutesAgoCreated: 28,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor'
        },
        {
            id: 2,
            likesCount: 45,
            minutesAgoCreated: 28,
            postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non'
        }
    ]
}

test('count of posts increases', () => {
    const action = addPost('new post ')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})