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
      type: action.playlistName,
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
  case 'DELETE_PLAYLIST_VIDEO': {
    const playlistAfterDeletion = state.map((playlist) => {
      if (playlist.name === action.playlistName) {
        playlist.videos.splice(action.videoId, 1);
      }
      return playlist;
    });
    return playlistAfterDeletion;
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
