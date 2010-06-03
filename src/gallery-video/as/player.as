import flash.external.ExternalInterface;

[Bindable]
private var flvPath:String;

private var playerId:String;
private var jsCallback:String;
private var videoMetadata:Object = null;
private var yuiId:String;

private function initVars():void {
	flvPath = Application.application.parameters.file;
	playerId = Application.application.parameters.playerId;
	jsCallback = Application.application.parameters.jsCallback;
	yuiId = Application.application.parameters.yuiId;
	
	attachListeners();
}

private function fireEvent(event:String):void {
    trace("firing: " + event);
    trace("instance: " + yuiId);
    trace("to method: " + jsCallback);
	ExternalInterface.call(jsCallback, playerId, event);
}

private function attachListeners():void {
	videoPlayer.doubleClickEnabled = true;
	videoPlayer.addEventListener("playheadUpdate", function ():void {
		fireEvent("playheadUpdate");
	});
	
	videoPlayer.addEventListener("close", function ():void {
		fireEvent("close");
	});
	
	videoPlayer.addEventListener("complete", function ():void {
		fireEvent("complete");
	});
		 	 	
	videoPlayer.addEventListener("bytesLoadedChange", function ():void {
		fireEvent("bytesLoadedChange");
	});
		 	 					 	 	
	videoPlayer.addEventListener("rewind", function ():void {
		fireEvent("rewind");
	});
	
	videoPlayer.addEventListener("metadataReceived", function ():void {
		fireEvent("metadataReceived");
	});
	
	videoPlayer.addEventListener("ready", function ():void {
		fireEvent("ready");
	});
	
	/*videoPlayer.addEventListener("doubleClick", function ():void {
		var state:String = videoPlayer.state;
		if (state == 'playing') {
			videoPlayer.pause();
		} else if (state == 'paused' || state == 'stopped') {
			videoPlayer.play();
		}
	});*/
	
	videoPlayer.addEventListener("stateChange", function (e:Event):void {
		var state:String = videoPlayer.state;
		if (state == 'playing') {
			fireEvent('play');
		} else if (state == 'paused') {
			fireEvent('pause');
		} else if (state == 'stopped') {
			fireEvent('pause');
		}
	});
}

public function pauseMovie():void {
	videoPlayer.pause();
}

public function playMovie():void {
	videoPlayer.play();
}

public function stopMovie():void {
	videoPlayer.stop();
}

public function getTotalTime():Number {
	return videoPlayer.totalTime;
}

public function getCurrentTime():Number {
	return videoPlayer.playheadTime;
}

public function setCurrentTime(seconds:Number):void {
	videoPlayer.playheadTime = seconds;
}

public function setVolume(level:Number):void {
	videoPlayer.volume = level;
}

public function getTotalBytes():Number {
    return videoPlayer.bytesTotal;
}

public function getCurrentBytes():Number {
    return videoPlayer.bytesLoaded;
}

private function initInterface():void {
	if (ExternalInterface.available) {
		ExternalInterface.addCallback("play", playMovie);
		ExternalInterface.addCallback("pause", pauseMovie);
		ExternalInterface.addCallback("stop", stopMovie);
		ExternalInterface.addCallback("getTotalTime", getTotalTime);
		ExternalInterface.addCallback("getCurrentTime", getCurrentTime);
		ExternalInterface.addCallback("setCurrentTime", setCurrentTime);
		ExternalInterface.addCallback("getTotalBytes", getTotalBytes);
		ExternalInterface.addCallback("getCurrentBytes", getCurrentBytes);
		ExternalInterface.addCallback("setVolume", setVolume);
	}
}