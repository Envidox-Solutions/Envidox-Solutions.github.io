(function(){
    var script = {
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "children": [
  "this.MainViewer",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Image_E9A6F9BA_FA34_448B_41D8_92A8B8C25523"
 ],
 "vrPolyfillScale": 0.5,
 "paddingBottom": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist,this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist,this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "width": "100%",
 "scripts": {
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "existsKey": function(key){  return key in window; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getKey": function(key){  return window[key]; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "unregisterKey": function(key){  delete window[key]; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } }
 },
 "paddingRight": 0,
 "downloadEnabled": false,
 "layout": "absolute",
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 20,
 "paddingLeft": 0,
 "propagateClick": true,
 "minWidth": 20,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "desktopMipmappingEnabled": false,
 "scrollBarMargin": 2,
 "class": "Player",
 "height": "100%",
 "borderSize": 0,
 "overflow": "visible",
 "definitions": [{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 10",
 "id": "panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -3.84,
   "panorama": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "class": "AdjacentPanorama",
   "backwardYaw": -178.59,
   "distance": 1
  },
  {
   "yaw": -179.76,
   "panorama": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "class": "AdjacentPanorama",
   "backwardYaw": -3.36,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E2FD85E7_FA6C_CCB9_41D2_BDDD9556BB9F",
  "this.overlay_E2FB8895_FA6F_C499_41EE_E0DB99EA8641"
 ],
 "thumbnailUrl": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_t.jpg",
 "hfov": 360
},
{
 "titleFontStyle": "normal",
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "id": "window_E24CE42F_FA6D_C389_41E5_1B80CE0E6116",
 "headerBackgroundColorDirection": "vertical",
 "width": 700,
 "shadowBlurRadius": 6,
 "footerBackgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "bodyPaddingRight": 5,
 "titlePaddingRight": 5,
 "layout": "vertical",
 "contentOpaque": false,
 "headerBorderSize": 0,
 "titleFontFamily": "Arial",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "minHeight": 20,
 "shadowOpacity": 0.5,
 "verticalAlign": "middle",
 "borderRadius": 5,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "closeButtonPaddingBottom": 0,
 "modal": true,
 "closeButtonBackgroundColor": [],
 "titleTextDecoration": "none",
 "backgroundColor": [],
 "closeButtonBackgroundOpacity": 1,
 "closeButtonIconHeight": 12,
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "height": 600,
 "borderSize": 0,
 "minWidth": 20,
 "class": "Window",
 "headerPaddingTop": 10,
 "backgroundColorRatios": [],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarWidth": 10,
 "gap": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "bodyBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "bodyBorderSize": 0,
 "scrollBarOpacity": 0.5,
 "closeButtonBorderSize": 0,
 "headerPaddingBottom": 10,
 "headerPaddingLeft": 10,
 "paddingTop": 0,
 "closeButtonPaddingRight": 0,
 "shadow": true,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "closeButtonBorderRadius": 11,
 "scrollBarVisible": "rollOver",
 "title": "Babcock asylum",
 "closeButtonIconWidth": 12,
 "closeButtonBackgroundColorRatios": [],
 "veilColorDirection": "horizontal",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#000000",
 "shadowSpread": 1,
 "veilColor": [
  "#000000"
 ],
 "children": [
  "this.htmlText_E24AA430_FA6D_C397_41E6_4E6C3369F06F",
  "this.image_uidE1316638_FA6F_CF88_41E4_B2F63B1F6DAB_1"
 ],
 "shadowColor": "#000000",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "titleFontWeight": "normal",
 "veilOpacity": 0.4,
 "backgroundOpacity": 1,
 "footerBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPaddingLeft": 0,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  1
 ],
 "paddingRight": 0,
 "titleFontSize": "1.29vmin",
 "closeButtonPaddingTop": 0,
 "footerBorderSize": 0,
 "bodyBackgroundColorDirection": "vertical",
 "footerHeight": 5,
 "shadowVerticalLength": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "propagateClick": false,
 "footerBorderColor": "#000000",
 "headerPaddingRight": 10,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerVerticalAlign": "middle",
 "closeButtonIconLineWidth": 2,
 "closeButtonBorderColor": "#000000",
 "overflow": "scroll",
 "bodyPaddingLeft": 5,
 "titlePaddingLeft": 5,
 "shadowHorizontalLength": 3,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonIconColor": "#000000",
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "hideEffect": {
  "easing": "cubic_in_out",
  "class": "FadeOutEffect",
  "duration": 500
 },
 "headerBackgroundOpacity": 1,
 "showEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 },
 "bodyPaddingBottom": 5,
 "data": {
  "name": "Window33212"
 },
 "titlePaddingBottom": 5,
 "bodyPaddingTop": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "class": "FadeInEffect",
  "duration": 500
 }
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 1",
 "id": "panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -178.59,
   "panorama": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "class": "AdjacentPanorama",
   "backwardYaw": -3.84,
   "distance": 1
  },
  {
   "yaw": -6.45,
   "panorama": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "class": "AdjacentPanorama",
   "backwardYaw": -179.76,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E923B58C_F9F4_CC88_41D3_8FFEF8BBD8E6",
  "this.overlay_E9730C36_F9F5_C39B_41E9_3EB1EB26867D",
  "this.overlay_E29B86A1_FA6C_4CB9_41E5_2FE97DC53A60"
 ],
 "thumbnailUrl": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 1.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1782669_FA6F_CF88_41CF_F72768EBA035",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 6",
 "id": "panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -4.19,
   "panorama": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "class": "AdjacentPanorama",
   "backwardYaw": -178.92,
   "distance": 1
  },
  {
   "yaw": -177.84,
   "panorama": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "class": "AdjacentPanorama",
   "backwardYaw": -1.1,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EC12274E_FA14_4D8B_41CC_F26BDF1A38A8",
  "this.overlay_ECBC74BE_FA14_CC8B_41E8_362E8331590A"
 ],
 "thumbnailUrl": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 2.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E611E7FF_FA6F_CC83_41E1_7FE26F878FEE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 176.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1620683_FA6F_CF79_41E3_78817BF10688",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "class": "PlayList"
},
{
 "displayMovements": [
  {
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 700
  },
  {
   "easing": "cubic_in_out",
   "targetPitch": 0,
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 3000,
   "targetStereographicFactor": 0
  }
 ],
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "displayOriginPosition": {
  "stereographicFactor": 1,
  "yaw": 0,
  "hfov": 165,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 173.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E102565E_FA6F_CF8B_41E1_89383F92E915",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 143.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E61FA7E6_FA6F_CCBB_41CF_375693C3E490",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 5",
 "id": "panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -1.1,
   "panorama": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "class": "AdjacentPanorama",
   "backwardYaw": -177.84,
   "distance": 1
  },
  {
   "yaw": -174.96,
   "panorama": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "class": "AdjacentPanorama",
   "backwardYaw": 20.69,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EFED72D8_FA1C_4497_41E6_709D97108ABB",
  "this.overlay_EF02AA16_FA1C_C79B_41EE_AB492055BE07"
 ],
 "thumbnailUrl": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 1.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E171C676_FA6F_CF9B_41EB_D29BC69AD57C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 8",
 "id": "panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 143.79,
   "panorama": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "class": "AdjacentPanorama",
   "backwardYaw": -2.27,
   "distance": 1
  },
  {
   "yaw": -36.38,
   "panorama": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "class": "AdjacentPanorama",
   "backwardYaw": -177.43,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EDBABB9F_FA15_C489_41EF_22378FC8E99D",
  "this.overlay_ED9A9B3C_FA14_C58F_41DE_A7764A3A8325"
 ],
 "thumbnailUrl": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 5.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E14D76A0_FA6F_CCB7_41DE_BC00591B38F6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -159.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E601481B_FA6F_C388_41E7_8A4DEE238291",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E62FA7C9_FA6F_CC89_41E5_6BB45BA25282",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 7",
 "id": "panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -2.27,
   "panorama": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "class": "AdjacentPanorama",
   "backwardYaw": 143.79,
   "distance": 1
  },
  {
   "yaw": -178.92,
   "panorama": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "class": "AdjacentPanorama",
   "backwardYaw": -4.19,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ED23FD44_FA17_DDFF_41C5_97FD34FB7969",
  "this.overlay_ED30F1B7_FA14_C499_41E6_A0E60B662BAD"
 ],
 "thumbnailUrl": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_t.jpg",
 "hfov": 360
},
{
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "mouseControlMode": "drag_acceleration",
 "touchControlMode": "drag_rotation",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "class": "PanoramaPlayer"
},
{
 "initialPosition": {
  "yaw": -36.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1A586DF_FA6F_CC88_41EF_1BC520B81F58",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 176.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1CA1787_FA6F_CD78_41EA_9F8DA816EB68",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -13.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1B256BC_FA6F_CC8F_41C2_6BA388B1E095",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 3",
 "id": "panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -178.23,
   "panorama": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "class": "AdjacentPanorama",
   "backwardYaw": -3.29,
   "distance": 1
  },
  {
   "yaw": 1.58,
   "panorama": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "class": "AdjacentPanorama",
   "backwardYaw": 166.79,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EEBE1031_FA3C_C399_41E3_1AB0915961F6",
  "this.overlay_EE468E38_FA3C_DF97_41AC_001EAD46EA29"
 ],
 "thumbnailUrl": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 175.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E197A6FD_FA6F_CC88_41E8_3CEE7F537401",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 178.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1D8276A_FA6F_CD8B_41E2_E5E59F8D8F68",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 1.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1E8A74D_FA6F_CD89_41E7_F1FFF22D0016",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 2",
 "id": "panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -179.76,
   "panorama": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "class": "AdjacentPanorama",
   "backwardYaw": -6.45,
   "distance": 1
  },
  {
   "yaw": -3.29,
   "panorama": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "class": "AdjacentPanorama",
   "backwardYaw": -178.23,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E8615303_F9FC_4578_41E2_ED9615EDC291",
  "this.overlay_E94258A3_F9FC_C4B9_41DD_03D4D2A487EC"
 ],
 "thumbnailUrl": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 176.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E14056AE_FA6F_CC8B_41E0_2F498EEE986B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "WhatsApp Image 2023-05-08 at 12.40.21 PM",
 "id": "photo_E25C6E2E_FA74_3F8B_41C9_B6E5DEB3C487",
 "class": "Photo",
 "width": 1024,
 "thumbnailUrl": "media/photo_E25C6E2E_FA74_3F8B_41C9_B6E5DEB3C487_t.jpg",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_E25C6E2E_FA74_3F8B_41C9_B6E5DEB3C487.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 682
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E",
   "camera": "this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE",
   "camera": "this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "camera": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
   "camera": "this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "camera": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73",
   "camera": "this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02",
   "camera": "this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "camera": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
   "camera": "this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "camera": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E63DF7AA_FA6F_CC8B_41E0_D74C6136BDCB",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 177.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1872714_FA6F_CD9F_41EE_5AFC7584F118",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 2.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1F97731_FA6F_CD99_41E4_4B10BBD2E0D6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 9",
 "id": "panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": -3.36,
   "panorama": "this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1",
   "class": "AdjacentPanorama",
   "backwardYaw": -179.76,
   "distance": 1
  },
  {
   "yaw": -177.43,
   "panorama": "this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66",
   "class": "AdjacentPanorama",
   "backwardYaw": -36.38,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E2E0F428_FA6C_C388_41E6_483BF0B0CAA9",
  "this.overlay_E2233580_FA6C_4D77_41EB_ED76E8A8E1AD"
 ],
 "thumbnailUrl": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -178.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_E1593694_FA6F_CC9F_41E0_A1D83FB2F7E8",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "hfovMin": "120%",
 "label": "Street View 360- 4",
 "id": "panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "yaw": 166.79,
   "panorama": "this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6",
   "class": "AdjacentPanorama",
   "backwardYaw": 1.58,
   "distance": 1
  },
  {
   "yaw": 20.69,
   "panorama": "this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA",
   "class": "AdjacentPanorama",
   "backwardYaw": -174.96,
   "distance": 1
  }
 ],
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_t.jpg",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 3072,
      "width": 3072,
      "colCount": 6,
      "rowCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1536,
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512,
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EF1C188A_FA1C_448B_41E9_5781CB8BC2BB",
  "this.overlay_EF7379E1_FA1C_44B8_41E1_D0A0E9038DD9"
 ],
 "thumbnailUrl": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_t.jpg",
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 10,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 7,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 10,
 "minHeight": 50,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "paddingLeft": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 13,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "paddingTop": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 0,
 "top": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#999999"
 ],
 "minWidth": 1,
 "height": 60,
 "backgroundColorRatios": [
  0,
  0.87
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "horizontal",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--BUTTON SET"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "width": 60,
 "right": 15,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "vertical",
 "contentOpaque": false,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": 62,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "height": 300,
 "backgroundColorRatios": [
  0.02
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "children": [
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
  "this.IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93"
 ],
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "width": "100%",
 "borderRadius": 0,
 "paddingRight": 30,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 90,
 "minWidth": 1,
 "overflow": "scroll",
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 3,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---INFO photo"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PANORAMA LIST"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---LOCATION"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---FLOORPLAN"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PHOTOALBUM"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "right": "0%",
 "contentOpaque": false,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "0%",
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---REALTOR"
 },
 "shadow": false,
 "visible": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#04A3E1"
},
{
 "maxHeight": 377,
 "maxWidth": 661,
 "id": "Image_E9A6F9BA_FA34_448B_41D8_92A8B8C25523",
 "left": "0%",
 "width": "23.328%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_E9A6F9BA_FA34_448B_41D8_92A8B8C25523.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": "25.181%",
 "minWidth": 1,
 "bottom": "0%",
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image12514"
 },
 "shadow": false,
 "scaleMode": "fit_inside",
 "paddingTop": 0
},
{
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "fontFamily": "Arial",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 30,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 30,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "data": {
  "name": "Button Settings Fullscreen"
 }
},
{
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "fontFamily": "Arial",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 30,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 30,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "data": {
  "name": "Button Settings Mute"
 }
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -3.84,
   "hfov": 18.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.22
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E, this.camera_E171C676_FA6F_CF9B_41EB_D29BC69AD57C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6054AEC_FA74_448F_41DA_101C56F90AD5",
   "pitch": -8.22,
   "yaw": -3.84,
   "hfov": 18.68,
   "distance": 100
  }
 ],
 "id": "overlay_E2FD85E7_FA6C_CCB9_41D2_BDDD9556BB9F",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -179.76,
   "hfov": 18.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.67
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061, this.camera_E1620683_FA6F_CF79_41E3_78817BF10688); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6053AED_FA74_4489_41E9_2EC81050CC00",
   "pitch": -7.67,
   "yaw": -179.76,
   "hfov": 18.71,
   "distance": 100
  }
 ],
 "id": "overlay_E2FB8895_FA6F_C499_41EE_E0DB99EA8641",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "id": "htmlText_E24AA430_FA6D_C397_41E6_4E6C3369F06F",
 "width": "100%",
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "paddingRight": 10,
 "minHeight": 0,
 "paddingLeft": 10,
 "propagateClick": false,
 "height": "50%",
 "minWidth": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">The 19th century in the United States was an era of tremendous change. An industrial revolution ignited the country, while a Civil War divided the nation. During this time, those suffering from mental illness were housed in private homes and poorhouses. As populations increased, this practice became impractical. State legislators in South Carolina pushed for a state-operated hospital to care for and provide treatment for the mentally ill. In 1821, the General Assembly established the South Carolina Lunatic Asylum. The first patient was not admitted until December of 1828 due to a lack of funding and delays. The Mills Building, named after its architect Robert Mills, was the first building constructed to house patients. It is the nation\u2019s oldest surviving mental hospital structure and a National Historic Landmark. Today, it is occupied by the South Carolina Department of Health and Environmental Control.</SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText33213"
 },
 "shadow": false,
 "paddingTop": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "image_uidE1316638_FA6F_CF88_41E4_B2F63B1F6DAB_1",
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "media/photo_E25C6E2E_FA74_3F8B_41C9_B6E5DEB3C487.jpeg",
 "borderRadius": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": "50%",
 "minWidth": 0,
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image39127"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -6.45,
   "hfov": 18.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.69
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE, this.camera_E63DF7AA_FA6F_CC8B_41E0_D74C6136BDCB); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EA44E41E_F9FC_438B_41B6_F5251027510D",
   "pitch": -10.69,
   "yaw": -6.45,
   "hfov": 18.55,
   "distance": 100
  }
 ],
 "id": "overlay_E923B58C_F9F4_CC88_41D3_8FFEF8BBD8E6",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -178.59,
   "hfov": 18.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.39
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1, this.camera_E1CA1787_FA6F_CD78_41EA_9F8DA816EB68); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EA42641F_F9FC_4388_41ED_335197E1894D",
   "pitch": -9.39,
   "yaw": -178.59,
   "hfov": 18.62,
   "distance": 100
  }
 ],
 "id": "overlay_E9730C36_F9F5_C39B_41E9_3EB1EB26867D",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 76.36,
   "hfov": 10.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.74
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_E24CE42F_FA6D_C389_41E5_1B80CE0E6116, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6199ADE_FA74_448B_41D8_E4B2DAA360AD",
   "pitch": -0.74,
   "yaw": 76.36,
   "hfov": 10.29,
   "distance": 100
  }
 ],
 "id": "overlay_E29B86A1_FA6C_4CB9_41E5_2FE97DC53A60",
 "data": {
  "label": "Info 01"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -4.19,
   "hfov": 21.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.77
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02, this.camera_E1E8A74D_FA6F_CD89_41E7_F1FFF22D0016); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6000AEB_FA74_4489_41CF_7212A162030C",
   "pitch": -15.77,
   "yaw": -4.19,
   "hfov": 21.86,
   "distance": 100
  }
 ],
 "id": "overlay_EC12274E_FA14_4D8B_41CC_F26BDF1A38A8",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -177.84,
   "hfov": 18.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.19
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA, this.camera_E1D8276A_FA6F_CD8B_41E2_E5E59F8D8F68); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E600EAEB_FA74_4489_41D1_5A920801E6B2",
   "pitch": -14.19,
   "yaw": -177.84,
   "hfov": 18.3,
   "distance": 100
  }
 ],
 "id": "overlay_ECBC74BE_FA14_CC8B_41E8_362E8331590A",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.1,
   "hfov": 18.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.41
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73, this.camera_E611E7FF_FA6F_CC83_41E1_7FE26F878FEE); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E601FAEB_FA74_4489_41C5_02B4A1796A19",
   "pitch": -12.41,
   "yaw": -1.1,
   "hfov": 18.43,
   "distance": 100
  }
 ],
 "id": "overlay_EFED72D8_FA1C_4497_41E6_709D97108ABB",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -174.96,
   "hfov": 18.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.61
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828, this.camera_E601481B_FA6F_C388_41E7_8A4DEE238291); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6005AEB_FA74_4489_41E7_71C24602C5A9",
   "pitch": -12.61,
   "yaw": -174.96,
   "hfov": 18.42,
   "distance": 100
  }
 ],
 "id": "overlay_EF02AA16_FA1C_C79B_41EE_AB492055BE07",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -36.38,
   "hfov": 18.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.96
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061, this.camera_E1F97731_FA6F_CD99_41E4_4B10BBD2E0D6); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E607FAEC_FA74_448F_41D8_64900692E198",
   "pitch": -10.96,
   "yaw": -36.38,
   "hfov": 18.53,
   "distance": 100
  }
 ],
 "id": "overlay_EDBABB9F_FA15_C489_41EF_22378FC8E99D",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 143.79,
   "hfov": 18.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.37
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02, this.camera_E1872714_FA6F_CD9F_41EE_5AFC7584F118); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6065AEC_FA74_448F_41CA_DD807520DE11",
   "pitch": -13.37,
   "yaw": 143.79,
   "hfov": 18.36,
   "distance": 100
  }
 ],
 "id": "overlay_ED9A9B3C_FA14_C58F_41DE_A7764A3A8325",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -2.27,
   "hfov": 18.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.37
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66, this.camera_E1A586DF_FA6F_CC88_41EF_1BC520B81F58); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E600AAEB_FA74_4489_4197_DBA86D0D0273",
   "pitch": -13.37,
   "yaw": -2.27,
   "hfov": 18.36,
   "distance": 100
  }
 ],
 "id": "overlay_ED23FD44_FA17_DDFF_41C5_97FD34FB7969",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -178.92,
   "hfov": 18.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.24
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73, this.camera_E197A6FD_FA6F_CC88_41E8_3CEE7F537401); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6073AEC_FA74_448F_41BF_BCBA8AE79874",
   "pitch": -11.24,
   "yaw": -178.92,
   "hfov": 18.51,
   "distance": 100
  }
 ],
 "id": "overlay_ED30F1B7_FA14_C499_41E6_A0E60B662BAD",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "fontFamily": "Arial",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 30,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "rollOverIconHeight": 30,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 30,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "rollOverIconWidth": 30,
 "data": {
  "name": "Button Settings HS"
 }
},
{
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "shadowSpread": 1,
 "width": 60,
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 30,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 30,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button settings VR"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "fontFamily": "Arial",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 30,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "rollOverIconHeight": 30,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 30,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "rollOverIconWidth": 30,
 "data": {
  "name": "Button Settings Gyro"
 }
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 1.58,
   "hfov": 18.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.96
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828, this.camera_E1B256BC_FA6F_CC8F_41C2_6BA388B1E095); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E263E342_FA3C_45F8_41CF_E3A39906D75E",
   "pitch": -12.96,
   "yaw": 1.58,
   "hfov": 18.39,
   "distance": 100
  }
 ],
 "id": "overlay_EEBE1031_FA3C_C399_41E3_1AB0915961F6",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -178.23,
   "hfov": 19.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.38
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE, this.camera_E14056AE_FA6F_CC8B_41E0_2F498EEE986B); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E2638342_FA3C_45F8_41C0_4AB9AC2ECC20",
   "pitch": -12.38,
   "yaw": -178.23,
   "hfov": 19.91,
   "distance": 100
  }
 ],
 "id": "overlay_EE468E38_FA3C_DF97_41AC_001EAD46EA29",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -3.29,
   "hfov": 18.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.5
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6, this.camera_E1782669_FA6F_CF88_41CF_F72768EBA035); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EA42F41F_F9FC_4388_41BE_0D99DDC13D05",
   "pitch": -13.5,
   "yaw": -3.29,
   "hfov": 18.35,
   "distance": 100
  }
 ],
 "id": "overlay_E8615303_F9FC_4578_41E2_ED9615EDC291",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -179.76,
   "hfov": 18.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.11
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E, this.camera_E102565E_FA6F_CF8B_41E1_89383F92E915); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E2634342_FA3C_45F8_41CD_7ED789C6E7F5",
   "pitch": -16.11,
   "yaw": -179.76,
   "hfov": 18.13,
   "distance": 100
  }
 ],
 "id": "overlay_E94258A3_F9FC_C4B9_41DD_03D4D2A487EC",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -3.36,
   "hfov": 18.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.12
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1, this.camera_E62FA7C9_FA6F_CC89_41E5_6BB45BA25282); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E6066AEC_FA74_448F_41E7_F64A02986E52",
   "pitch": -7.12,
   "yaw": -3.36,
   "hfov": 18.73,
   "distance": 100
  }
 ],
 "id": "overlay_E2E0F428_FA6C_C388_41E6_483BF0B0CAA9",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -177.43,
   "hfov": 18.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.32
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66, this.camera_E61FA7E6_FA6F_CCBB_41CF_375693C3E490); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E606FAEC_FA74_448F_41EC_D346C7927D47",
   "pitch": -9.32,
   "yaw": -177.43,
   "hfov": 18.63,
   "distance": 100
  }
 ],
 "id": "overlay_E2233580_FA6C_4D77_41EB_ED76E8A8E1AD",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 20.69,
   "hfov": 21.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.38
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA, this.camera_E14D76A0_FA6F_CCB7_41DE_BC00591B38F6); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E2FD5F5D_FA1C_5D88_41BC_9593DDEAE885",
   "pitch": -18.38,
   "yaw": 20.69,
   "hfov": 21.23,
   "distance": 50
  }
 ],
 "id": "overlay_EF1C188A_FA1C_448B_41E9_5781CB8BC2BB",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.79,
   "hfov": 17.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.48
  }
 ],
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6, this.camera_E1593694_FA6F_CC9F_41E0_A1D83FB2F7E8); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E2FCEF5D_FA1C_5D88_41DC_1A563B8911B2",
   "pitch": -11.48,
   "yaw": 166.79,
   "hfov": 17.83,
   "distance": 100
  }
 ],
 "id": "overlay_EF7379E1_FA1C_44B8_41E1_D0A0E9038DD9",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": 76,
 "width": 450,
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "text": "LIGHTWORKZ SAMPLE",
 "borderRadius": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "height": 60,
 "minWidth": 1,
 "fontSize": 31,
 "class": "Label",
 "borderSize": 0,
 "fontStyle": "normal",
 "horizontalAlign": "left",
 "data": {
  "name": "company name"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "children": [
  "this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29",
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B",
  "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "width": 1199,
 "right": "0%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "contentOpaque": false,
 "borderRadius": 0,
 "paddingRight": 15,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "propagateClick": true,
 "height": 60,
 "minWidth": 1,
 "overflow": "scroll",
 "class": "Container",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "gap": 3,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "width": 44,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 44,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "class": "IconButton",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Thumblist"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "width": 44,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 44,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "class": "IconButton",
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Photoalbum"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "width": 44,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 44,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "click": "this.openLink('https://www.instagram.com/lightworkzsolutions/', '_blank')",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Realtor"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "width": 44,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 44,
 "minWidth": 1,
 "mode": "push",
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "class": "IconButton",
 "borderSize": 0,
 "click": "this.openLink('https://www.instagram.com/p/CrtPzKhO6WL/', '_blank')",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Video"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "right": "15%",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "vertical",
 "borderRadius": 0,
 "paddingRight": 20,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "scrollBarMargin": 2,
 "propagateClick": false,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "80%",
 "class": "Container",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "right": "15%",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "vertical",
 "borderRadius": 0,
 "paddingRight": 20,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "scrollBarMargin": 2,
 "propagateClick": false,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "80%",
 "class": "Container",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "right": "15%",
 "contentOpaque": false,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "paddingRight": 0,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "borderRadius": 0,
 "top": "10%",
 "propagateClick": false,
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "bottom": "10%",
 "class": "Container",
 "shadowVerticalLength": 0,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver"
},
{
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "15%",
 "right": "15%",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "vertical",
 "borderRadius": 0,
 "paddingRight": 20,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "10%",
 "scrollBarMargin": 2,
 "propagateClick": false,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "80%",
 "class": "Container",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6054AEC_FA74_448F_41DA_101C56F90AD5",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6053AED_FA74_4489_41E9_2EC81050CC00",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D68348_F9EF_C5F7_41DA_58E47F97C3D1_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EA44E41E_F9FC_438B_41B6_F5251027510D",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EA42641F_F9FC_4388_41ED_335197E1894D",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_E6199ADE_FA74_448B_41D8_E4B2DAA360AD",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F68F8430_F9F4_4397_41EE_22EC1C17AB2E_0_HS_2_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6000AEB_FA74_4489_41CF_7212A162030C",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E600EAEB_FA74_4489_41D1_5A920801E6B2",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D56033_F9EC_4399_41D8_98F3847E7B73_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E601FAEB_FA74_4489_41C5_02B4A1796A19",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6005AEB_FA74_4489_41E7_71C24602C5A9",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D30780_F9EC_4D78_41E1_BBCC863DAEBA_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E607FAEC_FA74_448F_41D8_64900692E198",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6065AEC_FA74_448F_41CA_DD807520DE11",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D6D18B_F9EC_4489_41D3_8D2E1647DA66_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E600AAEB_FA74_4489_4197_DBA86D0D0273",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6073AEC_FA74_448F_41BF_BCBA8AE79874",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D428C7_F9EC_44F9_41EE_785A58AC4E02_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E263E342_FA3C_45F8_41CF_E3A39906D75E",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E2638342_FA3C_45F8_41C0_4AB9AC2ECC20",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2C465F8_F9EC_4C88_41EE_5DF5CF9D6DD6_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_EA42F41F_F9FC_4388_41BE_0D99DDC13D05",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E2634342_FA3C_45F8_41CD_7ED789C6E7F5",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F29D7A74_F9EC_C79F_41E6_78036121BACE_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E6066AEC_FA74_448F_41E7_F64A02986E52",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E606FAEC_FA74_448F_41EC_D346C7927D47",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2D7CA6E_F9EC_4788_41C9_D533F219D061_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "frameDuration": 41,
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_E2FD5F5D_FA1C_5D88_41BC_9593DDEAE885",
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "frameDuration": 62,
 "frameCount": 9,
 "colCount": 3,
 "id": "AnimatedImageResource_E2FCEF5D_FA1C_5D88_41DC_1A563B8911B2",
 "rowCount": 3,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F2AE4E7F_F9EC_5F89_41BA_A8D90AFAE828_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "popUpShadow": false,
 "popUpBackgroundOpacity": 1,
 "id": "DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "width": 116,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadowBlurRadius": 6,
 "fontFamily": "Montserrat",
 "popUpBackgroundColor": "#F7931E",
 "paddingBottom": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "popUpPaddingTop": 10,
 "paddingRight": 13,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#666666",
  "#666666"
 ],
 "minWidth": 1,
 "popUpShadowOpacity": 0,
 "height": 60,
 "fontSize": 12,
 "popUpBorderRadius": 0,
 "label": "RECEPTION",
 "backgroundColorRatios": [
  0,
  0.95
 ],
 "class": "DropDown",
 "popUpShadowColor": "#000000",
 "borderSize": 0,
 "popUpFontColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "playList": "this.DropDown_0561BA16_3AA3_A1D2_41C7_FDA0B6E9EE29_playlist",
 "fontStyle": "normal",
 "gap": 0,
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "backgroundColorDirection": "vertical",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 1"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "popUpShadow": false,
 "popUpBackgroundOpacity": 1,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "width": 96,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadowBlurRadius": 6,
 "fontFamily": "Montserrat",
 "popUpBackgroundColor": "#333333",
 "paddingBottom": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "popUpPaddingTop": 10,
 "paddingRight": 15,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#666666"
 ],
 "minWidth": 1,
 "popUpShadowOpacity": 0,
 "height": "100%",
 "fontSize": 12,
 "popUpBorderRadius": 5,
 "label": "ROOMS",
 "backgroundColorRatios": [
  0
 ],
 "class": "DropDown",
 "popUpShadowColor": "#000000",
 "borderSize": 0,
 "popUpFontColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "fontStyle": "normal",
 "gap": 0,
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "backgroundColorDirection": "vertical",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 2"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "popUpShadow": false,
 "popUpBackgroundOpacity": 1,
 "id": "DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "width": 114,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadowBlurRadius": 6,
 "fontFamily": "Montserrat",
 "popUpBackgroundColor": "#F7931E",
 "paddingBottom": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "popUpPaddingTop": 10,
 "paddingRight": 15,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#666666"
 ],
 "minWidth": 1,
 "popUpShadowOpacity": 0,
 "height": 60,
 "fontSize": 12,
 "popUpBorderRadius": 0,
 "label": "AMENITIES",
 "backgroundColorRatios": [
  0
 ],
 "class": "DropDown",
 "popUpShadowColor": "#000000",
 "borderSize": 0,
 "popUpFontColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "playList": "this.DropDown_05783A1F_3AA3_A1D2_41A6_E88282E5373B_playlist",
 "fontStyle": "normal",
 "gap": 0,
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "backgroundColorDirection": "vertical",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 3"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "popUpShadow": false,
 "popUpBackgroundOpacity": 1,
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "width": 152,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadowBlurRadius": 6,
 "fontFamily": "Montserrat",
 "popUpBackgroundColor": "#F7931E",
 "paddingBottom": 0,
 "popUpGap": 2,
 "backgroundOpacity": 1,
 "popUpPaddingTop": 10,
 "paddingRight": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#666666"
 ],
 "minWidth": 1,
 "popUpShadowOpacity": 0,
 "height": 60,
 "fontSize": 12,
 "popUpBorderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "DropDown",
 "popUpShadowColor": "#000000",
 "borderSize": 0,
 "prompt": "SWIMMING POOL",
 "popUpFontColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "playList": "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "fontStyle": "normal",
 "gap": 0,
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "backgroundColorDirection": "vertical",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 5"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "shadowSpread": 1,
 "width": 60,
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconHeight": 17,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 17,
 "propagateClick": false,
 "backgroundColor": [
  "#999999"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "fontSize": 12,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorDirection": "vertical",
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "data": {
  "name": "Button Settings"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "contentOpaque": false,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "width": "85%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "width": 8,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "contentOpaque": false,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "contentOpaque": false,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "layout": "vertical",
 "width": "50%",
 "paddingRight": 50,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 50,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#0069A3"
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "width": "25%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 50,
 "propagateClick": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "contentOpaque": false,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 140,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "itemHeight": 160,
 "itemLabelFontWeight": "normal",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "rollOverItemThumbnailShadow": true,
 "paddingBottom": 70,
 "itemThumbnailScaleMode": "fit_outside",
 "width": "100%",
 "itemLabelFontSize": 13,
 "borderRadius": 5,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 70,
 "scrollBarMargin": 2,
 "itemLabelFontColor": "#666666",
 "itemMinWidth": 50,
 "height": "92%",
 "itemBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "rollOverItemLabelFontColor": "#F7931E",
 "itemThumbnailOpacity": 1,
 "itemPaddingRight": 3,
 "itemThumbnailHeight": 125,
 "class": "ThumbnailGrid",
 "itemPaddingBottom": 3,
 "borderSize": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemBackgroundOpacity": 0,
 "gap": 26,
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "scrollBarWidth": 10,
 "itemVerticalAlign": "top",
 "shadow": false,
 "itemOpacity": 1,
 "itemLabelHorizontalAlign": "center",
 "paddingTop": 10,
 "itemMode": "normal",
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "itemLabelFontFamily": "Montserrat",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#F7931E",
 "selectedItemLabelFontColor": "#F7931E",
 "itemThumbnailWidth": 220,
 "itemMaxHeight": 1000,
 "itemBorderRadius": 0,
 "itemMaxWidth": 1000,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 70,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemLabelPosition": "bottom",
 "propagateClick": false,
 "selectedItemThumbnailShadow": true,
 "bottom": -0.2,
 "itemHorizontalAlign": "center",
 "itemBackgroundColor": [],
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemLabelGap": 7,
 "itemBackgroundColorRatios": [],
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "horizontalAlign": "center",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "data": {
  "name": "ThumbnailList"
 },
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemThumbnailShadow": false,
 "itemWidth": 220,
 "itemLabelTextDecoration": "none",
 "itemMinHeight": 50
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "paddingRight": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "insetBorder": false,
 "backgroundColorRatios": [
  0
 ],
 "class": "WebFrame",
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "WebFrame48191"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "width": "25%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 50,
 "propagateClick": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MapViewer",
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "minHeight": 1,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "paddingTop": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "transitionMode": "blending",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "layout": "absolute",
 "width": "100%",
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 140,
 "minWidth": 1,
 "overflow": "scroll",
 "class": "Container",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "contentOpaque": false,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "contentOpaque": false,
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "width": "55%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "width": 8,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "contentOpaque": false,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "contentOpaque": false,
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "layout": "vertical",
 "width": "45%",
 "paddingRight": 60,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 60,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#0069A3"
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "width": "25%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 50,
 "propagateClick": false,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "horizontalAlign": "center",
 "data": {
  "name": "X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "photo"
 },
 "shadow": false,
 "scaleMode": "fit_outside",
 "paddingTop": 0
},
{
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 60,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "right",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "contentOpaque": false,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 520,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#E73B2C"
},
{
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "contentOpaque": false,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "horizontalAlign": "right",
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "right": 20,
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "horizontalAlign": "right",
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "minHeight": 1,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "paddingLeft": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "paddingTop": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "top": "0%",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarHeadShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "paddingBottom": 0,
 "cursor": "hand",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "bottom": "20%",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "right": 10,
 "width": "14.22%",
 "paddingBottom": 0,
 "cursor": "hand",
 "backgroundOpacity": 0,
 "minHeight": 50,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": "20%",
 "propagateClick": false,
 "minWidth": 50,
 "mode": "push",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "bottom": "20%",
 "class": "IconButton",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton >"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "right": 20,
 "width": "10%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingRight": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "borderRadius": 0,
 "paddingLeft": 0,
 "top": 20,
 "propagateClick": false,
 "height": "10%",
 "minWidth": 50,
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "class": "IconButton",
 "transparencyActive": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "horizontalAlign": "right",
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingTop": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "width": "100%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "bottom",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image"
 },
 "shadow": false,
 "scaleMode": "fit_outside",
 "paddingTop": 0
},
{
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 0,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": 60,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 0,
 "horizontalAlign": "right",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "shadow": false,
 "paddingTop": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "contentOpaque": false,
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 520,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#E73B2C"
},
{
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "width": 370,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "contentOpaque": false,
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "paddingRight": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "class": "HTMLText",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.88vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.88vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.88vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.75vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#F7931E"
},
{
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "shadowSpread": 1,
 "width": 180,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0.8,
 "iconHeight": 32,
 "cursor": "hand",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "layout": "horizontal",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "paddingLeft": 0,
 "iconWidth": 32,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": "1.96vh",
 "label": "LOREM IPSUM",
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "borderSize": 0,
 "pressedBackgroundOpacity": 1,
 "rollOverBackgroundOpacity": 1,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "gap": 5,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button Lorem Ipsum"
 },
 "fontColor": "#FFFFFF",
 "shadow": false,
 "paddingTop": 0,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none"
},
{
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "height": "45%",
 "minWidth": 1,
 "class": "HTMLText",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.53vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText18899"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#04A3E1"
},
{
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "contentOpaque": false,
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "width": "100%",
 "paddingRight": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "80%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "maxHeight": 200,
 "maxWidth": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "width": "25%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "borderRadius": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "minHeight": 1,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "paddingLeft": 0,
 "class": "Image",
 "borderSize": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "agent photo"
 },
 "shadow": false,
 "scaleMode": "fit_inside",
 "paddingTop": 0
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "75%",
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "paddingRight": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "class": "HTMLText",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.03vh;font-family:'Montserrat';\"><B>JOHN DOE</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Montserrat';\">LICENSED REAL ESTATE SALESPERSON</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText19460"
 },
 "shadow": false,
 "paddingTop": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#F7931E"
}],
 "scrollBarWidth": 10,
 "gap": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player468"
 },
 "shadow": false,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "mobileMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
