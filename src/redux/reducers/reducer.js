import { combineReducers } from 'redux';

const initialState = {
  text: '',
  videos: [],
  playlists: [],
};

function search(state = initialState.text, action) {
  switch (action.type) {
  case 'SEARCH_VIDEO': {
    return action.text;
  }
  default: return state;
  }
}

function videos(state = initialState.videos, action) {
  switch (action.type) {
  case 'SEARCH_RESULTS': {
    return action.videos;
  }
  default: return state;
  }
}

function playlists(state = initialState.playlists, action) {
  switch (action.type) {
  case 'CREATE_PLAYLIST': {
    return action.playlist;
  }
  case 'ADD_TO_PLAYLIST': {
    const playlistCopy = [...state];
    playlistCopy.map((playlist, index) => {
      if (index === action.data.id) {
        playlist.videos.push(action.data.video);
      }
    });
    return playlistCopy;
  }
  default: return state;
  }
}

const reducer = combineReducers({
  search,
  videos,
  playlists,
});


export default reducer;
