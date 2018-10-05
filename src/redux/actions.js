
export const searchVideo = text => ({
  type: 'SEARCH_VIDEO',
  text,
});

export const searchResults = videos => ({
  type: 'SEARCH_RESULTS',
  videos,
});

export const createPlaylist = playlist => ({
  type: 'CREATE_PLAYLIST',
  playlist
});

// export const 
