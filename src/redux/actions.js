
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
  playlist,
});

export const addToPlaylist = playlist => ({
  type: 'ADD_TO_PLAYLIST',
  data: {
    id: playlist.id,
    video: playlist.video,
  },
});

export const viewPlaylist = (playlistName, playlistVideos) => ({
  type: 'VIEW_PLAYLIST',
  playlistName,
  playlistVideos,
});

export const deleteVideoFromPlaylist = (playlistName, videoId) => ({
  type: 'DELETE_PLAYLIST_VIDEO',
  playlistName,
  videoId,
});
