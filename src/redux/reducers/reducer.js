import { combineReducers } from 'redux';

const initialState = {
  text: '',
  videos: [],
  playlists: [],
};

function search(state = initialState.text, action) {
  switch (action.type) {
  case 'SEARCH_VIDEO': {
    return {
      text: action.text,
    };
  }
  default: return state;
  }
}

function videos(state = initialState.videos, action) {
  switch (action.type) {
  case 'SEARCH_RESULTS': {
    return {
      videos: [...action.videos],
    };
  }
  default: return state;
  }
}

function playlist(state = initialState.playlists, action) {
  switch (action.type) {
    case 'CREATE_PLAYLIST': 
    return {
      playlists: [...action.videos]
    }
  }
}

const reducer = combineReducers({
  search,
  videos,
});


export default reducer;
