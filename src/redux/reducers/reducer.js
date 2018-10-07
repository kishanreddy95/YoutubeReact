import { combineReducers } from 'redux';

const initialState = {
  text: '',
  videos: {
    type: '',
    videos: [],
  },
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
    return {
      type: 'search',
      videos: action.videos,
    };
  }
  case 'VIEW_PLAYLIST': {
    return {
      type: 'playlist',
      videos: action.playlistVideos,
    };
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
